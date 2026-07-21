// Convertido de: NPC-Yaksha's Wish (6 Chests).lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 912.9332885742188, y: 228.406494140625, z: 939.0167236328125 },
  { name: "tochka2", x: 761.33154296875, y: 268.4833679199219, z: 940.8316650390625 },
  { name: "tochka3", x: 885.6678466796875, y: 239.80389404296875, z: 856.61083984375 },
  { name: "tochka4", x: 982.9251098632812, y: 239.36550903320312, z: 929.341064453125 },
  { name: "tochka5", x: 912.53515625, y: 228.2757568359375, z: 938.4422607421875 },
  { name: "tochka6", x: 840.6572265625, y: 248.0010528564453, z: 941.2925415039062 }
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
