$(document).ready(function() {

  const $btnOuter = $('.box__btn--outer');
  const $btnInner = $('.box__btn--inner');
  const $inner = $('.box__inner');
  const $outer = $('.box__outer');
  const $logo = $('.box__outer-logo');
  let slideOutInnerDelay = 650;
  let animation = false;
  let numOfHeartsBg = 50; // Change this variable also in CSS
  let numOfHeartsInner = 25; // Change this variable also in CSS

  $(document).on('click', '.box__btn--outer', function() {
    if (animation) return;
    animation = true;
    $inner.addClass('show-in-inner');
    $outer.addClass('show-out-outer');

    setTimeout(function() {
      $btnOuter.removeClass('scale-in-btn-outer');
      $logo.removeClass('beat-logo');
      animation = false;
    }, 750)
  });

  $(document).on('click', '.box__btn--inner', function() {
    if (animation) return;
    $inner.removeClass('show-in-inner')
      .addClass('slide-out-inner');
    $outer.removeClass('show-out-outer');

    setTimeout(function() {
      $inner.removeClass('slide-out-inner');
      $btnOuter.addClass('scale-in-btn-outer');
      $logo.addClass('beat-logo');
      animation = false;
    }, slideOutInnerDelay)
  });

  //*** Hearts ***

  let hearts = function() {
    const docFragBg = $(document.createDocumentFragment());
    const docFragInner = $(document.createDocumentFragment());
    const $con = $('.container');
    const $conInnerHearts = $('.box__inner-hearts');

    for (var i = 1, l = 1; i <= numOfHeartsBg, l <= numOfHeartsInner; i++, l++) {
      let heartBg = $(`<div class="heart heart-bg-${i}">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </div>`);
      let heartInner = $(`<div class="heart heart-inner-${l}">
    <i class="fa fa-heart fa-heart--inner" aria-hidden="true"></i>
  </div>`);
      docFragBg.append(heartBg);
      docFragInner.append(heartInner);
    }

    $con.append(docFragBg);
    $conInnerHearts.append(docFragInner);
  }
  hearts();

});