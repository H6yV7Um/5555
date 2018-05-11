//var host="http://123.57.0.118:5000/v6";
var host=commonCla.hostBase+"/v12"
var conversation_id="";
var t="";
var login_token="";
var player=window.player;
//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}
//没用
var clientInter=function(bridge){
  //过期重新登录
   $(".messdivCons").on("click",".js_toLogin",function(e){
       tcc.BOX_remove("messdiv");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
   //点赞
 $("#btn-zan").click(function(e){
    if(get_token()=="" || get_token()==undefined){
        e.preventDefault();
        setBridgeCallHandler(bridge, {
           'action': '1',
           'nextStep':'1'
       })
    }else{
      var url=host+"/live/"+analyzParams("id")+"/like?jwt_token="+get_token();
      toZan(url);
    }
  })
 //关注
 $(".toAppConcern").click(function(e){
    if(get_token()=="" || get_token()==undefined){
        e.preventDefault();
        setBridgeCallHandler(bridge, {
           'action': '1',
           'nextStep':'1'
       })
    }else{
      toFollow();
    }
 })
 //跳转视频
 $(".vedioList").on("click","li",function(e){
     //setTimeout(function(){},1)
     var thi=$(this);
     var status=thi.attr("vstatus");
     if(thi.attr("viframe_type")==0){
         var actionNum=12;
         if(status==2){actionNum=13;}
          e.preventDefault();
          setBridgeCallHandler(bridge, {
             'action': actionNum,
             'id':thi.attr("vid"),     // 直播、回播、TV 的id
             'is_erect':thi.attr("verect"),   // 直播是否竖屏 0否，1是
             'live_status':thi.attr("vstatus"), // 直播状态
             'nextStep':'5'
         })
     }else{
      window.location.href=commonCla.shareUrlBase+"/starshow5.0/live/detail.html?id="+thi.attr("vid")+"&jwt_token="+get_token();
     }
     
 })
}

var tcc={
  BOX_show:function(e) //显示
  {
      if(document.getElementById(e)==null)
      {
          return ;
      }
      var selects = document.getElementsByTagName('select');
      for(i = 0; i < selects.length; i++)
      {
          selects[i].style.visibility = "hidden";
      }
      tcc.BOX_layout(e);
      window.onresize = function(){BOX_layout(e);} //改变窗体重新调整位置
      window.onscroll = function(){BOX_layout(e);} //滚动窗体重新调整位置
      document.onkeyup = function(event)
      {
          var evt = window.event || event;
          var code = evt.keyCode?evt.keyCode : evt.which;
          //alert(code);
          if(code == 27)
          {
              tcc.BOX_remove(e);
          }
      }
  },
  BOX_remove:function(e)//移除
  {
      window.onscroll = null;
      window.onresize = null;
      document.getElementById('BOX_overlay').style.display="none";
      document.getElementById(e).style.display="none";
      var selects = document.getElementsByTagName('select');
      for(i = 0; i < selects.length; i++)
      {
          selects[i].style.visibility = "visible";
      }
  },
  BOX_layout:function(e)//调整位置
  {
      var a = document.getElementById(e);
      if (document.getElementById('BOX_overlay')==null)//判断是否新建遮掩层
      {
          var overlay = document.createElement("div");
          overlay.setAttribute('id','BOX_overlay');
          document.body.appendChild(overlay);
      }
      document.getElementById('BOX_overlay').ondblclick=function(){tcc.BOX_remove(e);};
      //取客户端左上坐标，宽，高
      var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      var clientWidth;
      if (window.innerWidth)
      {
          clientWidth = window.innerWidth;
         // clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
      }
      else
      {
          clientWidth = document.documentElement.clientWidth;
      }
      var clientHeight;
      if (window.innerHeight)
      {
          clientHeight = window.innerHeight;
          //clientHeight = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
      }
      else
      {
          clientHeight = document.documentElement.clientHeight;
      }
      var bo = document.getElementById('BOX_overlay');
      bo.style.left = scrollLeft+'px';
      bo.style.top = scrollTop+'px';
      bo.style.width = clientWidth+'px';
      bo.style.height = clientHeight+'px';
      bo.style.display="";
      //Popup窗口定位
      a.style.position = 'absolute';
      a.style.zIndex=999;
      a.style.display="";
      a.style.left = scrollLeft+((clientWidth-a.offsetWidth)/2)+'px';
      a.style.top = scrollTop+((clientHeight-a.offsetHeight)/2)+'px';
  },
  HiddenButton:function(e)
  {
      e.style.visibility='hidden';
      e.coolcodeviousSibling.style.visibility='visible'
  }
}
var ajaxCommonFun=function(url, type, callbackFun, params) {
      $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        async: true,
        cache: false,
        data: params,
        success: function(data) {
          //回调函数
          if (callbackFun) {
            callbackFun(data);
          }
        },
        error: function() {
        }
      })
   }
  var dateDiff=function(interval, date1, date2){
    if(date1==null || date2==null){
      return "";
    }
     var objInterval = {'D':1000 * 60 * 60 * 24,'H':1000 * 60 * 60,'M':1000 * 60,'S':1000,'T':1};
     interval = interval.toUpperCase();
     var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
     var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
     try
     {
        return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.'+interval));
      }
      catch (e)
      {
        return e.message;
      }
  }
  var  cWan=function(num){
    var orderNum=num;
    if(num>10000){
        orderNum=Number(num/10000).toFixed(1)+"万"
      }
      return orderNum;
  }
  var analyzParams = function(param_name) {
        var url = window.location.search.split("?")[1];
        if (url == "" || url==undefined) return url;
        url = url.split(param_name + "=")[1];
        if (url == "" || url == undefined) {
            url = "";
            return url;
        }
        if (url.indexOf("&") >= 0) {
            url = url.split("&")[0];
        }
        return url;
    }

