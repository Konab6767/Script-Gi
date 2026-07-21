// Convertido de: 14 - Sumeru puzzle.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 424.34368896484375, y: 254.39186096191406, z: 2208.423095703125 },
  { name: "tochka12", x: 348.2125549316406, y: 184.94496154785156, z: 2288.59375 },
  { name: "tochka23", x: 233.94509887695312, y: 313.97894287109375, z: 2113.371826171875 },
  { name: "tochka34", x: 103.2965087890625, y: 247.5054473876953, z: 2263.1083984375 }
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
