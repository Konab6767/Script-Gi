// Convertido de: Soul Bell.lua
// Total de posições: 9

const positions = [
  { name: "tochka1", x: 242.1979217529297, y: 349.38995361328125, z: 6944.8173828125 },
  { name: "tochka2", x: 696.1657104492188, y: 286.4615783691406, z: 6701.3544921875 },
  { name: "tochka3", x: 661.7423095703125, y: 394.5539855957031, z: 6531.666015625 },
  { name: "tochka4", x: 676.7750854492188, y: 319.3370361328125, z: 6268.10107421875 },
  { name: "tochka5", x: 434.0055236816406, y: 275.1285705566406, z: 6303.59033203125 },
  { name: "tochka6", x: 779.9241943359375, y: 233.2283477783203, z: 5950.76513671875 },
  { name: "tochka7", x: 848.4715576171875, y: 343.46673583984375, z: 5802.0947265625 },
  { name: "tochka8", x: 935.7850341796875, y: 323.7149658203125, z: 5607.2919921875 },
  { name: "tochka9", x: 22.352128982543945, y: 262.0347595214844, z: 6221.0595703125 }
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
