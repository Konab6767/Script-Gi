var moduleBase = Process.getModuleByName("GenshinImpact.exe").base;

send("[Talk] Module base: " + moduleBase);

// ============================================
// RVA ADDRESSES
// ============================================
var RVAs = {
    // Time Scale
    Time_get_timeScale: "0x18f8a6e0",
    Time_set_timeScale: "0x18f8a6f0",
    
    // Talk System
    StartTalk: "0x0F34AE20",
    RequestTalkFinish: "0x0F36FF00",
    BeforeStartTalk: "0x0F36D470",
    DoTalkSkip: "0xf35d140",
    CheckIsInTalk: "0xf36d880"
};

// ============================================
// NATIVE FUNCTIONS
// ============================================
// Time scale functions for speed hack
var Time_get_timeScale = new NativeFunction(moduleBase.add(ptr(RVAs.Time_get_timeScale)), 'float', []);
var Time_set_timeScale = new NativeFunction(moduleBase.add(ptr(RVAs.Time_set_timeScale)), 'void', ['float']);

// Skip functions
var DoTalkSkipAddr = moduleBase.add(ptr(RVAs.DoTalkSkip));
var RequestTalkFinishAddr = moduleBase.add(ptr(RVAs.RequestTalkFinish));
var CheckIsInTalkAddr = moduleBase.add(ptr(RVAs.CheckIsInTalk));

var normalTimeScale = 1.0;
var dialogTimeScale = 20.0;
var currentTimeScale = 1.0;

function setTimeScale(scale) {
    try {
        Time_set_timeScale(scale);
        currentTimeScale = scale;
        send("[Speed] TimeScale set to x" + scale);
    } catch (e) {
        send("[Speed] Failed to set TimeScale: " + e);
    }
}

function speedUp() {
    if (currentTimeScale !== dialogTimeScale) {
        setTimeScale(dialogTimeScale);
    }
}

function restoreSpeed() {
    if (currentTimeScale !== normalTimeScale) {
        setTimeScale(normalTimeScale);
    }
}

// Auto-clicker F key
var user32 = Process.getModuleByName("user32.dll");
var keybd_event = new NativeFunction(user32.findExportByName("keybd_event"), 'void', ['uint8', 'uint8', 'uint32', 'pointer']);
var VK_F = 0x46;
var KEYEVENTF_KEYUP = 0x0002;

var clickInterval = null;

function startAutoClick() {
    if (clickInterval) return;
    send("[Click] Auto-click F INICIADO");
    clickInterval = setInterval(function() {
        if (talkActive && autoDialogEnabled) {
            keybd_event(VK_F, 0, 0, ptr(0)); // key down
            keybd_event(VK_F, 0, KEYEVENTF_KEYUP, ptr(0)); // key up
        }
    }, 50); // 20 clicks/sec
}

function stopAutoClick() {
    if (clickInterval) {
        clearInterval(clickInterval);
        clickInterval = null;
        send("[Click] Auto-click F PARADO");
    }
}

var talkActive = false;
var autoDialogEnabled = false;

function autoSkipTalk() {
    if (!talkActive || !autoDialogEnabled) return;
    send("[Talk] Auto-skip triggered");
    try {
        var doSkipFn = new NativeFunction(DoTalkSkipAddr, 'void', [], 'fastcall');
        doSkipFn();
        send("[Talk] DoTalkSkip called SUCCESS");
    } catch (e) {
        send("[Talk] DoTalkSkip failed: " + e);
    }
    try {
        var reqFinishFn = new NativeFunction(RequestTalkFinishAddr, 'bool', ['pointer', 'pointer'], 'fastcall');
        var result = reqFinishFn(ptr(0), ptr(0));
        send("[Talk] RequestTalkFinish = " + result + " SUCCESS");
    } catch (e) {
        send("[Talk] RequestTalkFinish failed: " + e);
    }
}

// Auto-skip when talk starts + SPEED UP + AUTO-CLICK
Interceptor.attach(moduleBase.add(ptr(RVAs.StartTalk)), { // StartTalk
    onEnter: function(args) {
        send("[Talk] StartTalk ENTER");
    },
    onLeave: function(retval) {
        talkActive = true;
        if (autoDialogEnabled) {
            speedUp(); // AUMENTA VELOCIDADE QUANDO INICIA DIALOG
            startAutoClick(); // INICIA AUTO-CLICK F
            send("[Talk] StartTalk LEAVE - dialogo iniciado, speed UP + auto-click F + auto-skip em 100ms, retval=" + retval);
            setTimeout(autoSkipTalk, 100);
        }
    }
});

// Reset when talk ends + RESTORE SPEED + STOP AUTO-CLICK
Interceptor.attach(moduleBase.add(ptr(RVAs.RequestTalkFinish)), { // RequestTalkFinish
    onEnter: function(args) {
        send("[Talk] RequestTalkFinish ENTER - args=" + args.length);
    },
    onLeave: function(retval) {
        send("[Talk] RequestTalkFinish LEAVE - retval=" + retval);
        if (retval.toInt32()) {
            talkActive = false;
            if (autoDialogEnabled) {
                restoreSpeed(); // RESTAURA VELOCIDADE QUANDO TERMINA DIALOG
                stopAutoClick(); // PARA AUTO-CLICK F
                send("[Talk] Conversa finalizada - speed RESTAURADO + auto-click PARADO");
            }
        }
    }
});

// Also restore on BeforeStartTalk (in case of cancel)
Interceptor.attach(moduleBase.add(ptr(RVAs.BeforeStartTalk)), { // BeforeStartTalk
    onLeave: function(retval) {
        if (!talkActive && autoDialogEnabled) {
            restoreSpeed();
            stopAutoClick();
        }
    }
});

send("[Talk] Auto-skip + Auto-speed + Auto-click F ATIVO - dialogos serao acelerados, clicados e pulados automaticamente");

rpc.exports = {
    toggleAutoDialog: function(enabled) {
        autoDialogEnabled = enabled;
        send("[Talk] Auto Dialog " + (enabled ? "enabled" : "disabled"));
        return true;
    },
    getStatus: function() {
        return { enabled: autoDialogEnabled, talkActive: talkActive };
    }
};
