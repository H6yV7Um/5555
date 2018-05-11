
var host = commonCla.hostBase;
var shareHost = "http://s.xingxiu.tv"
var loadMore = true;
var clientFun = function (bridge) {

    $(".video-list").on("click", ".video-item", function (e) {
        var id = $(this).attr("id")
        e.preventDefault()
        setBridgeCallHandler(bridge, {
            'action': '11',
            'nextStep': '1',
            'id': id
        })
    })
    $(".swiper-wrapper").on("click", ".swiper-slide", function (e) {
        var id = $(this).attr("id")
        e.preventDefault()
        setBridgeCallHandler(bridge, {
            'action': '11',
            'nextStep': '1',
            'id': id
        })
    })

}

//下一步操作
var nextStepFun = function (data, bridge) {
    if (data.nextStep == '1') { //TV
        login_token = data.jwt_token;
        //window.location.href = "index.html?jwt_token=" + data.jwt_token;
    } else if (data.nextStep == '8') {
        shareActivity();
    }
    function shareActivity() {
        var title = $("#share_info").attr("title");
        var cover = $("#share_info").attr("cover");
        var share_url = $("#share_info").attr("shareurl");
        var content = $("#share_info").attr("content");

        setBridgeCallHandler(bridge, {
            'action': '3',
            'share': {
                'share_url': share_url,
                'title': title,
                'content': content,
                'cover': cover
            }
        })
    }
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
    var data = ret.data;
    $("#share_info").attr("content", "除了大秀精彩呈现，时尚视觉将深入到T台幕后揭秘更多精彩花絮。");
    $("#share_info").attr("title", "2018中国国际时装周，时尚视觉缤纷呈现");
    $("#share_info").attr("cover", "https://static.pic.xingxiu.tv/test_head_pic/986988/1521783014.jpg");
    $("#share_info").attr("shareUrl", shareHost + "/activity/internationalFashionWeek/share.html");
}

var getPageData = function (type) {
    var pageNum = $(".video-list li").length;
    var params = {
        "current_count": pageNum
    }
    var url = host +"/videoFashionWeek";
    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        if (ret.code == "200") {
            if(type == 1) {
                initPage(ret);
            }
            if (type == 2) {
                initList(ret)
            } 
            initShareInfo(ret)
            var swiper = new Swiper("#banner", {
                pagination: {
                    el: ".swiper-pagination"
                },
                autoplay: true
            });

            //二次分享
            if (isWeiXin()) {
                wx_share($("#share_info").attr("title"),
                    $("#share_info").attr("content"),
                    $("#share_info").attr("shareurl"),
                    $("#share_info").attr("cover"));
            }
        }
    }, params)
}
var initPage = function (ret) {
    var data = ret.data;
    var total = data.total;
    var banner = "";
    for(var i in data.banners) {
        var imgUrl = data.banners[i].cover +"!750x563"
        banner += `<div class="swiper-slide" id=${data.banners[i].id}>
                        <div class="img-outer"><img src=${imgUrl} alt=""></div>
                    </div>`
    }
    $(".swiper-wrapper").html(banner)

    var videoList = "";
    for (var i in data.lists) {
        var imgUrl = data.lists[i].cover + "!750x563";
        videoList += `<li class="video-item" id=${data.lists[i].id}>
                            <div class="img-outer"><img src=${imgUrl} alt=""></div>
                            <div class="video-name"><div class="title">${data.lists[i].title}</div></div>
                        </li>`
    }
    $(".video-list").append(videoList)
    if (total == $(".video-list li").length) {
        loadMore = false;
        $(".no-data").show()
    } else {
        loadMore = true;
    }
}
var initList = function (ret) {
    var data = ret.data;
    var total = data.total;

    var videoList = "";
    for (var i in data.lists) {
        var imgUrl = data.lists[i].cover + "!750x563";
        videoList += `<li class="video-item" id=${data.lists[i].id}>
                            <div class="img-outer"><img src=${imgUrl} alt=""></div>
                            <div class="video-name"><div class="title">${data.lists[i].title}</div></div>
                        </li>`
    }
    $(".video-list").append(videoList)
    if (total == $(".video-list li").length) {
        loadMore = false;
        $(".no-data").show()
    } else {
        loadMore = true;
    }
}
$(function () {
    getPageData(1)
    $(window).scroll(function () {
        // 加载更多
        if (loadMore) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                loadMore = false;
                getPageData(2);
            }
        }
    })
    if ($("#share_info").attr("page") == "share") {
        $(".video-list").on("click", ".video-item", function (e) {
            var id = $(this).attr("id")
            window.location.href = shareHost + "/starshow5.0/video/share.html?id="+id
        })
        $(".swiper-wrapper").on("click", ".swiper-slide", function (e) {
            var id = $(this).attr("id")
            window.location.href = shareHost + "/starshow5.0/video/share.html?id=" + id
        })
    }
})