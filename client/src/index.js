//Import CSS
import './main.scss';
import { CountUp } from 'countup.js';
require('./docReady.js');

const url = 'http://localhost:3030';
const writingtext = 'We dont want to conquer the cosmos, we simply want to extend the boundaries of earth to the frontiers of the cosmos.';

const scrollOffset = -100;
var scrollEventsCalculated = false;

// Initialisation
var scrollEvents = [
  {
    selector: '#chapter_pong',
    event: () => sendRequest('/pong')
  },
  {
    selector: '#chapter_barcharts',
    event: () => startYearRotator()
  },
  {
    selector: '#chapter_keys',
    event: () => sendRequest('/sixkeys')
  },
  {
    selector: '#chapter_keysafter',
    event: () => sendRequest('/sixkeysafter')
  },
  {
    selector: '#chapter_flags',
    event: () => sendRequest('/flags')
  },
  {
    selector: '#chapter_fast',
    event: () => sendRequest('/fadeflags')
  },
  {
    selector: '#chapter_speedtest',
    event: () => sendRequest('/clear')
  },
  {
    selector: '#chapter_yourspeed',
    event: () => sendRequest('/speedtest', {speed: writingSpeed})
  },
  {
    selector: '#chapter_speed400',
    event: () => sendRequest('/speedtest', {speed: 400})
  },
  {
    selector: '#chapter_speed818',
    event: () => sendRequest('/speedtest', {speed: 818})
  },
  {
    selector: '#chapter_finish',
    event: () => sendRequest('/highlightwasd')
  },
  {
    selector: '#chapter_letsplay',
    event: () => {}
  }
];

var currentEvent = null;

function getOffset(element)
{
  let bodyRect = document.body.getBoundingClientRect();
  let elemRect = element.getBoundingClientRect();
  return elemRect.top - bodyRect.top + scrollOffset;
}

function updateScrollPosition()
{
  scrollEvents.forEach(e => {
    let el = document.querySelector(e.selector);
    if(!el)
      throw(`Element ${e.selector} not found`);
    e.top = getOffset(el);
  });
  scrollEventsCalculated = true;
}

function onScroll()
{
  if(!scrollEventsCalculated)
    return;

  var pos = document.body.scrollTop || document.documentElement.scrollTop;

  for(var i = scrollEvents.length - 1; i >= 0; i--)
  {
    if(pos >= scrollEvents[i].top)
    {
      if(currentEvent !== scrollEvents[i])
      {
        currentEvent = scrollEvents[i];

        //Remove class "active" everywhere
        document.querySelectorAll('.chapter.active').forEach(dom => dom.classList.remove("active"));

        //Add "active" to current
        document.querySelector(currentEvent.selector).classList.add('active');

        scrollEvents[i].event();
      }
      break;
    }
  }
}

function sendRequest(param, data, callback)
{
  const request = new XMLHttpRequest();
  request.open("POST", url + param);
  request.setRequestHeader("Content-Type", "application/json");
  const req = data ? JSON.stringify(data) : JSON.stringify({});
  request.send(req);
  request.onreadystatechange = (e) => {
    if(request.readyState === 4 && callback)
    {
      callback(request.responseText)
    }
  }
}

var wtCurrentPos = 0;
var wtCount = 0;
var wtRunning = false;
var wtTimer = null;
var wtStart = null;
var wtEnd = null;
var writingSpeed = 0;