var app_jump=function(){
     var params = {
        "live_id":analyzParams("id"),
        "iframe_type":$("#tvStatus").attr("iframe_type"),
        "is_erect":$("#tvStatus").attr("is_erect"),
        "is_mobile":$("#tvStatus").attr("is_mobile"),
        "status":$("#tvStatus").attr("status"),
        "user_id":$("#tvStatus").attr("user_id"),
        "title":$("#tvStatus").attr("title"),
      };
      if($("#tvStatus").attr("status")!=2){
        openApp_obj('live', params);
      }else{
        openApp_obj('replay', params);
      }
 }
 var initDom=function(resultData){
   
    if(resultData.data!=undefined || resultData.data!=null || resultData.data!=""){
      var data=resultData.data;
      /*2016-12-23 
      **add advertisement
      */
      var ad=data.advertisements;
      if(ad!=undefined && ad.length>0){
        var adHtml="<a href='"+ad[0].url+"'><img src='"+ad[0].cover+"' /></a>";
        $(".ad_area").html(adHtml);
        $(".ad_area_main").show();
      }
      //roles
      if(data.user.roles.length>0){
        $(".live_tabs").find("img.icon_roles").attr("src","assets/images/roles/roles_"+data.user.roles[0]+".png")
        $(".live_tabs").find("img.icon_roles").show();
      }
      $("#watchNum").html(commonCla.cWan(data.watch_num));
      $("#coinsNum").html(commonCla.cWan(data.coins));


      $(".desc_part2").show();
      $("#tvStatus").attr("status",data.status);
      $("#tvStatus").attr("user_id",data.user_id);
      $("#tvStatus").attr("is_mobile",data.is_mobile);
      $("#tvStatus").attr("is_erect",data.is_erect);
      $("#tvStatus").attr("iframe_type",data.iframe_type);
      $("#tvStatus").attr("title",data.title);

      $("#tvStatus").attr("hls",data.pull_hls);
      $("#tvStatus").attr("cover",data.cover);
      $("#tvStatus").attr("online_num",data.online_num);
      $(".vedio_title img").css("opacity","0.1");
      $(".live_time").hide();
      if(data.status==-1){
         $(".vedio_title").show();
         $(".vedio_title h1").show();
         $(".vedio_title h1").html("即将开始");
         $(".video").hide();
      }else if(data.status==0){
          $(".vedio_title").show();
          $(".desc_part1").show();
          $(".vedio_title h1").show();
          $("#countdown").hide();
          $(".count_tit").hide();
          $(".video").hide();
          $(".vedio_title h1").html("<span style='color:#d62038'>直播结束</span");
          if(data.iframe_type!=0){
           $(".liveRadioTab").hide();
           $("#con1").hide();
           $("#con2").show();
        }else{
          $("#con1").show();
          $("#con2").hide();
        }

        $("#coinsNum").html(commonCla.cWan(data.coins));
     }else if(data.status==1){
      //直播中
        if(data.iframe_type!=0){
           $("#player").html(data.iframe_code);
           $(".liveRadioTab").show();
           $("#con1").hide();
           $("#con2").show();
        }else{
          //初始化播放器
          initPlayer("player",data.pull_hls,data.cover,data.is_erect);
          /*player = new CloudLivePlayer();
          //activityId 请换成自己设置的获得id
          player.init({url:data.pull_hls,posterType:3,pic:data.cover,auto_play:0,auto_size:1},"player");*/
          $(".liveRadioTab").show();
          $("#con1").show();
          $("#con2").hide();
        }
          $(".video").show();    
          $(".vedio_title").hide();
          $(".desc_part1").show();
          $("#watchNum").html(commonCla.cWan(data.online_num));
          $(".live_time").show();
          //直播时间
          var GoLive = window.setInterval(function () {
            var bTime=resultData.data.created_at.replace(/-/g,"/")
            var eTime=resultData.current_time.replace(/-/g,"/");
            timeCounter(bTime,eTime,"live_time");
          },1000)
      }else if(data.status=="3"){
        //预热
          if(data.cover_video!=""){
            $(".vedio_title").hide();
            $(".video").show(); 
            initReplayer("player",data.cover_video,data.cover,data.is_erect);
           /*player = new CloudVodPlayer();data.cover_video
           player.init({url:data.cover_video,posterType:2,pic:data.cover,auto_play:0,autoSize:1},"player");
*/
          }else{
            $(".count_tit").show();
            $(".video").hide(); 
	          $(".vedio_title img").css("opacity","1")
          }
          $(".countdown").show();
          $(".desc_part1").hide();
         // $(".liveRadioTab").hide();
          $("#con1").show();
          $("#con2").hide();
          initJcountdown(resultData.current_time.replace(/-/g,"/"),data.created_at.replace(/-/g,"/"),"countdown");
          
         
      }else{
        $(".video").show();
        $(".vedio_title").hide();
        $("#btn_spotlight").show();
        $(".redPaper").hide();
        $(".live_watch").hide();
        if(data.replay_url!=null && data.replay_url!=""){
           initReplayer("player",data.replay_url,data.cover,data.is_erect);
        }else{
           /*player = new CloudVodPlayer();
           player.init({uu:"nnakh40hbq",vu:data.vuid,posterType:2,pic:data.cover,auto_play:0,autoSize:1,pu:"1655aeb1f1"},"player");*/
        }

        $(".desc_part2").hide();
        $(".liveRadioTab li").removeClass("cur");
        $(".liveRadioTab").find("li").eq(2).addClass("cur");
        $("#con1").show();
        $("#con2").hide();
        $("#con3").hide();

        //看点初始化
        initSpotLight(resultData);
      }
      //$("#js-msgList").html("");
      var cTime=resultData.current_time.split(" ")[1].substr(0,5);
      var tip='<li><div class="time"><img src="assets/images/dian.png">'+
      ' <span class="col_red">'+cTime+'</span></div><div class="msg_content">'+
      '<span class="col_blue">系统消息</span> '+
      '<div class="">我们提倡绿色直播，直播内容含吸烟、低俗、引诱、暴露等都将被屏蔽或封停账号，网警24小时在线巡查哦!</div></div></li>'
     $("#js-msgList").prepend(tip);
      $(".vedio_title img").attr("src",data.cover);
      var watch_num=data.watch_num;
      if(data.watch_num>10000){
        watch_num=Number(data.watch_num/10000).toFixed(1)+"万"
      }
      $("#seeNum").html(watch_num+"次观看");
      
      /*$(".tv-title").html(data.title);*/
      $(document).attr("title",data.title);
      $(".user_move .head_pic").attr("src",data.user.head_pic);
      $(".user_info .head_pic").attr("src",data.user.head_pic);

      $(".type-pic img").attr("src",data.user.head_pic);
      $(".type-pic img").attr("uid",data.user.id);
      $(".type-desc-main").html(data.user.name);
      var orderNum=data.watch_num;
      if(data.user.followers_count>10000){
        orderNum=Number(data.user.followers_count/10000).toFixed(1)+"万"
      }
      $("#orderNum").html(orderNum);

      var follow_status="";
      if(data.user.follow_status==0){
       follow_status="关注+";
      }else if(data.user.follow_status==1 || data.user.follow_status==2){
       follow_status="已关注";
      }else if(data.user.follow_status==3){
       follow_status="互相关注";
      }
      $(".toAppConcern a").html(follow_status);

      var id=analyzParams("id")==undefined?"":analyzParams("id");
      if($("#isShare").attr("isShare")=="true"){
        var unlike=localStorage.getItem("unlike"+id);
      }else{
        var unlike=data.is_like;
      }
      
      if(unlike==0){
         $("#btn-zan").attr("src","assets/images/icon-like.png");
       }else{
         $("#btn-zan").attr("src","assets/images/icon-like-red.png");
       }
        $("#btn-zan").attr("zan",data.like_num);
      if(data.like_num>0){
        $("#btn-zan").next("#like_num").html(data.like_num);
        $("#btn-zan").next("#like_num").show();
	      $("#zanArea").css("margin-right",data.like_num.length*6+"px")
	
      }
      conversation_id=data.conversation_id;
      //获取时间差
      if(resultData.data.status==3 || resultData.data.status==1|| resultData.data.status==-1){
        //预热
        var endTime=data.end_time==null?resultData.current_time:data.end_time;
        var timeDiff=dateDiff('T', data.created_at,endTime);
       }else{
        var endTime=data.end_time==null?data.created_at:data.end_time;
        var timeDiff=dateDiff('T', endTime,resultData.current_time);
       }  
      var timeHtml="";
      var sTime=timeDiff/1000;
      var timeMark="";
      if(sTime<0){
        sTime=-sTime;
        timeMark="后";
      }else if(resultData.data.status==2){
        timeMark="前";
      }
      if(sTime<60){
          timeHtml=sTime+"秒"+timeMark
      }else if(sTime>=60 && sTime<3600){
          timeHtml=Math.round(sTime/60)+"分钟"+sTime%60+"秒"+timeMark
      }else if(sTime>=3600){
          timeHtml=(sTime/3600).toFixed(1)+"小时"+timeMark
      	  if(sTime/3600/24>=1){
      	    timeHtml=parseInt(sTime/3600/24)+"天"+timeMark
      	  }
          if(sTime/3600/24/30>=1){
            timeHtml=parseInt(sTime/3600/24/30)+"月"+timeMark
          }
          if(sTime/3600/24/30/12>=1){
            timeHtml=parseInt(sTime/3600/24/30/12)+"年"+timeMark
          }
        }
      $("#tit_desc_info").html(timeHtml+"&nbsp;"+data.city);
  
      
    }
     //share info 
    $("#share_info").attr("content","时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！");
    $("#share_info").attr("cover",data.cover);
    if(data.is_erect=="1"){
       var share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+data.id;
    }else{
      if(data.iframe_type!=0){
       var share_url=commonCla.shareUrlBase+"/starshow5.0/live/share.html?id="+data.id;
      }else{
        var share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+data.id;
      }
       
    }
    $("#share_info").attr("shareUrl",share_url);
    $("#share_info").attr("title",data.title);
    //stars
    if(data.stars.length<=0){
     $(".star_info").hide();
     $(".icon_info").css("left","10px");
     $(".staffList").css("left","50px");
     $(".staffList").css("width","82%");
     $(".live_info").show();
    }else{
     $(".star_info").show();
     $(".icon_info").css("left","34%");
     $(".staffList").css("left","50%");
     $(".staffList").css("width","50%");
     $(".live_info").show();
     //初始化明星
     var starsHtml="";
     for (var i = 0; i < data.stars.length; i++) {
       starsHtml+='<li>'+
                  '<img src="'+data.stars[i].head_pic+'" class="head_pic fl"/>'+
                  '<div class="fl star_desc">'+
                  '<p>本档明星</p>'+
                  '<span class="star_name" nowrap style="white-space:nowrap;word-break:nowrap">'+(data.stars[i].name).substr(0,4)+'</span>'+
                  '</div>'+
                  ' </li>'
     };
     $(".star_info ul").append(starsHtml);
    
    }
    var staffList=data.dakas;
    var staffHtml="";
    var staffName="";
    if(data.dakas.length<=0){
       $(".icon_info").hide();$(".staffList").hide();
    }else{
       for (var i = 0; i < staffList.length; i++) {
        /*staffHtml+='<li uid="'+staffList[i].id+'">'+
                '<img src="'+staffList[i].head_pic+'"  class="head_pic"/>'+
               ' <p class="staff_name">'+staffList[i].name+'</p>'+
              '</li>'*/
              staffName=staffList[i].name.length<=4?staffList[i].name:staffList[i].name.substr(0,3)+'…';
              staffHtml+='<li uid="'+staffList[i].id+'"> '+
                '<div class="box viewport-flip" title="">'+
                   '<img class="list head_pic animated" src="'+staffList[i].head_pic+'" />'+
                  ' <div class="list back animated none">'+staffList[i].list_name+'</div>'+
                '</div>'+
               ' <p class="staff_name">'+staffName+'</p>'+
              '</li>'
      };
      $(".staffList ul").append(staffHtml);
    }
    if(data.dakas.length<=0 && data.stars.length<=0){
    $(".live_info").hide();
    }
    if(resultData.data.is_mobile==0 && resultData.data.presenter.length>0){
        //初始化im
	     $(".liveRadioTab li").eq(2).show();
    }else{
      $(".liveRadioTab li").removeClass("cur");
      $(".liveRadioTab li").eq(1).addClass("cur");
      $(".tabCons").hide();
      $("#con2").show();
      if(resultData.data.is_mobile==0){
        $("#con2").removeClass("mobileLive");
      }else{
        $("#con2").addClass("mobileLive");
      }
     
    }
    initLeanCloud(resultData.data.is_mobile,resultData);
    //initLeanCloud(0,resultData);
    
 }
 var initDom2=function(resultData){
    resultData=resultData.data;
    if(resultData.top3!=undefined || resultData.top3!=null || resultData.top3!="" || resultData.top3.length>0){
      var lihtml="";
      for(var i=0;i<resultData.top3.length;i++){
         lihtml+="<li class='head-pic'>"+
          "<img src='"+resultData.top3[i].head_pic+"'>"+
          "<div class='markclown'><img src='assets/images/crown"+Number(i+1)+".png'></div>"+
          "</li>";
      }
      $(".desc_part2").html(lihtml);
    }
 }
 var initDom3=function(resultData){
    /*resultData=resultData.data;*/
    if(resultData.top3!=undefined || resultData.top3!=null || resultData.top3!="" || resultData.top3.length>0){
      var lihtml="";
      for(var i=0;i<resultData.data.length;i++){
        var share_url="";
        v_status="<span class='vstatus'>预热</span>"
        if(resultData.data[i].status==-1 || resultData.data[i].status==3){
          v_status="<span class='vstatus'>直播预告</span>"
        }else if(resultData.data[i].status==2 || resultData.data[i].status==0){
           v_status="";
        }else{
          v_status="<span class='vstatus'>直播中</span>"
        }
        if($("#isShare").attr("isShare")=="true"){
          if(resultData.data[i].is_erect=="1"){
             //share_url="http://testshare.xingxiu.tv/starshow5.0/liveVertical/share.html?id="+resultData.data[i].id
            share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+resultData.data[i].id
          }else{
             //share_url="http://testshare.xingxiu.tv/starshow5.0/live2.0/share.html?id="+resultData.data[i].id
            if(resultData.data[i].iframe_type!="0"){
              share_url=commonCla.shareUrlBase+"/starshow5.0/live/share.html?id="+resultData.data[i].id
            }else{
              share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+resultData.data[i].id
            }
            
          }
         
          if(analyzParams("id")!=resultData.data[i].id){
             lihtml+="<li><a href='"+share_url+"'>"
                  +"<div class='vedioCover'><img src='"+resultData.data[i].cover+"'/>"+v_status+"</div>"
                  +"<div class='vedioDesc'>"
                  +"<h2>"+resultData.data[i].title+"</h2>"
                  +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+cWan(resultData.data[i].watch_num)+"</span></li>"
                  +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+cWan(resultData.data[i].like_num)+"</span></li></ul>"
                  +"</div></a></li>";
          }
          
        }else{
          if(analyzParams("id")!=resultData.data[i].id){
           lihtml+="<li viframe_type='"+resultData.data[i].iframe_type+"' verect='"+resultData.data[i].is_erect+"' vid='"+resultData.data[i].id+"' vstatus='"+resultData.data[i].status+"'>"
                  +"<div class='vedioCover'><img src='"+resultData.data[i].cover+"'/>"+v_status+" </div>"
                  +"<div class='vedioDesc'>"
                  +"<h2>"+resultData.data[i].title+"</h2>"
                  +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+cWan(resultData.data[i].watch_num)+"</span></li>"
                  +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+cWan(resultData.data[i].like_num)+"</span></li></ul>"
                  +"</div></li>";
          }
        }
         
         
      }
      $(".vedioList").html(lihtml);
    }
 }
 var getLivePageData=function(){
    var id=analyzParams("id")==undefined?"":analyzParams("id");
    var url=host+"/live/"+id+"?jwt_token="+get_token();
    ajaxCommonFun(url,"get",function(resultData){
      if(resultData!=null && resultData !=""){
        if(resultData.code=="200"){
          initDom(resultData);
          if($("#isShare").attr("isShare")=="true"){
          //二次分享
                wx_share($("#share_info").attr("title"),$("#share_info").attr("content"),$("#share_info").attr("shareUrl"),$("#share_info").attr("cover"))
              }
          //执行
          var Go = window.setInterval(function () {
            var bTime=resultData.current_time.replace(/-/g,"/");
            var eTime=resultData.data.created_at.replace(/-/g,"/")
            initJcountdown(bTime,eTime,"countdown");
            animateSh($(".staffList li").eq(0));
          },60000)
          if($(".live_info").css("display")!="none" && $(".live_info")!=undefined){
            $t=setInterval('AutoScroll(".star_info")',3000)//轮换间隔，单位毫秒，下同 
          }
    
        }else{
         if(resultData.code=="404"){
        	  $("body").css("background","#f3f3f3")
        	  $("body").html("<img src='assets/images/404.png' width='100%' />")
        	 }
          return;
        }
        //展示
          setTimeout(function(){
            $(".user_move").addClass("animated bounceOutLeft");
            $(".user_info").addClass("animated bounceInLeft");
             
          },1000);
      }
       $(".liveRadioMain").show();
       $(".news_nav").show();
       $(".loadding").hide();
       
    })
    var url2=host+"/live/"+id+"/liverAccount";
    ajaxCommonFun(url2,"get",function(resultData){
      if(resultData!=null && resultData !=""){
        if(resultData.code=="200"){
          initDom2(resultData);
        }else{
          //alert(resultData.error);
        }
      }
    })
    var uid=$(".type-pic img").attr("uid");
    /*var url3=host+"/user/"+uid+"/lives";*/
    var id3=analyzParams("id")==undefined?"":analyzParams("id");
    var url3=host+"/live/"+id3+"/liveRecommend"
    ajaxCommonFun(url3,"get",function(resultData){
      if(resultData!=null && resultData !=""){
        if(resultData.code=="200"){
          initDom3(resultData);
        }else{
          //alert(resultData.error);
        }
      }
    })

     

  }
 var initLivePage=function(){
  //localstorage unlike 赋值
  var id=analyzParams("id")==undefined?"":analyzParams("id");
  var storage = window.localStorage;
  /*if (!storage.getItem("unlike"+id)) */
  storage.setItem("unlike"+id,0);
  //切换选项
     $(".liveRadioTab li").click(function(){
        $(".liveRadioTab li").removeClass("cur");
        $(this).addClass("cur");
        var index=$(this).attr("num");
        $(".tabCons").hide();
        $("#con"+index).show();
        
        
     })
     //toMsgArea
     $(".toMsgArea").click(function(){
      $(".dialogFooter").show();
       tcc.BOX_show("messdiv");
       $(".messdivCons").html("确认下载星秀APP");
     })
     $(".js-close").click(function(){
       tcc.BOX_remove("messdiv");
     })
     $("#btn_cancel").click(function(){
       tcc.BOX_remove("messdiv");
     })
     //放大图片
  $(".tabsMain").on("click",".imgList p img",function(){
    var imgs=$(".tabsMain .imgList p img");
    var imgLength=$(".bigImgcon .swiper-slide").length;
    //初始化图片
    var imgsHtml="";
    for (var i = 0; i < imgs.length; i++) {
      var url=$(imgs[i]).attr("src").split("!250x250")[0];  
      imgsHtml+='<div class="swiper-slide"><img src="'+url+'!750x0" width="100%"/></div>'
      if($(imgs[i]).attr("src")==$(this).attr("src")){
        $("#js-msgList").attr("curId",i);
      }

     $(".bigImgcon #js_imgList").html(imgsHtml);
    }
    $(".liveRadioMain").hide();
    $(".news_nav").hide();
    $(".bigImgcon").show();


      mySwiper = new Swiper ('.swiper-container', {
      initialSlide :$("#js-msgList").attr("curId"),
      preventClicks:false,
      loop:false,
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      /*onTransitionEnd: function(swiper){
        var curSrc=$(".swiper-slide-active img").attr("src").split("!750x0")[0];
        $("#js-btnDown a").attr("href",curSrc);
      }*/
    })
    
  })
    //关闭大图
    $(".bigImg_tit").click(function(){
      $(".liveRadioMain").show();
      $(".news_nav").show();
      $(".bigImgcon").hide();
       mySwiper.destroy(true,true);
    })
     getLivePageData();
    //打开app
    $(".txtMsg").click(function(){
       app_jump();
      })
      $(".open_app").click(function(){
        app_jump();
      }) 
     $(".app_link").click(function() {
      app_jump();
     });
    
     
  }

  var initSpotLight=function(ret){
    var spotHtml="";
    /*var spotHtml="<li><span class='spot_times'>10:09:99</span><span class='spot_title'>进场</span></li>";*/
    if(ret.data.foci.length>0){
      var spotList=ret.data.foci;
     for (var i = 0; i < spotList.length; i++) {
      spotHtml+="<li><span class='spot_times'>"+ spotList[i].focus_time+
                "</span><span class='spot_title'>"+spotList[i].title+"</span></li>"
      
     };
    }else{
      spotHtml="<div class='noData'>暂无看点</div>";
    }
    $(".spotList").html(spotHtml);
  }
  //leanCloud 
  var initImgArr=function(imglist){
    var imgsHtml="";
    imglist=eval(imglist);
    if(imglist!=undefined && imglist.length>0){
         var imgs="";var list_type="";
         var imgArrLength=imglist.length;
         /*var imgArrLength=imglist.length>4?4:imglist.length;*/
         for (var i = 0; i < imgArrLength; i++) { 
          imgs+='<p><img src="'+imglist[i]+'"/></p>'
           /*if(i<3){
             imgs+='<p><img src="'+imglist[i]+'!250x250"/></p>'
           }else{
            if(imglist.length>4){
            imgs+='<p class="lastPage"><img src="'+imglist[i]+'!250x250"/><span>共'+imglist.length+'张</span></p>'
            }else{
            imgs+='<p><img src="'+imglist[i]+'!250x250"/></p>'
            }
             
           }*/
         };
         var typeNum=imgArrLength>4?5:imglist.length;
         var w_length=imglist.length*90;
         var is_more="";
         if(imglist.length>4){
           imgsHtml='<div class="imgList type_more"><div style="width:'+w_length+'px" class="type'+typeNum+'">'+imgs+'</div></div>'
         }else{
          imgsHtml='<div class="imgList type'+typeNum+'">'+imgs+'</div>'
         }
        
    }
    return imgsHtml;
  }
