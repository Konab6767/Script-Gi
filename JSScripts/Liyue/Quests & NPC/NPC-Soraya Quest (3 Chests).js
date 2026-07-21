// Convertido de: NPC-Soraya Quest (3 Chests).lua
// Total de posições: 18

const positions = [
  { name: "tochka1", x: 326.7930603027344, y: 216.04296875, z: 289.896484375 },
  { name: "tochka2", x: 350.2293701171875, y: 217.89276123046875, z: 265.67901611328125 },
  { name: "tochka3", x: 372.5034484863281, y: 217.83790588378906, z: 184.5894775390625 },
  { name: "tochka4", x: 305.046875, y: 218.63816833496094, z: 167.1350555419922 },
  { name: "tochka5", x: 287.5380859375, y: 218.5274658203125, z: 112.7025146484375 },
  { name: "tochka6", x: 282.62701416015625, y: 222.34957885742188, z: 224.28836059570312 },
  { name: "tochka7", x: 326.6651916503906, y: 215.89491271972656, z: 290.9881286621094 },
  { name: "tochka8", x: 180.76614379882812, y: 240.45924377441406, z: 82.41431427001953 },
  { name: "tochka9", x: 234.19577026367188, y: 208.1059112548828, z: 465.0557556152344 },
  { name: "tochka10", x: 325.20086669921875, y: 216.12049865722656, z: 291.0 },
  { name: "tochka11", x: 873.72216796875, y: 265.9260559082031, z: 328.945556640625 },
  { name: "tochka12", x: 686.9395751953125, y: 214.90716552734375, z: 398.72955322265625 },
  { name: "tochka13", x: 491.0567626953125, y: 208.80531311035156, z: 142.34014892578125 },
  { name: "tochka14", x: 308.40924072265625, y: 228.63681030273438, z: 452.589111328125 },
  { name: "tochka15", x: 186.27220153808594, y: 248.3822479248047, z: 77.10554504394531 },
  { name: "tochka16", x: 873.722412109375, y: 265.93060302734375, z: 328.9457092285156 },
  { name: "tochka17", x: 467.4732666015625, y: 200.9632568359375, z: 237.24630737304688 },
  { name: "tochka18", x: 873.7223510742188, y: 265.9245300292969, z: 328.9456481933594 }
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
