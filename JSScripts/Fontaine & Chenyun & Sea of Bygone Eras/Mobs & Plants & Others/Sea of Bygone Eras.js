// Convertido de: Sea of Bygone Eras.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 1395.389892578125, y: 605.4520263671875, z: 4714.6337890625 },
  { name: "tochka2", x: 1715.5439453125, y: 570.5543823242188, z: 4670.03662109375 },
  { name: "tochka3", x: 1723.210693359375, y: 555.2383422851562, z: 4628.20947265625 },
  { name: "tochka4", x: 1717.81591796875, y: 562.17431640625, z: 4546.90625 },
  { name: "tochka5", x: 1274.315185546875, y: 123.6661605834961, z: 3966.00537109375 }
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
