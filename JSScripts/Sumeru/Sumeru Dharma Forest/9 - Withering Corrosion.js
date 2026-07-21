// Convertido de: 9 - Withering Corrosion.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 309.2918395996094, y: 421.6536865234375, z: 2462.292724609375 },
  { name: "tochka9", x: 20.738170623779297, y: 307.7970275878906, z: 2291.526123046875 },
  { name: "tochka17", x: 141.14761352539062, y: 345.4885559082031, z: 2164.132568359375 }
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
