// Convertido de: 7 - Seelie.lua
// Total de posições: 7

const positions = [
  { name: "tochka1", x: 1759.07, y: 578.052, z: 4607.68 },
  { name: "tochka2", x: 1722.53, y: 555.187, z: 4624.23 },
  { name: "tochka3", x: 1707.89, y: 568.28, z: 4565.59 },
  { name: "tochka4", x: 1430.69, y: 238.502, z: 3881.15 },
  { name: "tochka5", x: 1493.88, y: 388.228, z: 3554.04 },
  { name: "tochka6", x: 1415.11, y: 343.339, z: 3637.09 },
  { name: "tochka7", x: 1387.62, y: 215.093, z: 3617.29 }
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
