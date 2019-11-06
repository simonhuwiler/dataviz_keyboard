//Import CSS
import './main.scss';
require('./docReady.js');

// const anime = require('animejs/lib/anime.js');

const scrollOffset = 0;

// Initialisation
var scrollEvents = [
  {
    selector: '#chapter_gallery',
    event: () => msnry.layout()
  },
  {
    selector: "#chapter_highlight_own",
    event: () => waffle.runColorizeOwn()
  },
  {
    selector: "#layout_green_bottom",
    event: () => smopo.colorGreenBottom()
  },
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
  fix.update();
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
      if(currentEvent !== scrollEvents[i].event)
      {
        currentEvent = scrollEvents[i].event;
        scrollEvents[i].event();
      }
      break;
    }
  }
}


docReady(function() {
  
  

});