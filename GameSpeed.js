
console.log("[*] GameSpeed.js iniciado!");

const il2cpp_base = Process.findModuleByName("GenshinImpact.exe").base;
console.log("[+] Base do módulo: " + il2cpp_base);

const RVA_get_timeScale = 0x18f8a6e0;
const RVA_set_timeScale = 0x18f8a6f0;

const get_timeScale = new NativeFunction(il2cpp_base.add(RVA_get_timeScale), 'float', []);
const set_timeScale = new NativeFunction(il2cpp_base.add(RVA_set_timeScale), 'void', ['float']);

console.log("[+] Funções carregadas!");
console.log("[+] Velocidade atual: " + get_timeScale());

const desiredSpeed = 10.0; // Altere esse valor para a velocidade desejada
set_timeScale(desiredSpeed);

console.log("[+] Velocidade do jogo definida para " + desiredSpeed + "x!");
