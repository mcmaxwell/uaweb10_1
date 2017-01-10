$( document ).ready(function() {
  $('.nav-toggle').click(function(){
    $('.menu').toggleClass('active');
    $(this).toggleClass('active');
    return false;
  });
  $( window ).resize(function() {
    if($( window ).width() > 1270) {
      $('.menu').removeClass('active');
      $('.nav-toggle').removeClass('active');
    }
    if($( window ).width() > 768) {
      $('.search-wrapper').removeClass('active');
    }
  });

  $('#main-slider').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCss: false
  });

  $('.stock-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 1270,
      settings: {
        centerMode: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        variableWidth: false
      }
    }
    ]
  });

  $('.news-slider-list').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
    ]
  });
  $('.page-slider-list').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
      useCss: false
  });

  if($('.main').attr("id")){
    $('.menu').find('.' + $('.main').attr("id")).addClass('active');
  }

  $('.search-button').click(function(){
    $('.search-wrapper').toggleClass('active');
    if($( window ).width() < 768) {
      $('.search').toggleClass('active');
    }
    return false;
  });

  $('.list-lang-link').click(function(){
    $('.list-lang').toggleClass('active');
    $('.list-lang-link').removeClass('current');
    $(this).addClass('current');
    return false;
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest(".list-lang-link").length && !$(e.target).closest(".search").length) {
      $('.list-lang').removeClass('active');
      $('.search-wrapper').removeClass('active');
      $('.search').removeClass('active');
    }
    e.stopPropagation();
  });

  var topPos = $('.nav-bar').offset().top;
   $(window).scroll(function() {
    var top = $(document).scrollTop() + 10;
    if (top > topPos) $('.nav-bar').addClass('fixed');
    else $('.nav-bar').removeClass('fixed');
   });

   $('.tabs-link').click(function(){
     if(!$(this).hasClass('active')){
       $('.tabs-link').removeClass('active');
       $('.tabs-panel').removeClass('active');
       $(this).addClass('active');
       $($(this).attr('href')).addClass('active');
       return false;
     } else return false;
   });

   $('.reviews-block').perfectScrollbar();
});
