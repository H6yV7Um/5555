var jwt_token_login="";
var user_id_login="";

var host="https://startvshow.com/v11/"

var passData=function(){
  var watch_num=$("#watch_num").html();
  var likeNum=$("#like_num").html();
  var CommentNum=$("#comment_num").html();
  var likeStatus=1;
  if($("#zanArea img").attr("src")=="assets/images/icon-nav-zan.png"){
     likeStatus=0;
  }
   window.starResult.backActionLikeNumIsLikeCommentNum(watch_num,likeNum,likeStatus,CommentNum);
   return false;
}
var goBack=function(){
   var new_id=channelDetail.analyzUrl()["new_id"]==undefined?"":channelDetail.analyzUrl()["new_id"]
   var user_id="";
    if(channelDetail.analyzUrl()["user_id"]==undefined || channelDetail.analyzUrl()["user_id"]==""){
       user_id=user_id_login;
    }else{
       user_id=channelDetail.analyzUrl()["user_id"];
    }

   var jwt_token="";
    if(channelDetail.analyzUrl2()==undefined || channelDetail.analyzUrl2()==""){
       jwt_token=jwt_token_login;
    }else{
       jwt_token=channelDetail.analyzUrl2();
    }
  window.location.href="detail.html?new_id="+new_id+"&user_id="+user_id+"&jwt_token="+jwt_token;
}
var goBackList=function(){
   var totalNumber=$("#hide_total").val();
   window.starResult.commentCount(totalNumber);
}
var changeCommentNumber=function(number){
   $("#comment_num").html(number);
   $("#comment_num").show();
}
var tapLike=function(user_id,jwt_token){

      var id=channelDetail.analyzUrl()["new_id"];
      jwt_token_login=jwt_token;
      user_id_login=user_id;
      var url=host+"news/"+id+"/like?jwt_token="+jwt_token;
      if(localStorage.getItem("is_like"+id)=="0"){
          $("#like_num").prev("img").attr("src","assets/images/btn-zan.png");
          $("#like_num").html(Number(Number($("#like_num").html())+1));
      }else{
          /*$("#like_num").prev("img").attr("src","assets/images/icon-nav-zan.png");
          $("#like_num").html(Number(Number($("#like_num").html())-1));*/
          $(".messdivCons").html("您已经点过赞了");
        tcc.BOX_show("messdiv");
        setTimeout(function(){tcc.BOX_remove("messdiv");},1000)
      }
      ajaxFun.ajaxCommonFun(url, "get", function(resultData){
         if(resultData.data!=null){
            // var timeout=setTimeout(function(){$("#like_num").prev("img").attr("src","assets/images/icon-nav-zan.png")},1000);
             if(localStorage.getItem("is_like"+id)=="0"){
                localStorage.setItem("is_like"+id,1);
              }else{
                /*localStorage.setItem("is_like"+id,0);*/
              }
              //调用anroid
             window.starResult.addLikeSuccess(id);
             return false;

         } 
      })
  }

  var toComment=function(user_id,jwt_token){
    $("#msg_overlay").css("display","none");
      var id=channelDetail.analyzUrl()["new_id"];
      jwt_token_login=jwt_token;
      user_id_login=user_id;
      var url=host+"news/"+id+"/comment";
      var content="";
      if($(".txtMsg").val().split("：").length>1 && $(".txtMsg").val().split("：")[0].indexOf("回复")>=0 && $(".btn_msgSend").attr("uid")!="" &&　$(".btn_msgSend").attr("cid")!="" && $(".btn_msgSend").attr("uid")!=undefined && $(".btn_msgSend").attr("cid")!=undefined){
            content=$(".txtMsg").val().split("：")[1];
            var uid=$(".btn_msgSend").attr("uid")==undefined?"":$(".btn_msgSend").attr("uid");
            var cid=$(".btn_msgSend").attr("cid")==undefined?"":$(".btn_msgSend").attr("cid");
        
      }else{
        var uid="";
        var cid="";
        content=$(".txtMsg").val();
      }
      if(content.trim()==""){
         tcc.BOX_show("messdiv");
         $(".messdivCons").html("请输入评论内容");
         return;
      }
      //var url="json/comment.json";
      /*var uid=$(".btn_msgSend").attr("uid")==undefined?"":$(".btn_msgSend").attr("uid");
      var cid=$(".btn_msgSend").attr("cid")==undefined?"":$(".btn_msgSend").attr("cid");*/
      var params={
        "content":content,
        "jwt_token":jwt_token,
        "parentId":cid,
        "answerId":uid
      }
      ajaxFun.ajaxCommonFun(url, "post", function(resultData){
         if(resultData!=null && resultData.code=="200"){
             tcc.BOX_show("messdiv");
            $(".messdivCons").html("<img src='assets/images/right.png' height='30' width='30' /> 评论成功");
	    setTimeout(function(){tcc.BOX_remove("messdiv");},1000)
            $(".txtMsg").val("");
            $(".cmt_list").html("");
            channelDetail.getCommentList();
            
         }else{
          tcc.BOX_show("messdiv");
          $(".messdivCons").html("评论失败，请稍后重试");
	  setTimeout(function(){tcc.BOX_remove("messdiv");},1000)
         }
      },params)
  }
