var host = commonCla.hostBase;
/* 账户修改密码切换 */
var accountTab = function() {
    $(".accountTab ul li").click(function () {
        now = $(this).index();
        $(".accountTab ul li").eq(now).addClass('active').siblings().removeClass('active');
        $(".tab-con .tab").eq(now).show().siblings().hide();
    });
}
/* 提交资质 */
var postAddInfo = function (Status) {
    //上传图片路径
    //资质证明
    var Certificate = "";
    var Certificatelist = $(".prove-img").find("img");
    for (var i = 0; i < Certificatelist.length; i++) {
        Certificate += $(Certificatelist[i]).attr("src") + "|"
        };
    Certificate = Certificate.substring(0, Certificate.length - 1)
    //身份证
    var Identity = "";
    var Identitylist = $(".idcard-img").find("img");
    for (var i = 0; i < Identitylist.length; i++) {
        Identity += $(Identitylist[i]).attr("src") + "|"
    };
    Identity = Identity.substring(0, Identity.length - 1)
    //判断状态为未通过的时候请求编辑资质的接口
    if (Status==3) { 
        var url = host + "/profile/"+ getCookie("Id") +"?Token=" + getCookie("token");
    } else {      
        var url = host + "/profile?Token=" + getCookie("token");
    }
    var params = {
        "Enterprise": parseInt($(".cp-type-select").val()),
        "BusinessLicense": $(".operate-img").find("img").attr("src"),
        "CompanyName": $("#CompanyName").val(),
        "CreditCode": $("#CreditCode").val(),
        "Industry": parseInt($(".industry-select").val()),
        "Certificate": Certificate,
        "LegalPerson": $("#LegalPerson").val(),
        "IdNumber": $("#IdNumber").val(),
        "Identity": Identity,       
    }
    console.log(params)
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (textStatus == "success" && ret.Code==200) {
            swal({
                "title": ret.Data,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
            $(".submit-info").hide()
            $(".submit-review").show()
            $(".reject-reason").hide()
            //改变cookie里state状态
            // changeStatus()
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
/*
*改变status状态
*/

var changeStatus = function () {
    var token = getCookie("token");

    if (token != null) {
        var url = host + "/user/" + token
        commonCla.ajaxCommonFun(url, "get", function (ret) {
            if (ret.Code == "200") {
                //name,value,time
                var data = ret.Data;
                setCookie("Status", data.Status, "h12")


            }
        })
    }
}
/* 上传附件 */
var upload = function() {
    $(document).on("change", "#business", function(){
        fsubmit($('#businessLicense')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#prove1", function () {
        fsubmit($('#Certificate1')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#prove2", function () {
        fsubmit($('#Certificate2')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#prove3", function () {
        fsubmit($('#Certificate3')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#prove4", function () {
        fsubmit($('#Certificate4')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#idcard1", function () {
        fsubmit($('#identity1')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#idcard2", function () {
        fsubmit($('#identity2')[0], 'business_license')
        $(this).val('');
    })
    $(document).on("change", "#idcard3", function () {
        fsubmit($('#identity3')[0], 'business_license')
        $(this).val('');
    })
}

//上传附件
/*  obj:form表单的id 例如：$('#form')[0]，必须加[0]*/
/*  type: 广告图片ad_pic、广告视频ad_video、营业执照business_license、资质证明certificate、身份照id_number */
function fsubmit(obj, type) {
    var data = new FormData(obj);
    data.append("UploadType", type);
    $.ajax({
        url: commonCla.hostBase + '/upload?Token=' + getCookie("token"),
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false
    }).done(function (ret) {
        /* 预览 */
        html = `<div class="look">
                    <img src="${ret.Data}">
                </div>
                <span class="del-upload"></span>`;
        $(obj).parent().append(html)
        swal({
            "title": "上传成功",
            "confirmButtonText": "确定",
            "confirmButtonColor": "#ff1d3e",
            "animation": "none",

        });
    }).fail(function (ret) {
        swal({
            "title": "上传失败",
            "confirmButtonText": "确定",
            "confirmButtonColor": "#ff1d3e",
            "animation": "none",

        });
    });
}
/* 删除预览 */
$(".upload_area, .image-box").on("click", ".del-upload", function () {
    $(this).parent().find(".look").fadeOut(500, function () { $(this).remove() });
    $(this).fadeOut(500, function () { $(this).remove() });
})


// 判断企业类型
var checkCpType = function (type) {
    switch (type) {
        case 1: t="大陆企业";break;
        case 2: t="大陆个体工商户";break;
        case 3: t="大陆事业单位";break;
        case 4: t="民办非企业";break;
        case 5: t="机关、企、事业单位";break;
        case 6: t="香港企业";break;
        case 7: t="法律服务";break;
        case 8: t="学校";break;
    }
    return t ;
}
// 判断行业类型
var checkIndustryType = function (type) {
    switch (type) {
        case 1: t = "自媒体推广"; break;
        case 2: t = "电脑硬件办公"; break;
        case 3: t = "手机数码"; break;
        case 4: t = "家用电器"; break;
        case 5: t = "网络服务"; break;
        case 6: t = "教育培训"; break;
        case 7: t = "房地产"; break;
        case 8: t = "旅游在宿"; break;
        case 9: t = "商业零售"; break;
        case 10: t = "食品饮料"; break;
        case 11: t = "家庭日用品"; break;
        case 12: t = "化妆护理"; break;
        case 13: t = "母婴护理"; break;
        case 14: t = "家居建材"; break;
        case 15: t = "奢侈品"; break;
        case 16: t = "服装鞋帽"; break;
        case 17: t = "箱包饰品"; break;
        case 18: t = "生活服务"; break;
        case 19: t = "通讯服务"; break;
        case 20: t = "运动休闲娱乐"; break;
        case 21: t = "面向企业类"; break;
        case 22: t = "政府组织类"; break;
    }
    return t;
}
/* 获取资质信息 */
var getProfile = function (Status) {
    var url = host + "/profile/" + getCookie("id") + "?Token=" + getCookie("token");
    commonCla.ajaxCommonFun(url, "get", function (ret) {
        if(ret.Code=="200") {
            if ( Status== 1) {
                initWaitInfo(ret)
            } else if (Status == 2) {
                initSuccInfo(ret)
            } else if (Status == 3) {
                initAgainInfo(ret)
            }
        }
    })
}
//审核等待中的信息 statu=1
var initWaitInfo = function (ret) {
    
    $(".cp-type-select").val(ret.Data.Enterprise)
    $(".operate-img .image-box").html(`<div class="img-box">
                                            <img src="${ret.Data.BusinessLicense}">
                                        </div>`)
    $("#CompanyName").val(ret.Data.CompanyName)
    $("#CreditCode").val(ret.Data.CreditCode)
    $(".industry-select").val(ret.Data.Industry)
    $("#LegalPerson").val(ret.Data.LegalPerson)
    $("#IdNumber").val(ret.Data.IdNumber)
    
    //资质证明
    var zzImgList = ret.Data.Certificate;
    var zzImgList = zzImgList.split("|"); //字符分割 
    var zzHtml = "";
    for (var i = 0; i < zzImgList.length; i++) {
        zzHtml += `<div class="img-box">
                                <img src="${zzImgList[i]}">
                            </div>`
    }
    $(".prove-img .image-box").html(zzHtml)
    //身份证明
    var idImgList = ret.Data.Identity;
    var idImgList = idImgList.split("|"); //字符分割 
    var idHtml = "";
    for (var i = 0; i < idImgList.length; i++) {
        idHtml += `<div class="img-box">
                                <img src="${idImgList[i]}">
                            </div>`
    }
    $(".idcard-img .image-box").html(idHtml);
    $("#submit-profile").html("审核中").css("background", "#fb203d").off("click")
    $(".submit-info").find("input")
                     .attr("readonly", "readonly")
                     .css({ "background": "#e1e1e1", "color":"#b9b9b9"})
    $(".submit-info").find("select").attr("disabled", "disabled")

}
//审核成功后的信息 statu=2
var initSuccInfo = function(ret) {
    var cpType = checkCpType(ret.Data.Enterprise)
    var indusType = checkIndustryType(ret.Data.Industry)
    $(".cp-type p").html(cpType)
    $(".businessLicense img").attr("src", ret.Data.BusinessLicense)
    $(".cp-name p").html(ret.Data.CompanyName)
    $(".creditCode p").html(ret.Data.CreditCode)
    $(".industry p").html(indusType)
    $(".legal-person p").html(ret.Data.LegalPerson)
    $(".id-number p").html(ret.Data.IdNumber)
    //资质证明
    var zzImgList = ret.Data.Certificate;
    var zzImgList = zzImgList.split("|"); //字符分割 
    var zzHtml = "";
    for (var i = 0; i < zzImgList.length; i++) {
        zzHtml += `<div class="img-box">
                                <img src="${zzImgList[i]}">
                            </div>`
    }
    $(".certificate .img-area").html(zzHtml)
    //身份证明
    var idImgList = ret.Data.Identity;
    var idImgList = idImgList.split("|"); //字符分割 
    var idHtml = "";
    for (var i = 0; i < idImgList.length; i++) {
        idHtml += `<div class="img-box">
                                <img src="${idImgList[i]}">
                            </div>`
    }
    $(".idcard-img .img-area").html(idHtml)
}
//审核不通过后重新提交的信息 statu=3
var initAgainInfo = function (ret) {
    if(ret.Data.Reason!=="") {
        $(".reject-reason").show().find("p").html(ret.Data.Reason)
    }
    $(".cp-type-select").val(ret.Data.Enterprise)
    $("#CompanyName").val(ret.Data.CompanyName)
    $("#CreditCode").val(ret.Data.CreditCode)
    $(".industry-select").val(ret.Data.Industry)
    $("#LegalPerson").val(ret.Data.LegalPerson)
    $("#IdNumber").val(ret.Data.IdNumber)
    // 营业执照
    var yyzzHtml = `<div class="upload_area">
                        <p>
                            <span>点击上传</span>jpg/png,小于1M</p>
                        <form id="businessLicense" enctype="multipart/form-data">
                            <input type="file" id="business" name="UploadName" multiple="multiple" accept="image/*">
                        </form>
                        <div class="look">
                            <img src="${ret.Data.BusinessLicense}">
                        </div>
                        <span class="del-upload"></span>
                    </div>`
    $(".operate-img .image-box").html(yyzzHtml)
    //资质证明
    var zzImgList = ret.Data.Certificate;
    var zzImgList = zzImgList.split("|"); //字符分割 
    var zzHtml = "";
    for (var i = 0; i < zzImgList.length; i++) {
        zzHtml += `<div class="upload_area">
                        <p>
                            <span>点击上传</span>jpg/png,小于1M</p>
                        <form id="Certificate${i+1}" enctype="multipart/form-data">
                            <input type="file" id="prove${i + 1}" name="UploadName" multiple="multiple" accept="image/*">
                        </form>
                        <div class="look">
                            <img src="${zzImgList[i]}">
                        </div>
                        <span class="del-upload"></span>
                    </div>`
    }
    $(".prove-img .image-box").html(zzHtml)
    //身份证明
    var idImgList = ret.Data.Identity;
    var idImgList = idImgList.split("|"); //字符分割 
    var idHtml = "";
    for (var i = 0; i < idImgList.length; i++) {
        idHtml += `<div class="upload_area">
                        <p>
                            <span>点击上传</span>jpg/png,小于1M</p>
                        <form id="identity${i + 1}" enctype="multipart/form-data">
                            <input type="file" id="idcard${i + 1}" name="UploadName" multiple="multiple" accept="image/*">
                        </form>
                        <div class="look">
                            <img src="${idImgList[i]}">
                        </div>
                        <span class="del-upload"></span>
                    </div>`
    }
    $(".idcard-img .image-box").html(idHtml);

}
/* 修改密码 */
var resetPassword = function () {
    var url = host + "/user/" + getCookie("id") + "?Token=" + getCookie("token");
    var params = {
        "OldPassword": $("#oldPas").val(),
        "Password": $("#newPas").val(),
        "ConfirmPassword": $("#conPas").val(),
        "Mobile": $("#tel").val(),
        "VerifyCode": $("#validateCode").val()
    }
    commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
        if (textStatus == "success" && ret.Code == 200) {
            swal({
                "title": ret.Data,
                "confirmButtonText": "确定",
                "confirmButtonColor": "#ff1d3e",
                "animation": "none",
            });
            $(".reset-form input").val("");
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
    $("#oldPas").blur(function () {
        checkForm(oldPwdData)
    })
    $("#newPas").blur(function () {
        checkForm(newPwdData)
    })
    $("#conPas").blur(function () {
        checkForm(conPasData)
    })
    $("#tel").blur(function () {
        if (checkForm(telData)) {
            $("#validateCode").removeAttr("readonly");
            $("#validateCode").parent().removeClass("readonly");
            $("#getValidateCode").removeAttr("disabled")
        } else {
            $("#validateCode").parent().addClass("readonly");
            $("#getValidateCode").attr("disabled", "disabled")
        }
    })
    // $("#tel").on('input propertychange', function () {
        /* 判断验证码方法 */
/*         if (checkForm(telData)) {
            $("#validateCode").removeAttr("readonly");
            $("#validateCode").parent().removeClass("readonly");
            $("#getValidateCode").removeAttr("disabled")
        } else {
            $("#validateCode").parent().addClass("readonly");
            $("#getValidateCode").attr("disabled", "disabled")
        }
    }) */
    
    $("#validateCode").blur(function () {
        checkForm(codeData)
    })
    var oldPwdData = {
        obj: $("#oldPas"),
        reg: /^[a-zA-Z0-9]{6,14}$/,
        error1: "密码不能为空",
        error2: "请输入6-14位数字或字母的组合"
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

    $("#modify").on("click", function () {
        if (checkForm(oldPwdData) &&
            checkForm(newPwdData) &&
            checkForm(conPasData) &&
            checkForm(telData) &&
            pasdIsSame($("#newPas"), $("#conPas")) &&
            checkForm(codeData)) {

            resetPassword()

        }
    })
}
/* 提交资质表单验证 */
var verProfileFrom = function (Status) {
    $("#CompanyName").blur(function () {
        checkForm(CompanyName)
    })
    $("#CreditCode").blur(function () {
        checkForm(CreditCode)
    })
    $("#LegalPerson").blur(function () {
        checkForm(LegalPerson)
    })
    $("#IdNumber").blur(function () {
        checkForm(IdNumber)
    })

    var CompanyName = {
        obj: $("#CompanyName"),
        reg: /^[a-zA-Z\(\(\)\)\u4e00-\u9fa5]{1,30}$/,
        error1: "请输入1-30位企业或个体名称",
        error2: "企业或个体名称字数超出限制"
    }
    var CreditCode = {
        obj: $("#CreditCode"),
        reg: /^[0-9A-Z]{18}$/,
        error1: "请输入18位社会信用代码",
        error2: "社会信用代码长度有误，请重新输入"
    }
    var LegalPerson = {
        obj: $("#LegalPerson"),
        reg: /^[a-zA-Z\u4e00-\u9fa5\-\.\·]{1,10}$/,
        error1: "请输入1-10位法人名称",
        error2: "请输入正确的法人名称"
    }
    var IdNumber = {
        obj: $("#IdNumber"),
        reg: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
        error1: "身份证号码不能为空",
        error2: "身份证号码输入有误"
    }
    /* function verSelect() {
        if ($(".cp-type-select").val() == "") {
            $(".cp-type-select").parents(".industry-type").addClass("form-error").find(".error-info").html("请选择企业类型").show();
        }else {
            $(".cp-type-select").parents(".industry-type").removeClass("form-error").find(".error-info").html("").hide();        
        }
    } */
    /* 验证图片上传 */
    var regImg = function(imgData) {
        if (imgData.obj.find("img").length < imgData.len) {
            imgData.obj.find(".error-info").html(imgData.error).show();
            imgData.obj.addClass("form-error")
            return false;
        }else {
            imgData.obj.find(".error-info").html("").hide()
            imgData.obj.removeClass("form-error")
            return true;
        }
    }
    var operateData = {
        type: "operate",
        obj: $(".operate-img"),
        len: 1,
        error: "请上传营业执照"
    }
    var proveData = {
        type: "prove",
        obj: $(".prove-img"),
        len: 1,
        error: "请上传1-4张资质证明"
    }
    var idcardData = {
        type: "idcard",
        obj: $(".idcard-img"),
        len: 3,
        error: "请上传身份证正面照、身份证背面照、法人手持身份证照"
    }
    $("#submit-profile").on("click", function () {
        if (regImg(operateData) && 
            checkForm(CompanyName) &&
            checkForm(CreditCode) &&
            regImg(proveData) &&
            checkForm(LegalPerson) &&
            checkForm(IdNumber) &&
            regImg(idcardData)
            ) {

            postAddInfo(Status)

        }
    })
}
var initprofilePage = function () {
    accountTab()
    upload()
    /* 
    Status 审核状态
    0否、1等待、2通过、3未通过
    */
    var Status = getCookie("Status");
    

    if (Status == 0 || Status == "null") {
        $(".submit-info").show()
    } else if (Status == 1) {
        $(".submit-info").show()
        getProfile(Status)
    } else if (Status == 2) {
        $(".user-info").show()
        getProfile(Status)
    } else if (Status == 3) {
        $(".submit-info").show()
        getProfile(Status)
    } else {
        $(".submit-info").show()
    }
    /* 提交资质 */
    verProfileFrom(Status)

    /* 修改密码 */
    verResetPwdFrom()
    $("#getValidateCode").on("click", function () {
        getVerifyCode($("#tel").val(), "resetPassword", $(this))
    })
    /* $(".account-wrap").on("click", ".watchProfile", function () {
        $(".js_dspMenu li", window.parent.document).removeClass("cur");
        $(".js_dspMenu li", window.parent.document).eq(5).addClass("cur");
        $(this).attr("src", "help.html?mt=5&profile=3");
    }) */
}

$(function () {  
    initprofilePage()
})