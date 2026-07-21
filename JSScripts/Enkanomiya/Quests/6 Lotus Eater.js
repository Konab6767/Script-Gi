// Convertido de: 6 Lotus Eater.lua
// Total de posições: 16

const positions = [
  { name: "tochka11", x: 633.5387573242188, y: 174.94598388671875, z: 798.7866821289062 },
  { name: "tochka12", x: 654.7942504882812, y: 171.15667724609375, z: 772.0674438476562 },
  { name: "tochka13", x: 649.3385009765625, y: 171.27767944335938, z: 753.4507446289062 },
  { name: "tochka16", x: 356.738037109375, y: 121.52912139892578, z: 946.9852905273438 },
  { name: "tochka17", x: 328.93499755859375, y: 120.20450592041016, z: 892.5164184570312 },
  { name: "tochka18", x: 315.04705810546875, y: 121.9743423461914, z: 873.4114379882812 },
  { name: "tochka19", x: 312.397705078125, y: 121.91637420654297, z: 864.2224731445312 },
  { name: "tochka20", x: 303.2234802246094, y: 121.90640258789062, z: 868.042724609375 },
  { name: "tochka21", x: 310.5561218261719, y: 122.00277709960938, z: 864.5230102539062 },
  { name: "tochka22", x: 313.8521423339844, y: 121.96226501464844, z: 872.4580078125 },
  { name: "tochka23", x: 306.2884521484375, y: 122.02959442138672, z: 887.0116577148438 },
  { name: "tochka24", x: 314.8201904296875, y: 121.92340850830078, z: 873.9235229492188 },
  { name: "tochka25", x: 332.603759765625, y: 119.70179748535156, z: 861.6163330078125 },
  { name: "tochka26", x: 314.9774169921875, y: 121.97505187988281, z: 873.2957763671875 },
  { name: "tochka27", x: 343.1195983886719, y: 121.98971557617188, z: 869.4996337890625 },
  { name: "tochka28", x: 379.4886474609375, y: 123.39666748046875, z: 859.6699829101562 }
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
