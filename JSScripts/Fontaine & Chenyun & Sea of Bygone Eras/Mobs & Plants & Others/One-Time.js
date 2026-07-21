// Convertido de: One-Time.lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 2624.86, y: 340.72, z: 2252.97 },
  { name: "tochka2", x: 1570.56, y: 230.89, z: 1680.94 },
  { name: "tochka3", x: 1585.22, y: 175.931, z: 1754.2 },
  { name: "tochka4", x: 2471.2, y: 345.771, z: 2420.44 },
  { name: "tochka5", x: 1658.12, y: 250.329, z: 1671.64 },
  { name: "tochka6", x: 1578.26, y: 234.118, z: 1487.22 }
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
