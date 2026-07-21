// Convertido de: 0 - Agnihotra Sutra after chapter.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 359.3651428222656, y: 209.95706176757812, z: 2330.501953125 },
  { name: "tochka2", x: 84.96672821044922, y: 269.83697509765625, z: 2977.44873046875 },
  { name: "tochka4", x: 290.4537353515625, y: 237.52328491210938, z: 2318.2578125 }
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
