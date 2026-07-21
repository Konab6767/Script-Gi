// Convertido de: Three consecutive chests.lua
// Total de posições: 3

const positions = [
  { name: "tochka2", x: 934.7264404296875, y: 209.36460876464844, z: 310.25018310546875 },
  { name: "tochka3", x: 1942.072509765625, y: 243.45962524414062, z: 613.2649536132812 },
  { name: "tochka4", x: 1443.7486572265625, y: 244.8460235595703, z: 1287.7640380859375 }
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
