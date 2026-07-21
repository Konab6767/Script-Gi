// Convertido de: NPC Painting Quest (3 Chests).lua
// Total de posições: 7

const positions = [
  { name: "tochka1", x: 65.68299865722656, y: 211.58018493652344, z: 748.7081298828125 },
  { name: "tochka2", x: 252.93276977539062, y: 237.20095825195312, z: 533.2403564453125 },
  { name: "tochka3", x: 241.54006958007812, y: 244.98643493652344, z: 807.223876953125 },
  { name: "tochka4", x: 246.43003845214844, y: 243.42596435546875, z: 802.9359130859375 },
  { name: "tochka5", x: 34.67765808105469, y: 237.8900146484375, z: 735.3936767578125 },
  { name: "tochka6", x: 54.828125, y: 238.5172576904297, z: 775.3677978515625 },
  { name: "tochka7", x: 248.4615936279297, y: 236.73524475097656, z: 536.8721923828125 }
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
