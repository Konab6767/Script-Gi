// Convertido de: Loot.lua
// Total de posições: 32

const positions = [
  { name: "tochka1", x: 2893.314453125, y: 337.92840576171875, z: 3633.416015625 },
  { name: "tochka2", x: 2837.546142578125, y: 303.7472839355469, z: 3600.423583984375 },
  { name: "tochka3", x: 2794.122802734375, y: 283.6651306152344, z: 3629.956787109375 },
  { name: "tochka4", x: 2756.518798828125, y: 318.96636962890625, z: 3539.849609375 },
  { name: "tochka5", x: 2729.0322265625, y: 323.443115234375, z: 3522.903564453125 },
  { name: "tochka6", x: 2711.06640625, y: 315.716552734375, z: 3526.3291015625 },
  { name: "tochka7", x: 2694.419189453125, y: 305.1268615722656, z: 3529.10595703125 },
  { name: "tochka8", x: 2668.00732421875, y: 394.3449401855469, z: 3485.89697265625 },
  { name: "tochka9", x: 2577.239990234375, y: 315.0950622558594, z: 3588.298095703125 },
  { name: "tochka10", x: 2551.37451171875, y: 321.6996154785156, z: 3579.74365234375 },
  { name: "tochka11", x: 2563.201171875, y: 320.3213806152344, z: 3549.062744140625 },
  { name: "tochka12", x: 2559.22705078125, y: 317.5968322753906, z: 3561.230224609375 },
  { name: "tochka13", x: 2512.791748046875, y: 307.2341003417969, z: 3626.41064453125 },
  { name: "tochka14", x: 2518.619873046875, y: 308.6479797363281, z: 3694.349853515625 },
  { name: "tochka15", x: 2529.238525390625, y: 316.02496337890625, z: 3720.531982421875 },
  { name: "tochka16", x: 2437.747314453125, y: 352.5840759277344, z: 3679.892333984375 },
  { name: "tochka17", x: 2431.03076171875, y: 357.66302490234375, z: 3632.487060546875 },
  { name: "tochka18", x: 2441.486328125, y: 347.2860107421875, z: 3621.682861328125 },
  { name: "tochka19", x: 2570.04541015625, y: 294.57879638671875, z: 3664.2265625 },
  { name: "tochka20", x: 2596.933837890625, y: 290.520263671875, z: 3678.16552734375 },
  { name: "tochka21", x: 2583.812744140625, y: 293.1667785644531, z: 3683.8427734375 },
  { name: "tochka22", x: 2620.565673828125, y: 302.32928466796875, z: 3721.793212890625 },
  { name: "tochka23", x: 2644.2978515625, y: 313.9070739746094, z: 3742.899169921875 },
  { name: "tochka24", x: 2666.33349609375, y: 305.2970886230469, z: 3743.906005859375 },
  { name: "tochka25", x: 2610.7236328125, y: 344.3200988769531, z: 3705.73681640625 },
  { name: "tochka26", x: 2728.489013671875, y: 282.50390625, z: 3721.6025390625 },
  { name: "tochka27", x: 2773.48095703125, y: 279.7265930175781, z: 3718.038818359375 },
  { name: "tochka28", x: 2760.942626953125, y: 276.2091064453125, z: 3697.16943359375 },
  { name: "tochka29", x: 2690.635009765625, y: 232.34539794921875, z: 3697.99365234375 },
  { name: "tochka30", x: 2744.167724609375, y: 238.9170379638672, z: 3686.9697265625 },
  { name: "tochka31", x: 2767.75830078125, y: 242.1569366455078, z: 3664.494384765625 },
  { name: "tochka32", x: 2750.390380859375, y: 238.83718872070312, z: 3617.1083984375 }
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
