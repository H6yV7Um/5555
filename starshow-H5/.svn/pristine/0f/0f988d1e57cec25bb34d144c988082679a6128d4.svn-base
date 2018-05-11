var host = commonCla.hostBase;
var isLogin = false;
var codeTimer;
var initPage = function () {
    appendHtml();
    loginAction();
    navChange();
    indexTab();
    checkLogin()
    verResetPwdFrom()
    
}
//首页导航切换
var navChange =function () {
    var url = window.location.href;
    // 根据url不同为当前页面添加默认导航样式
    if (url.indexOf("index") > -1) {
        history.replaceState({ data: "reset" }, "nofresh", "index.html");
        $(".nav-index").addClass("onNav").siblings().removeClass("onNav");
    } else if (url.indexOf("scene") > -1) {
        $(".nav-scene").addClass("onNav").siblings().removeClass("onNav");
    } else if (url.indexOf("successCase") > -1) {
        $(".nav-successCase").addClass("onNav").siblings().removeClass("onNav");
    } else if (url.indexOf("custom") > -1){
        $(".nav-custom").addClass("onNav").siblings().removeClass("onNav");
    } else {
        $(".nav-index").addClass("onNav").siblings().removeClass("onNav");
    }
}

var appendHtml = function () {
    /* 头部 */
    var headerHtml = `<div id="header-wrap">
                        <div class="header w">
                            <div class="h-left">
                                <h1 class="logo">
                                    <a href="index.html">
                                        <img src="assets/images/logo.png" alt="starshow"/>
                                    </a>
                                </h1>
                                <h1 class="title">广告投放</h1>
                            </div>
                            <div class="h-center">
                                <ul>
                                    <li class="nav-index">
                                        <a href="index.html">首页</a>
                                    </li>
                                    <li class="nav-scene">
                                        <a href="scene.html">营销资源</a>
                                    </li>
                                    <li class="nav-successCase">
                                        <a href="successCase.html">成功案例</a>
                                    </li>
                                    <li class="nav-custom">
                                        <a href="custom.html">专业定制</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="h-right">
                                <a class="register-btn" href="register.html">注册</a>
                                <a class="login-btn" href="javascript:void(0);">登录</a>
                                <a class="goto-backstage" href="backstage/indexList.html?mt=0" style="display:none">进入后台管理平台</a>
                            </div>
                        </div>
                        </div>`;
    /* 尾部 */
    var footerHtml = `<div id="footer-wrap">
                        <div class="footer w">
                            <h1 class="footer-left">
                                <img src="assets/images/logo-deep.png" alt="">
                            </h1>
                            <div class="footer-center">
                                <div class="copyright-links">
                                    <a href="http://www.xingxiu.tv/about.html">关于我们</a>
                                    <a href="http://www.xingxiu.tv/about.html?#link">联系我们</a>
                                    <a href="http://www.xingxiu.tv/about.html?#partner">合作伙伴</a>
                                    <a href="http://www.xingxiu.tv/about.html?#partner2">商务合作</a>
                                </div>
                                <p class="copyright">广播电视节目制作经营许可证（京）字第04580号 / 网络文化经营许可证京网文 [ 2017 ]4086-455号 营业性演出许可证京演（机构）[ 2017 ] 3212 号 / 互联网ICP备案14027095号-2</p>
                            </div>
                            <div class="footer-right">
                                <div class="wx-code">
                                    <img src="assets/images/wx-code.png" alt="">
                                    <p>微信公众号</p>
                                </div>
                                <div class="code">
                                    <img src="assets/images/app-code.png" alt="">
                                    <p>手机APP</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
        /* 登录 */
    var loginHtml = `<div id="login-wrap">
                        <div class="mask"></div>
                        <div class="success-alert" style="display:none;"><img src="assets/images/sucs.png">登录成功</div>
                        <div class="lgoin-modal">
                            <div class="modal-title">
                                <img src="assets/images/logo-red.png">
                                <span class="back-btn"></span>
                                <span class="close-btn"></span>
                            </div>
                            <div class="modal-form" style="display: block;">
                                <ul class="info-form ">
                                    <li>
                                        <i class="cp-name "></i>
                                        <input type="text " id="loginName" class="loginName" name="cp-name"  placeholder="用户名" />
                                        <p class="error-info "></p>
                                    </li>
                                    <li>
                                        <i class="password"></i>
                                        <input type="password" id="loginPwd " class="loginPwd" name="pwd " placeholder="密码 "/>
                                        <p class="error-info ">请输入密码</p>
                                    </li>
                                </ul>
                                <div class="forget-password"><a>忘记密码</a></div>
                                <a id="goin-btn " class="xx-btn blue goin-btn js-goin-btn ">登录进入管理系统</a>
                            </div>
                            <div class="reset-form" style="display: none;">
                                <ul class="">
                                    <li class="user-name">
                                        <i class="cp-name"></i>
                                        <input type="text" id="userName" name="new-pas" required="required" class="input-text" placeholder="请输入用户名" />
                                        <p class="error-info"></p>
                                    </li>
                                    <li class="new-pas">
                                        <i class="cp-name"></i>
                                        <input type="password" id="newPas" name="new-pas" required="required" class="input-text" placeholder="请输入新密码，6-14位，数字或字母组合" />
                                        <p class="error-info"></p>
                                    </li>
                                    <li class="con-new-pas">
                                        <i class="cp-name"></i>
                                        <input type="password" id="conPas" name="old-pas" required="required" class="input-text" placeholder="再次确认新密码，6-14位，数字或字母组合" />
                                        <p class="error-info"></p>
                                    </li>
                                    <li class="mobie">
                                        <i class="cp-name"></i>
                                        <input type="text" id="tel" name="tel" required="required" class="input-tel" placeholder="请输入手机号" />
                                        <p class="error-info"></p>
                                    </li>
                                    <li class="inspect readonly">
                                        <input type="text" id="validateCode" name="validateCode" class="input-text" placeholder="验证码" />
                                        <button type="button" id="getValidateCode" class="xx-btn blue" timer="0" disabled>获取验证码</button>
                                        <p class="error-info"></p>
                                    </li>
                                </ul>
                                <span id="reset-btn " class="xx-btn blue reset-btn js-reset-btn ">修改密码</span>
                            </div>
                        </div>
                    </div>`;
    $("#headBox").html(headerHtml);
    $("#footBox").html(footerHtml);
    $("#loginBox").html(loginHtml);
}
//首页小轮播
var indexTab = function() {
    var timer = null;
    var now = 0;
    $(".effect-tab-btn li").hover(function() {
        now = $(this).index();
        tab()
    })
    function next() {
        now++;
        now %= $(".effect-tab-btn li").length;
        tab();
    }
    var tab =  function() {
        $(".effect-tab-btn li").eq(now).addClass("active").siblings().removeClass("active");
        $(".effect-tab div").eq(now).show().siblings().hide();
        $(".renderings img").eq(now).show().siblings().hide(); 
    }
    var timer = setInterval(next, 3000);
    $('.effect-con').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(next, 3000);
    })
}


//登录操作
var loginAction = function () {
    // 登录
    $("#headBox").on("click", ".login-btn", function () {
        $(".js-loginBox").show();
        isLogin = true;
    })
    $(".goto-login").on("click", function () {
        $(".js-loginBox").show();
        isLogin = true;
    })
    //点击关闭按钮的时候清空所有内容和错误样式
    $(".js-loginBox").on("click", ".close-btn", function () {
        $(".js-loginBox").find(".modal-form").show()
        $(".js-loginBox").find(".reset-form").hide()
        $(".js-loginBox").find("li").removeClass("form-error").find("input").val("").parent().find("p").hide();
        clearInterval(codeTimer)        
        $(".js-loginBox").find("#getValidateCode").text("获取验证码")
        $(".js-loginBox").hide();
        isLogin = false;
    })
    verLoginForm()
    $(".js-loginBox").on("click", ".forget-password a", function () {
        $(this).parents(".modal-form").hide();
        $(this).parents(".modal-form").next().show();
        $(this).parents().find(".back-btn").show();
    })
    $(".js-loginBox").on("click", ".back-btn", function () {
        $(this).parents().find(".reset-form").hide();
        $(this).parents().find(".modal-form").show();
        $(this).hide();
    })
}
//登录
var login = function () {
    var url = host + "/user/login";
    var params = {
        "Name": $(".loginName").val(),
        "Password": $(".loginPwd").val()
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (ret.Code == "200") {
            $(".js-loginBox").find(".success-alert").show();
            setTimeout(function () {
                window.location.href = "backstage/indexList.html?mt=0"
            }, 1000);
            // $(".js-loginBox").hide();
            $(".register-btn").hide();
            $(".login-btn").hide();
            $(".goto-backstage").show();
            $(".goto-login").html("进入后台管理平台>")
            setCookie("id", ret.Data.User.Id, "h12")
            setCookie("token", ret.Data.Token, "h12")
            // window.location.href = "backstage/home.html";
        } else {
            swal({
                "title": ret.Error,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
        }
    }, params)
}
// 登录验证
var verLoginForm = function () {
    $(".loginName").blur(function () {
        checkForm(loginNameData)
    })
    $(".loginPwd").blur(function () {
        checkForm(loginPwdData)
    })
    var loginNameData = {
        obj: $(".loginName"),
        reg: /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,30}$/,
        error1: "请输入1-30用户名",
        error2: "用户名输入有误"
    }
    var loginPwdData = {
        obj: $(".loginPwd"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
    }
    $(".js-loginBox").on("click", ".js-goin-btn", function () {
        if (checkForm(loginNameData) && checkForm(loginPwdData)) {
            login()
        }

    })
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) { //绑定回车 
                if (isLogin) {
                    $(".js-loginBox").find(".js-goin-btn").click()
                }
            }
        });
}

// 获取验证码
/* var getVerifyCode = function (mobile, type, obj) {
    // var that = $(obj)
    var url = host + "/sms";
    var params = {
        "Mobile": mobile,
        "Type": type
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (ret.Code == "200") {
            swal({
                "title": ret.Data,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
            invokeSettime($(obj), mobile, type)
        } else {
            swal({
                "title": ret.Error,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
        }
    }, params)
}
// 获取验证码倒计时
function invokeSettime(obj, mobile, type) {
    var countdown = 10;
    settime(obj);

    function settime(obj) {
        if (countdown == 0) {
            $(obj).on("click", function () {
                getVerifyCode(mobile, type, $(this))
            })
            $(obj).parent().removeClass("readonly");
            $(obj).text("获取验证码");
            countdown = 10;
            return;
        } else {
            $(obj).off("click")
            $(obj).parent().addClass("readonly");
            $(obj).prev().css({"background":"#fff"})
            $(obj).text("(" + countdown + ") s 重新发送");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }
}
//表单验证通用方法
function checkForm(data,callback) {
    var reg = data.reg;
    if (data.obj.val() == "") {
        data.obj.parent().find(".error-info").html(data.error1).show();
        data.obj.parent().addClass("form-error");
        return false;
    } else if (!reg.test(data.obj.val())) {
        data.obj.parent().find(".error-info").html(data.error2).show();
        data.obj.parent().addClass("form-error");
        return false;
    } else {
        data.obj.parent().find(".error-info").hide();
        data.obj.parent().removeClass("form-error");
        return true;
    }
    if (callback) {
        callback
    }
} */

/* 修改密码 */
var resetPassword = function () {
    var url = host + "/user/reset/password";
    // var url = host + "/user/" + getCookie("id") + "?Token=" + getCookie("token");
    var params = {
        "Name": $("#userName").val(),
        "Password": $("#newPas").val(),
        "ConfirmPassword": $("#conPas").val(),
        "Mobile": $("#tel").val(),
        "VerifyCode": $("#validateCode").val()
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (textStatus == "success" && ret.Code == 200) {
            swal({
                "title": "修改成功",
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
            $(".reset-form input").val("");
            clearInterval(codeTimer)
            $(".js-loginBox").find(".reset-form").hide(1000);
            $(".js-loginBox").find(".modal-form").show();
            $(".js-loginBox").find(".back-btn").hide();
            
        } else {
            swal({
                "title": ret.Error,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
        }
    }, params)
}

/* 修改密码表单验证 */
var verResetPwdFrom = function () {
    $("#userName").blur(function () {
        checkForm(userData)
    })
    $("#newPas").blur(function () {
        checkForm(newPwdData)
    })
    $("#conPas").blur(function () {
        checkForm(conPasData)
    })
    $("#tel").blur(function () {
        checkForm(telData)
    })
    $("#tel").blur(function () {
        /* 判断验证码方法 */
        if (checkForm(telData)) {
            $("#validateCode").removeAttr("readonly");
            $("#validateCode").parent().removeClass("readonly");
            $("#getValidateCode").removeAttr("disabled")
        }
        if ($("#tel").val() == "") {
            $(".inspect").addClass("readonly")
        }
    })

    $("#validateCode").blur(function () {
        checkForm(codeData)
    })
    var userData = {
        obj: $("#userName"),
        reg: /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,30}$/,
        error1: "请输入1-30位企业或个体名称",
        error2: "企业或个体名称输入有误"
    }
    var newPwdData = {
        obj: $("#newPas"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
    }
    var conPasData = {
        obj: $("#conPas"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
    }
    var telData = {
        obj: $("#tel"),
        reg: /^1[34578]\d{9}$/i,
        error1: "手机号码不能为空",
        error2: "手机号码输入有误"
    }
    var codeData = {
        obj: $("#validateCode"),
        reg: /^\d{6}$/i,
        error1: "验证码不能为空",
        error2: "验证码输入有误"
    }

    $(".js-loginBox").on("click", ".reset-btn", function () {
        if (checkForm(userData) &&
            checkForm(newPwdData) &&
            checkForm(conPasData) &&
            checkForm(telData) &&
            pasdIsSame($("#newPas"), $("#conPas")) &&
            checkForm(codeData)) {

            resetPassword()

        }
    })
    $("#getValidateCode").on("click", function () {
        getVerifyCode($("#tel").val(), "resetPassword", $(this))
    })
}

$(function() {
    if (commonCla.analyzParams("exit")=="1") {
        clearAllCookie();
    }
    initPage()
   
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            