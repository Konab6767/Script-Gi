// Convertido de: Lost Grimoire & Mysterious Bookshelves.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 1161.46, y: 64.6131, z: 3898.3 },
  { name: "tochka2", x: 1315.39, y: 108.045, z: 3854.34 },
  { name: "tochka3", x: 1277.18, y: 109.523, z: 3854.8 },
  { name: "tochka4", x: 1254.98, y: 91.8431, z: 3860.43 },
  { name: "tochka5", x: 1231.67, y: 97.5995, z: 3878.86 },
  { name: "tochka6", x: 1175.84, y: 110.114, z: 3859.17 },
  { name: "tochka7", x: 1164.32, y: 125.576, z: 3845.82 },
  { name: "tochka8", x: 1186.27, y: 149.966, z: 3862.36 }
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
