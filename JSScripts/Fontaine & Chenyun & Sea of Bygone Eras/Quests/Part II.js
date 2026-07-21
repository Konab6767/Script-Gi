// Convertido de: Part II.lua
// Total de posições: 10

const positions = [
  { name: "tochka1", x: 1405.14, y: 143.862, z: 3998.88 },
  { name: "tochka2", x: 1265.69, y: 149.926, z: 3925.06 },
  { name: "tochka3", x: 1254.92, y: 152.839, z: 3933.27 },
  { name: "tochka4", x: 1259.01, y: 155.011, z: 3943.38 },
  { name: "tochka5", x: 1250.71, y: 157.147, z: 3943.69 },
  { name: "tochka6", x: 1259.7, y: 152.2, z: 3958.46 },
  { name: "tochka7", x: 1245.26, y: 166.371, z: 3940.95 },
  { name: "tochka8", x: 1248.2, y: 160.047, z: 3952.96 },
  { name: "tochka9", x: 1377.74, y: 231.67, z: 3854.08 },
  { name: "tochka10", x: 1274.83, y: 151.581, z: 3932.34 }
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
