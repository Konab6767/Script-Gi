// Convertido de: Inside Shell (Hit).lua
// Total de posições: 7

const positions = [
  { name: "tochka1", x: 2430.654052734375, y: 410.9090881347656, z: 3725.661865234375 },
  { name: "tochka2", x: 2630.117919921875, y: 254.07054138183594, z: 3573.3193359375 },
  { name: "tochka3", x: 2611.03564453125, y: 256.02069091796875, z: 3563.685302734375 },
  { name: "tochka4", x: 2587.607421875, y: 231.50132751464844, z: 3610.295654296875 },
  { name: "tochka5", x: 2691.95751953125, y: 229.3896942138672, z: 3693.206298828125 },
  { name: "tochka6", x: 2759.316650390625, y: 238.71131896972656, z: 3682.537841796875 },
  { name: "tochka7", x: 2685.0830078125, y: 229.65379333496094, z: 3583.982177734375 }
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
