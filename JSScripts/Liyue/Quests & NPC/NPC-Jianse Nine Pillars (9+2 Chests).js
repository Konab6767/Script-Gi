// Convertido de: NPC-Jianse Nine Pillars (9+2 Chests).lua
// Total de posições: 12

const positions = [
  { name: "tochka1", x: 411.6477355957031, y: 181.92550659179688, z: 851.4041748046875 },
  { name: "tochka2", x: 285.6116943359375, y: 229.1058349609375, z: 918.0546875 },
  { name: "tochka3", x: 339.9610290527344, y: 221.38021850585938, z: 966.9217529296875 },
  { name: "tochka4", x: 297.6020202636719, y: 209.5648956298828, z: 857.075927734375 },
  { name: "tochka5", x: 396.96173095703125, y: 199.79086303710938, z: 957.3231201171875 },
  { name: "tochka6", x: 451.64190673828125, y: 218.2541961669922, z: 892.7449340820312 },
  { name: "tochka7", x: 439.43060302734375, y: 190.43736267089844, z: 855.1328735351562 },
  { name: "tochka8", x: 403.49566650390625, y: 196.7261505126953, z: 810.460693359375 },
  { name: "tochka9", x: 454.806396484375, y: 214.14151000976562, z: 811.4388427734375 },
  { name: "tochka10", x: 342.9234924316406, y: 217.13768005371094, z: 820.2320556640625 },
  { name: "tochka11", x: 354.1767578125, y: 153.77197265625, z: 964.2376098632812 },
  { name: "tochka12", x: 332.84942626953125, y: 155.30992126464844, z: 1004.6221313476562 }
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
