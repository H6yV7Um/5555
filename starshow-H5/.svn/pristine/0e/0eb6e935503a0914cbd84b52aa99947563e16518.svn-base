var host =commonCla.hostBase;
var server = 0;
var jwt_token_login = "";
var jwt_token = commonCla.analyzParams("jwt_token") == undefined ? jwt_token_login : commonCla.analyzParams("jwt_token");
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '10') { //过期登录
       jwt_token_login = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '1') { //登录
       jwt_token_login = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '2') { //上传作品成功
       jwt_token_login = data.jwt_token;
       toEnd();
       //window.location.href = "index.html?categoryId="+$("#categoryId").attr("categoryId")+"&jwt_token=" + data.jwt_token;
    }

  })
 //调取客户端方法
  if (isIphone()) {} else {
    bridge.init(function(message, responseCallback) {
      var data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  }
  //立即参与
    var uploadCommon=function(joinStatus){
        var params= {
	          'action': '9',
	          'nextStep': '2',
	          'activityType':'3',
	          'picTitle':'上传作品',
	          "videoTitle":'上传视频',
	          'picBtnCon':'下一步',
	          'videoBtnCon':'上传',
	          'videoDuration':'180',
                  'works_status':"2",
	          'status':'TV'//imgAndTv TV  img
	     }
	    if(joinStatus=="0" || joinStatus=="1"){
	       // e.preventDefault()
	        setBridgeCallHandler(bridge,params)
	      }else{
	        swal_tip("您已经报过名");
	      }
    }

   //上传作品按钮
   $("#toUploadVideo").click(function(){
      //toEnd();
      uploadCommon("1");

     
   })

   //提交基本资料
  $("#toUpload").click(function(e) {
    //保存信息提交
    var url=host+"/activities/schoolEmissary?jwt_token="+jwt_token;
    var real_name=$("#txt_name").val();
    var mobile=$("#txt_mobile").val();
    var school=$("#txt_school").val();
    var age=$("#txt_age").val();
    var img_code=$("#txt_yzm_pic").val();
    var msg_code=$("#txt_yzm_msg").val();
    //验证
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    //var reg2=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
    var reg2 =new RegExp("^[a-zA-Z\u4e00-\u9fa5]+$");
    $(".errorTip").html("");
     if(real_name.trim()==""){
         $("#txt_name").next("p.errorTip").html("请输入真实姓名。");   
         return;
     }else if(!reg2.test(real_name)){
        $("#txt_name").next("p.errorTip").html("姓名只能输入汉字和字母。"); 
        return;
     }
     if(school.trim()==""){
         $("#txt_school").next("p.errorTip").html("请输入学校。");
         return;
     }else if(school.trim().length>26){
      $("#txt_school").next("p.errorTip").html("学校不能超过26个字");
         return;
     }
     if(age.trim()==""){
         $("#txt_age").next("p.errorTip").html("请输入年龄。");
         return;
     }else if(isNaN(Number(age)) || Number(age)>100){
      $("#txt_age").next("p.errorTip").html("请输入正确的年龄。");
         return;
     }
     if(mobile.trim()==""){
         $("#txt_mobile").next("p.errorTip").html("请输入手机号。");
         return;
     }else if (!reg.test(mobile)) {
         $("#txt_mobile").next("p.errorTip").html("请输入正确的手机号。");
         return;
     }
     if(age.trim()==""){
         $("#txt_age").next("p.errorTip").html("请输入年龄。");
         return;
     }else if(isNaN(Number(age)) || Number(age)>100){
      $("#txt_age").next("p.errorTip").html("请输入正确的年龄。");
         return;
     }
     if(school.trim()==""){
         $("#txt_school").next("p.errorTip").html("请输入学校。");
         return;
     }else if(school.trim().length>30){
      $("#txt_school").next("p.errorTip").html("学校不能超过30个字");
         return;
     }
     if(img_code.trim()==""){
         $("#txt_yzm_pic").parent().find("p.errorTip").html("请输入图片验证码。");
         return;
     }
     if(msg_code.trim()==""){
         $("#txt_yzm_msg").parent().find("p.errorTip").html("请输入短信验证码。");
         return;
     }
     
    var params={
       "name":real_name,
       "mobile":mobile,
       "sex":$("#txt_sex").val(),
       "age":$("#txt_age").val(),
       "category":$("#txt_area option:checked").attr("id"),
       "comments":$("#txt_school").val(),
       "code":$("#txt_yzm_msg").val()
    }
    commonCla.ajaxCommonFun(url, "post", function(resultData){
      if(resultData.code=="200"){
        //window.location.href="reg.html?jwt_token="+jwt_token+"&works_status=1";
        //调用客户端上传方法
        $("#categoryId").attr("categoryId",$("#txt_area option:checked").attr("id"));
        //swal_tip("基本信息提交成功");
	$(".regMain header li").eq(1).addClass("pass")
        $(".regCons .regContent").hide();
        $(".regCons .uploadCon").show();
        uploadCommon("1");
	
        //toEnd();
        
      }else{
        if(resultData.code=="401"){
          swal_tip("用户信息失效，请重新登陆");
        }else if(resultData.code=="422"){
          swal_tip(resultData.error);
        }else{
          swal_tip(resultData.data);
        }
      }
      
    }, params)
    
  })
   
})

