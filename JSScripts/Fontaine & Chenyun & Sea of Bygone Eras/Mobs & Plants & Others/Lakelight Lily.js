// Convertido de: Lakelight Lily.lua
// Total de posições: 40

const positions = [
  { name: "tochka1", x: 3313.567871, y: 440.221527, z: 3349.248779 },
  { name: "tochka2", x: 3502.554199, y: 474.279877, z: 3167.446777 },
  { name: "tochka3", x: 3710.279053, y: 463.671295, z: 3213.990479 },
  { name: "tochka4", x: 3733.515869, y: 463.523956, z: 3214.769775 },
  { name: "tochka5", x: 3721.975342, y: 463.878754, z: 3172.915283 },
  { name: "tochka6", x: 3738.057617, y: 463.218536, z: 3141.556152 },
  { name: "tochka7", x: 3803.958252, y: 463.735596, z: 3114.753906 },
  { name: "tochka8", x: 3849.954834, y: 464.21405, z: 3097.383545 },
  { name: "tochka9", x: 3850.88916, y: 463.583099, z: 3100.980713 },
  { name: "tochka10", x: 3860.743896, y: 464.451752, z: 3102.14624 },
  { name: "tochka11", x: 3888.601807, y: 467.968231, z: 3107.846191 },
  { name: "tochka12", x: 3314.923828, y: 440.472504, z: 3325.289063 },
  { name: "tochka13", x: 3886.547119, y: 465.524628, z: 3123.662842 },
  { name: "tochka14", x: 3871.77124, y: 463.324493, z: 3130.349609 },
  { name: "tochka15", x: 3824.438965, y: 462.819489, z: 3179.171875 },
  { name: "tochka16", x: 3820.196045, y: 463.841309, z: 3188.928467 },
  { name: "tochka17", x: 3794.995605, y: 463.196625, z: 3165.207031 },
  { name: "tochka18", x: 3795.697998, y: 464.568054, z: 3192.226074 },
  { name: "tochka19", x: 3774.208496, y: 463.569427, z: 3240.993408 },
  { name: "tochka20", x: 3777.371826, y: 464.580048, z: 3264.263672 },
  { name: "tochka21", x: 3846.102051, y: 465.871674, z: 3253.357178 },
  { name: "tochka22", x: 3813.5, y: 463.530426, z: 3259.281738 },
  { name: "tochka23", x: 3296.840332, y: 440.117981, z: 3332.542725 },
  { name: "tochka24", x: 3826.63623, y: 520.297119, z: 3446.179932 },
  { name: "tochka25", x: 3804.348145, y: 520.739868, z: 3454.813965 },
  { name: "tochka26", x: 3951.052979, y: 504.230804, z: 3364.24585 },
  { name: "tochka27", x: 3957.421143, y: 503.759125, z: 3400.949951 },
  { name: "tochka28", x: 3987.712402, y: 504.47879, z: 3351.551514 },
  { name: "tochka29", x: 4055.443604, y: 504.136383, z: 3397.281982 },
  { name: "tochka30", x: 4079.486816, y: 504.499512, z: 3382.302246 },
  { name: "tochka31", x: 4005.716553, y: 495.063934, z: 3459.920166 },
  { name: "tochka32", x: 4011.497559, y: 493.855255, z: 3482.210693 },
  { name: "tochka33", x: 4060.675537, y: 549.890564, z: 3611.439697 },
  { name: "tochka34", x: 3286.2146, y: 441.105255, z: 3322.924316 },
  { name: "tochka35", x: 4039.408447, y: 547.588135, z: 3603.129639 },
  { name: "tochka36", x: 3596.367188, y: 463.96463, z: 2933.065674 },
  { name: "tochka37", x: 3606.706543, y: 466.864746, z: 2912.452881 },
  { name: "tochka38", x: 3584.085449, y: 488.129791, z: 3282.854492 },
  { name: "tochka39", x: 3564.07373, y: 487.820282, z: 3269.4375 },
  { name: "tochka40", x: 3542.489258, y: 487.732178, z: 3273.010742 }
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
