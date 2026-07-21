// Convertido de: Windmill Mechanism.lua
// Total de posições: 7

const positions = [
  { name: "tochka1", x: 1593.768798828125, y: 277.00048828125, z: 215.64889526367188 },
  { name: "tochka2", x: 1508.0799560546875, y: 201.81944274902344, z: 242.7762451171875 },
  { name: "tochka4", x: 111.09100341796875, y: 212.04400634765625, z: 658.0853881835938 },
  { name: "tochka5", x: 214.63104248046875, y: 240.2322235107422, z: 155.8709259033203 },
  { name: "tochka6", x: 871.8580322265625, y: 208.9025421142578, z: 290.1932373046875 },
  { name: "tochka7", x: 1348.127685546875, y: 223.95556640625, z: 511.3782043457031 },
  { name: "tochka8", x: 572.6761474609375, y: 224.3004608154297, z: 719.5518798828125 }
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
