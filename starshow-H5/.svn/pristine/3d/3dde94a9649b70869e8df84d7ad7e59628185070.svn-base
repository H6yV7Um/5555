var server = 1;
var host=commonCla.hostBase+"/v6/";
var login_token="";
var t="";
var timer_C="";
var letvPlayer="";

var first_beginTime="2016-12-23 10:00:00";
var end_hours=22;
var chefdata="";
/**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'        //1-跳登陆；2-跳个人；3-普通分享；4-打榜分享；5-支付宝支付；6-微信支付
share : {title : "分享标题", content: "分享内容", cover : "分享icon", share_url : "分享link"}
order_id : '11'     // 订单id
user_id : '22'      // 跳转个人页的用户id
nextStep : '1'      //返回js下一步跳转地址类型

方法：
javascriptHandler :  用于“客户端”调取“JavaScript”方法
nativeCallback :     用于“JavaScript”调取“客户端”方法

*/
window.onerror = function(err) {
  //alert('window.onerror: ' + err)
}

//判断是否是Android
function isAndroid() {
  var ua = navigator.userAgent.toLowerCase();
  var isA = ua.indexOf("android") > -1;
  if (isA) {
    return true;
  }
  return false;
}

//判断是否Iphone
function isIphone() {
  var ua = navigator.userAgent.toLowerCase();
  var isIph = ua.indexOf("iphone") > -1;
  if (isIph) {
    return true;
  }
  return false;
}

//设置WebViewJavascriptBridge通信
function setupWebViewJavascriptBridge(callback) {
  if (isIphone()) { //用于Iphone
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  } else {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady',
        function() {
          callback(WebViewJavascriptBridge)
        },
        false)
    }
  }
}

//设置调用客户端方法并赋值
function setBridgeCallHandler(bridge, data) {
  if (isIphone()) {
    bridge.callHandler('nativeCallback', data,
      function(response) {
        //
      })
  } else {
    window.WebViewJavascriptBridge.callHandler('nativeCallback', data,
      function(response) {
        //
      })
  }
}

//设置WebViewJavascriptBridge通信回调方法
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') { //登录
      
        login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
      

    }else if (data.nextStep == '8') { 
      shareActivity();
    }else if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
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
    //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/starshow5.0/chefWorks/share.html",
          'title': "来星秀，票选你心中的完美主厨！",
          'content': "参与《大厨之作》票选，赢每日签到好礼！用佳肴触碰味蕾，用选票见证完美！",
          'cover': "https://lookmetv.com/starshow5.0/chefWorks/assets/images/icon-share.png"
        }
      })
    }


})



//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}

