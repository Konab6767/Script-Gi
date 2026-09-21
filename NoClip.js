// Genshin Impact Noclip Script - Sem getAvatarForward
// Controls: W/S (forward/backward), A/D (left/right), Space (up), Shift (down)

send("[Noclip] Starting noclip script sem getAvatarForward...");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Avatar: { 
        getAvatarPos: 0x12f8d5a0 ,//0x122fb1f0, 
        setAvatarPos: 0x12f9a9d0 ,//0x12319910
    },
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

send("[Noclip] Module base: " + Offsets.base);

// Game functions
var getAvatarPos = Offsets.createFunction(Offsets.Avatar.getAvatarPos, 'void', ['pointer']);
var setAvatarPos = Offsets.createFunction(Offsets.Avatar.setAvatarPos, 'void', ['pointer']);

send("[Noclip] Game functions initialized!");

// Windows API: GetAsyncKeyState
try {
    var user32 = Process.getModuleByName("user32.dll");
    var GetAsyncKeyStateAddr = user32.findExportByName("GetAsyncKeyState");
    send("[Noclip] GetAsyncKeyState found: " + GetAsyncKeyStateAddr);
    var GetAsyncKeyState = new NativeFunction(GetAsyncKeyStateAddr, 'int16', ['int']);
} catch(e) {
    send("[Noclip] Failed to get GetAsyncKeyState: " + e);
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

// Main loop
setInterval(function() {
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
            send("[Noclip] Trava de altura ativada! Y=" + lockedY.toFixed(2));
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
            var now = Date.now();
            if (now - lastLogTime > 500) {
                var keys = "";
                if (isKeyPressed(VK_W)) keys += "W ";
                if (isKeyPressed(VK_S)) keys += "S ";
                if (isKeyPressed(VK_A)) keys += "A ";
                if (isKeyPressed(VK_D)) keys += "D ";
                if (isKeyPressed(VK_SPACE) && !isMovingHorizontal) keys += "UP ";
                if (isKeyPressed(VK_SHIFT) && !isMovingHorizontal) keys += "DOWN ";
                
                send("[Noclip] " + keys + "-> Pos: X=" + nx.toFixed(1) + " Y=" + ny.toFixed(1) + " Z=" + nz.toFixed(1) + " | lockedY=" + (lockedY ? lockedY.toFixed(2) : "null"));
                lastLogTime = now;
            }
        }
    } catch(e) {
        send("[Noclip] Main loop error: " + e);
    }
}, 16); // ~60 FPS

send("[Noclip] Script carregado!");
send("[Noclip] W/S = frente/trás | A/D = esquerda/direita | Space = subir | Shift = descer");

var noClipEnabled = false;

rpc.exports = {
    toggleNoClip: function(enabled, speedValue) {
        if (enabled) {
            if (speedValue) speed = speedValue;
            startNoClip();
            noClipEnabled = true;
            send("[Noclip] Enabled");
        } else {
            stopNoClip();
            noClipEnabled = false;
            send("[Noclip] Disabled");
        }
        return true;
    },
    setSpeed: function(speedValue) {
        speed = speedValue;
        send("[Noclip] Speed set to " + speed);
        return true;
    },
    getStatus: function() {
        return { enabled: noClipEnabled, speed: speed };
    }
};
