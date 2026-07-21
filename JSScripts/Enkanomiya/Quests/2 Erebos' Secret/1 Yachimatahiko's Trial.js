// Convertido de: 1 Yachimatahiko's Trial.lua
// Total de posições: 11

const positions = [
  { name: "tochka3", x: 699.6715087890625, y: 346.2769470214844, z: 551.7955932617188 },
  { name: "tochka4", x: 1346.7994384765625, y: 193.47592163085938, z: 846.6753540039062 },
  { name: "tochka5", x: 1319.5242919921875, y: 193.4507293701172, z: 845.5156860351562 },
  { name: "tochka6", x: 1313.6453857421875, y: 215.49424743652344, z: 848.3814086914062 },
  { name: "tochka7", x: 1319.2266845703125, y: 194.3619842529297, z: 830.7915649414062 },
  { name: "tochka8", x: 1298.9578857421875, y: 181.465576171875, z: 825.8652954101562 },
  { name: "tochka9", x: 1319.0263671875, y: 181.44967651367188, z: 857.740966796875 },
  { name: "tochka10", x: 1319.5745849609375, y: 194.27886962890625, z: 830.0690307617188 },
  { name: "tochka11", x: 1319.135009765625, y: 181.4582061767578, z: 847.4873046875 },
  { name: "tochka12", x: 1298.8240966796875, y: 181.39767456054688, z: 855.378662109375 },
  { name: "tochka13", x: 1358.27392578125, y: 240.058837890625, z: 700.429931640625 }
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
