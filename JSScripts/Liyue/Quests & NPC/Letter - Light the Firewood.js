// Convertido de: Letter - Light the Firewood.lua
// Total de posições: 4

const positions = [
  { name: "tochka1", x: 274.9070739746094, y: 214.3229522705078, z: 209.7921600341797 },
  { name: "tochka2", x: 245.43019104003906, y: 236.87933349609375, z: 513.1114501953125 },
  { name: "tochka3", x: 251.75450134277344, y: 237.88821411132812, z: 522.9918823242188 },
  { name: "tochka4", x: 335.49151611328125, y: 299.32562255859375, z: 725.6333618164062 }
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
