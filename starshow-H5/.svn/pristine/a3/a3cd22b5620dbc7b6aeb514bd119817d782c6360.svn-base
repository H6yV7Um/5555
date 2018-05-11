// JavaScript Document
//var host = "http://123.57.0.118:5000/v6/"; //测试
var host = commonCla.hostBase+"/v12/"; //正式

var title = "";
var t = "";

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
var cWan=function(num){
    var orderNum=num;
    if(num>10000){
        orderNum=Number(num/10000).toFixed(1)+"万";
    if(num/10000>=100){
         orderNum=parseInt(num/10000/100)+"百万";
        }
        if(num/10000>=1000){
         orderNum=parseInt(num/10000/1000)+"千万";
        }
      }
      return orderNum;
  }
var analyzParams = function (param_name) {
    var url = window.location.search.split("?")[1];
    if (url == "" || url == undefined) return url;
    url = url.split(param_name + "=")[1];
    if (url == "" || url == undefined) {
        url = "";
        return url;
    }
    if (url.indexOf("&") > 0) {
        url = url.split("&")[0];
    }
    return url;
}

var ajaxCommonFun = function (url, type, callbackFun, params) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        async: false,
        cache: false,
        data: params,
        success: function (data) {
                //回调函数
                if (callbackFun) {
                    callbackFun(data);
                }
            },
            error: function () {}
    })
}
 var id = analyzParams("id") == undefined ? "" : analyzParams("id");
var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token");
$(function () {
    var myDate = new Date();
    var v_url = host + "lsVideo/" + id;
    $.getJSON(v_url, function (data) {
        if (data.code == '200') { //sdk 移植
            var player = new CloudVodPlayer();
             $("#tvStatus").attr("mms_id",data.data.lsVideo.mms_id); 
            player.init({uu: "853371",vu: data.data.lsVideo.mms_id,p:"102",pu:"2576"}, "player");
 				//player.init({uu:"cfd9191aeb",vu:"79ff602f42"},"player");

            var v_detail = '<h1 desc="'+data.data.lsVideo.synopsis+'" aid="' + data.data.lsVideo.id + '">' + data.data.lsVideo.video_name + '</h1>';
            v_detail += '<div class="share_info"><span class="pr10">' + cWan(data.data.lsVideo.watch_num) + '次观看</span>';
            v_detail += '<span class="created">' + data.data.lsVideo.created_at + '</span>';

            if (data.data.lsVideo.is_like == 1) {
                v_detail += '<div class="share_video_title_p "><p><img src="images/newLikeCur.png" id="btn-zan" class="newLike" /><span class="clickicon_span" zanNum="'+data.data.lsVideo.like_num+'">' + cWan(data.data.lsVideo.like_num) + '</span></p></div>';
            } else {
                v_detail += '<div class="share_video_title_p "><p><img src="images/newLike.png" id="btn-zan" class="newLike" /><span class="clickicon_span" zanNum="'+data.data.lsVideo.like_num+'">' +  cWan(data.data.lsVideo.like_num) + '</span></p></div>';
            }
            $('.share_video_title').append(v_detail);
            var str = "";
            for (var i = 0; i < data.data.relatedVideos.length; i++) {
                if (id == data.data.relatedVideos[i].id) {
                    str += '<li class="share_list_li pcur"><a href="javascript:;">' + '<div class="share_list_img"><div class="nowPlay"><p>正在播放<i></i></p></div><img src="' + data.data.relatedVideos[i].cover + '" ></div>' + '<div class="share_list_detail"><h3>' + data.data.relatedVideos[i].video_name + '</h3>' + '<h6>' + '<span class="share_list_look"><em></em><strong>' + cWan(data.data.relatedVideos[i].watch_num) + '</strong></span>' + '<span class="share_list_like"><em></em><strong>' + cWan(data.data.relatedVideos[i].like_num) + '</strong></span>' + '</h6>' + '</div>' + '</a>' + '</li>';
                } else {
                    str += '<li class="share_list_li"><a href="'+commonCla.shareUrlBase+'/starshow5.0/leFashion/share.html?id=' + data.data.relatedVideos[i].id + '">' + '<div class="share_list_img"><img src="' + data.data.relatedVideos[i].cover + '"></div>' + '<div class="share_list_detail">' + '<h3>' + data.data.relatedVideos[i].video_name + '</h3>' + '<h6>' + '<span class="share_list_look"><em></em><strong>' +  cWan(data.data.relatedVideos[i].watch_num)+ '</strong></span>' + '<span class="share_list_like"><em></em><strong>' + cWan(data.data.relatedVideos[i].like_num) + '</strong></span>' + '</h6>' + '</div>' + '</a>' + '</li>';
                }

            }


            var uTime = data.data.lsVideo.created_at;
            var title = data.data.lsVideo.video_name;

            document.title = title;
            $('#sharelist').append(str); /*发布时间*/
            get_time(uTime);
            $(".pcur").click(function () {
                BOX_show("curPlay");
                setTimeout(function () {
                    BOX_remove("curPlay")
                }, 1000)
            })

            function get_time(uTime) {
                //JavaScript函数：
                var minute = 1000 * 60;
                var hour = minute * 60;
                var day = hour * 24;
                var halfamonth = day * 15;
                var month = day * 30;

                function getDateDiff(dateTimeStamp) {
                    var now = new Date().getTime();
                    var diffValue = now - dateTimeStamp;
                    if (diffValue < 0) {
                        //若日期不符则弹出窗口告之
                        //alert("结束日期不能小于开始日期！");
                    }
                    var monthC = diffValue / month;
                    var weekC = diffValue / (7 * day);
                    var dayC = diffValue / day;
                    var hourC = diffValue / hour;
                    var minC = diffValue / minute;
                    if (monthC >= 1) {
                        result = +parseInt(monthC) + "个月前";
                    } else if (dayC >= 1) {
                        result = +parseInt(dayC) + "天前";
                    } else if (hourC >= 1) {
                        result = +parseInt(hourC) + "个小时前";
                    } else if (minC >= 1) {
                        result = +parseInt(minC) + "分钟前";
                    } else result = "刚刚发表";
                    return result;
                }

                function getDateTimeStamp(dateStr) {
                        return Date.parse(dateStr.replace(/-/gi, "/"));
                    }
                    //将后台取到的值转换成毫秒
                var data = getDateTimeStamp(uTime);
                //得到结果的方法
                var result = getDateDiff(data);
                //给span赋值的方法，在页面加载的时候调用，注意body开始标签中使用onload调用此方法
                $(".created").text(result);
            }

        }
        if (data.code == '404') {
            //window.location.href = "notFound.html";
        }

    });

})
var app_jump=function(){
     var params = {
        "liveID":analyzParams("id"),
        "mms_id":$("#tvStatus").attr("mms_id"),
      };
      openApp_obj('leReplay', params);
 }
