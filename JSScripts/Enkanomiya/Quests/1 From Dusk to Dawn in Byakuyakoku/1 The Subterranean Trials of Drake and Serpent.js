// Convertido de: 1 The Subterranean Trials of Drake and Serpent.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 730.4075927734375, y: 210.75331115722656, z: 627.5778198242188 },
  { name: "tochka2", x: 746.6448364257812, y: 212.80023193359375, z: 601.0628662109375 },
  { name: "tochka3", x: 755.8565673828125, y: 211.96209716796875, z: 619.6276245117188 },
  { name: "tochka4", x: 615.5012817382812, y: 214.5445556640625, z: 632.9251098632812 },
  { name: "tochka5", x: 452.6607666015625, y: 197.5782012939453, z: 343.6783447265625 },
  { name: "tochka6", x: 259.85479736328125, y: 172.5121612548828, z: 92.29232025146484 },
  { name: "tochka8", x: 66.64667510986328, y: 240.24391174316406, z: 313.8682861328125 },
  { name: "tochka9", x: 271.6476745605469, y: 359.6101379394531, z: 211.55947875976562 }
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
