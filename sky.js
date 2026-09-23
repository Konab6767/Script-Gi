// Graphics Modifier - Fog, Sky, and Color Control (with RPC)
// Hooks various RenderSettings and graphics functions to modify fog, sky, and lighting
// Python can control via RPC

console.log("[Graphics] Starting...");

// Encontra o módulo GenshinImpact.exe
const genshinModule = Process.getModuleByName("GenshinImpact.exe");
if (!genshinModule) {
    console.log("[Graphics] ERROR: GenshinImpact.exe module not found!");
} else {
    console.log(`[Graphics] Module base: ${genshinModule.base}`);
}

// Endereços das funções (baseados em il2cpp_functions.C)
const addresses = {
    // Fog settings
    set_fog: genshinModule.base.add(0x19BF3670),
    set_fogColor: genshinModule.base.add(0x19BF3630),
    set_fogDensity: genshinModule.base.add(0x19BF3650),
    set_bottomFogColor: genshinModule.base.add(0x19BF36B0),
    set_topFogColor: genshinModule.base.add(0x19BF36D0),
    set_farFogColor: genshinModule.base.add(0x19BF3730),
    set_volumeFogScatteringColorFront: genshinModule.base.add(0x19BF33C0),
    set_volumeFogScatteringColorBack: genshinModule.base.add(0x19BF33E0),
    
    // Sky settings
    set_skyfront: genshinModule.base.add(0x19BD77D0),
    set_cloudColor: genshinModule.base.add(0x19BD77B0),
    
    // Camera fog
    set_enableFogRendering: genshinModule.base.add(0x19BF7370),
    
    // Material color
    setMaterialColor: genshinModule.base.add(0x19C17DE0), // UnityEngine_MaterialPropertyBlock_SetColorImpl
    
    // Shader global settings
    setGlobalColor: genshinModule.base.add(0x19BD8070), // UnityEngine_Shader_SetGlobalColorImpl
    setGlobalTexture: genshinModule.base.add(0x19BD80B0), // UnityEngine_Shader_SetGlobalTextureImpl
    setGlobalFloat: genshinModule.base.add(0x19BD8380), // UnityEngine_Shader_SetGlobalFloat
};

// Variáveis de controle (controláveis via RPC)
let fogEnabled = true;
let fogDensity = 99.0;
let fogColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };
let bottomFogColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };
let topFogColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };
let farFogColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };
let skyColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };
let cloudColor = { r: 0.5, g: 0.0, b: 0.5, a: 1.0 };

// Função auxiliar para escrever cor
function writeColor(ptr, color) {
    ptr.writeFloat(color.r);
    ptr.add(4).writeFloat(color.g);
    ptr.add(8).writeFloat(color.b);
    ptr.add(12).writeFloat(color.a);
}

// Hook para forçar neblina ativa (controlável via RPC)
Interceptor.attach(addresses.set_fog, {
    onEnter: function(args) {
        args[0] = ptr(fogEnabled ? 1 : 0);
    }
});

// Hook para definir cor da neblina (controlável via RPC)
Interceptor.attach(addresses.set_fogColor, {
    onEnter: function(args) {
        writeColor(args[0], fogColor);
    }
});

// Hook para definir densidade da neblina (controlável via RPC)
Interceptor.attach(addresses.set_fogDensity, {
    onEnter: function(args) {
        args[0] = ptr(fogDensity);
    }
});

// Hook para definir cor da neblina inferior (controlável via RPC)
Interceptor.attach(addresses.set_bottomFogColor, {
    onEnter: function(args) {
        writeColor(args[0], bottomFogColor);
    }
});

// Hook para definir cor da neblina superior (controlável via RPC)
Interceptor.attach(addresses.set_topFogColor, {
    onEnter: function(args) {
        writeColor(args[0], topFogColor);
    }
});

