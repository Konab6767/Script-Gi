// Convertido de: Chests with Puzzles.lua
// Total de posições: 37

const positions = [
  { name: "tochka1", x: 827.1303100585938, y: 969.18994140625, z: 752.41845703125 },
  { name: "tochka2", x: 656.1250610351562, y: 381.5048522949219, z: 733.3212280273438 },
  { name: "tochka3", x: 614.7532348632812, y: 377.6830139160156, z: 745.0039672851562 },
  { name: "tochka4", x: 461.5056457519531, y: 180.92967224121094, z: 746.8936157226562 },
  { name: "tochka5", x: 80.88446044921875, y: 314.2008361816406, z: 360.1080017089844 },
  { name: "tochka6", x: 137.5298309326172, y: 240.4095458984375, z: 402.3375549316406 },
  { name: "tochka7", x: 176.8701171875, y: 320.1393737792969, z: 307.1700439453125 },
  { name: "tochka8", x: 230.23182678222656, y: 230.9133758544922, z: 351.89776611328125 },
  { name: "tochka9", x: 255.1790771484375, y: 305.3354187011719, z: 391.88983154296875 },
  { name: "tochka10", x: 335.0787353515625, y: 402.06756591796875, z: 565.38427734375 },
  { name: "tochka11", x: 342.1003723144531, y: 411.53192138671875, z: 490.6188659667969 },
  { name: "tochka12", x: 455.3075256347656, y: 391.901611328125, z: 465.3029479980469 },
  { name: "tochka13", x: 519.6060180664062, y: 386.28765869140625, z: 530.7713012695312 },
  { name: "tochka14", x: 578.5346069335938, y: 392.8647766113281, z: 576.2610473632812 },
  { name: "tochka15", x: 471.8538513183594, y: 388.438232421875, z: 574.5524291992188 },
  { name: "tochka16", x: 413.9831848144531, y: 410.8437805175781, z: 588.5344848632812 },
  { name: "tochka17", x: 917.3548583984375, y: 904.8053588867188, z: 552.539794921875 },
  { name: "tochka18", x: 1066.1038818359375, y: 854.1454467773438, z: 573.2578125 },
  { name: "tochka19", x: 1011.3743896484375, y: 762.5723876953125, z: 460.3833923339844 },
  { name: "tochka20", x: 992.6614990234375, y: 771.6103515625, z: 365.7693786621094 },
  { name: "tochka21", x: 853.9434814453125, y: 724.1771240234375, z: 153.95533752441406 },
  { name: "tochka22", x: 907.5823974609375, y: 722.6864013671875, z: 156.72354125976562 },
  { name: "tochka23", x: 902.5426025390625, y: 718.064697265625, z: 179.1468048095703 },
  { name: "tochka24", x: 828.0087280273438, y: 722.4974975585938, z: 314.0580139160156 },
  { name: "tochka25", x: 749.78076171875, y: 768.4637451171875, z: 362.88189697265625 },
  { name: "tochka26", x: 759.2222290039062, y: 760.522216796875, z: 261.3271789550781 },
  { name: "tochka27", x: 711.917724609375, y: 775.2835083007812, z: 118.26530456542969 },
  { name: "tochka28", x: 699.7258911132812, y: 710.1024169921875, z: 393.1942443847656 },
  { name: "tochka29", x: 694.2351684570312, y: 767.0010986328125, z: 355.24774169921875 },
  { name: "tochka30", x: 820.3834228515625, y: 707.60546875, z: 489.1236877441406 },
  { name: "tochka31", x: 866.4885864257812, y: 742.8980102539062, z: 458.3927917480469 },
  { name: "tochka32", x: 927.2904663085938, y: 847.7069702148438, z: 609.7063598632812 },
  { name: "tochka33", x: 850.2681274414062, y: 800.4003295898438, z: 646.3648071289062 },
  { name: "tochka34", x: 770.5126953125, y: 800.8675537109375, z: 603.7014770507812 },
  { name: "tochka35", x: 750.793212890625, y: 791.0780029296875, z: 667.9712524414062 },
  { name: "tochka36", x: 815.3480224609375, y: 791.8348388671875, z: 605.66552734375 },
  { name: "tochka37", x: 756.4093017578125, y: 407.92431640625, z: 713.7218017578125 }
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
