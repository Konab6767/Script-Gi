// Convertido de: Praetorian Golem.lua
// Total de posições: 5

const positions = [
  { name: "tochka1", x: 1281.7523193359375, y: 85.80581665039062, z: 3956.591552734375 },
  { name: "tochka2", x: 1249.7637939453125, y: 127.93682861328125, z: 3885.122314453125 },
  { name: "tochka3", x: 1182.3480224609375, y: 102.4951400756836, z: 3895.851806640625 },
  { name: "tochka4", x: 1207.1282958984375, y: 118.8039779663086, z: 3816.6142578125 },
  { name: "tochka5", x: 1139.2335205078125, y: 30.740930557250977, z: 3878.044189453125 }
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
