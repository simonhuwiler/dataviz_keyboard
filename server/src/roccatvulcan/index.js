var HID = require('node-hid');
const initialization = require('./initialization.js');
const helpers = require('./helpers.js');
const controller = require('./controller.js');
const consts = require('./consts.js')
const gridConsts = require('./grid/consts.js');

module.exports = class RoccatVulkan
{
  constructor(options)
  {
    options = options ? options : {};
    
    console.log("Initialize Vulcan")
    
    this.animateTimers = [];
    this.currentColors = helpers.getKeys('#000000');

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    const productId = options.productId ? options.productId : consts.PRODUCTID;
    const roccatDevices = allDevices.filter(d => d.productId === productId)

    //Find LED Interface Number (No 1)
    const ledDeviceInfo = roccatDevices.find(e => e['interface'] ===  consts.LEDINTERFACE)

    if(!ledDeviceInfo) 
    {
      raise("LED Device not found")
    }

    //Open LED Device
    this.ledDevice = new HID.HID(ledDeviceInfo.path);

    //Find Control Device
    const ctrlDeviceInfos = roccatDevices.filter(e => e['interface'] ===  consts.CTRLINTERFACE);

    //Brutforce: Open one by one and look at result.
    var ctrlDevice = null;
    for(var i in ctrlDeviceInfos)
    {
      try
      {
        ctrlDevice = new HID.HID(ctrlDeviceInfos[i].path);
        var buf = ctrlDevice.getFeatureReport(0x0f, 255);
        if(buf.length > 0)
        {
          break;
        }
      }
      catch(e)
      {
        //console.error("Could not open device", e)
        // console.log("Could not open device", e)
      }
    }

    if(!ctrlDevice)
    {
      raise("Control Device not found!")
    }

    // //Start Keyboard initialisation
    initialization.run(ctrlDevice)
    .then(() => {

      //Initialisation done. Close Ctrl Device
      ctrlDevice.close()
      console.log("Roccat Server Ready")

      //Callback
      if(options.ready)
        options.ready();
    })
  }
  
  fillAll(color)
  {
    this.currentColors = helpers.getKeys(color);
    controller.sendColorsToKeyboard(this.ledDevice, this.currentColors);
  }

  updateKeys(keys, color)
  {
    for(let i in keys)
    {
      const key = keys[i];

      //When key is string, find corresponding id. If integer, it is already the id
      var id = key;
      if(typeof(key) === 'string')
      {

        if(!(key in consts.KEYMAPPER))
        {
          console.log("Key " + key + " not found in Keylist");
          return;
        }
    
        id = consts.KEYMAPPER[key];
      }
  
      if(typeof color === "string")
      {
        color = helpers.hexToRgb(color);
      }
      else if(typeof color === "object")
      {
        color = color;
      }
      else
      {
        console.log("Wrong color. Bust me hex-string (#ffcc00) or objekct ({r: 255, g: 255, b:255}")
      }
      
      this.currentColors[id] = color;
    }

    controller.sendColorsToKeyboard(this.ledDevice, this.currentColors);
  }

  updateKey(key, color)
  {
    this.updateKeys([key], color);
  }

  animateKeys(keys, colorFrom, colorTo, duration)
  {
    const start = Date.now();
    var rgbFrom = helpers.hexToRgb(colorFrom);
    var rgbTo = helpers.hexToRgb(colorTo);
    var rgbRunning = Object.assign({}, rgbFrom);

    const rMax = rgbTo.r - rgbFrom.r;
    const gMax = rgbTo.g - rgbFrom.g;
    const bMax = rgbTo.b - rgbFrom.b;

    const timer = setInterval(() => {

      var runningTime = Date.now() - start;
      runningTime = runningTime > duration ? duration : runningTime;

      //Calculate new RGB-Value
      const percentage = 100 / duration * runningTime;
      rgbRunning.r = Math.round(rgbFrom.r + rMax / 100 * percentage);
      rgbRunning.g = Math.round(rgbFrom.g + gMax / 100 * percentage);
      rgbRunning.b = Math.round(rgbFrom.b + bMax / 100 * percentage);

      //Send new Value
      this.updateKeys(keys, rgbRunning)

      //Clear Timer if duration ends
      if(runningTime >= duration)
      {
        const t = this.animateTimers.find(e => e === timer)
        console.log("f")
        if(t)
          clearInterval(t)
      }
        
    }, consts.ANIMATIONINTERVAL);
    this.animateTimers.push(timer);
  }

  close()
  {
    if(this.ledDevice)
    {
      this.ledDevice.close();
    }
  }

  write(text, color, keyOffset)
  {
    //Convert Color
    const rgbColor = helpers.hexToRgb(color);

    //Create empty binary grid
    var binaryGrid = gridConsts.KEYGRID.map(row => row.map(cell => 0));

    var gridPos = keyOffset;
    for(let i = 0; i < text.length; i++)
    {
      const char = gridConsts.marquee[text.charAt(i)];
      for(let row = 0; row < char.length; row++)
      {
        for(let column = 0; column < char[row].length; column++)
        {
          binaryGrid[row][column + gridPos] = char[row][column];
        }
      }
      
      //Update gridPos
      gridPos += char[0].length + keyOffset;
    }

    //Create Screen and map binarygrid to it
    var screen = helpers.getKeys('#000000');
    for(let row = 0; row < binaryGrid.length; row++)
      {
        for(let column = 0; column < binaryGrid[row].length; column++)
        {
          if(column > gridConsts.KEYGRID[row].length)
            break
  
          //Search corresponding key
          if(binaryGrid[row][column] === 1 && gridConsts.KEYGRID[row][column] != gridConsts.NOKEY)
          {
            screen[gridConsts.KEYGRID[row][column]] = rgbColor;
          }
        }
      }

    this.currentColors = screen;
    controller.sendColorsToKeyboard(this.ledDevice, this.currentColors);
  }

  marquee(text, color, speed)
  {
    //Convert Color
    const rgbColor = helpers.hexToRgb(color);

    //Create empty binary grid
    var binaryGrid = gridConsts.KEYGRID.map(row => row.map(cell => 0));

    //Create textgrid
    var textGrid = [[], [], [], [], [], []];

    const emptyLine = new Array(6).fill(new Array(gridConsts.SPACEBETWEEN).fill(0));
    // const emptyLine = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    
    for(let i = 0; i < text.length; i++)
    {
      const char = gridConsts.marquee[text.charAt(i)];
      textGrid = textGrid.map((row, j) => row.concat(emptyLine[j]).concat(char[j]))
    }

    //Concat Binary and Textgrid
    binaryGrid = binaryGrid.map((row, i) => row.concat(textGrid[i]));

    //TEST
    // binaryGrid = textGrid;


    const timer = setInterval(() => {

      //Remove first row of grid
      for(let row in binaryGrid)
        binaryGrid[row].shift();

      //Get black screen
      var screen = helpers.getKeys('#000000');

      for(let row = 0; row < binaryGrid.length; row++)
      {
        for(let column = 0; column < binaryGrid[row].length; column++)
        {
          if(column > gridConsts.KEYGRID[row].length)
            break
  
          //Search corresponding key
          if(binaryGrid[row][column] === 1 && gridConsts.KEYGRID[row][column] != gridConsts.NOKEY)
          {
            screen[gridConsts.KEYGRID[row][column]] = rgbColor;
          }
        }
      }
  
      this.currentColors = screen;
      
      controller.sendColorsToKeyboard(this.ledDevice, this.currentColors);

      //Clear Timer if no grid columns left
      if(binaryGrid[0].length === 0)
      {
        const t = this.animateTimers.find(e => e === timer)
        console.log("finished")
        if(t)
          clearInterval(t)
      }
        
    }, speed);
    this.animateTimers.push(timer);

  }

  // columnTest()
  // {
  //   var screen = helpers.getKeys('#000000');
  //   for(let row = 0; row < gridConsts.KEYGRID.length; row++)
  //   {
  //     for(let column = 0; column < gridConsts.KEYGRID[row].length; column++)
  //     {
  //       const cell = gridConsts.KEYGRID[row][column];
  //       if(cell === -1)
  //         continue;
  //       screen[cell].b = column % 2 === 0 ? 255 : 15;
  //       screen[cell].r = column % 2 === 0 ? 15 : 255;

  //     }
  //   }
  //   controller.sendColorsToKeyboard(this.ledDevice, screen);
  // }



  // speedTest()
  // {
  //   this.fillAll('#000000');
  //   var state = 0;
  //   setInterval(() => {
  //     if(state % 2 === 0)
  //       this.updateKey('D', '#ff0000')
  //     else
  //       this.updateKey('D', '#000000');
  //     state++;
  //   }, 30)
  // }
}