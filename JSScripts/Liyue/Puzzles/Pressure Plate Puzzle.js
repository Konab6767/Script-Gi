// Convertido de: Pressure Plate Puzzle.lua
// Total de posições: 27

const positions = [
  { name: "tochka1", x: 1377.915283203125, y: 200.6063690185547, z: 199.81715393066406 },
  { name: "tochka3", x: 198.5911102294922, y: 236.21212768554688, z: 226.52670288085938 },
  { name: "tochka4", x: 271.0316162109375, y: 207.45974731445312, z: 75.98094177246094 },
  { name: "tochka5", x: 523.7147827148438, y: 201.30931091308594, z: 486.6658630371094 },
  { name: "tochka6", x: 330.2469787597656, y: 212.24728393554688, z: 418.61627197265625 },
  { name: "tochka7", x: 1035.9248046875, y: 207.85690307617188, z: 383.9266357421875 },
  { name: "tochka8", x: 1105.25341796875, y: 200.5681915283203, z: 458.8638916015625 },
  { name: "tochka9", x: 988.0626220703125, y: 201.65713500976562, z: 232.7327880859375 },
  { name: "tochka10", x: 245.79608154296875, y: 244.20079040527344, z: 1081.478271484375 },
  { name: "tochka11", x: 1405.6978759765625, y: 212.7339630126953, z: 465.98736572265625 },
  { name: "tochka13", x: 1496.694580078125, y: 204.33848571777344, z: 317.06951904296875 },
  { name: "tochka15", x: 1851.6961669921875, y: 205.5448455810547, z: 721.3651733398438 },
  { name: "tochka16", x: 1567.6348876953125, y: 201.12867736816406, z: 1097.2681884765625 },
  { name: "tochka17", x: 1605.309326171875, y: 201.935791015625, z: 1144.087646484375 },
  { name: "tochka18", x: 1063.140869140625, y: 206.45249938964844, z: 728.8925170898438 },
  { name: "tochka19", x: 760.0449829101562, y: 220.00633239746094, z: 858.66455078125 },
  { name: "tochka20", x: 687.2733154296875, y: 214.28768920898438, z: 1318.9942626953125 },
  { name: "tochka21", x: 781.8939819335938, y: 333.63104248046875, z: 1641.3580322265625 },
  { name: "tochka22", x: 951.9050903320312, y: 344.82354736328125, z: 1420.27978515625 },
  { name: "tochka23", x: 1136.8062744140625, y: 353.34490966796875, z: 1526.26953125 },
  { name: "tochka24", x: 996.184814453125, y: 268.21527099609375, z: 1539.1865234375 },
  { name: "tochka25", x: 978.47998046875, y: 210.4886016845703, z: 27.210037231445312 },
  { name: "tochka26", x: 550.8038940429688, y: 245.24765014648438, z: 869.5153198242188 },
  { name: "tochka27", x: 470.654541015625, y: 223.36672973632812, z: 786.6256713867188 },
  { name: "tochka28", x: 6.9428558349609375, y: 217.5294647216797, z: 1320.8775634765625 },
  { name: "tochka35", x: 153.31106567382812, y: 204.0050811767578, z: 759.9674682617188 },
  { name: "tochka36", x: 104.3897476196289, y: 245.73118591308594, z: 338.19915771484375 }
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
