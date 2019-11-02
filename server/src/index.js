const express = require('express')
const app = express()
const RoccatVulcan = require('./roccatvulcan');
const ColorGui = require('./colorgui');
const consts = require('./roccatvulcan/consts.js')

var keyboard = null;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())

app.get('/', function (req, res) {
  console.log("go")
  keyboard.fillAll('#ffcc00')
})
 
app.get('/colorgui', function (req, res) {
  console.log("go")
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(ColorGui.getTemplate())
  res.end()
})

app.post('/clear', (req, res) => {
  console.log("clear")
  keyboard.fillAll('#000000')
  res.sendStatus(200);
});

app.post("/setkey", (req, res) => {
  keyboard.updateKey(req.body.key, req.body.color)
  res.sendStatus(200);
});

app.post('/')
 

app.listen(3030, () => {
  console.log("Start server. Prepare Roccat");
  
  keyboard = new RoccatVulcan({
    ready: () => {
      // keyboard.fillAll('#000000')
      // keyboard.animateKeys(['G'], '#ffffff', '#000000', 2000);
      keyboard.animateKeys(consts.ALPHABET, '#5ce21d', '#f20d9c', 2000);
    }
  });
  

});