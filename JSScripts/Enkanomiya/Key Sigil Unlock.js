// Convertido de: Key Sigil Unlock.lua
// Total de posições: 16

const positions = [
  { name: "tochka1", x: 464.687195, y: 174.578079, z: 857.520508 },
  { name: "tochka2", x: 470.528625, y: 176.741425, z: 842.939575 },
  { name: "tochka3", x: 526.091492, y: 199.962662, z: 576.028198 },
  { name: "tochka4", x: 549.877991, y: 207.429642, z: 590.753235 },
  { name: "tochka5", x: 545.102661, y: 199.740173, z: 582.295288 },
  { name: "tochka6", x: 314.59848, y: 304.121246, z: 348.786896 },
  { name: "tochka7", x: 304.437469, y: 304.121246, z: 349.483368 },
  { name: "tochka8", x: 294.976868, y: 304.121246, z: 350.729553 },
  { name: "tochka9", x: 285.734253, y: 304.121277, z: 350.971924 },
  { name: "tochka10", x: 274.906677, y: 304.121246, z: 352.937836 },
  { name: "tochka11", x: 420.981354, y: 263.872681, z: 275.8237 },
  { name: "tochka12", x: 430.006592, y: 263.217346, z: 281.683533 },
  { name: "tochka13", x: 354.683899, y: 188.730789, z: 123.966393 },
  { name: "tochka14", x: 359.116394, y: 188.130402, z: 124.656387 },
  { name: "tochka15", x: 918.22345, y: 234.858185, z: 133.788452 },
  { name: "tochka16", x: 906.271118, y: 235.248947, z: 131.076706 }
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
