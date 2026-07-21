// Convertido de: Sea of Bygone Eras.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 1211.08740234375, y: 615.8146362304688, z: 4701.43505859375 },
  { name: "tochka2", x: 1716.82080078125, y: 566.3006591796875, z: 4536.208984375 },
  { name: "tochka3", x: 1480.1492919921875, y: 227.44354248046875, z: 3533.971435546875 }
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
