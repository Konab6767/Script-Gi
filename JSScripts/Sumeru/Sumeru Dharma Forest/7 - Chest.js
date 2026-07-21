// Convertido de: 7 - Chest.lua
// Total de posições: 17

const positions = [
  { name: "tochka1", x: 497.4556579589844, y: 238.60572814941406, z: 2173.5517578125 },
  { name: "tochka2", x: 74.6292953491211, y: 251.68109130859375, z: 2265.74853515625 },
  { name: "tochka13", x: 527.5620727539062, y: 132.35562133789062, z: 2570.822509765625 },
  { name: "tochka24", x: 496.4100341796875, y: 99.18354034423828, z: 2387.259033203125 },
  { name: "tochka35", x: 41.31212615966797, y: 351.89642333984375, z: 1921.2852783203125 },
  { name: "tochka46", x: 91.83490753173828, y: 248.8406982421875, z: 2844.210205078125 },
  { name: "tochka79", x: 294.331298828125, y: 200.73150634765625, z: 2505.64404296875 },
  { name: "tochka106", x: 120.19804382324219, y: 285.6703186035156, z: 2437.988525390625 },
  { name: "tochka107", x: 313.67205810546875, y: 270.31610107421875, z: 2219.29248046875 },
  { name: "tochka112", x: 452.8508605957031, y: 227.5850830078125, z: 2324.907470703125 },
  { name: "tochka115", x: 141.67453002929688, y: 128.2445068359375, z: 3033.951171875 },
  { name: "tochka132", x: 486.59100341796875, y: 274.62939453125, z: 2364.15771484375 },
  { name: "tochka143", x: 321.3852233886719, y: 290.2667236328125, z: 2365.061279296875 },
  { name: "tochka154", x: 234.21475219726562, y: 287.19549560546875, z: 2381.740478515625 },
  { name: "tochka165", x: 211.2190399169922, y: 273.5142822265625, z: 2291.016357421875 },
  { name: "tochka176", x: 278.44659423828125, y: 183.54685974121094, z: 2269.60107421875 },
  { name: "tochka187", x: 107.78677368164062, y: 285.12152099609375, z: 2347.266845703125 }
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
