var host = commonCla.hostBase;
// var host = "http://test.startvshow.com";
var shareHost = "http://s.xingxiu.tv"
var jwt_token = commonCla.analyzParams("jwt_token");
var loadMore = true;

var clientFun = function (bridge) {

    $(".js-apply").click(function (e) {
        e.stopPropagation();
        var token = commonCla.analyzParams("jwt_token");
        if (token == "" || token == undefined) {
            e.preventDefault()
            setBridgeCallHandler(bridge, {
                'action': '1',
                'nextStep': '1'            
            })
        } else {
            beauty.getApplyList(2);
        }
    })
    $(".beauty-page").on("click", ".write-report", function () {
        uploadCommon(bridge)
    })

}
//下一步操作
var nextStepFun = function (data, bridge) {
    if (data.nextStep == '1') { //登录
        login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    } else if (data.nextStep == '2') {  //上传报告成功
        jwt_token_login = data.jwt_token;
        if(jwt_token=="" || jwt_token==undefined){
         window.location.href = "index.html?tab=report&jwt_token=" + data.jwt_token;
        }
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
var uploadCommon = function (bridge) {
    var params = {
        'action': '9',
        'nextStep': '2',
        'activityType': '11',
        'picTitle': '上传报告图片',
        'picBtnCon': '提交',
        'works_status': "2",
        'status': 'img'//imgAndTv    TV      img
    }

    setBridgeCallHandler(bridge, params)

}

// 获取验证码
var getVerifyCode = function (mobile, type, obj) {
    // var that = $(obj)
    var url = host + "/v15/sms/verifyCode";
    var params = {
        "mobile": mobile,
        "picture_url": $("#getPicCode img").attr("src"),
        "picture_code" : $("#picCode").val(),
        "type": type,
        "sms_token": mobile,
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (ret.code == "200") {
            sAlert_auto(ret.data, 1000)
            invokeSettime($(obj), mobile, type)
        } else if (ret.code == "423") {
            sAlert_auto(ret.error, 1000)
            beauty.getPicCode()
        } else {
            sAlert_auto(ret.error, 1000)
        }
    }, params)
}
// 获取验证码倒计时
function invokeSettime(obj, mobile, type) {
    var countdown = 120;
    settime(obj);

    function settime(obj) {
        if (countdown == 0) {
            $(obj).removeAttr("disabled");
            $(obj).val("获取");
            countdown = 120;
            return;
        } else if ($(obj).parent().find("#tel").val() == "") {
            $(obj).val("获取");
        } else {
            $(obj).attr("disabled", true)
            $(obj).val("(" + countdown + ") s");
            countdown--;
        }
        codeTimer = setTimeout(function () {
            settime(obj)
        }, 1000)
    }
}
var initShareInfo = function () {
    $("#share_info").attr("content", "水之密语，唤醒秀发水感光泽");
    $("#share_info").attr("title", "免费申领|AQUAIR水之密语净澄水活系列");
    $("#share_info").attr("cover", "https://static.pic.xingxiu.tv/test_pictures/44/71d0478fb1bef3a695a23ae10d07fa8a.jpg");
    $("#share_info").attr("shareUrl", commonCla.shareUrlBase + "/activity/beauty/share.html");
}
var  beauty = {
    initPage : function () {
        beauty.changeTab()
        beauty.getApplyList(1)
        initShareInfo()

        // 二次分享
        $(".dis-apply").on("click", function () {
            sAlert_auto("活动已结束", 1000)
        })
        if (isWeiXin()) {
            wx_share($("#share_info").attr("title"),
                $("#share_info").attr("content"),
                $("#share_info").attr("shareurl"),
                $("#share_info").attr("cover"));
        }
    },
    // 申请状态    0未报名，1已报名，2已通过
    getApplyStatus : function (num) {
        var num = num;
        var params = {
            "jwt_token": jwt_token
        }
        var url = host + "/aquair/checkStatus";
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if (ret.code == "200") {
                var status = ret.data.status;
                // var status = 0;
                    if (status == 0) {  //没报名，活动结束
                        if (num >= 30) {
                            $(".dis-apply").show()
                            $(".js-apply").hide()
                        }else {
                            $(".js-apply").show()
                        }
                    } else if (status == 1) {   //已报名，写报告
                        $(".write-report").show()
                    } else if (status == 2) {    //写过报告，置灰
                        $(".dis-report").show()
                    } else {
                        if (num >= 30) {
                            $(".dis-apply").show()
                            $(".js-apply").hide()
                        } else {
                            $(".js-apply").show()
                        }
                    }
                
            } else {
                sAlert_auto("请刷新重试", 1000)
            }
        }, params)
    },
    // 选项卡
    changeTab : function () {
        $(".nav").on("click", "li", function (e) {
            e.stopPropagation();
            var index = $(this).index()
            $(this).addClass("select").siblings().removeClass("select")
            $(".con li").eq(index).show().siblings().hide()
            if(index == 2) {
                beauty.getReportList()
            }
        })
    },
    // 获取报告列表
    getReportList : function () {
        var pageNum = $(".report-list .report-item").length;
        var params = {
            "current_count": pageNum,
            "count": "10"
        }
        var url = host +"/aquair";
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if(ret.code == "200") {
                beauty.initReportList(ret)
            }
        }, params)
        
    },
    initReportList :function (ret) {
        var data = ret.data,
            total = data.total,
            page_data = data.page_data,
            reportHtml = "",
            photo = "",
            photoHtml = "";
        for (var i in page_data) {
            photos = page_data[i].photos;
            if(photos !== null) {
                for(var j in photos) {
                    photoHtml += `<div class="img-item"><img src="${photos[j]}" alt=""></div>`
                }
            } else {
                photoHtml = "";
            }
            reportHtml += `<div class="report-item">
                                <div class="report-head">
                                    <div class="user-pic"><img src="${page_data[i].user.head_pic}" alt=""></div>
                                    <div class="user-name">${page_data[i].user.name}</div>
                                </div>
                                <div class="report-time">
                                    ${page_data[i].updated_at}
                                </div>
                                <div class="report-con">
                                    ${page_data[i].content}
                                </div>
                                <div class="report-img" imgArr="${photos}">
                                    ${photoHtml}
                                </div>
                            </div>`
            photoHtml = ""
        }
        $(".report-list .list-con").append(reportHtml)
        if ($(".report-list .report-img").children().length > 0) {
            $(".report-list .report-img").show()
        }
        if (total == $(".report-list .report-item").length) {
            loadMore = false;
            $(".no-data").show()
        } else {
            loadMore = true;
        }
    },
    // 获取申请列表
    getApplyList : function (type) {
        var url = host + "/aquair/apply";
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if (ret.code == "200") {
                beauty.initApplyList(ret,type)
            }
        })
    },
    initApplyList : function (ret,type) {
        var data = ret.data,
            page_data = ret.data.page_data,
            applyHtml = "";
        for (var i in page_data) {
            applyHtml += `<div class="head-item"><img src="${page_data[i].user.head_pic}" alt=""></div>`
        }
        $(".head-list").html(applyHtml)
        $(".apply-list .num").html(data.total)
        
        if (jwt_token != "" && jwt_token != undefined) {
            beauty.getApplyStatus(data.total)
        } else {
            $(".js-apply").show()
        }
        var type = type;
        if(type == 2) {
            if (data.total < 30) {
                beauty.showAlert()
            } else {
                sAlert_auto("活动已结束", 1000)
                $(".dis-apply").show()
                $(".js-apply").hide()
            }
        }
    },
    // 弹出报名框
    showAlert : function () {
        $(".beauty-page").addClass("blur")
        popup($(".alert"))
        $(".mask").show()
        $(".alert").fadeIn()
        // $("body").css("position","fixed")
        beauty.getPicCode()
        beauty.getCode()
        handleAlert.OpenMask()
        $("#submit").off("click").click(function () {
            beauty.postVerify()
        })
        $("#getPicCode").on("click", function () {
            beauty.getPicCode()
        })
        $(".mask").on("click", function () {
            beauty.hideAlert()
        })
    },
    hideAlert : function () {
        $(".beauty-page").removeClass("blur")
        $(".mask").hide()
        $(".alert").fadeOut()
        // $("body").css("position", "relative")
        handleAlert.CloseMask()
            
    },
    // 获取图品验证码
    getPicCode : function () {
        var url = host + "/v15/sms/getPictureCode";
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if (ret.code == "200") {
                $("#getPicCode img").attr("src", ret.data)
            } else {
                sAlert_auto(ret.error, 1000)
            }
        })
    },
    // 获取手机验证码
    getCode : function () {
        var telReg = /^1[34578]\d{9}$/i;
        $("#getCode").off('click').click(function () {
            var tel = $("#tel").val().trim();
            if ($("#tel").val() == "") {
                sAlert_auto("请输入电话号码", 1000)
            } else if (!telReg.test(tel)) {
                sAlert_auto("请输入正确的手机号", 1000)
            } else if ($("#picCode").val() == "") {
                sAlert_auto("请输入图片中的验证码", 1000)
            } else {
                getVerifyCode($("#tel").val(), "verificationCode", $(this))
            }
        })
    },
    // 提交申请
    postApply : function () {
        var params = {
            "name": $("#name").val(),
            "mobile": $("#tel").val(),
            "address": $("#address").val(),
            "sms_token": $("#tel").val(),
            "verify_code": $("#code").val(),
            "jwt_token": jwt_token
        }
        var url = host + "/aquair";
        commonCla.ajaxCommonFun(url, "post", function (ret, textStatus, request) {
            if (ret.code == "200") {
                sAlert_auto(ret.data, 1000)
                beauty.hideAlert()
                $(".js-apply").hide()
                $(".write-report").show()
            } else if (ret.code == "422") {
                sAlert_auto(ret.error, 1000)
            } else if (ret.code == "421") {
                sAlert_auto(ret.error, 1000)
                beauty.hideAlert()
                $(".js-apply").hide()
                $(".dis-apply").show()
            } else {
                sAlert_auto(ret.error, 1000)
            }
        }, params)
    },
    postVerify : function () {
        var nameReg = /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,10}$/;
        var name = $("#name").val().trim()
        if (name == "") {
            sAlert_auto("请输入姓名", 1000)
        } else if (!nameReg.test(name)) {
            sAlert_auto("姓名不得超过10位", 1000)
        } else if ($("#tel").val() == "") {
            sAlert_auto("请输入电话号码", 1000)
        } else if ($("#code").val() == "") {
            sAlert_auto("请输入验证码", 1000)
        } else if ($("#picCode").val() == "") {
            sAlert_auto("请输入图形验证码", 1000)
        } else if ($("#address").val() == "") {
            sAlert_auto("请输入领取地址", 1000)
        } else {
            beauty.postApply()
        }
    }
}
// 点击查看大图