function writingTestWrite(e)
{
  wtCount++;

  if(!wtRunning)
  {
    //Start timer
    wtRunning = true;
    wtStart = new Date();
    document.querySelector('#chapter_speedtest .timer').style.display = 'block';
    wtTimer = setInterval(() => {
      let now = new Date();
      let delta = Math.abs(now - wtStart);
      let deltaDate = new Date(delta)
      let m = deltaDate.getMinutes() > 9 ? deltaDate.getMinutes() : '0' + deltaDate.getMinutes();
      let s = deltaDate.getSeconds() > 9 ? deltaDate.getSeconds() : '0' + deltaDate.getSeconds();
      document.querySelector('#chapter_speedtest .timer').innerHTML = `${m}:${s}`;
    }, 1000)
  }

  if(e.key === " ")
  {
    document.querySelector('#chapter_speedtest input').value = ""
    wtCurrentPos = writingtext.indexOf(' ', wtCurrentPos);
    //Jump to next word
  }

  if(e.key.toLowerCase() === writingtext.charAt(wtCurrentPos).toLowerCase())
  {
    wtCurrentPos++;
    document.querySelector('.textsample').innerHTML = `<span class='typed'>${writingtext.slice(0, wtCurrentPos)}</span>${writingtext.slice(wtCurrentPos)}`;
  }

  //Test finished
  if(wtCurrentPos >= writingtext.length)
  {
    document.querySelector('#chapter_speedtest input').disabled = true;
    clearInterval(wtTimer);
    document.querySelector('#chapter_speedtest .timer').style.display = 'none';

    wtEnd = new Date();

    //Calculate Writing speed.
    let s = Math.abs(wtEnd - wtStart) / 1000;
    writingSpeed = Math.round(wtCount / s * 60);
    document.querySelector('#yourwritingspeed').innerHTML = writingSpeed;

    //Scroll to next chapter
    const element = document.querySelector('#chapter_yourspeed');
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.getBoundingClientRect();
    const scrollTo = elemRect.top - bodyRect.top;
    window.scrollTo({ top: scrollTo, left: 0, behavior: "smooth" });
  }
}

function startGame()
{
  document.querySelector('#gameoverlay').style.display = 'block';
  var points = new CountUp('gamepoints', 0, {duration: 0.2});
  points.start();

  var seconds = 60;
  const domClock = document.querySelector('.clock');
  var clockTimer = setInterval(() => {
    seconds--;
    domClock.innerHTML = `00:${seconds > 9 ? seconds : `0${seconds}`}`;

    if(seconds <= 0)
    {
      clearInterval(clockTimer);
      clearInterval(scoreInterval);
      sendRequest('/gamestop')
    }

  }, 1000)

  //Call for Scores
  var scoreInterval = setInterval(() => {
    const domPoints = document.querySelector('#gameoverlay .gamepoints');
    const domTomatoes = document.querySelector('#gameoverlay .tomatoessmashed');
    const domFruits = document.querySelector('#gameoverlay .fruitssmashed');

    sendRequest('/gamescore', null, d => {
      const score = JSON.parse(d)
      domPoints.innerHTML = score.points;
      domTomatoes.innerHTML = score.tomatoesSmashed;
      domFruits.innerHTML = score.fruitsSmashed;

    })
  }, 500);

  sendRequest('/gamestart')

}

function startYearRotator()
{
  var counter = 0;
  const max = document.querySelectorAll('#chapter_barcharts .inner span').length;
  const spans = document.querySelectorAll(`#chapter_barcharts .inner span`);
  const interval = setInterval(() => {

    document.querySelector('#chapter_barcharts .inner').style.top = counter * -50 + 'px';
    sendRequest('/barchart', {year: spans[counter].innerHTML})

    if(counter >= max - 1)
      clearInterval(interval)
    counter++;
  }, 1000);
}


docReady(function() {

  //Calc Scroll Pos
  updateScrollPosition();

  window.addEventListener("resize", updateScrollPosition);

  //Init ScrollListener
  window.addEventListener("scroll", onScroll);

  //Init Writing test
  document.querySelector('#chapter_speedtest input').addEventListener('keydown', writingTestWrite)

  //Game Listener
  document.querySelector('#gamestart').addEventListener('focus', startGame);

  //Clear all
  sendRequest('/clear')

  //Register Run Key
  document.querySelector('#play').addEventListener('click', () => {
    var percentage = 0;

    document.querySelector('.progress').style.display = 'block';
    const bar = document.querySelector('.progress .inner');
    const label = document.querySelector('.progress .inner span');

    const interval = setInterval(() => {
      percentage++;
      bar.style.width = percentage + '%';
      label.innerHTML = percentage + '%';


      if(percentage >= 100)
      {
        clearInterval(interval);
        document.querySelector('#start').style.display = 'none';
        document.querySelector('.intro').classList.add('go');
        sendRequest('/intro')
      }
    }, 15)
  })
});