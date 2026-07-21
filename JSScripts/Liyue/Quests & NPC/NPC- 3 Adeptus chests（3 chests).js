// Convertido de: NPC- 3 Adeptus chests（3 chests).lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 835.5767822265625, y: 481.498291015625, z: 1425.8656005859375 },
  { name: "tochka2", x: 1061.718994140625, y: 432.75201416015625, z: 1596.177734375 },
  { name: "tochka3", x: 773.0317993164062, y: 407.11181640625, z: 1790.4862060546875 },
  { name: "tochka4", x: 720.7240600585938, y: 421.4940490722656, z: 1442.7850341796875 },
  { name: "tochka5", x: 835.0432739257812, y: 481.54193115234375, z: 1428.2159423828125 }
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
