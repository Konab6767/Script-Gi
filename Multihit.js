// Multi-hit script using Frida
// Hooks the combat function at RVA 0x07AEFA60
// Repeats the damage call 20x (similar to rapid_fire_hits = 20)
// WARNING: RVA may need to be adjusted for GenshinImpact.exe base

console.log("[*] Multi-hit script started");

// Find GenshinImpact.exe module
var genshinImpact = Process.findModuleByName("GenshinImpact.exe");
if (!genshinImpact) {
    console.log("[-] GenshinImpact.exe not found!");
}

console.log("[+] GenshinImpact.exe base: " + genshinImpact.base);

var multiHitEnabled = true;
var hitCount = 20;

// Calculate target address: base + RVA 0x07AEFA60
var combatFuncAddr = genshinImpact.base.add(0x07AEFA60);
console.log("[+] Combat function address: " + combatFuncAddr);

// Create a NativeFunction to call the original combat function
// void __fastcall CombatFunc(void* pThis, void* pHitContext, void* pTarget, void* pParam3)
var combatFunc = new NativeFunction(
    combatFuncAddr,
    'void',
    ['pointer', 'pointer', 'pointer', 'pointer']
);

// Hook the combat function
Interceptor.attach(combatFuncAddr, {
    onEnter: function(args) {
        // args[0] = this pointer (pThis)
        // args[1] = pHitContext
        // args[2] = pTarget
        // args[3] = pParam3
        
        this.pThis = args[0];
        this.pHitContext = args[1];
        this.pTarget = args[2];
        this.pParam3 = args[3];
        
        console.log("[*] Combat hit detected");
    },
    
    onLeave: function(retval) {
        if (!multiHitEnabled) {
            return;
        }
        
        // Repeat the hit based on hitCount
        for (var i = 0; i < hitCount; i++) {
            // Call the original function with the same arguments
            combatFunc(this.pThis, this.pHitContext, this.pTarget, this.pParam3);
        }
        
        console.log("[+] Multi-hit applied: " + hitCount + "x damage");
    }
});

console.log("[*] Hook installed successfully");

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
