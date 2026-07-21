// Convertido de: Fatui Operative.lua
// Total de posições: 18

const positions = [
  { name: "tochka1", x: 4279.908203125, y: 443.29998779296875, z: 4655.0478515625 },
  { name: "tochka2", x: 4290.32861328125, y: 441.86358642578125, z: 4832.33056640625 },
  { name: "tochka3", x: 4362.43701171875, y: 441.3551940917969, z: 4900.35205078125 },
  { name: "tochka4", x: 4391.2685546875, y: 442.4755554199219, z: 4918.30517578125 },
  { name: "tochka5", x: 4533.33740234375, y: 492.316650390625, z: 5097.93310546875 },
  { name: "tochka6", x: 4615.9638671875, y: 488.5071105957031, z: 5062.24267578125 },
  { name: "tochka7", x: 5164.26318359375, y: 589.1470336914062, z: 4385.85400390625 },
  { name: "tochka8", x: 4943.4609375, y: 464.3020324707031, z: 3864.5947265625 },
  { name: "tochka9", x: 4737.99072265625, y: 441.2220153808594, z: 4558.93408203125 },
  { name: "tochka10", x: 4640.89111328125, y: 443.59967041015625, z: 4495.1328125 },
  { name: "tochka11", x: 4159.33935546875, y: 537.3818969726562, z: 4895.58447265625 },
  { name: "tochka12", x: 4527.7841796875, y: 441.60919189453125, z: 4990.5927734375 },
  { name: "tochka13", x: 4188.52587890625, y: 523.1563110351562, z: 4835.6064453125 },
  { name: "tochka14", x: 4339.62890625, y: 546.82275390625, z: 4036.845947265625 },
  { name: "tochka15", x: 2615.05224609375, y: 476.6355285644531, z: 4041.9765625 },
  { name: "tochka16", x: 2558.137451171875, y: 506.5321960449219, z: 4039.410400390625 },
  { name: "tochka17", x: 2533.758544921875, y: 473.326416015625, z: 3894.573974609375 },
  { name: "tochka18", x: 2391.125244140625, y: 489.33612060546875, z: 3941.0966796875 }
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
