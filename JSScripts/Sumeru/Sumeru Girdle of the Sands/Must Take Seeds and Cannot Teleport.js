// Convertido de: Must Take Seeds and Cannot Teleport.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 476.8272705078125, y: 123.97174072265625, z: 6344.0859375 },
  { name: "tochka2", x: 623.3845825195312, y: 111.27439880371094, z: 6343.8154296875 },
  { name: "tochka3", x: 876.5836181640625, y: 251.2051544189453, z: 6020.90869140625 },
  { name: "tochka4", x: 880.2823486328125, y: 239.71202087402344, z: 6064.99365234375 }
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
