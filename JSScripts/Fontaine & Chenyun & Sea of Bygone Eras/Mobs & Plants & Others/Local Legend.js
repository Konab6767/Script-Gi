// Convertido de: Local Legend.lua
// Total de posições: 21

const positions = [
  { name: "tochka1", x: 3399.776123046875, y: 429.9032897949219, z: 5025.9052734375 },
  { name: "tochka2", x: 2618.192138671875, y: 340.6483459472656, z: 4506.47802734375 },
  { name: "tochka3", x: 3003.138916015625, y: 417.2540283203125, z: 4141.72119140625 },
  { name: "tochka4", x: 2514.55517578125, y: 377.80169677734375, z: 4689.86767578125 },
  { name: "tochka5", x: 3338.26904296875, y: 442.389404296875, z: 5139.58154296875 },
  { name: "tochka6", x: 3083.303466796875, y: 385.603515625, z: 4595.1416015625 },
  { name: "tochka7", x: 3947.757080078125, y: 425.4801025390625, z: 4438.48779296875 },
  { name: "tochka8", x: 4079.618896484375, y: 485.86163330078125, z: 4663.25048828125 },
  { name: "tochka9", x: 5038.8115234375, y: 465.1606750488281, z: 3792.375732421875 },
  { name: "tochka10", x: 4845.18359375, y: 373.65386962890625, z: 5057.03759765625 },
  { name: "tochka11", x: 4180.5712890625, y: 526.9568481445312, z: 4841.720703125 },
  { name: "tochka12", x: 3945.572021484375, y: 502.48028564453125, z: 3081.62060546875 },
  { name: "tochka13", x: 2655.557373046875, y: 253.03863525390625, z: 3643.34033203125 },
  { name: "tochka14", x: 2589.53466796875, y: 252.04376220703125, z: 3499.138671875 },
  { name: "tochka15", x: 2589.53466796875, y: 252.04376220703125, z: 3499.138671875 },
  { name: "tochka16", x: 3792.588623046875, y: 479.39459228515625, z: 2903.984375 },
  { name: "tochka17", x: 3822.889404296875, y: 384.2559509277344, z: 3434.172119140625 },
  { name: "tochka18", x: 3822.889404296875, y: 384.2559509277344, z: 3434.172119140625 },
  { name: "tochka19", x: 3945.572021484375, y: 502.48028564453125, z: 3081.62060546875 },
  { name: "tochka20", x: 1620.9761962890625, y: 388.3639221191406, z: 1999.3021240234375 },
  { name: "tochka21", x: 1449.347412109375, y: 223.33499145507812, z: 3542.5654296875 }
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