// Hook para definir cor da neblina distante (controlável via RPC)
Interceptor.attach(addresses.set_farFogColor, {
    onEnter: function(args) {
        writeColor(args[0], farFogColor);
    }
});

// Hook para definir cor de espalhamento frontal do volume fog (controlável via RPC)
Interceptor.attach(addresses.set_volumeFogScatteringColorFront, {
    onEnter: function(args) {
        writeColor(args[0], fogColor);
    }
});

// Hook para definir cor de espalhamento traseiro do volume fog (controlável via RPC)
Interceptor.attach(addresses.set_volumeFogScatteringColorBack, {
    onEnter: function(args) {
        writeColor(args[0], fogColor);
    }
});

// Hook para definir cor frontal do céu (controlável via RPC)
Interceptor.attach(addresses.set_skyfront, {
    onEnter: function(args) {
        writeColor(args[0], skyColor);
    }
});

// Hook para definir cor das nuvens (controlável via RPC)
Interceptor.attach(addresses.set_cloudColor, {
    onEnter: function(args) {
        writeColor(args[0], cloudColor);
    }
});

// Hook para ativar renderização de neblina (controlável via RPC)
Interceptor.attach(addresses.set_enableFogRendering, {
    onEnter: function(args) {
        args[0] = ptr(fogEnabled ? 1 : 0);
    }
});

// Hook para definir cor global do shader (controlável via RPC)
Interceptor.attach(addresses.setGlobalColor, {
    onEnter: function(args) {
        writeColor(args[1], fogColor);
    }
});

// Hook para definir textura global do shader (log apenas)
Interceptor.attach(addresses.setGlobalTexture, {
    onEnter: function(args) {
        // Log para debug
    }
});

// Hook para definir float global do shader (log apenas)
Interceptor.attach(addresses.setGlobalFloat, {
    onEnter: function(args) {
        // Log para debug
    }
});

// RPC System - Python pode chamar estas funções
rpc.exports = {
    // Ativar/desativar neblina
    setFogEnabled: function(enabled) {
        fogEnabled = enabled;
        console.log(`[Graphics] Fog enabled: ${fogEnabled}`);
        return true;
    },
    
    // Definir densidade da neblina
    setFogDensity: function(density) {
        fogDensity = density;
        console.log(`[Graphics] Fog density: ${fogDensity}`);
        return true;
    },
    
    // Definir cor da neblina (r, g, b, a)
    setFogColor: function(r, g, b, a) {
        fogColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Fog color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir cor da neblina inferior
    setBottomFogColor: function(r, g, b, a) {
        bottomFogColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Bottom fog color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir cor da neblina superior
    setTopFogColor: function(r, g, b, a) {
        topFogColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Top fog color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir cor da neblina distante
    setFarFogColor: function(r, g, b, a) {
        farFogColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Far fog color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir cor do céu
    setSkyColor: function(r, g, b, a) {
        skyColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Sky color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir cor das nuvens
    setCloudColor: function(r, g, b, a) {
        cloudColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] Cloud color: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Definir todas as cores de uma vez
    setAllColors: function(r, g, b, a) {
        fogColor = { r: r, g: g, b: b, a: a };
        bottomFogColor = { r: r, g: g, b: b, a: a };
        topFogColor = { r: r, g: g, b: b, a: a };
        farFogColor = { r: r, g: g, b: b, a: a };
        skyColor = { r: r, g: g, b: b, a: a };
        cloudColor = { r: r, g: g, b: b, a: a };
        console.log(`[Graphics] All colors set to: ${r}, ${g}, ${b}, ${a}`);
        return true;
    },
    
    // Obter configurações atuais
    getConfig: function() {
        return {
            fogEnabled: fogEnabled,
            fogDensity: fogDensity,
            fogColor: fogColor,
            skyColor: skyColor,
            cloudColor: cloudColor
        };
    }
};

console.log("[Graphics] All hooks installed - Fog forced on, density max, colors set to purple");
console.log("[Graphics] Script loaded");
