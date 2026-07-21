// Convertido de: 3 - 76 Aranara.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 378.9583740234375, y: 253.41815185546875, z: 2315.215087890625 },
  { name: "tochka17", x: 37.076904296875, y: 456.57012939453125, z: 2069.17138671875 },
  { name: "tochka18", x: 165.40664672851562, y: 426.715576171875, z: 2129.409423828125 },
  { name: "tochka19", x: 333.36810302734375, y: 364.17828369140625, z: 2529.348388671875 },
  { name: "tochka20", x: 325.51239013671875, y: 406.0985412597656, z: 2457.90771484375 }
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
