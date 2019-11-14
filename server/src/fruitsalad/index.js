const grid = require('../roccatvulcan/keyboardlayout/ch-de/grid.js');
const gameConsts = require('./consts.js');
const consts = require('../roccatvulcan/consts.js')
const helpers = require('../roccatvulcan/helpers.js');

module.exports = class FruitSalat
{
  constructor()
  {  
    this.resetGame();
    this.healthyFruits = Object.keys(gameConsts.fruits);

    this.healthyFruits = this.healthyFruits.filter(v => !['frNone', 'frTomato'].includes(v));
    this.healthyFruitsId = this.healthyFruits.map(f => gameConsts.fruits[f].id);
  }

  resetGame()
  {
    this.score = {
      tomatoesSmashed: 0,
      fruitsSmashed: 0,
      points: 0
    }

    //Copy Grid to Playfield
    this.playfield = grid.KEYGRID.map(row => row.map(cell => null))
    for(let row in this.playfield)
    {
      for(let cell in this.playfield[row])
      {
        this.playfield[row][cell] = Object.assign({}, gameConsts.fruits.frNone);
      }
    }

    this.speed = 1500;
    this.render();
  }

  setKeyboard(k)
  {
    this.keyboard = k;
  }

  isPotentialKey(key)
  {
    if(key == consts.NOKEY)
      return false;

    if(gameConsts.excludeKeys.includes(key))
      return false;

    return true;
  }

  interval()
  {

    //Find Random Spot with a key on it
    var found = false;
    var cellX = -1;
    var cellY = -1;
    while(!found)
    {
      cellX = getRandom(0, this.playfield[0].length - 1);
      cellY = getRandom(0, this.playfield.length - 1);
  
      if(this.isPotentialKey(grid.KEYGRID[cellY][cellX]) && this.playfield[cellY][cellX].id === gameConsts.fruits.frNone.id)
      {
        found = true;
      }
    }

    //Spot found. Decide which fruit
    //Tomate or fruit? 1 Tomate of 2 other fruits
    var fruit = null;
    if(getRandom(0, 10) < 5)
    {
      fruit = Object.assign({}, gameConsts.fruits.frTomato);
      fruit.lifespan = gameConsts.lifespanTomate;
    }
    else
    {
      fruit = Object.assign({}, gameConsts.fruits[this.healthyFruits[getRandom(0, this.healthyFruits.length - 1)]]);
      fruit.lifespan = gameConsts.lifespanFruit;
    }

    //Add Time when fruit is added
    fruit.date = new Date();

    this.playfield[cellY][cellX] = fruit;

    if(this.running)
     {
      setTimeout(() => {
        this.interval();
      }, getRandom(this.speed / 2, this.speed + this.speed / 2));
    }
  }

  start()
  {
    this.running = true;
    this.resetGame();

    this.interval();

    this.speedInterval = setInterval(() => {
      if(this.speed > 300)
        this.speed -= 300;
        
    }, 5 * 1000);
    
  }

  addTomate(row, cell)
  {
    if(!this.isPotentialKey(grid.KEYGRID[row][cell]))
      return;

    var fruit = Object.assign({}, gameConsts.fruits.frTomato);
    fruit.lifespan = gameConsts.lifespanTomate;
    fruit.date = new Date();
    this.playfield[row][cell] = fruit;
  }

  render()
  {
    this.renderInterval = setInterval(() => {
      const now = new Date();
      for(var row in this.playfield)
      {
        row = parseInt(row);
        for(var cell in this.playfield[row])
        {
          cell = parseInt(cell);
          const key = grid.KEYGRID[row][cell];
          var fruit = this.playfield[row][cell];
          if(key === consts.NOKEY)
            continue;
          
          var color = fruit.color;

          //Calculate if Tomato should spread
          let delta = Math.abs(now - fruit.date);
          if(fruit.id === gameConsts.fruits.frTomato.id)
          {
            if(delta >= fruit.lifespan)
            {
              //Fade out.

              //Tomate faded out. SPREAD!
              if(delta >= fruit.lifespan + gameConsts.tomateFadeDuration)
              {
                color = helpers.hexToRgb(gameConsts.fruits.frTomato.color);
                color.r = 0;

                //Reset this Key
                this.playfield[row][cell] = Object.assign({}, gameConsts.fruits.frNone)

                //Calc Spreads
                
                //Top Cells
                if(row > 0)
                {
                  // Cell Top
                  this.addTomate(row - 1, cell)

                  //Cell Top Left
                  if(cell > 0)
                    this.addTomate(row - 1, cell - 1)

                  // //Cell Top Right
                  if(cell < grid.KEYGRID[row - 1].length - 1)
                    this.addTomate(row - 1, cell + 1)
                }
                
                //Cell Left
                if(cell > 0)
                  this.addTomate(row, cell - 1)

                //Cell Right
                if(cell < grid.KEYGRID[row].length - 1)
                  this.addTomate(row, cell + 1)

                //Bottom Cells
                if(row < grid.KEYGRID.length - 1)
                {
                  // Cell Top
                  this.addTomate(row + 1, cell)

                  //Cell Top Left
                  if(cell > 0)
                    this.addTomate(row + 1, cell - 1)

                  // //Cell Top Right
                  if(cell < grid.KEYGRID[row + 1].length - 1)
                    this.addTomate(row + 1, cell + 1)
                }

              }
              else
              {
                //Fade Tomato
                color = helpers.hexToRgb(gameConsts.fruits.frTomato.color);
                color.r = color.r - Math.round(color.r / gameConsts.tomateFadeDuration * ( delta - fruit.lifespan ));

              }
            }
          }
          
          this.keyboard.updateKey(key, color);

        }
      }
    }, 50);
  }

  stop()
  {
    this.running = false;
    clearInterval(this.renderInterval)
    clearInterval(this.speedInterval);
  }

  keyPress(key)
  {
    console.log(key)
    //find grid pos
    var row = -1;
    var cell = -1;
    var found = false;
    for(row in grid.KEYGRID)
    {
      for(cell in grid.KEYGRID[row])
      {
        if(grid.KEYGRID[row][cell] === key)
        {
          found = true;
          break;
        }
      }
      if(found)
        break;
    }

    if(!found)
    {
      console.log("Key not found in grid ", key)
      return
    }

    //Smashed healty fruit!!
    if(this.healthyFruitsId.includes(this.playfield[row][cell].id))
    {
      console.log("Noo! Smashed Healty Fruit!")
      this.score.fruitsSmashed++;
      this.score.points -= 10;
    }

    //Smashed Tomato
    if(this.playfield[row][cell].id === gameConsts.fruits.frTomato.id)
    {
      console.log("Yeah! Tomate smashed!")
      this.score.tomatoesSmashed++;

      this.score.points += 10;
    }

    if(this.playfield[row][cell].id === gameConsts.fruits.frNone.id)
    {
      console.log("Missed everything");

      this.score.points -= 5;
    }

     //Reset Key
     this.playfield[row][cell] = Object.assign({}, gameConsts.fruits.frNone)
  }

  getScore(){
    return this.score;
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}