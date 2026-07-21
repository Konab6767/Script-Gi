// Convertido de: 10 - Shrine of Depths.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 4628.2197265625, y: 412.74456787109375, z: 4017.20849609375 },
  { name: "tochka2", x: 4975.98828125, y: 629.6693725585938, z: 4179.12646484375 },
  { name: "tochka3", x: 4183.73486328125, y: 603.903076171875, z: 3234.47509765625 },
  { name: "tochka4", x: 3617.708984375, y: 521.2421264648438, z: 3133.873779296875 }
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
