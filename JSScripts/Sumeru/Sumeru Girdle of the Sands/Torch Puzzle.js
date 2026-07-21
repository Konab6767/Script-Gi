// Convertido de: Torch Puzzle.lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 115.62863159179688, y: 222.50216674804688, z: 6099.48779296875 },
  { name: "tochka2", x: 746.7915649414062, y: 311.6720275878906, z: 5736.6328125 },
  { name: "tochka3", x: 424.6903381347656, y: 236.92196655273438, z: 6356.82763671875 },
  { name: "tochka4", x: 283.03692626953125, y: 269.62872314453125, z: 6725.98291015625 },
  { name: "tochka5", x: 679.1170654296875, y: 283.7396545410156, z: 6141.01708984375 },
  { name: "tochka6", x: 1019.9874877929688, y: 314.7738037109375, z: 6426.73974609375 }
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
