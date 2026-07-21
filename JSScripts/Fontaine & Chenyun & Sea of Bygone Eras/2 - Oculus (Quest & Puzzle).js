// Convertido de: 2 - Oculus (Quest & Puzzle).lua
// Total de posições: 16

const positions = [
  { name: "tochka1", x: 4206.4794921875, y: 626.7621459960938, z: 3920.91943359375 },
  { name: "tochka2", x: 2708.612305, y: 389.067535, z: 4810.250488 },
  { name: "tochka3", x: 2486.455811, y: 358.803619, z: 4536.412109 },
  { name: "tochka4", x: 3044.312744, y: 435.480225, z: 4779.175781 },
  { name: "tochka5", x: 3154.170654, y: 245.534363, z: 4261.680176 },
  { name: "tochka6", x: 4198.858398, y: 557.41925, z: 3318.963867 },
  { name: "tochka7", x: 3808.886475, y: 492.505829, z: 3593.270752 },
  { name: "tochka8", x: 3573.518066, y: 466.434845, z: 3288.755615 },
  { name: "tochka9", x: 3356.614502, y: 475.224182, z: 3500.786865 },
  { name: "tochka10", x: 3940.417236, y: 517.836121, z: 3311.949219 },
  { name: "tochka11", x: 3952.322266, y: 520.216614, z: 3302.946777 },
  { name: "tochka12", x: 3979.877441, y: 525.908447, z: 3301.808594 },
  { name: "tochka13", x: 3976.118164, y: 526.307983, z: 3293.947021 },
  { name: "tochka14", x: 3929.260742, y: 520.634033, z: 3283.923096 },
  { name: "tochka15", x: 3946.946289, y: 523.377136, z: 3278.024414 },
  { name: "tochka16", x: 3999.947754, y: 585.596313, z: 3279.776855 }
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
