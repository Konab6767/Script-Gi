// Convertido de: A puzzle that involves planting grass seeds.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 399.60858154296875, y: 229.47653198242188, z: 6382.48828125 },
  { name: "tochka2", x: 508.9644775390625, y: 228.03582763671875, z: 6463.89501953125 },
  { name: "tochka3", x: 691.8896484375, y: 326.28369140625, z: 5615.76025390625 },
  { name: "tochka4", x: 612.2498168945312, y: 310.07293701171875, z: 5899.23876953125 },
  { name: "tochka5", x: 615.4133911132812, y: 311.5108947753906, z: 5771.75146484375 }
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
