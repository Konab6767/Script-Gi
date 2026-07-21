// Convertido de: 5 The Subterranean Trials of Drake and Serpent.lua
// Total de posições: 2

const positions = [
  { name: "tochka2", x: 270.0827331542969, y: 349.648681640625, z: 207.14569091796875 },
  { name: "tochka3", x: 269.0429382324219, y: 349.4735107421875, z: 213.11012268066406 }
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
