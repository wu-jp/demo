var arr = [
    {'url':'./img/tq1.jpg'},
    {'url':'./img/tq2.jpg'},
    {'url':'./img/tq3.jpg'},
    {'url':'./img/tq4.jpg'},
    {'url':'./img/tq5.jpg'},
    {'url':'./img/tq6.jpg'},
    {'url':'./img/tq7.jpg'},
    {'url':'./img/tq8.jpg'},
    {'url':'./img/tq9.jpg'},
    {'url':'./img/tq10.jpg'},
    {'url':'./img/tq11.jpg'},
    {'url':'./img/tq12.jpg'}
];
function init() {
    renderPage();//动态生成dom
    $('li').css('height',$('li').width());
    bindEvent();//点击执行
}
init();


function renderPage() {
    var str = '';
    arr.forEach(function(ele, index){
        str += '<li><img src=" '+ ele.url +' " alt=""></li>'
    });
    $('.wrapper ul').append($(str));
}

function bindEvent() {
    var index;
    $('ul').on('tap','li',function(){
        $('ul').css('display','none');
        index = $(this).index();
        loadImg(index);
    });
    $('.show').on('tap',function(){
        $(this).css('display','none');
        $('ul').css('display', 'block');
    }).on('swipeLeft',function(){
        index ++;
        if(index < arr.length) {
            // console.log('tq');
            loadImg(index);
        }
    }).on('swipeRight',function(){
        index --;
        if(index > 0){
            loadImg(index);
        }
    })
}

function loadImg(index){
    // console.log('tq');
    $('.show').html('');
    var deviceW_H = $(window).width()/$(window).height();
    var img = new Image();
    img.src = arr[index].url;
    $('.show').css('display', 'block').append($(img));
    img.onload = function(){
        var imgW_H = img.width/img.height;
        if(imgW_H < deviceW_H){
            $(this).css('height','100%');
        }else{
            $(this).css('width','100%');
        }
    }
}