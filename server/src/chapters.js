const keylist = require('./roccatvulcan/keyboardlayout/ch-de/keys.js');
const grid = require('./roccatvulcan/keyboardlayout/ch-de/grid.js');
const consts = require('./roccatvulcan/consts.js')
const fruitHelpers = require('./fruitsalad/helpers.js')
const testtext = 'We dont want to conquer the cosmos, we simply want to extend the boundaries of earth to the frontiers of the cosmos.';

intervalList = [];

denmark = {
  color1: {
    keys: ['Q', 'E', 'R', 'T', '<', 'X', 'C', 'V'],
    color: 'ff0000'
  },
  color2: {
    keys: ['W', 'A', 'S', 'D', 'F', 'Y'],
    color: '#ffffff'
  }
}
finland = {
  color1: {
    keys: ['U', 'O', 'P', 'Ü', 'N', ',', '.', '-'],
    color: 'ffffff'
  },
  color2: {
    keys: ['J', 'I', 'K', 'M', 'L', 'Ö', 'Ä'],
    color: '#0000FF'
  }
}

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

    const colors = ['#ff4f4f', '#ff605d', '#ff6f6c', '#ff7d7a', '#ff8987', '#ff9595'];

    //Bottom to Top
    for(let i = grid.KEYGRID.length - 1; i >= 0; i--)
    {
      this.keyboard.animationQueueAdd(() => this.keyboard.animateKeys(grid.KEYGRID[i], '#000000', colors[i], 1000), 100);
    }

    //Left to right
    for(let i = 0; i < grid.KEYGRID[0].length; i++)
    {
      this.keyboard.animationQueueAdd(() =>  {

        //Current Keys
        var keys = []
        for(let g in grid.KEYGRID)
          keys.push(grid.KEYGRID[g][i]);

        // this.keyboard.updateKeys(keys, '#ff0000')
        this.keyboard.animateKeys(keys, '#ff9595', '#ff0000', 50)

      }, i === 0 ? 1100 : 50);
    }

    //Right to left
    for(let i = grid.KEYGRID[0].length; i >= 0; i--)
    {
      this.keyboard.animationQueueAdd(() =>  {

        //Current Keys
        var keys = []
        for(let g in grid.KEYGRID)
        {
          var k = grid.KEYGRID[g][i];

          if(![13, 8, 14, 20].includes(k))
          {
            keys.push(k);
          }
        }

        // this.keyboard.updateKeys(keys, '#ff0000')
        this.keyboard.animateKeys(keys, '#ff0000', '#000000', 50)
      }, 50);
    }

    //Animate WASD
    // const keys = ['W', 'A', 'S', 'D']
    // this.keyboard.animationQueueAdd(() =>  this.keyboard.updateKeys(keys, '#ffffff'), 2000);
    // this.keyboard.animationQueueAdd(() =>  this.keyboard.updateKeys(keys, '#ff0000'), 100);
    // this.keyboard.animationQueueAdd(() =>  this.keyboard.updateKeys(keys, '#ffffff'), 3000);
    // this.keyboard.animationQueueAdd(() =>  this.keyboard.updateKeys(keys, '#ff0000'), 100);


    this.keyboard.animationQueueStart(() => {
      //Animation end. Start random colors
      var keys = Object.keys(keylist.KEYMAPPER).filter(k => !['W', 'A', 'S', 'D', 'WHEELDOWN', 'WHEELUP'].includes(k))
      
      var activeKeys = []

      const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const interval = setInterval(() => {

        //Remove old Keys
        for(var ak in activeKeys)
        {
          this.keyboard.updateKey(activeKeys[ak], '#000000');
        }
        activeKeys = [];

        for(var i = 0; i < 3; i++)
        {
          const k = fruitHelpers.getRandom(0, keys.length - 1)
          const randomKey = keys[k]
          const randomColor = getRandomColor()

          //Add new Key
          this.keyboard.updateKey(randomKey, randomColor)
          activeKeys.push(randomKey)
        }
      }, 50)
      
      intervalList.push(interval);
    
    });
  }

  stopChapters()
  {
    this.keyboard.animationQueueStop();
    this.keyboard.fillAll('#000000');
    for(var i in intervalList)
    {
      if(intervalList[i])
        clearInterval(intervalList[i])
    }
  }

  pong()
  {
    //Stop any animation in queue
    this.stopChapters();

    this.currentChapter = 'pong';
    const paddelColor = '#00eb16';
    const ballColor = '#ffde00';
    

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
    const interval = setInterval(() => {

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
    
    intervalList.push(interval);


  }

  barchart(year)
  {
    /*
      Values:
       * 130
       * 194
       * 325 = 1
       * 493
       * 655 = 2
       * 865 = 3
       * 1096 = 4
       * 1790 = 6
      Source: https://www.statista.com/statistics/490522/global-esports-market-revenue/
    */

    //Stop any animation in queue
    this.currentChapter = 'barchart';

    switch(year)
    {
      case 2012:
          this.stopChapters();
          console.log("2012")
          this.keyboard.animateKeys(['LEFTCTRL', 'LEFTMETA'], '#000000', '#270000', 200);
          break;
      case 2014:
          this.keyboard.animateKeys(['LEFTALT'], '#000000', '#5a0000', 200);
          break;
      case 2015:
          this.keyboard.animateKeys(['SPACE'], '#000000', '#5a0000', 200);
          this.keyboard.animateKeys(['C', 'V'], '#000000', '#270000', 200);
          break;
      case 2016:
          this.keyboard.animateKeys(['B', 'N'], '#000000', '#ff0000', 200);
          break;
      case 2017:
          this.keyboard.animateKeys(['M', ',', 'K'], '#000000', '#ff0000', 200);
          break;
      case 2018:
          this.keyboard.animateKeys(['RIGHTALT', 'FN', '.', '-', 'L', 'Ö', 'Ä'], '#000000', '#ff0000', 200);
          break;
      case 2019:
          this.keyboard.animateKeys(['$', '¨', 'COMPOSE', 'RIGHTSHIFT'], '#000000', '#ff0000', 200);
           break;
      case 2022:
          this.keyboard.animateKeys(['RIGHTCTRL', 'ENTER', 'BACKSPACE', 'F12', 'PRTSCR', 'INSERT',
            'DELETE', 'HOME', 'END', 'PAUSE', 'PAGEUP', 'SCROLLLOCK', 'PAGEDOWN', 'NUMLOCK', 'UP', 'LEFT', 'DOWN', 'RIGHT', 'KPSLASH',
            'KPASTERISK', 'KPMINUS', 'KPPLUS', 'KPENTER', 'KPDOT', 'KP0', 'KP1', 'KP2', 'KP3', 'KP4', 'KP5', 'KP6', 'KP7', 'KP8', 'KP9'],
            '#000000', '#ff0000', 200)
          break;

    }
  }

  sixKeys()
  {
     //Stop any animation in queue
     this.stopChapters();

     this.currentChapter = 'sixkeys';
     
     this.keyboard.animateKeys(['G', 'H', 'J', 'B', 'Z', 'N'], '#000000', '#2800d7', 1000);     
  }

  sixKeysAfter()
  {
    const sleep = 100;
    const animationTime = 1000;
    const color = '#2800d7';

    this.currentChapter = 'sixkeysafter';

    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['T', 'F', 'V', 'SPACE', 'M', 'K', 'U', '7', '6'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['C', 'D', 'R', '5', '8', 'I', 'L', ','], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['X', 'S', 'E', '4', 'F4', 'F5', 'F6', 'F7', '9', 'O', 'Ö', '.'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['LEFTALT', 'Y', 'A', 'W', '3', 'F3', 'F8', '0', 'P', 'Ä', '-', 'RIGHTALT'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['LEFTMETA', '<', 'CAPSLOCK', 'Q', '2', 'F2', 'F9', "'", 'Ü', 'FN'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['LEFTCTRL', 'LEFTSHIFT', 'TAB', '1', 'F1', 'F10', '^', '¨', '$', 'RIGHTSHIFT', 'COMPOSE'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['§', 'ESC', 'F11', 'BACKSPACE', 'ENTER', 'RIGHTCTRL'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['F12', 'INSERT', 'DELETE', 'LEFT'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['HOME', 'END', 'PRTSCR', 'UP', 'DOWN'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['SCROLLLOCK', 'PAGEUP', 'PAGEDOWN', 'RIGHT'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['PAUSE', 'NUMLOCK', 'KP7', 'KP4', 'KP1', 'KP0'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['KPSLASH', 'KP8', 'KP5', 'KP2'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['KPASTERISK', 'KP9', 'KP6', 'KP3', 'KPDOT'], '#000000', color, animationTime), sleep);
    this.keyboard.animationQueueAdd(() =>  this.keyboard.animateKeys(['KPMINUS', 'KPPLUS', 'KPENTER'], '#000000', color, animationTime), sleep);
    
    this.keyboard.animationQueueStart();
  }



  flags()
  {
    this.stopChapters();
    this.keyboard.fillAll('#000000')
    this.currentChapter = 'sixkeysafter';

    // this.keyboard.updateKeys(denmark.color1.keys, denmark.color1.color);
    // this.keyboard.updateKeys(denmark.color2.keys, denmark.color2.color);
    
    // this.keyboard.updateKeys(finland.color1.keys, finland.color1.color);
    // this.keyboard.updateKeys(finland.color2.keys, finland.color2.color);

    
    const duration = 500;
    this.keyboard.animateKeys(denmark.color1.keys, '#000000', denmark.color1.color, duration);
    this.keyboard.animateKeys(denmark.color2.keys, '#000000', denmark.color2.color, duration);

    this.keyboard.animateKeys(finland.color1.keys, '#000000', finland.color1.color, duration);
    this.keyboard.animateKeys(finland.color2.keys, '#000000', finland.color2.color, duration);
    
  }

  fadeFlags()
  {
    const duration = 500;
    this.keyboard.animateKeys(denmark.color1.keys, denmark.color1.color, '#000000', duration);
    this.keyboard.animateKeys(denmark.color2.keys, denmark.color2.color, '#000000', duration);

    this.keyboard.animateKeys(finland.color1.keys, finland.color1.color, '#000000', duration);
    this.keyboard.animateKeys(finland.color2.keys, finland.color2.color, '#000000', duration);
  }

  speedTest(speed)
  {
    this.stopChapters();
    var text = testtext.split("").map(char => {
      if(char === ' ')
        return 'SPACE'
      return char.toUpperCase()
    });

    const keysPerSecond = 60 / speed;
    var currentKey = 0;
    const interval = setInterval(() => {
      this.keyboard.updateKey(text[currentKey], '#ff0000', '#000000');
      currentKey++;
      if(currentKey > testtext.length)
        currentKey = 0;

    }, keysPerSecond * 1000);

    intervalList.push(interval)
  }

  highlightWASD()
  {
    this.stopChapters();
    this.keyboard.animateKeys(['W', 'A', 'S', 'D'], '#000000', '#ffcc00', 1000)
  }
}