/*var initBanner=function(data){
  
}*/
/*列表*/
var initChefHtml = function(data,containerId) {
  var top3Html="";
  var othersHtml="";
  for (var i = 0; i < data.length; i++) {
    var likeStatus=data[i].like_status;
     var likeStr="assets/images/gray-heart.png";
     if(likeStatus==1){
      var likeStr="assets/images/red-heart.png";
     }
    if(i<=2){
      if(i==0 || i==2){
        clas="chef_top_con"
      }else{
        clas="chef_top_con n2"
      }
     /*var dishsHtml="";
     for (var a = 0; a < data[i].dishs.length; a++) {
       dishsHtml+='<li>'+'<img src="'+data[i].dishs[a].cover+'" />' +' </li>'
     };*/
     
     top3Html+='<div class="'+clas+'" >'
       +' <img src="assets/images/n'+(i+1)+'.png"  class="icon_num"/>'
       +'<span class="chef_name">'+data[i].name+'</span>'
       +' <div class="heart_area  js-hit" cookid="'+data[i].id+'">'
             +' <img  class="vm" src="'+likeStr+'" width="25" />'
            +'  <span class="vm">'+data[i].like_num+'</span>'
       +' </div>'
       +' <div class="chef_workList">'
        +'  <div class="chef_pic"><img src="'+data[i].head_pic+'"  width="100%" /></div>'
        /*+'  <div class="works_con">'
            +'<p class="icon_font2">拿手菜</p><ul>'+dishsHtml+'</ul></div>'*/
         +' <div class="chef_desc">'
            +'<p class="desc_title">简介</p>'
           +' <pre>'+data[i].introduction+'</pre>'
          +'</div>'
       +' </div>'
     +' </div>'
    }else{
     othersHtml+='<li>'+
       ' <p class="rank-num">第 <span class="bigNum">'+Number(i+1)+'</span> 名</p>'+
        '<p class="head-pic">'+
         ' <img src="'+data[i].head_pic+'!250x250" />'+
        '</p> '+
       ' <p class="user-name">'+data[i].name+'</p>'+
    ' <div class="follow-num">'+
      '<div class="fl js-hit"  cookid="'+data[i].id+'">'+
        '<img class="icon_change" src="'+likeStr+'" />'+
         ' <span id="followNum">'+data[i].like_num+'</span>'+
     ' </div>'+
     ' <div class="fl icon_show"><img  src="assets/images/xiala.png" /></div>'+
    ' </div>'+
     '<div class="hit-dialog" style="display:none">'+
      '<img class="d-arraw" src="assets/images/tangchukuang.png" width="25"/>'+
    '<div class="icon_font03">简介</div> '+
    '<pre>'+data[i].introduction+'</pre> '+
      /*'<div class="works_list">'+
        '<div class="icon_font03 fl">拿手菜</div>'+
          '<ul>'+dishsHtml+'</ul>'+
      '</div>'+*/
     '</div>'+
     '</li>'
    }
  };
  $(containerId).find(".chef_top3").html(top3Html);
  $(containerId).find(".chef_others").html(othersHtml);
}
var endLivePlay=function(){
         $("#player").hide();
         $(".conter_area").hide();
         $(".banner_bg >img").show();
         $(".banner_bg >img").css("opacity","0.3");
         $(".banner_bg div.end_label").html("直播已结束");
}
var chefPreheat=function(data){
  //计算时间
  var btime=data.current_time.replace(/-/g, '/');
 /* var etime=new Date("2016/12/28 10:00:00");*/
  var etime=first_beginTime.replace(/-/g, '/');
 /* var markDay=new Date(etime).getDate();
  var markHours=new Date(etime).getHours();
  //计算下次视频开始时间
  var temp_current_time=new Date(btime);
  var cur_day=temp_current_time.getDate();
  var cur_hours=temp_current_time.getHours();
  //第二天的十点开始
  if(cur_day>=markDay && cur_day<Number(markDay+3)){
    var dateStr="2016/12/"+Number(markDay+(cur_day-markDay))+" 10:00:00"
    etime=new Date(dateStr);
  }*/
   //清除计时器
      clearInterval(timer_C);
  //初始化倒计时
    initJcountdown(btime,etime,"time_show",function(){
          afterCounter();
    })
    timer_C=setInterval(function(){
        initJcountdown(btime,etime,"time_show",function(){
          afterCounter();
        })
     },1000)

}
var getStatus=function(current_time){
  var cur_time=current_time.replace(/-/g, '/');
  var day=new Date(cur_time).getDate();
  var hours=new Date(cur_time).getHours();
  var year=new Date(cur_time).getFullYear()
  //开始的日期
  var markTime=first_beginTime.replace(/-/g, '/');
  var markDay=new Date(markTime).getDate();
  //几点开始
  var startHours=new Date(markTime).getHours();

  var status=3;
  if(year=="2016"){
    /*if(day<markDay){
        status=3;
      }else if(day>=markDay && day<Number(markDay+3)){
        if(hours<startHours || hours>=end_hours){
           status=3;
        }else if(hours>=startHours && hours<end_hours){
          status=1;
        }
      }else if(day==Number(markDay+3)){
        if(hours<startHours){
           status=3;
        }else if(hours>=startHours && hours<Number(end_hours+2)){
          status=1;
        }else{
          status=0
        }
      }else{
        status=0
      }*/
      if(day<markDay){
          status=3;
      }else if(day>=markDay && day<Number(markDay+3)){
          status=1;
      }else{
        status=0;
      }
  }else{
    status=2;
  }
  return status;
}
var initLivePart=function(data){
      var livedata=data.data.live;
      $("#play_hide").attr("hls",livedata.hls_url);
      $("#play_hide").attr("cover",livedata.cover);
      $("#chef_hideInfo").attr("currentTime",data.current_time);
      first_beginTime=livedata.begin_time;

     /* var status=livedata.status;*/
      var status=3;
      if(livedata.status!=2){
        status=getStatus(data.current_time);
      }else{
        status=livedata.status;
      }
      
      //未开始 temp value 3未开始 1正在直播 0结束  2回放
      if(status=="3"){
       //预热
       chefPreheat(data);
      }else if(status=="1"){
         afterCounter();
      }else if(status=="0"){
         endLivePlay();
      }else{
      	endLivePlay();
        /*$("#player").show();
        $(".banner_bg >img").hide();
        $(".conter_area").hide();
        //var tempurl="http://play.g3proxy.lecloud.com/vod/v2/MjI4LzE1LzQ0L2JjbG91ZC84MzY5NjQvdmVyXzAwXzIyLTEwNzc2NzMxMzUtYXZjLTEwMjY5OTUtYWFjLTYyODUyLTIwNDE3LTI4MTEyMjAtZDRjMWI1MTc0N2VkZTk5YjY5MWJhYjJhZTUyNzQ1ZWEtMTQ4MjE1Mzg1MzY1NC5tcDQ=?b=1101&mmsid=217048584&tm=1482157022125&pip=95c97e28448a5ee46547a09920515df4&key=8f58c0f7ac3626341d350814e5d056b5&platid=2&splatid=206&payff=0&cuid=836964&vtype=28&dur=20&p1=3&p2=32&p3=322&cf=android-app&p=101&playid=0&tss=no&tag=mobile&sign=bcloud_836964&termid=2&pay=0&ostype=android&hwtype=un";
        var replay_url=livedata.replay_url==undefined?"":livedata.replay_url
         letvPlayer = new CloudVodPlayer();
         letvPlayer.init({
          callbackJs:"replayCall",
          url:replay_url,
          posterType:2,
          pic:livedata.cover,
          auto_play:0,
          autoSize:1
        },"player");
          */
      }
      
      
      
}
var initChefList = function() {
 /* var jwt_token=commonCla.analyzParams("jwt_token")==undefined?"":commonCla.analyzParams("jwt_token");*/
  var jwt_token=get_token();
  var url = host+"cook/index?jwt_token="+jwt_token;
  /*var url = host+"/mock/main.json";*/
  commonCla.ajaxCommonFun(url, "get", function(data) {
    if (data != null && data.code == "200") {
      //奖品
      if(data.data.cook_user!=null){
        var sign_num=Number(data.data.cook_user.sign_num);
        var prize_chance=Number(data.data.cook_user.prize_chance);
        if(prize_chance>0 || sign_num>0){
          $(".icon_prizes .num").html(sign_num+prize_chance<0?"0":sign_num+prize_chance);
          $(".icon_prizes .num").show();
        }
        
      }
      //live
      chefdata=data;
      //initLivePart(data);
      //live end
      var pop_cooks=data.data.popularity_cooks;
      var cross_cooks=data.data.crossover_cooks;
      var assistant_cooks=data.data.assistant_cooks;
      if(pop_cooks!=null &&pop_cooks.length>0){
        initChefHtml(pop_cooks,$(".chef_list").eq(0));
      }
      if(cross_cooks!=null &&cross_cooks.length>0){
        initChefHtml(cross_cooks,$(".chef_list").eq(1));
      }
      if(assistant_cooks!=null &&assistant_cooks.length>0){
        initChefHtml(assistant_cooks,$(".chef_list").eq(2));
      }
    }

  })
}

