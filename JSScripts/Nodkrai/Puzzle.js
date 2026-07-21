// Convertido de: Puzzle.lua
// Total de posições: 88

const positions = [
  { name: "tochka1", x: 2911.342, y: 204.36, z: 9940.187 },
  { name: "tochka2", x: 2910.446, y: 204.488, z: 9950.382 },
  { name: "tochka3", x: 2891.592, y: 203.538, z: 9948.309 },
  { name: "tochka4", x: 3155.788, y: 349.321, z: 9889.053 },
  { name: "tochka5", x: 3211.876, y: 352.015, z: 9847.597 },
  { name: "tochka6", x: 3175.298, y: 237.415, z: 9443.158 },
  { name: "tochka7", x: 1747.976, y: 205.048, z: 10308.456 },
  { name: "tochka8", x: 2101.462, y: 202.308, z: 10886.642 },
  { name: "tochka9", x: 3428.924, y: 201.661, z: 9742.691 },
  { name: "tochka10", x: 3445.365, y: 201.665, z: 9725.544 },
  { name: "tochka11", x: 2209.583, y: 201.527, z: 8790.911 },
  { name: "tochka12", x: 2176.746, y: 205.258, z: 8801.916 },
  { name: "tochka13", x: 2166.303, y: 202.281, z: 8761.848 },
  { name: "tochka14", x: 2213.422, y: 201.141, z: 8750.369 },
  { name: "tochka15", x: 2143.306, y: 200.928, z: 10865.124 },
  { name: "tochka16", x: 2122.609, y: 202.188, z: 10856.89 },
  { name: "tochka17", x: 2189.979, y: 200.385, z: 10803.193 },
  { name: "tochka18", x: 2258.69, y: 200.558, z: 10770.698 },
  { name: "tochka19", x: 2055.464, y: 308.355, z: 10778.604 },
  { name: "tochka20", x: 2028.154, y: 305.887, z: 10779.947 },
  { name: "tochka21", x: 1991.832, y: 289.025, z: 10749.558 },
  { name: "tochka22", x: 2029.613, y: 338.616, z: 10646.981 },
  { name: "tochka23", x: 2147.92, y: 415.316, z: 10757.842 },
  { name: "tochka24", x: 1739.414, y: 173.625, z: 10485.275 },
  { name: "tochka25", x: 1631.525, y: 201.494, z: 10417.709 },
  { name: "tochka26", x: 1784.453, y: 258.584, z: 9429.429 },
  { name: "tochka27", x: 1909.45, y: 237.407, z: 9308.897 },
  { name: "tochka28", x: 1970.811, y: 259.685, z: 9459.806 },
  { name: "tochka29", x: 2065.798, y: 294.626, z: 9284.817 },
  { name: "tochka30", x: 2147.508, y: 271.855, z: 9081.513 },
  { name: "tochka31", x: 2420.567, y: 198.318, z: 9143.482 },
  { name: "tochka32", x: 2559.665, y: 282.764, z: 8849.086 },
  { name: "tochka33", x: 2814.455, y: 208.036, z: 9120.448 },
  { name: "tochka34", x: 2734.12, y: 376.924, z: 9346.781 },
  { name: "tochka35", x: 2882.696, y: 220.326, z: 9916.093 },
  { name: "tochka36", x: 3006.632, y: 207.957, z: 10426.723 },
  { name: "tochka37", x: 1461.884, y: 204.871, z: 9390.485 },
  { name: "tochka38", x: 1658.8, y: 200.713, z: 10828.687 },
  { name: "tochka39", x: 1768.172, y: 200.342, z: 10879.137 },
  { name: "tochka40", x: 1860.037, y: 201.342, z: 10836.969 },
  { name: "tochka41", x: 1830.102, y: 200.949, z: 10985.766 },
  { name: "tochka42", x: 2075.534, y: 201.312, z: 10583.813 },
  { name: "tochka43", x: 2223.467, y: 241.736, z: 10663.337 },
  { name: "tochka44", x: 2237.63, y: 218.048, z: 10655.285 },
  { name: "tochka45", x: 2235.833, y: 219.059, z: 10687.254 },
  { name: "tochka46", x: 2239.895, y: 212.741, z: 10708.581 },
  { name: "tochka47", x: 1946.413, y: 258.177, z: 10388.033 },
  { name: "tochka48", x: 1882.46, y: 243.239, z: 10388.424 },
  { name: "tochka49", x: 1733.839, y: 224.495, z: 10377.499 },
  { name: "tochka50", x: 1661.272, y: 201.028, z: 10338.873 },
  { name: "tochka51", x: 2459.699, y: 309.128, z: 9300.887 },
  { name: "tochka52", x: 3207.968, y: 183.674, z: 9592.315 },
  { name: "tochka53", x: 2996.013, y: 208.766, z: 9837.847 },
  { name: "tochka54", x: 3569.694, y: 250.155, z: 9871.278 },
  { name: "tochka55", x: 3589.996, y: 206.288, z: 9940.316 },
  { name: "tochka56", x: 3304.62, y: 201.659, z: 9236.11 },
  { name: "tochka57", x: 1910.892, y: 201.319, z: 9598.776 },
  { name: "tochka58", x: 1964.763, y: 254.093, z: 9466.481 },
  { name: "tochka59", x: 1964.702, y: 254.051, z: 9466.433 },
  { name: "tochka60", x: 2015.828, y: 201.67, z: 9361.843 },
  { name: "tochka61", x: 2073.383, y: 288.881, z: 9376.45 },
  { name: "tochka62", x: 1907.621, y: 237.05, z: 9310.926 },
  { name: "tochka63", x: 1868.505, y: 236.751, z: 9342.585 },
  { name: "tochka64", x: 1870.63, y: 236.511, z: 9364.799 },
  { name: "tochka65", x: 1728.106, y: 274.366, z: 9363.074 },
  { name: "tochka66", x: 1700.977, y: 298.749, z: 9419.18 },
  { name: "tochka67", x: 2137.387, y: 229.89, z: 9550.735 },
  { name: "tochka68", x: 2163.562, y: 202.219, z: 9553.336 },
  { name: "tochka69", x: 2162.879, y: 204.349, z: 9574.94 },
  { name: "tochka70", x: 2150.727, y: 202.11, z: 9591.129 },
  { name: "tochka71", x: 2284.108, y: 269.698, z: 9146.353 },
  { name: "tochka72", x: 2283.569, y: 271.234, z: 9111.964 },
  { name: "tochka73", x: 2249.617, y: 268.032, z: 9128.451 },
  { name: "tochka74", x: 2571.781, y: 348.172, z: 9296.792 },
  { name: "tochka75", x: 1567.182, y: 203.073, z: 9890.408 },
  { name: "tochka76", x: 1781.422, y: 136.31, z: 9716.8 },
  { name: "tochka77", x: 1768.754, y: 184.079, z: 9725.798 },
  { name: "tochka78", x: 1747.082, y: 183.974, z: 9741.589 },
  { name: "tochka79", x: 1769.394, y: 256.621, z: 9792.59 },
  { name: "tochka80", x: 1777.044, y: 268.01, z: 9864.7 },
  { name: "tochka81", x: 2016.051, y: 201.136, z: 10893.061 },
  { name: "tochka82", x: 1651.151, y: 201.598, z: 10192.2 },
  { name: "tochka83", x: 1958.705, y: 201.046, z: 9720.604 },
  { name: "tochka84", x: 2389.294, y: 202.489, z: 9654.898 },
  { name: "tochka85", x: 2057.71, y: 201.282, z: 9102.69 },
  { name: "tochka86", x: 2764.413, y: 265.186, z: 9054.77 },
  { name: "tochka87", x: 3535.4, y: 202.303, z: 9518.843 },
  { name: "tochka88", x: 3531.153, y: 225.897, z: 9802.726 }
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
