// Convertido de: Geoculus.lua
// Total de posições: 86

const positions = [
  { name: "tochka1", x: 1237.54, y: 352.035, z: 1588.851 },
  { name: "tochka9", x: 896.71, y: 288.147, z: 338.092 },
  { name: "tochka10", x: 901.701, y: 243.195, z: 365.504 },
  { name: "tochka11", x: 830.088, y: 204.473, z: 272.936 },
  { name: "tochka12", x: 656.799, y: 204.511, z: 21.889 },
  { name: "tochka14", x: 957.941, y: 352.44, z: 1748.487 },
  { name: "tochka15", x: 538.884, y: 204.25, z: 69.619 },
  { name: "tochka26", x: 773.238, y: 306.487, z: 1848.415 },
  { name: "tochka28", x: 332.973, y: 234.985, z: 214.067 },
  { name: "tochka29", x: 275.258, y: 215.871, z: 212.781 },
  { name: "tochka30", x: 237.007, y: 261.697, z: 136.972 },
  { name: "tochka31", x: 29.401, y: 285.628, z: 221.656 },
  { name: "tochka35", x: 675.735, y: 381.578, z: 1789.922 },
  { name: "tochka44", x: 663.15, y: 443.067, z: 1844.049 },
  { name: "tochka49", x: 746.325, y: 324.865, z: 1753.153 },
  { name: "tochka54", x: 126.202, y: 294.92, z: 333.735 },
  { name: "tochka56", x: 279.015, y: 228.282, z: 465.256 },
  { name: "tochka57", x: 452.949, y: 231.42, z: 476.549 },
  { name: "tochka58", x: 109.122, y: 209.723, z: 724.803 },
  { name: "tochka59", x: 337.11, y: 312.772, z: 727.961 },
  { name: "tochka60", x: 404.434, y: 208.518, z: 814.08 },
  { name: "tochka61", x: 720.484, y: 320.275, z: 1682.64 },
  { name: "tochka62", x: 638.89, y: 226.925, z: 867.503 },
  { name: "tochka63", x: 770.747, y: 268.022, z: 943.381 },
  { name: "tochka64", x: 719.343, y: 238.583, z: 1660.541 },
  { name: "tochka65", x: 624.013, y: 280.931, z: 1390.217 },
  { name: "tochka67", x: 156.21, y: 239.352, z: 1433.232 },
  { name: "tochka68", x: 290.481, y: 203.532, z: 1448.324 },
  { name: "tochka69", x: 562.944, y: 192.224, z: 1171.814 },
  { name: "tochka70", x: 639.385, y: 303.886, z: 1070.804 },
  { name: "tochka71", x: 1104.792, y: 238.372, z: 1639.079 },
  { name: "tochka72", x: 649.453, y: 207.498, z: 1257.964 },
  { name: "tochka73", x: 733.3, y: 156.563, z: 1210.988 },
  { name: "tochka74", x: 732.222, y: 134.02, z: 1292.34 },
  { name: "tochka75", x: 747.813, y: 226.444, z: 1308.634 },
  { name: "tochka76", x: 947.519, y: 277.763, z: 1232.053 },
  { name: "tochka78", x: 987.842, y: 270.897, z: 1319.474 },
  { name: "tochka79", x: 1016.106, y: 365.223, z: 1201.376 },
  { name: "tochka80", x: 1149.738, y: 219.824, z: 905.535 },
  { name: "tochka81", x: 1219.481, y: 304.303, z: 1294.717 },
  { name: "tochka82", x: 1442.931, y: 256.54499999999996, z: 1296.501 },
  { name: "tochka83", x: 982.7, y: 301.084, z: 1619.0 },
  { name: "tochka84", x: 1393.948, y: 234.25, z: 1245.33 },
  { name: "tochka85", x: 1344.456, y: 211.398, z: 953.074 },
  { name: "tochka86", x: 1404.169, y: 213.183, z: 1021.302 },
  { name: "tochka87", x: 1607.103, y: 207.996, z: 1143.022 },
  { name: "tochka89", x: 1611.756, y: 205.769, z: 892.412 },
  { name: "tochka90", x: 1741.571, y: 230.561, z: 873.801 },
  { name: "tochka91", x: 1892.76, y: 207.086, z: 829.573 },
  { name: "tochka92", x: 1965.487, y: 216.805, z: 853.589 },
  { name: "tochka93", x: 2128.868, y: 192.737, z: 744.155 },
  { name: "tochka94", x: 1946.234, y: 253.895, z: 621.695 },
  { name: "tochka95", x: 950.254, y: 396.259, z: 1646.649 },
  { name: "tochka96", x: 1851.766, y: 214.0, z: 726.327 },
  { name: "tochka97", x: 1780.673, y: 233.022, z: 683.569 },
  { name: "tochka98", x: 1706.794, y: 245.185, z: 764.591 },
  { name: "tochka100", x: 1511.965, y: 214.689, z: 786.366 },
  { name: "tochka101", x: 1537.266, y: 248.339, z: 750.197 },
  { name: "tochka102", x: 1594.303, y: 326.476, z: 607.029 },
  { name: "tochka103", x: 1718.294, y: 263.779, z: 580.434 },
  { name: "tochka104", x: 1793.27, y: 241.57, z: 542.575 },
  { name: "tochka105", x: 1830.011, y: 248.529, z: 461.575 },
  { name: "tochka106", x: 1677.542, y: 415.338, z: 518.153 },
  { name: "tochka107", x: 838.631, y: 544.381, z: 1426.269 },
  { name: "tochka108", x: 1685.177, y: 307.948, z: 431.21 },
  { name: "tochka109", x: 1551.564, y: 282.087, z: 367.537 },
  { name: "tochka111", x: 1477.405, y: 245.83, z: 453.567 },
  { name: "tochka112", x: 1409.6, y: 222.233, z: 467.7 },
  { name: "tochka113", x: 1509.063, y: 227.01, z: 586.055 },
  { name: "tochka114", x: 1453.95, y: 219.995, z: 626.66 },
  { name: "tochka115", x: 1357.329, y: 221.968, z: 642.396 },
  { name: "tochka116", x: 1139.289, y: 205.127, z: 578.965 },
  { name: "tochka117", x: 889.332, y: 212.361, z: 541.264 },
  { name: "tochka118", x: 831.707, y: 213.279, z: 655.597 },
  { name: "tochka119", x: 885.597, y: 334.049, z: 1535.031 },
  { name: "tochka120", x: 740.181, y: 229.409, z: 680.193 },
  { name: "tochka122", x: 770.445, y: 212.71, z: 513.265 },
  { name: "tochka123", x: 1069.987, y: 239.68, z: 428.351 },
  { name: "tochka124", x: 1237.201, y: 210.277, z: 353.206 },
  { name: "tochka125", x: 1303.897, y: 211.319, z: 447.0 },
  { name: "tochka126", x: 1366.463, y: 209.764, z: 299.029 },
  { name: "tochka127", x: 1436.716, y: 200.984, z: 371.072 },
  { name: "tochka128", x: 1576.797, y: 239.159, z: 195.784 },
  { name: "tochka129", x: 1277.853, y: 210.541, z: 202.529 },
  { name: "tochka130", x: 946.034, y: 229.003, z: 162.6 },
  { name: "tochka131", x: 891.179, y: 317.756, z: 1610.122 }
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
