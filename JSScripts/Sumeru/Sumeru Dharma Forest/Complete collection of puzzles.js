// Convertido de: Complete collection of puzzles.lua
// Total de posições: 8

const positions = [
  { name: "tochka1", x: 251.82305908203125, y: 389.7911071777344, z: 2011.8055419921875 },
  { name: "tochka12", x: 314.31072998046875, y: 270.54412841796875, z: 2221.086181640625 },
  { name: "tochka23", x: 126.14253234863281, y: 282.40557861328125, z: 2460.857177734375 },
  { name: "tochka29", x: 144.4276580810547, y: 259.98486328125, z: 2301.536376953125 },
  { name: "tochka50", x: 97.82821655273438, y: 163.08343505859375, z: 2717.45947265625 },
  { name: "tochka51", x: 187.45875549316406, y: 251.02716064453125, z: 2961.939453125 },
  { name: "tochka52", x: 113.40196228027344, y: 155.28323364257812, z: 2938.043212890625 },
  { name: "tochka53", x: 161.34840393066406, y: 383.7139587402344, z: 2142.849853515625 }
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
