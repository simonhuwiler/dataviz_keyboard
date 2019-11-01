var HID = require('node-hid');

const initialization = require('./initialization.js');
const colors = require('./colors.js');
const animator = require('./animator.js');

const CTRLINTERFACE = 1;
const LEDINTERFACE = 3;
// const VENDOR_ID = 7805;//0x307a
// product_id = 0x1e7d
const PRODUCTID = 12440//0x3098

const allDevices = HID.devices();
const roccatDevices = allDevices.filter(d => d.productId === PRODUCTID)

//Find LED Interface Number (No 1)
const ledDeviceInfo = roccatDevices.find(e => e['interface'] ===  LEDINTERFACE)

if(!ledDeviceInfo) {
  raise("LED Device not found")}

//Open LED Device
const ledDevice = new HID.HID(ledDeviceInfo.path);

//Find Control Device
const ctrlDeviceInfos = roccatDevices.filter(e => e['interface'] ===  CTRLINTERFACE);

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
    // console.log("Could not open device", e)
  }
}

if(!ctrlDevice)
{
  console.log("Control Device not found")
  raise("Control Device not found!")
}


// //Start initialisation
initialization.run(ctrlDevice)
  .then(() => {
    //Initialisation done. Close Ctrl Device
    console.log("Initialisation finished")
    ctrlDevice.close()

    console.log(ledDevice)
    
    var keys = colors.getKeys('#BADA550');
    animator.sendColorsToKeyboard(ledDevice, keys);
    console.log("fertig")


    ledDevice.close()
    console.log("fertig")
  })


