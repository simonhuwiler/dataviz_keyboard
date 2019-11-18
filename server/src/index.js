const express = require('express')
const app = express()
const RoccatVulcan = require('./roccatvulcan');
const colorGui = require('./colorgui');
const Chapters = require('./chapters.js');
const FruitSalat = require('./fruitsalad')

var keyboard = null;
var chapters = null;
var game = null;

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
  chapters.stopChapters();
  game.stop();
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
  chapters.barchart(parseInt(req.body.year));
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

app.post("/flags", (req, res) => {
  chapters.flags()
  res.sendStatus(200);
});

app.post("/fadeflags", (req, res) => {
  chapters.fadeFlags()
  res.sendStatus(200);
});

app.post("/speedtest", (req, res) => {
  chapters.speedTest(req.body.speed)
  res.sendStatus(200);
});

app.post("/highlightwasd", (req, res) => {
  chapters.highlightWASD();
  res.sendStatus(200);
});

app.post("/gamestart", (req, res) => {
  chapters.stopChapters();
  game.start();
  res.sendStatus(200);
});

app.post("/gamestop", (req, res) => {
  game.stop();
  res.sendStatus(200);
});

app.post("/gamescore", (req, res) => {
  res.json(game.getScore())
});

app.listen(3030, () => {
  console.log("Start server. Prepare Roccat");

  //Init Fruit Salad Game
  game = new FruitSalat();

  keyboard = new RoccatVulcan({
    'layout': 'ch-de',
    onData: data => {
      if(data.state === 0)
        return

      game.keyPress(data.key)
    },
    ready: () => {
      console.log("ready")

      //Init Game
      game.setKeyboard(keyboard);

      //Remove every LED
      keyboard.fillAll('#000000')

      //Start continuous rendering
      keyboard.renderStart(50);
    }
  });
  chapters = new Chapters(keyboard);
});