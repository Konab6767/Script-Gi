// Convertido de: Mini Puzzle.lua
// Total de posições: 12

const positions = [
  { name: "tochka1", x: 1019.1152954101562, y: 205.6951446533203, z: 70.34870910644531 },
  { name: "tochka2", x: 1040.7821044921875, y: 200.70462036132812, z: 327.06878662109375 },
  { name: "tochka3", x: 365.9405517578125, y: 205.2744140625, z: 582.9641723632812 },
  { name: "tochka7", x: 1322.424072265625, y: 201.32774353027344, z: 278.8273010253906 },
  { name: "tochka12", x: 171.34158325195312, y: 284.149658203125, z: 1640.1336669921875 },
  { name: "tochka15", x: 1781.357177734375, y: 222.2156524658203, z: 684.9085083007812 },
  { name: "tochka17", x: 36.28163146972656, y: 248.70069885253906, z: 433.452880859375 },
  { name: "tochka18", x: 1307.5810546875, y: 202.92562866210938, z: 226.5674591064453 },
  { name: "tochka19", x: 1210.55224609375, y: 270.9819641113281, z: 1418.186767578125 },
  { name: "tochka20", x: 829.0408325195312, y: 211.72523498535156, z: 583.71533203125 },
  { name: "tochka22", x: 793.349365234375, y: 323.5936584472656, z: 1425.755615234375 },
  { name: "tochka23", x: 22.46472930908203, y: 272.465087890625, z: 178.7220458984375 }
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
