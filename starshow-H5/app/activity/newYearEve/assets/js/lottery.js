var server = 1;
var host = commonCla.hostBase+"/v8";
var login_token="";
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        window.location.href = "lottery.html?jwt_token=" + data.jwt_token;
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
   //交互方法
   clientInter(bridge);

})

var clientInter=function(bridge){
  $(".messdivCons").on("click",".js_toLogin",function(e){
       tcc.BOX_remove("messdiv");
      /*过期重新登录*/
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
  //点击参与验证
  $(".btn_joinBigPrize").click(function(e){
    var jwt_token=get_token();
    if(jwt_token!="" && jwt_token!=undefined){
      checkUser();
    }else{
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
    }

  })
}

//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}
var checkUser=function(){
  var url=host+"/dinner/drawCheck?jwt_token="+get_token();
  commonCla.ajaxCommonFun(url,"get",function(ret){
   if(ret.code=="200"){
    if(ret.data.name!=undefined){
      var joinedHtml="<div><h1 class='fb'>您已经参与过抽奖。</h1><p class='mt10 lh200'>您的姓名为：<span class='fb'>"+ret.data.name+"</span></p><p class='lh200'>您的电话：<span class='fb'>"+ret.data.mobile+"</span></p></div>"
      $("#messdiv .messdivCons").html(joinedHtml);
      tcc.BOX_show("messdiv");
    }else{
      show_transmitBox($("#joinLottery"),$(".lottery_main"))
    }
   }else if(ret.code=="401"){
    $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
      tcc.BOX_show("messdiv");
   }else{
    $("#messdiv .messdivCons").html("您还没有参与过投票，暂时还不能参与抽奖哦~");
    tcc.BOX_show("messdiv");
   }
  })
}
var toRecordInfo=function(){
  var url=host+"/dinner/draw";
  var name=$("#txt_name").val();
  var phone=$("#txt_phone").val();
  var params={
    "jwt_token":get_token(),
    "name":name,
    "mobile":phone
  }
  var re = /^1\d{10}$/;
  $(".tip_error").html("");
  if(name==""){
    $("#txt_name").next(".tip_error").html("请填写姓名");
    return;
  }else if(phone==""){
    $("#txt_phone").next(".tip_error").html("请填写电话");
    return;
  }else if(!re.test(phone)){
    $("#txt_phone").next(".tip_error").html("电话格式不正确");
    return;
  }
  commonCla.ajaxCommonFun(url,"post",function(ret){
    if(ret.code=="200"){
      $(".messdivCons").html("您已成功参与此次抽奖");
       //tcc.BOX_remove("joinLottery");
       remove_transmitBox($("#joinLottery"),$(".lottery_main"))
       tcc.BOX_show("messdiv");
    }else if(ret.code=="422"){
      $("#messdiv .messdivCons").html("您输入的手机号已经参与过抽奖了哦~");
      remove_transmitBox($("#joinLottery"),$(".lottery_main"))
      tcc.BOX_show("messdiv");
   }else{
    $("#messdiv .messdivCons").html(ret.error);
      remove_transmitBox($("#joinLottery"),$(".lottery_main"))
      tcc.BOX_show("messdiv");
   }
  },params)
}
var initLotteryHtml=function(ret){
  var sPrizeHtml="";
  $(".prize_tip span").html(ret.data.total);
  if(ret.data.prize==null || ret.data.prize.length<=0){return;}
  for (var i = 0; i < ret.data.prize.length; i++) {
     if(ret.data.prize[i].status=="1"){
       if(ret.data.prize[i].code!=undefined){
          sPrizeHtml+="<li><img class='btn_getCode' src='assets/images/prize_0"+ 
      (Number(i)+1)+".png' ahref='"+ret.data.prize[i].link+"' acode='"+ret.data.prize[i].code+"'/></li>";
       }else{
        sPrizeHtml+="<li><a href='"+ret.data.prize[i].link+"'><img src='assets/images/prize_0"+ 
      (Number(i)+1)+".png' /></a></li>";
       }
      
    }else{
      sPrizeHtml+="<li><img src='assets/images/prize_dis_0"+ (Number(i)+1)+".png' /></li>";
    }
  };
  $(".js_signPrizes").html(sPrizeHtml);
 
}

var getPageData=function(){
  var jwt_token=get_token();
  var url=host+"/dinner/winPrize?jwt_token="+jwt_token;
  commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      initLotteryHtml(ret);
    }else if(ret.code=="401"){
      $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
      tcc.BOX_show("messdiv");
    }else{
      $(".messdivCons").html("可能出现了错误："+ret.error);
      tcc.BOX_show("messdiv");
    }
    
  })
}
var show_transmitBox=function(id,shade_area){
   id.show();
   id.find("input[type='text']").val("");
   id.find(".tip_error").html("");
   $("#BOX_shade").show();
   var shade_div="<div class='shade_area'></div>";
   if (document.getElementById('BOX_shade') == null){
      var overlay = document.createElement("div");
      overlay.setAttribute('id', 'BOX_shade');
      shade_area.append(overlay);
    }
}
var remove_transmitBox=function(id,shade_area){
   id.hide();
   $("#BOX_shade").hide();
}

var lotteryInit = function() {
  getPageData();
  //关闭弹框
 $(".js-close").click(function(){
  tcc.BOX_remove("messdiv");
 })
   //关闭弹框-jion
 $(".js-close-join").click(function(){
  //tcc.BOX_remove("joinLottery");
  remove_transmitBox($("#joinLottery"),$(".lottery_main"))
 })
 //保存抽奖信息
 $("#btn_join").click(function(){
  toRecordInfo();
 })
 //打开code
 $(".js_signPrizes").on("click",".btn_getCode",function(){
  var jHtml="您的代金券兑换码为：<span class='fb col_red'>"+$(this).attr("acode")+"</span><a class='btn_get' href='"+
  $(this).attr("ahref")+"'>去领取</a>"
  $(".messdivCons").html(jHtml);
  tcc.BOX_show("messdiv");
 })
}

$(function() {
  lotteryInit();
  //测试需删除
  //clientInter();
})