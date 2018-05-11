var server = 1;
var host=commonCla.hostBase+"/v10";
var login_token="";
var letvPlayer="";
var timer_C="";
var t="";
var first_beginTime="2017-06-16 20:00:00";
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '8') { 
      shareActivity();
    }
    if (data.nextStep == '1') { //打榜登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '2') { //跳转
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
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/starshow5.0/debateVote/share.html",
          'title': "【双面派】第五期 “ 风水兴三代，星座毁一生？”",
          'content': "你的星座靠谱吗？你的星座被黑过吗？是否用星座去看待人和事呢？第五期双面派辩论“星座说”是否靠谱。天空将答案隐藏起来。双面派为你揭晓！",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/logo/shuangmianpai-2.png"
        }
      })
    }
})
var clientInter=function(bridge){
   //过期重新登录
   $(".dialog_tip").on("click",".js_toLogin",function(e){
       tcc.BOX_remove("messdiv");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
   //投票
   $(".vote_btns").on("click",".js-vote",function(e){
    var sideId=$(this).attr("sideId");
      if(get_token()=="" || get_token()==undefined){
        e.preventDefault();
        setBridgeCallHandler(bridge, {
           'action': '1',
           'nextStep':'1'
        })
      }else{
        //投票
        toVote(sideId);
      }
   })
   //保存手机号
  $(".dialog_tip").on("click","#js-save",function(){
  $(".txt_phone").next(".error_tips").html("");
    if(get_token()=="" || get_token()==undefined){
        e.preventDefault();
        setBridgeCallHandler(bridge, {
           'action': '1',
           'nextStep':'1'
        })
      }else{
        //投票
        toSave();
      }
  })
}
tcc.BOX_layout=function(e){
      var a = document.getElementById(e);
      if (document.getElementById('BOX_overlay') == null) //判断是否新建遮掩层
      {
        var overlay = document.createElement("div");
        overlay.setAttribute('id', 'BOX_overlay');
        document.body.appendChild(overlay);
      }
      document.getElementById('BOX_overlay').ondblclick = function() {
        tcc.BOX_remove(e);
      };
      var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      var clientWidth;
      if (window.innerWidth) {
        clientWidth = window.innerWidth;
        // clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
      } else {
        clientWidth = document.documentElement.clientWidth;
      }
      var clientHeight;
      if (window.innerHeight) {
        clientHeight = window.innerHeight;
        //clientHeight = ((Sys.Browser.agede3x3nt === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
      } else {
        clientHeight = document.documentElement.clientHeight;
      }
      var bo = document.getElementById('BOX_overlay');
      bo.style.left = scrollLeft + 'px';
      bo.style.top = scrollTop + 'px';
      bo.style.width = clientWidth + 'px';
      bo.style.height = clientHeight + 'px';
      bo.style.display = "";
      //Popup窗口定位
      a.style.position = 'absolute';
      a.style.zIndex = 999;
      a.style.display = "";
      a.style.left = scrollLeft + ((clientWidth - a.offsetWidth) / 2) + 'px';
     /* a.style.top = scrollTop + ((clientHeight - a.offsetHeight) / 2) + 'px';*/
     a.style.top =100+'px'
}
//数以万计
var countNum=function(num){
  var countedNum=num;
  if(num>=10000){
    countedNum=Number(num/10000).toFixed(2)+"万" 
  }
  return countedNum;
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
      dayHtml="<span>"+d+"</span>天"
    }
    var formatDate=dayHtml+"<span>"+h+"</span>:"
                    +"<span>"+m+"</span>:"
                    +"<span>"+s+"</span>"

    $("#"+containerId).html(formatDate) ;
    t=t-1000;
    if(d==0 && h==0 && m==0  && s==0){
     //清除计时器
      clearInterval(timer_C);
      sfun();
    }
   
}
var afterCounter=function(){
  $(".videos").show();
  $(".banners").hide();
 
  //初始化播放器
  var player = new CloudLivePlayer();
  //activityId 请换成自己设置的获得id
  player.init({url:$("#hide_info").attr("hls"),posterType:3,pic:$("#play_hide").attr("cover"),auto_play:0,auto_size:1,pu:"1655aeb1f1"},"player");
}
//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}

var initHtml=function(ret){
  $("#hide_info").attr("is_mobile",ret.data.is_mobile);
  $("#hide_info").attr("is_vote",ret.data.is_vote);
  if(ret.data.live!=null){
    $("#hide_info").attr("hls",ret.data.live.pull_hls);
    $("#hide_info").attr("cover",ret.data.live.cover);
  }
  
  $(".vote_zheng").next("p").html(ret.data.positive_num);
  $(".vote_fan").next("p").html(ret.data.negative_num);
  if(ret.data.live==null || ret.data.live.cover_video=="" || ret.data.live.cover_video==null){
    $(".videos_pre").hide();
  }else{
    $(".videos_pre").show();
    $(".videos_pre video").attr("src",ret.data.live==null?"":ret.data.live.cover_video)
  }
  
  //0否，1正票；2反票
  if(ret.data.is_vote==1){
    $(".btn_vote").removeClass("js-vote");
    $(".vote_fan").addClass("disabled");
    $(".vote_zheng .f2").html("已投票");
  }else if(ret.data.is_vote==2){
    $(".btn_vote").removeClass("js-vote");
    $(".vote_zheng").addClass("disabled");
    $(".vote_fan .f2").html("已投票");
  }
  $(".vote_btns").show();
  //算进度
  var allNum=Number(ret.data.positive_num)+Number(ret.data.negative_num);
  var percent=Number(ret.data.positive_num/allNum)*100;
  /*$(".line_yellow").css("width",percent+"%")*/
  $(".line_yellow").animate({width:percent+"%"});
  var vsLeft=Number(percent-6)<=0?"1":Number(percent-6)
  /*$(".vs").css("left",vsLeft+"%");*/
  if(percent==100){
    vsLeft=90
  }
  $(".vs").animate({left:(vsLeft)+"%"});

  //直播状态：-1未开始，0结束，1进行，2回放，3预热
  var status=-1;
  if(ret.data.live!=null){
    var status=ret.data.live.status
  }
  if(status==-1 || status==3){
    $(".banners").show();
    $(".videos").hide();
    var btime=ret.current_time.replace(/-/g, '/');
    var etime=first_beginTime.replace(/-/g, '/');
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
    //倒计时结束
  }else if(status==1){
    $(".banners").hide();
    $(".videos").show();
    //初始化直播播放器
    var player = new CloudLivePlayer();
    //activityId 请换成自己设置的获得id
    player.init({url:ret.data.live.pull_hls,posterType:3,pic:ret.data.live.cover,auto_play:0,auto_size:1,pu:"1655aeb1f1"},"player");
  }else if(status==2){
    $(".banners").hide();
    $(".videos").show();
    //初始化播放器
    /* var player = new CloudVodPlayer();
     player.init({url:ret.data.live.replay_url,posterType:2,pic:ret.data.live.cover,auto_play:0,autoSize:1,pu:"1655aeb1f1"},"player");*/
    var player = new CloudVodPlayer();
    player.init({uu:"nnakh40hbq",vu:ret.data.live.vuid,posterType:2,pic:ret.data.live.cover,auto_play:0,autoSize:1,pu:"1655aeb1f1"},"player");
  }

}
var getData=function(){
 var jwt_token=get_token();
 var url=host+"/debate?jwt_token="+jwt_token;
 commonCla.ajaxCommonFun(url,"get",function(ret){
   initHtml(ret);
 })
}
var toVote=function(sideId){
  var jwt_token=get_token();
  var url=host+"/debate/vote?jwt_token="+jwt_token;
  var params={
    "vote":sideId
  }
  commonCla.ajaxCommonFun(url,"post",function(ret){
    if(ret.code=="200"){ 
      $(".messdivCons").show();
      $(".tips").hide();
      $(".tips").html("");
      /*if($("#hide_info").attr("is_mobile")==1){
        $(".phoneCon").hide();
      }else{
        $(".phoneCon").show();
      }*/
      //2期删掉手机号存储
      $(".phoneCon").hide();
      tcc.BOX_show("messdiv");
      getData();
    }else if(ret.code=="401"){
      if($("#btn_down").html()!=undefined){
        window.location.href =host+"/wechat/activityAuth?type=debateVote"
      }else{
        $(".messdivCons").hide();
        $(".tips").show();
        $(".tips").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
        tcc.BOX_show("messdiv");
      }
       
    }

  },params)
}
var toSave=function(){
  $(".txt_phone").next(".error_tips").html("");
  var txtVal=$(".txt_phone").val();
  if($.trim(txtVal)==""){
     $(".txt_phone").next(".error_tips").html("请输入手机号!");
    return;
  }else if(!(/^1[34578]\d{9}$/.test(txtVal))){ 
     $(".txt_phone").next(".error_tips").html("手机号码有误，请输入正确手机号!!");
     return;
  }

  var jwt_token=get_token();
  var url=host+"/debate/mobile?jwt_token="+jwt_token;
  var params={
    "mobile":txtVal
  }
  commonCla.ajaxCommonFun(url,"post",function(ret){
    if(ret.code=="200"){ 
      $(".messdivCons").show();
      $(".phoneCon").html("<div class='success_tip' style='border:none'>电话保存成功</div>");
      tcc.BOX_show("messdiv");
      setTimeout(function(){tcc.BOX_remove("messdiv");},2000)
    }else if(ret.code=="401"){
      if($("#btn_down").html()!=undefined){
        window.location.href =host+"/wechat/activityAuth?type=debateVote"
      }else{
        $(".messdivCons").hide();
        $(".tips").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
        tcc.BOX_show("messdiv");
      }
       
    }else{
      $(".error_tips").html("保存失败，请稍后重试");
    }

  },params)

}
var shareAgain=function(){
   //二次分享
    var tit="【双面派】第五期 “ 风水兴三代，星座毁一生？”";
    var desc="你的星座靠谱吗？你的星座被黑过吗？是否用星座去看待人和事呢？第五期双面派辩论“星座说”是否靠谱。天空将答案隐藏起来。双面派为你揭晓！";
    var link="https://lookmetv.com/starshow5.0/debateVote/share.html";
    var img="https://starshow-pic.b0.upaiyun.com/default/logo/shuangmianpai-2.png"
    wx_share(tit,desc,link,img);
}
$(function(){
  if($("#btn_down").html()!=undefined){
       //二次分享
     shareAgain();
     $(".vote_btns").on("click",".js-vote",function(){
       //微信授权
       if(get_token()=="" || get_token()==undefined){
       window.location.href =host+"/wechat/activityAuth?type=debateVote"
       }else{
        toVote($(this).attr("sideId"));
       }
     })
     //保存手机号
    $(".dialog_tip").on("click","#js-save",function(){
    $(".txt_phone").next(".error_tips").html("");
      if(get_token()=="" || get_token()==undefined){
        window.location.href =host+"/wechat/activityAuth?type=debateVote"
        }else{
          //保存手机号
          toSave();
        }
    })
  }
  //初始化数据
  getData();
  //CLOSE
  $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
   })
 // tcc.BOX_show("messdiv")

})