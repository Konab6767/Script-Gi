// Convertido de: Romaritime Flower.lua
// Total de posições: 9

const positions = [
  { name: "tochka1", x: 4522.80859375, y: 403.2386474609375, z: 4385.55615234375 },
  { name: "tochka2", x: 4537.291015625, y: 389.43603515625, z: 4293.6123046875 },
  { name: "tochka3", x: 4556.0830078125, y: 417.67388916015625, z: 4185.86474609375 },
  { name: "tochka4", x: 4544.55078125, y: 389.7579040527344, z: 4086.123046875 },
  { name: "tochka5", x: 4565.189453125, y: 393.40283203125, z: 4031.677734375 },
  { name: "tochka6", x: 4634.8212890625, y: 416.136474609375, z: 3989.958740234375 },
  { name: "tochka7", x: 4754.13134765625, y: 422.8930969238281, z: 3915.491943359375 },
  { name: "tochka8", x: 4888.1630859375, y: 441.0138854980469, z: 3561.1318359375 },
  { name: "tochka9", x: 4904.6162109375, y: 441.55059814453125, z: 3761.68212890625 }
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
