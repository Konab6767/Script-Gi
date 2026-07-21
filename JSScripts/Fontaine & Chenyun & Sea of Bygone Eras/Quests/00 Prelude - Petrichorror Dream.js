// Convertido de: 00 Prelude - Petrichorror Dream.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 1235.22, y: 282.557, z: 4432.31 },
  { name: "tochka2", x: 1204.81, y: 296.444, z: 4353.94 },
  { name: "tochka3", x: 1214.14, y: 279.852, z: 4214.66 },
  { name: "tochka4", x: 1195.08, y: 220.528, z: 4198.16 }
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
