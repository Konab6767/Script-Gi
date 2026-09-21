// Genshin Impact - Hide Grass Script
// Funciona com Frida

console.log("[HideGrass] Starting...");

// Padrão de bytes para scanear
const pattern = "8b 47 ?? 89 05 ?? ?? ?? ?? 48 83 c4";
let hookAddress = null;

// Encontra o endereço usando Memory.scan em regiões executáveis do módulo GenshinImpact.exe
function findPattern() {
    // Encontra o módulo GenshinImpact.exe
    const genshinModule = Process.enumerateModules().find(mod => mod.name.toLowerCase().includes("genshin"));
    if (!genshinModule) {
        console.log("[HideGrass] ERROR: GenshinImpact.exe module not found!");
        return false;
    }
    
    console.log(`[HideGrass] Scanning module: ${genshinModule.name} (base: ${genshinModule.base}, size: ${genshinModule.size})`);
    
    // Pega todas as regiões executáveis do módulo
    const allRanges = Process.enumerateRanges('r-x');
    const moduleRanges = allRanges.filter(range => 
        range.base.compare(genshinModule.base) >= 0 && 
        range.base.add(range.size).compare(genshinModule.base.add(genshinModule.size)) <= 0
    );
    
    console.log(`[HideGrass] Found ${moduleRanges.length} executable regions to scan`);
    
    for (let i = 0; i < moduleRanges.length; i++) {
        const range = moduleRanges[i];
        try {
            console.log(`[HideGrass] Scanning region ${i+1}/${moduleRanges.length}...`);
            const scans = Memory.scanSync(range.base, range.size, pattern);
            if (scans.length > 0) {
                hookAddress = scans[0].address;
                console.log(`[HideGrass] SUCCESS: Pattern FOUND at address: ${hookAddress}`);
                console.log("[HideGrass] Stopping scan and enabling...");
                return true;
            }
        } catch (e) {
            console.log(`[HideGrass] Warning: Could not scan region: ${e}`);
        }
    }
    
    console.log("[HideGrass] ERROR: Pattern NOT found!");
    return false;
}

// Função para habilitar o hide grass: xor eax,eax + nop
function enableHideGrass() {
    if (!hookAddress) {
        console.log("[HideGrass] Error: Hook address not found!");
        return;
    }
    console.log("[HideGrass] Enabling hide grass...");
    try {
        Memory.protect(hookAddress, 3, 'rwx');
        hookAddress.writeU8(0x31);       // xor eax,eax (byte 1)
        hookAddress.add(1).writeU8(0xc0); // xor eax,eax (byte 2)
        hookAddress.add(2).writeU8(0x90); // nop (byte 3)
        Memory.protect(hookAddress, 3, 'r-x');
        console.log("[HideGrass] Hide grass ENABLED!");
    } catch (e) {
        console.log(`[HideGrass] Error enabling: ${e}`);
    }
}

// Função para desabilitar o hide grass: restaura mov eax,[rdi+8]
function disableHideGrass() {
    if (!hookAddress) {
        console.log("[HideGrass] Error: Hook address not found!");
        return;
    }
    console.log("[HideGrass] Disabling hide grass...");
    try {
        Memory.protect(hookAddress, 3, 'rwx');
        hookAddress.writeU8(0x8B);       // mov eax,[rdi+8] (byte 1)
        hookAddress.add(1).writeU8(0x47); // mov eax,[rdi+8] (byte 2)
        hookAddress.add(2).writeU8(0x08); // mov eax,[rdi+8] (byte 3)
        Memory.protect(hookAddress, 3, 'r-x');
        console.log("[HideGrass] Hide grass DISABLED!");
    } catch (e) {
        console.log(`[HideGrass] Error disabling: ${e}`);
    }
}

// Inicializa o script
function init() {
    const found = findPattern();
    if (found) {
        enableHideGrass();
    }
}

init();

// Expõe as funções para o console do Frida
rpc.exports = {
    enable: enableHideGrass,
    disable: disableHideGrass
};
