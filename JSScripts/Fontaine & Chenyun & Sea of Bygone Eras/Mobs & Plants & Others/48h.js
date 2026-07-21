// Convertido de: 48h.lua
// Total de posições: 31

const positions = [
  { name: "tochka1", x: 2304.52, y: 278.972, z: 2226.93 },
  { name: "tochka2", x: 1866.78, y: 280.19, z: 1787.94 },
  { name: "tochka3", x: 1773.3, y: 280.501, z: 1875.14 },
  { name: "tochka4", x: 1443.24, y: 226.888, z: 1642.17 },
  { name: "tochka5", x: 1502.04, y: 226.84, z: 1636.15 },
  { name: "tochka6", x: 1576.39, y: 174.898, z: 1764.48 },
  { name: "tochka7", x: 1371.64, y: 214.779, z: 1719.75 },
  { name: "tochka8", x: 1261.36, y: 214.825, z: 1725.9 },
  { name: "tochka9", x: 1400.7, y: 236.342, z: 1938.05 },
  { name: "tochka10", x: 1396.61, y: 235.928, z: 1930.27 },
  { name: "tochka11", x: 1406.61, y: 236.585, z: 1928.78 },
  { name: "tochka12", x: 2331.88, y: 281.681, z: 2079.35 },
  { name: "tochka13", x: 1188.54, y: 214.902, z: 1973.83 },
  { name: "tochka14", x: 1199.39, y: 214.981, z: 1987.66 },
  { name: "tochka15", x: 1198.81, y: 214.801, z: 2020.97 },
  { name: "tochka16", x: 1193.22, y: 214.786, z: 2029.91 },
  { name: "tochka17", x: 1253.9, y: 284.705, z: 2182.23 },
  { name: "tochka18", x: 1530.69, y: 279.445, z: 2306.33 },
  { name: "tochka19", x: 1533.46, y: 246.839, z: 2221.48 },
  { name: "tochka20", x: 1524.87, y: 246.844, z: 2219.99 },
  { name: "tochka21", x: 1534.88, y: 246.642, z: 2213.78 },
  { name: "tochka22", x: 1741.22, y: 331.766, z: 2132.29 },
  { name: "tochka23", x: 2374.71, y: 333.401, z: 2029.21 },
  { name: "tochka24", x: 1673.96, y: 375.635, z: 2323.05 },
  { name: "tochka25", x: 1743.91, y: 409.7, z: 2243.26 },
  { name: "tochka26", x: 2209.42, y: 387.524, z: 2073.95 },
  { name: "tochka27", x: 2014.81, y: 280.101, z: 1463.04 },
  { name: "tochka28", x: 1856.98, y: 279.809, z: 1480.42 },
  { name: "tochka29", x: 1800.78, y: 280.426, z: 1459.6 },
  { name: "tochka30", x: 1806.56, y: 279.988, z: 1410.07 },
  { name: "tochka31", x: 1762.02, y: 284.49, z: 1631.65 }
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
