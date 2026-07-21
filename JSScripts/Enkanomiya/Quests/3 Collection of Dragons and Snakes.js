// Convertido de: 3 Collection of Dragons and Snakes.lua
// Total de posições: 14

const positions = [
  { name: "tochka2", x: 611.9076538085938, y: 213.99893188476562, z: 630.2733764648438 },
  { name: "tochka4", x: 911.7613525390625, y: 207.02085876464844, z: 210.4746856689453 },
  { name: "tochka5", x: 895.7044067382812, y: 217.2344512939453, z: 153.90835571289062 },
  { name: "tochka6", x: 897.721435546875, y: 217.80709838867188, z: 134.4512939453125 },
  { name: "tochka7", x: 142.0242919921875, y: 237.88980102539062, z: 413.2759094238281 },
  { name: "tochka8", x: 136.6428680419922, y: 238.43710327148438, z: 413.4570007324219 },
  { name: "tochka12", x: 216.95570373535156, y: 314.7108154296875, z: 312.962646484375 },
  { name: "tochka13", x: 219.256103515625, y: 314.8218688964844, z: 300.2713623046875 },
  { name: "tochka14", x: 187.99624633789062, y: 301.4087219238281, z: 337.5184326171875 },
  { name: "tochka15", x: 233.4927978515625, y: 314.80169677734375, z: 300.73052978515625 },
  { name: "tochka16", x: 188.221435546875, y: 301.3979797363281, z: 337.0477600097656 },
  { name: "tochka17", x: 243.47137451171875, y: 317.31671142578125, z: 280.751708984375 },
  { name: "tochka45", x: 612.1192016601562, y: 214.0777130126953, z: 630.8047485351562 },
  { name: "tochka46", x: 587.380126953125, y: 211.57989501953125, z: 623.1238403320312 }
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
