// Enemy Freeze - Freezes all enemies in place (with toggle key F)
// Hooks Rigidbody functions to zero velocity and set kinematic

console.log("[Freeze] Starting...");

const genshinModule = Process.getModuleByName("GenshinImpact.exe");
if (!genshinModule) {
    console.log("[Freeze] ERROR: GenshinImpact.exe module not found!");
} else {
    console.log(`[Freeze] Module base: ${genshinModule.base}`);
}

// Endereços das funções
const Rigidbody_set_velocity = genshinModule.base.add(0x19C5E130);
const Rigidbody_set_angularVelocity = genshinModule.base.add(0x19C5E190);
const Rigidbody_set_isKinematic = genshinModule.base.add(0x19C5E250);
const Rigidbody_set_constraints = genshinModule.base.add(0x19C5E2A0);

let velocityZeroed = 0;
let kinematicSet = 0;
let freezeEnabled = false; // Começa desativado

// Detectar tecla F para toggle
try {
    const user32 = Process.getModuleByName("user32.dll");
    const GetAsyncKeyStateAddr = user32.findExportByName("GetAsyncKeyState");
    const GetAsyncKeyState = new NativeFunction(GetAsyncKeyStateAddr, 'int16', ['int']);
    const VK_F = 0x46;
    
    setInterval(() => {
        const keyState = GetAsyncKeyState(VK_F);
        if (keyState & 0x8000) {
            freezeEnabled = !freezeEnabled;
            console.log(`[Freeze] Freeze ${freezeEnabled ? 'ENABLED' : 'DISABLED'} (Press F to toggle)`);
        }
    }, 100);
} catch (e) {
    console.log("[Freeze] Warning: Could not setup toggle key");
}

// Hook para set_velocity - forçar velocidade zero (quando freeze enabled)
Interceptor.attach(Rigidbody_set_velocity, {
    onEnter: function(args) {
        // args[0] = Rigidbody pointer
        // args[1] = velocity (Vector3)
        
        if (!freezeEnabled) return;
        
        try {
            if (!args[0] || args[0].isNull()) return;
            if (!args[1] || args[1].isNull()) return;
            
            velocityZeroed++;
            
            // Criar Vector3 zero
            const zeroVec = Memory.alloc(12); // 3 floats (x, y, z)
            zeroVec.writeFloat(0); // x
            zeroVec.add(4).writeFloat(0); // y
            zeroVec.add(8).writeFloat(0); // z
            
            args[1] = zeroVec;
        } catch (e) {
            // Erro, ignorar
        }
    }
});

// Hook para set_angularVelocity - forçar velocidade angular zero (quando freeze enabled)
Interceptor.attach(Rigidbody_set_angularVelocity, {
    onEnter: function(args) {
        // args[0] = Rigidbody pointer
        // args[1] = angularVelocity (Vector3)
        
        if (!freezeEnabled) return;
        
        try {
            if (!args[0] || args[0].isNull()) return;
            if (!args[1] || args[1].isNull()) return;
            
            // Criar Vector3 zero
            const zeroVec = Memory.alloc(12);
            zeroVec.writeFloat(0);
            zeroVec.add(4).writeFloat(0);
            zeroVec.add(8).writeFloat(0);
            
            args[1] = zeroVec;
        } catch (e) {
            // Erro, ignorar
        }
    }
});

// Hook para set_isKinematic - forçar kinematic = true (quando freeze enabled)
Interceptor.attach(Rigidbody_set_isKinematic, {
    onEnter: function(args) {
        // args[0] = Rigidbody pointer
        // args[1] = isKinematic (bool)
        
        if (!freezeEnabled) return;
        
        try {
            if (!args[0] || args[0].isNull()) return;
            if (!args[1] || args[1].isNull()) return;
            
            kinematicSet++;
            args[1].writeInt(1); // Forçar kinematic = true
        } catch (e) {
            // Erro, ignorar
        }
    }
});

// Hook para set_constraints - forçar todas as restrições (quando freeze enabled)
Interceptor.attach(Rigidbody_set_constraints, {
    onEnter: function(args) {
        // args[0] = Rigidbody pointer
        // args[1] = constraints (RigidbodyConstraints)
        
        if (!freezeEnabled) return;
        
        if (!args[1] || args[1].isNull()) return;
        
        // RigidbodyConstraints.FreezeAll = 14 (0xE)
        try {
            args[1].writeInt(14); // Congelar tudo
        } catch (e) {
            // Erro ao escrever, ignorar
        }
    }
});

console.log("[Freeze] Hooks installed - Press F to toggle freeze (starts disabled)");
console.log("[Freeze] Script loaded");

rpc.exports = {
    toggleFreeze: function(enabled) {
        freezeEnabled = enabled;
        console.log(`[Freeze] Freeze ${enabled ? 'ENABLED' : 'DISABLED'} (API)`);
        return true;
    },
    getStatus: function() {
        return { enabled: freezeEnabled };
    }
};
