// Convertido de: NPC-Trails in Tianqiu (7+3 Chests).lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 94.98875427246094, y: 192.1958770751953, z: 1402.5396728515625 },
  { name: "tochka2", x: 95.04873657226562, y: 199.47958374023438, z: 1402.5640869140625 },
  { name: "tochka3", x: 109.70437622070312, y: 207.09957885742188, z: 1400.0478515625 },
  { name: "tochka4", x: 196.38180541992188, y: 198.8834228515625, z: 1391.8089599609375 },
  { name: "tochka5", x: 203.43807983398438, y: 206.41311645507812, z: 1381.14453125 },
  { name: "tochka6", x: 203.8960418701172, y: 213.8795166015625, z: 1390.156982421875 },
  { name: "tochka7", x: 156.7328643798828, y: 213.46792602539062, z: 1437.2364501953125 },
  { name: "tochka8", x: 156.57115173339844, y: 195.24014282226562, z: 1399.655517578125 }
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
