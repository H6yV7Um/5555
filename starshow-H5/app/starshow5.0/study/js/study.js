var host = commonCla.hostBase + "/v15";
var id = commonCla.analyzParams("id"); 
var cWan = function (num) {
    var orderNum = num;
    if (num > 10000) {
        orderNum = Number(num / 10000).toFixed(1) + "万";
        if (num / 10000 >= 100) {
            orderNum = parseInt(num / 10000 / 100) + "百万";
        }
        if (num / 10000 >= 1000) {
            orderNum = parseInt(num / 10000 / 1000) + "千万";
        }
    }
    return orderNum;
}
// 时间换算
var timesReview = function (created_at, endTime) {
    var timeDiff = commonCla.dateDiff('T', created_at, endTime);
    var timeHtml = "";
    //日
    var dayDiff = commonCla.dateDiff('D', created_at, endTime);
    //小时
    var hDiff = commonCla.dateDiff('H', created_at, endTime);
    //分钟
    var mDiff = commonCla.dateDiff('M', created_at, endTime);
    //秒
    var sTime = commonCla.dateDiff('s', created_at, endTime);

    var timeMark = "前";
    if (sTime < 0) {
        sTime = Number(-sTime);
        timeMark = "后";
    }
    if (hDiff < 0) { hDiff = -hDiff }
    if (dayDiff < 0) { dayDiff = -dayDiff }
    if (sTime < 60) {
        timeHtml = sTime + "秒" + timeMark
    } else if (sTime >= 60 && sTime < 3600) {
        /* timeHtml=Math.round(sTime/60)+"分钟"+sTime%60+"秒"+timeMark;*/
        timeHtml = Math.round(sTime / 60) + "分钟" + timeMark;
    } else if (sTime >= 3600 && sTime < 3600 * 24) {
        timeHtml = hDiff.toFixed(0) + "小时" + timeMark;
    } else if (sTime >= 3600 * 24 && sTime < 3600 * 24 * 30) {
        timeHtml = dayDiff + "天" + timeMark;
    } else if (sTime >= 3600 * 24 * 30 && sTime < 3600 * 24 * 30 * 12) {
        timeHtml = (dayDiff / 30).toFixed(0) + "月" + timeMark;
    } else {
        timeHtml = (dayDiff / 30 / 12).toFixed(0) + "年" + timeMark;
    }

    return timeHtml;
}

var isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
var initShareInfo = function (ret) {
    var data = ret.data.detail;
    $("#share_info").attr("content", "时尚星秀，让你更时尚，让你更闪耀!");
    $("#share_info").attr("title", "来自" + data.user.name + "的分享");
    if (data.photos) {
        $("#share_info").attr("cover", data.photos[0].img);
    }
    $("#share_info").attr("shareUrl", commonCla.shareUrlBase + "/starshow5.0/study/share.html?id=" + id);
}

