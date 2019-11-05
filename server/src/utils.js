const keylist = require('./roccatvulcan/keyboardlayout/ch-de/keys.js');

module.exports.getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.getRandomColor()
{
  const randomHex = () => {
    let s = getRandomInt(0, 255).toString(16);
    if(s.length === 1)
      return '0' + s;
    return s;
  }

  return `#${randomHex() + randomHex() + randomHex()}`
}

module.exports.getRandomKeys = (num) => 
{
  var keys = shuffleArray(Object.keys(keylist.KEYMAPPER));
  return keys.slice(0, num);
}

module.exports.shuffleArray(array)
{
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}