const express = require('express')
const app = express()
const RoccatVulcan = require('./roccatvulcan');
const colorGui = require('./colorgui');
const Chapters = require('./chapters.js');
const FruitSalat = require('./fruitsalad')

var keyboard = null;
var chapters = null;

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
  res.write(colorGui.getTemplate())
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

app.post("/intro", (req, res) => {
  chapters.intro();
  res.sendStatus(200);
});

app.post("/pong", (req, res) => {
  chapters.pong();
  res.sendStatus(200);
});

app.post("/barchart", (req, res) => {
  chapters.barchart(req.body.year)
  res.sendStatus(200);
});

app.post("/sixkeys", (req, res) => {
  chapters.sixKeys()
  res.sendStatus(200);
});

app.post("/sixkeysafter", (req, res) => {
  chapters.sixKeysAfter()
  res.sendStatus(200);
});

app.post("/speedtest", (req, res) => {
  chapters.speedTest(req.body.speed)
  res.sendStatus(200);
});

app.listen(3030, () => {
  console.log("Start server. Prepare Roccat");

  const game = new FruitSalat();
  keyboard = new RoccatVulcan({
    onData: (data) => {
      if(data.state === 0)
        return

      game.keyPress(data.key)
    },
    ready: () => {
      console.log("ready")
      keyboard.fillAll('#000000')
      keyboard.render();
      // keyboard.renderStart(50);


      // keyboard.animateKeys(['W', 'A', 'S', 'D'], '#000000', '#FF0000', 2000);
      
      //keyboard.fillAll('#000000')
      // keyboard.write("0", "#ff0000", 2)

      // keyboard.updateKeys(['1', '2', '3'], '#505050');
      // keyboard.updateKeys(consts.ALPHABET, '#FF0000');
      // c = []
      // for(var i = 97; i < 100; i++)
      // {
      //   c.push(i)
      // }
      // keyboard.updateKeys([96], '#ffffff')
      // keyboard.updateKeys(gridconsts.KEYGRID[5], '#ffffff')
      // keyboard.animateKeys(['G'], '#ffffff', '#000000', 2000);
      // keyboard.animateKeys(consts.ALPHABET, '#5ce21d', '#f20d9c', 2000);
    }
  });
  chapters = new Chapters(keyboard);
  // keyboard.renderStart(50);
  // chapters.speedTest(520);
  // keyboard.marquee("ANNE", "#FF0000", 200)
  // keyboard.columnTest();
  // keyboard.marquee("32000", "#FF0000", 100)

  game.setKeyboard(keyboard);
  game.start();
  keyboard.renderStart(50);

    
  

});