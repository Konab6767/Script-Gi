// Convertido de: 13 - Viewpoints.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 4439.2314453125, y: 471.7227478027344, z: 4269.67822265625 },
  { name: "tochka2", x: 4564.177734375, y: 518.6143798828125, z: 3593.654052734375 },
  { name: "tochka3", x: 4719.5927734375, y: 690.521240234375, z: 3972.85302734375 },
  { name: "tochka4", x: 4418.86376953125, y: 348.04693603515625, z: 4552.84912109375 },
  { name: "tochka5", x: 4459.4375, y: 122.58486938476562, z: 4560.302734375 }
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
