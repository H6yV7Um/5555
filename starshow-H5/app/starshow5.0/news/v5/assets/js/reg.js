var host = commonCla.hostBase + "/v9";
var jwt_token_login = "";
var user_id_login = "";
//注册
//_czc.push(["_trackEvent", "广告", "收藏", "注册", 1, "btn_reg"]);
var validateReg = function() {
  $(".error_tip").remove();
  var phone_reg = $("#txt_phone");
  var pwd_reg = $("#txt_pwd");
  var pwd_reg_again = $("#txt_pwd_again");
  var name_reg = $("#txt_name");

  if (phone_reg.val() == "") {
    phone_reg.after("<span class='error_tip'>电话不能为空</span>");
    return false;
  }
  //手机
  var regu =/^1\d{10}$/;
  var re = new RegExp(regu);
  if (re.test(phone_reg.val())) {
     phone_reg.next(".error_tip").remove();
  }else{
  	phone_reg.after("<span class='error_tip'>电话格式不正确</span>");
    return false;
  }
  if (pwd_reg.val() == "") {
    pwd_reg.after("<span class='error_tip'>密码不能为空</span>");
    return false;
  } else if (pwd_reg.val().length < 6 || pwd_reg.val().length > 18) {
    pwd_reg.after("<p class='error_tip'>密码请输入6-18位数字或者字母</p>");
    return false;
  }else{
  	pwd_reg.next(".error_tip").remove();
  }
  if (pwd_reg.val() != pwd_reg_again.val()) {
    pwd_reg_again.after("<span class='error_tip'>密码不一致</span>");
    return false;
  }else{
  	pwd_reg_again.next(".error_tip").remove();
  }
  if (name_reg.val() == "") {
    name_reg.after("<span class='error_tip'>昵称不能为空</span>");
    return false;
  } else if (name_reg.val().length > 10) {
    name_reg.after("<p class='error_tip'>昵称不能超过10位字符</p>");
    return false;
  }else{
    name_reg.next(".error_tip").remove();
  }
  return true;
}
var validateLogin = function() {
   $(".error_tip").remove();
  var pwd_login = $("#txt_pwd_login");
  var phone_login = $("#txt_phone_login");
  if (phone_login.val() == "") {
    phone_login.after("<span class='error_tip'>电话不能为空</span>");
    return false;
  }
  //手机
  var regu =/^1\d{10}$/;
  var re = new RegExp(regu);
  if (re.test(phone_login.val())) {
     phone_login.next(".error_tip").remove();
  }else{
    phone_login.after("<span class='error_tip'>电话格式不正确</span>");
    return false;
  }
  if (pwd_login.val() == "") {
    pwd_login.after("<span class='error_tip'>密码不能为空</span>");
    return false;
  } else if (pwd_login.val().length < 6 || pwd_login.val().length > 18) {
    pwd_login.after("<p class='error_tip'>密码请输入6-18位数字或者字母</p>");
    return false;
  }else{
    pwd_login.next(".error_tip").remove();
  }
  return true;
}

var toReg=function(){
  $(".error_tip").remove();
  var params={
  "name": $("#txt_name").val(),
  "mobile":	$("#txt_phone").val(),
	"password":	$("#txt_pwd").val(),
	"object_id":commonCla.analyzParams("new_id"),
	 "password_confirmation":$("#txt_pwd_again").val(),
  }
  commonCla.ajaxCommonFun(host+"/auth/shareRegister", "post", function(ret) {
  	if(ret.code=="200"){
          clearForm();
         $(".messdivCons").html("注册成功");
         tcc.BOX_show("messdiv");
         setTimeout(function(){
            tcc.BOX_remove("messdiv");
            var source=commonCla.analyzParams("source");
            if(source=="post"){
               window.location.href="https://lookmetv.com/starshow5.0/post/share.html?id="
                   +ret.data.object_id+"&jwt_token="+
                   ret.data.jwt_token;
            }else{
              window.location.href="https://lookmetv.com/starshow5.0/news/v5/comment-share.html?new_id="
                   +ret.data.object_id+"&jwt_token="+
                   ret.data.jwt_token;
            }
            
         },2000)
         //统计
         _czc.push(['_trackEvent', '注册用户', '注册登录', '新闻分享注册','','']);
         
      }else if(ret.code=="422"){
        $(".messdivCons").html("该手机已经注册过，请直接登录");
         tcc.BOX_show("messdiv");
      }else{
        $(".messdivCons").html("注册失败，请稍后重试。");
         tcc.BOX_show("messdiv");
      }
  },params)

}
var clearForm=function(){
  $("input[type='text']").val("");
}
var toLogin=function(){
  $(".error_tip").remove();
  var params={
  "mobile": $("#txt_phone_login").val(),
  "password": $("#txt_pwd_login").val(),
  "object_id":commonCla.analyzParams("new_id")
  }
  commonCla.ajaxCommonFun(host+"/auth/shareLogin", "post", function(ret) {
    if(ret.code=="200"){
      clearForm();
       $(".messdivCons").html("登录成功");
       tcc.BOX_show("messdiv");
       setTimeout(function(){
            tcc.BOX_remove("messdiv");
            var source=commonCla.analyzParams("source");
            if(source=="post"){
               window.location.href="https://lookmetv.com/starshow5.0/post/share.html?id="
                   +ret.data.object_id+"&jwt_token="+
                   ret.data.jwt_token;
            }else{
              window.location.href="https://lookmetv.com/starshow5.0/news/v5/comment-share.html?new_id="
                   +ret.data.object_id+"&jwt_token="+
                   ret.data.jwt_token;
            }
         },2000)
         
    }else{
        $(".messdivCons").html("登录失败，请稍后重试。");
         tcc.BOX_show("messdiv");
      }
   
  },params)
}
//注册
var initReg=function(){
  $(".txt_con").blur(function(){
  	validateReg();
  })
  $("#btn_reg").click(function(){
    if(validateReg()){
      toReg();
     }
  })
  $("#btn_login").click(function(){
    if(validateLogin()){
      toLogin();
     }
  })
  $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
    })

  $(".link_login").click(function(){
        $(".loginMain").show();
         $(".regMain").hide();
  })
  $(".link_reg").click(function(){
        $(".loginMain").hide();
         $(".regMain").show();
  })
}

$(function(){
	initReg();
})