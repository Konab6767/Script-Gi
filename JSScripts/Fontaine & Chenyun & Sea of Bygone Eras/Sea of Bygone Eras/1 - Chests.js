// Convertido de: 1 - Chests.lua
// Total de posições: 30

const positions = [
  { name: "tochka1", x: 1525.9681396484375, y: 569.64404296875, z: 4531.5498046875 },
  { name: "tochka2", x: 1395.7327880859375, y: 606.046875, z: 4708.90380859375 },
  { name: "tochka3", x: 1217.3375244140625, y: 609.775390625, z: 4690.27880859375 },
  { name: "tochka4", x: 1411.5859375, y: 610.7564697265625, z: 4370.0517578125 },
  { name: "tochka5", x: 1393.8397216796875, y: 660.290771484375, z: 4413.990234375 },
  { name: "tochka6", x: 1593.96826171875, y: 551.4924926757812, z: 4537.7978515625 },
  { name: "tochka7", x: 1585.4234619140625, y: 591.6851196289062, z: 4513.12548828125 },
  { name: "tochka8", x: 1565.614501953125, y: 560.7689208984375, z: 4285.2744140625 },
  { name: "tochka9", x: 1744.0516357421875, y: 516.9332275390625, z: 4577.62841796875 },
  { name: "tochka10", x: 1706.193359375, y: 559.5730590820312, z: 4641.14794921875 },
  { name: "tochka11", x: 1743.400390625, y: 570.2364501953125, z: 4568.44140625 },
  { name: "tochka12", x: 1714.142333984375, y: 571.05078125, z: 4670.4775390625 },
  { name: "tochka13", x: 1647.74853515625, y: 585.4861450195312, z: 4645.453125 },
  { name: "tochka14", x: 1549.33154296875, y: 676.8118896484375, z: 4670.06884765625 },
  { name: "tochka15", x: 1681.9459228515625, y: 614.99658203125, z: 4549.71923828125 },
  { name: "tochka16", x: 1649.6766357421875, y: 692.6641845703125, z: 4630.41357421875 },
  { name: "tochka17", x: 1430.000244140625, y: 139.93740844726562, z: 3965.60009765625 },
  { name: "tochka18", x: 1636.2796630859375, y: 147.0553741455078, z: 3986.0068359375 },
  { name: "tochka19", x: 1402.247314453125, y: 171.867431640625, z: 3798.3154296875 },
  { name: "tochka20", x: 1268.489013671875, y: 269.4296569824219, z: 3902.697021484375 },
  { name: "tochka21", x: 1283.6845703125, y: 124.3183822631836, z: 3953.769287109375 },
  { name: "tochka22", x: 1252.5443115234375, y: 147.6204833984375, z: 3916.40625 },
  { name: "tochka23", x: 1391.4324951171875, y: 159.26528930664062, z: 3668.999755859375 },
  { name: "tochka24", x: 1379.416259765625, y: 197.94149780273438, z: 3694.55810546875 },
  { name: "tochka25", x: 1454.989501953125, y: 223.334716796875, z: 3543.3603515625 },
  { name: "tochka26", x: 1463.01416015625, y: 220.4199981689453, z: 3502.180419921875 },
  { name: "tochka27", x: 1448.6361083984375, y: 215.70726013183594, z: 3873.99951171875 },
  { name: "tochka28", x: 1420.7001953125, y: 428.58209228515625, z: 3507.37158203125 },
  { name: "tochka29", x: 1491.26318359375, y: 341.5995178222656, z: 3479.21630859375 },
  { name: "tochka30", x: 1626.763916015625, y: 276.3490295410156, z: 3596.142578125 }
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
