// Convertido de: Energy Concentrating Component.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 4158.3388671875, y: 509.14154052734375, z: 4666.822265625 },
  { name: "tochka2", x: 5050.78564453125, y: 522.8470458984375, z: 4468.064453125 },
  { name: "tochka3", x: 4635.62158203125, y: 569.70849609375, z: 5260.302734375 },
  { name: "tochka4", x: 4752.39404296875, y: 354.140380859375, z: 4813.04541015625 },
  { name: "tochka5", x: 4677.9873046875, y: 194.03981018066406, z: 4511.443359375 }
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
