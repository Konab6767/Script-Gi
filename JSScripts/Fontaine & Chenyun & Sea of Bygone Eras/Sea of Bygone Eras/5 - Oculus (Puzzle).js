// Convertido de: 5 - Oculus (Puzzle).lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 1390.989990234375, y: 306.9440002441406, z: 3432.22998046875 },
  { name: "tochka2", x: 1614.8499755859375, y: 256.31298828125, z: 3696.14990234375 },
  { name: "tochka3", x: 1515.0799560546875, y: 144.2899932861328, z: 3818.550048828125 },
  { name: "tochka4", x: 1422.1600341796875, y: 131.3159942626953, z: 3998.47998046875 }
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
