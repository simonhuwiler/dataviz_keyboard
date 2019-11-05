module.exports.intro = function(keyboard)
{
  keyboard.animationQueueAdd(() => keyboard.updateKeys(['1', '2', '3'], '#505050'), 1000);
  keyboard.animationQueueAdd(() => keyboard.updateKeys(['5'], '#ffcc00'), 2000);

  keyboard.animationQueueStart(function() {
  })
}