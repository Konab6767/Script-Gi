// Convertido de: Tainted Hydro Phantasm.lua
// Total de posições: 15

const positions = [
  { name: "tochka1", x: 4087.861328125, y: 565.6668701171875, z: 3280.475830078125 },
  { name: "tochka2", x: 3732.699462890625, y: 462.6257629394531, z: 3225.174560546875 },
  { name: "tochka3", x: 3322.118896484375, y: 441.05413818359375, z: 2774.645751953125 },
  { name: "tochka4", x: 2978.70458984375, y: 441.0857238769531, z: 3200.520263671875 },
  { name: "tochka5", x: 2746.9677734375, y: 441.4452819824219, z: 3172.360595703125 },
  { name: "tochka6", x: 2433.798828125, y: 441.9892578125, z: 3310.8408203125 },
  { name: "tochka7", x: 2237.9033203125, y: 442.26678466796875, z: 3482.124755859375 },
  { name: "tochka8", x: 2270.5244140625, y: 441.0717468261719, z: 3502.822021484375 },
  { name: "tochka9", x: 2600.59521484375, y: 442.9237365722656, z: 3868.30810546875 },
  { name: "tochka10", x: 2699.75439453125, y: 452.06817626953125, z: 3982.796630859375 },
  { name: "tochka11", x: 2737.674072265625, y: 441.0782775878906, z: 3943.22900390625 },
  { name: "tochka12", x: 4175.9130859375, y: 526.9427490234375, z: 4970.35498046875 },
  { name: "tochka13", x: 4761.29443359375, y: 446.7403869628906, z: 3821.92919921875 },
  { name: "tochka14", x: 4235.611328125, y: 441.5033264160156, z: 4296.96728515625 },
  { name: "tochka15", x: 4634.25048828125, y: 505.6061096191406, z: 3773.40478515625 }
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
