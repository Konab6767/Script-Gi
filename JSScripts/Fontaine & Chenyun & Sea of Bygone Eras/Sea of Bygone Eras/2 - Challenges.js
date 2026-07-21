// Convertido de: 2 - Challenges.lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 1473.1768798828125, y: 608.0545043945312, z: 4540.07568359375 },
  { name: "tochka2", x: 1432.9403076171875, y: 665.6777954101562, z: 4537.94140625 },
  { name: "tochka3", x: 1498.11376953125, y: 655.9204711914062, z: 4602.28515625 },
  { name: "tochka4", x: 1338.3291015625, y: 604.4496459960938, z: 4715.197265625 },
  { name: "tochka5", x: 1520.44873046875, y: 666.4727783203125, z: 4431.23486328125 },
  { name: "tochka6", x: 1559.80859375, y: 560.3059692382812, z: 4481.748046875 }
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
