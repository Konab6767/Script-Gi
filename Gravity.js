// Zero Gravity Mod - Floating in Air
var moduleBase = Process.enumerateModules()[0].base;

// Hook Rigidbody.set_velocity to prevent falling
var setVelocityAddr = moduleBase.add(0x18fffd90); // Rigidbody.set_velocity RVA: 0x18fffd90

var gravityHook = null;
var gravityEnabled = false;

function enableGravity() {
    if (gravityHook) return;
    try {
        gravityHook = Interceptor.attach(setVelocityAddr, {
            onEnter: function(args) {
                // args[0] = this (Rigidbody pointer)
                // args[1] = Vector3 velocity
                
                // Modify Y velocity (vertical) to prevent falling
                // Vector3 structure: x, y, z (each 4 bytes = float)
                var velocityPtr = ptr(args[1]);
                
                try {
                    var x = velocityPtr.readFloat();
                    var y = velocityPtr.add(4).readFloat();
                    var z = velocityPtr.add(8).readFloat();
                    
                    // If falling (y < 0), stop the fall (set to 0)
                    if (y < -1.0) {
                        velocityPtr.add(4).writeFloat(0.0);
                    }
                } catch(e) {
                    // Ignore errors from other rigidbodies
                }
            }
        });
        gravityEnabled = true;
    } catch(e) {
        // Ignore errors
    }
}

function disableGravity() {
    if (gravityHook) {
        gravityHook.detach();
        gravityHook = null;
        gravityEnabled = false;
    }
}

rpc.exports = {
    toggleGravity: function(enabled) {
        if (enabled) {
            enableGravity();
        } else {
            disableGravity();
        }
        return true;
    },
    getStatus: function() {
        return { enabled: gravityEnabled };
    }
};

