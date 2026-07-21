// Convertido de: Mora Chest.lua
// Total de posições: 30

const positions = [
  { name: "tochka1", x: 852.7449340820312, y: 216.8025360107422, z: 164.5674285888672 },
  { name: "tochka2", x: 349.9977111816406, y: 121.40997314453125, z: 870.58642578125 },
  { name: "tochka3", x: 521.0776977539062, y: 174.76527404785156, z: 645.7139892578125 },
  { name: "tochka5", x: 1268.0849609375, y: 181.82566833496094, z: 853.7720336914062 },
  { name: "tochka6", x: 1313.0006103515625, y: 187.55056762695312, z: 818.2838134765625 },
  { name: "tochka7", x: 1310.72900390625, y: 181.5558624267578, z: 825.1973266601562 },
  { name: "tochka8", x: 1329.52490234375, y: 217.56405639648438, z: 795.5360107421875 },
  { name: "tochka9", x: 851.3821411132812, y: 229.16380310058594, z: 141.17459106445312 },
  { name: "tochka10", x: 879.6469116210938, y: 226.8139190673828, z: 184.3142852783203 },
  { name: "tochka11", x: 887.3324584960938, y: 217.92324829101562, z: 124.70024108886719 },
  { name: "tochka12", x: 877.5568237304688, y: 217.95359802246094, z: 25.948270797729492 },
  { name: "tochka13", x: 309.2047119140625, y: 122.27970123291016, z: 887.72998046875 },
  { name: "tochka17", x: 232.16693115234375, y: 326.544189453125, z: 290.98504638671875 },
  { name: "tochka24", x: 293.2911376953125, y: 155.52642822265625, z: 858.2993774414062 },
  { name: "tochka28", x: 167.56155395507812, y: 269.4617614746094, z: 370.2884826660156 },
  { name: "tochka29", x: 164.09371948242188, y: 269.7513732910156, z: 364.8590087890625 },
  { name: "tochka30", x: 236.57723999023438, y: 326.5663146972656, z: 209.76797485351562 },
  { name: "tochka35", x: 445.5767822265625, y: 137.10260009765625, z: 1005.1600952148438 },
  { name: "tochka43", x: 779.9638671875, y: 216.5219268798828, z: 589.208740234375 },
  { name: "tochka44", x: 653.3851928710938, y: 265.42401123046875, z: 572.3903198242188 },
  { name: "tochka45", x: 466.8802185058594, y: 168.90538024902344, z: 885.2850952148438 },
  { name: "tochka46", x: 599.3926391601562, y: 236.00582885742188, z: 510.0363464355469 },
  { name: "tochka47", x: 549.4596557617188, y: 192.6967010498047, z: 544.5850219726562 },
  { name: "tochka48", x: 592.771484375, y: 220.65780639648438, z: 642.4848022460938 },
  { name: "tochka49", x: 658.6273803710938, y: 243.9672393798828, z: 713.0899658203125 },
  { name: "tochka50", x: 649.0053100585938, y: 172.4832763671875, z: 778.4267578125 },
  { name: "tochka53", x: 467.9679870605469, y: 195.99462890625, z: 815.1831665039062 },
  { name: "tochka54", x: 535.5272216796875, y: 217.14212036132812, z: 810.1124877929688 },
  { name: "tochka55", x: 491.9701843261719, y: 188.3214874267578, z: 726.3977661132812 },
  { name: "tochka56", x: 566.1480102539062, y: 197.69607543945312, z: 639.22607421875 }
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
