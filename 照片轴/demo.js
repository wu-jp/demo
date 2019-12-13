var $wrap = $('.wrapper');

setTimeout(function() {
    $wrap.removeClass('init');
},200);

$('.item').on('click',function() {
    $(this).addClass('active');
    $wrap.addClass('wrapper-active');
})
$('.close').on('click',function(e) {
    e.stopPropagation();   //阻止事件冒泡
    $('.active').removeClass('active');
    $wrap.removeClass('wrapper-active');
})