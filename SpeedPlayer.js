
console.log("[*] SpeedPlayer.js iniciado!");

const il2cpp_base = Process.findModuleByName("GenshinImpact.exe").base;
console.log("[+] Base do módulo: " + il2cpp_base);

const RVA_GetPlayerEntity = 0x12f84db0; // 0x11a28980;
const GetPlayerEntity = new NativeFunction(il2cpp_base.add(RVA_GetPlayerEntity), 'pointer', []);

const RVA_SetAvatarEntityMoveRatio = 0x12f7e5f0;
const SetAvatarEntityMoveRatio = new NativeFunction(il2cpp_base.add(RVA_SetAvatarEntityMoveRatio), 'void', ['pointer', 'float', 'uint8']);

console.log("[+] Funções carregadas!");

const playerEntity = GetPlayerEntity();
console.log("[+] Player Entity: " + playerEntity);

if (!playerEntity.isNull()) {
    SetAvatarEntityMoveRatio(playerEntity, 10.0, 0);
    console.log("[+] Velocidade definida para 5x!");
}
