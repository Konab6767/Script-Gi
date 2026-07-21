// Convertido de: 12 - Challenge.lua
// Total de posições: 4

const positions = [
  { name: "tochka12", x: 96.38671112060547, y: 302.2162170410156, z: 2311.15625 },
  { name: "tochka37", x: 260.93817138671875, y: 362.9593505859375, z: 2071.4765625 },
  { name: "tochka40", x: 161.04869079589844, y: 197.0568389892578, z: 2790.17724609375 },
  { name: "tochka43", x: 533.389892578125, y: 98.3288803100586, z: 2494.750732421875 }
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
