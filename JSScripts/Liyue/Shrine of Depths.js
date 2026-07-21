// Convertido de: Shrine of Depths.lua
// Total de posições: 6

const positions = [
  { name: "tochka1", x: 1537.286376953125, y: 245.16156005859375, z: 78.83393859863281 },
  { name: "tochka3", x: 1653.4141845703125, y: 279.87445068359375, z: 527.9165649414062 },
  { name: "tochka4", x: 1448.6385498046875, y: 247.29930114746094, z: 1309.015380859375 },
  { name: "tochka5", x: 1211.895263671875, y: 262.38677978515625, z: 1300.921630859375 },
  { name: "tochka6", x: 1050.704345703125, y: 317.27044677734375, z: 1406.7724609375 },
  { name: "tochka7", x: 446.38470458984375, y: 302.42279052734375, z: 1574.7105712890625 }
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
