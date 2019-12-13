var ppt = {
    len: $('.slider').length,
    $wrap: $('.wrapper'),
    $slider: $('.slider'),
    nowIndex: 0,
    lastIndex: undefined,
    flag: true,
    timer: undefined,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);//动态生成dom
            this.bindEvent();//点击事件
            this.sliderAuto();//自动播放
        }
    },
    //动态生成小圆点 和 btn
    createDom: function (len) {
        var str = '',
            btnStr = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                str += '<li class="active"></li>'
            } else {
                str += '<li></li>'
            }
        }
        str = '<div class="slider-order"><ul>' + str + '</ul></div>';
        btnStr = '<div class="slider-btn">\
                    <span class="left-btn"></span>\
                    <span class="right-btn"></span>\
                </div>';

        this.$wrap.append(str).append(btnStr);
    },
    bindEvent: function () {
        var self = this;
        $('li').add($('.left-btn')).add($('.right-btn')).on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                // self.getIndex('left');
                self.tool('left');
            } else if ($(this).attr('class') == 'right-btn') {
                // self.getIndex('right');
                self.tool('right');
            } else {
                // self.getIndex($(this).index());
                self.tool($(this).index());
            }
            // self.changActive(self.nowIndex);
            // self.$slider.eq(self.lastIndex).trigger('leave');
            // self.$slider.eq(self.nowIndex).delay(300).trigger('come');
        });
        
        //创建两个事件 切换页面开始和结束的动画
        this.$slider.on('leave', function () {
            $(this).fadeOut(300).find($('img')).animate({ width: '0%' })
        })
        this.$slider.on('come', function () {
            $(this).fadeIn(300).find($('img')).delay(200).animate({
                width: '25%'
            }, 200, function () {
                self.flag = true;
                self.sliderAuto();
            });

        })

    },

    //获取index值
    getIndex: function (dir) {
        this.lastIndex = this.nowIndex;
        if (dir == 'left') {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        } else if (dir == 'right') {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        } else {
            this.nowIndex = dir;
        }
    },

    //小圆点动态变色
    changActive: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },

    //加锁
    tool: function (text) {
        var self = this;
        if (self.flag) {
            self.flag = false;
            self.getIndex(text);
            if (self.lastIndex !== self.nowIndex) {  //防止点击当前页面对应的小圆点
                self.changActive(self.nowIndex);
                self.$slider.eq(self.lastIndex).trigger('leave');
                self.$slider.eq(self.nowIndex).delay(300).trigger('come');
            }
        }
    },

    //自动播放
    sliderAuto: function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.tool('right');
        }, 2000)
    }


}
ppt.init();