// Convertido de: Seelie.lua
// Total de posições: 7

const positions = [
  { name: "tochka16", x: 2790.443, y: 206.839, z: 38.694 },
  { name: "tochka17", x: 2849.591, y: 209.28, z: 207.389 },
  { name: "tochka18", x: 2829.977, y: 207.888, z: 326.003 },
  { name: "tochka19", x: 2677.242, y: 206.942, z: 319.333 },
  { name: "tochka20", x: 2472.168, y: 209.741, z: 314.324 },
  { name: "tochka21", x: 2682.089, y: 238.42, z: 47.087 },
  { name: "tochka24", x: 2520.289, y: 210.676, z: 329.195 }
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
