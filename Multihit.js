// Multihit.js - Script para multi-hit usando HEAPIJIOJFB do dump_71
// Testando HEAPIJIOJFB (0xB553AC0) - método de instância em LcAvatarCombat que recebe uint32 e pointer

var multiHitEnabled = true;
var hitCount = 20;

var module = Process.findModuleByName("GenshinImpact.exe");

if (!module) {
    console.log("[*] Multihit: GenshinImpact.exe não encontrado!");
} else {
    console.log("[*] Multihit: GenshinImpact.exe base: " + module.base);
    
    var baseAddr = module.base;
    
    // RVA HEAPIJIOJFB do dump_71_named.cs (LcAvatarCombat)
    var rva_HEAPIJIOJFB = 0xB553AC0;
    
    // Calcular VA
    var va_HEAPIJIOJFB = baseAddr.add(rva_HEAPIJIOJFB);
    
    console.log("[*] Multihit: HEAPIJIOJFB VA: " + va_HEAPIJIOJFB);
    console.log("[*] Multihit: Multi-hit 8x (chamando HEAPIJIOJFB 8 vezes)");
    
    // Criar função original com assinatura: void(pointer, uint32, pointer)
    var original_HEAPIJIOJFB = new NativeFunction(va_HEAPIJIOJFB, 'void', ['pointer', 'uint32', 'pointer']);
    
    // Hook HEAPIJIOJFB
    try {
        Interceptor.attach(va_HEAPIJIOJFB, {
            onEnter: function(args) {
                if (!multiHitEnabled) {
                    return;
                }
                
                console.log("[*] Multihit: HEAPIJIOJFB chamado");
                console.log("    __this: " + args[0]);
                console.log("    uint32: " + args[1]);
                console.log("    pointer: " + args[2]);
                
                // Chamar a função original hitCount vezes para simular multi-hit
                for (var i = 0; i < hitCount; i++) {
                    original_HEAPIJIOJFB(args[0], args[1], args[2]);
                }
                
                console.log("[+] Multihit: " + hitCount + "x damage applied");
            }
        });
        console.log("[*] Multihit: Hook HEAPIJIOJFB instalado - Multi-hit " + hitCount + "x ativado!");
    } catch (e) {
        console.log("[!] Multihit: Erro ao hook HEAPIJIOJFB: " + e);
    }
    
    console.log("[*] Multihit: Ataque no jogo para testar o multi-hit.");
}

rpc.exports = {
    setMultiplier: function(multiplier) {
        hitCount = multiplier;
        console.log("[*] Multi-hit multiplier set to: " + hitCount);
    },
    toggle: function(enabled) {
        multiHitEnabled = enabled;
        console.log("[*] Multi-hit " + (enabled ? "enabled" : "disabled"));
    },
    getStatus: function() {
        return {
            enabled: multiHitEnabled,
            multiplier: hitCount
        };
    }
};
