// Kill Aura Script - by Joelyson
(function() {
    'use strict';
    var ROOT = 'C:\\Program Files';
    var managed = true;
    var debug = false;
    var PREFIX = '[Legacy Kill Aura] ';
    var game = Process.getModuleByName('GenshinImpact.exe'),
        base = game.base;
    var p = JSON.parse(File.readAllText(ROOT + '/killaura-legacy-continuous-profile.json'));
    var expected = [0x8e7b810, 0x8e7ada0, 0x108762a0, 0x131f9c40, 0x131fcc70, 0x8dc3550, 0x13e54720, 0x13e4dc50, 0x12e9de40, 0x10876010, 0x9b66850];
    if (Process.arch !== 'x64' || typeof CModule !== 'function' || p.version !== 'killaura-legacy-continuous-v2-7.2' || p.moduleSize !== game.size ||
        p.stateSize !== 128 || p.cooldownSlots !== 128 || p.maxAttempts !== null || p.automaticTimeoutMs !== null || p.restoreTaskOnReturn !== false || p.destinationX !== 1000000 ||
        typeof p.sharedHelpers !== 'string' || !Array.isArray(p.methods) || p.methods.length !== expected.length || expected.some(function(r) {
            return p.methods.filter(function(m) {
                return m.rva === r;
            }).length !== 1;
        }) ||
        !Array.isArray(p.targetIds) || !p.targetIds.length || p.targetIds.length > 8192 || p.targetIds.some(function(id, i) {
            return !Number.isInteger(id) || id < 1 || id > 0xffffffff || (i && p.targetIds[i - 1] >= id);
        }) ||
        !Array.isArray(p.hotfixFlags) || p.hotfixFlags.length > 256 || p.hotfixFlags.some(function(r) {
            return !Number.isInteger(r) || r < 1 || r >= game.size;
        })) throw Error('Perfil Legacy continuo divergente.');

    function hex(b) {
        return Array.from(new Uint8Array(b)).map(function(x) {
            return ('0' + x.toString(16)).slice(-2);
        }).join('');
    }
    p.methods.forEach(function(m) {
        var at = base.add(m.rva),
            r = Process.findRangeByAddress(at);
        if (!Number.isInteger(m.rva) || !Number.isInteger(m.size) || m.size < 1 || m.size > 65536 || m.rva < 1 || m.rva + m.size > game.size ||
            m.boundarySource !== 'PE-exception-directory' || typeof m.hex !== 'string' || !/^[0-9a-f]+$/.test(m.hex) || m.hex.length !== m.size * 2 ||
            !r || r.protection.indexOf('r') < 0 || r.protection.indexOf('x') < 0 || at.add(m.size).compare(r.base.add(r.size)) > 0 || hex(at.readVolatile(m.size)) !== m.hex)
            throw Error('Codigo divergente em 0x' + m.rva.toString(16) + '. Nenhum hook instalado.');
    });
    p.hotfixFlags.forEach(function(r) {
        if (base.add(r).readU8()) throw Error('Hotfix ativo. Nenhum hook instalado.');
    });
    var k = Process.getModuleByName('kernel32.dll'),
        u = Process.getModuleByName('user32.dll');
    var tick = new NativeFunction(k.getExportByName('GetTickCount64'), 'uint64', []);
    var close = new NativeFunction(k.getExportByName('CloseHandle'), 'int', ['pointer']);
    var mutex = new SystemFunction(k.getExportByName('CreateMutexW'), 'pointer', ['pointer', 'int', 'pointer']);
    var key = new NativeFunction(u.getExportByName('GetAsyncKeyState'), 'int16', ['int']);
    var controlSleep = new NativeFunction(k.getExportByName('Sleep'), 'void', ['uint32'], {
        scheduling: 'cooperative'
    });
    // Default configuration
    var defaultConfig = {
        range: 60,
        onlyTargeted: true,
        delayMs: 0,
        mode: 'instant',
        attackDelayMs: 250,
        repeatDelayMs: 1000,
        crashDamageMultiplier: 1
    };

    var state = Memory.alloc(128),
        active = Memory.alloc(4),
        size = Memory.alloc(8),
        options = Memory.alloc(16),
        cooldowns = Memory.alloc(128 * 32),
        flags = Memory.alloc(Math.max(1, p.hotfixFlags.length) * 8),
        cas = Memory.alloc(Process.pageSize);
    state.writeByteArray(new Array(128).fill(0));
    cooldowns.writeByteArray(new Array(128 * 32).fill(0));
    active.writeU32(0);
    size.writeU64(game.size);
    options.writeFloat(defaultConfig.range);
    options.add(4).writeU32(defaultConfig.onlyTargeted ? 1 : 0);
    options.add(8).writeFloat(defaultConfig.range * defaultConfig.range);
    options.add(12).writeU32(defaultConfig.delayMs);
    p.hotfixFlags.forEach(function(r, i) {
        flags.add(i * 8).writePointer(base.add(r));
    });
    Memory.patchCode(cas, 8, function(at) {
        at.writeByteArray([0x44, 0x89, 0xc0, 0xf0, 0xf, 0xb1, 0x11, 0xc3]);
    });
    if (!Memory.protect(cas, Process.pageSize, 'r-x')) throw Error('Trava nativa indisponivel.');
    var hooks = [],
        module = null,
        retained = [state, active, size, options, cooldowns, flags, cas],
        lease = null,
        timer = null,
        stopping = false,
        disposed = false,
        errors = [];
    var selectedMode = 'instant',
        damageApi = null,
        damagePending = [],
        attackDelayMs = 250,
        repeatDelayMs = 1000,
        crashDamageMultiplier = 1,
        lastDamageLog = 0,
        lastDamageMessage = '';

    function cleanDamagePending() {
        damagePending = damagePending.filter(function(api) {
            try {
                return !api.stop();
            } catch (e) {
                if (errors.length < 32) errors.push(String(e));
                return true;
            }
        });
        return damagePending.length === 0;
    }

    function loadDamage() {
        if (damageApi) return;
        if (!cleanDamagePending()) throw Error('Remocao dos modos por dano pendente.');
        if (new NativeFunction(module.target_size, 'uint32', [])() !== 48) throw Error('ABI do alvo de dano divergente.');
        damageApi = Function(File.readAllText(ROOT + '/killaura-damage-modes.js'))()({
            root: ROOT,
            game: game,
            base: base,
            pid: Process.id,
            rootSlot: base.add(0x0000000),
            move: base.add(0x8e7b810),
            active: active,
            cas: cas,
            inspectEntity: module.inspect_entity,
            kernel: k,
            user: u,
            sharedHooks: typeof MENU_KILLAURA_SHARED_HOOKS === 'function' ? MENU_KILLAURA_SHARED_HOOKS() : [],
            retain: function(api) {
                retained.push(api);
                damagePending.push(api);
            },
            read: function(path) {
                return File.readAllText(path);
            },
            range: function(at) {
                return Process.findRangeByAddress(at);
            },
            compile: function(code, bindings) {
                return new CModule(code, bindings);
            },
            attach: function(at, callbacks) {
                return Interceptor.attach(at, callbacks);
            },
            flush: function() {
                Interceptor.flush();
            }
        });
        damagePending = damagePending.filter(function(api) {
            return api !== damageApi;
        });
        console.log(PREFIX + 'MODOS POR DANO PRONTOS. Crash experimental usa a fabrica e a ordem dos campos do produtor nativo atual; ataques usam clique esquerdo e o alcance original da arma.');
    }

    function now() {
        return tick().toNumber() >>> 0;
    }

    function report() {
        var before = state.add(4).readU32(),
            v = new DataView(state.readByteArray(128)),
            s = {};
        ['lock', 'sequence', 'enabled', 'writes', 'started', 'firstWriteAt', 'inFlight', 'reason', 'firstTargetId', 'firstConfigId', 'avatarId', 'firstThreadId', 'calls', 'rejected', 'conversionsObserved', 'hpChanges', 'hpValid', 'localZeroObserved', 'entityMissingObserved', 'hpUpdateCallbacks'].forEach(function(n, i) {
            s[n] = v.getUint32(i * 4, true);
        });
        ['hpBefore', 'lastHp', 'maximumHp'].forEach(function(n, i) {
            s[n] = s.hpValid ? v.getFloat32(80 + i * 4, true) : null;
        });
        if (s.hpBefore !== null && s.hpBefore < 0) s.hpBefore = null;
        ['originalX', 'originalY', 'originalZ', 'distanceSquared'].forEach(function(n, i) {
            s[n] = s.writes ? v.getFloat32(92 + i * 4, true) : null;
        });
        s.firstZeroAtMs = s.localZeroObserved ? v.getUint32(108, true) : null;
        s.identityLost = !!v.getUint32(112, true);
        s.reasonMeaning = {
            0: 'applied-or-idle',
            2: 'hotfix-active',
            4: 'invalid-entity-or-combat',
            5: 'not-targeting-local-avatar',
            7: 'position-unavailable',
            8: 'outside-radius',
            10: 'task-not-writable',
            11: 'per-target-delay',
            12: 'cooldown-table-busy'
        } [s.reason] || 'unknown';
        var damage = damageApi ? damageApi.report() : null;
        s.mode = selectedMode;
        if (selectedMode !== 'instant' && damage) {
            s.enabled = damage.enabled;
            s.reason = damage.reason;
            s.reasonMeaning = damage.reasonMeaning;
            s.crashEvents = damage.crashEvents;
            s.attackPresses = damage.attackPresses;
            s.attackReleases = damage.attackReleases;
            s.inputErrors = damage.inputErrors;
            s.crashClassObserved = damage.crashClassObserved;
            s.factoryReady = damage.factoryReady;
            s.sceneCallbacks = damage.sceneCallbacks;
            s.selectorCallbacks = damage.selectorCallbacks;
            s.scanPasses = damage.scanPasses;
            s.scanned = damage.scanned;
            s.crashDamageMultiplier = damage.crashDamageMultiplier;
            s.crashVelocityMagnitude = damage.crashVelocityMagnitude;
            s.damageLastHp = damage.lastHp;
            s.damageLastTargetId = damage.lastTargetId;
        }
        return {
            version: 'killaura-legacy-continuous-v2-7.2',
            active: !!active.readU32(),
            enabled: !!s.enabled,
            disposed: disposed,
            stats: s,
            errors: errors.slice(),
            snapshotCoherent: s.lock === 0 && s.inFlight === 0 && state.readU32() === 0 && state.add(24).readU32() === 0 && before === s.sequence && before === state.add(4).readU32() && !(before & 1) && (!damage || damage.snapshotCoherent),
            lastError: s.reason === 2 ? 'Hotfix ativado; KillAura suspensa.' : s.reason === 22 ? 'O Windows nao inseriu o comando de ataque; automacao desligada.' : s.reason === 26 ? 'Alocacao do evento de queda invalida; modo experimental desligado.' : null,
            settings: {
                range: options.readFloat(),
                onlyTargeted: !!options.add(4).readU32(),
                delayMs: options.add(12).readU32(),
                mode: selectedMode,
                attackDelayMs: attackDelayMs,
                repeatDelayMs: repeatDelayMs,
                crashDamageMultiplier: crashDamageMultiplier
            },
            mode: selectedMode,
            damage: damage,
            crashDamageConsumerConfirmed: false,
            normalAttackDamage: 'character-original',
            source: selectedMode === 'instant' ? 'old-scripts-unity/KillAura.cpp OnSyncTask / Instant Death' : selectedMode === 'crash' ? 'old-scripts-unity/KillAura.cpp Crash Damage (experimental)' : 'Ordinary left-mouse attack input',
            continuous: true,
            attemptLimit: null,
            automaticTimeoutMs: null,
            taskRestored: false,
            HPGate: selectedMode === 'crash',
            focusGate: selectedMode !== 'instant',
            taskPositionMatchGate: false,
            resourcesRetained: retained.length + (module ? 1 : 0),
            worldWrites: s.writes > 0 || !!(damage && damage.crashEvents),
            hpWrites: false,
            damageModified: false,
            killConfirmed: false,
            questCreditConfirmed: false,
            interpretation: selectedMode === 'instant' ? 'Continuous original movement conversions; task X remains modified. Write/conversion totals cover all eligible monsters; HP diagnostics describe only the first affected entity. Local HP/disappearance do not establish quest credit.' : 'Experimental optional mode. Crash events sent and mouse presses are attempts, not confirmed hits or challenge credit. Normal attacks keep original character damage and weapon reach; range only selects nearby targets. No HP percentage is imposed.'
        };
    }

    function save() {
        var r = report(),
            f = new File(ROOT + '/killaura-legacy-continuous-report.json', 'w');
        try {
            f.write(JSON.stringify(r, null, 2));
            f.flush();
        } finally {
            f.close();
        }
        console.log(PREFIX + 'RESULT ' + JSON.stringify(r.stats));
        return r;
    }

    function controlFailure(error, rollback) {
        var e = Error(String(error) + '; restauracao incompleta: ' + rollback);
        e.controlBusy = !!(error.controlBusy || rollback.controlBusy);
        e.retainModule = !!(error.retainModule || rollback.retainModule);
        return e;
    }

    function legacyControl(fn, args, action) {
        var began = Date.now(),
            result;
        // A callback may release the lock between the failed CAS and this JS read.
        // Only a later successful attempt proves acceptance; a zero lock is not a
        // rejection signal. Arguments were validated before entering this helper.
        do {
            result = fn.apply(null, args);
            if (result === 1) return;
            controlSleep(1);
        } while (Date.now() - began < 125);
        if (!active.readU32() || p.hotfixFlags.some(function(r) {
                return base.add(r).readU8() !== 0;
            })) throw Error('Controle Legacy indisponivel: ' + action + '; instancia encerrada ou hotfix ativo.');
        var e = Error('Controle Legacy ocupado: ' + action + '; lock=' + state.readU32() + ', inFlight=' + state.add(24).readU32() + ', sequence=' + state.add(4).readU32() + '. Estado anterior preservado.');
        e.controlBusy = true;
        e.retainModule = true;
        throw e;
    }

    function applyEnabled(value, mode) {
        var nativeEnabled = new NativeFunction(module.set_enabled, 'uint32', ['uint32'], {
                scheduling: 'cooperative'
            }),
            previous = state.add(8).readU32(),
            desired = value && mode === 'instant' ? 1 : 0,
            changed = false;
        try {
            if (previous !== desired) {
                legacyControl(nativeEnabled, [desired], value ? 'ligar' : 'pausar');
                changed = true;
            }
            if (damageApi) {
                var d = damageApi.report(),
                    damageDesired = value && mode !== 'instant';
                if (!!d.enabled !== damageDesired || (!damageDesired && d.mousePressed)) damageApi.setEnabled(damageDesired);
            }
        } catch (e) {
            if (changed) {
                try {
                    legacyControl(nativeEnabled, [previous], 'restaurar estado');
                } catch (rollback) {
                    throw controlFailure(e, rollback);
                }
            }
            throw e;
        }
    }

    function setEnabled(value) {
        if (typeof value !== 'boolean') throw Error('enabled deve ser boolean.');
        if (disposed || stopping) {
            if (!value) return report();
            throw Error('Instancia encerrada.');
        }
        applyEnabled(value, selectedMode);
        console.log(PREFIX + (value ? 'ON ' : 'OFF ') + selectedMode);
        return report();
    }

    function configure(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Configuracao invalida.');
        var range = value.range === undefined ? options.readFloat() : value.range,
            only = value.onlyTargeted === undefined ? !!options.add(4).readU32() : value.onlyTargeted;
        var delay = value.delayMs === undefined ? options.add(12).readU32() : value.delayMs;
        var mode = value.mode === undefined ? selectedMode : value.mode,
            attack = value.attackDelayMs === undefined ? attackDelayMs : value.attackDelayMs,
            repeat = value.repeatDelayMs === undefined ? repeatDelayMs : value.repeatDelayMs;
        var multiplier = value.crashDamageMultiplier === undefined ? crashDamageMultiplier : value.crashDamageMultiplier;
        if (['instant', 'crash', 'attacks'].indexOf(mode) < 0 || !Number.isInteger(attack) || attack < 100 || attack > 5000 || !Number.isInteger(repeat) || repeat < 100 || repeat > 10000) throw Error('Use modo instant/crash/attacks, attackDelayMs 100..5000 e repeatDelayMs 100..10000.');
        if (!Number.isFinite(range) || range < 5 || range > 100 || typeof only !== 'boolean' || !Number.isInteger(delay) || delay < 0 || delay > 5000 || disposed || stopping) throw Error('Use range 5..100, delayMs 0..5000 inteiro e onlyTargeted boolean.');
        if (!Number.isFinite(multiplier) || multiplier < 0.001 || multiplier > 10) throw Error('Use crashDamageMultiplier 0.001..10.');
        var raw = new DataView(new ArrayBuffer(8));
        raw.setFloat32(0, range, true);
        raw.setFloat32(4, range * range, true);
        var previous = report().settings,
            wasEnabled = report().enabled;
        if (Math.fround(range) === previous.range && only === previous.onlyTargeted && delay === previous.delayMs && mode === previous.mode && attack === previous.attackDelayMs && repeat === previous.repeatDelayMs && Math.fround(multiplier) === Math.fround(previous.crashDamageMultiplier)) return report();
        // Compile and validate a new optional runtime before touching the active mode.
        if (mode !== 'instant') loadDamage();
        var nativeConfigure = new NativeFunction(module.configure, 'uint32', ['uint32', 'uint32', 'uint32', 'uint32'], {
                scheduling: 'cooperative'
            }),
            paused = false,
            baseApplied = false,
            damageApplied = false;
        try {
            if (wasEnabled) {
                applyEnabled(false, previous.mode);
                paused = true;
            }
            legacyControl(nativeConfigure, [raw.getUint32(0, true), raw.getUint32(4, true), only ? 1 : 0, delay], 'configurar');
            baseApplied = true;
            if (damageApi && mode !== 'instant') {
                damageApi.configure(mode, attack, repeat, multiplier);
                damageApplied = true;
            }
            if (wasEnabled) applyEnabled(true, mode);
            selectedMode = mode;
            attackDelayMs = attack;
            repeatDelayMs = repeat;
            crashDamageMultiplier = multiplier;
        } catch (e) {
            // An unacquired lock has changed nothing. Do not start another transaction
            // to restore settings which were never applied.
            if (!paused && !baseApplied && !damageApplied) throw e;
            var old = new DataView(new ArrayBuffer(8));
            old.setFloat32(0, previous.range, true);
            old.setFloat32(4, previous.range * previous.range, true);
            try {
                if (baseApplied) legacyControl(nativeConfigure, [old.getUint32(0, true), old.getUint32(4, true), previous.onlyTargeted ? 1 : 0, previous.delayMs], 'restaurar configuracao');
                if (damageApplied && previous.mode !== 'instant') damageApi.configure(previous.mode, previous.attackDelayMs, previous.repeatDelayMs, previous.crashDamageMultiplier);
                if (paused) applyEnabled(wasEnabled, previous.mode);
            } catch (rollback) {
                errors.push('Falha ao restaurar configuracao: ' + rollback);
                throw controlFailure(e, rollback);
            }
            throw e;
        }
        if (debug) console.log(PREFIX + 'CONFIG ' + JSON.stringify(report().settings));
        return report();
    }

    function stop() {
        if (disposed) return report();
        active.writeU32(0);
        state.add(8).writeU32(0);
        stopping = true;
        if (!cleanDamagePending()) return report();
        if (damageApi && !damageApi.stop()) return report();
        if (lease) {
            close(lease.value);
            lease = null;
        }
        if (state.add(24).readU32()) return report();
        var pending = [];
        hooks.forEach(function(h) {
            try {
                h.detach();
            } catch (e) {
                pending.push(h);
                errors.push(String(e));
            }
        });
        hooks = pending;
        Interceptor.flush();
        if (!hooks.length) {
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }
            if (lease) {
                close(lease.value);
                lease = null;
            }
            disposed = true;
        }
        return managed ? report() : save();
    }
    lease = mutex(ptr(0), 0, Memory.allocUtf16String('Local\\KillAuraCombatProbe-' + Process.id));
    if (lease.value.isNull()) throw Error('Trava indisponivel.');
    if (lease.lastError === 183) {
        close(lease.value);
        lease = null;
        throw Error('Descarregue o teste/probe anterior.');
    }
    try {
        var source = '#define TARGET_COUNT ' + p.targetIds.length + '\n#define HOTFIX_COUNT ' + p.hotfixFlags.length + '\nstatic const unsigned int target_ids[]={' + p.targetIds.join(',') + '};\n' + File.readAllText(ROOT + '/killaura-legacy-continuous.c').replace('/* SHARED_HELPERS */', p.sharedHelpers);
        module = new CModule(source, {
            legacy_state: state,
            options: options,
            cooldowns: cooldowns,
            active_flag: active,
            module_size: size,
            module_base: base,
            root_slot: base.add(0x0000000),
            hotfix_ptrs: flags,
            compare_exchange: cas,
            virtual_query: k.getExportByName('VirtualQuery'),
            tick_ms: k.getExportByName('GetTickCount64'),
            thread_id: k.getExportByName('GetCurrentThreadId'),
            get_entity: base.add(0x131f9c40),
            get_current: base.add(0x13e54720),
            is_host: base.add(0x131fcc70)
        });
        if (new NativeFunction(module.state_size, 'uint32', [])() !== 128 || new NativeFunction(module.cooldown_size, 'uint32', [])() !== 32) throw Error('ABI Legacy continuo divergente.');
        hooks.push(Interceptor.attach(base.add(0x8e7b810), {
            onEnter: module.onEnter,
            onLeave: module.onLeave
        }));
        hooks.push(Interceptor.attach(base.add(0x108762a0), {
            onEnter: module.hpEnter,
            onLeave: module.hpLeave
        }));
        Interceptor.flush();
        state.add(16).writeU32(now());
        active.writeU32(1);
        // Auto-enable for testing
        setEnabled(true);
        var ready = false,
            prevToggle = true,
            prevStop = true,
            lastSave = now(),
            lastTimerError = null;
        timer = setInterval(function() {
            try {
                cleanDamagePending();
                if (damageApi) damageApi.service();
                if (stopping || !active.readU32()) {
                    stop();
                    return;
                }
                if (debug && selectedMode !== 'instant' && damageApi && ((now() - lastDamageLog) >>> 0) >= 5000) {
                    var d = damageApi.report(),
                        message = JSON.stringify({
                            mode: selectedMode,
                            enabled: !!d.enabled,
                            reason: d.reasonMeaning,
                            factoryReady: d.factoryReady,
                            selectorCallbacks: d.selectorCallbacks,
                            sceneCallbacks: d.sceneCallbacks,
                            scanned: d.scanned,
                            lock: d.lock,
                            inFlight: d.inFlight,
                            sequence: d.sequence,
                            controlWaiting: d.controlWaiting,
                            crashDamageMultiplier: d.crashDamageMultiplier,
                            crashVelocityMagnitude: d.crashVelocityMagnitude,
                            crashEvents: d.crashEvents,
                            attackPresses: d.attackPresses,
                            inputErrors: d.inputErrors
                        });
                    if (message !== lastDamageMessage) {
                        console.log(PREFIX + 'DANO ' + message);
                        lastDamageMessage = message;
                    }
                    lastDamageLog = now();
                }
                if (managed) return;
                var down = (key(0x67) & 0x8000) !== 0,
                    end = (key(0x68) & 0x8000) !== 0;
                if (!ready) {
                    if (!down && !end) ready = true;
                } else {
                    if (end && !prevStop) {
                        stop();
                        return;
                    }
                    if (down && !prevToggle) setEnabled(!report().enabled);
                }
                prevToggle = down;
                prevStop = end;
                if (debug) {
                    var current = now();
                    if (((current - lastSave) >>> 0) >= 5000) {
                        save();
                        lastSave = current;
                    }
                }
            } catch (e) {
                if (errors.length < 32) errors.push(String(e));
                if (lastTimerError !== String(e)) {
                    lastTimerError = String(e);
                    console.log(PREFIX + lastTimerError);
                }
            }
        }, 25);
        send(PREFIX + 'Exportando RPC...');
        rpc.exports = {
            getreport: report,
            setenabled: setEnabled,
            configure: configure,
            save: save,
            stop: stop,
            dispose: stop
        };
        send(PREFIX + 'RPC exportado com sucesso!');
        console.log(PREFIX + (managed ? 'PRONTO, OFF. Controle pelo menu; distancia, delay e aggro configuraveis.' : 'PRONTO, OFF. NUMPAD 7 liga/desliga CONTINUO; 8 encerra. Raio 15m, OnlyTargeted=true. X=1.000.000 sem restaurar a tarefa.'));
    } catch (e) {
        errors.push(String(e));
        stop();
        throw e;
    }
}());
