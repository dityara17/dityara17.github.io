/* Real-Time Love Meter Experiment © Yogev Ahuvia */
$(document).ready(function() {
  $body = $('body');
  $heart = $('.heart');
  $counter = $('.lovers-count');
  $lover = $('.lover');

  updateLoversCount();
  
  setTimeout(function() {
    $body.removeClass('preload');
  }, 300);
});

// fetche lovers data from server
// update counter and bpm
function updateLoversCount() {
  $.getJSON(url, function(response) {
    var $html = $(response.html);
    var count = $html.find('.user-name').length;
    
    // handle +1, -1 or same lovers count
    // load balance polling accordingly
    if (count > lovers) {
      polling /= 1.2;
      lovers = count;
      handleLatestLovers($html, count);
      beat();
    } else if (count < lovers) {
      polling /= 1.2;
      lovers = count;
      
      // clean previousLoverName when unloved
      if (response.html.indexOf(previousLoverName) == -1) {
        previousLoverName = '-1';
      }
      
      setBeatTimer();
    } else {
      polling *= 1.2;
    }
    
    // update lovers count
    $counter.text(lovers);
    
    // setTimeout for next poll on the server
    setTimeout(function() {
      updateLoversCount();
    }, polling);
  });
}

// resets timer with current bpm
function setBeatTimer() {
  beatTimer = setTimeout(function() {
    beat();
  }, bpm);
}

// parse latest lover data
function handleLatestLovers($html, count) {
  var lover = $html.find('.user-name')[count-1];
  var loverAvatar = $(lover).find('img')[0];
  var loverName = $.trim($(lover).text());
  
  if (loverName != previousLoverName) {
    // if it's not the first fetch
    // show Loved effect
    if (previousLoverName != '') {
      loved(loverName, loverAvatar);
    }
    
    previousLoverName = loverName;
  }
}

// Heart Loved effect
function loved(loverName, loverAvatar) {
  $body.addClass('inlove');

  // update lover data in DOM
  $lover.find('.avatar').html(loverAvatar);
  $lover.find('.name').html(loverName);
  
  // clear stage for effect and do magic
  $('.effect.wrapper').remove();
  $heart.addClass('beat');
  $lover.addClass('beat');
  
  // clear stage after transitions end
  setTimeout(function() {
    $heart.removeClass('beat');
    $lover.removeClass('beat');
    
    setTimeout(function() {
      $body.removeClass('inlove');
    }, 2000);
  }, 3000);
}

// Heart Beat effect
function beat() {
  bpm = (60/(lovers/2)) * 1000;

  if (!$body.hasClass('inlove')) {
    var animDuration = (bpm > 3000 ? 3000 : bpm);
    
    var $newWrapper = $('<div class="effect wrapper"></div');
    var $newHeart = $('<i class="icon-heart beat"></i>');
    $newHeart.css('animation-duration', animDuration + 'ms');
    
    // create shadow heart
    $newWrapper.append($newHeart)
    $('.main.wrapper').after($newWrapper);
    
    // setTimeout to remove the shadow heart later
    setTimeout(function() {
      $newWrapper.remove();
    }, animDuration);
  }
    
  setBeatTimer();
}

// a few helpers
var $body, $heart, $counter, $lover;
var lovers = 0;
var polling = 1000;
var bpm = 0;
var beatTimer = null;
var previousLoverName = '';
var url = "http://kindofone.me/services/codepen-lovers.php";