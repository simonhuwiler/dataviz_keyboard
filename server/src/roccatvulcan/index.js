var HID = require('node-hid');
const initialization = require('./initialization.js');
const colors = require('./colors.js');
const colorizer = require('./colorizer.js');
const consts = require('./consts.js')

module.exports = class RoccatVulkan
{
  constructor(options)
  {
    options = options ? options : {};
    
    console.log("Initialize Vulcan")
    
    this.animateTimers = [];
    this.currentColors = colors.getKeys('#000000');

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
    this.currentColors = colors.getKeys(color);
    colorizer.sendColorsToKeyboard(this.ledDevice, this.currentColors);
  }

  updateKeys(keys, color)
  {
    for(let i in keys)
    {
      const key = keys[i];

      if(!(key in consts.KEYMAPPER))
      {
        console.log("Key " + key + " not found in Keylist");
        return;
      }
  
      const id = consts.KEYMAPPER[key];
  
      if(typeof color === "string")
      {
        color = colors.hexToRgb(color);
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

    colorizer.sendColorsToKeyboard(this.ledDevice, this.currentColors);
  }

  updateKey(key, color)
  {
    this.updateKeys([key], color);
  }

  animateKeys(keys, colorFrom, colorTo, duration)
  {
    const start = Date.now();
    var rgbFrom = colors.hexToRgb(colorFrom);
    var rgbTo = colors.hexToRgb(colorTo);
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

}