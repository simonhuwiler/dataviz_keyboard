const keys = require('../roccatvulcan/keyboardlayout/ch-de/keys.js');

module.exports.healthyFruitCount = 4;

const fruits = {
  frNone: {
    id: 0,
    color: '#000000'
  },
  frTomato: {
    id: 1,
    color: '#ff0000'
  },
  frOrange: {
    id: 2,
    color: '#ffa200'
  },
  frBanana: {
    id: 3,
    color: '#fffc00'
  },
  frKiwi: {
    id: 4,
    color: '#5f7000'
  },
  frPear: {
    id: 5,
    color: '#25e63c'
  },
  frPlum: {
    id: 6,
    color: '#0000ff'
  }
}

module.exports.fruits = fruits;

module.exports.tomateFadeDuration = 1000;
module.exports.lifespanTomate = 1200;
module.exports.lifespanFruit = 8000;
module.exports.excludeKeys = [
  keys.KEYMAPPER.TAB,
  keys.KEYMAPPER.PRTSCR,
  keys.KEYMAPPER.F5,
  keys.KEYMAPPER.PAGEDOWN,
  keys.KEYMAPPER.PAGEUP,
  keys.KEYMAPPER.F11
];