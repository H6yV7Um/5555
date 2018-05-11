var host = commonCla.hostBase + "/";
var shareUrlBase = commonCla.shareUrlBase;
var crewId = commonCla.analyzParams("id");
// var crewId = "4";
var removeLoadding = function () {
    $(".pageMain").show();
    $(".loadding").hide();
}
var initShareInfo = function (ret) {
    var data = ret.data.starinfo;
    $("#share_info").attr("content", "加入演艺圈的机会近在咫尺！就等你来参与了！");
    $("#share_info").attr("title", ret.data.crew_name +"招人啦！速来报名");
    $("#share_info").attr("cover", ret.data.crew_headpic + "?imageView2/1/w/200/h/200/q/75|imageslim");
    $("#share_info").attr("shareUrl", shareUrlBase + "crewRecruit/share.html?id=" + crewId);
}
//获取剧组简介数据
// type: 剧组详情 crewDes; 剧组简介：intro； 招募详情：recruit；
var getCrewData = function (type) {
    var params = {
        "crewId": crewId
    }
    switch (type) {
        case "crewDes": var urlType = "crewBrief"; break;
        case "intro": var urlType = "crewIntroduction2"; break;
        case "recruit": var urlType = "crewRecruit"; break;
    }
    var url = host + "starRoad/" + urlType ;
    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        removeLoadding();

        if (textStatus == "success") {
            if (type == "crewDes" ) {
                initCrewDes(ret)
                initShareInfo(ret)
                //二次分享
                if (isWeiXin()) {
                    wx_share($("#share_info").attr("title"),
                            $("#share_info").attr("content"),
                            $("#share_info").attr("shareurl"),
                            $("#share_info").attr("cover"));
                }
            }
            if (type == "intro") {
                initIntro(ret)
            }
            if (type == "recruit") {
                initRecruit(ret)
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
// 剧组详情
var initCrewDes = function (ret) {
    var data = ret.data;
    $(".crew-pic img").attr("src", data.crew_headpic)
    $(".crew-title").html(data.crew_name)
    $(".crew-des").html(data.crew_brief)
    $(".site").html(data.photo_place)
    $(".number b").html(data.recruit_people)
    if (data.status == 1) {
        $(".crew-status").html("招聘中")        
    }else {
        $(".crew-status").html("已结束")                
    }
}
// 剧组简介
var initIntro = function (ret) {
    var data = ret.data;
    $(".crew-intro").html(data.crew_introduce)
}
// 招募详情
var initRecruit = function (ret) {
    var data = ret.data.recruit_detail;
    var recuitHtml= "";
    for (i in data) {        
        recuitHtml += `<tr>
                            <td>${data[i].post}</td>
                            <td>${data[i].number}</td>
                            <td>${data[i].salary}</td>
                        </tr>`
    }
    $(".recruit table").append(recuitHtml)
}
$(function () {
    getCrewData("crewDes")
    getCrewData("intro")
    getCrewData("recruit")
    $(".crew-nav div").on("click", function () {
        $(this).addClass("select").siblings().removeClass("select");
        $(".crew-tab div").eq($(this).index()).show().siblings().hide();
    });
    $(".sign-up").click(function () {
        openApp_obj("home")
    })
})