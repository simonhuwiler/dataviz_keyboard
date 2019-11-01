var HID = require('node-hid');
const initialization = require('./initialization.js');
const colors = require('./colors.js');
const animator = require('./animator.js');
const consts = require('./consts.js')

module.exports = class RoccatVulkan
{
  constructor(options)
  {
    options = options ? options : {};

    console.log("Initialize Vulcan")

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
    var keys = colors.getKeys(color);
    animator.sendColorsToKeyboard(this.ledDevice, keys);
  }

  close()
  {
    if(this.ledDevice)
    {
      this.ledDevice.close();
    }
  }

}