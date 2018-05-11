var server = 1;
var host = commonCla.hostBase+"/v6/";
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
}

var rotateFunc = function(ret,text) { //awards:奖项，angle:奖项对应的角度
  var angle=Number(ret.data.cook_prize.angle);
  $("#dial").stopRotate();
  $("#dial").rotate({
    angle: 0,
    duration: 5000,
    animateTo:Number(angle+1440), //angle是图片上各奖项对应的角度
    callback: function() {
      $("#lotteryBtn").prop("disabled",false);
      $(".messdivCons").html(text);
      tcc.BOX_show("messdiv");
      getPageData();
    }
  });
};
//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}
var toLottery = function() {
  $("#lotteryBtn").rotate({
    bind: {
      click: function() {
        if ($("#number").html() >0) {
          /*var url="../../../mock/lottery.json";*/
          var jwt_token=commonCla.analyzParams("jwt_token")==undefined?"":commonCla.analyzParams("jwt_token");
          if(jwt_token==""){
            jwt_token=login_token;
          }
          var url=host+"cook/prize?jwt_token="+jwt_token;
          $("#lotteryBtn").prop("disabled",true);
          commonCla.ajaxCommonFun(url,"post",function(ret){
              if (ret.code == "200") {
	              var changeNum=$(".chanceNum #number").html();
                $(".chanceNum #number").html(Number(changeNum)-1);
                var giftText = "";
                if(ret.data.cook_prize.name.indexOf("谢谢参与")>=0){
                   giftText = "<h1 class='gift_text'><span>" + ret.data.cook_prize.name + "</span></h1>";
                 }else{
                   giftText = "<h1 class='gift_text'>恭喜您获得<span>" + ret.data.cook_prize.name + "</span></h1>";
                 }
               
                rotateFunc(ret,giftText);
                
              } else if(ret.code=="401") {
               $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
               tcc.BOX_show("messdiv");
               $("#lotteryBtn").prop("disabled",false);
              }else{
                $(".messdivCons").html(ret.error);
                tcc.BOX_show("messdiv");
                $("#lotteryBtn").prop("disabled",false);
              }
          })
          
        } else if($("#number").html()<=0) {
          //alert("");
          var  messdivHtml="<div  class='gift_text'>您没有抽奖机会，参与活动可以赢取抽奖机会哦~</div>"
          $(".messdivCons").html(messdivHtml)
          tcc.BOX_show("messdiv");
        }else{
             $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
             tcc.BOX_show("messdiv");
        }
      }
    }
  })
}

var initLotteryHtml=function(ret){
  //签到奖品
  var sign_prizes = [
     {id:1,name:"美颜奇机面膜；",url:"http://weixin.myqj365.com/web/activity/fashionShow/index.html",istch:false},
     {id:2,name:"瑜伽兑换券",url:"http://wx.omcat.cn/cooperation",istch:true},
     {id:3,name:"“鲜逢”产品兑换券1份；",url:"http://coupon.m.jd.com/coupons/show.action?key=224492d53b524a4d841de57261f9146c&roleId=5205846&to=home.m.jd.com/wallet/coupons",istch:false},
     {id:4,name:"沱沱公社有机小米兑换券；",url:"http://a.app.qq.com/o/simple.jsp?pkgname=com.appfactory.apps.tootoo",istch:true}
  ] 
  var signNum=ret.data.user.cook_user.sign_num;
  $("#js_userName").html(ret.data.user.name);
  $("#js_signNum").html(signNum);
  $("#number").html(ret.data.user.cook_user.prize_chance)
  var sPrizeHtml="";
  for (var i = 0; i < 4; i++) {
    var cla="";var ba="";var ea="";
    if(i<signNum){
      if(sign_prizes[i].istch){
         cla="js_getPrize"
      }else{
        var ba='<a href="'+sign_prizes[i].url+'">';
        var ea="</a>";
      }
      sPrizeHtml+='<div class="prizeCon '+cla+'" surl="'+sign_prizes[i].url+'" sid="'+sign_prizes[i].id+'">'+ba+
                  '<img src="assets/images/prize-bg.png" />'+
                  '<img src="assets/images/p'+(Number(i)+1)+'.png"  class="pNum"/>'+
                  '<div class="prizeName">'+sign_prizes[i].name+'</div>'+ea+
                 '</div>'
    }else{
      sPrizeHtml+='<div class="prizeCon">'+
                  '<img src="assets/images/prize-useless-bg.png" />'+
                  '<img src="assets/images/p'+(Number(i)+1)+'.png"  class="pNum"/>'+
                  '<div class="prizeName col_grey">'+sign_prizes[i].name+'</div>'+
                  '</div>'
    }
  };
  $(".js_signPrizes").html(sPrizeHtml);
  //所有奖品初始化
  var all_prizes=ret.data.all_receive_prizes;
  var all_prizesHtml="";
  if(all_prizes!=null && all_prizes.length>0){
    for (var i = 0; i < all_prizes.length; i++) {
      //
       all_prizesHtml+='<tr>'+
           '<td>'+all_prizes[i].cook_prize.name+'</td>'+
            '<td>'+all_prizes[i].updated_at+'</td>'+
            '<td><input  id="hide_code" class="btn_userRule" type="button" value="如何使用" code="'+
            all_prizes[i].code+'" rules="'+
            all_prizes[i].cook_prize.rules+'" link="'+
            all_prizes[i].cook_prize.link+'"/>'+
          '</tr>'
    };
  }else{
     all_prizesHtml='<tr><td colspan="3">暂无数据</td></tr>'
  }
  
  $(".list_con tbody").html(all_prizesHtml);
}

