// Genshin Impact High Damage Script
// Offsets source: offsets.js (update there, then copy here)

send("[Damage.js] Starting damage script!\n");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Damage: { calculateDamage: 0xbe88790, showOneDamageText: 0xdf70500, showDamageText: 0xdf71020 },
    getAddress: function(o) { return this.base.add(o); }
};

send("[Damage.js] Module base: " + Offsets.base + "\n");

// Hook damage calculation function
var damageFuncAddr = Offsets.getAddress(Offsets.Damage.calculateDamage);
send("[Damage.js] Hooking damage calculation function at: " + damageFuncAddr);

Interceptor.attach(damageFuncAddr, {
    onEnter: function(args) {
        send("[Damage.js] Damage calculation function called!");
    },
    onLeave: function(retval) {
        send("[Damage.js] Original damage: " + retval.toFloat());
        retval.replace(9999999);
        send("[Damage.js] Changed damage to 9999999!");
    }
});

// Hook UI functions to make damage text show 9999999
var showDamageFuncs = [
    { name: "ShowOneDamageText", offset: Offsets.Damage.showOneDamageText, damageArgIndex: 3 },
    { name: "ShowDamageText", offset: Offsets.Damage.showDamageText, damageArgIndex: 2 }
];

showDamageFuncs.forEach(function(func) {
    try {
        var addr = Offsets.getAddress(func.offset);
        send("[Damage.js] Hooking UI damage function " + func.name + " at " + addr);
        
        Interceptor.attach(addr, {
            onEnter: function(args) {
                send("[Damage.js] " + func.name + " called!");
                try {
                    args[func.damageArgIndex].writeFloat(9999999);
                    send("[Damage.js] Updated UI damage text to 9999999!");
                } catch(e) {
                    send("[Damage.js] Error updating UI damage: " + e);
                }
            }
        });
        
        send("[Damage.js] Successfully hooked UI function " + func.name);
    } catch(e) {
        send("[Damage.js] Failed to hook UI function " + func.name + ": " + e);
    }
});

send("[Damage.js] Script loaded! Now ATTACK SOMETHING!\n");
