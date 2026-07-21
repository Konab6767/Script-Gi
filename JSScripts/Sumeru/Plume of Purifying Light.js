// Convertido de: Plume of Purifying Light.lua
// Total de posições: 36

const positions = [
  { name: "tochka1", x: 473.86920166015625, y: 312.51483154296875, z: 5638.90185546875 },
  { name: "tochka2", x: 485.0282897949219, y: 263.4111633300781, z: 6531.29541015625 },
  { name: "tochka3", x: 291.0557861328125, y: 275.6009826660156, z: 6712.40869140625 },
  { name: "tochka4", x: 418.12921142578125, y: 226.45179748535156, z: 6841.13330078125 },
  { name: "tochka5", x: 400.84210205078125, y: 359.1208801269531, z: 6031.38623046875 },
  { name: "tochka6", x: 603.9892578125, y: 325.29876708984375, z: 6145.8125 },
  { name: "tochka7", x: 659.8547973632812, y: 327.6312255859375, z: 6117.16455078125 },
  { name: "tochka8", x: 625.8858032226562, y: 363.728271484375, z: 6317.40380859375 },
  { name: "tochka9", x: 620.7108764648438, y: 332.7512512207031, z: 6547.84228515625 },
  { name: "tochka10", x: 581.7196655273438, y: 299.5809326171875, z: 6365.8271484375 },
  { name: "tochka11", x: 717.7742919921875, y: 315.1705017089844, z: 6312.1845703125 },
  { name: "tochka12", x: 425.35858154296875, y: 293.16253662109375, z: 6165.83740234375 },
  { name: "tochka13", x: 684.7852172851562, y: 242.60354614257812, z: 6409.36767578125 },
  { name: "tochka14", x: 773.30078125, y: 256.8907470703125, z: 6077.0185546875 },
  { name: "tochka15", x: 882.2156982421875, y: 155.0694122314453, z: 6322.1171875 },
  { name: "tochka16", x: 1133.2099609375, y: 118.18751525878906, z: 6489.08935546875 },
  { name: "tochka17", x: 718.0922241210938, y: 336.9533996582031, z: 6612.26220703125 },
  { name: "tochka18", x: 807.1067504882812, y: 356.6927185058594, z: 6442.9013671875 },
  { name: "tochka19", x: 1147.8729248046875, y: 202.27565002441406, z: 6434.1416015625 },
  { name: "tochka20", x: 698.0310668945312, y: 158.44664001464844, z: 6676.80810546875 },
  { name: "tochka21", x: 655.3642578125, y: 192.26390075683594, z: 6645.59765625 },
  { name: "tochka22", x: 553.7789916992188, y: 147.54156494140625, z: 6576.74365234375 },
  { name: "tochka23", x: 352.51947021484375, y: 305.6034240722656, z: 6232.4951171875 },
  { name: "tochka24", x: 541.6271362304688, y: 330.4395446777344, z: 5869.86328125 },
  { name: "tochka25", x: 607.1201171875, y: 320.13720703125, z: 5570.93701171875 },
  { name: "tochka26", x: 651.8453979492188, y: 255.15811157226562, z: 6000.59375 },
  { name: "tochka27", x: 739.0275268554688, y: 207.4862518310547, z: 6152.53955078125 },
  { name: "tochka28", x: 890.68896484375, y: 351.0382385253906, z: 5911.81494140625 },
  { name: "tochka29", x: 963.326416015625, y: 430.26190185546875, z: 6107.8642578125 },
  { name: "tochka30", x: 502.6016540527344, y: 272.35943603515625, z: 6307.896484375 },
  { name: "tochka31", x: 323.7037048339844, y: 131.62991333007812, z: 6230.99365234375 },
  { name: "tochka32", x: 251.53489685058594, y: 333.4181213378906, z: 6409.31494140625 },
  { name: "tochka33", x: 275.61578369140625, y: 282.6014099121094, z: 6349.2841796875 },
  { name: "tochka34", x: 317.0777282714844, y: 270.3502197265625, z: 6391.00390625 },
  { name: "tochka35", x: 430.8166198730469, y: 255.58445739746094, z: 6557.8427734375 },
  { name: "tochka36", x: 569.89599609375, y: 107.6593017578125, z: 6590.47314453125 }
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
