// Convertido de: 4 Hyperion's Dirge.lua
// Total de posições: 6

const positions = [
  { name: "tochka4", x: 631.0364379882812, y: 246.0361328125, z: 774.9268798828125 },
  { name: "tochka5", x: 277.1365051269531, y: 337.83489990234375, z: 280.3734436035156 },
  { name: "tochka6", x: 278.4606628417969, y: 339.1803894042969, z: 239.38510131835938 },
  { name: "tochka7", x: 272.5369873046875, y: 339.4486999511719, z: 238.37364196777344 },
  { name: "tochka8", x: 266.2870788574219, y: 338.672119140625, z: 239.84788513183594 },
  { name: "tochka9", x: 268.32110595703125, y: 545.1139526367188, z: 206.1008758544922 }
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
