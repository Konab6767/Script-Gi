// Convertido de: Challenge.lua
// Total de posições: 29

const positions = [
  { name: "tochka1", x: 1689.6435546875, y: 214.00259399414062, z: 155.8087158203125 },
  { name: "tochka7", x: 87.72988891601562, y: 237.1351776123047, z: 816.356201171875 },
  { name: "tochka8", x: 302.9012756347656, y: 218.7882843017578, z: 146.65524291992188 },
  { name: "tochka9", x: 1463.4913330078125, y: 229.1762237548828, z: 414.37799072265625 },
  { name: "tochka10", x: 1885.82666015625, y: 216.59576416015625, z: 651.0888061523438 },
  { name: "tochka11", x: 1738.5052490234375, y: 211.04214477539062, z: 592.7611083984375 },
  { name: "tochka12", x: 1316.5927734375, y: 200.22288513183594, z: 180.0628204345703 },
  { name: "tochka13", x: 1503.5494384765625, y: 208.105224609375, z: 1064.6798095703125 },
  { name: "tochka14", x: 777.6929931640625, y: 207.88392639160156, z: 1172.7882080078125 },
  { name: "tochka15", x: 732.88427734375, y: 319.9755554199219, z: 1572.87158203125 },
  { name: "tochka16", x: 880.327392578125, y: 324.25836181640625, z: 1515.484130859375 },
  { name: "tochka17", x: 883.695556640625, y: 366.982666015625, z: 1379.628173828125 },
  { name: "tochka18", x: 990.9707641601562, y: 330.285400390625, z: 1509.5784912109375 },
  { name: "tochka19", x: 1227.6488037109375, y: 363.5341491699219, z: 1552.92041015625 },
  { name: "tochka20", x: 1333.797119140625, y: 270.9288024902344, z: 1540.5823974609375 },
  { name: "tochka21", x: 1057.1051025390625, y: 231.7837677001953, z: 1643.9547119140625 },
  { name: "tochka22", x: 890.265380859375, y: 272.3683166503906, z: 1570.5162353515625 },
  { name: "tochka24", x: 674.896728515625, y: 232.1205596923828, z: 1622.8199462890625 },
  { name: "tochka25", x: 842.31103515625, y: 374.169921875, z: 1866.7474365234375 },
  { name: "tochka26", x: 667.2579956054688, y: 365.0347595214844, z: 1937.1278076171875 },
  { name: "tochka27", x: 360.1571350097656, y: 252.69149780273438, z: 1655.109619140625 },
  { name: "tochka28", x: 300.86785888671875, y: 200.8708038330078, z: 1529.580078125 },
  { name: "tochka29", x: 576.4441528320312, y: 232.98236083984375, z: 816.862548828125 },
  { name: "tochka30", x: 353.7120666503906, y: 198.6108856201172, z: 869.3240966796875 },
  { name: "tochka31", x: 51.451622009277344, y: 216.5227813720703, z: 1182.98486328125 },
  { name: "tochka34", x: 1223.85693359375, y: 200.41905212402344, z: 42.583152770996094 },
  { name: "tochka38", x: 155.04513549804688, y: 291.1666259765625, z: 1538.5562744140625 },
  { name: "tochka39", x: 218.03494262695312, y: 335.5718688964844, z: 1845.917236328125 },
  { name: "tochka41", x: 627.7169799804688, y: 200.53953552246094, z: 155.63121032714844 }
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
