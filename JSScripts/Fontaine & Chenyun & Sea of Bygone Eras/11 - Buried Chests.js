// Convertido de: 11 - Buried Chests.lua
// Total de posições: 7

const positions = [
  { name: "tochka1", x: 1229.63, y: 314.979, z: 4292.94 },
  { name: "tochka2", x: 1190.72, y: 275.392, z: 4225.31 },
  { name: "tochka3", x: 1218.51, y: 281.703, z: 4120.27 },
  { name: "tochka4", x: 1340.29, y: 281.016, z: 4215.48 },
  { name: "tochka5", x: 1648.43, y: 692.734, z: 4629.9 },
  { name: "tochka6", x: 1645.34, y: 585.357, z: 4643.94 },
  { name: "tochka7", x: 1744.33, y: 570.814, z: 4567.7 }
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