var getStudyData = function() {
    var url = host + "/study/" + id;

    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        if(ret.code == 200) {
            initShareInfo(ret)
            initStudyPage(ret)
            // 初始化swiper
            var swiper = new Swiper("#pic-swiper", {
              observer: true,
              observeParents: true,
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              },
              on: {
                // 初始化时swiper的高度为第一张图片的高度
                init: function () {
                    var imgH = $(".swiper-wrapper").find(".swiper-slide")
                        .eq(this.activeIndex).attr("data-h");
                    $("#pic-swiper .swiper-wrapper").css({ height: imgH });
                },
                // 滑动的时候根据图片高度动态改变swiper的高度
                slideChangeTransitionStart: function() {
                    var imgH = $(".swiper-wrapper")
                      .find(".swiper-slide")
                      .eq(this.activeIndex).attr("data-h");
                    $("#pic-swiper .swiper-wrapper").animate({ height: imgH }, 200);
                }
              }
            });
            // 查看大图
            handleClcikImg()
            
            //二次分享
            if (isWeiXin()) {
                wx_share($("#share_info").attr("title"),
                    $("#share_info").attr("content"),
                    $("#share_info").attr("shareurl"),
                    $("#share_info").attr("cover"));
            }
        }
    })
}
var initStudyPage = function (ret) {
    var data = ret.data.detail,
        photos = data.photos,
        recommends = ret.data.recommends;
    $("title").html(data.content)
    if(data.type == "1") {      //图片
        var detailPhotoHtml = "";
        var winWidth = $(window).width();
        for (var i in photos) {
            imgH = winWidth / photos[i].width * photos[i].height;
            detailPhotoHtml += `<div class="swiper-slide"  data-h="${imgH}">
                                    <div class="pic-wrap">
                                        <img src="${photos[i].img}">
                                    </div>
                                </div>`;
            $('.swiper-wrapper').html(detailPhotoHtml);
        }
        $(".photo").show()
    } else {                //视频
        $("#video").attr("src", data.video)
        $("#video").attr("poster", photos[0].img);
        
        $(".player").show();
    }
    $(".pic-info .pic-title").html(data.content)
    $(".pic-info .user-head").attr("src", data.user.head_pic)
    $(".pic-info .user-name").html(data.user.name)
    $(".pic-info .time").html(timesReview(data.created_at, ret.current_time))
    $(".pic-info .read span").html(cWan(data.watch_num))

    // 推荐
    if (recommends.length <= 0 ) {
        $("#container").html('<div class="default"><img src="images/default.png"/><span>暂无数据显示~请先浏览其他页面</span></div>')
    }
    var pblHtml = "";
    for (var i = 0; i < recommends.length; i++) {
        var index = getShort($('li'));//查找最短的li  
        var imgUrlArr = recommends[i].photos

        var imgHtml = "";
        for (var j in imgUrlArr) {
            imgHtml += `<img class="img" src="${imgUrlArr[j].img}"/>`
        }
        var imgH = winWidth * 0.45 / imgUrlArr[0].width * imgUrlArr[0].height;
        pblHtml = `<a href="share.html?id=${recommends[i].id}"><div class="item-box">
                        <div class="item-box-inner">
                            <div class="pic" style="height:${imgH}px"  data-type="${recommends[i].type}">
                                ${imgHtml}
                            </div>
                            <div class="item-des">
                                <div class="title two-line">${recommends[i].content}</div>
                                <div class="user">
                                    <img class="user-head" src="${recommends[i].user.head_pic}" alt="">
                                    <div class="user-left">
                                        <div class="user-name one-line">${recommends[i].user.name}</div>
                                        <div class="read">${cWan(recommends[i].watch_num)} · 阅读</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></a>`;
        $('li').eq(index).append(pblHtml);
    }
    // gif()
    // console.log(photos[0].height >= $(window).height() * 0.5)
    // if ($("#video").height() >= $(window).height()-$('pic-info').height()) {
    //     $("#video").height($(window).height() - $('pic-info').height())
    // }
    $("#share_info").attr("types", data.type)
    loadding("hide")

} 
// 点击查看大图
var handleClcikImg = function () {
    $("#pic-swiper").on("click", ".swiper-slide", function() {
      var index = $(this).index();
      var swiper = new Swiper("#pic-view", {
        initialSlide: index,
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      });
      $("#pic-view").fadeIn();
    });

    $("#pic-view").on("click", function(e) {
      $("#pic-view").fadeOut();
    });
}

$(function () {
    getStudyData()
    // window.onscroll = function () {
    //     var li = $('li');
    //     var index = getShort(li);
    //     var minLi = li[index];
    //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (minLi.offsetHeight + minLi.offsetTop < scrollTop + document.documentElement.clientHeight) {
    //         //开关为开，即上一页加载完成，才能开始加载
    //         if (bool) {
    //             bool = false;
    //             // page++;
    //             getLearnData();
    //         }
    //     }
    // }
    $("#btn_download1").bind("click", function () {
        // openApp('home', null);
        var params = {
            "id": commonCla.analyzParams("id"),
            "type": $("#share_info").attr("types")
        }
        openApp_obj("studyDetail", params);

    });
})
function getShort(li) {
    var index = 0;
    var liHeight = li[index].offsetHeight;
    for (var i = 0; i < li.length; i++) {
        if (li[i].offsetHeight < liHeight) {
            index = i;
            liHeight = li[i].offsetHeight;
        }
    }
    return index;
}
var num = 0;
function gif() {
    var imgArr = $("#container .pic")
    var timer = null;
    imgArr.each(function (key, value) {
        var that = $(this);
        var type = $(this).attr("data-type");
        if (type == 2) {
            timer = setInterval(function () {
                num++;
                if (num == $(that).children().length) {
                    num = 0;
                }
                $(that).children().eq(num).show().siblings().hide()
            }, 150)

        }
    })
} 
var loadding = function (showType) {
    if (showType == "show") {
        $(".loadding").show();
        $(".learn-detail").css("opacity", 0);
    } else {
        $(".loadding").hide();
        $(".learn-detail").css("opacity", 1);
    }

}