// Convertido de: Elemental Monument.lua
// Total de posições: 13

const positions = [
  { name: "tochka1", x: 527.2598876953125, y: 294.89398193359375, z: 6021.8046875 },
  { name: "tochka2", x: 295.96282958984375, y: 304.60357666015625, z: 6823.021484375 },
  { name: "tochka3", x: 615.345458984375, y: 281.2867431640625, z: 6772.7265625 },
  { name: "tochka4", x: 587.8526611328125, y: 286.4815368652344, z: 6711.05029296875 },
  { name: "tochka5", x: 539.9610595703125, y: 276.1712341308594, z: 6751.3232421875 },
  { name: "tochka6", x: 498.1753234863281, y: 265.5911560058594, z: 6736.18701171875 },
  { name: "tochka7", x: 327.4676208496094, y: 302.1981201171875, z: 6199.88720703125 },
  { name: "tochka8", x: 544.4631958007812, y: 240.8043212890625, z: 6467.06884765625 },
  { name: "tochka9", x: 462.76263427734375, y: 85.53227233886719, z: 6444.9873046875 },
  { name: "tochka10", x: 593.4071044921875, y: 103.81885528564453, z: 6371.80078125 },
  { name: "tochka11", x: 401.00335693359375, y: 322.4201965332031, z: 5536.72265625 },
  { name: "tochka12", x: 282.61395263671875, y: 269.2783508300781, z: 6724.88427734375 },
  { name: "tochka13", x: 423.9604797363281, y: 237.4186553955078, z: 6357.2978515625 }
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
