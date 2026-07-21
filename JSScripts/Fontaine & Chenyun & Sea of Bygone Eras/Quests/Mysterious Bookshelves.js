// Convertido de: Mysterious Bookshelves.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 1251.09, y: 86.662, z: 3946.34 },
  { name: "tochka2", x: 1275.09, y: 97.8937, z: 3919.45 },
  { name: "tochka3", x: 1247.02, y: 128.347, z: 3903.39 },
  { name: "tochka4", x: 1262.13, y: 97.8433, z: 3886.53 },
  { name: "tochka5", x: 1193.35, y: 112.898, z: 3846.29 },
  { name: "tochka6", x: 1164.86, y: 118.842, z: 3860.79 },
  { name: "tochka7", x: 1165.34, y: 127.865, z: 3836.14 },
  { name: "tochka8", x: 1186.97, y: 150.056, z: 3863.18 }
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
