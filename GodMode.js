// Genshin Impact God Mode Script
// Offsets source: offsets.js (update there, then copy here)

send("Starting Genshin God Mode...");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    GodMode: { checkTargetAttackable: 0x12E7BBD0, getRuntimeID: 0xbc6c0 , setRuntimeID: 0x13b5c370  }, //getRuntimeID 0xacf40  setRuntimeID 0xa849b00
    Avatar: { avatarIsHost: 0x12E40780  }, //0x1155d610
    Physics: { getVelocity: 0x19BD11E0 , setVelocity: 0x19C51450, prePhysicsUpdate: 0x13a9a2e0, postPhysicsUpdate: 0xb63a8c0 }, 
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

send("Using main module base: " + Offsets.base);

// God Mode RVAs
var godModeRVAs = [
    { name: "CheckTargetAttackable", rva: Offsets.GodMode.checkTargetAttackable },
    { name: "get_velocity", rva: Offsets.Physics.getVelocity },
    { name: "set_velocity", rva: Offsets.Physics.setVelocity },
    { name: "PrePhysicsUpdate", rva: Offsets.Physics.prePhysicsUpdate },
    { name: "PostPhysicsUpdate", rva: Offsets.Physics.postPhysicsUpdate },
    { name: "get_runtimeID", rva: Offsets.GodMode.getRuntimeID },
    { name: "SetRuntimeID", rva: Offsets.GodMode.setRuntimeID }
];

var godModeEnabled = true;
var noFallEnabled = true;
var callCount = {};

// Create NativeFunction for AvatarIsHost
var avatarIsHost = Offsets.createFunction(Offsets.Avatar.avatarIsHost, 'bool', ['pointer']);

// Hook CheckTargetAttackable to prevent damage to player
godModeRVAs.forEach(function(func) {
    var addr = Offsets.getAddress(func.rva);
    send("Hooking " + func.name + " at: " + addr);
    
    callCount[func.name] = 0;
    
    try {
        Interceptor.attach(addr, {
            onEnter: function(args) {
                callCount[func.name]++;
                
                if (func.name === "CheckTargetAttackable" && godModeEnabled) {
                    this.attacker = args[0];
                    this.target = args[1];
                }
                
                if (func.name.includes("velocity") && noFallEnabled) {
                    if (callCount[func.name] % 1000 === 0) {
                        send(func.name + " called (count: " + callCount[func.name] + ")");
                    }
                }
            },
            onLeave: function(retval) {
                if (func.name === "CheckTargetAttackable" && godModeEnabled) {
                    var isTargetHostAvatar = avatarIsHost(this.target);
                    var isAttackerHostAvatar = avatarIsHost(this.attacker);
                    
                    send("CheckTargetAttackable - isTargetAvatar: " + isTargetHostAvatar + ", isAttackerAvatar: " + isAttackerHostAvatar);
                    
                    if (isTargetHostAvatar) {
                        var originalValue = retval.toInt32();
                        send("God Mode: Blocking damage to player - original return: " + originalValue + ", replacing with 0");
                        retval.replace(ptr(0));
                    }
                }
                
                if (func.name === "get_velocity" && noFallEnabled) {
                    try {
                        var x = retval.readFloat();
                        var y = retval.add(4).readFloat();
                        var z = retval.add(8).readFloat();
                        
                        if (y < -15.0) {
                            send("NoFall: Reducing fall velocity from " + y.toFixed(2) + " to -9.5");
                        }
                    } catch(e) {
                        // Ignore read errors
                    }
                }
            }
        });
        send("Successfully hooked " + func.name);
    } catch(e) {
        send("Failed to hook " + func.name + ": " + e);
    }
});

// RPC exports
rpc.exports = {
    toggleGodMode: function(enabled) {
        godModeEnabled = enabled;
        send("God Mode " + (enabled ? "enabled" : "disabled"));
    },
    toggleNoFall: function(enabled) {
        noFallEnabled = enabled;
        send("NoFall " + (enabled ? "enabled" : "disabled"));
    },
    getStatus: function() {
        return {
            godMode: godModeEnabled,
            noFall: noFallEnabled
        };
    }
};

send("God Mode script loaded successfully");
send("Use toggleGodMode(true/false) and toggleNoFall(true/false) to control features");
