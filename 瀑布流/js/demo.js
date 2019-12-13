(function() {
    var oLi = $('li');
    var num = 1;
    var flag = false;
    getData();
    function getData() {
        if(!flag) {
            flag = true;
            $.ajax({
                type: 'GET',   //请求方式
                // url: 'http://localhost/web/water/js/data.txt',s
                url: 'http://localhost/web/water/js/getPics.php?cpage=' + num,   //请求路径
                success: function (data) {
                    console.log(JSON.parse(data));
                },
                // async:true/false,   是否异步请求，默认true
                // cache:true/false,   是否缓存，默认false
                // dataType：xml/html/srcipt/json/jsonp/text   服务器返回的数据类型
                success: addDom,    //请求成功执行
                beforeSend:function(data) {    //请求状态
                    console.log(data.readyState);
                    if(data.readyState == 0) {
                        $('.loading').fadeIn(100) //淡入
                    }
                },
                complete:function(data) {      //请求状态
                    console.log(data.status)
                    if(data.status == 200) {
                        $('.loading').fadeOut(300) //淡出
                    }
                }
            });
            num ++;
        }
        
    };
    function addDom(data) {
        var dataList = JSON.parse(data);
        if(dataList.length > 1){
            dataList.forEach(function(ele, index) {
                // ele.praview   ele.title
                var iDiv = $('<div class="item"></div>'),
                    imgBox = $('<div class="imgBox"></div>'),
                    oP = $('<p></p>'),
                    img = new Image();
                img.src = ele.preview;
                oP.text(ele.title);
                img.onload = function () {
                    imgBox.append(img);
                    iDiv.append(imgBox).append(oP);
                    var index = getMinLi(oLi);
                    $(oLi[index]).append(iDiv);
                }
            })
            flag = false;
        }
        
    };
    function getMinLi(dom) {
        var minHeight = parseInt($(dom[0]).css('height'));
        var index = 0;
        for(var i = 1; i < dom.length; i++){
            var height = parseInt($(dom[i]).css('height'));
            if(height < minHeight) {
                minHeight = height;
                index = i;
            }
        }
        console.log(index);
        return index;
    };
    
    $(window).scroll(function() {
        var scrollHeight = $(this).scrollTop();
        var clientHeight = $(window).height();
        var pageHeight = parseInt($(oLi[getMinLi(oLi)]).css('height'));
        if(scrollHeight + clientHeight > pageHeight) {
            getData();
        }
    })
})();
