// Genshin Impact Local Player Position Reader
// Offsets source: offsets.js (update there, then copy here)

send("Starting Genshin local player position reader...");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Avatar: { getAvatarPos: 0x122fb1f0 },
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

send("Using main module base: " + Offsets.base);

// Direct GetAvatarPos() function
var getAvatarPos = Offsets.createFunction(Offsets.Avatar.getAvatarPos, 'void', ['pointer']);

send("Function pointers set up successfully!");

// Allocate memory for Vector3 (3 floats = 12 bytes)
var vec3Buffer = Memory.alloc(12);

// Poll player position every 500ms!
setInterval(function() {
    try {
        send("Trying GetAvatarPos()...");
        getAvatarPos(vec3Buffer);
        
        var x = vec3Buffer.readFloat();
        var y = vec3Buffer.add(4).readFloat();
        var z = vec3Buffer.add(8).readFloat();
        
        if (!isNaN(x) && !isNaN(y) && !isNaN(z) && 
            isFinite(x) && isFinite(y) && isFinite(z)) {
            send("Player Position (Option 1) - X: " + x.toFixed(3) + " Y: " + y.toFixed(3) + " Z: " + z.toFixed(3));
        } else {
            send("Invalid position values");
        }
        
    } catch(e) {
        send("Polling error: " + e);
    }
}, 500);

send("Script loaded successfully - Reading player position every 0.5 seconds!");
