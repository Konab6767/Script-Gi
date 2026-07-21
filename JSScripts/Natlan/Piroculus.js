// Convertido de: Piroculus.lua
// Total de posições: 49

const positions = [
  { name: "tochka115", x: 223.76, y: 252.86, z: 9645.37 },
  { name: "tochka142", x: 194.76, y: 336.1, z: 9648.92 },
  { name: "tochka202", x: 393.36, y: 228.05, z: 13900.41 },
  { name: "tochka203", x: 404.24, y: 262.68, z: 14030.64 },
  { name: "tochka204", x: 284.74, y: 216.79, z: 14219.94 },
  { name: "tochka205", x: 490.55, y: 207.0, z: 14165.6 },
  { name: "tochka206", x: 648.21, y: 220.5, z: 14032.27 },
  { name: "tochka207", x: 657.95, y: 256.63, z: 13932.53 },
  { name: "tochka208", x: 759.12, y: 292.28, z: 13909.7 },
  { name: "tochka209", x: 896.45, y: 341.48, z: 13729.18 },
  { name: "tochka210", x: 717.9, y: 227.93, z: 13649.86 },
  { name: "tochka211", x: 862.12, y: 224.95, z: 14335.94 },
  { name: "tochka213", x: 807.71, y: 230.01, z: 14363.43 },
  { name: "tochka214", x: 968.01, y: 238.53, z: 14285.2 },
  { name: "tochka215", x: 870.85, y: 220.88, z: 14073.31 },
  { name: "tochka216", x: 805.03, y: 237.53, z: 14094.38 },
  { name: "tochka217", x: 764.14, y: 241.71, z: 14082.54 },
  { name: "tochka218", x: 916.82, y: 214.7, z: 14434.62 },
  { name: "tochka219", x: 919.22, y: 216.78, z: 14528.86 },
  { name: "tochka220", x: 948.85, y: 237.83, z: 14764.13 },
  { name: "tochka221", x: 744.23, y: 228.32, z: 14540.2 },
  { name: "tochka222", x: 594.44, y: 216.08, z: 14449.83 },
  { name: "tochka223", x: 86.91, y: 196.11, z: 13611.82 },
  { name: "tochka224", x: 439.15, y: 233.63, z: 14584.26 },
  { name: "tochka225", x: 537.92, y: 289.49, z: 14662.7 },
  { name: "tochka226", x: 592.37, y: 278.69, z: 14706.53 },
  { name: "tochka227", x: 345.69, y: 213.95, z: 15165.16 },
  { name: "tochka228", x: 1207.26, y: 269.59, z: 14046.29 },
  { name: "tochka229", x: 1210.58, y: 141.68, z: 13993.64 },
  { name: "tochka230", x: 1262.75, y: 437.49, z: 14057.49 },
  { name: "tochka231", x: 1321.38, y: 136.57, z: 13998.87 },
  { name: "tochka232", x: 1369.08, y: 97.55, z: 14186.95 },
  { name: "tochka233", x: 1284.11, y: 64.65, z: 14193.38 },
  { name: "tochka234", x: 200.42, y: 226.92, z: 13764.77 },
  { name: "tochka235", x: 1270.89, y: 120.85, z: 14268.16 },
  { name: "tochka236", x: 1529.09, y: 94.37, z: 13988.43 },
  { name: "tochka237", x: 1634.3, y: 241.08, z: 15129.11 },
  { name: "tochka238", x: 1619.48, y: 258.05, z: 15233.1 },
  { name: "tochka239", x: 1849.48, y: 242.95, z: 15190.03 },
  { name: "tochka240", x: 1399.45, y: 226.59, z: 15375.18 },
  { name: "tochka241", x: 1398.99, y: 215.36, z: 15066.57 },
  { name: "tochka242", x: 1510.09, y: 228.33, z: 15089.11 },
  { name: "tochka243", x: 1611.16, y: 222.51, z: 14992.45 },
  { name: "tochka244", x: 1530.62, y: 225.12, z: 14969.63 },
  { name: "tochka245", x: 253.07, y: 255.65, z: 13767.42 },
  { name: "tochka246", x: 361.25, y: 343.85, z: 13713.71 },
  { name: "tochka247", x: 495.37, y: 294.17, z: 13780.83 },
  { name: "tochka248", x: 528.65, y: 214.51, z: 13872.26 },
  { name: "tochka249", x: 395.12, y: 243.23, z: 13951.0 }
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
