// Convertido de: 3 - Puzzles.lua
// Total de posições: 41

const positions = [
  { name: "tochka1", x: 1222.34, y: 279.54, z: 4212.41 },
  { name: "tochka2", x: 1312.81, y: 108.195, z: 3853.73 },
  { name: "tochka3", x: 1308.88, y: 618.802, z: 4573.87 },
  { name: "tochka4", x: 1655.84, y: 597.365, z: 4641.37 },
  { name: "tochka5", x: 1564.68, y: 572.776, z: 4337.37 },
  { name: "tochka6", x: 1272.83, y: 151.033, z: 3926.98 },
  { name: "tochka7", x: 1642.05, y: 183.005, z: 3954.3 },
  { name: "tochka8", x: 1433.4365234375, y: 628.553466796875, z: 4589.40087890625 },
  { name: "tochka9", x: 1493.2137451171875, y: 596.9674682617188, z: 4628.5 },
  { name: "tochka10", x: 1327.2484130859375, y: 603.0184326171875, z: 4731.69677734375 },
  { name: "tochka11", x: 1449.554443359375, y: 617.7061157226562, z: 4475.9091796875 },
  { name: "tochka12", x: 1527.4864501953125, y: 637.2667236328125, z: 4433.2939453125 },
  { name: "tochka13", x: 1514.13525390625, y: 614.773193359375, z: 4449.02978515625 },
  { name: "tochka14", x: 1672.3238525390625, y: 557.9953002929688, z: 4491.2890625 },
  { name: "tochka15", x: 1547.547607421875, y: 552.7661743164062, z: 4474.669921875 },
  { name: "tochka16", x: 1579.063232421875, y: 633.8141479492188, z: 4456.88037109375 },
  { name: "tochka17", x: 1640.0733642578125, y: 576.63916015625, z: 4433.98046875 },
  { name: "tochka18", x: 1654.30322265625, y: 584.3378295898438, z: 4408.1787109375 },
  { name: "tochka19", x: 1620.3538818359375, y: 609.57568359375, z: 4394.61865234375 },
  { name: "tochka20", x: 1729.0986328125, y: 520.7261962890625, z: 4544.57421875 },
  { name: "tochka21", x: 1575.3841552734375, y: 603.2691650390625, z: 4589.64306640625 },
  { name: "tochka22", x: 1627.1436767578125, y: 629.0912475585938, z: 4588.93603515625 },
  { name: "tochka23", x: 1713.435791015625, y: 644.867919921875, z: 4557.06640625 },
  { name: "tochka24", x: 1488.075439453125, y: 134.5749053955078, z: 3956.289306640625 },
  { name: "tochka25", x: 1479.58984375, y: 142.35714721679688, z: 3926.019775390625 },
  { name: "tochka26", x: 1543.6070556640625, y: 132.6007080078125, z: 3948.37158203125 },
  { name: "tochka27", x: 1484.086669921875, y: 187.09237670898438, z: 4045.558349609375 },
  { name: "tochka28", x: 1541.9180908203125, y: 210.2333984375, z: 4030.5478515625 },
  { name: "tochka29", x: 1590.862060546875, y: 168.07554626464844, z: 3812.79833984375 },
  { name: "tochka30", x: 1567.65966796875, y: 156.83799743652344, z: 3876.057373046875 },
  { name: "tochka31", x: 1345.24365234375, y: 269.710693359375, z: 3992.593505859375 },
  { name: "tochka32", x: 1323.1669921875, y: 228.78794860839844, z: 3842.97314453125 },
  { name: "tochka33", x: 1451.7310791015625, y: 268.6305236816406, z: 3631.62109375 },
  { name: "tochka34", x: 1421.26708984375, y: 147.3389434814453, z: 3915.174072265625 },
  { name: "tochka35", x: 1354.619140625, y: 339.6817626953125, z: 3523.159423828125 },
  { name: "tochka36", x: 1500.4190673828125, y: 263.871826171875, z: 3779.355712890625 },
  { name: "tochka37", x: 1499.3944091796875, y: 265.4920349121094, z: 3736.212158203125 },
  { name: "tochka38", x: 1410.6973876953125, y: 336.19927978515625, z: 3586.01171875 },
  { name: "tochka39", x: 1460.3580322265625, y: 326.72393798828125, z: 3439.137939453125 },
  { name: "tochka40", x: 1491.3172607421875, y: 389.0627746582031, z: 3529.943359375 },
  { name: "tochka41", x: 1597.8143310546875, y: 309.5078125, z: 3528.145263671875 }
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
