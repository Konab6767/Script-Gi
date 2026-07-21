// Convertido de: In one game, each NPC can only be completed once.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 510.5309753417969, y: 299.732177734375, z: 6271.6728515625 },
  { name: "tochka2", x: 622.20556640625, y: 407.391357421875, z: 6584.89599609375 },
  { name: "tochka3", x: 322.8762512207031, y: 266.9326477050781, z: 6687.98876953125 },
  { name: "tochka4", x: 338.60833740234375, y: 269.89794921875, z: 6438.23095703125 }
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
