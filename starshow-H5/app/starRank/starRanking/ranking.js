var host = commonCla.hostBase + "/";
var shareUrlBase = commonCla.shareUrlBase;
var starId = commonCla.analyzParams("id");
// var starId = "907413";
var loadMore = true;
var timer = null;
var imgUrl = "../assets/images/morentouxiang.png";      

var removeLoadding = function () {
    $(".pageMain").show();
    $(".loadding").hide();
}
var initShareInfo = function (ret) {
    var data = ret.data.starinfo;
    $("#share_info").attr("content", "来星榜看爱豆！爱豆热度就等你来助力！");
    $("#share_info").attr("title", "和我一起为" + data.star_name+"打榜！助Ta登上最热榜单！");
    $("#share_info").attr("cover", data.star_headpic + "?imageView2/1/w/200/h/200/q/75|imageslim");
    $("#share_info").attr("shareUrl", shareUrlBase + "starRanking/share.html?id=" + starId);
}
//初始化数据
var getRankData = function (type) {  
    var pageNum = Math.ceil($(".rank-list li").length / 10);
    var params = {
        "type": type,
        "pageNum": pageNum,
        "pageSize": "10",
        "starId": starId,
    }
    if (get_token() != "" && get_token() != undefined) {
        params.token = get_token()
    }
    var url = host + "hitstar/hitstarlist";
    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        removeLoadding();

        if (textStatus == "success") {
            if (type == "all" ) {
                initShareInfo(ret);
                initPage(ret);
                //二次分享
                if (isWeiXin()) {
                    wx_share($("#share_info").attr("title"),
                        $("#share_info").attr("content"),
                        $("#share_info").attr("shareurl"),
                        $("#share_info").attr("cover"));
                }  
            }
            if(type == "list") {
                initRankList(ret)
                
            }
        } else {
            if (ret.status == 404) {
                $("body").html("<img src='../assets/images/404.png' width='100%' />")
            } else {
                $("body").html("<img src='../assets/images/404-2.png' width='100%' />")
            }

        }
    }, params)
}
// 页面初始化
var initPage = function (ret) {
    var starInfo = ret.data.starinfo;
    var hitUserList = ret.data.hitUserList;
    var listRoll = ret.data.listRoll;
    var hitflag = ret.data.hitflag;
    var total = ret.data.totalCount;
    //明星详情
    $(".star-pic img").attr("src", starInfo.star_headpic)
    $(".star-name").html(starInfo.star_name)
    $(".rank-info .amount span").html(countNum(starInfo.hitlist_index))
    $(".rank-info .devote span").html(countNum(starInfo.total_hit))
    //打榜动态
    var scrollHtml = "";
    for (i in listRoll) {
        if (listRoll[i].user_headpic != "") {
            var imgUrl = listRoll[i].user_headpic + "?imageView2/1/w/200/h/200/q/75|imageslim";
        }
        scrollHtml += `<li class="scroll-item">
                            <div class="scroll-user-pic">
                                <img src="${imgUrl}" onerror="javascript:this.src='../assets/images/morentouxiang.png';">
                            </div>
                            <p class="scroll-user-name one-line"><span>${listRoll[i].user_name}</span>  ${time(listRoll[i].min)}为${starInfo.star_name}打榜</p>
                        </li>`
    }
    $(".rank-scroll ul").html(scrollHtml)
    timer = setInterval(function () {
        $(".rank-scroll ul").css('top', 1 * $(".rank-scroll ul>li").height());
        $(".rank-scroll ul>li").eq(0).appendTo($(".rank-scroll ul"));
        $(".rank-scroll ul").stop().animate({
            top: "0px"
        }, 1000);
    }, 3000)
    // 打榜列表
    var rankHtml = "";
    for (i in hitUserList) {
        if (hitUserList[i].user_headpic != "") {
            var imgUrl = hitUserList[i].user_headpic + "?imageView2/1/w/200/h/200/q/75|imageslim";
        }
        var rankNum = countNum(hitUserList[i].hitlist_num)
        rankHtml += `<li>
                        <div class="rank-num">${hitUserList[i].i}</div>
                        <div class="user-pic">
                            <img src="${imgUrl}" onerror="javascript:this.src='../assets/images/morentouxiang.png';">
                        </div>
                        <div class="user-name">${hitUserList[i].user_name}</div>
                        <div class="vote">贡献
                            <span>${rankNum}</span>次</div>
                    </li>`
    }
    $(".rank-list ul").append(rankHtml)
    $("#share_info").attr("rankNum", hitflag)
}
// 打榜列表
var initRankList = function (ret) {
    var hitUserList = ret.data.hitUserList;
    var rankHtml = "";
    for (i in hitUserList) {
        if (hitUserList[i].user_headpic != "") {
            var imgUrl = hitUserList[i].user_headpic + "?imageView2/1/w/200/h/200/q/75|imageslim";
        }
        rankHtml += `<li>
                        <div class="rank-num">${hitUserList[i].i}</div>
                        <div class="user-pic">
                            <img src="${imgUrl}" onerror="javascript:this.src='../assets/images/morentouxiang.png';">
                        </div>
                        <div class="user-name">${hitUserList[i].user_name}</div>
                        <div class="vote">贡献
                            <span>${hitUserList[i].hitlist_num}</span>次</div>
                    </li>`
    }
    $(".rank-list ul").append(rankHtml)
    if (ret.data.totalCount == $(".rank-list li").length) {
        loadMore = false;
        $(".no-data").show()
    } else {
        loadMore = true;
    }
}
// 打榜
var rank = function () {
    var url = host + "hitstar/hitlist";
    var params = {
        token: get_token(),
        starId: starId
    }
    var rankNum = $("#share_info").attr("rankNum");
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (textStatus == "success") {
            if (ret.reqstate == "0") {
                if (ret.remaincount == "0" && rankNum =="false") {
                    swal({
                        "title": "今日打榜次数已用完",
                        "confirmButtonText": "确定",
                        "confirmButtonColor": "#ff1d3e",
                        "animation": "none",
                        
                    });
                } else {
                    swal({
                        "title": "打榜成功",
                        "confirmButtonText": "确定",
                        "confirmButtonColor": "#ff1d3e",
                        "animation": "none",
                        
                    });
                    setTimeout(() => {
                        window.location.reload();   
                    }, 1000);
                }
                rankNum = ret.remaincount;
            } else if (ret.reqstate == "2" && ret.reqmsg != "") {
                swal({
                    "title": ret.reqmsg,
                    "confirmButtonText": "确定",
                    "confirmButtonColor": "#ff1d3e",
                    "animation": "none",

                });
            } else {
                swal({
                    "title": ret.reqmsg,
                    "confirmButtonText": "确定",
                    "confirmButtonColor": "#ff1d3e",
                    "animation": "none",

                });
            }        
            
        }
    },params)
}
//数以万计
var countNum = function (num) {
    var countedNum = num;
    if (num >= 10000) {
        countedNum = Number(num / 10000).toFixed(1) + "万"
    }
    return countedNum;
}
// 时间换算
var time = function (min) { 
    var timeMark = "前";
    var min = min/1000;
    if (min < 60) {
        timeHtml = Math.floor(min) + "秒" + timeMark
    } else if (min >= 60 && min < 3600) {
        timeHtml = Math.floor(min / 60) + "分钟" + timeMark;
    } else if (min >= 3600 && min < 3600 * 24) {
        timeHtml = Math.floor(min / 3600) + "小时" + timeMark;
    } else if (min >= 3600 * 24 && min < 3600 * 24 * 30) {
        timeHtml = Math.floor(min / 3600/ 24) + "天" + timeMark;
    } else if (min >= 3600 * 24 * 30 && min < 3600 * 24 * 30 * 12) {
        timeHtml = Math.floor(min / 3600 / 24 / 30) + "月" + timeMark;
    } else {
        timeHtml = Math.floor(min / 3600 / 24 / 30 /12) + "年" + timeMark;
    }

    return timeHtml;
}
$(function () {
    getRankData("all")
    $(window).scroll(function () {
        if (loadMore) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() ) {
                loadMore = false;
                getRankData("list")
            }
        }
    })
    $(".rank-btn").on("click", function () {
        // 微信授权          
        if (get_token() == "" || get_token() == undefined) {
            if (isWeiXin()) {
                wx_authorize({ id: starId }, "starRanking")
            } else {
                openApp_obj("home");
            }
        } else {
            rank()
        }
        
    })

})