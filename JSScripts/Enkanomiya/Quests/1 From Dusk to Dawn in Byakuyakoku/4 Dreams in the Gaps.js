// Convertido de: 4 Dreams in the Gaps.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 507.244384765625, y: 173.29774475097656, z: 655.126953125 },
  { name: "tochka2", x: 525.9993286132812, y: 184.0482940673828, z: 633.4486694335938 },
  { name: "tochka3", x: 515.251220703125, y: 184.6810760498047, z: 638.7848510742188 },
  { name: "tochka4", x: 520.093505859375, y: 184.3139190673828, z: 645.9864501953125 }
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
