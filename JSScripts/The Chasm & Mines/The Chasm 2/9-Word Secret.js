// Convertido de: 9-Word Secret.lua
// Total de posições: 9

const positions = [
  { name: "tochka1", x: 1187.8231201171875, y: 742.8993530273438, z: 360.1024169921875 },
  { name: "tochka2", x: 330.7740783691406, y: 376.9639587402344, z: 358.9230041503906 },
  { name: "tochka3", x: 50.50163650512695, y: 337.2223815917969, z: 400.6346130371094 },
  { name: "tochka4", x: 657.5281372070312, y: 393.9132080078125, z: 578.6871948242188 },
  { name: "tochka5", x: 674.9468383789062, y: 400.6251525878906, z: 768.0005493164062 },
  { name: "tochka6", x: 607.4196166992188, y: 378.14459228515625, z: 765.932861328125 },
  { name: "tochka7", x: 58.38227844238281, y: 313.54132080078125, z: 406.60748291015625 },
  { name: "tochka8", x: 378.5233154296875, y: 85.1146011352539, z: 1136.6561279296875 },
  { name: "tochka9", x: 278.6692199707031, y: 75.0405502319336, z: 1391.2220458984375 }
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
