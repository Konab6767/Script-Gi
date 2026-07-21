// Convertido de: A world quest that players can obtain from Jean.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 949.1536254882812, y: 185.57521057128906, z: 6045.52001953125 },
  { name: "tochka2", x: 933.2686157226562, y: 206.66871643066406, z: 6166.63427734375 },
  { name: "tochka3", x: 1004.8768310546875, y: 207.03746032714844, z: 6331.2080078125 }
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