var hitRank = function(jwt_token,thi) {
  var messConsHtml="";
  var messCheckHtml="";
  var params={
    "jwt_token":jwt_token
  }
  var id=$("#curCookId").attr("cookid");
  var url=host+"cook/"+id+"/like"
  /*var url =host+"mock/hit.json"*/
  commonCla.ajaxCommonFun(url,"post",function(data){
      var rankName="<span class='fb'>"+$(".chef_nav li.cur").text()+"</span>";
     if(data.code=="200"){
       if(data.data.left_like_chance!=undefined){       
         if(data.data.left_like_chance!=0){
           messConsHtml="<div class='success_tip'>成功打"+rankName+"榜"+(6-Number(data.data.left_like_chance))+"次<br/>累计打榜"+data.data.like_num+
                         "次<br/>还有<span class='bigNum'>"+data.data.left_like_chance+
                         "</span>次机会</div>"
         }else{
           messConsHtml="<div class='success_tip'>成功打"+rankName+"榜"+(6-Number(data.data.left_like_chance))+"次<br/>累计打榜"+data.data.like_num+
                         "次<br/>当前榜的打榜机会已用完~</div>"
         }
        
        //变红
         thi.find("img").attr("src","assets/images/red-heart.png");
         var num=Number(thi.find("span").html())+1;
         thi.find("span").html(num);
         /*setTimeout(function(){
            tcc.BOX_remove("messdiv");
         },3000)*/

       }else{
          messConsHtml="<div class='success_tip'>"+rankName+"榜<br/>的打榜机会已用完~</div>";
         }
       $(".messdivCons").html(messConsHtml);
       tcc.BOX_show("messdiv");
       //弹出签到框，累计签到几天，并弹出相应奖品 ，3秒消失
       if(data.data.today_sign=="1"){
        //alert("累计签到")
          $(".check_main img").attr("src","assets/images/pro"+data.data.sign_num+".png")
          $(".giftName").css("top","20px");
          /*$(".giftName").html(data.data.sign_prize_name);*/
          var prizes_desc="";
          var prizes_hit3="<span class='prizes_hit3'>累计打榜"+data.data.like_num+"次,获得一次抽奖机会</span>"
          if(data.data.prize_chance=="1"){
            prizes_desc="恭喜你，累计签到"+data.data.sign_num+"天"+prizes_hit3
          }else{
            prizes_desc="恭喜你，累计签到"+data.data.sign_num+"天"
          }
          $(".check_num").html(prizes_desc)
          tcc.BOX_show("messCheck")
       }else if(data.data.prize_chance=="1"){
          //alert("获得一次抽奖机会")
          $(".check_main img").attr("src","assets/images/lottery-bg2-s.png")
          $(".giftName").css("top","50px");
          $(".giftName").html("恭喜您，获得一次抽奖机会");
          $(".check_num").html("");
          tcc.BOX_show("messCheck")
       }
     }else if(data.code=="401"){
      $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
      tcc.BOX_show("messdiv");
     }else{
      $(".messdivCons").html("操作失败了，请稍后重试。");
      tcc.BOX_show("messdiv");
     }
     initChefList();
  },params)
}
var clientInter=function(bridge){
  //登录失效
  $(".messdivCons").on("click",".js_toLogin",function(e){
       tcc.BOX_remove("messdiv");
      /*过期重新登录*/
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
  //点击打榜
  var jwt_token=get_token()
  $(".chef_list").on("click",".js-hit",function(e) {
    $("#curCookId").attr("cookid",$(this).attr("cookid"));
    if(jwt_token==""){
       var cookId=$(this).attr("cookid");
      /*登录
       *nextStep1 打榜
      */
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep':'1',
        'cookId':cookId
      })
    }else{
       hitRank(jwt_token,$(this));
    }
    
  })
  $(".icon_prizes").on("click",function(e){
    if(jwt_token==""){
       var cookId=$(this).attr("cookid");
      /*登录
       *nextStep1 打榜
      */
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep':'1',
        'cookId':cookId
      })
    }else{
       window.location.href="lottery.html?jwt_token="+jwt_token;
    }
  })
}

