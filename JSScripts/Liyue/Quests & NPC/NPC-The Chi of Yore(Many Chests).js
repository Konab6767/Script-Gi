// Convertido de: NPC-The Chi of Yore(Many Chests).lua
// Total de posições: 20

const positions = [
  { name: "tochka1", x: 1755.5955810546875, y: 247.04736328125, z: 786.7330322265625 },
  { name: "tochka2", x: 1497.0167236328125, y: 220.99293518066406, z: 579.2598876953125 },
  { name: "tochka3", x: 1525.66259765625, y: 243.9365997314453, z: 647.1832885742188 },
  { name: "tochka4", x: 1447.5208740234375, y: 228.59970092773438, z: 580.6156005859375 },
  { name: "tochka5", x: 1513.8670654296875, y: 234.0624237060547, z: 536.35888671875 },
  { name: "tochka6", x: 1759.17724609375, y: 247.2523651123047, z: 782.6328125 },
  { name: "tochka7", x: 1764.112060546875, y: 248.51722717285156, z: 781.6635131835938 },
  { name: "tochka8", x: 1755.5423583984375, y: 247.05575561523438, z: 776.968994140625 },
  { name: "tochka9", x: 1762.5782470703125, y: 247.077392578125, z: 787.2391357421875 },
  { name: "tochka10", x: 1761.8360595703125, y: 247.0511474609375, z: 776.9578247070312 },
  { name: "tochka11", x: 1678.6766357421875, y: 406.3862609863281, z: 517.94970703125 },
  { name: "tochka12", x: 1688.86572265625, y: 406.9590148925781, z: 514.8591918945312 },
  { name: "tochka13", x: 1673.0726318359375, y: 406.6774597167969, z: 507.8436279296875 },
  { name: "tochka14", x: 1675.5008544921875, y: 407.1411437988281, z: 527.9312133789062 },
  { name: "tochka15", x: 1668.22802734375, y: 406.8157043457031, z: 515.3469848632812 },
  { name: "tochka16", x: 1982.112548828125, y: 189.03427124023438, z: 829.0657348632812 },
  { name: "tochka17", x: 2037.305419921875, y: 201.41464233398438, z: 794.7715454101562 },
  { name: "tochka18", x: 2028.40283203125, y: 190.00320434570312, z: 821.7706909179688 },
  { name: "tochka19", x: 2128.99755859375, y: 187.0892333984375, z: 743.7141723632812 },
  { name: "tochka20", x: 1742.216552734375, y: 257.4029541015625, z: 529.0442504882812 }
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
