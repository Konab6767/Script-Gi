// FOV Changer - Based on Cheat Engine script by m a g o
// Hooka FOV calculation and modifies it

var moduleBase = Process.getModuleByName("GenshinImpact.exe").base;

// Pattern to scan for: F3 0F 11 83 ? ? ? ? 66 C7 83 ? ? ? ? ? ? 48 83 C4
var pattern = "F3 0F 11 83 ?? ?? ?? ?? 66 C7 83 ?? ?? ?? ?? ?? 48 83 C4";

var hookAddress = null;
var hookEnabled = false;
var targetFOV = 65.0;
var fovMultiplier = 0.05;

// Scan for the pattern
Memory.scan(moduleBase, moduleBase.add(Process.getModuleByName("GenshinImpact.exe").size).sub(moduleBase), pattern, {
    onMatch: function(address, size) {
        hookAddress = address;
        send("[FOV] Pattern found at: " + address);
    },
    onComplete: function() {
        if (hookAddress) {
            send("[FOV] Hook installed successfully");
            installHook();
        } else {
            send("[FOV] Pattern not found");
        }
    }
});

function installHook() {
    if (hookEnabled || !hookAddress) return;
    
    try {
        Interceptor.attach(hookAddress, {
            onEnter: function(args) {
                // Original CE logic:
                // movss xmm0,[rbx+a58]
                // movss xmm1,[_675852]  (65.0)
                // subss xmm1,xmm0
                // mulss xmm1,[_878725] (0.05)
                // addss xmm0,xmm1
                // movss xmm6,xmm0
                // movss [rbx+a58],xmm6
                
                // args[0] = rbx
                var rbx = args[0];
                var xmm0 = rbx.add(0xA58).readFloat(); // Read current FOV from [rbx+a58]
                
                // Calculate new FOV: newFOV = currentFOV + (65.0 - currentFOV) * 0.05
                var newFOV = xmm0 + (targetFOV - xmm0) * fovMultiplier;
                
                // Write back to [rbx+a58]
                rbx.add(0xA58).writeFloat(newFOV);
            }
        });
        hookEnabled = true;
        send("[FOV] Hook enabled");
    } catch (e) {
        send("[FOV] Failed to install hook: " + e);
    }
}

function setFOV(value) {
    targetFOV = value;
    send("[FOV] Target FOV set to: " + value);
}

function setMultiplier(value) {
    fovMultiplier = value;
    send("[FOV] FOV multiplier set to: " + value);
}

function enableFOV() {
    if (!hookEnabled && hookAddress) {
        installHook();
    }
}

function disableFOV() {
    if (hookEnabled) {
        Interceptor.detachAll();
        hookEnabled = false;
        send("[FOV] Hook disabled");
    }
}

rpc.exports = {
    setFOV: setFOV,
    setMultiplier: setMultiplier,
    enableFOV: enableFOV,
    disableFOV: disableFOV,
    toggleFOV: function(enabled) {
        if (enabled) {
            enableFOV();
        } else {
            disableFOV();
        }
        return true;
    },
    getStatus: function() {
        return { enabled: hookEnabled, fov: targetFOV, multiplier: fovMultiplier };
    }
};

send("[FOV] FOV script loaded - scanning for pattern...");
