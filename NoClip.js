// Genshin Impact Noclip Script - Sem getAvatarForward
// Controls: W/S (forward/backward), A/D (left/right), Space (up), Shift (down)

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Avatar: { 
        getAvatarPos: 0x13AAF060,
        setAvatarPos: 0x13ABC900
    },
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

var getAvatarPos = Offsets.createFunction(Offsets.Avatar.getAvatarPos, 'void', ['pointer']);
var setAvatarPos = Offsets.createFunction(Offsets.Avatar.setAvatarPos, 'void', ['pointer']);

try {
    var user32 = Process.getModuleByName("user32.dll");
    var GetAsyncKeyStateAddr = user32.findExportByName("GetAsyncKeyState");
    var GetAsyncKeyState = new NativeFunction(GetAsyncKeyStateAddr, 'int16', ['int']);
} catch(e) {
    var GetAsyncKeyState = function() { return 0; };
}

// Key codes
var VK_W = 0x57;
var VK_A = 0x41;
var VK_S = 0x53;
var VK_D = 0x44;
var VK_SPACE = 0x20;
var VK_SHIFT = 0x10;

// Movement speed
var speed = 1.0;

// Variável para travar a altura
var lockedY = null;

// Allocate buffers
var playerPosBuffer = Memory.alloc(12);
var newPosBuffer = Memory.alloc(12);

// Helper function to check if key is pressed
function isKeyPressed(vk) {
    try {
        return (GetAsyncKeyState(vk) & 0x8000) !== 0;
    } catch(e) {
        return false;
    }
}

var moveCount = 0;
var lastLogTime = Date.now();
var noClipInterval = null;

// Main loop
function startNoClipLoop() {
    if (noClipInterval) return;
    noClipInterval = setInterval(function() {
        try {
            getAvatarPos(playerPosBuffer);
            var x = playerPosBuffer.readFloat();
            var y = playerPosBuffer.add(4).readFloat();
            var z = playerPosBuffer.add(8).readFloat();
            
            var dx = 0, dy = 0, dz = 0;
            var moved = false;
            var isMovingHorizontal = false;
            
            // Direções fixas (você pode ajustar se precisar)
            if (isKeyPressed(VK_W)) { dz += speed; moved = true; isMovingHorizontal = true; } // Frente
            if (isKeyPressed(VK_S)) { dz -= speed; moved = true; isMovingHorizontal = true; } // Trás
            if (isKeyPressed(VK_D)) { dx += speed; moved = true; isMovingHorizontal = true; } // Direita
            if (isKeyPressed(VK_A)) { dx -= speed; moved = true; isMovingHorizontal = true; } // Esquerda
            
            // Trava a altura quando começa o movimento horizontal
            if (isMovingHorizontal && lockedY === null) {
                lockedY = y;
            }
            
            // Libera a trava quando não houver movimento horizontal
            if (!isMovingHorizontal) {
                lockedY = null;
            }
            
            // Apenas permite movimento vertical se não houver movimento horizontal
            if (!isMovingHorizontal) {
                if (isKeyPressed(VK_SPACE)) { dy += speed; moved = true; }
                if (isKeyPressed(VK_SHIFT)) { dy -= speed; moved = true; }
            }
            
            if (moved) {
                var nx = x + dx;
                var ny;
                
                // Usa a altura travada se houver movimento horizontal, senão usa a normal
                if (isMovingHorizontal) {
                    ny = lockedY;
                } else {
                    ny = y + dy;
                }
                
                var nz = z + dz;
                
                newPosBuffer.writeFloat(nx);
                newPosBuffer.add(4).writeFloat(ny);
                newPosBuffer.add(8).writeFloat(nz);
                
                setAvatarPos(newPosBuffer);
                
                moveCount++;
            }
        } catch(e) {
            // Ignore errors
        }
    }, 16);
}

function stopNoClipLoop() {
    if (noClipInterval) {
        clearInterval(noClipInterval);
        noClipInterval = null;
    }
}

function startNoClip() {
    startNoClipLoop();
}

function stopNoClip() {
    stopNoClipLoop();
}

var noClipEnabled = false;

rpc.exports = {
    toggleNoClip: function(enabled, speedValue) {
        if (enabled) {
            if (speedValue) speed = speedValue;
            startNoClip();
            noClipEnabled = true;
        } else {
            stopNoClip();
            noClipEnabled = false;
        }
        return true;
    },
    setSpeed: function(speedValue) {
        speed = speedValue;
        return true;
    },
    getStatus: function() {
        return { enabled: noClipEnabled, speed: speed };
    }
};
