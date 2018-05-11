var host=commonCla.hostBase+"/";
var shareUrlBase=commonCla.shareUrlBase;
var currentTime="";
//初始化
var token_login="";
var id=commonCla.analyzParams("id");
var token=commonCla.analyzParams("token");
/*
*评论
*/

var commentFun=function(){
  
  //点击评论回复
  $(".cmt_list").on("click", ".cmt_reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      var currentId = commonCla.analyzParams("user_id");
      if (uid == currentId) {
        return;
      }
      var cname = $(this).parents("li").attr("uname");
      $(".txtMsg").attr("placeHolder","回复 " + cname + "：");
      $(".btn_msgSend").attr("cid", cid);
      $(".btn_msgSend").attr("uid", uid);
      
      //$("#msg_overlay").show();
      $(".md-modal").addClass("md-show");
      $(".md-overlay").addClass("md-show");
      $(".txtMsg").val("");
      $(".txtMsg").focus();


    })
   //点击遮罩层删除回复
    $("#msg_overlay").click(function() {
        if ($(this).css("display") != "none") {
          $(this).css("display", "none");
          $(".btn_msgSend").attr("cid", "");
          $(".btn_msgSend").attr("uid", "");
          $(".txtMsg").attr("placeHolder","快来评论");
          $(".txtMsg").val("");
          $(".txtMsg").focus();
        }
      })
    //点击遮罩层删除回复
    $(".md-overlay").click(function() {
        if ($(this).hasClass("md-show")) {
          $(".md-modal").removeClass("md-show");
          $(this).removeClass("md-show");
          $(".btn_msgSend").attr("cid", "");
          $(".btn_msgSend").attr("uid", "");
          $(".txtMsg").attr("placeHolder","快来评论");
          $(".txtMsg").val("");
          //$(".txtMsg").focus();
        }
      })
    //点击遮罩层删除回复
    $(".btn_cancel").click(function() {
          $(".md-modal").removeClass("md-show");
          $(".md-overlay").removeClass("md-show");
          $(".btn_msgSend").attr("cid", "");
          $(".btn_msgSend").attr("uid", "");
          $(".txtMsg").attr("placeHolder","快来评论");
          $(".txtMsg").val("");
          $(".txtMsg").focus();
      })
    //显示评论框
    $(".btn_txtMsg").click(function() {
      $(".md-modal").addClass("md-show");
      $(".md-overlay").addClass("md-show");
      $(".txtMsg").val("");
      $(".txtMsg").focus();
     })
    /*$(".md-overlay").click(function() {
      $(".md-modal").removeClass("md-show");
      $(".md-overlay").removeClass("md-show");
     })
    $(".btn_cancel").click(function() {
      $(".md-modal").removeClass("md-show");
      $(".md-overlay").removeClass("md-show");
     })*/
    //授权跳转
     $(".txtMsg").click(function(){
      var token=commonCla.analyzParams("token");
      var id=commonCla.analyzParams("id");
      
        if(isWeiXin()){
          if(token=="" || token==undefined){
            var sourceType=$("#hide_source").attr("stype");
            if(sourceType=="reply"){
              /*var msgId=commonCla.analyzParams("cid");
              var userId=$(this).next(".btn_msgSend").attr("uid");
              var params={
                "cid":msgId,
                "uid":userId,
                "ishare":true,
                "source":commonCla.analyzParams("source")
              }
              wx_authorize(params,"comments");*/
            }else{
              var params={
                "id":id,
                "flag":commonCla.analyzParams("flag")
              }
               wx_authorize(params,"post");
            }
         
          }
         
        }
      })
    
}
//初始化列表
var initCmtList=function(data,me){
  var cmtList=data.data.commentList;
  var total=cmtList.totalCount;
  var listPage=$(".cmt_list li").length;
  //时间
  
  var pageData=cmtList.list;

  var liHtml="";
  
  if (pageData.length > 0) {
    var nLength=pageData.length;
    
   for (var i = 0; i < nLength; i++) {
    var repliesHtml="";
    var create_time=timesReview(pageData[i].created_at,currentTime);
    //回复 暂无
    /*if (pageData[i].replies != null) {
        var reply_num=pageData[i].reply_num;
        var reply_num_html="";
        if(reply_num>=2){
          reply_num_html="<p class='reply_num'>查看全部"+reply_num+"条回复</p>"
        }
        repliesHtml+="<div class='reply'>"+
                     " <span class='reply_name'>"+pageData[i].replies.user.name+"：</span>"+
                     " <span>"+pageData[i].replies.content+"</span>"+reply_num_html
                     "</div>"
        //var name = pageData[i].user.name + " <span class='col_grey2'>回复</span> " +pageData[i].replies.answer.name
    }*/
    var name = pageData[i].user_name;
    liHtml += "<li uid='' uname='" + name + "' cid='" + pageData[i].id + "'>" +
      "<div class='cmt_head cmt_reply'><img src='" +reviewHeader(pageData[i].user_headpic)+"'>" +
      "<span class='cmt_name'>" + name + "</span>"+
      "<span class='cmt_data'>" + create_time + "</span>" +
      "</div>" +
      "<div class='cmt_content'>" +
      "<p class='cmt_comment cmt_reply'>" + pageData[i].title +
      "<!--<p class='cmt_reply'>回复</p>-->"+
      " </p>" + repliesHtml +
      "</div>" +
      "</li>"
  }
  setTimeout(function(){
    $(".cmt_list").append(liHtml);
    if(me!=undefined){ me.resetload();}
  },300)
}else{
  //$(".cmt_short").hide();
  if(listPage>0){
    $(".btn_more").html("暂无更多");
  }else{
     $(".cmt_list").html('<div class="tc mt30 pb30"><h1 style="font-size: 1.5rem;">暂无评论</h1><p class="mt20">快来发表第一条评论吧~</p></div>')
     if($("#hide_source").attr("iShare")!="true"){
       $(".btn_more").hide();
     }else{
      $(".btn_more").html("<p class='btn_download'>下载／打开星榜APP</p>");
     }
     
  }
 
}

}
var initPostDom=function(ret,request){
  
  var ret=ret.data.topic;
  var currentTime=ret.systemTime;
  var photos=ret.photos;
  var photoNum=Number(photos.length);
  var photosHtml='';
  for (var i = 0; i < photos.length; i++) {
    photosHtml+='<li><img src="'+photos[i]+'?imageMogr2/gravity/Center/crop/300x300/extent/300x300/background/d2hpdGU="/></li>'
  };
  /*is_like是否点赞 0否；1是*/
  var zan_src='../assets/images/icon-like.png';
  if(ret.is_like==1){
    zan_src='../assets/images/icon-liked.png'
  }
  $("#msg_num").html(commonCla.cWan(ret.comment_num));
  $("#msg_num").attr("comment_num",ret.comment_num);
  $("#like_num").html(commonCla.cWan(ret.like_num));
  $("#like_num").attr("like_num",ret.like_num);
  var picsHtml='<div class="postHead">'+
      '<img class="user_head" src="'+ret.headpic+'">'+
      '<span class="user_name">'+ret.name+'</span><span class="post_time">'+timesReview(ret.created_at,currentTime)+'</span>'+
      '</div>'+
      '<div class="postDesc">'+
        '<div class="postTitle">'+ret.title+'</div>'+
        '<!--<div class="post_btns"><span class="post_time">'+timesReview(ret.created_at,currentTime)+'</span>'+
        '<img src="../assets/images/icon-like.png"><span>'+commonCla.cWan(ret.like_num)+'</span>'+
       ' </div>-->'+
      '</div>'+
      '<ul class="lists style'+photoNum+'">'+photosHtml+'</ul>'

    $("#picsMain").html(picsHtml);
}