var initLivePage = function () {

     $(".app_link").click(function() {
      app_jump();
     });
    //localstorage unlike 赋值
   
    var storage = window.localStorage;
    if (!storage.getItem("unlike" + id)) storage.setItem("unlike" + id, 0);
    //点赞
    $("#btn-zan").live('tap', function () {
        if (isWeiXin()) {
            if (jwt_token == "" || jwt_token == undefined) {
                //正式
               var redirect = encodeURIComponent("http://star.xingxiu.tv/oauth2?id=" + id + "&type=lsVideo&env=production");
                //测试
               // var redirect = encodeURIComponent("http://star.xingxiu.tv/oauth2?id=" + id + "&type=lsVideo&env=development")
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect
                    + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
            }

        }
        var zan = $(this).attr("zan");
      

        var liveLikeUrl = host + "lsVideo/" + id + "/like?jwt_token=" + jwt_token;
        //var liveLikeUrl = host + "video/" + id + "/like";
        var unlike = localStorage.getItem("unlike" + id);
        var params = {
            "id": id,
            "type": "Live",
            "unlike": unlike
        }
        var thisObj = $(this);
        //+-1操作
        var zanNum = Number(thisObj.next("span").attr("zanNum"));
        var zanNumAttr = Number(thisObj.attr("zan"));
        if (unlike == 0) {
            thisObj.attr("src", "images/newLikeCur.png");
            thisObj.next("span").html(cWan(Number(zanNum + 1)));
            thisObj.attr("zan", Number(zanNumAttr + 1))
        } else {
			BOX_show("zan");
				setTimeout(function() {
					BOX_remove("zan")
				}, 1000)
            thisObj.attr("src", "images/newLike.png");
            thisObj.next("span").html(Number(zanNum - 1) < 0 ? 0 : Number(zanNum - 1));
            thisObj.attr("zan", Number(zanNumAttr - 1) < 0 ? 0 : Number(zanNum - 1))
        }
        thisObj.addClass("animated");
        thisObj.addClass("rubberBand");
        setTimeout(function () {
            //thisObj.find("img").attr("src","assets/images/icon-like.png");
            thisObj.removeClass("animated");
            thisObj.removeClass("rubberBand")
        }, 500);
        //+1操作end
        ajaxCommonFun(liveLikeUrl, "post", function (resultData) {
            if (resultData != "" && resultData != null) {
                if (resultData.code == "200") {
                    if (unlike == 0) {
                        storage.setItem("unlike" + id, 1);
                    } else {
                        storage.setItem("unlike" + id, 0);
                    }
                }
            }
        }, params)

    })
}
$(function () {
    initLivePage();

})