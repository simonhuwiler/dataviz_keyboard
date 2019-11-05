const keylist = require('./roccatvulcan/keyboardlayout/ch-de/keys.js');
const grid = require('./roccatvulcan/keyboardlayout/ch-de/grid.js');
const consts = require('./roccatvulcan/consts.js')

module.exports = class Intro
{
  constructor(keyboard)
  {
    this.keyboard = keyboard;
    this.currentChapter = '';
  }

  intro()
  {
    this.currentChapter = 'intro';

    const positions = [
      ['F6', 'F7', 'F8'],
      ['F5', 'F6', 'F7'],
      ['F6', '6', '7', '8'],
      ['7', 'T', 'Z', 'U'],
      ['6', 'R', 'T', 'Z'],
      ['T', 'G', 'F', 'H'],
      ['R', 'D', 'F', 'G'],
      ['E', 'S', 'D', 'F'],
      ['W', 'A', 'S', 'D']
    ];

    var currentPos = 0;
    const run = callback => {
      setTimeout(() => {

        //Other chapter already running?
        if(this.currentChapter !== 'intro')
          return;

        this.keyboard.updateKeys(positions[currentPos], '#ff0000', '#000000');
        this.keyboard.render();
        if(currentPos < positions.length - 1)
        {
          currentPos++;
          run(callback)
        }
        else
          callback();
      }, 100);
    }

    run(() => {
      const keys = Object.keys(keylist.KEYMAPPER).filter(key => !['W', 'A', 'S', 'D'].includes(key))

      
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#000000', '#323232', 500), 1000);
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#323232', '#000000', 500), 500);
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#000000', '#323232', 500), 3000);
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#323232', '#000000', 500), 500);
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#000000', '#323232', 500), 3000);
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(keys, '#323232', '#000000', 500), 500);
      this.keyboard.animationQueueStart();
    })


    /* Test color scale */
    // const colorScale = ['#ff0000', '#ff0000', '#ff4000', '#ff5000', '#ff5d00', '#ff6900', '#ff7300', '#ff7e00', '#ff8700', '#ff9000', '#ff9900', '#ffa200', '#ffaa00', '#ffb200', '#ffba00', '#ffc200', '#ffca00', '#ffd200', '#ffd900', '#ffe100', '#ffe900', '#fff000']
    // var currentIndex = 0;
    // const fadeIn = callback => {
    //   setTimeout(() => {
    //     var keys = []
    //     const gridRows = grid.KEYGRID.map(row => row.filter((cell, j) => j >= currentIndex * 1 && j < currentIndex * 1 + 1))
    //     keys = keys.concat(...gridRows)
    //     keyboard.animateKeys(keys, '#000000', colorScale[currentIndex], 50);
        
    //     currentIndex++;

    //     if(currentIndex < 22)
    //       fadeIn(callback)
    //     else
    //       callback();
    //   }, 55);
    // };

    // fadeIn(() => {
    //   //Fade out all except WASD

    //       keyboard.animationQueueAdd(() => keyboard.animateKeys(['W', 'A', 'S', 'D'], '#ff2c00', '#0000ff', 100), 100);
    //       keyboard.animationQueueAdd(() => keyboard.animateKeys(['W', 'A', 'S', 'D'], '#0000ff', '#ff0000', 100), 110);
    //       keyboard.animationQueueStart();
    //       // keyboard.animationQueueAdd(() => keyboard.updateKeys(getRandomKeys(50), '#ffcc00'), 1000);
    //       // keyboard.animationQueueAdd(() => keyboard.updateKeys(['5'], '#ffcc00'), 2000);
    // });
    
    /* ********************** RUNDHERUM EINFADEN */
    // var values = ['ESC'];

    // //Add F1 - F12
    // for(let i = 1; i <= 12; i++)
    //   values.push('F' + i)

    // //Add next keys
    // values = values.concat(['PRTSCR', 'SCROLLLOCK', 'PAUSE', 'NUMLOCK', 'KPSLASH', 'KPASTERISK', 'KPMINUS', 'KPPLUS', 'KPENTER', 'KPDOT', 'KP0',
    //   'RIGHT', 'DOWN', 'LEFT', 'RIGHTCTRL', 'COMPOSE', 'FN', 'RIGHTALT', 'SPACE', 'LEFTALT', 'LEFTMETA', 'LEFTCTRL', 'LEFTSHIFT', 'CAPSLOCK',
    //   'TAB', '§']);

    // //Add Numbers
    // for(let i = 1; i <= 9; i++)
    //   values.push(i.toString())

    // //Add Next
    // values = values.concat(['0', "'", '^', 'BACKSPACE', 'INSERT', 'HOME', 'PAGEUP', 'KP7', 'KP8', 'KP9', 'KP6', 'KP3', 'KP2', 'KP1', 'UP',
    //   'RIGHTSHIFT', '-', '.', ',', 'M', 'N', 'B', 'V', 'C', 'X', 'Y', '<', 'A', 'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü', '¨',
    //   'ENTER', 'DELETE', 'END', 'PAGEDOWN', 'KP4', 'KP5', '$', 'Ä', 'Ö', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S'])

    // var currentIndex = 0;
    // const addKey = onFinish => {
    //   setTimeout(() => {
    //     keyboard.updateKey(keylist.KEYMAPPER[values[currentIndex]], '#ff0000');
    //     if(currentIndex < values.length)
    //     {
    //       currentIndex++;
    //       addKey(onFinish);
    //     }
    //     else
    //       onFinish()
    //   }, 10);
    // }

    // addKey(() => {
    //   //Fade out all except WASD
    //   setTimeout(() => {
    //     const keys = Object.keys(keylist.KEYMAPPER).filter(key => !['W', 'A', 'S', 'D'].includes(key))
    //     keyboard.animateKeys(keys, '#ff0000', '#000000', 1500);
    //   }, 1000);
    // });



    // var values = grid.KEYGRID.map(row => row.filter(key => key >= 0).map(key => key))
    // //Add F1 - F12
    // values = [].concat(...values);

    // var currentIndex = 0;
    // const addKey = onFinish => {
    //   setTimeout(() => {
    //     keyboard.updateKey(values[currentIndex], '#ff0000');
    //     if(currentIndex < values.length)
    //     {
    //       currentIndex++;
    //       addKey(onFinish);
    //     }
    //     else
    //       onFinish()
    //   }, 10);
    // }

    // addKey(() => {
    //   console.log("fertig")
    // });
    //XX

    // var currentIndex = 0;
    // const addKey = onFinish => {
    //   setTimeout(() => {
    //     keyboard.updateKey(values[currentIndex], '#ff0000');
    //     if(currentIndex < values.length)
    //     {
    //       currentIndex++;
    //       addKey(onFinish);
    //     }
    //     else
    //       onFinish()
    //   }, 10);
    // }

    // addKey(() => {
    //   console.log("fertig")
    // });

    // const colors = ['#00ffea', '#00ff48', '#ff000c', '#ff00d2', '#7200ff', '#00ffa2', '#ffea00', '#ff1200']

    // for(let i = 0; i < 200; i++)
    //   keyboard.animationQueueAdd(() => keyboard.updateKeys(getRandomKeys(1), colors[getRandomInt(0, colors.length)]), 50);
    // // keyboard.animationQueueAdd(() => keyboard.updateKeys(getRandomKeys(50), '#ffcc00'), 1000);
    // // keyboard.animationQueueAdd(() => keyboard.updateKeys(['5'], '#ffcc00'), 2000);

    // keyboard.animationQueueStart(function() {
    // })
  }

  stopChapters()
  {
    this.keyboard.animationQueueStop();
    this.keyboard.renderStop();
    this.keyboard.fillAll('#000000');
    this.keyboard.render();

  }

  pong()
  {
    //Stop any animation in que
    this.stopChapters();

    this.currentChapter = 'pong';
    const paddelColor = '#00eb16';
    const ballColor = '#ffde00';
    this.keyboard.renderStart(200);

    const paddelLeft = [
      ['Q', 'A'],
      ['Q', 'A'],
      ['1', 'Q'],
      ['Q', 'A'],
      ['1', 'Q'],
      ['1', 'Q'],
      ['1', 'Q'],
      ['1', 'Q'],
      ['1', 'Q'],
      ['Q', 'A'],
      ['A', '<'],
      ['<', 'LEFTMETA'],
      ['<', 'LEFTMETA'],
      ['<', 'LEFTMETA'],
      ['<', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
      ['Q', 'A'],
    ]

    const ball = [
      ['H'],
      ['G'],
      ['F'],
      ['R'],
      ['E'],
      ['W'],
      ['2'],
      ['2'],
      ['W'],
      ['D'],
      ['C'],
      ['F'],
      ['T'],
      ['6'],
      ['Z'],
      ['H'],
      ['N'],
      ['J'],
      ['I'],
      ['9'],
      ['O'],
      ['P'],
      ['O'],
      ['K'],
      ['M'],
      ['N'],
    ]

    const paddelRight = [
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ü', 'Ä'],
      ['Ä', '-'],
      ['-', 'FN'],
      ['Ä', '-'],
      ['-', 'FN'],
      ['-', 'Ä'],
      ['Ä', 'Ü'],
      ['Ü', "'"],
      ['Ü', "'"],
      ['Ü', "'"],
      ["Ü", 'Ä'],
      ["Ü", 'Ä'],
    ]

    var resetList = paddelLeft.concat(ball).concat(paddelRight)
    var resetList = [].concat(... resetList);
    var resetList = [... new Set(resetList)];

    var iPaddelLeft = 0;
    setInterval(() => {

      if(this.currentChapter !== 'pong')
        return;

      iPaddelLeft = iPaddelLeft > paddelLeft.length - 1 ? 0 : iPaddelLeft;

      //Reset all keys
      this.keyboard.updateKeys(resetList, '#000000');

      //Update Paddels
      this.keyboard.updateKeys(paddelLeft[iPaddelLeft], paddelColor);
      this.keyboard.updateKeys(paddelRight[iPaddelLeft], paddelColor);

      //Update Ball
      this.keyboard.updateKeys(ball[iPaddelLeft], ballColor);
      // if(iPaddelLeft > 0 && ball[iPaddelLeft] !== ball[iPaddelLeft - 1])
      //   keyboard.updateKeys(ball[iPaddelLeft - 1], ballColorFade);
      iPaddelLeft++;
    }, 400);


    // const NUMBERS = {
    //   '0': ['KP7', 'KP8', 'KP9', 'KP6', 'KP3', 'KP2', 'KP1', 'KP4'],
    //   '1': ['KP8', 'KP9', 'KP6', 'KP3'],
    //   '2': ['KP7', 'KP8', 'KP9', 'KP5', 'KP1', 'KP2', 'KP3']
    // }

    // keyboard.updateKeys(NUMBERS['2'], numberColor);


  }
}