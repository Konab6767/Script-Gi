
console.log("[*] GameSpeed.js iniciado!");

const il2cpp_base = Process.findModuleByName("GenshinImpact.exe").base;
console.log("[+] Base do módulo: " + il2cpp_base);

const RVA_get_timeScale = 0x19BE87F0;
const RVA_set_timeScale = 0x19BE8800;

const get_timeScale = new NativeFunction(il2cpp_base.add(RVA_get_timeScale), 'float', []);
const set_timeScale = new NativeFunction(il2cpp_base.add(RVA_set_timeScale), 'void', ['float']);

console.log("[+] Funções carregadas!");

var gameSpeedEnabled = false;

function setGameSpeed(speed) {
    try {
        set_timeScale(speed);
        gameSpeedEnabled = (speed !== 1.0);
        console.log("[+] Velocidade do jogo definida para " + speed + "x!");
        return true;
    } catch(e) {
        console.log("[-] Error setting game speed: " + e);
        return false;
    }
}

rpc.exports = {
    toggleGameSpeed: function(enabled, speed) {
        if (enabled) {
            return setGameSpeed(speed || 10.0);
        } else {
            return setGameSpeed(1.0);
        }
    },
    getStatus: function() {
        return { enabled: gameSpeedEnabled, currentSpeed: get_timeScale() };
    }
};

console.log("[+] GameSpeed.js RPC exports loaded!");
