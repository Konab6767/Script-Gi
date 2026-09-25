var moduleBase = Process.getModuleByName("GenshinImpact.exe").base;
var RVA_get_timeScale = 0x19BE87F0;
var RVA_set_timeScale = 0x19BE8800;
var RVA_MonoTalkDialog_OnEnable = 0xf2e5440;
var RVA_MonoTalkDialog_HideDialog = 0xf2e2cf0;
var get_timeScale = new NativeFunction(moduleBase.add(RVA_get_timeScale), 'float', []);
var set_timeScale = new NativeFunction(moduleBase.add(RVA_set_timeScale), 'void', ['float']);
var user32 = Process.getModuleByName("user32.dll");
var keybd_event = new NativeFunction(user32.findExportByName("keybd_event"), 'void', ['uint8', 'uint8', 'uint32', 'pointer']);
var VK_SPACE = 0x20;
var VK_F = 0x46;
var KEYEVENTF_KEYUP = 0x0002;
var talkActive = false;
var autoDialogEnabled = true;
var useFKey = false;
var dialogVelocity = 20.0;
var clickInterval = null;
var currentTalkDialog = null;
var normalTimeScale = 1.0;
var dialogTimeScale = 20.0;

function setTimeScale(scale) {
    try {
        set_timeScale(scale);
    } catch (e) {
        // Silent error
    }
}

function pressKey() {
    var vk = useFKey ? VK_F : VK_SPACE;
    keybd_event(vk, 0, 0, ptr(0)); // key down
    keybd_event(vk, 0, KEYEVENTF_KEYUP, ptr(0)); // key up
}

// Hook MonoTalkDialog_OnEnable - dialog starts
Interceptor.attach(moduleBase.add(RVA_MonoTalkDialog_OnEnable), {
    onEnter: function(args) {
        if (!talkActive && autoDialogEnabled) {
            talkActive = true;
            currentTalkDialog = args[0];
            
            // Set speed to dialogVelocity
            dialogTimeScale = dialogVelocity;
            setTimeScale(dialogTimeScale);
            
            // Start auto-click key every 0.1 seconds
            if (clickInterval) clearInterval(clickInterval);
            clickInterval = setInterval(function() {
                if (talkActive && autoDialogEnabled) {
                    pressKey();
                }
            }, 100); // 0.1 seconds
        }
    }
});

// Hook MonoTalkDialog_HideDialog - dialog ends
Interceptor.attach(moduleBase.add(RVA_MonoTalkDialog_HideDialog), {
    onEnter: function(args) {
        var hide = args[1].toInt32();
        if (hide && talkActive) {
            talkActive = false;
            currentTalkDialog = null;
            
            // Stop auto-click
            if (clickInterval) {
                clearInterval(clickInterval);
                clickInterval = null;
            }
            
            // Restore speed to 1x
            setTimeScale(normalTimeScale);
        }
    }
});

// RPC Functions
rpc.exports = {
    toggleAutoDialog: function(enabled, useF, velocity) {
        autoDialogEnabled = enabled;
        useFKey = useF || false;
        if (velocity) {
            dialogVelocity = velocity;
        }
        if (!enabled && clickInterval) {
            clearInterval(clickInterval);
            clickInterval = null;
            talkActive = false;
            setTimeScale(normalTimeScale);
        }
        return { success: true, enabled: autoDialogEnabled, useFKey: useFKey, velocity: dialogVelocity };
    },
    setVelocity: function(velocity) {
        dialogVelocity = velocity;
        if (talkActive) {
            dialogTimeScale = dialogVelocity;
            setTimeScale(dialogTimeScale);
        }
        return { success: true, velocity: dialogVelocity };
    },
    getStatus: function() {
        return {
            enabled: autoDialogEnabled,
            active: talkActive,
            speed: dialogTimeScale,
            useFKey: useFKey,
            velocity: dialogVelocity
        };
    }
};