var initJcountdown=function(currentTime,endTime,containerId,sfun){
    var EndTime= new Date(endTime);
    var NowTime = new Date(currentTime);
    if(t===""){
      t =EndTime.getTime() - NowTime.getTime();
    } 
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    var dayHtml="";
    if(d>0){
      dayHtml="<span>"+d+"</span> 天"
    }
    var formatDate=dayHtml+" <span>"+h+"</span> 时"
                    +" <span>"+m+"</span> 分"
                    +" <span>"+s+"</span> 秒"

    $("#"+containerId).html(formatDate) ;
    t=t-1000;
    if(d==0 && h==0 && m==0  && s==0){
     //清除计时器
      clearInterval(timer_C);
      sfun();
    }
   
}
var afterCounter=function(){
  $("#player").show();
  $(".banner_bg >img").hide();
  $(".conter_area").hide();
 
  //初始化播放器
   letvPlayer = new CloudLivePlayer();
   letvPlayer.init({
    callbackJs:"replayCall",
    url:$("#play_hide").attr("hls"),
   /* url:"http://live.gslb.letv.com/gslb?stream_id=hz_test_1800&tag=live&ext=m3u8&platid=10&splatid=1029",*/
    posterType:2,
    pic:$("#play_hide").attr("cover"),
    auto_play:0,
    autoSize:1
  },"player");
}
var chefPageInit = function() {
  //初始化页面
  initChefList();
  //初始化视频
  initLivePart(chefdata);
  //initBanner();
  //切换tab
  $(".chef_nav li").click(function() {
    $(".chef_nav li").removeClass("cur");
    $(this).addClass("cur");
    var typeId = Number($(this).index());
    $(".chef_list").hide();
    $(".chef_list").eq(typeId).show();
  })
  //点击下拉--展示厨师更多信息
  $(".chef_others").on("touchstart", ".icon_show", function(e) {
      var parent_li = $(this).parent().parent();
      var is_show = parent_li.find("div.hit-dialog").css("display");
      if (is_show == "none") {
        parent_li.find("div.hit-dialog").css("display", "block");
        $(this).find("img").attr("src", "assets/images/shouqi.png")
      } else {
        parent_li.find("div.hit-dialog").css("display", "none");
        $(this).find("img").attr("src", "assets/images/xiala.png")
      }

    })
 //关闭提示框
 $(".js-close").click(function(){
  tcc.BOX_remove("messdiv");
 })
 //关闭签到奖品
 $(".btn_closeCheck").click(function(){
    $("#messCheck").addClass("animated zoomOutDown1")
    setTimeout(function(){
      tcc.BOX_remove("messCheck");
      $("#messCheck").removeClass("animated zoomOutDown1");

    },1200)
    if($("#messdiv").css("display")!="none"){
     setTimeout(function(){tcc.BOX_show("messdiv");},1200)
    }
 })

//测试需删除
 /* $("#tempOpen").click(function(){
    tcc.BOX_show("messCheck")
  })*/


}
  //视频回调
  var replayCall=function(type,data){
      /*if(type=="videoLiveStop" || type=="videoLiveInterupt" || type=="videoEmpty" || type=="videoError" ){
        //直播播放结束
        initChefList();
        //初始化视频
        initLivePart(chefdata);
        if(data[0].code=="494"){
          endLivePlay();
	        $(".end_label").html("视频中断了，刷新一下看看哦~")
        }
      }
     console.log("type:"+type+"---data:"+JSON.stringify(data))*/
  }
$(function() {
  //联调需删除
 // clientInter();
 //区别分享页面
 if($("#btn_down").html()!=undefined){
  $(".chef_list").on("click",".js-hit",function(e) {
   /* window.location.href="http://t.cn/R7COgYb"*/
    $(".messdivCons").html("下载时尚星秀APP，获得更多精彩内容。<br/><a href='http://t.cn/R7COgYb' class='btn_get'>去下载</a>");
     tcc.BOX_show("messdiv");
  })
  $(".icon_prizes").on("click",function(e){
    $(".messdivCons").html("下载时尚星秀APP，获得更多精彩内容。<br/><a href='http://t.cn/R7COgYb' class='btn_get'>去下载</a>");
     tcc.BOX_show("messdiv");
  })
  //微信分享
  wx_share();
 }
  //页面初始化
  chefPageInit();


})