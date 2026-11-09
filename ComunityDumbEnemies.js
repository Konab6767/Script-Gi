// DumbEnemies Hook Script - Versão completa com filtro de identidade
// Baseado no DumbEnemiesV2.js original
// Protege o player verificando kind e configID

(function () {
    'use strict';

    var PREFIX = '[DumbEnemies] ';
    var ROOT = Script.path.substring(0, Script.path.lastIndexOf('\\'));
    var managed = true;
    
    var game = Process.findModuleByName('GenshinImpact.exe');
    if (!game || Process.arch !== 'x64' || typeof CModule !== 'function') {
        throw new Error(PREFIX + 'Requer Frida/CModule x64');
    }
    
    var base = game.base;
    
    // RVAs principais
    var specs = [
        {name: 'aiScheduling', rva: 0xb04cfd0},
        {name: 'aiModules', rva: 0x13999ce0},
        {name: 'targetSelection', rva: 0xb05b100},
        {name: 'attackEvents', rva: 0xe4e8290}
    ];
    
    // RVAs obrigatórias
    var required = [
        0xb04cfd0, 0x13999ce0, 0xb05b100, 0xe4e8290,
        0x12678220, 0xe4e8010, 0x131f9c40, 0xb0635c0,
        0xa165a90, 0x13999c40, 0x13e99550, 0x14715550
    ];
    
    console.log(PREFIX + 'Carregando perfil...');
    var profile = JSON.parse(File.readAllText(ROOT + '/dumb-enemies-profile.json'));
    
    if (!profile || profile.version !== 'dumb-enemies-profile-v2' || profile.moduleSize !== game.size) {
        throw new Error(PREFIX + 'Perfil invalido ou versao incompativel');
    }
    
    var ids = profile.targetIds;
    var methods = profile.methods;
    var hotfixFlags = profile.hotfixFlags;
    
    console.log(PREFIX + 'Catalogo de monstros: ' + ids.length + ' IDs');
    console.log(PREFIX + 'Metodos: ' + methods.length);
    
    var enabled = false;
    var bindings = [];
    var control = Memory.alloc(4);
    var nativeState = Memory.alloc(72);
    var flagPointers = Memory.alloc(hotfixFlags.length * 8);
    
    control.writeU32(0);
    nativeState.writeByteArray(new Array(72).fill(0));
    
    hotfixFlags.forEach(function (r, i) {
        flagPointers.add(i * 8).writePointer(base.add(r));
    });
    
    // Funções externas para CModule
    var kernel = Process.getModuleByName('kernel32.dll');
    var virtualQuery = kernel.getExportByName('VirtualQuery');
    
    // Função de incremento atômico
    var increment = Memory.alloc(Process.pageSize);
    Memory.patchCode(increment, 10, function (p) {
        p.writeByteArray([0xb8, 1, 0, 0, 0, 0xf0, 0x0f, 0xc1, 0x01, 0xc3]);
    });
    if (!Memory.protect(increment, Process.pageSize, 'r-x')) {
        throw new Error('Auxiliar atomico indisponivel');
    }
    
    // Código C runtime
    var source = '#define HOTFIX_COUNT ' + hotfixFlags.length + '\n' +
                '#define TARGET_COUNT ' + ids.length + '\n' +
                'static const unsigned int target_ids[]={' + ids.join(',') + '};\n' +
                File.readAllText(ROOT + '/dumb-enemies-runtime.c');
    
    function log(msg) {
        console.log(PREFIX + msg);
    }
    
    function hex(b) {
        return Array.from(new Uint8Array(b)).map(function (n) {
            return ('0' + n.toString(16)).slice(-2);
        }).join('');
    }
    
    function guard(m) {
        var p = base.add(m.rva);
        var range = Process.findRangeByAddress(p);
        if (!range || range.protection.indexOf('x') < 0 || range.protection.indexOf('r') < 0) {
            throw new Error('Codigo ilegivel em 0x' + m.rva.toString(16));
        }
        var data = p.readVolatile(m.size);
        if (!data || data.byteLength !== m.size || hex(data) !== m.hex) {
            throw new Error('Build/hook divergente em 0x' + m.rva.toString(16));
        }
    }
    
    function checkHotfixes() {
        hotfixFlags.forEach(function (r) {
            if (base.add(r).readU8() !== 0) {
                throw new Error('Hotfix nativo ativo');
            }
        });
    }
    
    function status() {
        var bytes = nativeState.readVolatile(72);
        var v = new DataView(bytes);
        var stats = {};
        specs.forEach(function (s, i) {
            stats[s.name] = {
                observed: v.getUint32(i * 4, true),
                blocked: v.getUint32(16 + i * 4, true),
                forwarded: v.getUint32(32 + i * 4, true)
            };
        });
        return {
            version: 'dumb-enemies-v2',
            enabled: enabled && control.readU32() !== 0,
            replacements: bindings.filter(function (b) { return b.installed; }).length,
            targetIds: ids.length,
            gameVersion: '7.2',
            stats: stats
        };
    }
    
    function detach() {
        bindings.forEach(function (b) {
            if (!b.installed) return;
            try {
                Interceptor.revert(b.address);
                b.installed = false;
            } catch (e) {
                console.error(PREFIX + 'Erro ao remover hook: ' + e);
            }
        });
        Interceptor.flush();
    }
    
    function stop(quiet) {
        enabled = false;
        control.writeU32(0);
        if (!quiet) log('PAUSADO. Filtros desativados.');
        return status();
    }
    
    function install() {
        var prepared = [];
        var patched = false;
        
        try {
            specs.forEach(function (s, i) {
                var slot = Memory.alloc(8);
                slot.writePointer(ptr(0));
                
                var module = new CModule(
                    '#define GATE_KIND ' + (i + 1) + '\n' + source,
                    {
                        state: nativeState,
                        enabled_flag: control,
                        hotfix_ptrs: flagPointers,
                        original_slot: slot,
                        atomic_increment: increment,
                        virtual_query: virtualQuery,
                        get_entity: base.add(0x131f9c40)
                    }
                );
                
                var binding = {
                    address: base.add(s.rva),
                    slot: slot,
                    module: module,
                    installed: false
                };
                prepared.push(binding);
                
                if (!module.dispatch || !module.state_size ||
                    new NativeFunction(module.state_size, 'uint32', [])() !== 72) {
                    throw new Error('ABI nativa divergente');
                }
            });
            
            bindings = prepared;
            
            bindings.forEach(function (b) {
                var original = Interceptor.replaceFast(b.address, b.module.dispatch);
                b.installed = true;
                patched = true;
                b.slot.writePointer(original);
            });
            
            Interceptor.flush();
            
        } catch (e) {
            enabled = false;
            control.writeU32(0);
            if (patched) {
                try {
                    detach();
                } catch (cleanError) {
                    throw new Error(String(e) + '; ' + cleanError);
                }
            }
            prepared.forEach(function (b) {
                try {
                    b.module.dispose();
                } catch (ignored) {}
            });
            bindings = [];
            throw e;
        }
    }
    
    function start() {
        if (enabled && control.readU32() !== 0) return status();
        
        try {
            checkHotfixes();
            if (!bindings.length) {
                methods.forEach(guard);
                install();
            } else if (bindings.some(function (b) { return !b.installed; })) {
                throw new Error('Instalacao incompleta');
            }
            
            nativeState.add(68).writeU32(0);
            enabled = true;
            control.writeU32(1);
            
        } catch (e) {
            enabled = false;
            control.writeU32(0);
            throw e;
        }
        
        log('ATIVO. Monstros bloqueados, player protegido.');
        return status();
    }
    
    function dispose() {
        stop(true);
        try {
            detach();
        } catch (e) {
            console.error(PREFIX + 'Erro ao dispor: ' + e);
        }
        log('ENCERRADO');
        return status();
    }
    
    // Iniciar automaticamente
    try {
        // Don't auto-start - controlled by Python RPC
        // start();
        log('Script carregado com sucesso!');
        log('Use start() via RPC para ativar');
    } catch (e) {
        console.error(PREFIX + 'Erro ao iniciar: ' + e);
        throw e;
    }
    
    // Exportar funções
    rpc.exports = {
        start: start,
        stop: function () { return stop(false); },
        status: status,
        dispose: dispose
    };
    
})();
