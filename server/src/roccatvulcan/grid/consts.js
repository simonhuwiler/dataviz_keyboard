const consts = require('../consts.js');

module.exports.SPACEBETWEEN = 2;

module.exports.NOKEY = -1;

module.exports.KEYGRID  = [
  //Row #0
  [
    consts.KEYMAPPER.ESC,
    this.NOKEY,
    consts.KEYMAPPER.F1,
    consts.KEYMAPPER.F2,
    consts.KEYMAPPER.F3,
    consts.KEYMAPPER.F4,
    this.NOKEY,
    consts.KEYMAPPER.F5,
    consts.KEYMAPPER.F6,
    consts.KEYMAPPER.F7,
    consts.KEYMAPPER.F8,
    consts.KEYMAPPER.F9,
    consts.KEYMAPPER.F10,
    consts.KEYMAPPER.F11,
    consts.KEYMAPPER.F12,
    consts.KEYMAPPER.PRTSCR,
    consts.KEYMAPPER.SCROLLLOCK,
    consts.KEYMAPPER.PAUSE,
    this.NOKEY,
    this.NOKEY,
    this.NOKEY,
    this.NOKEY, 
  ],

  //Row #1
  [
    consts.KEYMAPPER['§'],
    consts.KEYMAPPER['1'],
    consts.KEYMAPPER['2'],
    consts.KEYMAPPER['3'],
    consts.KEYMAPPER['4'],
    consts.KEYMAPPER['5'],
    consts.KEYMAPPER['6'],
    consts.KEYMAPPER['7'],
    consts.KEYMAPPER['8'],
    consts.KEYMAPPER['9'],
    consts.KEYMAPPER['0'],
    consts.KEYMAPPER["'"],
    consts.KEYMAPPER['^'],
    consts.KEYMAPPER.BACKSPACE,
    consts.KEYMAPPER.BACKSPACE,
    consts.KEYMAPPER.INSERT,
    consts.KEYMAPPER.HOME,
    consts.KEYMAPPER.PAGEUP,
    consts.KEYMAPPER.NUMLOCK,
    consts.KEYMAPPER.KPSLASH,
    consts.KEYMAPPER.KPASTERISK,
    consts.KEYMAPPER.KPMINUS
  ],

  //Row #2
  [
    consts.KEYMAPPER.TAB,
    consts.KEYMAPPER['Q'],
    consts.KEYMAPPER['W'],
    consts.KEYMAPPER['E'],
    consts.KEYMAPPER['R'],
    consts.KEYMAPPER['T'],
    consts.KEYMAPPER['Z'],
    consts.KEYMAPPER['U'],
    consts.KEYMAPPER['I'],
    consts.KEYMAPPER['O'],
    consts.KEYMAPPER['P'],
    consts.KEYMAPPER['Ü'],
    consts.KEYMAPPER['¨'],
    this.NOKEY,
    consts.KEYMAPPER.ENTER,
    consts.KEYMAPPER.DELETE,
    consts.KEYMAPPER.END,
    consts.KEYMAPPER.PAGEDOWN,
    consts.KEYMAPPER.KP7,
    consts.KEYMAPPER.KP8,
    consts.KEYMAPPER.KP9,
    consts.KEYMAPPER.KPPLUS,
  ],

  ///Row #3
  [
    consts.KEYMAPPER.CAPSLOCK,
    consts.KEYMAPPER.CAPSLOCK,
    consts.KEYMAPPER['A'],
    consts.KEYMAPPER['S'],
    consts.KEYMAPPER['D'],
    consts.KEYMAPPER['F'],
    consts.KEYMAPPER['G'],
    consts.KEYMAPPER['H'],
    consts.KEYMAPPER['J'],
    consts.KEYMAPPER['K'],
    consts.KEYMAPPER['L'],
    consts.KEYMAPPER['Ö'],
    consts.KEYMAPPER['Ä'],
    consts.KEYMAPPER['$'],
    this.NOKEY,
    consts.KEYMAPPER.ENTER,
    this.NOKEY,
    this.NOKEY,
    this.NOKEY,
    consts.KEYMAPPER.KP4,
    consts.KEYMAPPER.KP5,
    consts.KEYMAPPER.KP6,
    // this.NOKEY
  ],

  //Row #4
  [
    consts.KEYMAPPER.LEFTSHIFT,
    consts.KEYMAPPER['<'],
    consts.KEYMAPPER['Y'],
    consts.KEYMAPPER['X'],
    consts.KEYMAPPER['C'],
    consts.KEYMAPPER['V'],
    consts.KEYMAPPER['B'],
    consts.KEYMAPPER['N'],
    consts.KEYMAPPER['M'],
    consts.KEYMAPPER[','],
    consts.KEYMAPPER['.'],
    consts.KEYMAPPER['-'],
    consts.KEYMAPPER.RIGHTSHIFT,
    consts.KEYMAPPER.RIGHTSHIFT,
    consts.KEYMAPPER.RIGHTSHIFT,
    this.NOKEY,
    consts.KEYMAPPER.UP,
    this.NOKEY,
    consts.KEYMAPPER.KP1,
    consts.KEYMAPPER.KP2,
    consts.KEYMAPPER.KP3,
    consts.KEYMAPPER.KPENTER,
  ],

  //Row #5
  [
    consts.KEYMAPPER.LEFTCTRL,
    consts.KEYMAPPER.LEFTMETA,
    consts.KEYMAPPER.LEFTALT,
    this.NOKEY,
    this.NOKEY,
    this.NOKEY,
    consts.KEYMAPPER.SPACE,
    this.NOKEY,
    this.NOKEY,
    this.NOKEY,
    consts.KEYMAPPER.RIGHTALT,
    consts.KEYMAPPER.FN,
    consts.KEYMAPPER.COMPOSE,
    consts.KEYMAPPER.RIGHTCTRL,
    consts.KEYMAPPER.LEFT,
    consts.KEYMAPPER.DOWN,
    consts.KEYMAPPER.RIGHT,
    consts.KEYMAPPER.KP0,
    consts.KEYMAPPER.KP0,
    consts.KEYMAPPER.KP0,
    consts.KEYMAPPER.KPDOT,
    this.NOKEY
  ]
]

module.exports.marquee = {
  'A': [
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ],
  "N": [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  // "N": [
  //   [1, 0, 1, 1, 0],
  //   [1, 1, 0, 0, 1],
  //   [1, 0, 0, 0, 1],
  //   [1, 0, 0, 0, 1],
  //   [1, 0, 0, 0, 1],
  // ],
  "E": [
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0]
  ],
  "0": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "2": [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1],
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 1],
    [1, 1, 1]
  ]
}