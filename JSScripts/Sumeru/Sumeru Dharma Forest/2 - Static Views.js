// Convertido de: 2 - Static Views.lua
// Total de posições: 3

const positions = [
  { name: "tochka5", x: 117.19546508789062, y: 251.70242309570312, z: 2506.78173828125 },
  { name: "tochka7", x: 348.61126708984375, y: 183.44247436523438, z: 2262.451904296875 },
  { name: "tochka17", x: 711.977294921875, y: 774.7628173828125, z: 111.66091918945312 }
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
