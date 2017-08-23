'use strict';

$(document).ready(function () {

  var $btnOuter = $('.box__btn--outer');
  var $btnInner = $('.box__btn--inner');
  var $inner = $('.box__inner');
  var $outer = $('.box__outer');
  var $logo = $('.box__outer-logo');
  var slideOutInnerDelay = 650;
  var animation = false;
  var numOfHeartsBg = 50; // Change this variable also in CSS
  var numOfHeartsInner = 25; // Change this variable also in CSS

  $(document).on('click', '.box__btn--outer', function () {
    if (animation) return;
    animation = true;
    $inner.addClass('show-in-inner');
    $outer.addClass('show-out-outer');

    setTimeout(function () {
      $btnOuter.removeClass('scale-in-btn-outer');
      $logo.removeClass('beat-logo');
      animation = false;
    }, 750);
  });

  $(document).on('click', '.box__btn--inner', function () {
    if (animation) return;
    $inner.removeClass('show-in-inner').addClass('slide-out-inner');
    $outer.removeClass('show-out-outer');

    setTimeout(function () {
      $inner.removeClass('slide-out-inner');
      $btnOuter.addClass('scale-in-btn-outer');
      $logo.addClass('beat-logo');
      animation = false;
    }, slideOutInnerDelay);
  });

  //*** Hearts ***

  var hearts = function hearts() {
    var docFragBg = $(document.createDocumentFragment());
    var docFragInner = $(document.createDocumentFragment());
    var $con = $('.container');
    var $conInnerHearts = $('.box__inner-hearts');

    for (var i = 1, l = 1; i <= numOfHeartsBg, l <= numOfHeartsInner; i++, l++) {
      var heartBg = $('<div class="heart heart-bg-' + i + '">\n    <i class="fa fa-heart" aria-hidden="true"></i>\n  </div>');
      var heartInner = $('<div class="heart heart-inner-' + l + '">\n    <i class="fa fa-heart fa-heart--inner" aria-hidden="true"></i>\n  </div>');
      docFragBg.append(heartBg);
      docFragInner.append(heartInner);
    }

    $con.append(docFragBg);
    $conInnerHearts.append(docFragInner);
  };
  hearts();
});