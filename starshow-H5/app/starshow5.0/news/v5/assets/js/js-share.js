var jwt_token_login="";
var user_id_login="";
/*var host="http://123.57.0.118:5000/v8/";*/
var host="https://startvshow.com/v12/"
var tapLike=function(jwt_token){
      var storage = window.localStorage;
      var id=channelDetail.analyzUrl()["new_id"];
      /*var url="http://123.57.0.118:5000/news/"+id+"/like?jwt_token="+jwt_token;*/
      var url=host+"share/like/";
      var unlike=localStorage.getItem("unlike"+id);
      var params={
        "id":id,
        "type":"News",
        "unlike":unlike
      }
      if(unlike==0){
        $("#like_num").prev("img").attr("src","assets/images/btn-zan.png");
        $("#like_num").html(Number(Number($("#like_num").html())+1));
        //var url="json/like.json";
        $.post(url,params,function(resultData){
          if(resultData.data!=null){
             if(unlike==0){
                storage.setItem("unlike"+id,1);
              }else{
               //storage.setItem("unlike"+id,0);
              }

         }
        });
      /*ajaxFun.ajaxCommonFun(url, "post", function(resultData){
         if(resultData.data!=null){
             if(unlike==0){
                storage.setItem("unlike"+id,1);
              }else{
               //storage.setItem("unlike"+id,0);
              }
             //var timeout=setTimeout(function(){$("#like_num").prev("img").attr("src","assets/images/icon-nav-zan.png")},1000);
             //调用anroid
             //window.starResult.addLikeSuccess(id);
             //return false;

         }
      },params)*/
      }else{
        /*$("#like_num").prev("img").attr("src","assets/images/icon-nav-zan.png");
        $("#like_num").html(Number(Number($("#like_num").html())-1));*/
        
        $(".messdivCons").html("您已经点过赞了");
        tcc.BOX_show("messdiv");
        setTimeout(function(){tcc.BOX_remove("messdiv");},1000)
      }
      
      
  }
  var toComment=function(jwt_token){
      var id=channelDetail.analyzUrl()["new_id"];
      jwt_token_login=jwt_token;
      var url=host+"news/"+id+"/comment";
      var content=$(".txtMsg").val();
      //var url="json/comment.json";
      var params={
        "content":content,
        "jwt_token":jwt_token
      }
      ajaxFun.ajaxCommonFun(url, "post", function(resultData){
         if(resultData!=null && resultData.code=="200"){
            tcc.BOX_show("messdiv");
            $(".messdivCons").html("<img src='assets/images/right.png' height='30' width='30' /> 评论成功");
            setTimeout(function(){tcc.BOX_remove("messdiv");},2000)
	    $(".txtMsg").val("");
            channelDetail.getCommentList();
         }else{
          tcc.BOX_show("messdiv");
          $(".messdivCons").html("评论失败，请稍后重试");
	  setTimeout(function(){tcc.BOX_remove("messdiv");},2000)
         }
      },params)
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
     /* if (document.getElementById('BOX_overlay')==null)//判断是否新建遮掩层
      {
          var overlay = document.createElement("div");
          overlay.setAttribute('id','BOX_overlay');
          document.body.appendChild(overlay);
      }
      document.getElementById('BOX_overlay').ondblclick=function(){tcc.BOX_remove(e);};*/
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
      /*var bo = document.getElementById('BOX_overlay');
      bo.style.left = scrollLeft+'px';
      bo.style.top = scrollTop+'px';
      bo.style.width = clientWidth+'px';
      bo.style.height = clientHeight+'px';
      bo.style.display="";*/
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
var ajaxFun = {
  ajaxCommonFun: function(url, type, callbackFun, params) {
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
        alert("error");
      }
    })
  }

}
var channelDetail = {
  scrollNav: function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var targetobj = document.getElementById('channelTitle');
    var navTop = targetobj.offsetTop - 50;

    if (scrollTop > navTop) {
      $("#channelNav").addClass("move");
      $("#channelNav ul").css("width", "60%");
    } else {
      $("#channelNav").removeClass("move");
      $("#channelNav ul").css("width", "");


    }
  },
  analyzUrl: function() {
    var paramsList={}
    var url=window.location.search.split("?")[1];
    if(url=="")return;
    var params=url.split("&");
    for(var i=0;i<params.length;i++){
      var keyName=params[i].split("=")[0];
      var value=params[i].split("=")[1];
      paramsList[keyName]=value;
    }

    return paramsList;
  },
  analyzUrl2: function() {
    var url=window.location.search.split("?")[1];
        if(url=="")return url;
        url=url.split("jwt_token=")[1];
        if(url=="" || url==undefined){
          url="";
          return url;
        }
        if(url.indexOf("&")>0){
          url=url.split("&")[0];
        }
    return url;
  },
   parseDom:function(arg) { 
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
  },
  changeLink:function(obj){
  var html=$(obj).find("urltitle").html();
  $(obj).css("background-size","20px");
  $(obj).css("display","block");
  if(html.length>15){ 
    $(obj).html(html.substr(0,6)+"..."+html.substr(6,6)+"-网页链接");
  }
},
  initDetailDom:function(data){
    $("title").html(data.data.title); 
    
    $(".channel_title img").attr("src",data.data.cover+"!750x563");
    $(".tip-area img.tip-pic").attr("src",data.data.user.head_pic);
    if(data.data.user.roles.length<=0){
       var experience=data.data.user.experience;
       var star=experience/100;
       var moon=star/100;
       var sun=moon/100;
       var crown=sun/100;
       if(star>=1 && moon<1 && sun<1){
        $(".tip-area img.icon_roles").attr("src","assets/images/roles_normal_star.png");
       }else if(moon>=1 && sun<1){
        $(".tip-area img.icon_roles").attr("src","assets/images/roles_normal_moon.png");
      }else if(sun>=1 && crown<1){
        $(".tip-area img.icon_roles").attr("src","assets/images/roles_normal_sun.png");
      }else if(crown>=1){
        $(".tip-area img.icon_roles").attr("src","assets/images/roles_normal_huangguan.png");
      }
    }else{
      $(".tip-area img.icon_roles").attr("src","assets/images/roles_"+data.data.user.roles[0]+".png");
    }
    $(".tip-area span").html(data.data.user.name);
  /*  $(".channel_info #content-title").html(data.data.title);*/
    $(".channel_info #content-title").html(data.data.title); 
    //$(".channel_info #content-title-en").html(data.data.en_title.toUpperCase());
    //解析content
    var content =channelDetail.parseDom(data.data.content);
    var srcList=[];
    for (var i = 0; i < $(content).find("iframe").length; i++) {
      var src=$(content).find("iframe").eq(i).attr("src");
      srcList.push(src);
      $(content).find("iframe").eq(i).removeAttr("src");    

    };
    $(content).find("iframe").hide();
    var imgList=$(content).find("img");
    for (var i = 0; i < imgList.length; i++) {
      var trueSrc=imgList[i].src;
      $(imgList[i]).attr("data-echo",trueSrc);
      $(imgList[i]).attr("src","assets/images/blank.gif");
      $(imgList[i]).css("min-height","200px");
       $(imgList[i]).css("display","block");
      $(imgList[i]).css("margin","0 auto");
    };
    var num=0;
      function run(){
        $(content).find("iframe").eq(num).attr("src", srcList[num])
      }
      var timer=setInterval(function(){
        run();
        num++;
        if(num>=$(content).find("iframe").length){
        clearInterval(timer);
        $(content).find("iframe").show();
        }
      },10)
      
       //处理链接
	 var linkList=$(content).find(".urlstyle");
	 for (var i = 0; i < linkList.length; i++) {
	   channelDetail.changeLink(linkList[i])
	 };
    $("#newContent").html(content);
    echo.init();
     
    //解析content end
    $("#curTime").html(data.data.created_at);
    $("#watch_num").html(data.data.watch_num);
    //标签
    var labels=data.data.labels;
    if(labels!=null && labels.length>0){
        $(".labelTit").show();
        var labelsHtml="";
        for (var i = 0; i < labels.length; i++) {
        labelsHtml+="<li labelId='"+labels[i].id+"'>"+labels[i].name+"</li>"
        };
        $(".labelsCon").html(labelsHtml);
    }
    
    //标签end

    if(data.data.like_num==0){
      $("#like_num").hide();
    }else{
      $("#like_num").show();
      $("#like_num").html(data.data.like_num);
    }
    if(data.data.is_like=="1"){
     $("#like_num").prev().attr("src","assets/images/btn-zan.png");
    }
    var id=channelDetail.analyzUrl()["new_id"];
    if(localStorage.getItem("unlike"+id)=="1"){
     $("#like_num").prev().attr("src","assets/images/btn-zan.png");
    }
    if(data.data.comment_num=="0"){
      $("#comment_num").hide();
    }else{
      $("#comment_num").show();
      $("#comment_num").html(data.data.comment_num);
    }
    /*$("#like_num").html(data.data.like_num);
    $("#comment_num").html(data.data.comment_num);*/
    //$("#share_url").attr("href",data.data.share_url);
    //推荐列表
    if(data.data.recommend.length<=0 || data.data.recommend==null){
     /*$(".rcmdList").parent().hide();*/
      $(".rcmdList").hide();
    }else{
      $(".rcmdList").html("");
      var recommend=data.data.recommend;
      var liHtml="";
      var jwt_token=channelDetail.analyzUrl2();
        if(jwt_token==""){
          jwt_token=jwt_token_login;
        }
      for (var i = 0; i < recommend.length; i++) {
          liHtml+="<li><a href='"+recommend[i].share.share_url+"&jwt_token="+jwt_token+"'><div class='imgArea'><img src='assets/images/blank.gif' data-echo='"+recommend[i].cover+"!300x225' style='max-width: 100%;min-height:100px;'  /></a></div>"
                +" <div class='descArea'>"
		+"<!--<p>"+ recommend[i].en_title.toUpperCase()+"</p>-->"
                +"<h1><a href='"+recommend[i].share.share_url+"&jwt_token="+jwt_token+"'>"+recommend[i].title+"</a></h1>"
                
                +"<!--<div><p class='fl'>摄影／孙晶晶</p><p class='fr'>摄影／孙晶晶</p></div>-->"
                +"<article class='activityList'>"
                +"<section>"
                +"<img src='assets/images/icon-eye.jpg' /> "
                +"<span>"+recommend[i].watch_num+"</span>"
                +"</section>"
                +"<section>"
                +"<img src='assets/images/icon-heart.jpg'  /> "
                +"<span>"+recommend[i].like_num+"</span>"
                +"</section>"
                +"<section>"
                +"<img src='assets/images/icon-msg.jpg' /> "
                +"<span>"+recommend[i].comment_num+"</span>"
                +"</section>"
                +"</article>"
                +"</div></li>"
        }
      /*$(".rcmdList").html(liHtml);*/
    }
    
    //广告
    if(data.data.advertisements.length<=0){
       $(".prod_rcmdCons").hide();
    }else{
      $(".prod_rcmdCons").show();
      var html="";
      for (var i = 0; i < data.data.advertisements.length; i++) {
        html+="<li><a href='"+data.data.advertisements[i].url+"'>"+
              "<img src='"+data.data.advertisements[i].cover+"'/></a></li>"
      };
      $(".prod_rcmdCons ul").append(html);
    }

    //广告end
    //share info 
    $("#share_info").attr("new_id",data.data.id);
    $("#share_info").attr("content",data.data.share.content);
    $("#share_info").attr("cover",data.data.share.cover);
    $("#share_info").attr("shareUrl",data.data.share.share_url);
    $("#share_info").attr("title",data.data.share.title);
    $("#share_info").attr("user_id",data.data.user_id);

  },
  initDetailPage: function() {
    var id=channelDetail.analyzUrl()["new_id"];
    var jwt_token=channelDetail.analyzUrl2();
    var url=host+"news/"+id+"?jwt_token="+jwt_token;
      ajaxFun.ajaxCommonFun(url, "get", function(resultData){
         if(resultData.data!=null && resultData.code=="200"){
            channelDetail.initDetailDom(resultData);
            //二次分享
            wx_share();
            //ad
            (function(c){var g,s='script',w=window,n=c.name||'PLISTA';if(!w[n]){w[n]=c;g=w.document.getElementsByTagName(s)[0];s=w.document.createElement(s);s.async=true;s.type='text/javascript';s.src=(w.location.protocol==='https:'?'https:':'http:')+'//static'+(c.origin?'-'+c.origin:'')+'.plista.com/async'+(c.name?'/'+c.name:'')+'.js';g.parentNode.insertBefore(s,g);}
            }({
                "publickey": "e6624f82263b4825f62fd8f4",
                "item": {
                    "objectid":$("#share_info").attr("new_id"),  //unique ID, alphanumeric
                    "title":$("#share_info").attr("title"),  //max 255 characters
                    "text":$("#share_info").attr("content"),  //max 255 characters
                    "url": $("#share_info").attr("shareurl"),  //max 1024 characters
                    "img": $("#share_info").attr("cover"),  //max 255 characters
                    "category": "News",
                    "published_at": 1400000000,  //UNIX timestamp, date article was first published
                    "updated_at": 1400000000  //UNIX timestamp, date article was last modified
                },
                "origin": "cn"
            }));
         }else{
	  $("body").html("<img src='assets/images/404.png' width='100%' />")
	 }
      })
  },
  channelInit: function() {
    channelDetail.initDetailPage();
    $("#zanArea").click(function(){
      var jwt_token=channelDetail.analyzUrl2();
      tapLike(jwt_token);
      
    })
    $("#share_url").click(function(){
         //调用anroid
             window.starResult.share();
             return false;
      })
    $("#btn-toMsg").click(function(){
       if(navigator.onLine){ 
         var jwt_token=channelDetail.analyzUrl2();
          if(jwt_token==""){
            jwt_token=jwt_token_login;
          }
          var user_id="";
          if(channelDetail.analyzUrl()["user_id"]==undefined || channelDetail.analyzUrl()["user_id"]==""){
            user_id=user_id_login;
          }else{
            user_id=channelDetail.analyzUrl()["user_id"]
          }
          var new_id=channelDetail.analyzUrl()["new_id"];
          window.location.href="comment-share.html?new_id="+new_id+"&user_id="+user_id+"&jwt_token="+jwt_token;
      } 
      else { 
        tcc.BOX_show("messdiv");
        $(".messdivCons").html("断网了");
        setTimeout(function(){
          tcc.BOX_remove("messdiv");
        },3000)
      } 
    })
    //localstorage unlike 赋值
      var id=channelDetail.analyzUrl()["new_id"];
      var storage = window.localStorage;
      if (!storage.getItem("unlike"+id)) storage.setItem("unlike"+id,0);

      //替换detail.html
      var contentHtml=$("#newContent").html();
      if(contentHtml.indexOf("starshow5.0/news/detail.html")>=0){
        contentHtml=contentHtml.toString().replace(new RegExp("starshow5.0/news/detail.html","gm"),"starshow5.0/news/share.html");
        $("#newContent").html(contentHtml)
      }
      $(".js-close").click(function(){
        tcc.BOX_remove("messdiv");
      })
  },
  initCommentHtml: function(resultData) {
    $(".cmt_list").html("");
    var liHtml=""
    var repliesHtml="";
    var pageData=resultData.data.page_data;
    for(var i=0;i<pageData.length;i++){
      if(pageData[i].replies!=null){
               repliesHtml+="<div class='reply'>"+
                         " <p>"+pageData[i].replies.user_name+"：</p>"+
                         " <p>"+pageData[i].replies.content+"</p>"+
                         "</div>"
      }
      
      liHtml+="<li>"+
        "<div class='cmt_head fl'><img src='"+pageData[i].user.head_pic+"'></div>"+
        "<div class='cmt_content fr'>"+
          "<p class='cmt_name'>"+pageData[i].user.name+"</p>"+
          "<p class='cmt_data'>"+pageData[i].created_at+"</p>"+
          "<p class='cmt_comment'>"+pageData[i].content+
          " </p>"+repliesHtml+
        "</div>"+
      "</li>"
    }
    $(".cmt_list").append(liHtml)
  },
  getCommentList:function(){
      var id=channelDetail.analyzUrl()["new_id"];
      var url=host+"news/"+id+"/comment";
      //var url="json/comment.json";
      var params={
        "current_count":$("cmt_list").length
      }
      ajaxFun.ajaxCommonFun(url, "get", function(resultData){
         if(resultData!=null && resultData.code=="200"){
            channelDetail.initCommentHtml(resultData);
         }
      },params)
  },
  initCommentPage:function(){
      if($(".cmt_list li").length<=15){
        $("#js-getMoreComment").hide();
      }else{
        $("#js-getMoreComment").show();
      }
      $(".js-close").click(function(){
        tcc.BOX_remove("messdiv");
      })
      channelDetail.getCommentList();
      $(".btn_msgSend").click(function(){
          var jwt_token=channelDetail.analyzUrl2();
	  var id=channelDetail.analyzUrl()["new_id"]; 
        if(jwt_token==""){
          jwt_token=jwt_token_login;
        }
        /*if(isWeiXin()){
          if(jwt_token=="" || jwt_token==undefined){
          //正式
          var redirect=encodeURIComponent("http://star.xingxiu.tv/oauth2?id="+id+"&type=news&env=production");
          //测试
          //var redirect=encodeURIComponent("http://star.xingxiu.tv/oauth2?id="+id+"&type=news&env=development")
          window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
          +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
          }
         
        }*/
        /*if(jwt_token==undefined || jwt_token==""){
           //调用客户端
             window.starResult.commentLogin();
             return false;

        }else{
          
        }*/
        toComment(jwt_token);
      })

      
  },
 /*other page*/
  orderTypeChange: function(index) {
    for (var i = 0; i < $(".typeArea").length; i++) {
      if (!$(".typeArea").eq(i).hasClass("none")) {
        $(".typeArea").addClass("none")
      }
    }
    $(".typeArea").eq(index).removeClass("none")

  },
  myOrderInit: function() {
    $(".orderType li").click(function() {
      var index = $(this).index();
      $(".orderType li").removeClass("cur");
      $(this).addClass("cur")
      channelDetail.orderTypeChange(index)
    })
  },
  prodNumber: function(type, targetId) {
    var targetVal = $("#" + targetId).val();
    if (type == "add") {
      targetVal = Number(targetVal) + 1;
      $("#" + targetId).val(targetVal)
    } else if (type == "minus") {
      if (targetVal > 1) {
        targetVal = Number(targetVal) - 1;
        $("#" + targetId).val(targetVal)
      }

    }
  },
  prodDetailInit: function() {
    $(".btn-add").click(function() {
      channelDetail.prodNumber("add", "js-txt-number")
    })
    $(".btn-minus").click(function() {
      channelDetail.prodNumber("minus", "js-txt-number")
    })
    $("#js-txt-number").blur(function() {
      if (isNaN($(this).val())) {
        alert("请输入数字");
        $(this).val("1");
        $(this).focus();
        return;
      }
      if (Number($(this).val()) < 1) {
        $(this).val(1)
      }
    })
    $("#js-cinfo-close").click(function() {
      $("#js-chooseInfo").hide();
      $("#js-chooseBg").hide();
    })
    $("#js-prodyBuy").click(function() {
      $("#js-chooseInfo").show();
      $("#js-chooseBg").show();
    })
    $("#js-chooseType li").click(function() {
      var index = $(this).parent().index();
      //sibling label
      $("#js-chooseType").children().eq(index).find("li").removeClass("cur");
      $(this).addClass("cur");
      //
      var ulIndex = Number($(this).parent().attr("number")) - 1;
      $("#js-mychoose span").eq(ulIndex).html($(this).html())
    })
  },
  //验证表单
  adrVaildate: function() {

  },
  adrInitPage: function() {
    channelDetail.adrVaildate();
  }
  /*other page end*/
}

