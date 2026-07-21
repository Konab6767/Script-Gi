// Convertido de: 01 First Movement - In the Hall of the Sea King.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 1231.4, y: 81.8278, z: 4041.88 },
  { name: "tochka2", x: 1245.85, y: 85.8656, z: 3984.49 },
  { name: "tochka3", x: 1251.09, y: 85.8428, z: 3935.41 },
  { name: "tochka4", x: 1275.33, y: 109.525, z: 3879.44 },
  { name: "tochka5", x: 1275.77, y: 109.527, z: 3860.86 },
  { name: "tochka6", x: 1247.92, y: 97.4125, z: 3822.28 },
  { name: "tochka7", x: 1300.8, y: 109.707, z: 3866.37 },
  { name: "tochka8", x: 1244.7, y: 97.412, z: 3826.91 }
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
