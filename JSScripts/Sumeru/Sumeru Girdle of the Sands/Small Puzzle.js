// Convertido de: Small Puzzle.lua
// Total de posições: 18

const positions = [
  { name: "tochka1", x: 843.25537109375, y: 398.0465087890625, z: 5412.70068359375 },
  { name: "tochka2", x: 469.8598937988281, y: 351.2498474121094, z: 6041.869140625 },
  { name: "tochka3", x: 367.52734375, y: 312.55120849609375, z: 5627.33544921875 },
  { name: "tochka4", x: 465.1778259277344, y: 351.949951171875, z: 5506.1767578125 },
  { name: "tochka5", x: 730.0693359375, y: 311.7378845214844, z: 5509.57080078125 },
  { name: "tochka6", x: 801.1919555664062, y: 319.13360595703125, z: 5668.9716796875 },
  { name: "tochka7", x: 767.939697265625, y: 319.9302062988281, z: 5791.07275390625 },
  { name: "tochka8", x: 363.6316223144531, y: 310.36907958984375, z: 5749.84130859375 },
  { name: "tochka9", x: 559.5293579101562, y: 252.66879272460938, z: 5759.6748046875 },
  { name: "tochka10", x: 301.03228759765625, y: 284.4842224121094, z: 6766.93701171875 },
  { name: "tochka11", x: 585.6438598632812, y: 318.9507141113281, z: 6816.91455078125 },
  { name: "tochka12", x: 699.808349609375, y: 296.0086364746094, z: 6658.41650390625 },
  { name: "tochka13", x: 907.5839233398438, y: 201.58592224121094, z: 6636.8427734375 },
  { name: "tochka14", x: 1100.1900634765625, y: 202.46615600585938, z: 6541.873046875 },
  { name: "tochka15", x: 828.1798706054688, y: 315.1211242675781, z: 6122.5927734375 },
  { name: "tochka16", x: 899.9744262695312, y: 374.3188171386719, z: 5970.0947265625 },
  { name: "tochka17", x: 489.84490966796875, y: 343.30975341796875, z: 5971.14306640625 },
  { name: "tochka18", x: 1057.203125, y: 201.09877014160156, z: 6633.115234375 }
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
