// Genshin Impact Camera Position Reader
// Offsets source: offsets.js (update there, then copy here)

send("Starting Genshin camera position reader...");

var moduleBase = Process.enumerateModules()[0].base;
var Offsets = {
    base: moduleBase,
    Camera: { getMain: 0x17d51230 },
    Transform: { getTransform: 0x17d61570, getPosition: 0x17d5b010 },
    getAddress: function(o) { return this.base.add(o); },
    createFunction: function(o, r, a) { return new NativeFunction(this.getAddress(o), r, a); }
};

send("Using main module base: " + Offsets.base);

// Define function pointers using centralized offsets
var getMainCamera = Offsets.createFunction(Offsets.Camera.getMain, 'pointer', []);
var getTransform = Offsets.createFunction(Offsets.Transform.getTransform, 'pointer', ['pointer']);
var internalGetPosition = Offsets.createFunction(Offsets.Transform.getPosition, 'void', ['pointer', 'pointer']);

send("Function pointers set up successfully!");

// Allocate memory for Vector3 (3 floats = 12 bytes)
var vec3Buffer = Memory.alloc(12);

// Poll camera position every 500ms!
setInterval(function() {
    try {
        var mainCamera = getMainCamera();
        if (mainCamera.isNull()) {
            send("Main camera is null!");
            return;
        }
        // send("Got main camera: " + mainCamera);
        
        var transform = getTransform(mainCamera);
        if (transform.isNull()) {
            send("Transform is null!");
            return;
        }
        // send("Got transform: " + transform);
        
        // Call INTERNAL_get_position
        internalGetPosition(transform, vec3Buffer);
        
        // Read the 3 floats from the buffer
        var x = vec3Buffer.readFloat();
        var y = vec3Buffer.add(4).readFloat();
        var z = vec3Buffer.add(8).readFloat();
        
        // Check if values are reasonable
        if (!isNaN(x) && !isNaN(y) && !isNaN(z) && 
            isFinite(x) && isFinite(y) && isFinite(z)) {
            send("Camera Position - X: " + x.toFixed(3) + " Y: " + y.toFixed(3) + " Z: " + z.toFixed(3));
        }
        
    } catch(e) {
        send("Polling error: " + e);
    }
}, 500); // 500ms interval

send("Script loaded successfully - Reading camera position every 0.5 seconds!");
