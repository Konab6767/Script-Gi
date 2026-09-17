var moduleBase = Process.getModuleByName("GenshinImpact.exe").base;

send("[Talk] Module base: " + moduleBase);

// Time scale functions for speed hack
var Time_get_timeScale = new NativeFunction(moduleBase.add(ptr("0x18f8a6e0")), 'float', []);
var Time_set_timeScale = new NativeFunction(moduleBase.add(ptr("0x18f8a6f0")), 'void', ['float']);

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
        if (talkActive) {
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

// Skip functions via Interceptor (safer for IL2CPP)
var DoTalkSkipAddr = moduleBase.add(ptr("0xf35d140"));
var RequestTalkFinishAddr = moduleBase.add(ptr("0xf36ff00"));//("0xe9c5e70"));
var CheckIsInTalkAddr = moduleBase.add(ptr("0xf36d880"));

var talkActive = false;

function autoSkipTalk() {
    if (!talkActive) return;
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
Interceptor.attach(moduleBase.add(ptr("0xe9b8780")), { // StartTalk
    onEnter: function(args) {
        send("[Talk] StartTalk ENTER");
    },
    onLeave: function(retval) {
        talkActive = true;
        speedUp(); // AUMENTA VELOCIDADE QUANDO INICIA DIALOG
        startAutoClick(); // INICIA AUTO-CLICK F
        send("[Talk] StartTalk LEAVE - dialogo iniciado, speed UP + auto-click F + auto-skip em 100ms, retval=" + retval);
        setTimeout(autoSkipTalk, 100);
    }
});

Interceptor.attach(moduleBase.add(ptr("0xe9cf080")), { // OnCreateTalkFinish
    onEnter: function(args) {
        send("[Talk] OnCreateTalkFinish ENTER");
    },
    onLeave: function(retval) {
        send("[Talk] OnCreateTalkFinish LEAVE - retval=" + retval + ", talkActive=" + talkActive);
        if (talkActive) {
            send("[Talk] Talk criado - auto-skip imediato");
            autoSkipTalk();
        }
    }
});

// Reset when talk ends + RESTORE SPEED + STOP AUTO-CLICK
Interceptor.attach(moduleBase.add(ptr("0xf36ff00")), { // RequestTalkFinish
    onEnter: function(args) {
        send("[Talk] RequestTalkFinish ENTER - args=" + args.length);
    },
    onLeave: function(retval) {
        send("[Talk] RequestTalkFinish LEAVE - retval=" + retval);
        if (retval.toInt32()) {
            talkActive = false;
            restoreSpeed(); // RESTAURA VELOCIDADE QUANDO TERMINA DIALOG
            stopAutoClick(); // PARA AUTO-CLICK F
            send("[Talk] Conversa finalizada - speed RESTAURADO + auto-click PARADO");
        }
    }
});

// Also restore on BeforeStartTalk (in case of cancel)
Interceptor.attach(moduleBase.add(ptr("0xf36d470")), { // BeforeStartTalk
    onLeave: function(retval) {
        if (!talkActive) {
            restoreSpeed();
            stopAutoClick();
        }
    }
});

send("[Talk] Auto-skip + Auto-speed + Auto-click F ATIVO - dialogos serao acelerados, clicados e pulados automaticamente");

var talkRVAs = [
    { name: "StartTalk", rva: "0xe9b8780" },
    { name: "StartTalkInternal", rva: "0xe9d88c0" },
    { name: "BeforeStartTalk", rva: "0xe9d2990" },
    { name: "GetDummyPointFromTalk", rva: "0xe9b7820" },
    { name: "CreateTalkActionByPerformCfgInternal", rva: "0xe9ce240" },
    { name: "OnCreateTalkFinish", rva: "0xe9cf080" },
    { name: "GetAutoTalkSkipTime", rva: "0xe9bbfa0" },
    { name: "LoadTalkAvatarMasks", rva: "0xe9c7230" },
];

var activeCount = 0;

function hookRVA(name, rva) {
    var addr = moduleBase.add(ptr(rva));
    try {
        Interceptor.attach(addr, {
            onEnter: function(args) {
                send("[Talk] ATIVO: " + name);
                try {
                    var argc = args.length;
                    if (argc > 0) {
                        var argStr = [];
                        for (var i = 0; i < argc; i++) {
                            argStr.push("arg" + i + "=" + args[i]);
                        }
                        send("[Talk] Args: " + argStr.join(", "));
                    }
                } catch (e) {
                    send("[Talk] Args error: " + e);
                }
                this.active = true;
            },
            onLeave: function(retval) {
                if (this.active) {
                    send("[Talk] SAINDO: " + name + " -> " + retval);
                }
            }
        });
        activeCount++;
        send("[+] Hooked " + name + " at " + addr);
        return true;
    } catch (e) {
        send("[-] Falhou " + name + ": " + e);
        return false;
    }
}

send("[Talk] Hookeando " + talkRVAs.length + " RVAs essenciais do sistema de conversa...");
talkRVAs.forEach(function(m) {
    hookRVA(m.name, m.rva);
});

send("[Talk] Total hookeado: " + activeCount + " / " + talkRVAs.length);
send("[Talk] Fale com NPC - velocidade aumenta para x" + dialogTimeScale + " e pula automaticamente");