var isWeiXin=function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

var is_browser = function(){
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  var is_browser=false;
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //在微信中打开
    is_browser=true;
  }

  if (ua.match(/WeiBo/i) == "weibo") {
    //在新浪微博客户端打开
   is_browser=true;
  }
  if (ua.match(/QQ/i) == "qq") {
    is_browser=true;
    //在QQ打开
  }

  return is_browser;

};
var is_weibo=function () {
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.match(/WeiBo/i) == "weibo") {
     return true;
    }else{
        return false;
    }
  
}
var changeUrl=function(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  alert('是否是Android：'+isAndroid);
  alert('是否是iOS：'+isiOS);
  // if(isAndroid || isiOS){
  //    window.location.href=window.location.href.replace("share.html","detail.html");
  // } 
}
function changePlayer(){
   var link=$("iframe").attr("src");
  if(link!=undefined){
    if(link.indexOf("preview.html")>=0){
    link=link.replace("preview.html","player.html").split("&height=")[0];
    }
    $("iframe").attr("src",link)
  }
}
$(function() {
  if(is_weibo()){
    $("#weibo_lead").show();
    $("#weibo_lead").attr("style","position: absolute;top: 0;right:20px;z-index:999;width: 50%;");
    $("#BOX_overlay").show();
    $("#BOX_overlay").attr("style","width:100%;height:100%;background:rgba(0,0,0,1);")
    $("#BOX_overlay").click(function(){
      $("#weibo_lead").hide();
      $("#BOX_overlay").hide();
    })
  }
  if(!is_browser()){
    if(window.location.href.indexOf("share.html")>0){
       window.location.href=window.location.href.replace("share.html","detail.html");
    }
  }else{
    if(window.location.href.indexOf("detail.html")>0){
      window.location.href=window.location.href.replace("detail.html","share.html");
    }
   
  }

  if ($(".channelCons").html() != undefined) {
    channelDetail.channelInit();
  }
  if($(".cmtArea").html()!=undefined){
    channelDetail.initCommentPage();
  }



  /*otherpage*/
  if ($(".orderType").html() != undefined) {
    channelDetail.myOrderInit();

  }
  if ($(".prodMain").html() != undefined) {
    channelDetail.prodDetailInit();
  }
  /*otherpage end*/
  //点击audio播放
    $("#newContent").on("click",".audio_main",function(e){
       /* var audio=$(this).find("audio")[0];
          if(audio!==null){             
        if(audio.paused){
            $(this).find(".audio_yuyin").addClass("move");
                audio.play();// 这个就是播放  
        }else{
           $(this).find(".audio_yuyin").removeClass("move");
              audio.pause();// 这个就是暂停
        }
     } 
     var thi=$(this);
     $(audio).on('ended',function () {
       thi.find('.audio_yuyin').removeClass('move');
    });*/
    var audio=$(this).find("audio")[0];
     var childList=document.getElementsByTagName("audio");
    if(audio!==null){
            if(audio.paused){
                        for(var i = 0; i < childList.length; i++){
                            var au=childList[i];
                          if(au!==null){
                          if(au.paused){
                          }else{
                          au.pause();// 这个就是暂停
                          }
                          }
                        }
                            $(".audio_yuyin").removeClass("move");
             audio.play();//audio.play();// 这个就是播放
                    $(this).find(".audio_yuyin").addClass("move");
            }else{
               $(this).find(".audio_yuyin").removeClass("move");
             audio.pause();// 这个就是暂停
            }
         }
            var thi=$(this);
             $(audio).on('ended',function () {
                thi.find('.audio_yuyin').removeClass('move');
           });
  })
  //播放器
   changePlayer()
   //统计
  setTimeout(function(){
  console.log($(".plistaPetImg").attr("alt")+"--"+$(".plistaPetImg").parent().html())
  if($(".plistaPetImg").attr("alt")=="广告"){console.log("plistaPetImg+art")
    var hrefs=$(".plistaPetImg").parent().attr("href");
    var data_redirect=$(".plistaPetImg").parent().attr("data-redirect");
    $("#share_info").attr("adHref",hrefs);
    $("#share_info").attr("data-redirect",data_redirect);
    $(".plistaPetImg").parent().attr("data-redirect","#none");
    $(".plistaPetImg").parent().attr("onclick","javascript:return false;");
    $(".plistaPetImg").parent().attr("href","javascript:void(0)");
    $(".plistaPetImg").parent().removeClass("itemLinkPET");
    $(".plista_widget_webApp").on("click",".plista_widget_webApp_item",function(){
    console.log("111")
    if($(this).find(".plistaPetImg").html()!=undefined){
      console.log("plistaPetImg")
      //统计
      _czc.push(['_trackEvent', '分享广告点击', '新闻分享', '','','']);
    }
    $(".plistaPetImg").parent().addClass("itemLinkPET");
    window.location.href=$("#share_info").attr("adHref");
  })
  }
  
  },3000)
})