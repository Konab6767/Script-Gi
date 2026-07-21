// Convertido de: The Wild Fairy of Erinnyes.lua
// Total de posições: 27

const positions = [
  { name: "tochka1", x: 3754.797119, y: 479.511444, z: 3684.906982 },
  { name: "tochka2", x: 3253.860352, y: 441.080627, z: 3290.847412 },
  { name: "tochka3", x: 3306.88916, y: 443.00882, z: 3316.625488 },
  { name: "tochka4", x: 3807.515869, y: 413.186737, z: 3178.234863 },
  { name: "tochka5", x: 3813.1604, y: 427.841461, z: 3174.736572 },
  { name: "tochka6", x: 3796.141113, y: 416.654602, z: 3169.074951 },
  { name: "tochka7", x: 3806.459961, y: 413.179504, z: 3178.003906 },
  { name: "tochka8", x: 4063.397949, y: 494.932495, z: 3342.634521 },
  { name: "tochka9", x: 4031.293213, y: 485.074554, z: 3367.539063 },
  { name: "tochka10", x: 3757.378906, y: 479.441986, z: 3682.416992 },
  { name: "tochka11", x: 3756.057861, y: 479.449738, z: 3683.35791 },
  { name: "tochka12", x: 3259.962891, y: 444.335083, z: 3474.952881 },
  { name: "tochka13", x: 3743.281006, y: 479.470154, z: 3691.290771 },
  { name: "tochka14", x: 3740.62793, y: 479.46521, z: 3677.449219 },
  { name: "tochka15", x: 3746.241211, y: 457.107758, z: 3684.298584 },
  { name: "tochka16", x: 3701.533936, y: 410.190002, z: 3459.754883 },
  { name: "tochka17", x: 3823.457764, y: 378.094818, z: 3437.345703 },
  { name: "tochka18", x: 3811.972656, y: 376.709839, z: 3428.22168 },
  { name: "tochka19", x: 3792.546143, y: 376.579468, z: 3436.633301 },
  { name: "tochka20", x: 3800.094727, y: 376.601257, z: 3438.517578 },
  { name: "tochka21", x: 3307.767334, y: 442.765259, z: 3318.48877 },
  { name: "tochka22", x: 3346.38623, y: 448.609192, z: 3305.688477 },
  { name: "tochka23", x: 3340.902344, y: 446.411316, z: 3313.616455 },
  { name: "tochka24", x: 3339.298096, y: 446.376709, z: 3320.902832 },
  { name: "tochka25", x: 3342.019531, y: 446.775574, z: 3314.314453 },
  { name: "tochka26", x: 3332.407715, y: 444.555756, z: 3317.335205 },
  { name: "tochka27", x: 3333.56665, y: 444.7612, z: 3365.187012 }
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
