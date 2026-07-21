// Convertido de: Faded Castle & Sea of Bygone Eras.lua
// Total de posições: 18

const positions = [
  { name: "tochka1", x: 1230.78, y: 82.0902, z: 4035.23 },
  { name: "tochka2", x: 1359.67, y: 224.306, z: 3837.75 },
  { name: "tochka3", x: 1459.73, y: 255.495, z: 3777.16 },
  { name: "tochka4", x: 1603.82, y: 161.479, z: 3972.67 },
  { name: "tochka5", x: 1541.13, y: 347.55, z: 3639.33 },
  { name: "tochka7", x: 1133.72, y: 33.3902, z: 3858.45 },
  { name: "tochka8", x: 1356.13, y: 606.646, z: 4740.03 },
  { name: "tochka9", x: 1766.61, y: 575.675, z: 4656.26 },
  { name: "tochka10", x: 1355.49, y: 340.217, z: 3508.16 },
  { name: "tochka11", x: 1378.28, y: 239.173, z: 3539.91 },
  { name: "tochka12", x: 1287.78, y: 109.896, z: 3875.35 },
  { name: "tochka13", x: 1231.21, y: 112.902, z: 3837.82 },
  { name: "tochka14", x: 1414.17, y: 827.566, z: 4850.04 },
  { name: "tochka15", x: 1546.63, y: 677.264, z: 4527.03 },
  { name: "tochka16", x: 1480.4, y: 611.546, z: 4547.38 },
  { name: "tochka17", x: 1572.11, y: 574.02, z: 4375.17 },
  { name: "tochka18", x: 1669.34, y: 551.224, z: 4493.04 },
  { name: "tochka19", x: 1337.1, y: 130.642, z: 4006.18 }
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