var getPostData=function(me){
  var pageNum=Math.ceil($(".cmt_list li").length/10);
  var flag=commonCla.analyzParams("flag");
  var topicId=commonCla.analyzParams("id");
  var params={
    "pageNum":pageNum,
    "pageSize":"10",
    "topicId":topicId,
    "flag":flag
  }
  if(token!="" && token!=undefined){
    params.token=token
  }
  var url=host+"/circleOfFans/commentList";
  commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
    if(ret.reqstate=="0"){
      $("#postMain").show();
      $(".init-loadding").hide();
      $("#news_nav").show();
      if($(".cmt_list li").length<=0){
        initPostDom(ret,request);
        currentTime=ret.data.topic.systemTime;
      }
      initCmtList(ret,me);
      //二次分享
      var topic=ret.data.topic;
      if(isWeiXin()){
        wx_share(topic.title,
          "最新的明星资讯，最权威的明星个人价值榜单，都在这里等你！",
          shareUrlBase+"post/share.html?id="+commonCla.analyzParams("id")+"&flag="+flag,
          topic.photos[0]);
      }
    }else{
       if(ret.reqstate=="3"){
          swal({
              "title":ret.reqmsg,
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

       });
      }else{
        if(ret.reqmsg==""){
          $("body").html("<img src='../assets/images/404-del.png' width='100%' />")

        }else{
          swal({
                "title":ret.reqmsg,
                "animation":"slide-from-top",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",

         });
        }
        
      }
    }
  },params)
}
/* to like */
var toZan=function(){
      var storage = window.localStorage;
      var id=commonCla.analyzParams("id");
      var token=commonCla.analyzParams("token")==undefined?"":commonCla.analyzParams("token");
      var flag=commonCla.analyzParams("flag");
      /*var url=host+"share/like/";*/
      var unlike=$("#share_info").attr("is_like");
      var url=host+"circleOfFans/addLike";
      var params={
        "token":token,
        "topicId":id,
        "flag":flag
      }
        var base_src=$("#like_num").prev("img").attr("src");
        $("#like_num").prev("img").attr("src","../assets/images/loadding.gif");
        //var url="json/like.json";
        commonCla.ajaxCommonFun(url, "post", function(resultData,textStatus,request){
           if(resultData.reqstate=="0"){
            var num=Number($("#like_num").attr("like_num"));
            if(unlike!="true"){
              $("#like_num").prev("img").attr("src","../assets/images/icon-liked.png");
              $("#like_num").html(commonCla.cWan(Number(num)+1));
              $("#like_num").attr("like_num",Number(num)+1);
              $("#share_info").attr("is_like","true");

            }else{             
              if(num>0){
                $("#like_num").prev("img").attr("src","../assets/images/icon-like.png");
                $("#like_num").html(commonCla.cWan(Number(num)-1));
                $("#like_num").attr("like_num",Number(num)-1);
              }
              $("#share_info").attr("is_like","false");

            }
            
           }else if(resultData.reqstate=="3"){
            $("#like_num").prev("img").attr("src",base_src);
            if(isWeiXin()){
              var params={
                "id":id,
                "flag":flag
              }
              wx_authorize(params,"post");
            }else{
              swal({
                "title":resultData.reqmsg,
                "text":"<a class='btn_relogin' >重新登录</a>",
                "html":true,
                "animation":"slide-from-top",
                "showConfirmButton": false
              });
            }
           }else{
            $("#like_num").prev("img").attr("src",base_src);
            swal({
              "title":resultData.reqmsg,
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

            });
           }
        },params)
      
      
      
}
/*评论*/
var paramsClear=function(){
   $(".md-modal").removeClass("md-show");
   $(".md-overlay").removeClass("md-show");
   $(".btn_msgSend").attr("cid", "");
   $(".btn_msgSend").attr("uid", "");
   $(".txtMsg").attr("placeHolder","快来评论");
   $(".txtMsg").val("");
}
var afterComment=function(singleData){
   var msg_num=$("#msg_num").attr("comment_num");
  $("#msg_num").attr("comment_num",Number(msg_num)+1);
  $("#msg_num").html(commonCla.cWan(Number(msg_num)+1))
  var name = singleData.user_name;
  var create_time=timesReview(singleData.created_at,currentTime);
  var liHtml= "<li uid='' uname='" + name + "' cid='" + singleData.id + "'>" +
    "<div class='cmt_head cmt_reply'><img src='" +reviewHeader(singleData.user_headpic)+"'>" +
    "<span class='cmt_name'>" + name + "</span>"+
    "<span class='cmt_data'>" + create_time + "</span>" +
    "</div>" +
    "<div class='cmt_content'>" +
    "<p class='cmt_comment cmt_reply'>" + singleData.title +
    "</div>" +
    "</li>"
  if($(".cmt_list li").length<=0){
      $(".cmt_list").html("");
  }
  $(".cmt_list").prepend(liHtml)

}
var toComment = function(content) {
  var id=commonCla.analyzParams("id");
  var token=commonCla.analyzParams("token");
  var flag=commonCla.analyzParams("flag")

  $(".btn_msgSend").addClass("btn_loadding");
  $(".btn_msgSend").val("");
  $(".btn_msgSend").attr("disabled",true);

  var params = {
    "token":token,
    "topicId":id,
    "topicUserId":"0",
    "title": content,
    "flag":flag
  }
  var url = host + "circleOfFans/addComment";
  commonCla.ajaxCommonFun(url, "get", function(ret,textStatus,request) {
    paramsClear();

    $(".btn_msgSend").removeClass("btn_loadding");
    $(".btn_msgSend").val("发表");
    $(".btn_msgSend").removeAttr("disabled");
    if (ret.reqstate==0) {
      swal({
        "title":"评论成功",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      //getPostData();
      //update
      afterComment(ret.list[0]);

    }else if(ret.reqstate==3){
       swal({
                "title":ret.reqmsg,
                "text":"<a class='btn_relogin' >重新登录</a>",
                "html":true,
                "animation":"slide-from-top",
                "showConfirmButton": false
              });
    } else {
      swal({
        "title":"评论失败",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
    }
   
  }, params)
}
var initPostPage=function(){
  
  //评论
  $(".btn_msgSend").click(function(e){
        if (token == "" || token == undefined) {
          if(isWeiXin()){
            var params={
              "id":id,
              "flag":commonCla.analyzParams("flag")
            }
            wx_authorize(params,"post");
          }else{
            openApp_obj("home");
          }
          
        }else{
          var content = $(".txtMsg").val();
          if (content.trim() == "") {
            swal({
                "title":"请输入评论内容",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",

              });
            return;
          }
          if (content.trim().length>100) {
            swal({
                "title":"评论内容不能超过100个字",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",

              });
            return;
          }
          toComment(content);
        }
    })
 //初始化数据
 // getPostData();
  //放大图片
  $("#postMain").on("click",".lists li",function(){
    var imgs=$("#postMain .lists img");
    $("#postMain").attr("curId",$(this).index())
    var imgLength=$(".bigImgcon .swiper-slide").length;
    //初始化图片
    var imgsHtml="";
    for (var i = 0; i < imgs.length; i++) {
      var url=$(imgs[i]).attr("src").split("!250x250")[0];  
      imgsHtml+='<div class="swiper-slide"><img src="'+url.split("?")[0]+'" width="" style="max-width:100%"/></div>'

     $(".bigImgcon #js_imgList").html(imgsHtml);
    }
      $(".curPhotoNum").html(Number($("#postMain").attr("curId"))+1)
      $(".allPhotosNum").html(imgs.length);
      $("#postMain").hide();
      $("#news_nav").hide();
      $(".bigImgcon").show();

      mySwiper = new Swiper ('.swiper-container', {
      initialSlide :$("#postMain").attr("curId"),
      preventClicks:false,
      loop:false,
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      onTransitionEnd: function(swiper){
        //var curSrc=$(".swiper-slide-active img").attr("src").split("!750x0")[0];
        $(".curPhotoNum").html(Number(swiper.activeIndex)+1);
      }
    })
   

    
    
  })
  //关闭大图
  $(".bigImg_tit").click(function(){
    $("#postMain").show();
    $("#news_nav").show();
    $(".bigImgcon").hide();
     mySwiper.destroy(true,true);
  })
  //评论
  $(".cmt_list").html("");
 // getCommentData();
  //加载更多评论
  $("#btn_more_comment").click(function(){
      getCommentData();
    })
  //点击评论跳转
  $(".cmt_short").on("click", "li .reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      var iShare=$("#hide_source").attr("ishare")!=undefined?"&ishare="+$("#hide_source").attr("ishare"):"";
      window.location.href="../comments/commentList.html?uid="+uid+"&source=post&cid="+cid+"&token="+token+iShare;
      return;
    })
  //点赞
  $("#zanArea").click(function(){
    var token=commonCla.analyzParams("token");
    if (token == "" || token == undefined) {
      if(isWeiXin()){
        var id=commonCla.analyzParams("id");
          var params={
            "id":id,
            "flag":commonCla.analyzParams("flag")
          }
          wx_authorize(params,"post");

      }else{
        openApp_obj("home");
      }
         
      }else{
        toZan();
      }
      
      
    })
}
$(function(){
  commentFun();
  initPostPage();
  $('.pageMain').dropload({
      scrollArea : $('.pageMain'),
      loadDownFn : function(me){
          getPostData(me);
      }
  });

 /*$(".pageMain").scroll(function() {
    //当内容滚动到底部时加载新的内容
    var domHeight= $(".picsMain").height()+ $(".cmt_short").height();
    //console.log($(this).scrollTop()+$(window).height()-100+"/"+domHeight +"/"+$(this).scrollTop())
    //console.log($(this).scrollTop()+$(window).height()-100>= domHeight)
    if ($(this).scrollTop()+$(window).height()-130>= domHeight && $(this).scrollTop() > 150) {
      //当前要加载的页码
      getPostData();
     
    }
  });*/
	
})