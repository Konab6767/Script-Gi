// Convertido de: Myterious Ore.lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 4328.4033203125, y: 354.18890380859375, z: 5051.2294921875 },
  { name: "tochka3", x: 4728.04638671875, y: 634.2840576171875, z: 3871.20166015625 },
  { name: "tochka4", x: 4629.6650390625, y: 545.3558959960938, z: 3628.779541015625 },
  { name: "tochka5", x: 4461.12841796875, y: 391.3263854980469, z: 3971.018798828125 },
  { name: "tochka6", x: 4371.7490234375, y: 514.5162353515625, z: 4125.29833984375 },
  { name: "tochka7", x: 4942.1845703125, y: 372.5251770019531, z: 4426.97998046875 }
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
