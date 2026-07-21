// Genshin Impact Mob Vacuum Script
// Offsets source: offsets.js (update there, then copy here)

send("[mobvacum.js] Starting mob vacuum...");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Avatar: { getAvatarPos: 0x122fb1f0 },
    Transform: { getTransform: 0x17d61570, setPosition: 0x17d5b1d0, getPosition: 0x17d5b010, getGameObject: 0x17d61640 },
    GameObject: { getName: 0x17d3fa60 },
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

send("Module base: " + Offsets.base);

// Unity functions
var GetAvatarPos = Offsets.createFunction(Offsets.Avatar.getAvatarPos, 'void', ['pointer']);
var getTransform = Offsets.createFunction(Offsets.Transform.getTransform, 'pointer', ['pointer']);
var setPosition = Offsets.createFunction(Offsets.Transform.setPosition, 'void', ['pointer', 'pointer']);
var internalGetPosition = Offsets.createFunction(Offsets.Transform.getPosition, 'void', ['pointer', 'pointer']);
var getGameObject = Offsets.createFunction(Offsets.Transform.getGameObject, 'pointer', ['pointer']);
var getName = Offsets.createFunction(Offsets.GameObject.getName, 'pointer', ['pointer']);

// Helper to read Il2Cpp string
function readIl2CppString(strPtr) {
    try {
        if (!strPtr || strPtr.isNull()) return "null";
        var length = strPtr.add(0x10).readU32();
        if (length > 100) length = 100;
        var str = strPtr.add(0x14).readUtf16String(length);
        return str || "unknown";
    } catch (e) {
        return "error";
    }
}

var posBuffer = Memory.alloc(12);
var vacuumEnabled = true;
var vacuumRadius = 50.0;
var scanCount = 0;
var movingObjects = {};
var positionUpdateCount = 0;

function getPlayerPosition() {
    try {
        GetAvatarPos(posBuffer);
        return {
            x: posBuffer.readFloat(),
            y: posBuffer.add(4).readFloat(),
            z: posBuffer.add(8).readFloat()
        };
    } catch (e) {
        return null;
    }
}

function distance3D(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    var dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Hook Transform.SetPosition
try {
    var setPositionAddr = Offsets.getAddress(Offsets.Transform.setPosition);
    send("Hooking Transform.SetPosition at: " + setPositionAddr);
    
    Interceptor.attach(setPositionAddr, {
        onEnter: function(args) {
            var transform = args[0];
            var posPtr = args[1];
            
            if (transform.isNull() || posPtr.isNull()) return;
            
            try {
                var newPos = {
                    x: posPtr.readFloat(),
                    y: posPtr.add(4).readFloat(),
                    z: posPtr.add(8).readFloat()
                };
                
                if (isNaN(newPos.x) || !isFinite(newPos.x)) return;
                
                var transformKey = transform.toString();
                
                if (movingObjects[transformKey]) {
                    var oldPos = movingObjects[transformKey].lastPos;
                    var moved = distance3D(oldPos, newPos);
                    
                    if (moved > 0.1) {
                        movingObjects[transformKey].lastPos = newPos;
                        movingObjects[transformKey].moveCount++;
                        movingObjects[transformKey].transform = transform;
                        
                        if (movingObjects[transformKey].moveCount === 1 && !movingObjects[transformKey].name) {
                            try {
                                var gameObj = getGameObject(transform);
                                if (!gameObj.isNull()) {
                                    var namePtr = getName(gameObj);
                                    var name = readIl2CppString(namePtr);
                                    movingObjects[transformKey].name = name;
                                    
                                    if (name && name !== "unknown" && name.length > 0) {
                                        send("Tracked: '" + name + "'");
                                    }
                                }
                            } catch (e) {}
                        }
                    }
                } else {
                    movingObjects[transformKey] = {
                        lastPos: newPos,
                        moveCount: 1,
                        transform: transform
                    };
                    
                    positionUpdateCount++;
                    if (positionUpdateCount % 50 === 0) {
                        send("Tracking " + Object.keys(movingObjects).length + " moving objects");
                    }
                }
            } catch (e) {}
        }
    });
    
    send("Hook installed! Tracking moving objects...");
} catch (e) {
    send("Failed to install hook: " + e.message);
}

// Main vacuum loop
setInterval(function() {
    if (!vacuumEnabled) return;
    
    try {
        var playerPos = getPlayerPosition();
        if (!playerPos) return;
        
        scanCount++;
        var vacuumedCount = 0;
        var movingCount = 0;
        var objectsInRange = 0;
        
        for (var key in movingObjects) {
            var obj = movingObjects[key];
            
            if (obj.moveCount < 1) continue;
            
            movingCount++;
            
            try {
                var transform = obj.transform;
                if (!transform || transform.isNull()) continue;
                
                var entityPosBuffer = Memory.alloc(12);
                internalGetPosition(transform, entityPosBuffer);
                
                var entityPos = {
                    x: entityPosBuffer.readFloat(),
                    y: entityPosBuffer.add(4).readFloat(),
                    z: entityPosBuffer.add(8).readFloat()
                };
                
                if (isNaN(entityPos.x) || !isFinite(entityPos.x)) continue;
                if (isNaN(entityPos.y) || !isFinite(entityPos.y)) continue;
                if (isNaN(entityPos.z) || !isFinite(entityPos.z)) continue;
                
                var distToPlayer = distance3D(playerPos, entityPos);
                
                if (distToPlayer < 1.0) continue;
                
                if (distToPlayer <= vacuumRadius) {
                    objectsInRange++;
                }
                
                if (distToPlayer > 2.0 && distToPlayer <= vacuumRadius) {
                    var newPosBuffer = Memory.alloc(12);
                    newPosBuffer.writeFloat(playerPos.x);
                    newPosBuffer.add(4).writeFloat(playerPos.y + 2.0);
                    newPosBuffer.add(8).writeFloat(playerPos.z);
                    
                    setPosition(transform, newPosBuffer);
                    vacuumedCount++;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (scanCount % 10 === 0) {
            send("Status: " + Object.keys(movingObjects).length + " total tracked, " + 
                 movingCount + " active movers, " + objectsInRange + " in range (" + vacuumRadius + "m)");
        }
        
        if (vacuumedCount > 0) {
            send(">>> Vacuumed " + vacuumedCount + " objects! <<<");
        }
        
    } catch (e) {}
}, 500);

// RPC exports
rpc.exports = {
    toggleVacuum: function(enabled) {
        vacuumEnabled = enabled;
        send("Mob vacuum " + (enabled ? "enabled" : "disabled"));
        return { enabled: vacuumEnabled };
    },
    setRadius: function(radius) {
        vacuumRadius = radius;
        send("Vacuum radius set to " + radius + " meters");
        return { radius: vacuumRadius };
    },
    clearCache: function() {
        movingObjects = {};
        send("Moving objects cache cleared");
        return { cached: 0 };
    },
    getStatus: function() {
        var movingCount = 0;
        for (var key in movingObjects) {
            if (movingObjects[key].moveCount >= 1) movingCount++;
        }
        return {
            enabled: vacuumEnabled,
            radius: vacuumRadius,
            totalTracked: Object.keys(movingObjects).length,
            activeMovers: movingCount
        };
    }
};

send("[mobvacum.js] Loaded! Tracking MOVING objects only (mobs, items, etc.)");
send("Go near enemies/mobs and fight - they will be captured and vacuumed!");
