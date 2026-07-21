// Convertido de: Challenge.lua
// Total de posições: 18

const positions = [
  { name: "tochka2", x: 384.4436340332031, y: 228.76707458496094, z: 6447.0390625 },
  { name: "tochka3", x: 483.529296875, y: 129.557861328125, z: 6505.849609375 },
  { name: "tochka4", x: 549.2742309570312, y: 76.41310119628906, z: 6292.15087890625 },
  { name: "tochka5", x: 1054.4627685546875, y: 122.92085266113281, z: 6497.2822265625 },
  { name: "tochka6", x: 727.653076171875, y: 329.3015441894531, z: 6542.8662109375 },
  { name: "tochka7", x: 1104.599365234375, y: 200.89295959472656, z: 6409.9287109375 },
  { name: "tochka8", x: 676.401123046875, y: 241.17332458496094, z: 5993.72998046875 },
  { name: "tochka9", x: 458.3329162597656, y: 365.126220703125, z: 5884.3203125 },
  { name: "tochka10", x: 341.2148132324219, y: 384.6287536621094, z: 5899.138671875 },
  { name: "tochka11", x: 593.91162109375, y: 334.1483459472656, z: 5517.984375 },
  { name: "tochka13", x: 597.5203857421875, y: 313.1995849609375, z: 5917.9638671875 },
  { name: "tochka14", x: 831.4537963867188, y: 324.6548156738281, z: 5524.3125 },
  { name: "tochka16", x: 386.51611328125, y: 220.07151794433594, z: 6107.50048828125 },
  { name: "tochka17", x: 221.37158203125, y: 249.26815795898438, z: 6116.376953125 },
  { name: "tochka18", x: 551.9475708007812, y: 287.06109619140625, z: 6653.6748046875 },
  { name: "tochka19", x: 669.5663452148438, y: 342.96484375, z: 6623.1416015625 },
  { name: "tochka20", x: 738.66259765625, y: 378.0672302246094, z: 6463.58203125 },
  { name: "tochka21", x: 717.74853515625, y: 312.0812072753906, z: 6785.078125 }
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