var counteExper=function(experience){
     var imgSrc="assets/images/roles_normal_star.png";
     var star=experience/100;
     var moon=star/100;
     var sun=moon/100;
     var crown=sun/100;
     if(star>=1 && moon<1 && sun<1){
      imgSrc="assets/images/roles/roles_normal_star.png";
     }else if(moon>=1 && sun<1){
      imgSrc="assets/images/roles/roles_normal_moon.png";
    }else if(sun>=1 && crown<1){
      imgSrc="assets/images/roles/roles_normal_sun.png";
    }else if(crown>=1){
      imgSrc="assets/images/roles/roles_normal_huangguan.png";
    }
    return imgSrc;
}
var initPresenter=function(ret,loadType){
  var msgContent="";
  var msgList=ret.data.page_data;
  var msgCon=$("<div></div>");

  var current_count=$("#js-masterMsg li").length;
  if(ret.data.total<=10){
    $("#btn_more_master").hide();
  }else{
    if(ret.data.total>Number(current_count+10)){
     $("#btn_more_master").show();
    }else{
      $("#btn_more_master").hide();
    }
  }
  for (var i = 0; i < msgList.length; i++) {
    var msg=msgList[i].content;
    if(msg.type==2){
      msgContent=msg.msg+"<img src='assets/images/icon-like-red.png' width='15' />"
    }else if(msg.type==4){
        msgContent=msg.msg+"<img src='"+msg.gift_pic+"' width='25' />"
    }else{
      msgContent=msg.msg;
    }
    //回复内容
    var replyCon="";

    var imgList=initImgArr(msg.imageArr);
    var replyImgList=initImgArr(msg.reply_imageArr);

    if(msg.reply_user_id!=undefined && msg.reply_user_id!=""){
      replyCon='<div class="reply">'+
                '<div class="reply_tit"><span class="fl reply_name">'+
                msg.reply_user_name+'</span>'+
                '<span class="fr">'+msg.reply_send_time+'</span>'+
                '</div>'+
                '<p>'+msg.reply_msg+'</p>'+replyImgList+
                '</div>';
    }
    //-----
    if(msg.type!=7 && msg.type!=8 && msg.type!=9 && msg.type!=10){
      var cur_times=msg.send_time.split(" ")[1].substr(0,msg.send_time.split(" ")[1].length-3);
      var lihtml='<li><div class="time"><img src="assets/images/dian.png"> <span class="col_red">'+cur_times+'</span></div>'+
                        '<div class="msg_content"><span class="col_blue">'+msg.user_name+'</span>'+
                       ' <div class="">'+msgContent+'</div>'+imgList+replyCon+'</div>'
                    '</li>'
      msgCon.append(lihtml);
     
     
    }
    //end
  };
  if(loadType!=undefined){
     $("#js-masterMsg").append(msgCon.html());
   }else{
      $("#js-masterMsg").prepend(msgCon.html());
  }
  
}
var getPresenter=function(loadType){
  var id=commonCla.analyzParams("id");
  var current_count=$("#js-masterMsg li").length>=10?$("#js-masterMsg li").length:0;
  var url=host+"/live/"+id+"/presenterRecord?current_count="+current_count;
  commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      initPresenter(ret,loadType);
      $(this).html("点击加载更多");
    }

  })
}
var leanCloudCon=function(type,msg,resultData,loadType){
  var lihtmls="";var lihtml="";
  //手机直播
  if(type!=0){
         var msgContent="";
          if(msg._lcattrs.type==2){
              msgContent=msg._lcattrs.msg+"<img src='assets/images/icon-like-red.png' width='15' />"
          }else if(msg._lcattrs.type==4){
              msgContent=msg._lcattrs.msg+"<img src='"+msg._lcattrs.gift_pic+"' width='25' />"
          }else{
            msgContent=msg._lcattrs.msg;
          }
          if(msg._lcattrs.type!=7 && msg._lcattrs.type!=8 && msg._lcattrs.type!=9 && msg._lcattrs.type!=10){
            var img_roles="";
            if(msg._lcattrs.user_experience!=undefined || msg._lcattrs.user_experience!=null){
              img_roles="<img src='"+counteExper(msg._lcattrs.user_experience)+"' height='12' width='12' class='icon_roles' >"
            }
             lihtml="<li> <div class='head_pic fl'><img src='"+
                   msg._lcattrs.user_icon+"'/>"+img_roles+"</div><div class='fl msgArea'>"+
                   "<img src='assets/images/icon-msgBg.png' class='icon-msg' /><span class='col_red'>"+
                   msg._lcattrs.user_name+"：</span>"+msgContent+"</div></li>"
             /*if(loadType!=undefined){
              $("#js-msgList").append(lihtml);
             }else{
              $("#js-msgList").prepend(lihtml);
             }*/
             lihtmls=lihtml;
          }
  }else{
        //设备直播
          var msgContent="";
          if(msg._lcattrs.type==2){
              msgContent=msg._lcattrs.msg+"<img src='assets/images/icon-like-red.png' width='15' />"
          }else if(msg._lcattrs.type==4){
              msgContent=msg._lcattrs.msg+"<img src='"+msg._lcattrs.gift_pic+"' width='25' />"
          }else{
            msgContent=msg._lcattrs.msg;
          }
          //回复内容
          var replyCon="";

          var imgList=initImgArr(msg._lcattrs.imageArr);
          var replyImgList=initImgArr(msg._lcattrs.reply_imageArr);

          if(msg._lcattrs.reply_user_id!=undefined && msg._lcattrs.reply_user_id!=""){
            replyCon='<div class="reply">'+
                      '<div class="reply_tit"><span class="fl reply_name">'+
                      msg._lcattrs.reply_user_name+'</span>'+
                      '<span class="fr">'+msg._lcattrs.reply_send_time+'</span>'+
                      '</div>'+
                      '<p>'+msg._lcattrs.reply_msg+'</p>'+replyImgList+
                      '</div>';
          }
          //-----
          if(msg._lcattrs.type!=7 && msg._lcattrs.type!=8 && msg._lcattrs.type!=9 && msg._lcattrs.type!=10){
            var hours=msg.timestamp.getHours()<10?"0"+msg.timestamp.getHours():msg.timestamp.getHours();
            var minutes=msg.timestamp.getMinutes()<10?"0"+msg.timestamp.getMinutes():msg.timestamp.getMinutes();
            var cur_times=hours+":"+minutes;
            lihtml='<li><div class="time"><img src="assets/images/dian.png"> <span class="col_red">'+cur_times+'</span></div>'+
                              '<div class="msg_content"><span class="col_blue">'+msg._lcattrs.user_name+'</span>'+
                             ' <div class="">'+msgContent+'</div>'+imgList+
                           '<!--<div class="reply">'+
                            '<div class="reply_tit"><span class="fl reply_name">主持人：测试</span>'+
                            '<span class="fr">16:98</span>'+
                            '</div>'+
                            '<p>测试测试</p>'+
                            '<div class="imgList type4"><p><img src="assets/images/vedioPoster.png"/></p>'+
                            '<p><img src="assets/images/vedioPoster.png"/></p><p><img src="assets/images/vedioPoster.png"/></p><p class="lastPage"><img src="assets/images/vedioPoster.png"/><span>共5张</span></p></div>'+
                            '</div>-->'+replyCon+'</div>'
                          '</li>'
           /*if(loadType!=undefined){
            $("#js-msgList").append(lihtml);
           }else{
            $("#js-msgList").prepend(lihtml);
           }*/

           
           //对比主持人
            /*var presenter="";
            if(resultData.data.presenter[0]!=undefined){
                presenter=resultData.data.presenter[0].id;
            }
            if(presenter==msg._lcattrs.user_id){
              $("#js-masterMsg").prepend(lihtml);
             
            }*/
           lihtmls=lihtml;
          }

  }
  return lihtmls;
}
  var countPlayTime=function(create_at,interval){
     var create_at = new Date(Date.parse(create_at.replace(/-/g, '/')));
     //m or mm
     var videoTime=player.sdk.getVideoTime();
     var bTime=new Date(create_at.setTime(create_at.getTime() + videoTime));
     var eTime=new Date(create_at.setTime(create_at.getTime() + videoTime+interval));
     var times={
      "bTime":bTime,
      "eTime":eTime
     }
     return times;
     //var afterTime=new Date(new Date(resultData.created_at).getTime()+60000);
    /* var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));*/
  }

  function initLeanCloud(type,resultData){

  	var status= $("#tvStatus").attr("status");
  	var hls= $("#tvStatus").attr("hls");
  	var cover= $("#tvStatus").attr("cover");
  	var online_num= $("#tvStatus").attr("online_num");

    if(typeof AV == "undefined"){return false}
    var Realtime = AV.Realtime;
    var realtime = new Realtime({
      appId: 'xnl1ky594B4KY5CuIaoA1BzW-gzGzoHsz',
      region: 'cn', // 美国节点为 "us"
    });
    realtime.createIMClient('Tom').then(function(tom) {
    return tom.getConversation(conversation_id);
    }).then(function(conversation) {
      if(resultData.data.status!=1 &&　resultData.data.status!=3){
      /*根据时间*/
      /*var playertime=countPlayTime(resultData.data.created_at,60000);
      var beforeTime=playertime.eTime;
      var afterTime=playertime.bTime
      //alert(beforeTime+"beforeTime"+afterTime+"/"+player.sdk.getVideoTime())
      
          conversation.queryMessages({
            limit:500, // limit 取值范围 1~1000，默认 20
            beforeTime:beforeTime,
            afterTime:afterTime
          }).then(function(messages) {
            for (var i = 0; i < messages.length; i++) { 
              leanCloudCon(type,messages[i],resultData)

              console.log(messages[i]._lcattrs.type+"/"+messages[i]._lcattrs.msg);
              console.log('Message received: ' + JSON.stringify(messages[i]));
            };
            

          }).catch(console.error.bind(console));*/
          
         /* var msgHistory=setInterval(function(){
            $("$js-msgList").html("");
            messageIterator.next().then(function(result) {
            if(!result.done){
                for (var i = 0; i < result.value.length; i++) {
                  leanCloudCon(type,result.value[i],resultData);
                };
             }else{
              clearInterval(msgHistory);
             }
            });
          },60000)*/

        /*type2 点击加载更多*/
        /*result: {
            value: [message1, ..., message10],
            done: false,
        }*/
         var messageIterator = conversation.createMessagesIterator({ limit:100 });
         $("#btn_more").show();
         var lihtml="";
          var msgCon=$("<div></div>")
          messageIterator.next().then(function(result) {
            for (var i = 0; i < result.value.length; i++) {
                  //lihtml+=leanCloudCon(type,result.value[i],resultData);
                  $(msgCon).prepend(leanCloudCon(type,result.value[i],resultData,"append"))
                  if(result.done){
                    $("#btn_more").hide();
                  }
             }
              $("#js-msgList").prepend($(msgCon).html());
          });
          
          $("#btn_more").click(function(){
            $(this).html("<img src='assets/images/loadding2.gif' style='width:15px;'/>")
            messageIterator.next().then(function(result) {
                 var msgCon=$("<div></div>")
                for (var i = 0; i < result.value.length; i++) {
                  //leanCloudCon(type,result.value[i],resultData,"append");
                  //lihtml+=leanCloudCon(type,result.value[i],resultData,"append");
                  $(msgCon).prepend(leanCloudCon(type,result.value[i],resultData,"append"))
                  if(result.done){
                    $("#btn_more").hide();
                  }
                  /* console.log(result.value[i]._lcattrs.type+"/"+result.value[i]._lcattrs.msg);
                   console.log('Message received: ' + JSON.stringify(result.value[i]));*/
                };
                 $("#js-msgList").append($(msgCon).html());
                 $("#btn_more").html("点击加载更多")
            });
          })

         /*$(window).scroll(function() {
            //当内容滚动到底部时加载新的内容
            if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop() > 150) {
              //当前要加载的页码
              messageIterator.next().then(function(result) { 
              if(!result.done){
                  for (var i = 0; i < result.value.length; i++) {
                    leanCloudCon(type,result.value[i],resultData,"append");
                  };
               }
              });
            }
          });*/
      }
      
     if(resultData.data.status==1 || resultData.data.status==3){
        conversation.queryMessages({
          limit: 20, // limit 取值范围 1~1000，默认 20
        }).then(function(messages) {
          // 最新的十条消息，按时间增序排列
          //alert(JSON.stringify(messages));
          var lihtml="";
          var msgCon=$("<div></div>")
          for (var i = 0; i < messages.length; i++) { 
            //leanCloudCon(type,messages[i],resultData)
            //lihtml+=leanCloudCon(type,messages[i],resultData);
           
            
            //对比支持人
            var presenter="";
            if(resultData.data.presenter[0]!=undefined){
                presenter=resultData.data.presenter[0].id;
            }
            if(presenter==messages[i]._lcattrs.user_id){
              //$("#js-masterMsg").prepend(leanCloudCon(type,messages[i],resultData));
             
            }else{
             //$(msgCon).prepend(leanCloudCon(type,messages[i],resultData));
             // $("#js-msgList").prepend(msgCon.html());
            }

          /*console.log(messages[i]._lcattrs.type+"/"+messages[i]._lcattrs.msg);
          console.log('Message received: ' + JSON.stringify(messages[i]));*/
          };
          
          

        }).catch(console.error.bind(console));
        conversation.on('message', function(message, conversation) {
          //alert(JSON.stringify(message))
          //leanCloudCon(type,message,resultData);
          var lihtml=leanCloudCon(type,message,resultData)
          
          //对比支持人
            var presenter="";
            if(resultData.data.presenter[0]!=undefined){
                presenter=resultData.data.presenter[0].id;
            }
            if(presenter==message._lcattrs.user_id){
              $("#js-masterMsg").prepend(lihtml);
             
            }else{
              $("#js-msgList").prepend(lihtml);
            }

          //开直播
          if(message._lcattrs.type==8){
            if($("#countdown").css("display")=="block"){
              $("#countdown").hide();
                  if(status==-1 || status==3){
                     reloadPage()
                  } 
             }
               
           }
           //直播结束
           
          if(message._lcattrs.type==10){
            if($("#countdown").css("display")=="block"){
              $("#countdown").hide();
              
             }
              $(".video").hide();
              $(".vedio_title").show();
              $(".vedio_title h1").html("直播结束");
               
           }

          /*console.log(message._lcattrs.type+"/"+message._lcattrs.msg);
          console.log('Message received: ' + JSON.stringify(message));*/
        });
     }
      return conversation.join();
    }).then(function(conversation) {
      console.log('加入成功', conversation.members);
      // 加入成功 ['Bob', 'Harry', 'William', 'Tom']
    }).catch(console.error.bind(console));
  }
  
