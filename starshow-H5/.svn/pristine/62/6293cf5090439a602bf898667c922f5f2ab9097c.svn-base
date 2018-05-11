//var host="http://123.57.0.118:5000/v6";
var host=commonCla.hostBase+"/v10";
var conversation_id="";
var t="";

/*var live_player = new CloudLivePlayer();
var vod_player = new CloudVodPlayer();*/
(function() {
     /**
    * 动态加载js文件
       * @param  {string}   url      js文件的url地址
       * @param  {Function} callback 加载完成后的回调函数
       */
      var _getScript = function(url, callback) {
          var head = document.getElementsByTagName('body')[0],
             js = document.createElement('script');
 
         js.setAttribute('type', 'text/javascript'); 
         js.setAttribute('src', url); 
 
         head.appendChild(js);
 
         //执行回调
         var callbackFn = function(){
                 if(typeof callback === 'function'){
                     callback();
                 }
             };
 
         if (document.all) { //IE
             js.onreadystatechange = function() {
                 if (js.readyState == 'loaded' || js.readyState == 'complete') {
                     callbackFn();
                 }
             }
         } else {
             js.onload = function() {
                 callbackFn();
             }
         }
     }
 
     //如果使用的是zepto，就添加扩展函数
     if(Zepto){
         $.getScript = _getScript;
     }
     
 })();
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
        async: false,
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

  var countLevel=function(experience){
      var level={
        "number":0,
        "icon":"star"
      }
      var star=Math.floor(experience/100);
      var moon=Math.floor(experience/100/99);
      var suns=Math.floor(experience/100/99/99);
      var crown=Math.floor(experience/100/99/99/99);
      if(star>0 && moon<1){
       level.number=star;
       level.icon="star";
      }else if(moon>=1 && suns<1){
        level.number=moon;
        level.icon="moon";
      }else if(suns>=1 && crown<1){
        level.number=suns;
        level.icon="sun";
      }else if(crown>=1){
        level.number=crown;
        level.icon="crown";
      }

      return level;
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
        orderNum=Number(num/10000).toFixed(1)+"万";
	if(num/10000>=100){
         orderNum=parseInt(num/10000/100)+"百万";
        }
        if(num/10000>=1000){
         orderNum=parseInt(num/10000/1000)+"千万";
        }
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
      $("#tvStatus").attr("status",data.status);
      $("#tvStatus").attr("user_id",data.user_id);
      $("#tvStatus").attr("is_mobile",data.is_mobile);
      $("#tvStatus").attr("is_erect",data.is_erect);
      $("#tvStatus").attr("iframe_type",data.iframe_type);
      
      $("#tvStatus").attr("hls",data.pull_hls);
      $("#tvStatus").attr("cover",data.cover);
      $("#tvStatus").attr("online_num",data.online_num);
      $("#tvStatus").attr("experience",data.user.experience);
      $(".starNum span").html(data.coins);
      $(".userDesc img").attr("src",data.user.head_pic)
      $(".userDesc span").html(data.user.name)
      
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
          $(".descInfo").hide();
          $(".msgCons").hide();
          $(".typeInfo").hide();
     }else if(data.status==1){
          $(".video").show();    
          $(".vedio_title").hide();
          $(".descInfo").show();
          $(".msgCons").show();
          $(".typeInfo").show();
          //初始化播放器
          
          //activityId 请换成自己设置的获得id
          initPlayer("player",data.pull_hls,data.cover,data.is_erect);
          //live_player.init({url:data.pull_hls,posterType:3,pic:data.cover,auto_play:0,auto_size:1,skinnable:1,autoSize:0},"player");
          $("#watchNum").html(data.online_num);
          //$(".liveRadioTab").show();
          //$("#con1").show();
      }else if(data.status=="3"){
          if(data.cover_video!=""){
            $(".vedio_title").hide();
            $(".video").show(); 
          }else{
            $(".count_tit").show();
            $(".video").hide(); 
          }
          $(".countdown").show();
          $(".desc_part1").hide();
         
      }else{
        $(".video").show();
        $(".vedio_title").hide();
        if(data.replay_url!=null && data.replay_url!=""){
          initReplayer("player",data.replay_url,data.cover,data.is_erect)
           //var player = new CloudVodPlayer();
          // player.init({url:data.replay_url,posterType:2,pic:data.cover,auto_play:0,autoSize:1,skinnable:1,autoSize:0},"player");
        }else{
          
           //var player = new CloudVodPlayer();
           //player.init({uu:"nnakh40hbq",vu:data.vuid,posterType:2,pic:data.cover,auto_play:0,pu:"1655aeb1f1",autoSize:0},"player");
        }
        $(".descInfo").hide();
        $(".msgCons").hide();
      }
      $("#js-msgList").html("");
      $(".vedio_title img.vedio_title_bg").attr("src",data.cover);
      $("#seeNum").html(data.watch_num+"次观看");
      
      $(".tv-title").html(data.title);
      $(".type-pic img").attr("src",data.user.head_pic);
      $(".type-pic img").attr("uid",data.user.id);
      $(".type-desc-main").html(data.user.name);
      /*$("#orderNum").html(data.user.followers_count)*/
      if(data.labels!=null && data.labels !=""){
        $(".tag_label").html("#"+data.labels[0].name)
      }else{
        $(".tag_label").html("")
      }
      
      var id=analyzParams("id")==undefined?"":analyzParams("id");
      var unlike=localStorage.getItem("unlike"+id);
      if(unlike==0){
         $("#btn-zan").attr("src","assets/images/icon-like.png");
       }else{
         $("#btn-zan").attr("src","assets/images/icon-like-red.png");
       }
      $("#btn-zan").attr("zan",data.like_num);
      $("#btn-zan").next("span").html(data.like_num);
      conversation_id=data.conversation_id;
      //获取时间差
      
      var endTime=data.end_time==null?resultData.current_time:data.end_time;
      var timeDiff=dateDiff('T', data.created_at,endTime);
      var timeHtml="";
      var sTime=timeDiff/1000;
      var timeMark="";
      if(sTime<0){
        sTime=-sTime;
        timeMark="后";
      }
      if(sTime<60){
      timeHtml=sTime+"秒"+timeMark
      }else if(sTime>=60 && sTime<3600){
          timeHtml=Math.round(sTime/60)+"分钟"+sTime%60+"秒"+timeMark
        }else if(sTime>=3600){
          timeHtml=(sTime/3600).toFixed(1)+"小时"+timeMark
        }
      $("#tit_desc_info").html(timeHtml+"&nbsp;"+data.city);

      //结束信息
      $(".see_num").html(data.watch_num);
      $(".video_time").html(timeHtml);
  
      
    }
    //jsfile load
    if(data.status!="2"){
     $.getScript("assets/node_modules/leancloud-realtime/dist/realtime.browser.js",function(){initLeanCloud()})
    }
     //share info 
    $("#share_info").attr("content","时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！");
    $("#share_info").attr("cover",data.cover);
    if(data.is_erect=="1"){
       /*var share_url="http://testshare.xingxiu.tv/starshow5.0/liveVertical/share.html?id="+data.id;*/
       var share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+data.id;
    }else{
      /*var share_url="http://testshare.xingxiu.tv/starshow5.0/live2.0/share.html?id="+data.id;*/
       var share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+data.id;
    }
   
    $("#share_info").attr("shareUrl",share_url);
    $("#share_info").attr("title",data.title);
    //stars
    /*if(data.stars.length<=0){
     $(".live_info").hide()
    }else{
     $(".live_info").show()
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
    var staffList=data.dakas;
    var staffHtml="";
    var staffName="";
    for (var i = 0; i < staffList.length; i++) {
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
    }*/
    
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
      $(".desc_part2 ul").html(lihtml);
    }
 }
 var initDom3=function(resultData){
    resultData=resultData.data;
    if(resultData.top3!=undefined || resultData.top3!=null || resultData.top3!="" || resultData.top3.length>0){
      var lihtml="";
      for(var i=0;i<resultData.page_data.length;i++){
        if(resultData.page_data[i].is_erect=="1"){
             /*var share_url="http://testshare.xingxiu.tv/starshow5.0/liveVertical/share.html?id="+resultData.page_data[i].id*/
         var share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+resultData.page_data[i].id
        }else{
/*var share_url="http://testshare.xingxiu.tv/starshow5.0/live/share.html?id="+resultData.page_data[i].id*/
         var share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+resultData.page_data[i].id
        }
         
         lihtml+="<li><a href='"+share_url+"'>"
                  +"<div class='vedioCover'><img src='"+resultData.page_data[i].cover+"!750x563'/></div>"
                  +"<div class='vedioDesc'>"
                  +"<h2>"+resultData.page_data[i].title+"</h2>"
                  +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+cWan(resultData.page_data[i].watch_num)+"</span></li>"
                  +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+cWan(resultData.page_data[i].like_num)+"</span></li></ul>"
                  +"</div></a></li>";
      }
      $(".vedioList").html(lihtml);
    }
 }
 var getLivePageData=function(){
    var id=analyzParams("id")==undefined?"":analyzParams("id");
    var url=host+"/live/"+id
    ajaxCommonFun(url,"get",function(resultData){
      if(resultData!=null && resultData !=""){
        if(resultData.code=="200"){
          initDom(resultData);
          //二次分享
          var title= $("#share_info").attr("title");
          var desc= $("#share_info").attr("content");
          var link= $("#share_info").attr("shareUrl");
          var imgUrl= $("#share_info").attr("cover");
          wx_share(title,desc,link,imgUrl);
          //执行
          /*var Go = window.setInterval(function () {
            var bTime=resultData.current_time.replace(/-/g,"/");
            var eTime=resultData.data.created_at.replace(/-/g,"/")
            initJcountdown(bTime,eTime,"countdown");
            animateSh($(".staffList li").eq(0));
          },60000)*/
          /*if($(".live_info").css("display")!="none" && $(".live_info")!=undefined){
            $t=setInterval('AutoScroll(".star_info")',3000)//轮换间隔，单位毫秒，下同 
          }*/
    
        }else{
         if(resultData.code=="404"){
        	  $("body").css("background","#f3f3f3")
        	  $("body").html("<img src='assets/images/404.png' width='100%' />")
        	 }
          return;
        }
      }
      
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
    var url3=host+"/user/"+uid+"/lives";
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
  if (!storage.getItem("unlike"+id)) storage.setItem("unlike"+id,0);
     //toMsgArea
     $(".toMsgArea").click(function(){
       tcc.BOX_show("messdiv");
       $(".messdivCons").html("确认下载星秀APP");
     })
     $(".js-close").click(function(){
       tcc.BOX_remove("messdiv");
     })
     $("#btn_cancel").click(function(){
       tcc.BOX_remove("messdiv");
     })
     getLivePageData();
     //打开app
     $(".app_link").click(function() {
      app_jump();
     });
     //点赞
     $("#btn-zan").click(function(){
        
        var zan=$(this).attr("zan");
        var id=analyzParams("id")==undefined?"":analyzParams("id");
        var jwt_token=analyzParams("jwt_token")==undefined?"":analyzParams("jwt_token");
        var liveLikeUrl=host+"/share/like";
        var unlike=localStorage.getItem("unlike"+id);
        var params={
          "id":id,
          "type":"Live",
          "unlike":unlike
        }
        var thisObj=$(this);
        //+-1操作
          var zanNum=Number(thisObj.next("span").html());
          var zanNumAttr=Number(thisObj.attr("zan"));
          if(unlike==0){
             thisObj.attr("src","assets/images/icon-like-red.png");
             thisObj.next("span").html(Number(zanNum+1));
             thisObj.attr("zan",Number(zanNumAttr+1))
          }else{
            thisObj.attr("src","assets/images/icon-like.png");
            thisObj.next("span").html(Number(zanNum-1)<0?0:Number(zanNum-1));
            thisObj.attr("zan",Number(zanNumAttr-1)<0?0:Number(zanNum-1))
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
                storage.setItem("unlike"+id,1);
              }else{
                storage.setItem("unlike"+id,0);
              }
            }
          }
        },params)

     })
  }
  //leanCloud 
  function initLeanCloud(){
	var status= $("#tvStatus").attr("status");
	var hls= $("#tvStatus").attr("hls");
	var cover= $("#tvStatus").attr("cover");
	var online_num= $("#tvStatus").attr("online_num");
  var experience=$("#tvStatus").attr("experience");

 

    if(typeof AV == "undefined"){return false}
    var Realtime = AV.Realtime;
    var realtime = new Realtime({
      appId: 'xnl1ky594B4KY5CuIaoA1BzW-gzGzoHsz',
      region: 'cn', // 美国节点为 "us"
    });
    realtime.createIMClient('Tom').then(function(tom) {
    return tom.getConversation(conversation_id);
    }).then(function(conversation) {
      conversation.queryMessages({
        limit: 20, // limit 取值范围 1~1000，默认 20
      }).then(function(messages) {
        // 最新的十条消息，按时间增序排列
        //alert(JSON.stringify(messages));
        
        for (var i = 0; i < messages.length; i++) {
          var level=countLevel(messages[i]._lcattrs.user_experience);
          var msgContent="";
          if(messages[i]._lcattrs.type==2){
              msgContent=messages[i]._lcattrs.msg+"<img src='assets/images/icon-like-red.png' width='15' />"
          }else if(messages[i]._lcattrs.type==4){
              msgContent=messages[i]._lcattrs.msg+"<img src='"+messages[i]._lcattrs.gift_pic+"' width='15' />"
          }else{
            msgContent=messages[i]._lcattrs.msg;
          }
	  //
          if(messages[i]._lcattrs.type!=7 && messages[i]._lcattrs.type!=8 && messages[i]._lcattrs.type!=9 && messages[i]._lcattrs.type!=10){
            var lihtml="<li> <!--<div class='head_pic fl'><img src='"+
                   messages[i]._lcattrs.user_icon+"'/></div>--><div class='level_area fl "+level.icon+"'>"+
                   "<img src='assets/images/"+level.icon+".png'/><span>"+level.number
                   +"</span></div><div class='fl msgArea'>"+
                   "<span class='col_red'>"+
                   messages[i]._lcattrs.user_name+"：</span>"+msgContent+"</div></li>"
           $("#js-msgList").prepend(lihtml);
          }
	 
      	  /*if(messages[i]._lcattrs.type==8){
      	        //$(".video").show();  
               
                //alert(status+",1")
                if(status==-1 || status==3){
                  $(".vedio_title").hide();
                  $(".video-js").attr("poster",data.cover);
                  $(".video-js source").attr("src",hls);
                  $(".video-js source").attr("type","application/x-mpegURL");
                  $(".desc_part1").show();
                  $(".countdown").hide();
                  $("#watchNum").html(online_num);
                  $(".liveRadioTab").show();
                  $("#con1").show();
                  $("#tvStatus").attr("status","1");
                }
      	        
      	  }*/
          
        };
        

      }).catch(console.error.bind(console));
      conversation.on('message', function(message, conversation) {
        //alert(JSON.stringify(message))
        var msgContent="";
        var level=countLevel(message._lcattrs.user_experience);
        if(message._lcattrs.type==2){
            msgContent=message._lcattrs.msg+"<img src='assets/images/icon-like-red.png' width='15' />"
        }else if(message._lcattrs.type==4){
            msgContent=message._lcattrs.msg+"<img src='"+message._lcattrs.gift_pic+"' width='15' />"
        }else{
           msgContent=message._lcattrs.msg
        }
	console.log(message._lcattrs.user_experience+"name:"+message._lcattrs.user_name)
        if(message._lcattrs.type!=7 && message._lcattrs.type!=8 && message._lcattrs.type!=9 && message._lcattrs.type!=10){
             var lihtml="<li><!-- <div class='head_pic fl'><img src='"+
                   message._lcattrs.user_icon+"'/></div>--><div class='level_area fl "+level.icon+"'>"+
                   "<img src='assets/images/"+level.icon+".png'/><span>"+level.number
                   +"</span></div><div class='fl msgArea'>"+
                   "<span class='col_red'>"+
                   message._lcattrs.user_name+"：</span>"+msgContent+"</div></li>";
            $("#js-msgList").prepend(lihtml)
        }
        //alert(message._lcattrs.type)
        if(message._lcattrs.type==8){
            // $("#countdown").hide();
                if(status==-1 || status==3){
                   reloadPage()
                } 
          }
        
        /*console.log(message);
        console.log('Message received: ' + message);*/
      });
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
  /*$(".video-js").attr("poster",cover);
  $(".video-js source").attr("type","application/x-mpegURL");
  $(".video-js source").attr("src",hls);*/
  /*var myPlayer =  videojs("tvLive");  //初始化视频
  myPlayer.src(hls);  //重置video的src
  myPlayer.load(hls);  //使video重新加载*/
 // $("#countdown").hide();
  //$(".liveRadioTab").show();
  /*$("#con1").show();
  $("#con2").hide();*/
  $("#tvStatus").attr("status","1");
  $(".desc_part1").html('<span id="watchNum">'+online_num+'</span>人在看');
  $(".desc_part1").show();
}
//autoscroll
/*function AutoScroll(obj){
 if($(obj).find("ul:first li").length<2){
  window.clearInterval($t); //清楚定时器
  return;
  }
 $(obj).find("ul:first").animate({ 
    marginTop:"-4rem"//和上面的height一致 
     },800,function(){ 
    $(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
     }); 
 }*/ 





  $(function(){
    initLivePage();
    //initLeanCloud();
    $(".js-close2").click(function(){
      $(".ad_area_main").hide();
    })
  })