// Convertido de: NPC-Taishan Mansion Domain.lua
// Total de posições: 3

const positions = [
  { name: "tochka1", x: 743.2855224609375, y: 174.8970489501953, z: 1133.057373046875 },
  { name: "tochka2", x: 698.4296264648438, y: 157.5833282470703, z: 1159.8411865234375 },
  { name: "tochka3", x: 664.7705688476562, y: 154.9535369873047, z: 1167.4434814453125 }
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
