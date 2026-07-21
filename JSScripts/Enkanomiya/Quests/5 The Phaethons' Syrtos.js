// Convertido de: 5 The Phaethons' Syrtos.lua
// Total de posições: 3

const positions = [
  { name: "tochka4", x: 148.1221466064453, y: 305.1316223144531, z: 192.773681640625 },
  { name: "tochka7", x: 635.62744140625, y: 262.2671203613281, z: 567.5579223632812 },
  { name: "tochka8", x: 502.5712585449219, y: 202.89588928222656, z: 820.7086181640625 }
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
