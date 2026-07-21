// Convertido de: Hidden Achievement - What Difference Does This Make.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 290.81341552734375, y: 337.748779296875, z: 193.5048370361328 },
  { name: "tochka2", x: 674.0739135742188, y: 269.7588806152344, z: 664.25390625 },
  { name: "tochka3", x: 680.2406616210938, y: 274.0240783691406, z: 665.5660400390625 },
  { name: "tochka8", x: 291.38873291015625, y: 337.6947326660156, z: 195.5336151123047 }
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
