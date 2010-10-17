var transitions = [
    { currentClass: 'mario-stand', nextClass: 'mario-walk', movePixels: 0 },
    { currentClass: 'mario-walk', nextClass: 'mario-stand', movePixels: 10 }
];

function walk(keyUp) {
  var sprite = $('#sprite');
  var duration = 100;
        
  for(i=0;i<transitions.length;i++) {
    var t = transitions[i];
    if (sprite.hasClass(t.currentClass) && !keyUp || t.currentClass == 'mario-walk' && keyUp) {
        sprite.removeClass(t.currentClass);
        sprite.addClass(t.nextClass);
                    
        if (t.movePixels) {                
          var marginLeft = parseInt(sprite.css('margin-left').replace('px',''))+(t.movePixels * (sprite.hasClass('facing-left') ? -1 : 1));
          sprite.css('margin-left', marginLeft + 'px');
        }                          
        
        if (t.loop) {
          setTimeout('walk()', duration);
        }
        
        return;
    }
  }       
}

function walkDirection(direction, keyUp) {
  var sprite = $('#sprite');
  var oppositeDirection = (direction == 'left' ? 'right' : 'left');
  
  if (sprite.hasClass('facing-' + oppositeDirection)) {
    sprite.removeClass('facing-' + oppositeDirection);
    sprite.addClass('facing-' + direction);
    sprite.addClass('changed-direction');
  } else {
    if (sprite.hasClass('changed-direction')) {
      sprite.removeClass('changed-direction');
    } else {
      walk(keyUp);
    }
  }
}      

function keyDownHandler(e) {
  var sprite = $('#sprite');
  switch(e.keyCode)
  {
    // Down
    case 40:
      sprite.removeClass('mario-stand');
      sprite.addClass('mario-crouch');            
      break;
      
    // Left
    case 37:
      walkDirection('left');
      break;
      
    // Right
    case 39:            
      walkDirection('right');
      break;
  }
}

function keyUpHandler(e) {
  var sprite = $('#sprite');          
  switch(e.keyCode)
  {
    // Down
    case 40:
      sprite.removeClass('mario-crouch');
      sprite.addClass('mario-stand');
      break;
      
    // Left
    case 37:
      walkDirection('left',true);
      break;
    // Right
    case 39:
      walkDirection('right', true);
      break;
  }
}

$(document).ready(function() {
  $(window).keydown(keyDownHandler);
  $(window).keyup(keyUpHandler);
});