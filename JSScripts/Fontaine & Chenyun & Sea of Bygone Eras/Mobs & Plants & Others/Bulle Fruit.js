// Convertido de: Bulle Fruit.lua
// Total de posições: 28

const positions = [
  { name: "tochka1", x: 4909.9248046875, y: 438.78753662109375, z: 4895.310546875 },
  { name: "tochka2", x: 4524.35009765625, y: 441.44384765625, z: 3980.763916015625 },
  { name: "tochka3", x: 4452.689453125, y: 443.12689208984375, z: 4088.0888671875 },
  { name: "tochka4", x: 4458.4462890625, y: 442.4595947265625, z: 3960.283203125 },
  { name: "tochka5", x: 4450.0322265625, y: 442.3873291015625, z: 4929.2763671875 },
  { name: "tochka6", x: 4397.791015625, y: 447.923095703125, z: 4945.62451171875 },
  { name: "tochka7", x: 4269.87646484375, y: 446.3038330078125, z: 4744.71728515625 },
  { name: "tochka8", x: 4258.73388671875, y: 448.57427978515625, z: 4648.32568359375 },
  { name: "tochka9", x: 4375.59814453125, y: 447.7193603515625, z: 4971.544921875 },
  { name: "tochka10", x: 4438.49609375, y: 477.7378234863281, z: 5046.19580078125 },
  { name: "tochka11", x: 4566.74365234375, y: 489.7170715332031, z: 5074.08203125 },
  { name: "tochka12", x: 4923.724609375, y: 438.78759765625, z: 4853.19482421875 },
  { name: "tochka13", x: 4911.65673828125, y: 445.51092529296875, z: 4786.0576171875 },
  { name: "tochka14", x: 4805.70361328125, y: 441.8661193847656, z: 4586.6953125 },
  { name: "tochka15", x: 4663.07666015625, y: 443.9566345214844, z: 4503.65966796875 },
  { name: "tochka16", x: 4568.5146484375, y: 442.1309814453125, z: 4336.0546875 },
  { name: "tochka17", x: 4337.95263671875, y: 468.4467468261719, z: 4344.1904296875 },
  { name: "tochka18", x: 4427.833984375, y: 465.419677734375, z: 4327.15234375 },
  { name: "tochka19", x: 4622.53564453125, y: 462.2965393066406, z: 4277.58984375 },
  { name: "tochka20", x: 4776.6640625, y: 454.1650390625, z: 3982.82470703125 },
  { name: "tochka21", x: 4689.03125, y: 442.8963928222656, z: 3915.869873046875 },
  { name: "tochka22", x: 4706.13720703125, y: 451.6117248535156, z: 3848.0986328125 },
  { name: "tochka23", x: 4832.35693359375, y: 454.48419189453125, z: 3915.673583984375 },
  { name: "tochka24", x: 4864.4794921875, y: 445.225341796875, z: 3848.900634765625 },
  { name: "tochka25", x: 4769.90771484375, y: 449.4099426269531, z: 3540.29736328125 },
  { name: "tochka26", x: 4922.166015625, y: 446.7939758300781, z: 3569.166259765625 },
  { name: "tochka27", x: 4761.38525390625, y: 455.3424987792969, z: 3667.986572265625 },
  { name: "tochka28", x: 4665.5078125, y: 447.3453063964844, z: 4154.685546875 }
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
