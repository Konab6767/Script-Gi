// Convertido de: 02 Second Movement - Prisoner In Shackles.lua
// Total de posições: 13

const positions = [
  { name: "tochka1", x: 1258.02, y: 98.7032, z: 3796.22 },
  { name: "tochka2", x: 1579.9, y: 556.546, z: 4342.27 },
  { name: "tochka3", x: 1560.65, y: 575.927, z: 4325.91 },
  { name: "tochka4", x: 1545.07, y: 677.081, z: 4513.92 },
  { name: "tochka5", x: 1522.79, y: 639.031, z: 4532.46 },
  { name: "tochka6", x: 1391.84, y: 879.496, z: 4873.35 },
  { name: "tochka7", x: 1398.44, y: 800.639, z: 4820.82 },
  { name: "tochka8", x: 1312.48, y: 617.098, z: 4572.6 },
  { name: "tochka9", x: 1302.41, y: 625.649, z: 4587.91 },
  { name: "tochka10", x: 1646.96, y: 587.924, z: 4629.0 },
  { name: "tochka11", x: 1647.8, y: 602.558, z: 4650.51 },
  { name: "tochka12", x: 1555.03, y: 553.988, z: 4315.33 },
  { name: "tochka13", x: 1549.24, y: 557.26, z: 4350.47 }
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
