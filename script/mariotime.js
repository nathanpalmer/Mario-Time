var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
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
        sprite.swapClass(t.currentClass,t.nextClass);
                    
        if (t.movePixels) {                
          var marginLeft = parseInt(sprite.css('margin-left').replace('px',''))+(t.movePixels * (sprite.hasClass('facing-left') ? -1 : 1));
          sprite.css('margin-left', marginLeft + 'px');
        }                          
       
        return;
    }
  }       
}

function walkDirection(direction, keyUp) {
  var sprite = $('#sprite');
  var oppositeDirection = (direction == 'left' ? 'right' : 'left');
  
  if (sprite.hasClass('facing-' + oppositeDirection)) {
    sprite.swapClass('facing-' + oppositeDirection,'facing-' + direction);
    sprite.addClass('changed-direction');
  } else {
    if (sprite.hasClass('changed-direction')) {
      sprite.removeClass('changed-direction');
    } else {
      walk(keyUp);
    }
  }
}

function playEffect(name) {
  if (is_chrome) {
    var aud = new Audio('effects/' + name);
    aud.play();
  }
}

$.fn.swapClass = function(firstClass, secondClass) {
  return this.each(function() {
    obj = $(this);
    obj.removeClass(firstClass);
    obj.addClass(secondClass);
  });
};

function keyDownHandler(e) {
  var sprite = $('#sprite');
  switch(e.keyCode)
  {
    // Down
    case 40:
      sprite.swapClass('mario-stand','mario-crouch');
      break;
      
    // Space
    case 32:
      if (!sprite.hasClass('mario-jump')) {
        playEffect('smb3_jump.mp3');
        sprite.swapClass('mario-stand','mario-jump');
        sprite.parent().animate({
          paddingTop: '350px',
          height: '82px'
        }, {
          duration: 200
        });
        sprite.parent().animate({
          paddingTop: '380px',
          height: '52px'
        }, {
          duration: 200
        });
      }
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
      sprite.swapClass('mario-crouch','mario-stand');
      break;
      
    // Space
    case 32:
      if (sprite.hasClass('mario-jump')) {
        sprite.swapClass('mario-jump','mario-stand');
      }
      break;
      
    // Left
    case 37:
      walkDirection('left',true);
      break;
    // Right
    case 39:
      walkDirection('right',true);
      break;
  }
}

$(document).ready(function() {
  $(window).keydown(keyDownHandler);
  $(window).keyup(keyUpHandler);     
});