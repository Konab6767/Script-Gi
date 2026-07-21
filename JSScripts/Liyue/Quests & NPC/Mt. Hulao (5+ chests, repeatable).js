// Convertido de: Mt. Hulao (5+ chests, repeatable).lua
// Total de posições: 10

const positions = [
  { name: "tochka1", x: 650.0418090820312, y: 420.0497741699219, z: 1859.997802734375 },
  { name: "tochka2", x: 695.4859619140625, y: 246.6371612548828, z: 1735.1358642578125 },
  { name: "tochka3", x: 660.4544677734375, y: 416.64874267578125, z: 1878.5018310546875 },
  { name: "tochka4", x: 708.799072265625, y: 392.3662109375, z: 1906.7303466796875 },
  { name: "tochka5", x: 741.9187622070312, y: 390.6732482910156, z: 1883.7490234375 },
  { name: "tochka6", x: 769.4229125976562, y: 364.1281433105469, z: 1897.737548828125 },
  { name: "tochka7", x: 802.174560546875, y: 337.6493225097656, z: 1857.83349609375 },
  { name: "tochka8", x: 763.607666015625, y: 318.7044982910156, z: 1790.879150390625 },
  { name: "tochka9", x: 737.6966552734375, y: 317.0561828613281, z: 1771.921875 },
  { name: "tochka10", x: 760.8314819335938, y: 307.5368347167969, z: 1745.1044921875 }
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
