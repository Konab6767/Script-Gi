console.log("[*] Script Cm.js iniciado!");

const il2cpp_base = Process.findModuleByName("GenshinImpact.exe").base;
console.log("[+] Base do módulo GenshinImpact.exe: " + il2cpp_base);

// RVAs do dumpAtual.cs
const RVA_get_main = 0x18f98ba0;
const RVA_get_transform = 0x18fa8f10;
const RVA_INTERNAL_get_position = 0x18fa29c0; // RVA correto do UnityEngine.Transform

// Obter os endereços das funções
const get_main = new NativeFunction(il2cpp_base.add(RVA_get_main), 'pointer', []);
const get_transform = new NativeFunction(il2cpp_base.add(RVA_get_transform), 'pointer', ['pointer']);
const INTERNAL_get_position = new NativeFunction(il2cpp_base.add(RVA_INTERNAL_get_position), 'void', ['pointer', 'pointer']);

console.log("[+] Função get_main() em: " + il2cpp_base.add(RVA_get_main));
console.log("[+] Função get_transform() em: " + il2cpp_base.add(RVA_get_transform));
console.log("[+] Função INTERNAL_get_position() em: " + il2cpp_base.add(RVA_INTERNAL_get_position));

// Tentar obter a câmera principal
function checkCamera() {
    try {
        console.log("\n[*] Tentando obter Camera.get_main()...");
        const camera = get_main();
        
        if (camera.isNull()) {
            console.log("[-] Camera.get_main() retornou NULL!");
            return;
        }
        
        console.log("[+] Camera.get_main() retornou: " + camera);
        
        // Obter Transform da câmera
        const transform = get_transform(camera);
        if (transform.isNull()) {
            console.log("[-] Transform.get_transform() retornou NULL!");
            return;
        }
        console.log("[+] Transform.get_transform() retornou: " + transform);
        
        // Alocar memória para receber o Vector3 (12 bytes = 3 floats)
        const positionBuffer = Memory.alloc(12);
        
        // Chamar INTERNAL_get_position
        INTERNAL_get_position(transform, positionBuffer);
        
        // Ler os floats do buffer
        const x = positionBuffer.readFloat();
        const y = positionBuffer.add(4).readFloat();
        const z = positionBuffer.add(8).readFloat();
        
        console.log("[+] Posição da câmera (Float):");
        console.log("    X: " + x);
        console.log("    Y: " + y);
        console.log("    Z: " + z);
        
    } catch (e) {
        console.log("[-] Erro: " + e);
    }
}

checkCamera();

// Verificar a cada 2 segundos
setInterval(checkCamera, 2000);
