const express = require('express')
const app = express()
const RoccatVulcan = require('./roccatvulcan');

var keyboard = null;

app.get('/', function (req, res) {
  console.log("go")
  keyboard.fillAll('#ffcc00')
})
 
app.listen(3030, () => {
  console.log("Start server. Prepare Roccat");
  keyboard = new RoccatVulcan({
    ready: () => {
      keyboard.fillAll('#11c4cf')
    }
  });

});