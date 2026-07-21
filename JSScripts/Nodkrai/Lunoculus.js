// Convertido de: Lunoculus.lua
// Total de posições: 112

const positions = [
  { name: "tochka1", x: 2011.636, y: 265.006, z: 10632.909 },
  { name: "tochka2", x: 2026.791, y: 341.829, z: 10646.506 },
  { name: "tochka3", x: 2036.932, y: 345.707, z: 10534.706 },
  { name: "tochka4", x: 1947.504, y: 266.5, z: 10562.137 },
  { name: "tochka5", x: 1881.75, y: 239.285, z: 10563.116 },
  { name: "tochka6", x: 1816.648, y: 215.404, z: 10566.716 },
  { name: "tochka7", x: 1803.798, y: 178.855, z: 10524.356 },
  { name: "tochka8", x: 1747.081, y: 223.458, z: 10513.07 },
  { name: "tochka9", x: 1717.607, y: 201.297, z: 10461.676 },
  { name: "tochka10", x: 1699.131, y: 231.573, z: 10418.816 },
  { name: "tochka11", x: 1811.471, y: 203.989, z: 10319.176 },
  { name: "tochka12", x: 1851.674, y: 123.402, z: 10421.55 },
  { name: "tochka13", x: 1928.172, y: 287.297, z: 10373.358 },
  { name: "tochka14", x: 1960.795, y: 205.742, z: 10685.916 },
  { name: "tochka15", x: 1847.109, y: 211.743, z: 10829.922 },
  { name: "tochka16", x: 1800.056, y: 203.07, z: 10945.407 },
  { name: "tochka17", x: 1679.071, y: 207.258, z: 10920.372 },
  { name: "tochka18", x: 1659.117, y: 240.873, z: 11039.713 },
  { name: "tochka19", x: 1671.432, y: 204.22, z: 11083.582 },
  { name: "tochka20", x: 1650.173, y: 232.159, z: 11165.731 },
  { name: "tochka21", x: 1522.119, y: 223.571, z: 11110.596 },
  { name: "tochka22", x: 1494.848, y: 211.754, z: 11011.846 },
  { name: "tochka23", x: 1440.848, y: 216.898, z: 10629.879 },
  { name: "tochka24", x: 1778.984, y: 210.855, z: 10714.49 },
  { name: "tochka25", x: 1954.557, y: 13.641, z: 10772.056 },
  { name: "tochka26", x: 2035.884, y: 220.185, z: 10880.973 },
  { name: "tochka27", x: 2125.18, y: 229.424, z: 10798.362 },
  { name: "tochka28", x: 2230.991, y: 248.215, z: 10734.812 },
  { name: "tochka29", x: 2252.906, y: 223.007, z: 10710.352 },
  { name: "tochka30", x: 2353.217, y: 263.401, z: 10689.352 },
  { name: "tochka31", x: 2491.834, y: 212.247, z: 10641.53 },
  { name: "tochka32", x: 2356.846, y: 206.064, z: 10861.186 },
  { name: "tochka33", x: 1993.351, y: 207.728, z: 10996.568 },
  { name: "tochka34", x: 2082.101, y: 115.726, z: 11226.344 },
  { name: "tochka35", x: 1653.12, y: 207.048, z: 10094.581 },
  { name: "tochka36", x: 1653.012, y: 223.905, z: 9948.95 },
  { name: "tochka37", x: 1561.216, y: 206.881, z: 9896.004 },
  { name: "tochka38", x: 1572.698, y: 236.921, z: 9778.278 },
  { name: "tochka39", x: 1677.584, y: 271.067, z: 9799.572 },
  { name: "tochka40", x: 1754.135, y: 232.674, z: 9780.504 },
  { name: "tochka41", x: 1816.812, y: 258.9, z: 9771.718 },
  { name: "tochka42", x: 1815.207, y: 266.769, z: 9772.777 },
  { name: "tochka43", x: 1881.878, y: 308.944, z: 9810.904 },
  { name: "tochka44", x: 2011.09, y: 262.072, z: 9858.115 },
  { name: "tochka45", x: 2072.039, y: 218.346, z: 9775.626 },
  { name: "tochka46", x: 1891.701, y: 208.666, z: 9985.156 },
  { name: "tochka47", x: 1739.929, y: 278.642, z: 9868.929 },
  { name: "tochka48", x: 1812.894, y: 240.878, z: 9664.116 },
  { name: "tochka49", x: 1638.43, y: 317.802, z: 9523.863 },
  { name: "tochka50", x: 1614.641, y: 276.947, z: 9408.985 },
  { name: "tochka51", x: 1548.904, y: 224.87, z: 9379.791 },
  { name: "tochka52", x: 1548.89, y: 223.781, z: 9379.751 },
  { name: "tochka53", x: 1718.159, y: 293.089, z: 9425.319 },
  { name: "tochka54", x: 1861.642, y: 345.54, z: 9361.539 },
  { name: "tochka55", x: 1820.519, y: 242.569, z: 9235.339 },
  { name: "tochka56", x: 1905.43, y: 207.278, z: 9064.009 },
  { name: "tochka57", x: 2076.323, y: 212.152, z: 9064.43 },
  { name: "tochka58", x: 2149.711, y: 280.978, z: 9090.136 },
  { name: "tochka59", x: 2175.688, y: 284.737, z: 9129.415 },
  { name: "tochka60", x: 2290.352, y: 296.679, z: 9112.327 },
  { name: "tochka61", x: 2320.041, y: 267.694, z: 9118.481 },
  { name: "tochka62", x: 2410.582, y: 274.171, z: 9121.238 },
  { name: "tochka63", x: 2475.179, y: 214.951, z: 9058.579 },
  { name: "tochka64", x: 2604.792, y: 235.155, z: 9072.005 },
  { name: "tochka65", x: 2774.021, y: 226.318, z: 9125.53 },
  { name: "tochka66", x: 2846.874, y: 216.225, z: 9219.266 },
  { name: "tochka67", x: 2703.44, y: 470.608, z: 9156.698 },
  { name: "tochka68", x: 2660.295, y: 420.561, z: 9046.421 },
  { name: "tochka69", x: 2570.689, y: 418.362, z: 8981.829 },
  { name: "tochka70", x: 2542.139, y: 264.212, z: 8849.49 },
  { name: "tochka71", x: 2383.415, y: 298.13, z: 8992.008 },
  { name: "tochka72", x: 2372.429, y: 229.08, z: 9217.017 },
  { name: "tochka73", x: 2366.694, y: 211.789, z: 9338.516 },
  { name: "tochka74", x: 2243.949, y: 253.198, z: 9391.242 },
  { name: "tochka75", x: 2192.837, y: 225.268, z: 9477.344 },
  { name: "tochka76", x: 2160.24, y: 211.636, z: 9332.151 },
  { name: "tochka77", x: 2203.211, y: 307.492, z: 9283.857 },
  { name: "tochka78", x: 2050.462, y: 232.801, z: 9204.26 },
  { name: "tochka79", x: 2018.94, y: 270.273, z: 9310.661 },
  { name: "tochka80", x: 2439.118, y: 214.47, z: 9504.688 },
  { name: "tochka81", x: 2474.724, y: 347.46, z: 9205.446 },
  { name: "tochka82", x: 2554.357, y: 372.869, z: 9219.841 },
  { name: "tochka83", x: 2345.561, y: 203.543, z: 8738.04 },
  { name: "tochka84", x: 2270.528, y: 213.329, z: 8659.516 },
  { name: "tochka85", x: 2205.172, y: 207.579, z: 8592.439 },
  { name: "tochka88", x: 3262.973, y: 203.355, z: 9281.976 },
  { name: "tochka89", x: 3354.356, y: 208.77, z: 9271.366 },
  { name: "tochka90", x: 3466.509, y: 224.63, z: 9291.869 },
  { name: "tochka91", x: 3468.835, y: 204.236, z: 9329.663 },
  { name: "tochka92", x: 3480.745, y: 203.553, z: 9402.747 },
  { name: "tochka93", x: 3549.546, y: 207.072, z: 9472.061 },
  { name: "tochka94", x: 3425.557, y: 201.582, z: 9520.903 },
  { name: "tochka95", x: 3430.513, y: 270.754, z: 9498.636 },
  { name: "tochka96", x: 3207.22, y: 230.83, z: 9635.477 },
  { name: "tochka97", x: 3087.345, y: 220.58, z: 9680.915 },
  { name: "tochka98", x: 3108.306, y: 244.847, z: 9745.124 },
  { name: "tochka99", x: 3145.372, y: 361.458, z: 9881.895 },
  { name: "tochka100", x: 3262.098, y: 419.509, z: 9957.562 },
  { name: "tochka101", x: 3262.569, y: 493.431, z: 9899.17 },
  { name: "tochka102", x: 3304.172, y: 294.661, z: 9951.264 },
  { name: "tochka103", x: 3403.982, y: 334.632, z: 9844.566 },
  { name: "tochka104", x: 3538.73, y: 267.589, z: 9872.938 },
  { name: "tochka105", x: 3594.216, y: 205.621, z: 9931.989 },
  { name: "tochka106", x: 3271.455, y: 149.453, z: 10094.443 },
  { name: "tochka107", x: 3263.292, y: 249.84, z: 10195.584 },
  { name: "tochka108", x: 3017.719, y: 236.07, z: 9991.417 },
  { name: "tochka109", x: 2877.076, y: 232.009, z: 9916.328 },
  { name: "tochka110", x: 3100.321, y: 223.593, z: 9521.934 },
  { name: "tochka111", x: 3386.122, y: 202.631, z: 9146.708 },
  { name: "tochka112", x: 3713.435, y: 258.916, z: 9186.674 },
  { name: "tochka113", x: 1468.373, y: 218.289, z: 9697.075 },
  { name: "tochka114", x: 1288.696, y: 200.878, z: 10074.255 }
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