//leanCloud end
//function reload
function reloadPage(){
  var status= $("#tvStatus").attr("status");
  var hls= $("#tvStatus").attr("hls");
  var cover= $("#tvStatus").attr("cover");
  var online_num= $("#tvStatus").attr("online_num");
  $(".vedio_title").hide();
  $(".video").show();  
  $(".video-js").attr("poster",cover);
  $(".video-js source").attr("type","application/x-mpegURL");
  $(".video-js source").attr("src",hls);
  var myPlayer =  videojs("tvLive");  //初始化视频
  myPlayer.src(hls);  //重置video的src
  myPlayer.load(hls);  //使video重新加载
  $("#countdown").hide();
  $(".liveRadioTab").show();
  $("#con1").show();
  $("#con2").hide();
  $("#tvStatus").attr("status","1");
  $(".desc_part1").html('<span id="watchNum">'+online_num+'</span>人在看');
  $(".desc_part1").show();
}
//autoscroll
function AutoScroll(obj){
 if($(obj).find("ul:first li").length<2){
  window.clearInterval($t); //清楚定时器
  return;
  }
 $(obj).find("ul:first").animate({ 
    marginTop:"-4rem"//和上面的height一致 
     },800,function(){ 
    $(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
     }); 
 } 
var timeCounter=function(currentTime,endTime,containerId){
    var EndTime= new Date(endTime);
    var NowTime = new Date(currentTime);
    if(t=="") t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
      h=h<10?"0"+h:h;
      m=m<10?"0"+m:m;
      s=s<10?"0"+s:s;
    }
    var formatDate= "<span>"+h+"</span>:"
                    +"<span>"+m+"</span>:"
                    +"<span>"+s+"</span>"
    var status= $("#tvStatus").attr("status");
    $("#"+containerId).html(formatDate) ;
    t=t+1000;
}
var initJcountdown=function(currentTime,endTime,containerId){
    var EndTime= new Date(endTime);
    var NowTime = new Date(currentTime);
    if(t=="") t =EndTime.getTime() - NowTime.getTime();
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
    var formatDate="精彩倒计时：<span>"+d+"</span>天"
                    +"<span>"+h+"</span>时"
                    +"<span>"+m+"</span>分"
    var status= $("#tvStatus").attr("status");
    $("#"+containerId).html(formatDate) ;
    t=t-60000;
    if(d==0 && h==0 && m==0){

      if(status==-1 || status==3){
        $("#countdown").html("即将开始");
      }
      
    }
   
}

