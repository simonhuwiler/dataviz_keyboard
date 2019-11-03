const fs = require('fs');

module.exports.getTemplate = function()
{
  const f = fs.readFileSync('./src/colorgui/template.html', 'utf8');
  return f;
}