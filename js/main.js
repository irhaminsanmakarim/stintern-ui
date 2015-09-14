$('.open-menu').click(function(){
  $('html').toggleClass('menu-open');
});

$('.open-search-modal').click(function(){
  $('html').toggleClass('search-modal-open');
});

$('#open-form').click(function(){
  $('.support').toggleClass('open-form');
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});