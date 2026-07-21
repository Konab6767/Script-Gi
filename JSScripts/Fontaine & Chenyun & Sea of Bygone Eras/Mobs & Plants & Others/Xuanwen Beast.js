// Convertido de: Xuanwen Beast.lua
// Total de posições: 18

const positions = [
  { name: "tochka1", x: 839.661376953125, y: 258.6793518066406, z: 2134.648193359375 },
  { name: "tochka2", x: 1146.48388671875, y: 276.3961181640625, z: 2222.551025390625 },
  { name: "tochka3", x: 1210.8099365234375, y: 296.48785400390625, z: 2161.43896484375 },
  { name: "tochka4", x: 1298.5299072265625, y: 350.47821044921875, z: 2096.9716796875 },
  { name: "tochka5", x: 1388.9537353515625, y: 338.7354736328125, z: 2293.5478515625 },
  { name: "tochka6", x: 1670.182373046875, y: 398.8016357421875, z: 2248.275634765625 },
  { name: "tochka7", x: 1546.78662109375, y: 446.03106689453125, z: 2033.2296142578125 },
  { name: "tochka8", x: 1611.7296142578125, y: 283.83477783203125, z: 1558.59912109375 },
  { name: "tochka9", x: 1516.7392578125, y: 300.6079406738281, z: 1734.098876953125 },
  { name: "tochka10", x: 1705.2923583984375, y: 436.65338134765625, z: 2225.930908203125 },
  { name: "tochka11", x: 1754.2032470703125, y: 354.9735107421875, z: 2062.880615234375 },
  { name: "tochka12", x: 1778.28173828125, y: 349.74737548828125, z: 2045.7171630859375 },
  { name: "tochka13", x: 2149.87548828125, y: 383.772216796875, z: 1963.5361328125 },
  { name: "tochka14", x: 1407.129150390625, y: 351.60589599609375, z: 2394.270263671875 },
  { name: "tochka15", x: 1407.76025390625, y: 351.4278564453125, z: 2391.222900390625 },
  { name: "tochka16", x: 1509.552734375, y: 281.00579833984375, z: 2375.310546875 },
  { name: "tochka17", x: 1357.149169921875, y: 334.88592529296875, z: 2351.963623046875 },
  { name: "tochka18", x: 1184.98681640625, y: 216.84768676757812, z: 1855.681640625 }
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
