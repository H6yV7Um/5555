var host = commonCla.hostBase;
var login_token = "";

var verForm = function() {
    $("#cpName").blur(function () {
        checkForm(regCpNameData)
    })
    $("#password").blur(function () {
        checkForm(regPwdData)
    })
    $("#conPwd").blur(function () {
        checkForm(regConPasData)
    })
    $("#name").blur(function () {
        checkForm(regNameData)
    })
    /* $("#regtel").blur(function () {
        checkForm(regTelData)
    }) */
    $("#regtel").blur(function () {
        if (checkForm(regTelData)) {
            $("#regCode").removeAttr("readonly");
            $("#regCode").parent().removeClass("readonly");
            $("#getRegCode").removeAttr("disabled")
        }
        if ($("#regtel").val() == "") {
            $(".inspect").addClass("readonly")
        }
    })
    $("#regCode").blur(function () {
        checkForm(regCodeData)
    })
    var regCpNameData = {
        obj: $("#cpName"),
        reg: /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,30}$/,
        error1: "请输入1-30位用户名",
        error2: "用户名输入有误"
    }
    var regPwdData = {
        obj: $("#password"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
    }
    var regConPasData = {
        obj: $("#conPwd"),
        beforeObj: $("#password"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
    }
    var regNameData = {
        obj: $("#name"),
        reg: /^[a-zA-Z\u4e00-\u9fa5\-\.\·]{1,10}$/,
        error1: "请输入1-10位联系人名称",
        error2: "请输入正确的联系人名称"
    }
    var regTelData = {
        obj: $("#regtel"),
        reg: /^1[34578]\d{9}$/i,
        error1: "手机号码不能为空",
        error2: "手机号码输入有误"
    }
    var regCodeData = {
        obj: $("#regCode"),
        reg: /^\d{6}$/i,
        error1: "验证码不能为空",
        error2: "验证码输入有误"
    }
    $("#getRegCode").on("click", function () {
        getVerifyCode($("#regtel").val(), "register", $(this))
    })
    $("#register-btn").on("click", function () {
        if (checkForm(regCpNameData) && 
            checkForm(regPwdData) && 
            checkForm(regConPasData) && 
            checkForm(regNameData) && 
            checkForm(regTelData) && 
            checkForm(regCodeData) &&
            pasdIsSame($("#password"), $("#conPwd")) &&
            checked()) 
        {
            
                postRegister()
           
        }
    })
}
var pasdIsSame = function (pasd1, pasd2) {
    if ($(pasd1).val() === $(pasd2).val()) {
        $(pasd1).next().html("").hide();
        $(pasd1).parent().removeClass("form-error");
        $(pasd2).next().html("").hide();
        $(pasd2).parent().removeClass("form-error");
        return true;
    } else {
        $(pasd1).next().html("两次密码输入不一致").show();
        $(pasd1).parent().addClass("form-error");
        $(pasd2).next().html("两次密码输入不一致").show();
        $(pasd2).parent().addClass("form-error");
        return false;
    }
}
var checked = function () {
    if ($('#reg-check').is(':checked')) {
        $('#reg-check').parent().find(".error-info").html("").hide();
        return true;
    } else {
        $('#reg-check').parent().find(".error-info").html("*必选").show();
    }
}
var postRegister = function () {
    var url = host + "/user";
    var params = {
        "Name": $("#cpName").val(),
        "Password": $("#password").val(),
        "ConfirmPassword": $("#conPwd").val(),
        "Contacts": $("#name").val(),
        "Mobile": $("#regtel").val(),
        "VerifyCode": $("#regCode").val(),
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (ret.Code == "200") {
            $(".reg-con").find(".success-alert").show();
            document.cookie = "token=" + ret.Data.Token;
            $(".reg-form input").val("");
            setTimeout(function () {
                window.location.href = "backstage/profile.html?mt=4"
            }, 1500);
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
var initRegisterPage = function () {
    /* $("#getValidateCode").on("click", function () {
        getVerifyCode()
    }) */
    $("#register-btn").on("click", function() {
        postRegister()
    })
}

$(function() {
    verForm()
})