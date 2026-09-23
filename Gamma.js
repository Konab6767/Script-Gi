
// Gamma Changer - Hooka métodos set do PostProcessLayer
// Baseado no GraphicsChanger.cpp do Minty-GI

send("Iniciando Gamma Changer...");

var moduleBase = Process.enumerateModules()[0].base;

// RVAs baseados no il2cpp_functions.C
// Offsets de campos baseados no 6.3Dump.cs
var Offsets = {
    base: moduleBase,
    PostProcessLayer_Update: 0x07086E90,
    // Métodos set (para gamma e resolution scale)
    set_gammaValue: 0x070827D0,
    set_innerResolutionScale: 0x07082820,
    set_cameraBufferDirty: 0x07082800,
    // Offsets de campos (para outline)
    field_outlineCorrectionWidth: 0x30
};

send("Module base: " + Offsets.base);

// Valores desejados
var targetGamma = 1.0; // 1.0 = normal, valores mais altos = mais brilho (evite > 3.0)
var targetResolutionScale = 1.0; // 1.0 = resolução nativa, 0.8 = 80% da resolução
var targetOutlineWidth = -19.0;

// Variável para armazenar o ponteiro do PostProcessLayer
var postProcessLayerPtr = null;
var gammaHook = null;
var gammaEnabled = false;

function enableGamma() {
    if (gammaHook) return;
    try {
        gammaHook = Interceptor.attach(Offsets.base.add(Offsets.PostProcessLayer_Update), {
            onEnter: function(args) {
                // args[0] = this (PostProcessLayer*)
                postProcessLayerPtr = args[0];
                
                // Modificar gammaValue usando método set
                try {
                    var setGamma = new NativeFunction(
                        Offsets.base.add(Offsets.set_gammaValue),
                        "void",
                        ["pointer", "float"]
                    );
                    setGamma(postProcessLayerPtr, targetGamma);
                } catch(e) { send("Erro ao definir gamma: " + e); }
                
                // Modificar innerResolutionScale usando método set
                try {
                    var setResScale = new NativeFunction(
                        Offsets.base.add(Offsets.set_innerResolutionScale),
                        "void",
                        ["pointer", "float"]
                    );
                    setResScale(postProcessLayerPtr, targetResolutionScale);
                } catch(e) { send("Erro ao definir resolution scale: " + e); }
                
                // Marcar cameraBufferDirty como true usando método set
                try {
                    var setDirty = new NativeFunction(
                        Offsets.base.add(Offsets.set_cameraBufferDirty),
                        "void",
                        ["pointer", "bool"]
                    );
                    setDirty(postProcessLayerPtr, 1);
                } catch(e) { send("Erro ao definir cameraBufferDirty: " + e); }
                
                // Modificar outlineCorrectionWidth usando offset de campo
                try {
                    postProcessLayerPtr.add(Offsets.field_outlineCorrectionWidth).writeFloat(targetOutlineWidth);
                } catch(e) { send("Erro ao definir outlineCorrectionWidth: " + e); }
            }
        });
        gammaEnabled = true;
        send("Hook: PostProcessLayer_Update instalado");
    } catch(e) { send("Hook falhou: " + e); }
}

function disableGamma() {
    if (gammaHook) {
        gammaHook.detach();
        gammaHook = null;
        gammaEnabled = false;
        targetGamma = 1.0;
        targetResolutionScale = 1.0;
        send("Gamma Changer desativado");
    }
}

function setGamma(value) {
    targetGamma = value;
    gammaEnabled = (value !== 1.0);
    send("Gamma definido para: " + value);
}

function setResolution(value) {
    targetResolutionScale = value;
    send("Resolution Scale definido para: " + value);
}

rpc.exports = {
    setGamma: function(value) {
        setGamma(value);
        if (!gammaHook) enableGamma();
        return true;
    },
    setResolution: function(value) {
        setResolution(value);
        if (!gammaHook) enableGamma();
        return true;
    },
    toggleGamma: function(enabled) {
        if (enabled) {
            if (!gammaHook) enableGamma();
        } else {
            disableGamma();
        }
        return true;
    },
    getStatus: function() {
        return { enabled: gammaEnabled, gamma: targetGamma, resolution: targetResolutionScale };
    }
};

send("Gamma Changer instalado!");
send("Gamma: " + targetGamma);
send("Resolution Scale: " + targetResolutionScale);
