// Convertido de: Bloatty Floatty.lua
// Total de posições: 35

const positions = [
  { name: "tochka1", x: 1036.4639892578125, y: 351.0380859375, z: 1690.0179443359375 },
  { name: "tochka2", x: 1536.8255615234375, y: 260.68292236328125, z: 118.55488586425781 },
  { name: "tochka4", x: 37.61932373046875, y: 206.9409942626953, z: 534.798828125 },
  { name: "tochka6", x: 280.64093017578125, y: 219.50709533691406, z: 100.66626739501953 },
  { name: "tochka7", x: 565.6998291015625, y: 207.91941833496094, z: 455.70623779296875 },
  { name: "tochka8", x: 441.94403076171875, y: 215.05979919433594, z: 287.3004150390625 },
  { name: "tochka9", x: 1307.17138671875, y: 208.25119018554688, z: 336.9033203125 },
  { name: "tochka10", x: 1047.9605712890625, y: 210.5535430908203, z: 264.8407287597656 },
  { name: "tochka11", x: 1563.3546142578125, y: 225.1780242919922, z: 1202.0079345703125 },
  { name: "tochka12", x: 1457.913818359375, y: 244.17796325683594, z: 1279.4755859375 },
  { name: "tochka13", x: 1714.649169921875, y: 205.94761657714844, z: 77.74739074707031 },
  { name: "tochka14", x: 1290.7581787109375, y: 213.85960388183594, z: 1045.9873046875 },
  { name: "tochka15", x: 940.9555053710938, y: 249.51919555664062, z: 778.272705078125 },
  { name: "tochka16", x: 751.4242553710938, y: 230.05186462402344, z: 730.560791015625 },
  { name: "tochka17", x: 577.6390991210938, y: 183.04251098632812, z: 1188.0341796875 },
  { name: "tochka18", x: 805.6549072265625, y: 268.62823486328125, z: 1314.947509765625 },
  { name: "tochka19", x: 696.857421875, y: 374.82305908203125, z: 1462.0587158203125 },
  { name: "tochka20", x: 742.9371337890625, y: 327.9525451660156, z: 1558.677734375 },
  { name: "tochka21", x: 868.5089721679688, y: 428.04693603515625, z: 1442.02587890625 },
  { name: "tochka22", x: 910.833740234375, y: 373.6656494140625, z: 1452.3739013671875 },
  { name: "tochka23", x: 987.869384765625, y: 364.32220458984375, z: 1482.868408203125 },
  { name: "tochka25", x: 1108.85009765625, y: 350.3149719238281, z: 1541.8294677734375 },
  { name: "tochka26", x: 976.552734375, y: 306.0003356933594, z: 1274.450927734375 },
  { name: "tochka27", x: 921.065185546875, y: 277.501220703125, z: 1542.161376953125 },
  { name: "tochka28", x: 702.6644287109375, y: 246.9611358642578, z: 1634.330322265625 },
  { name: "tochka29", x: 744.52685546875, y: 391.0453186035156, z: 1876.724853515625 },
  { name: "tochka30", x: 843.3663330078125, y: 250.14076232910156, z: 1741.355224609375 },
  { name: "tochka31", x: 540.794189453125, y: 233.9966278076172, z: 1738.8040771484375 },
  { name: "tochka32", x: 293.98297119140625, y: 233.68572998046875, z: 969.5180053710938 },
  { name: "tochka33", x: 89.84378051757812, y: 226.41091918945312, z: 1136.3839111328125 },
  { name: "tochka34", x: 443.5350036621094, y: 207.91476440429688, z: 108.8197021484375 },
  { name: "tochka35", x: 156.7652130126953, y: 189.1014404296875, z: 1287.0345458984375 },
  { name: "tochka36", x: 119.87077331542969, y: 194.97206115722656, z: 1420.90380859375 },
  { name: "tochka37", x: 193.68739318847656, y: 227.703857421875, z: 1395.5194091796875 },
  { name: "tochka51", x: 8.836570739746094, y: 287.1778869628906, z: 1678.442138671875 }
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
