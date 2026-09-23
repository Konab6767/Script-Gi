
console.log("[*] SpeedPlayer.js iniciado!");

const il2cpp_base = Process.findModuleByName("GenshinImpact.exe").base;
console.log("[+] Base do módulo: " + il2cpp_base);

const RVA_GetPlayerEntity = 0x13AA1C40;
const GetPlayerEntity = new NativeFunction(il2cpp_base.add(RVA_GetPlayerEntity), 'pointer', []);

const RVA_SetAvatarEntityMoveRatio = 0x13A9DBB0;
const SetAvatarEntityMoveRatio = new NativeFunction(il2cpp_base.add(RVA_SetAvatarEntityMoveRatio), 'void', ['pointer', 'float', 'uint8']);

console.log("[+] Funções carregadas!");

var playerSpeedEnabled = false;

function setPlayerSpeed(speed) {
    try {
        const playerEntity = GetPlayerEntity();
        console.log("[DEBUG] PlayerEntity: " + playerEntity);
        
        if (!playerEntity.isNull() && playerEntity.toInt32() !== 0) {
            SetAvatarEntityMoveRatio(playerEntity, speed, 0);
            playerSpeedEnabled = (speed !== 1.0);
            console.log("[+] Velocidade definida para " + speed + "x!");
            return true;
        } else {
            console.log("[-] Player entity not found or invalid");
            return false;
        }
    } catch(e) {
        console.log("[-] Error setting speed: " + e);
        return false;
    }
}

rpc.exports = {
    togglePlayerSpeed: function(enabled, speed) {
        console.log("[DEBUG] togglePlayerSpeed called: enabled=" + enabled + ", speed=" + speed);
        if (enabled) {
            return setPlayerSpeed(speed || 5.0);
        } else {
            return setPlayerSpeed(1.0);
        }
    },
    getStatus: function() {
        return { enabled: playerSpeedEnabled };
    }
};

console.log("[+] SpeedPlayer.js RPC exports loaded!");
