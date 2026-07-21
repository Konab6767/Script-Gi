// Convertido de: Elemental Monument.lua
// Total de posições: 23

const positions = [
  { name: "tochka2", x: 896.7862548828125, y: 201.41616821289062, z: 373.3174133300781 },
  { name: "tochka3", x: 1335.584228515625, y: 202.2495880126953, z: 286.90234375 },
  { name: "tochka4", x: 1171.111328125, y: 201.4130859375, z: 377.929443359375 },
  { name: "tochka5", x: 1104.501708984375, y: 200.69580078125, z: 458.7013854980469 },
  { name: "tochka6", x: 1804.969482421875, y: 212.09727478027344, z: 584.8790283203125 },
  { name: "tochka7", x: 1123.754150390625, y: 209.4432830810547, z: 960.5340576171875 },
  { name: "tochka8", x: 684.6206665039062, y: 207.51805114746094, z: 888.9873046875 },
  { name: "tochka9", x: 952.3292236328125, y: 212.31243896484375, z: 672.2989501953125 },
  { name: "tochka10", x: 723.9073486328125, y: 193.35475158691406, z: 1080.197021484375 },
  { name: "tochka11", x: 770.9518432617188, y: 227.97059631347656, z: 1306.2381591796875 },
  { name: "tochka13", x: 812.495361328125, y: 265.8612976074219, z: 1338.2694091796875 },
  { name: "tochka14", x: 1009.0294799804688, y: 302.8329772949219, z: 1324.865234375 },
  { name: "tochka15", x: 850.8013916015625, y: 245.1342010498047, z: 1661.6640625 },
  { name: "tochka16", x: 697.50341796875, y: 410.70208740234375, z: 1891.5576171875 },
  { name: "tochka17", x: 309.0670471191406, y: 189.2410430908203, z: 1456.677734375 },
  { name: "tochka18", x: 527.3872680664062, y: 351.06610107421875, z: 1334.5474853515625 },
  { name: "tochka19", x: 537.9095458984375, y: 306.9559326171875, z: 1274.6495361328125 },
  { name: "tochka20", x: 351.7941589355469, y: 184.23748779296875, z: 832.8180541992188 },
  { name: "tochka21", x: 298.6552429199219, y: 214.4741973876953, z: 607.8807373046875 },
  { name: "tochka37", x: 127.57461547851562, y: 220.25584411621094, z: 856.54248046875 },
  { name: "tochka38", x: 16.687000274658203, y: 264.71868896484375, z: 263.625 },
  { name: "tochka39", x: 76.44537353515625, y: 257.0175476074219, z: 97.29835510253906 },
  { name: "tochka40", x: 44.95918273925781, y: 272.18524169921875, z: 68.46980285644531 }
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