var toEnd=function(){
    $(".regMain header li").addClass("pass")
    $(".regCons .regContent").hide();
    $(".regCons .resultCon").show();
    $("#categoryId").attr("categoryId",commonCla.analyzParams("categoryId"));
}
var getImgyzm=function(){
  var url=host+"/v12/sms/getPictureCode";
  commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      $("#pic_yzm").attr("src",ret.data);
    }
  })
}
var swal_tip=function(title){
  swal({
              "title":title,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

       });
}
var initRegPage=function(){
  var works_status=commonCla.analyzParams("works_status")==undefined?"0":commonCla.analyzParams("works_status");
  if(works_status==1){
    $(".regMain header li").eq(1).addClass("pass")
    $(".regCons .regContent").hide();
    $(".regCons .uploadCon").show();
    $("#categoryId").attr("categoryId",commonCla.analyzParams("categoryId"));
  }else if(works_status==2){
    $(".regMain header li").addClass("pass")
    $(".regCons .regContent").hide();
    $(".regCons .resultCon").show();
    $("#categoryId").attr("categoryId",commonCla.analyzParams("categoryId"));
  }
  //图形验证
  getImgyzm();
  $("#pic_yzm").click(function(){
    getImgyzm();
  })
  //短信验证码倒计时
  function settime(obj,countdown) { 
      if (countdown == 0) { 
           obj.attr("disabled"); 
           obj.removeClass("disabled"); 
           obj.val("点击获取"); 
          countdown = 60; 
          return;
      } else { 
          obj.removeAttr("disabled", true); 
          obj.addClass("disabled"); 
          obj.val("重新发送(" + countdown + ")"); 
          countdown--; 
      } 
    setTimeout(function() { 
        settime(obj,countdown) }
        ,1000) 
  }
  //短信验证
  $("#btn_sendMsg").click(function(){
    var pic_yzm=$("#txt_yzm_pic").val();
    var txt_mobile=$("#txt_mobile").val();
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if(pic_yzm==""){
      swal_tip("请输入图片验证码。");
       return;
    }
    if(txt_mobile==""){
      swal_tip("请输入手机号码。");
       return;
    }else if (!reg.test(txt_mobile)) {
       swal_tip("请输入正确的手机号码。");
       return;
     }
    var url=host+"/v12/sms/verifyCode";
    var params={
      "mobile":txt_mobile,
      "picture_url":$("#pic_yzm").attr("src"),
      "picture_code":$("#txt_yzm_pic").val(),
      "sms_token":txt_mobile,
      "type":"schoolEmissary"
    }
    commonCla.ajaxCommonFun(url,"post",function(ret){
     if(ret.code=="200"){
      swal_tip(ret.data);
      var times=60
      settime($("#btn_sendMsg"),times);
     }else{
      swal_tip(ret.error);
     }
    },params)
  })
  //完成返回
  $("#toBack").click(function(){
    var categoryId=$("#categoryId").attr("categoryId");
    window.location.href="index.html?categoryId="+categoryId+"&jwt_token="+jwt_token;
  })
}

$(function(){
  initRegPage();
})