// Convertido de: Hilichurl Rogue.lua
// Total de posições: 10

const positions = [
  { name: "tochka1", x: 3966.2236328125, y: 554.9251708984375, z: 3728.326171875 },
  { name: "tochka2", x: 4020.39013671875, y: 496.2085876464844, z: 3432.1533203125 },
  { name: "tochka3", x: 3830.05126953125, y: 574.6198120117188, z: 3392.883544921875 },
  { name: "tochka4", x: 3301.82763671875, y: 454.9596862792969, z: 3529.41455078125 },
  { name: "tochka5", x: 3264.333740234375, y: 453.76849365234375, z: 2844.06884765625 },
  { name: "tochka6", x: 2595.922119140625, y: 474.26910400390625, z: 3731.718017578125 },
  { name: "tochka7", x: 4454.15380859375, y: 560.8659057617188, z: 3580.696044921875 },
  { name: "tochka8", x: 4562.79443359375, y: 522.2537841796875, z: 3548.890869140625 },
  { name: "tochka9", x: 4622.61376953125, y: 556.0858154296875, z: 3708.923095703125 },
  { name: "tochka10", x: 4752.22119140625, y: 467.8015441894531, z: 3621.817626953125 }
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
