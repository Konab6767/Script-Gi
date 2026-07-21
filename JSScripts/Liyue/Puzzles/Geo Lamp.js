// Convertido de: Geo Lamp.lua
// Total de posições: 14

const positions = [
  { name: "tochka2", x: 743.6915283203125, y: 172.08595275878906, z: 1257.9259033203125 },
  { name: "tochka3", x: 640.478759765625, y: 208.21221923828125, z: 1302.309326171875 },
  { name: "tochka4", x: 862.695556640625, y: 325.3179016113281, z: 1516.102783203125 },
  { name: "tochka5", x: 873.554931640625, y: 340.6293029785156, z: 1558.931640625 },
  { name: "tochka6", x: 861.08935546875, y: 321.70220947265625, z: 1315.198486328125 },
  { name: "tochka7", x: 1026.7547607421875, y: 270.2760314941406, z: 1515.6541748046875 },
  { name: "tochka8", x: 632.333251953125, y: 232.73904418945312, z: 1772.4847412109375 },
  { name: "tochka9", x: 618.3041381835938, y: 265.8190002441406, z: 1455.25 },
  { name: "tochka15", x: 21.94696044921875, y: 236.795166015625, z: 693.984130859375 },
  { name: "tochka17", x: 1217.23095703125, y: 268.16680908203125, z: 1240.9573974609375 },
  { name: "tochka18", x: 828.3322143554688, y: 248.11419677734375, z: 974.679443359375 },
  { name: "tochka19", x: 763.921630859375, y: 267.9543762207031, z: 941.1275024414062 },
  { name: "tochka20", x: 519.9659423828125, y: 174.01885986328125, z: 1094.430908203125 },
  { name: "tochka21", x: 937.5924072265625, y: 256.48797607421875, z: 1235.25439453125 }
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