var bigImg = {
    handleClickImg : function () {
        $(".list-con").on("click", ".report-img .img-item", function (e) {
            var imgArr = $(this).parent().attr("imgArr")
            var imgArr = imgArr.split(",")
            var swiperHtml = "";
            for (var i in imgArr) {
                swiperHtml += `<div class="swiper-slide">
                                <img src="${imgArr[i]}" alt="">
                            </div>`
            }
            $(".swiper-wrapper").html(swiperHtml)
            var index = $(this).index()
            bigImg.initSwiper(index)
            e.stopPropagation();
            $(".beauty-page").addClass("blur-deep")
            $(".pic-swiper").fadeIn()
            handleAlert.OpenMask()
        })
        $(".swiper-wrapper").on("click", function () {
            $(".beauty-page").removeClass("blur-deep")
            $(".pic-swiper").fadeOut()
            handleAlert.CloseMask()
        })
    },
    initSwiper : function (index) {
        var picSwiper = new Swiper('#pic-swiper', {
            initialSlide: index,
            observer: true,
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
}
/* 遮罩层 */
var handleAlert =  {

    handler : function (e) {
        e.preventDefault();
        e.stopPropagation();
    },

    OpenMask : function () {
        document.addEventListener('touchmove', handleAlert.handler, false);
        document.addEventListener('wheel', handleAlert.handler, false);
        $("body").css("overflow", "hidden");
    },

    CloseMask : function () {
        document.removeEventListener('touchmove', handleAlert.handler, false);
        document.removeEventListener('wheel', handleAlert.handler, false);
        $("body").css("overflow", "auto");
        
    }
}
var navChange = function () {
    var url = window.location.href;
    if (url.indexOf("report") > -1) {
        $(".nav li").eq(2).addClass("select").siblings().removeClass("select");
        $(".con li").eq(2).show().siblings().hide();
        beauty.getReportList()
    }
}
function popup(popupName) {
    var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度
        _windowHeight = $(window).height(),//获取当前窗口高度
        _windowWidth = $(window).width(),//获取当前窗口宽度
        _popupHeight = popupName.height(),//获取弹出层高度
        _popupWeight = popupName.width();//获取弹出层宽度
    _posiTop = (_windowHeight - _popupHeight)/ 2  + _scrollHeight;
    _posiLeft = (_windowWidth - _popupWeight) / 2;
    popupName.css({"top": _posiTop + "px"});//设置position
}
$(function () {
    beauty.initPage()
    $(window).scroll(function () {
        // 加载更多
        if (loadMore) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                loadMore = false;
                beauty.getReportList()
            }
        }
    })
    // navChange()
    var url = window.location.href;

    bigImg.handleClickImg()
    // 解决手机软件键盘遮挡input框的问题
    window.onresize = function () {
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
            setTimeout(function () {
                var top = document.activeElement.getBoundingClientRect().top;
                window.scrollTo(0, top);
            }, 0);
        }
    }
})