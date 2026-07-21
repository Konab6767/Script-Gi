// Convertido de: Seelie.lua
// Total de posições: 18

const positions = [
  { name: "tochka2", x: 633.6456909179688, y: 181.16632080078125, z: 6816.85546875 },
  { name: "tochka3", x: 54.38515090942383, y: 221.1931915283203, z: 6303.21142578125 },
  { name: "tochka4", x: 400.681640625, y: 232.01243591308594, z: 6375.1123046875 },
  { name: "tochka5", x: 460.291015625, y: 226.4115447998047, z: 6410.81591796875 },
  { name: "tochka6", x: 451.97540283203125, y: 234.77255249023438, z: 6516.380859375 },
  { name: "tochka7", x: 332.6211242675781, y: 135.19139099121094, z: 6265.12841796875 },
  { name: "tochka8", x: 553.6685791015625, y: 123.30551147460938, z: 6273.6640625 },
  { name: "tochka9", x: 886.4474487304688, y: 101.21824645996094, z: 6513.87841796875 },
  { name: "tochka10", x: 894.0707397460938, y: 100.29510498046875, z: 6478.5595703125 },
  { name: "tochka11", x: 851.6873168945312, y: 223.12908935546875, z: 5733.8515625 },
  { name: "tochka12", x: 319.2978515625, y: 206.6171112060547, z: 6177.09619140625 },
  { name: "tochka13", x: 76.31222534179688, y: 230.28382873535156, z: 6094.13232421875 },
  { name: "tochka14", x: 605.1654052734375, y: 320.15478515625, z: 6439.3505859375 },
  { name: "tochka15", x: 479.49786376953125, y: 234.59902954101562, z: 6631.5927734375 },
  { name: "tochka16", x: 660.713623046875, y: 194.45193481445312, z: 6584.2470703125 },
  { name: "tochka17", x: 242.34042358398438, y: 272.0867614746094, z: 6774.9697265625 },
  { name: "tochka18", x: 388.07489013671875, y: 350.3543701171875, z: 6871.46240234375 },
  { name: "tochka19", x: 474.8961181640625, y: 341.9223937988281, z: 6846.8955078125 }
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
