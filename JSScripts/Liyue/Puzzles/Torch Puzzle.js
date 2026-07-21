// Convertido de: Torch Puzzle.lua
// Total de posições: 15

const positions = [
  { name: "tochka1", x: 306.87762451171875, y: 234.10302734375, z: 664.2169189453125 },
  { name: "tochka4", x: 304.9058837890625, y: 219.25990295410156, z: 182.5868377685547 },
  { name: "tochka5", x: 1177.489013671875, y: 202.3056640625, z: 529.45068359375 },
  { name: "tochka6", x: 1186.3466796875, y: 200.6497039794922, z: 263.2634582519531 },
  { name: "tochka7", x: 1478.635986328125, y: 230.37591552734375, z: 512.7979125976562 },
  { name: "tochka8", x: 1711.1236572265625, y: 287.0546875, z: 381.4719543457031 },
  { name: "tochka9", x: 1830.106201171875, y: 243.31568908691406, z: 460.0863952636719 },
  { name: "tochka10", x: 915.0076904296875, y: 203.10403442382812, z: 573.1776733398438 },
  { name: "tochka11", x: 898.2142333984375, y: 362.9559631347656, z: 1471.361572265625 },
  { name: "tochka12", x: 1009.7661743164062, y: 336.65606689453125, z: 1574.486083984375 },
  { name: "tochka13", x: 1552.5140380859375, y: 216.0181884765625, z: 240.5937042236328 },
  { name: "tochka14", x: 537.2615356445312, y: 243.3563232421875, z: 913.8464965820312 },
  { name: "tochka15", x: 147.984375, y: 243.6709442138672, z: 1017.8217163085938 },
  { name: "tochka20", x: 1517.185302734375, y: 238.69544982910156, z: 41.1712646484375 },
  { name: "tochka26", x: 59.777099609375, y: 209.9764404296875, z: 688.5134887695312 }
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
