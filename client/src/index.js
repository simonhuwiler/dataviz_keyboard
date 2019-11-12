//Import CSS
import './main.scss';
require('./docReady.js');

const url = 'http://localhost:3030';
const writingtext = 'We dont want to conquer the cosmos, we simply want to extend the boundaries of earth to the frontiers of the cosmos.';

// const anime = require('animejs/lib/anime.js');

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
    event: () => sendRequest('/barcharts')
  },
  {
    selector: '#chapter_keys',
    event: () => sendRequest('/keys')
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
    e.top = getOffset(document.querySelector(e.selector));
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

function sendRequest(param, data)
{
  return;
  const request = new XMLHttpRequest();
  request.open("POST", url + param);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
  request.onreadystatechange = (e) => {
    console.log(request.responseText)
  }
}

var wtCurrentPos = 0;
var wtCount = 0;
var wtRunning = false;
var wtTimer = null;
var wtStart = null;
var wtEnd = null;


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

  if(wtCurrentPos >= writingtext.length)
  {
    document.querySelector('#chapter_speedtest input').disabled = true;
    clearInterval(wtTimer);
    document.querySelector('#chapter_speedtest .timer').style.display = 'none';
    wtEnd = new Date();

    //Calculate Writing speed.
    let s = Math.abs(wtEnd - wtStart) / 1000;
    let kPerM = wtCount / s * 60;
    document.querySelector('#yourwritingspeed').innerHTML = Math.round(kPerM)
  }
}


docReady(function() {

  //Calc Scroll Pos
  updateScrollPosition();

  window.addEventListener("resize", updateScrollPosition);

  //Init ScrollListener
  window.addEventListener("scroll", onScroll);

  //Init Writing test
  document.querySelector('#chapter_speedtest input').addEventListener('keydown', writingTestWrite)

  

});