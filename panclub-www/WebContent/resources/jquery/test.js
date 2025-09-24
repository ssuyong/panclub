$(".dg-hd-mo-menu-btn, .dg-hd-mo-menu-panel-overlay").click( function() {
    $(".dg-hd-mo-menu-btn, .dg-hd-mo-menu-panel-overlay, .dg-hd-mo-menu-panel").toggleClass("mo-menu-active");
    /* dg-hd-mo-menu-panel-overlay 활성화 체크 */
    if ($(".dg-hd-mo-menu-panel-overlay").hasClass("mo-menu-active")) {
      $(".dg-hd-mo-menu-panel-overlay").fadeIn();
    } else {
      $(".dg-hd-mo-menu-panel-overlay").fadeOut();
    }
  });

  //메뉴의 + 클릭시 닫히고, 열림
  $('.dg-hd-mo-menu-arrow').click(function(){
    $(this).next('ul').toggleClass('sub-menu-on');
    var $curruntArrow = $(this).toggleClass('menu-arrow-active');
    $(this).parents('li').toggleClass('menu-arrow-active-li');
    $(this).prev('a').toggleClass('dg-point');
    $(this).parents('li').next('li').toggleClass('menu-arrow-active-li-next-li');
  });


