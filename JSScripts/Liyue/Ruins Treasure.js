// Convertido de: Ruins Treasure.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 1296.163330078125, y: 288.3737487792969, z: 1337.6590576171875 },
  { name: "tochka2", x: 1237.8992919921875, y: 314.1979675292969, z: 1433.856201171875 },
  { name: "tochka3", x: 1149.242431640625, y: 351.5827941894531, z: 1522.4925537109375 },
  { name: "tochka4", x: 908.6915893554688, y: 272.4885559082031, z: 354.733642578125 }
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
