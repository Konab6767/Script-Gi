// Convertido de: Pluie Lotus.lua
// Total de posições: 32

const positions = [
  { name: "tochka1", x: 4566.06640625, y: 440.6770324707031, z: 4983.58203125 },
  { name: "tochka2", x: 4477.8798828125, y: 440.5054931640625, z: 4946.771484375 },
  { name: "tochka3", x: 4461.619140625, y: 440.6899719238281, z: 4922.19482421875 },
  { name: "tochka4", x: 4236.9970703125, y: 526.2716064453125, z: 4955.7509765625 },
  { name: "tochka5", x: 4251.35400390625, y: 526.5215454101562, z: 5045.71923828125 },
  { name: "tochka6", x: 4268.01708984375, y: 526.9796142578125, z: 5016.7763671875 },
  { name: "tochka7", x: 4177.10205078125, y: 526.32177734375, z: 4977.61328125 },
  { name: "tochka8", x: 4563.2978515625, y: 440.8125305175781, z: 4995.7724609375 },
  { name: "tochka9", x: 4452.54833984375, y: 540.6829223632812, z: 3824.4521484375 },
  { name: "tochka10", x: 4592.6728515625, y: 440.8013000488281, z: 3950.550048828125 },
  { name: "tochka11", x: 4644.35791015625, y: 440.71270751953125, z: 4126.95166015625 },
  { name: "tochka12", x: 4459.53515625, y: 440.7514953613281, z: 4210.451171875 },
  { name: "tochka13", x: 4607.17529296875, y: 440.8902587890625, z: 4516.310546875 },
  { name: "tochka14", x: 4649.7490234375, y: 440.89129638671875, z: 4516.416015625 },
  { name: "tochka15", x: 4899.509765625, y: 440.80010986328125, z: 4801.5859375 },
  { name: "tochka16", x: 4104.58935546875, y: 441.1420593261719, z: 4494.7197265625 },
  { name: "tochka17", x: 4613.10791015625, y: 440.7051086425781, z: 3939.052734375 },
  { name: "tochka18", x: 4651.833984375, y: 440.7353210449219, z: 3935.287353515625 },
  { name: "tochka19", x: 4740.87890625, y: 441.5618896484375, z: 3871.540771484375 },
  { name: "tochka20", x: 4812.8017578125, y: 440.0877380371094, z: 3818.235595703125 },
  { name: "tochka21", x: 4832.8681640625, y: 440.7406005859375, z: 3783.095703125 },
  { name: "tochka22", x: 4886.30224609375, y: 440.798828125, z: 3780.642333984375 },
  { name: "tochka23", x: 4875.00244140625, y: 440.705078125, z: 3675.30029296875 },
  { name: "tochka24", x: 4851.44189453125, y: 440.7838134765625, z: 3646.313232421875 },
  { name: "tochka25", x: 4854.52685546875, y: 440.80511474609375, z: 3603.12548828125 },
  { name: "tochka26", x: 4836.88134765625, y: 440.5943908691406, z: 3577.27685546875 },
  { name: "tochka27", x: 4816.25, y: 440.7252502441406, z: 3604.57373046875 },
  { name: "tochka28", x: 4811.81591796875, y: 440.81060791015625, z: 3631.251220703125 },
  { name: "tochka29", x: 4821.083984375, y: 440.7794189453125, z: 3656.256591796875 },
  { name: "tochka30", x: 4452.0556640625, y: 540.387451171875, z: 3783.384033203125 },
  { name: "tochka31", x: 4397.45556640625, y: 541.025390625, z: 3726.37744140625 },
  { name: "tochka32", x: 4462.54296875, y: 540.655029296875, z: 3655.020263671875 }
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