var makeConcern=function(user_id,jwt_token){

      jwt_token_login=jwt_token;
      user_id_login=user_id;
      //加关注操作
          var uid=$(".btn_concern").parent().find("img").attr("userid");
          var url=host+"user/"+uid+"/follow";
          var params={
            "jwt_token":jwt_token
          }
          var concernHtml=$(".btn_concern").html();
          ajaxFun.ajaxCommonFun(url, "POST", function(resultData){
           if(resultData.data!=null && resultData.code=="200"){
               if(concernHtml.trim()=="+关注"){
                  $(".btn_concern").html("已关注");
                }else{
                  //取消关注操作
                   $(".btn_concern").html("+关注");
                }
           }else{
              tcc.BOX_show("messdiv");
              $(".messdivCons").html("操作失败，请稍后重试");
           }
        },params)
}
//init photoalbum
var imgDataNumber;
var imgListData;
var initPhotoalbum=function(){
  var imgList=$("#newContent img");
  imgDataNumber=new Map();
  imgListData=[];
  for (var i = 0; i < imgList.length; i++) {
    var img_src=$(imgList[i]).attr("src");
    var img_src_fake=$(imgList[i]).attr("data-echo");
    if(img_src_fake==undefined || img_src_fake==null){
      imgDataNumber[img_src]=i;
      imgListData[i]=img_src;
    }else{
      imgDataNumber[img_src_fake]=i;
      imgListData[i]=img_src_fake;
    }

  };
}
var getImgNumber=function(val){
  return imgDataNumber[val];
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
      /*if (document.getElementById('BOX_overlay')==null)//判断是否新建遮掩层
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
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("error");
        //alert("XMLHttpRequest-statusqqqq"+XMLHttpRequest.status+"readyState:"+XMLHttpRequest.readyState+"textStatus:"+textStatus);  alert();  alert(); 
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
        if(url.indexOf("&")>=0){
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
    $(".tip-area img").attr("userid",data.data.user_id);
    $(".channel_info #content-title").html(data.data.title); 
    //$(".channel_info #content-title-en").html(data.data.en_title.toUpperCase());
    //解析content
    var content =channelDetail.parseDom(data.data.content);
    var srcList=[];
    for (var i = 0; i < $(content).find("iframe").length; i++) {
      var src=$(content).find("iframe").eq(i).attr("src");
      srcList.push(src);
     /* $(content).find("iframe").eq(i).removeAttr("src");*/

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

    var user_id="";
    if(channelDetail.analyzUrl()["user_id"]==undefined || channelDetail.analyzUrl()["user_id"]==""){
       user_id=user_id_login;
    }else{
       user_id=channelDetail.analyzUrl()["user_id"];
    }
    if(Number(user_id)!=Number(data.data.user.id)){
        if(data.data.user.follow_status=="0"){
           $(".btn_concern").html("+关注");
        }else{
           $(".btn_concern").html("已关注");
        }
    }else{
        $(".btn_concern").html("");
    }
    
    if(data.data.like_num==0){
      $("#like_num").hide();
    }else{
      $("#like_num").show();
      $("#like_num").html(data.data.like_num);
    }

    if(data.data.is_like=="1"){
     $("#like_num").prev().attr("src","assets/images/btn-zan.png");
    }
    if(data.data.comment_num=="0"){
      $("#comment_num").hide();
    }else{
      $("#comment_num").show();
      $("#comment_num").html(data.data.comment_num);
    }
    //保存分享信息
     $("#hide_newInfo").attr("new_id",data.data.id);
     $("#hide_newInfo").attr("title",data.data.share.title);
     $("#hide_newInfo").attr("content",data.data.share.content);
     $("#hide_newInfo").attr("imageUrl",data.data.share.cover);
     $("#hide_newInfo").attr("shareUrl",data.data.share.share_url); 
     $("#hide_newInfo").attr("detailUrl",data.data.detail_url); 
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
          jwt_token=jwt_token_login
        }
      for (var i = 0; i < recommend.length; i++) {
    	  var url = recommend[i].detail_url+"&jwt_token="+jwt_token+"&user_id="+user_id;
          liHtml+="<li><a href='javascript:;' onclick='jumpUrl("+recommend[i].id+","+recommend[i].user_id+",\""+recommend[i].share.title+"\",\""+recommend[i].share.cover+"\",\""+recommend[i].share.share_url+"\",\""+url+"\");'><div class='imgArea'><img src='assets/images/blank.gif' data-echo='"+recommend[i].cover+"!300x225' style='max-width: 100%;min-height:100px;' /></a></div>"
                +" <div class='descArea'>"
                +"<!--<p>"+ recommend[i].en_title.toUpperCase()+"</p>-->"
                +"<h1><a href='javascript:;' onclick='jumpUrl("+recommend[i].id+","+recommend[i].user_id+",\""+recommend[i].share.title+"\",\""+recommend[i].share.cover+"\",\""+recommend[i].share.share_url+"\",\""+url+"\");'>"+recommend[i].title+"</a></h1>"
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
  },
  initDetailPage: function() {
    var id=channelDetail.analyzUrl()["new_id"];
    var jwt_token=channelDetail.analyzUrl2();
    var url=host+"news/"+id+"?jwt_token="+jwt_token;
      ajaxFun.ajaxCommonFun(url, "get", function(resultData){
         if(resultData.data!=null && resultData.code=="200"){
            channelDetail.initDetailDom(resultData);
              //localstorage unlike 赋值
              var storage = window.localStorage;      
              storage.setItem("is_like"+id,resultData.data.is_like);
              //ad
              (function(c){var g,s='script',w=window,n=c.name||'PLISTA';if(!w[n]){w[n]=c;g=w.document.getElementsByTagName(s)[0];s=w.document.createElement(s);s.async=true;s.type='text/javascript';s.src=(w.location.protocol==='https:'?'https:':'http:')+'//static'+(c.origin?'-'+c.origin:'')+'.plista.com/async'+(c.name?'/'+c.name:'')+'.js';g.parentNode.insertBefore(s,g);}
              }({
                  "publickey": "e6624f82263b4825f62fd8f4",
                  "item": {
                      "objectid":$("#hide_newInfo").attr("new_id"),  //unique ID, alphanumeric
                      "title":$("#hide_newInfo").attr("title"),  //max 255 characters
                      "text":$("#hide_newInfo").attr("content"),  //max 255 characters
                      "url": $("#hide_newInfo").attr("detailUrl"),  //max 1024 characters
                      "img": $("#hide_newInfo").attr("imageUrl"),  //max 255 characters
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
    $("#channelNav2").on("click","#zanArea",function(){
      var jwt_token=channelDetail.analyzUrl2();
      if(jwt_token==""){
        jwt_token=jwt_token_login;
      }
      var id=channelDetail.analyzUrl()["new_id"];
      var user_id="";
      if(channelDetail.analyzUrl()["user_id"]==undefined || channelDetail.analyzUrl()["user_id"]==""){
        user_id=user_id_login;
      }else{
        user_id=channelDetail.analyzUrl()["user_id"]
      }
      if(isWeiXin()){
        if(jwt_token=="" || jwt_token==undefined){
        //正式
        var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=production");
        //测试
        //var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=development")
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
        +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
        }
      }
      if(jwt_token==undefined || jwt_token==""){
           //调用anroid
             window.starResult.login();
             return false;

      }else{
        tapLike(user_id,jwt_token);
      }
       event.stopPropagation();
    })
    $("#channelNav2").on("click","#share_url",function(){
         //调用anroid
             //window.starResult.share();
             var title=$("#hide_newInfo").attr("title");
             var content=$("#hide_newInfo").attr("content");
             var imageUrl=$("#hide_newInfo").attr("imageUrl");
             var shareUrl=$("#hide_newInfo").attr("shareUrl");
             window.starResult.getNewsShareInfo(title,content,imageUrl,shareUrl)
             return false;
      })
    $("#channelNav2").on("click","#btn-toMsg",function(){
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
      window.location.href="comment.html?new_id="+new_id+"&user_id="+user_id+"&jwt_token="+jwt_token;
    })
    initPhotoalbum();
    $(".tip-area img").click(function(){
       //调用anroid
       var userid=$(this).attr("userid");
       window.starResult.goToUserInfo(userid);
       return false;
    })
    //关注
    $(".btn_concern").click(function(){
      var jwt_token=channelDetail.analyzUrl2();
      if(jwt_token=="" || jwt_token==undefined){
        jwt_token=jwt_token_login;
      }
      var user_id=channelDetail.analyzUrl()["user_id"];
      if(user_id=="" || user_id==undefined){
        user_id=user_id_login;
      }
      if(jwt_token=="" || jwt_token==undefined){
       //调用anroid
             window.starResult.attentLogin();
             return false;
      }else{
          makeConcern(user_id,jwt_token);
      }
  
    })
    //点击放大
    $("body").on("click","#newContent img",function(){
         var imgVal=$(this).attr("src");
         var thisNumber=getImgNumber(imgVal);//从0开始
        // alert(thisNumber+1+":"+imgListData.length+":"+imgListData[thisNumber])
        var resutlData=JSON.stringify({"photos":imgListData,"position":thisNumber})
        window.starResult.gainPhotos(resutlData);
    })
    //标签点击
    $(".channelCons").on("click","ul.labelsCon li",function(){
      //调用客户端
      var id=$(this).attr("labelId");
      var name=$(this).html();
      window.starResult.getTagInfo(id,name);
    })
    $(".js-close").click(function(){
        tcc.BOX_remove("messdiv");
      })

  },
  //评论
  initCommentHtml: function(resultData) {
    $("#hide_total").val(resultData.data.total);
    var liHtml=""
    var repliesHtml="";
    var pageData=resultData.data.page_data;
    if(pageData.length>0){
    $(".cmtArea").css("background","#ffffff");
    $("body").css("background","#ffffff");
     for(var i=0;i<pageData.length;i++){
      if(pageData[i].answer!=null){
               /*repliesHtml+="<div class='reply'>"+
                         " <p>"+pageData[i].replies.user_name+"：</p>"+
                         " <p>"+pageData[i].replies.content+"</p>"+
                         "</div>"*/
            var name=pageData[i].user.name+" <span class='col_grey2'>回复</span> "+
                     pageData[i].answer.name
        }else{
            var name=pageData[i].user.name;
        }
        
        liHtml+="<li uid='"+pageData[i].user.id+"'uname='"+pageData[i].user.name+"' cid='"+pageData[i].id+"'>"+
          "<div class='cmt_head fl'><img src='"+pageData[i].user.head_pic+"'></div>"+
          "<div class='cmt_content fr'>"+
            "<p class='cmt_name'>"+name+"</p>"+
            "<p class='cmt_data'>"+pageData[i].created_at+"</p>"+
            "<p class='cmt_comment'>"+pageData[i].content+
            " </p>"+repliesHtml+
          "</div>"+
        "</li>"
      }
    }else if($(".cmt_list li").length>=0){
      $("#js-getMoreComment").html("暂无更多数据，请稍后刷新");
      setTimeout(function(){
         $("#js-getMoreComment").html("点击加载更多");
      },60000)
    }else{
      $("body").css("background","#f3f3f3");
      $(".cmtArea").css("background","#f3f3f3");
      $(".cmt_list").html("<img src='assets/images/noContent.png' width='100%' />");
    }
    
    $(".cmt_list").append(liHtml)
  },
  getCommentList:function(){
      var id=channelDetail.analyzUrl()["new_id"];
      var url=host+"news/"+id+"/comment";
      //var url="json/comment.json";
      var params={
        "current_count":$(".cmt_list li").length
      }
      ajaxFun.ajaxCommonFun(url, "get", function(resultData){
         if(resultData!=null && resultData.code=="200"){
            channelDetail.initCommentHtml(resultData);
            if($(".cmt_list li").length<15){
              $("#js-getMoreComment").hide();
            }else{
              $("#js-getMoreComment").show();
            }
         }else if(resultData.code=="404" && $(".cmt_list li").length<=0){
	         $("body").css("background","#f3f3f3");
           $("body").html("<img src='assets/images/404.png' width='100%' />");
	 }
      },params)
  },
  initCommentPage:function(){
      
      $(".js-close").click(function(){
        tcc.BOX_remove("messdiv");
      })
      //初始化
      $(".cmt_list").html("");
      channelDetail.getCommentList();
      //加载更多
       $("#js-getMoreComment").click(function(){
        channelDetail.getCommentList();
       })
      //回复
      $(".cmtArea").on("click",".cmt_list li",function(){
        var cid=$(this).attr("cid");
        var uid=$(this).attr("uid");
        var currentId=channelDetail.analyzUrl()["user_id"];
        if(uid==currentId){return;}
        var cname=$(this).attr("uname");
        $(".txtMsg").val("回复 "+cname+"：");
        $(".btn_msgSend").attr("cid",cid);
        $(".btn_msgSend").attr("uid",uid);
        $(".txtMsg").focus();

        $("#msg_overlay").show();


      })
      //删除回复
      $(".txtMsg").keyup(function(){
        if(event.keyCode=="8"){
          $(".btn_msgSend").attr("cid","");
          $(".btn_msgSend").attr("uid","");
        }
      })
      //点击遮罩层删除回复
      $("#msg_overlay").click(function(){
        if($(this).css("display")!="none"){
          $(this).css("display","none");
          $(".btn_msgSend").attr("cid","");
          $(".btn_msgSend").attr("uid","");
          $(".txtMsg").val("");
        }
      })
      //发送消息
      $(".btn_msgSend").click(function(){
          var jwt_token=channelDetail.analyzUrl2();
	        var id=channelDetail.analyzUrl()["new_id"];
          if(jwt_token==""){
            jwt_token=jwt_token_login;
          }
          var user_id="";
          if(channelDetail.analyzUrl()["user_id"]==undefined || channelDetail.analyzUrl()["user_id"]==""){
            user_id=user_id_login;
          }else{
            user_id=channelDetail.analyzUrl()["user_id"]
          }
        if(isWeiXin()){
          if(jwt_token=="" || jwt_token==undefined){
          //正式
          var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=production");
          //测试
          //var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=development")
          window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
          +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
          }
        }
        if(jwt_token==undefined || jwt_token==""){
           //调用客户端
             window.starResult.commentLogin();
             return false;

        }else{
          toComment(user_id,jwt_token);
        }
      })
     //授权跳转
     $(".txtMsg").click(function(){
      var jwt_token=channelDetail.analyzUrl2();
      var id=channelDetail.analyzUrl()["new_id"];
        if(isWeiXin()){
          if(jwt_token=="" || jwt_token==undefined){
          //正式
          var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=production");
          //测试
          //var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=news&env=development")
          window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
          +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
          }
         
        }
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

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function delHtmlTag(str){
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
 }
function jumpUrl(id,user_id,title,cover,share_url,url){
	//alert(id);
  var content=$("#hide_newInfo").attr("content");
	window.location.href = url;
	window.starResult.chooseOtherNewsUserIdTitleContentCoverShareUrl(id,user_id,title,content,cover,share_url);
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
  if(!isWeiXin()){
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
  /*if($(".cmtArea").html()!=undefined){
    channelDetail.initCommentPage();
  }*/



  /*otherpage*/
  if ($(".orderType").html() != undefined) {
    channelDetail.myOrderInit();

  }
  if ($(".prodMain").html() != undefined) {
    channelDetail.prodDetailInit();
  }
  /*otherpage end*/
  //播放器
   changePlayer()
   //商品跳转
  $("#newContent").on("click",".prodCon",function(){
      var itemId=$(this).attr("itemId");
      window.starResult.goodsDetail(itemId);
         
    })
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
  //统计
  setTimeout(function(){
  console.log($(".plistaPetImg").attr("alt")+"--"+$(".plistaPetImg").parent().html())
  if($(".plistaPetImg").attr("alt")=="广告"){console.log("plistaPetImg+art")
    var hrefs=$(".plistaPetImg").parent().attr("href");
    var data_redirect=$(".plistaPetImg").parent().attr("data-redirect");
    $("#hide_newInfo").attr("adHref",hrefs);
    $("#hide_newInfo").attr("data-redirect",data_redirect);
    $(".plistaPetImg").parent().attr("data-redirect","#none");
    $(".plistaPetImg").parent().attr("onclick","javascript:return false;");
    $(".plistaPetImg").parent().attr("href","javascript:void(0)");
    $(".plistaPetImg").parent().removeClass("itemLinkPET")
    $(".plista_widget_webApp").on("click",".plista_widget_webApp_item",function(){
    console.log("111")
    if($(this).find(".plistaPetImg").html()!=undefined){
      console.log("plistaPetImg")
      //统计
      _czc.push(['_trackEvent', '内嵌广告点击', '新闻', '','','']);
    }
    $(".plistaPetImg").parent().addClass("itemLinkPET")
    window.location.href=$("#hide_newInfo").attr("adHref")
  })
  }
  
  },3000)
})