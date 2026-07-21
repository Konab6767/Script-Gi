// Convertido de: Radiant Spincrystal.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 1543.43, y: 567.957, z: 4289.34 },
  { name: "tochka2", x: 1289.13, y: 135.948, z: 3978.82 },
  { name: "tochka3", x: 1434.74, y: 191.874, z: 3889.62 }
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
