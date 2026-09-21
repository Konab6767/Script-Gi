// Menu.js - Consolidated Mod Menu Script
// Centralized RVA addresses and feature controls

send("[Menu.js] Initializing Mod Menu...");

var moduleBase = Process.enumerateModules()[0].base;
send("[Menu.js] Module base: " + moduleBase);

// ============================================
// CENTRALIZED RVA ADDRESSES
// ============================================
var RVAs = {
    // Time Scale (Game Speed)
    Time: {
        get_timeScale: 0x18f8a6e0,
        set_timeScale: 0x18f8a6f0
    },
    
    // Avatar Position
    Avatar: {
        getAvatarPos: 0x12f8d5a0,
        setAvatarPos: 0x12f9a9d0,
        getAvatarEntity: 0x12f84db0,
        setAvatarEntityMoveRatio: 0x12f7e5f0,
        avatarIsHost: 0x123fdec0
    },
    
    // God Mode
    GodMode: {
        checkTargetAttackable: 0x123e2760,
        getRuntimeID: 0xaf380,
        setRuntimeID: 0x13032a90
    },
    
    // Physics
    Physics: {
        getVelocity: 0x18f73270,
        setVelocity: 0x18ff30b0,
        setVelocityRigidbody: 0x18fffd90,
        prePhysicsUpdate: 0xa7af040,
        postPhysicsUpdate: 0xa7af220
    },
    
    // Camera
    Camera: {
        getMain: 0x17d51230,
        getTransform: 0x17d61570,
        getPosition: 0x17d5b010
    },
    
    // Post Processing (Gamma)
    PostProcess: {
        Update: 0x06DE0A60,
        set_gammaValue: 0x06DDC380,
        set_innerResolutionScale: 0x06DDC3D0,
        set_cameraBufferDirty: 0x06DDC3B0,
        field_outlineCorrectionWidth: 0x30
    },
    
    // Talk/Dialog
    Talk: {
        StartTalk: 0xe9b8780,
        StartTalkInternal: 0xe9d88c0,
        BeforeStartTalk: 0xe9d2990,
        GetDummyPointFromTalk: 0xe9b7820,
        CreateTalkActionByPerformCfgInternal: 0xe9ce240,
        OnCreateTalkFinish: 0xe9cf080,
        GetAutoTalkSkipTime: 0xe9bbfa0,
        LoadTalkAvatarMasks: 0xe9c7230,
        DoTalkSkip: 0xf35d140,
        RequestTalkFinish: 0xf36ff00,
        CheckIsInTalk: 0xf36d880
    }
};

