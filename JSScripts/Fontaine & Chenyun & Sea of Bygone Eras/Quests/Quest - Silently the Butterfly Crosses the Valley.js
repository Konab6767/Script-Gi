// Convertido de: Quest - Silently the Butterfly Crosses the Valley.lua
// Total de posições: 10

const positions = [
  { name: "tochka1", x: 1632.79, y: 230.113, z: 1610.39 },
  { name: "tochka2", x: 1591.51, y: 220.6, z: 1537.41 },
  { name: "tochka3", x: 1567.52, y: 176.318, z: 1794.32 },
  { name: "tochka4", x: 1482.81, y: 167.083, z: 1800.85 },
  { name: "tochka5", x: 1491.14, y: 187.188, z: 1902.5 },
  { name: "tochka6", x: 1543.16, y: 167.602, z: 1912.81 },
  { name: "tochka7", x: 1592.29, y: 202.87, z: 1912.78 },
  { name: "tochka8", x: 1553.65, y: 198.835, z: 1894.72 },
  { name: "tochka9", x: 1566.73, y: 176.321, z: 1796.27 },
  { name: "tochka10", x: 1547.35, y: 186.191, z: 1863.75 }
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
