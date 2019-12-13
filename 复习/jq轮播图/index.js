// 1.点击 btn --->>获取 nowindex --->> 改变left值
// 2.点击小圆点 --->>获取当前小圆点的index值 --->> 改变left值
// 3.自动播放 --->> 相当于定时点击 nextbtn --->> 改变left值


var len = 5,
    nowIndex = 0, 
    itemWidth = 600,  // 图片的宽度
    timer,
    flag = true;

function init() {
    bindEvent();    // 点击
    sliderAuto();   // 自动
}
init();


function bindEvent() {
    $('.order li').add('.prev-btn').add('.next-btn').on('click',function() {
        if($(this).attr('class') == 'prev-btn'){
            move('prev');
        }else if($(this).attr('class') == 'next-btn'){
            move('next');
        }else{
            var index = $(this).index();
            move(index);
        }
        changeStyle();  //图片切换  小圆点也要动
    });
    // 鼠标放到 wrapper上 出现btn按钮
    $('.wrapper').on('mouseenter',function(){
        $('.btn').show();
        clearTimeout(timer);
    }).on('mouseleave',function() {
        $('.btn').hide();
        sliderAuto();
    })
}

function move(dir) {    //运动时 nowindex值 的计算
    if(flag){
        flag = false;
        if(dir == 'prev' || dir == 'next'){
            if(dir == 'prev'){
                if(nowIndex == 0){
                    $('.img-box').css('left',-(len * itemWidth));
                    nowIndex = len - 1;
                }else{  
                    nowIndex --;
                }
            }else{  
                if(nowIndex == 4){
                    $('.img-box').animate({
                        'left': -(len * itemWidth)
                    },function(){
                        $(this).css('left','0')
                    });
                    nowIndex = 0;
                }else{
                    nowIndex ++;
                }
            }
        }else{
            nowIndex = dir;
        }
        slider();
    }
    
}
function slider() {     // 根据 nowindex 来运动多少距离
    $('.img-box').animate({
        'left' : -(nowIndex * itemWidth)
    },function(){
        sliderAuto();   
        flag = true;
    })
}

function sliderAuto() {    //自动轮播
    clearTimeout(timer);
    timer = setTimeout(function() {
        move('next');
        changeStyle();
    },1500);
}   

function changeStyle() {   //下面的小点随着图片动
    $('.active').removeClass('active');
    $('.order li').eq(nowIndex).addClass('active');
}
