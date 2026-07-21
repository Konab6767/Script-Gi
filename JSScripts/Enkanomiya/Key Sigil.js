// Convertido de: Key Sigil.lua
// Total de posições: 29

const positions = [
  { name: "tochka1", x: 279.65008544921875, y: 175.89645385742188, z: 854.5281982421875 },
  { name: "tochka2", x: 520.052490234375, y: 189.8011932373047, z: 632.6083984375 },
  { name: "tochka3", x: 507.9792175292969, y: 206.40243530273438, z: 548.00537109375 },
  { name: "tochka4", x: 561.7550659179688, y: 252.7480926513672, z: 482.2591857910156 },
  { name: "tochka5", x: 629.7647094726562, y: 207.9341278076172, z: 488.9942626953125 },
  { name: "tochka6", x: 717.2400512695312, y: 259.70379638671875, z: 522.5020751953125 },
  { name: "tochka7", x: 437.82861328125, y: 324.65740966796875, z: 294.9206237792969 },
  { name: "tochka8", x: 181.23379516601562, y: 150.8956298828125, z: 78.65874481201172 },
  { name: "tochka9", x: 255.77879333496094, y: 370.2609558105469, z: 89.3426284790039 },
  { name: "tochka10", x: 192.57205200195312, y: 345.5788269042969, z: 175.70310974121094 },
  { name: "tochka11", x: 210.2352752685547, y: 342.6550598144531, z: 256.3695983886719 },
  { name: "tochka12", x: 476.99444580078125, y: 155.7145233154297, z: 939.4697265625 },
  { name: "tochka13", x: 166.78607177734375, y: 356.63043212890625, z: 286.6560363769531 },
  { name: "tochka14", x: 335.41644287109375, y: 332.7683410644531, z: 300.74481201171875 },
  { name: "tochka15", x: 337.18524169921875, y: 342.9962463378906, z: 242.63963317871094 },
  { name: "tochka16", x: 164.50930786132812, y: 271.6435241699219, z: 365.383544921875 },
  { name: "tochka17", x: 242.20822143554688, y: 275.37933349609375, z: 433.7233581542969 },
  { name: "tochka23", x: 359.7552185058594, y: 121.36306762695312, z: 955.6588745117188 },
  { name: "tochka31", x: 893.3577880859375, y: 218.4412841796875, z: 130.01991271972656 },
  { name: "tochka32", x: 901.1202392578125, y: 223.11636352539062, z: 40.454959869384766 },
  { name: "tochka34", x: 508.58563232421875, y: 176.0494384765625, z: 873.7144775390625 },
  { name: "tochka45", x: 603.9828491210938, y: 216.3822021484375, z: 648.0855712890625 },
  { name: "tochka49", x: 1310.171875, y: 205.51171875, z: 816.491455078125 },
  { name: "tochka50", x: 1346.0833740234375, y: 190.271728515625, z: 791.034423828125 },
  { name: "tochka55", x: 604.0091552734375, y: 1942.764892578125, z: 648.3341674804688 },
  { name: "tochka56", x: 628.52001953125, y: 243.7506561279297, z: 689.8375854492188 },
  { name: "tochka57", x: 680.3292236328125, y: 278.0026550292969, z: 661.7898559570312 },
  { name: "tochka58", x: 681.5762939453125, y: 187.55868530273438, z: 634.8492431640625 },
  { name: "tochka59", x: 670.8887939453125, y: 254.7667694091797, z: 627.5155029296875 }
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
