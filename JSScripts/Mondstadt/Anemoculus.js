// Convertido de: Anemoculus.lua
// Total de posições: 10

const positions = [
  { name: "tochka31", x: 2744.1, y: 220.0, z: 170.36 },
  { name: "tochka32", x: 2865.05, y: 223.94, z: 88.18 },
  { name: "tochka33", x: 2686.1, y: 236.79, z: 182.05 },
  { name: "tochka36", x: 2592.67, y: 253.27, z: 339.18 },
  { name: "tochka37", x: 2700.66, y: 215.3, z: 232.3 },
  { name: "tochka38", x: 2559.34, y: 188.24, z: 389.7 },
  { name: "tochka39", x: 2479.86, y: 227.27, z: 272.4 },
  { name: "tochka40", x: 2652.28, y: 329.02, z: 132.43 },
  { name: "tochka41", x: 2882.73, y: 246.92, z: 300.93 },
  { name: "tochka43", x: 2182.94, y: 273.21, z: 22.86 }
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
