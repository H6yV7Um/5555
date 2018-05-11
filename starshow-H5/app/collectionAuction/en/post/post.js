var host=commonCla.hostBase+"/";
//初始化
var token_login="";
var id=commonCla.analyzParams("id");
var token=commonCla.analyzParams("token");

var initPostDom=function(ret,request){
  var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
  var photos=ret.photos;
  var photoNum=Number(photos.length);
  var photosHtml='';
  for (var i = 0; i < photos.length; i++) {
    photosHtml+='<li><img src="'+photos[i]+'!300x300"/></li>'
  };
  /*is_like是否点赞 0否；1是*/
  var zan_src='../assets/images/icon/icon-zan.png';
  if(ret.is_like==1){
    zan_src='../assets/images/icon/icon-zan-red.png'
  }
  var picsHtml='<div class="postHead">'+
      '<img class="user_head" src="'+ret.user.head_pic+'">'+
      '<span class="user_name">'+ret.user.name+'</span>'+
      '<div class="fr"><img class="btn_zan tada animated"  src="'+zan_src+'"  width="25"><span num="'+ret.like_num+'">'+commonCla.cWan(ret.like_num)+'</span>'+
      '</div></div>'+
      '<ul class="lists style'+photoNum+'">'+photosHtml+'</ul>'+
      '<div class="postDesc">'+
        '<div class="postTitle">'+ret.content+'</div>'+
        '<div class="post_btns"><span class="post_time">'+timesReview(ret.created_at,currentTime)+'</span>'+
        '<img src="../assets/images/icon/icon-eye.png"><span>'+commonCla.cWan(ret.watch_num)+'</span>'+
       ' </div>'+
      '</div>'

    $("#picsMain").html(picsHtml);
}


var getPostData=function(){
  var url=host+"post/"+id+"?token="+token;
  commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
    if(textStatus=="success"){
      $("#postMain").show();
      $(".init-loadding").hide();
      $("#news_nav").show();
      initPostDom(ret,request);
      //二次分享
      if(isWeiXin()){
        wx_share("[HOT item]",
          ret.content,
          "http://s.cangpai.lookmetv.com/en/post/share.html?id="+commonCla.analyzParams("id"),
          ret.photos[0]);
      }
    }else{
       if(ret.status=="404"){
         $("body").html("<img src='../assets/images/404.png'/>")
        }else{
          swal({
              "title":JSON.parse(ret.responseText).error,
              "animation":"slide-from-top",
              "confirmButtonText":"OK",
              "confirmButtonColor": "#ff1d3e",

       });
      }
    }
  })
}
var toZan=function(){
  var url=host+"post/"+id+"/like?token="+token;
  commonCla.ajaxCommonFun(url,"post",function(ret,textStatus,request){
    if(textStatus=="success"){
      var txt_tip="";
      var num=Number($(".btn_zan").next("span").attr("num"));
      /*if($(".btn_zan").next("span").html().indexOf("万")!=-1){
         num=Number($(".btn_zan").next("span").html().split("万")[0]*10000);
      }*/
      if($(".btn_zan").attr("src")=="../assets/images/icon/icon-zan-red.png"){
        $(".btn_zan").attr("src","../assets/images/icon/icon-zan.png");
        txt_tip="Cancel Like Praise successful";

        $(".btn_zan").next("span").html(num-1);
        $(".btn_zan").next("span").attr("num",num-1);
        setTimeout(function(){
          $(".btn_zan").next("span").html(commonCla.cWan( $(".btn_zan").next("span").html()));
        },1000)
      }else{
        $(".btn_zan").attr("src","../assets/images/icon/icon-zan-red.png");
        txt_tip="Like Praise successful";
        $(".btn_zan").next("span").html(num+1);
        $(".btn_zan").next("span").attr("num",num+1);
	       setTimeout(function(){
          $(".btn_zan").next("span").html(commonCla.cWan( $(".btn_zan").next("span").html()));
        },1000)
      }
      
      /*swal({
              "title":txt_tip,
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

       });*/
    }else{
      swal({
              "title":JSON.parse(ret.responseText).error,
              "animation":"slide-from-top",
              "confirmButtonText":"OK",
              "confirmButtonColor": "#ff1d3e",

       });
    }
  })
}
var initPostPage=function(){
 //初始化数据
  getPostData();
  //放大图片
  $("#postMain").on("click",".lists li",function(){
    var imgs=$("#postMain .lists img");
    $("#postMain").attr("curId",$(this).index())
    var imgLength=$(".bigImgcon .swiper-slide").length;
    //初始化图片
    var imgsHtml="";
    for (var i = 0; i < imgs.length; i++) {
      var url=$(imgs[i]).attr("src").split("!250x250")[0];  
      imgsHtml+='<div class="swiper-slide"><img src="'+url.split("!300x300")[0]+'!750x0" width="100%"/></div>'

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
  getCommentData();
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
  $("#postMain").on("click",".btn_zan",function(){
    if (token == "" || token == undefined) {
        var id=commonCla.analyzParams("id");
          var params={
            "id":id,
          }
          wx_authorize(params,"post");
      }else{
        toZan();
      }
      
      
    })
}
$(function(){
  initPostPage();
   /*$(".txtMsg").click(function() {
      var $element=$(".sendMsg");
      setTimeout(function(){
       var viewTop = $(window).scrollTop();
      $(window).scrollTop(viewTop+"74"); // 调整value
      $(".txtMsg").focus();
      },500)
    });*/
	
})