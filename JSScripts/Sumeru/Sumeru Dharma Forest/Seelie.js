// Convertido de: Seelie.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 472.5467529296875, y: 211.77291870117188, z: 2288.813232421875 },
  { name: "tochka12", x: 236.6559600830078, y: 326.58453369140625, z: 2553.556640625 },
  { name: "tochka22", x: 20.747467041015625, y: 238.08255004882812, z: 2433.933349609375 },
  { name: "tochka38", x: 87.30351257324219, y: 271.5106201171875, z: 2981.74365234375 }
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
