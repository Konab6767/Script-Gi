// Convertido de: Part I.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 1640.52, y: 183.934, z: 3943.69 },
  { name: "tochka2", x: 1666.84, y: 182.334, z: 3963.2 },
  { name: "tochka3", x: 1675.14, y: 183.716, z: 3956.83 },
  { name: "tochka4", x: 1680.02, y: 192.543, z: 3943.46 }
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