function animateSh(pobj){
   var changeFront=pobj.find(".list").eq(0);
   var changeBack=pobj.find(".list").eq(1);
   if(changeBack.hasClass("none")){
         changeFront.removeClass("flipInY").addClass("flipOutY");
         changeBack.removeClass("flipOutY").addClass("flipInY");
	 setTimeout(function () {
         changeFront.addClass("none");
	 changeBack.removeClass("none");
      }, 500)
   }else{
         changeFront.removeClass("flipOutY").addClass("flipInY");
         changeBack.removeClass("flipInY").addClass("flipOutY");
	 setTimeout(function () {
        changeBack.addClass("none");
	changeFront.removeClass("none");
      }, 500)
	 
	 
   }
   if($(pobj).next().length){
     var Go = window.setTimeout(function () {
        animateSh($(pobj).next().eq(0))
      }, 500)
      
    }
}
var toFollow=function(){
  var jwt_token=get_token();
  var url=host+"/user/"+$(".type-pic img").attr("uid")+"/follow?jwt_token="+get_token();
  ajaxCommonFun(url,"post",function(resultData){
    if(resultData!="" && resultData!=null){
        if(resultData.code=="200"){
          var followHtml="";
	  
            if(resultData.data.followStatus==0){
             followHtml="关注+";
            }else if(resultData.data.followStatus==1 || resultData.data.followStatus==2){
             followHtml="已关注";
            }else if(resultData.data.followStatus==3){
             followHtml="互相关注";
            }
            $(".toAppConcern a").html(followHtml);
        }else if(resultData.code="401"){
           $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
            $(".dialogFooter").hide();
            tcc.BOX_show("messdiv");
        }else{
          alert(data.code)
        }
      }
  })
}
var toZan=function(liveLikeUrl,params){
	var timer="";
        clearTimeout(timer);
        var thisObj=$("#btn-zan");
        var zan=thisObj.attr("zan");
        var id=analyzParams("id")==undefined?"":analyzParams("id");
        var jwt_token=analyzParams("jwt_token")==undefined?"":analyzParams("jwt_token");
        
        //+-1操作
          var zanNum=Number(thisObj.next("#like_num").html());
          var zanNumAttr=Number(thisObj.attr("zan"));
          
          var unlike=localStorage.getItem("unlike"+id);
          if(unlike==0){
             thisObj.attr("src","assets/images/icon-like-red.png");
             thisObj.next("#like_num").html(Number(zanNum+1)).show();
             thisObj.attr("zan",Number(zanNumAttr+1))
          }else{
            /*thisObj.attr("src","assets/images/icon-like.png");
            thisObj.next("span").html(Number(zanNum-1)<0?0:Number(zanNum-1));
            thisObj.attr("zan",Number(zanNumAttr-1)<0?0:Number(zanNum-1))*/
            $(".messdivCons").html("您已经点过赞了");
            $(".dialogFooter").hide();
            tcc.BOX_show("messdiv");
            timer=setTimeout(function(){
              tcc.BOX_remove("messdiv");
            },2000)
          }        
          thisObj.addClass("animated");
          thisObj.addClass("rubberBand");
          setTimeout(function(){
                //thisObj.find("img").attr("src","assets/images/icon-like.png");
                thisObj.removeClass("animated");
                thisObj.removeClass("rubberBand")
              },500);
        //+1操作end
        ajaxCommonFun(liveLikeUrl,"post",function(resultData){
          if(resultData!="" && resultData!=null){
            if(resultData.code=="200"){
              if(unlike==0){
                localStorage.setItem("unlike"+id,1);
              }else{
               // localStorage.setItem("unlike"+id,0);
              }
            }
          }
        },params)
}

  $(function(){
    initLivePage();
    //初始化主持人列表
    $("#js-masterMsg").html("");
    getPresenter("append");
    //加载更多主持人列表
    $("#btn_more_master").click(function(){
      $(this).html("<img src='assets/images/loadding2.gif' style='width:15px;'/>")
      getPresenter("append");
    })
    $(".js-close2").click(function(){
      $(".ad_area_main").hide();
    })
    //是否为分享页
    if($("#isShare").attr("isShare")=="true"){
      //点赞
     $("#btn-zan").click(function(){
        var share_url=host+"/share/like";
        var id=analyzParams("id")==undefined?"":analyzParams("id");
        var unlike=localStorage.getItem("unlike"+id);
        var params={
          "id":id,
          "type":"Live",
          "unlike":unlike
        }
        toZan(share_url,params);
     })
      
      //打开看点
      $("#btn_spotlight").click(function(){
        $(".spotlightCon").show();
      })
      //关闭看点
      $(".spot_close").click(function(){
        $(".spotlightCon").hide();
      })
       //切换视频进度
      $(".spotList").on("click","li",function(){
        $(".spotList li").removeClass("cur");
        $(this).addClass("cur");
        var time=$(this).find(".spot_times").html();
        if(time!="" && time!=undefined){
           time=Number(time.split(":")[0]*3600)+Number(time.split(":")[1]*60)+Number(time.split(":")[2]);

        }else{
          time=0
        }
        
         
         player.currentTime(time);
         $(".spotlightCon").hide();
      })

     }

  })