// ============================================
// FEATURE STATES
// ============================================
var FeatureStates = {
    gameSpeed: { enabled: false, value: 1.0 },
    playerSpeed: { enabled: false, value: 1.0 },
    godMode: { enabled: false },
    noFall: { enabled: false },
    noClip: { enabled: false },
    noGravity: { enabled: false },
    hideGrass: { enabled: false },
    gamma: { enabled: false, value: 1.0 },
    resolution: { enabled: false, value: 1.0 },
    autoDialog: { enabled: false }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function getAddress(rva) {
    return moduleBase.add(ptr(rva));
}

function createFunction(rva, returnType, argTypes) {
    return new NativeFunction(getAddress(rva), returnType, argTypes);
}

// ============================================
// GAME SPEED FEATURE
// ============================================
var Time_get_timeScale = null;
var Time_set_timeScale = null;

function initGameSpeed() {
    try {
        Time_get_timeScale = createFunction(RVAs.Time.get_timeScale, 'float', []);
        Time_set_timeScale = createFunction(RVAs.Time.set_timeScale, 'void', ['float']);
        send("[GameSpeed] Initialized");
    } catch(e) {
        send("[GameSpeed] Init failed: " + e);
    }
}

function setGameSpeed(speed) {
    if (!Time_set_timeScale) initGameSpeed();
    try {
        Time_set_timeScale(speed);
        FeatureStates.gameSpeed.value = speed;
        FeatureStates.gameSpeed.enabled = (speed !== 1.0);
        send("[GameSpeed] Set to x" + speed);
        return true;
    } catch(e) {
        send("[GameSpeed] Failed: " + e);
        return false;
    }
}

// ============================================
// PLAYER SPEED FEATURE
// ============================================
var GetPlayerEntity = null;
var SetAvatarEntityMoveRatio = null;

function initPlayerSpeed() {
    try {
        GetPlayerEntity = createFunction(RVAs.Avatar.getAvatarEntity, 'pointer', []);
        SetAvatarEntityMoveRatio = createFunction(RVAs.Avatar.setAvatarEntityMoveRatio, 'void', ['pointer', 'float', 'uint8']);
        send("[PlayerSpeed] Initialized");
    } catch(e) {
        send("[PlayerSpeed] Init failed: " + e);
    }
}

function setPlayerSpeed(speed) {
    if (!GetPlayerEntity || !SetAvatarEntityMoveRatio) initPlayerSpeed();
    try {
        var playerEntity = GetPlayerEntity();
        if (!playerEntity.isNull()) {
            SetAvatarEntityMoveRatio(playerEntity, speed, 0);
            FeatureStates.playerSpeed.value = speed;
            FeatureStates.playerSpeed.enabled = (speed !== 1.0);
            send("[PlayerSpeed] Set to x" + speed);
            return true;
        } else {
            send("[PlayerSpeed] Player entity not found");
            return false;
        }
    } catch(e) {
        send("[PlayerSpeed] Failed: " + e);
        return false;
    }
}

// ============================================
// GOD MODE FEATURE
// ============================================
var avatarIsHost = null;
var godModeHooks = [];

function initGodMode() {
    try {
        avatarIsHost = createFunction(RVAs.Avatar.avatarIsHost, 'bool', ['pointer']);
        
        var checkTargetAddr = getAddress(RVAs.GodMode.checkTargetAttackable);
        
        var hook = Interceptor.attach(checkTargetAddr, {
            onEnter: function(args) {
                this.attacker = args[0];
                this.target = args[1];
            },
            onLeave: function(retval) {
                if (FeatureStates.godMode.enabled) {
                    var isTargetHostAvatar = avatarIsHost(this.target);
                    if (isTargetHostAvatar) {
                        retval.replace(ptr(0));
                    }
                }
            }
        });
        godModeHooks.push(hook);
        send("[GodMode] Initialized");
    } catch(e) {
        send("[GodMode] Init failed: " + e);
    }
}

function toggleGodModeInternal(enabled) {
    FeatureStates.godMode.enabled = enabled;
    send("[GodMode] " + (enabled ? "Enabled" : "Disabled"));
    return true;
}

// ============================================
// NO FALL FEATURE
// ============================================
var getVelocity = null;
var setVelocity = null;
var noFallHooks = [];

function initNoFall() {
    try {
        getVelocity = createFunction(RVAs.Physics.getVelocity, 'void', ['pointer']);
        setVelocity = createFunction(RVAs.Physics.setVelocity, 'void', ['pointer']);
        
        var getVelAddr = getAddress(RVAs.Physics.getVelocity);
        
        var hook = Interceptor.attach(getVelAddr, {
            onLeave: function(retval) {
                if (FeatureStates.noFall.enabled) {
                    try {
                        var y = retval.add(4).readFloat();
                        if (y < -15.0) {
                            retval.add(4).writeFloat(-9.5);
                        }
                    } catch(e) {}
                }
            }
        });
        noFallHooks.push(hook);
        send("[NoFall] Initialized");
    } catch(e) {
        send("[NoFall] Init failed: " + e);
    }
}

function toggleNoFallInternal(enabled) {
    FeatureStates.noFall.enabled = enabled;
    send("[NoFall] " + (enabled ? "Enabled" : "Disabled"));
    return true;
}

// ============================================
// NO CLIP FEATURE
// ============================================
var getAvatarPos = null;
var setAvatarPos = null;
var GetAsyncKeyState = null;
var noClipInterval = null;
var noClipSpeed = 1.0;

function initNoClip() {
    try {
        getAvatarPos = createFunction(RVAs.Avatar.getAvatarPos, 'void', ['pointer']);
        setAvatarPos = createFunction(RVAs.Avatar.setAvatarPos, 'void', ['pointer']);
        
        var user32 = Process.getModuleByName("user32.dll");
        var GetAsyncKeyStateAddr = user32.findExportByName("GetAsyncKeyState");
        GetAsyncKeyState = new NativeFunction(GetAsyncKeyStateAddr, 'int16', ['int']);
        
        send("[NoClip] Initialized");
    } catch(e) {
        send("[NoClip] Init failed: " + e);
    }
}

function isKeyPressed(vk) {
    try {
        return (GetAsyncKeyState(vk) & 0x8000) !== 0;
    } catch(e) {
        return false;
    }
}

function startNoClip() {
    if (noClipInterval) return;
    
    var VK_W = 0x57, VK_A = 0x41, VK_S = 0x53, VK_D = 0x44;
    var VK_SPACE = 0x20, VK_SHIFT = 0x10;
    
    var playerPosBuffer = Memory.alloc(12);
    var newPosBuffer = Memory.alloc(12);
    var lockedY = null;
    
    noClipInterval = setInterval(function() {
        try {
            getAvatarPos(playerPosBuffer);
            var x = playerPosBuffer.readFloat();
            var y = playerPosBuffer.add(4).readFloat();
            var z = playerPosBuffer.add(8).readFloat();
            
            var dx = 0, dy = 0, dz = 0;
            var moved = false;
            var isMovingHorizontal = false;
            
            if (isKeyPressed(VK_W)) { dz += noClipSpeed; moved = true; isMovingHorizontal = true; }
            if (isKeyPressed(VK_S)) { dz -= noClipSpeed; moved = true; isMovingHorizontal = true; }
            if (isKeyPressed(VK_D)) { dx += noClipSpeed; moved = true; isMovingHorizontal = true; }
            if (isKeyPressed(VK_A)) { dx -= noClipSpeed; moved = true; isMovingHorizontal = true; }
            
            if (isMovingHorizontal && lockedY === null) {
                lockedY = y;
            }
            
            if (!isMovingHorizontal) {
                lockedY = null;
            }
            
            if (!isMovingHorizontal) {
                if (isKeyPressed(VK_SPACE)) { dy += noClipSpeed; moved = true; }
                if (isKeyPressed(VK_SHIFT)) { dy -= noClipSpeed; moved = true; }
            }
            
            if (moved) {
                var nx = x + dx;
                var ny = isMovingHorizontal ? lockedY : y + dy;
                var nz = z + dz;
                
                newPosBuffer.writeFloat(nx);
                newPosBuffer.add(4).writeFloat(ny);
                newPosBuffer.add(8).writeFloat(nz);
                
                setAvatarPos(newPosBuffer);
            }
        } catch(e) {}
    }, 16);
    
    send("[NoClip] Started");
}

function stopNoClip() {
    if (noClipInterval) {
        clearInterval(noClipInterval);
        noClipInterval = null;
        send("[NoClip] Stopped");
    }
}

function toggleNoClipInternal(enabled) {
    FeatureStates.noClip.enabled = enabled;
    if (enabled) {
        startNoClip();
    } else {
        stopNoClip();
    }
    return true;
}

function setNoClipSpeed(speed) {
    noClipSpeed = speed;
    send("[NoClip] Speed set to " + speed);
    return true;
}

// ============================================
// NO GRAVITY FEATURE
// ============================================
var noGravityHook = null;

function initNoGravity() {
    try {
        var setVelocityAddr = getAddress(RVAs.Physics.setVelocityRigidbody);
        
        noGravityHook = Interceptor.attach(setVelocityAddr, {
            onEnter: function(args) {
                if (FeatureStates.noGravity.enabled) {
                    try {
                        var velocityPtr = ptr(args[1]);
                        var x = velocityPtr.readFloat();
                        var y = velocityPtr.add(4).readFloat();
                        var z = velocityPtr.add(8).readFloat();
                        
                        // If falling (y < 0), stop the fall (set to 0)
                        if (y < -1.0) {
                            velocityPtr.add(4).writeFloat(0.0);
                        }
                    } catch(e) {}
                }
            }
        });
        send("[NoGravity] Initialized");
    } catch(e) {
        send("[NoGravity] Init failed: " + e);
    }
}

function toggleNoGravityInternal(enabled) {
    FeatureStates.noGravity.enabled = enabled;
    send("[NoGravity] " + (enabled ? "Enabled" : "Disabled"));
    return true;
}

// ============================================
// HIDE GRASS FEATURE
// ============================================
var hideGrassPattern = "8b 47 ?? 89 05 ?? ?? ?? ?? 48 83 c4";
var hideGrassAddress = null;

function findHideGrassPattern() {
    var genshinModule = Process.enumerateModules().find(mod => mod.name.toLowerCase().includes("genshin"));
    if (!genshinModule) {
        send("[HideGrass] Module not found");
        return false;
    }
    
    var allRanges = Process.enumerateRanges('r-x');
    var moduleRanges = allRanges.filter(range => 
        range.base.compare(genshinModule.base) >= 0 && 
        range.base.add(range.size).compare(genshinModule.base.add(genshinModule.size)) <= 0
    );
    
    for (var i = 0; i < moduleRanges.length; i++) {
        try {
            var scans = Memory.scanSync(moduleRanges[i].base, moduleRanges[i].size, hideGrassPattern);
            if (scans.length > 0) {
                hideGrassAddress = scans[0].address;
                send("[HideGrass] Pattern found at " + hideGrassAddress);
                return true;
            }
        } catch(e) {}
    }
    
    send("[HideGrass] Pattern not found");
    return false;
}

function enableHideGrass() {
    if (!hideGrassAddress) {
        if (!findHideGrassPattern()) return false;
    }
    
    try {
        Memory.protect(hideGrassAddress, 3, 'rwx');
        hideGrassAddress.writeU8(0x31);
        hideGrassAddress.add(1).writeU8(0xc0);
        hideGrassAddress.add(2).writeU8(0x90);
        Memory.protect(hideGrassAddress, 3, 'r-x');
        FeatureStates.hideGrass.enabled = true;
        send("[HideGrass] Enabled");
        return true;
    } catch(e) {
        send("[HideGrass] Failed: " + e);
        return false;
    }
}

function disableHideGrass() {
    if (!hideGrassAddress) return false;
    
    try {
        Memory.protect(hideGrassAddress, 3, 'rwx');
        hideGrassAddress.writeU8(0x8B);
        hideGrassAddress.add(1).writeU8(0x47);
        hideGrassAddress.add(2).writeU8(0x08);
        Memory.protect(hideGrassAddress, 3, 'r-x');
        FeatureStates.hideGrass.enabled = false;
        send("[HideGrass] Disabled");
        return true;
    } catch(e) {
        send("[HideGrass] Failed: " + e);
        return false;
    }
}

function toggleHideGrassInternal(enabled) {
    if (enabled) {
        return enableHideGrass();
    } else {
        return disableHideGrass();
    }
}

// ============================================
// GAMMA FEATURE
// ============================================
var gammaHook = null;
var targetGamma = 1.0;
var targetResolution = 1.0;

function initGamma() {
    try {
        var updateAddr = getAddress(RVAs.PostProcess.Update);
        
        gammaHook = Interceptor.attach(updateAddr, {
            onEnter: function(args) {
                try {
                    if (FeatureStates.gamma.enabled) {
                        var setGamma = createFunction(RVAs.PostProcess.set_gammaValue, "void", ["pointer", "float"]);
                        setGamma(args[0], targetGamma);
                    }
                    
                    if (FeatureStates.resolution.enabled) {
                        var setResScale = createFunction(RVAs.PostProcess.set_innerResolutionScale, "void", ["pointer", "float"]);
                        setResScale(args[0], targetResolution);
                    }
                    
                    if (FeatureStates.gamma.enabled || FeatureStates.resolution.enabled) {
                        var setDirty = createFunction(RVAs.PostProcess.set_cameraBufferDirty, "void", ["pointer", "bool"]);
                        setDirty(args[0], 1);
                    }
                } catch(e) {}
            }
        });
        send("[Gamma] Initialized");
    } catch(e) {
        send("[Gamma] Init failed: " + e);
    }
}

function setGammaInternal(value) {
    targetGamma = value;
    FeatureStates.gamma.value = value;
    FeatureStates.gamma.enabled = (value !== 1.0);
    send("[Gamma] Set to " + value);
    return true;
}

function setResolutionInternal(value) {
    targetResolution = value;
    FeatureStates.resolution.value = value;
    FeatureStates.resolution.enabled = (value !== 1.0);
    send("[Resolution] Set to " + value);
    return true;
}

// ============================================
// AUTO DIALOG FEATURE
// ============================================
var talkActive = false;
var dialogHooks = [];
var clickInterval = null;
var dialogTimeScale = 20.0;

function initAutoDialog() {
    try {
        var user32 = Process.getModuleByName("user32.dll");
        var keybd_event = new NativeFunction(user32.findExportByName("keybd_event"), 'void', ['uint8', 'uint8', 'uint32', 'pointer']);
        var VK_F = 0x46;
        var KEYEVENTF_KEYUP = 0x0002;
        
        function startAutoClick() {
            if (clickInterval) return;
            clickInterval = setInterval(function() {
                if (talkActive && FeatureStates.autoDialog.enabled) {
                    keybd_event(VK_F, 0, 0, ptr(0));
                    keybd_event(VK_F, 0, KEYEVENTF_KEYUP, ptr(0));
                }
            }, 50);
        }
        
        function stopAutoClick() {
            if (clickInterval) {
                clearInterval(clickInterval);
                clickInterval = null;
            }
        }
        
        function autoSkipTalk() {
            if (!talkActive || !FeatureStates.autoDialog.enabled) return;
            try {
                var doSkipFn = createFunction(RVAs.Talk.DoTalkSkip, 'void', [], 'fastcall');
                doSkipFn();
            } catch(e) {}
        }
        
        var startTalkHook = Interceptor.attach(getAddress(RVAs.Talk.StartTalk), {
            onLeave: function(retval) {
                talkActive = true;
                if (FeatureStates.autoDialog.enabled) {
                    setGameSpeed(dialogTimeScale);
                    startAutoClick();
                    setTimeout(autoSkipTalk, 100);
                }
            }
        });
        dialogHooks.push(startTalkHook);
        
        var finishTalkHook = Interceptor.attach(getAddress(RVAs.Talk.RequestTalkFinish), {
            onLeave: function(retval) {
                if (retval.toInt32()) {
                    talkActive = false;
                    if (FeatureStates.autoDialog.enabled) {
                        setGameSpeed(1.0);
                        stopAutoClick();
                    }
                }
            }
        });
        dialogHooks.push(finishTalkHook);
        
        send("[AutoDialog] Initialized");
    } catch(e) {
        send("[AutoDialog] Init failed: " + e);
    }
}

function toggleAutoDialogInternal(enabled) {
    FeatureStates.autoDialog.enabled = enabled;
    send("[AutoDialog] " + (enabled ? "Enabled" : "Disabled"));
    return true;
}

// ============================================
// INITIALIZATION
// ============================================
function initializeAll() {
    initGameSpeed();
    initPlayerSpeed();
    initGodMode();
    initNoFall();
    initNoClip();
    initNoGravity();
    initGamma();
    initAutoDialog();
    findHideGrassPattern();
    send("[Menu.js] All features initialized");
}

// Initialize on load
initializeAll();

// ============================================
// RPC EXPORTS - CONTROL INTERFACE
// ============================================
rpc.exports = {
    // Feature toggles
    toggleGameSpeed: function(enabled, speed) {
        if (enabled) {
            return setGameSpeed(speed || 10.0);
        } else {
            return setGameSpeed(1.0);
        }
    },
    
    togglePlayerSpeed: function(enabled, speed) {
        if (enabled) {
            return setPlayerSpeed(speed || 5.0);
        } else {
            return setPlayerSpeed(1.0);
        }
    },
    
    toggleGodMode: function(enabled) {
        return toggleGodModeInternal(enabled);
    },
    
    toggleNoFall: function(enabled) {
        return toggleNoFallInternal(enabled);
    },
    
    toggleNoClip: function(enabled, speed) {
        if (speed) setNoClipSpeed(speed);
        return toggleNoClipInternal(enabled);
    },
    
    toggleNoGravity: function(enabled) {
        return toggleNoGravityInternal(enabled);
    },
    
    toggleHideGrass: function(enabled) {
        return toggleHideGrassInternal(enabled);
    },
    
    setGamma: function(value) {
        return setGammaInternal(value);
    },
    
    setResolution: function(value) {
        return setResolutionInternal(value);
    },
    
    toggleAutoDialog: function(enabled) {
        return toggleAutoDialogInternal(enabled);
    },
    
    // Get all states
    getStates: function() {
        return FeatureStates;
    },
    
    // Get RVAs
    getRVAs: function() {
        return RVAs;
    }
};

send("[Menu.js] Mod Menu loaded successfully!");
send("[Menu.js] Use RPC exports to control features");
