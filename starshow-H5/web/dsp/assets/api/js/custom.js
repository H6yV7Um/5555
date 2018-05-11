$(function () {
    /* 专业定制 */
    var customCpName = $("#custom-company")
    var customName = $("#custom-name")
    var customTel = $("#custom-tel")
    var customCode = $("#custom-validateCode")
    customCpName.blur(function () {
        checkForm(customCpNameData)
    })
    customName.blur(function () {
        checkForm(customNameData)
    })
    customTel.blur(function () {
        checkForm(customTelData)
    })
    customTel.blur(function () {
        /* 判断验证码方法 */
        if (checkForm(customTelData)) {
            $("#custom-validateCode").removeAttr("readonly");
            $("#custom-validateCode").parent().removeClass("readonly");
            $("#getCustomCode").removeAttr("disabled")
        }
    })
    customCode.blur(function () {
        checkForm(customCodeData)
    })
    var customCpNameData = {
        obj: $("#custom-company"),
        reg: /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,30}$/,
        error1: "企业或个体名称不能为空",
        error2: "请输入正确的企业或个体名称"
    }
    var customNameData = {
        obj: $("#custom-name"),
        reg: /^[a-zA-Z\u4e00-\u9fa5\-\.\·]{1,10}$/,
        error1: "联系人不能为空",
        error2: "请输入正确的联系人名称"
    }
    var customTelData = {
        obj: $("#custom-tel"),
        reg: /^1[34578]\d{9}$/i,
        error1: "手机号码不能为空",
        error2: "手机号码输入有误"
    }
    var customCodeData = {
        obj: $("#custom-validateCode"),
        reg: /^\d{6}$/i,
        error1: "验证码不能为空",
        error2: "验证码输入有误"
    }
    $("#getCustomCode").on("click", function () {
        getVerifyCode($("#custom-tel").val(), "custom", $(this))
    })
    $("#custom-submit").on("click", function () {
        if (checkForm(customCpNameData) && checkForm(customNameData) && checkForm(customTelData) && checkForm(customCodeData)) {
            postCustom()
           
        }
    })

    /* 专业定制 */
    var postCustom = function () {
        var url = host + "/custom";
        var params = {
            "Name": $("#custom-company").val(),
            "Contacts": $("#custom-name").val(),
            "Mobile": $("#custom-tel").val(),
            "VerifyCode": $("#custom-validateCode").val()
        }
        commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
            if (textStatus == "success" && ret.Code == 200) {
                swal({
                    "title": ret.Data,
                    "confirmButtonText": "确定",
                    "confirmButtonColor": "#ff1d3e",
                    "animation": "none",
                });
                $(".custom-form input").val("");
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
})