var getPageData=function(){
  var jwt_token=commonCla.analyzParams("jwt_token")==undefined?"":commonCla.analyzParams("jwt_token");
  var url=host+"cook/cookUser?jwt_token="+jwt_token;
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

var lotteryInit = function() {
  getPageData();
  toLottery();
  //关闭弹框
 $(".js-close").click(function(){
  tcc.BOX_remove("messdiv");
 })
 //获取签到奖品
 $(".js_signPrizes").on("click",".js_getPrize",function(){
    var url=host+"cook/signPrize";
    var params={
      jwt_token:get_token(),
      prize_id:$(this).attr("sid")
    }
    var thi=$(this);
    commonCla.ajaxCommonFun(url,"post",function(ret){
      var messdivHtml="";
      var btn_link="";
      if(ret.code=="200"){
        if($(thi).attr("surl")!=""){
          btn_link="<a class='btn_get' href='"+$(thi).attr("surl")+"'>去领取</a>"
         }/*else{
          //沱沱工社
          btn_link="<img src='assets/images/ttgs-app.png'/><p>扫描二维码下载沱沱工社APP,注册并登陆-->点击最下方选择栏【我的】-->点击【我的兑换券】-->输入兑换码-->点击【使用】-->点击【选择】-->点击最下方【去购物车】-->点击【结算】添加/选择收货地址-->点击【去支付】-->完成</p>"
         }*/
         messdivHtml="<div>您的兑奖码为："+ret.data.code+"</div>"+btn_link;
      }else if(ret.code=="401"){
        messdivHtml="您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>";
        
      }else{
         messdivHtml="<div>出错了，请稍后重试~</div>"
          
      }
      $(".messdivCons").html(messdivHtml)
      tcc.BOX_show("messdiv");
      
    },params)
     
 })
 //如何使用
 $(".list_con").on("click",".btn_userRule",function(){
    var code=$(this).attr("code");
    var rules=$(this).attr("rules");
    var link=$(this).attr("link");
    var codeStr="";var linkStr="";
    if(code!=null && code !="null" && code!=""){
      codeStr="<h1>您的兑换码：<span class='col_red fb'>"+code+"</span></h1>"
    }
    if(link!=null && link !="null" && link!=""){
      linkStr="<a href='"+link+"' class='btn_get'>去领取</a>"
    }
    var messdivHtml="<div class='useRules_main'>"+
                    codeStr+
                    "<div class='rule_cons tl'><h2 class='tl'>使用规则：</h2>"+rules+"</div>"+
                    linkStr+
                    "</div>";
    $(".messdivCons").html(messdivHtml);
    tcc.BOX_show("messdiv");
 })

}

$(function() {
  lotteryInit();
})