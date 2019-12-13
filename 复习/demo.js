(function(){
    var oLi = $('li');
    var num = 1;
    var flag = false;
    getDate(); 

    function getDate(){
        if(!flag){
            flag = true;
            $.ajax({
                type: 'GET',
                url: 'http://localhost/web/water/js/data.txt' + num,
                success: addDom,
                beforeSend: function(data){
                    if(data.readyState == 0){
                        $('.loading').fadeIn(100)
                    }
                },
                complete: function (data){
                    if(data.readyState == 200){
                        $('.loading').fadeOut(300)
                    }
                }
            });
            num ++;
        }
    };

    function addDom(data){
        var dataList = JSON.parse(data);
        if(dataList.length > 1){
            dataList.forEach(function(ele, index){
                var iDiv = $('<div class="item"></div>');
                var imgBox = $('<div class="imgBox"></div>');
                var oP = $('<p></p>');
                var img = new Image();
                img.src = ele.preview;
                oP.text(ele.title);
                img.onload = function() {
                    imgBox.append(img);
                    iDiv.append(imgBox).append(oP);
                    var index = getMinLi(oLi);
                    $(oLi[index]).append(iDiv);
                }
            });
            flag = false;
        }
    };

    function getMinLi(dom){
        var minHeight = parseInt($(dom[0]).css('height'));
        var index = 0;
        for(var i = 1; i < dom.length; i++){
            var height = parseInt($(dom[i]).css('height'));
            if(height < minHeight){
                minHeight = height;
                index = i;
            }
        }
        return index;
    };

    $(window).scroll(function(){
        var scrollHeight = $(this).scrollTop();
        var clienHeight = $(window).height();
        var pageHeight = parseInt($(oLi[getMinLi(oLi)]).css('height'));
        if(scrollHeight + clienHeight > pageHeight) {
            getDate();
        }
    })
})();

