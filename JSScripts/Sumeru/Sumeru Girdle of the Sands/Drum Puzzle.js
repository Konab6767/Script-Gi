// Convertido de: Drum Puzzle.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 884.0400390625, y: 264.4770202636719, z: 5635.0947265625 },
  { name: "tochka2", x: 883.4041137695312, y: 264.7395935058594, z: 5638.85791015625 },
  { name: "tochka3", x: 835.7680053710938, y: 260.45233154296875, z: 5592.87744140625 },
  { name: "tochka4", x: 833.5784301757812, y: 260.7953796386719, z: 5602.796875 },
  { name: "tochka5", x: 924.1823120117188, y: 259.6528015136719, z: 5535.65673828125 },
  { name: "tochka6", x: 921.8912963867188, y: 259.6400146484375, z: 5534.03857421875 },
  { name: "tochka7", x: 1016.0866088867188, y: 375.3262023925781, z: 5977.76220703125 },
  { name: "tochka8", x: 965.4378051757812, y: 364.0115051269531, z: 5968.0263671875 }
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
