// Convertido de: Monumental Study.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 1015.484619140625, y: 418.3415222167969, z: 6039.4267578125 },
  { name: "tochka2", x: 434.1329650878906, y: 311.6787414550781, z: 5696.8642578125 },
  { name: "tochka3", x: 767.4315795898438, y: 276.53271484375, z: 6219.36962890625 },
  { name: "tochka4", x: 636.6932373046875, y: 401.84918212890625, z: 6544.39794921875 }
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
