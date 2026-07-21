// Convertido de: Buried Chests.lua
// Total de posições: 25

const positions = [
  { name: "tochka1", x: 1704.7943115234375, y: 231.74827575683594, z: 6.748748779296875 },
  { name: "tochka2", x: 1516.7327880859375, y: 223.30006408691406, z: 587.083984375 },
  { name: "tochka3", x: 1481.1463623046875, y: 221.31210327148438, z: 579.9963989257812 },
  { name: "tochka4", x: 1560.5445556640625, y: 231.26214599609375, z: 726.5555419921875 },
  { name: "tochka5", x: 1822.9552001953125, y: 206.6175079345703, z: 792.2350463867188 },
  { name: "tochka6", x: 1813.1358642578125, y: 206.95030212402344, z: 858.36865234375 },
  { name: "tochka7", x: 1773.1680908203125, y: 211.65611267089844, z: 610.3147583007812 },
  { name: "tochka8", x: 1207.265380859375, y: 250.70632934570312, z: 1192.165283203125 },
  { name: "tochka9", x: 1274.947265625, y: 269.26654052734375, z: 1353.3282470703125 },
  { name: "tochka10", x: 1173.954833984375, y: 267.58782958984375, z: 1363.0126953125 },
  { name: "tochka11", x: 1173.2611083984375, y: 261.7744445800781, z: 1276.133544921875 },
  { name: "tochka12", x: 1649.408935546875, y: 249.61476135253906, z: 45.80455017089844 },
  { name: "tochka13", x: 1222.18505859375, y: 263.7630310058594, z: 1322.030517578125 },
  { name: "tochka14", x: 1251.6015625, y: 267.72137451171875, z: 1276.3267822265625 },
  { name: "tochka15", x: 684.8646850585938, y: 164.94622802734375, z: 1104.600830078125 },
  { name: "tochka16", x: 751.7689819335938, y: 227.55410766601562, z: 1313.62158203125 },
  { name: "tochka17", x: 774.7780151367188, y: 240.1502685546875, z: 1276.46484375 },
  { name: "tochka18", x: 755.1795654296875, y: 325.213623046875, z: 1463.59521484375 },
  { name: "tochka19", x: 920.6080322265625, y: 354.6860046386719, z: 1535.6943359375 },
  { name: "tochka20", x: 372.2513732910156, y: 237.41392517089844, z: 1741.15087890625 },
  { name: "tochka21", x: 41.26995849609375, y: 233.66188049316406, z: 1101.5687255859375 },
  { name: "tochka22", x: 1558.054931640625, y: 214.8255615234375, z: 173.7919158935547 },
  { name: "tochka26", x: 1206.845947265625, y: 201.24574279785156, z: 500.59893798828125 },
  { name: "tochka27", x: 1117.9534912109375, y: 200.91934204101562, z: 238.0643310546875 },
  { name: "tochka28", x: 1488.6864013671875, y: 223.01280212402344, z: 547.5308837890625 }
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
