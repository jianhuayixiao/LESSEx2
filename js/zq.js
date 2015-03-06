/**
 * Created by haojianhua on 2014/12/24.
 */

$(function(){

    var $wH = $(window).height();
    var $zqaside = $(".zQaside");

    //固定下拉按钮
    $("#zQsb").on("touchstart", function(){
        var that = $(this);
        if(!$(this).hasClass("zQshow")){
            $("#zQFixed").animate({
                height: $wH - 180
            }, 500, function(){
                that.addClass("zQshow");
            });

        }else{
            $("#zQFixed").animate({
                height: 200
            }, 500, function(){
                that.removeClass("zQshow");
            });
            $zqaside.css("top", 0);
        }
        return false;
    });

    //点赞
    var $zQ = $(".zQ");
    $zQ.on("touchstart", ".like", function(){
        var $par = $(this).parents("dl");
        if(!$par.attr("clicked")){
            $(this).addClass('likeed');
            if($(this).has("b").length){
                var $num = parseInt($(this).has("b").text());
                $num++;
                $(this).find("b").text($num);
            }
            $par.attr("clicked", "true");
        }
        return false;
    });

    //踩
    $zQ.on("touchstart", ".tread", function(){
        var $par = $(this).parents("dl");
        if(!$par.attr("clicked")) {
            $(this).addClass('treaded');
            if ($(this).has("b").length) {
                var $num = parseInt($(this).has("b").text());
                $num--;
                $(this).find("b").text($num);
            }
            $par.attr("clicked", "true");
        }
        return false;
    });

    //表单
    $("#zqbt").on("touchstart", function(){
        var $text = $("#zqin").val();
        if($text === ""){
            $(this).prev().focus();
            return;
        }
        var html = "";
        html += '<dl class="item l"><dt><img src="img/default.jpg" width="80" height="80" /></dt><dd><span class="t">';
        html += '卡西利亚斯';
        html += '</span><div class="c"><i></i><p>';
        html += $text;
        html += '</p><span class="like"></span><span class="tread"></span></div></dd></dl>';
        $("section").append(html);
        var $last = $("section dl:last");
        var $t = parseInt($last.offset().top);
        var $h = parseInt($last.height()) + 32;
        var $num = $t + $h - 290;
        $(document).scrollTop($num);
    });

    //滚动
    var len = $("section dl").length;
    var i = 0;
    var $arr = [];
    var $zqset;
    var $section = $("section");
    $("section>dl").each(function(){
        var $t = parseInt($(this).offset().top);
        var $h = parseInt($(this).height()) + 32;
        var $num = $t + $h - 290;
        var $b = $t + $h - $wH + 90;
        if($b > 0){
            $arr.push($b);
        }
    });
    function srcoll(){
        $(document).scrollTop($arr[i]);
        i++;
        if(i >= len){
            i = $("section dl").length;
            setTimeout(function(){
                $(document).scrollTop(0);
            }, 3000);
            return;
        }
        $zqset = setTimeout(srcoll, 2000);
    }
    $zqset = setTimeout(srcoll, 2000);

    $section.on({
        'movestart': function(e){
            //clearTimeout($zqset);
            e.preventDefault();
        },
        'move': function(e){

        },
        'moveend': function(e){
            $zqset = setTimeout(srcoll, 2000);
        }
    });

    //aside
    var $asH = parseInt($zqaside.height());

        $zqaside.on({
            'movestart': function(e){
                start = {
                    //x: parseInt(box.css('left')),
                    y: parseInt($zqaside.css('top'))
                };
            },
            'move': function(e){
                if( $("#zQsb").hasClass("zQshow")){
                    $zqaside.css({
                        //left: start.x + e.distX,
                        top: start.y + e.distY
                    });
                }
            },
            'moveend': function(e){
                if( $("#zQsb").hasClass("zQshow")) {
                    if ((start.y >= 0 || start.y + e.distY >= 0) && e.distY > 0) {
                        $zqaside.animate({
                            top: 0
                        }, 300);
                    }
                    if (($asH - Math.abs(start.y) <= $wH || start.y === 0 ) && e.distY < 0) {
                        $zqaside.animate({
                            top: -($asH - $wH + 180)
                        }, 300);
                    }
                }
            }
        });

});

