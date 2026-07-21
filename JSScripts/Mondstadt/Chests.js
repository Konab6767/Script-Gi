// Convertido de: Chests.lua
// Total de posições: 74

const positions = [
  { name: "tochka3", x: 2694.198, y: 238.484, z: 233.239 },
  { name: "tochka129", x: 2457.31, y: 208.844, z: 136.349 },
  { name: "tochka133", x: 2397.657, y: 211.304, z: 62.032 },
  { name: "tochka134", x: 2482.189, y: 205.858, z: 130.297 },
  { name: "tochka136", x: 2412.558, y: 211.288, z: 28.378 },
  { name: "tochka137", x: 2414.788, y: 217.964, z: 49.169 },
  { name: "tochka138", x: 2571.646, y: 227.188, z: 15.897 },
  { name: "tochka139", x: 2447.14, y: 225.778, z: 146.759 },
  { name: "tochka140", x: 2520.291, y: 208.975, z: 404.543 },
  { name: "tochka141", x: 2457.237, y: 242.345, z: 264.332 },
  { name: "tochka143", x: 2521.088, y: 229.809, z: 191.11 },
  { name: "tochka144", x: 2468.173, y: 209.548, z: 68.196 },
  { name: "tochka147", x: 2608.052, y: 214.087, z: 225.551 },
  { name: "tochka148", x: 2645.681, y: 215.893, z: 445.209 },
  { name: "tochka149", x: 2580.041, y: 198.374, z: 400.53 },
  { name: "tochka150", x: 2630.251, y: 211.216, z: 463.095 },
  { name: "tochka151", x: 2651.999, y: 220.338, z: 428.494 },
  { name: "tochka160", x: 2473.745, y: 245.734, z: 466.727 },
  { name: "tochka161", x: 2702.16, y: 253.256, z: 473.403 },
  { name: "tochka162", x: 2734.92, y: 219.001, z: 95.254 },
  { name: "tochka163", x: 2737.756, y: 248.039, z: 182.38 },
  { name: "tochka164", x: 2624.502, y: 232.086, z: 194.961 },
  { name: "tochka165", x: 2628.433, y: 251.863, z: 93.406 },
  { name: "tochka167", x: 2683.736, y: 258.35, z: 100.159 },
  { name: "tochka169", x: 2690.818, y: 239.099, z: 96.844 },
  { name: "tochka170", x: 2702.836, y: 233.851, z: 173.35 },
  { name: "tochka171", x: 2677.584, y: 222.116, z: 40.207 },
  { name: "tochka172", x: 2699.281, y: 240.493, z: 26.246 },
  { name: "tochka173", x: 2606.418, y: 221.372, z: 52.393 },
  { name: "tochka174", x: 2724.27, y: 248.103, z: 184.982 },
  { name: "tochka176", x: 3052.137, y: 239.713, z: 178.854 },
  { name: "tochka177", x: 2522.865, y: 208.482, z: 273.36 },
  { name: "tochka181", x: 2747.029, y: 258.633, z: 119.614 },
  { name: "tochka182", x: 2797.108, y: 208.869, z: 157.722 },
  { name: "tochka183", x: 2912.794, y: 207.829, z: 29.125 },
  { name: "tochka184", x: 3036.2, y: 212.3, z: 161.5 },
  { name: "tochka185", x: 2933.462, y: 213.542, z: 177.354 },
  { name: "tochka186", x: 2957.491, y: 207.101, z: 108.676 },
  { name: "tochka187", x: 2722.118, y: 222.518, z: 209.243 },
  { name: "tochka188", x: 2901.214, y: 215.57, z: 324.112 },
  { name: "tochka189", x: 2753.285, y: 210.397, z: 350.687 },
  { name: "tochka194", x: 2395.049, y: 222.545, z: 391.511 },
  { name: "tochka195", x: 2394.739, y: 222.545, z: 388.567 },
  { name: "tochka196", x: 2457.663, y: 221.483, z: 380.344 },
  { name: "tochka197", x: 2565.92, y: 201.264, z: 367.792 },
  { name: "tochka198", x: 2540.012, y: 200.883, z: 340.326 },
  { name: "tochka199", x: 2671.877, y: 212.404, z: 380.396 },
  { name: "tochka207", x: 2379.7, y: 227.3, z: 55.0 },
  { name: "tochka208", x: 2145.992, y: 226.233, z: 29.331 },
  { name: "tochka209", x: 2556.799, y: 214.703, z: 152.901 },
  { name: "tochka272", x: 2642.033, y: 230.366, z: 23.584 },
  { name: "tochka282", x: 2548.7, y: 205.45, z: 207.3 },
  { name: "tochka294", x: 2606.999, y: 180.003, z: 411.5 },
  { name: "tochka299", x: 2652.397, y: 325.01, z: 132.08 },
  { name: "tochka307", x: 2730.2, y: 240.4, z: 316.5 },
  { name: "tochka312", x: 2767.248, y: 212.071, z: 106.982 },
  { name: "tochka314", x: 2586.2, y: 210.8, z: 455.0 },
  { name: "tochka316", x: 2603.1, y: 229.6, z: 153.5 },
  { name: "tochka317", x: 2994.027, y: 211.075, z: 59.27 },
  { name: "tochka318", x: 2667.801, y: 212.035, z: 285.099 },
  { name: "tochka319", x: 2716.1, y: 207.133, z: 344.2 },
  { name: "tochka321", x: 2745.102, y: 218.945, z: 229.5 },
  { name: "tochka322", x: 2624.5, y: 206.825, z: 357.501 },
  { name: "tochka324", x: 2548.798, y: 207.05, z: 250.399 },
  { name: "tochka328", x: 2449.5, y: 263.155, z: 364.199 },
  { name: "tochka330", x: 2498.0, y: 210.154, z: 366.001 },
  { name: "tochka331", x: 2383.7, y: 222.5, z: 383.2 },
  { name: "tochka332", x: 2444.7, y: 220.028, z: 210.1 },
  { name: "tochka339", x: 2940.9, y: 216.0, z: 291.7 },
  { name: "tochka362", x: 2448.569, y: 263.196, z: 361.839 },
  { name: "tochka363", x: 2450.45, y: 263.114, z: 366.684 },
  { name: "tochka378", x: 2648.761, y: 264.608, z: 147.712 },
  { name: "tochka427", x: 2667.161, y: 300.649, z: 132.182 },
  { name: "tochka428", x: 2699.857, y: 226.563, z: 84.864 }
];

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = positions;
}

// Função auxiliar para obter posição por nome
function getPositionByName(name) {
  return positions.find(pos => pos.name === name);
}

// Função auxiliar para obter posição por índice
function getPositionByIndex(index) {
  return positions[index];
}

// Função para obter todas as posições
function getAllPositions() {
  return positions;
}

// Função para obter total de posições
function getTotalPositions() {
  return positions.length;
}

// Exportar funções auxiliares
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    positions,
    getPositionByName,
    getPositionByIndex,
    getAllPositions,
    getTotalPositions
  };
}
