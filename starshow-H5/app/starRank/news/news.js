var host=commonCla.hostBase+"/";
var shareUrlBase=commonCla.shareUrlBase;
var new_id=commonCla.analyzParams("id");
var currentTime="";
var token=commonCla.analyzParams("token");

/*
*客户端交互
*/
var nextStepFun=function(data,bridge){

  //活动分享
  var shareActivity=function(){
      var title=$("#share_info").attr("title");
      var cover=$("#share_info").attr("cover");
      var share_url=$("#share_info").attr("shareurl");
      var content=$("#share_info").attr("content");
        
    setBridgeCallHandler(bridge, {
      'action': '3',
      'share': {
        'share_url': share_url,
        'title': title,
        'content': content,
        'cover': cover
      }
    })
  }
 if (data.nextStep == '1') {
          //登录状态保存
        if (token == "" || token!=data.token) {
          token_login = data.token;
          token = data.token;
        }
        //初始化页面
        window.location.href="detail.html?id="+commonCla.analyzParams("id")+"&token="+data.token
    }
    if(data.nextStep=="share"){
        shareActivity();
      }
}
var clientFun=function(bridge){

 
  //评论
  $(".btn_msgSend").click(function(e){
        if (token == "" || token == undefined) {
           e.preventDefault()
           setBridgeCallHandler(bridge, {
            'action': '1',
            'nextStep': '1',
            'id':commonCla.analyzParams("id")
           })
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
  //点赞
  $("#zanArea").click(function(e){
    var token=commonCla.analyzParams("token");
    if (token == "" || token == undefined) {
         e.preventDefault()
         setBridgeCallHandler(bridge, {
          'action': '1',
          'nextStep': '1',
          'id':commonCla.analyzParams("id")
         })
      }else{
        tapLike();
      }
   })
  //重新登陆
    $("body").on("click",".btn_relogin",function(e){
      setBridgeCallHandler(bridge, {
      'action': '10',
      'nextStep': '1',
      'id':commonCla.analyzParams("id")
      })

  })
  
  //放大图片
  /*  action = 5
      position
      photos*/
        //放大图片
  $("body").on("click","#newContent img",function(e){
        var imgVal=$(this).attr("src");
        var thisNumber=initPhotoalbum().imgDataNumber[imgVal];
        //var resutlData=JSON.stringify({"photos":initPhotoalbum().imgListData,"position":thisNumber});
          e.preventDefault()
          setBridgeCallHandler(bridge, {
            'action': '5',
            'position': thisNumber,
            'photos':initPhotoalbum().imgListData
           })
  })

}
/* to like */
var tapLike=function(){
      var storage = window.localStorage;
      var id=commonCla.analyzParams("id");
      var token=commonCla.analyzParams("token")==undefined?"":commonCla.analyzParams("token");
      /*var url=host+"share/like/";*/
      var unlike=$("#share_info").attr("is_like");
      var url=host+"circleOfFans/addLike";
      var params={
        "token":token,
        "topicId":id,
        "flag":3
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
                var params={"id":commonCla.analyzParams("id")}
                wx_authorize(params,"news");
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
            if(sourceType=="reply"){//暂无
             /* var msgId=commonCla.analyzParams("cid");
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
              }
              wx_authorize(params,"news");
              
            }
         
          }
         
        }
      })
    
}
var initPhotoalbum=function(){
   var imgDataNumber;
   var imgListData;
    var imgList=$("#newContent img");
    imgDataNumber=new Map();
    imgListData=[];
    for (var i = 0; i < imgList.length; i++) {
      var img_src=$(imgList[i]).attr("data-echo");
      imgDataNumber[img_src]=i;
      imgListData[i]=img_src;
    };
    var imgObj={
      "imgDataNumber":imgDataNumber,
      "imgListData":imgListData,
    };
    return imgObj;
  }
var removeLoadding=function(){
      $(".pageMain").show();
      $(".loadding").hide();  
      $(".news_nav").show();
}
var initShareInfo=function(data){
     var data=data.data.topic;
    $("#share_info").attr("content","星榜！");
    $("#share_info").attr("new_id",data.id);
    $("#share_info").attr("is_like",data.like);
    $("#share_info").attr("title",data.news_title);
    $("#share_info").attr("cover",data.news_cover);
    $("#share_info").attr("shareUrl",shareUrlBase+"news/share.html?id="+new_id);
}
var countHeight=function(obj){
    var img_width=$(obj).attr("data-w");
    var img_height=$(obj).attr("data-h");
    var auto_width=$(window).width()*0.9; 
    var tag=$(obj).attr("present");
    if(tag==undefined || tag=="" || tag==null){
      var parentEls = $(obj).parents()
        .map(function () { 
          var p_width=this.style.width.split("%")[0];
          var width=auto_width*p_width/100;
          if(width>0){
          return width; 
          }
              
      });
      auto_width=Math.min.apply(null,parentEls);
      if(img_width>$(window).width()*0.9){
        if(auto_width>$(window).width()*0.9){
          auto_width=$(window).width()*0.9
        }
         var auto_height=img_height/img_width*auto_width;
         $(obj).attr("width",auto_width+"px");
         if(auto_height!=0){
          $(obj).attr("height",auto_height+"px");
         }
         
      }else{
        if(img_width!=0 || img_width!=0){
          $(obj).attr("width",img_width+"px");
          $(obj).attr("height",img_height+"px");
        }
        
      }
    }else{
      var auto_height=auto_width*tag;
      $(obj).attr("height",auto_height+"px");
    }
}
//转换为dom对象
var parseDom=function(arg) { 
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
}

var changeLink=function(obj){
  var html=$(obj).find("urltitle").html();
  $(obj).css("background-size","20px");
  $(obj).css("display","block");
  if(html.length>15){ 
    $(obj).html(html.substr(0,6)+"..."+html.substr(6,6)+"-网页链接");
  }
}
var reviewContent=function(data_content){
    var content =parseDom(data_content);
    //var share_con =""?data.title:$(content).find(".newContent").text().trim().substr(0,30);
    
    //图片处理 占位
    var imgList=$(content).find("img");
    for (var i = 0; i < imgList.length; i++) {
      var trueSrc=imgList[i].src;
      if($(imgList[i]).parents(".prodCon").html()==undefined){
        $(imgList[i]).attr("data-echo",trueSrc);
        $(imgList[i]).attr("src","../assets/images/defalut_cover.png");
        //计算宽高
        countHeight(imgList[i]);
        $(imgList[i]).css("display","block");
        $(imgList[i]).css("margin","0 auto");
      }
    }
  //处理链接
  var linkList=$(content).find(".urlstyle");
  for (var i = 0; i < linkList.length; i++) {
  changeLink(linkList[i])
  };

  return $(content).html();
}
var initNewsDom=function(data,content){
    var data=data.data.topic;
    if($("#hide_source").attr("ishare")=="true"){
      $("title").html(data.news_title); 
    }else{
      $("title").html(data.news_title+"&1&1"); 
    }
    $("#msg_num").html(data.comment_num);
    $("#msg_num").attr("comment_num",data.comment_num);
    $("#like_num").html(commonCla.cWan(data.like_num));
    $("#like_num").attr("like_num",data.like_num);
    //时间
    //var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
    var create_time=timesReview(data.created_at,currentTime);
    var labelsHtml="";var label_isBlock="none";
    //标签
    var labels=data.tags;
    if(labels!=null && labels.length>0){
        $(".labelTit").show();
        var labelsHtml="";
        for (var i = 0; i < labels.length; i++) {
        labelsHtml+="<li labelId='"+labels[i].id+"'><span>#</span>"+labels[i].name+"<span>#</span></li>"
        };
    }
    if(labelsHtml!=""){label_isBlock=""};
    //计算banner高度
    var bannerHeight=$(window).width()/750*563;
    //对内容进行处理
    var content=reviewContent(content);
    var userName="";
    /*if(data.third_party_id!=0){
    userName="本文著作权归：<span style='border-bottom:1px solid #ff1d3e'>"+data.user.name+"</span>所有";
    }*/
   //dom
   
   var newsHtml=
    '<section class="news_banner">'+
      '<img src="'+data.news_cover+'" width="100%"/>'+
    '</section>'+
    '<div class="mt10 n-title">'+
      '<p id="content-title">'+data.news_title+'</p>'+
    '</div>'+
    '<div class="article-info"><span>'+(data.source==null?"星榜":data.source)+'</span><span>'+data.publish_time+'</span><span>'+data.read_amount+'人阅读</span></div>'+
    '<section id="newContent" class="newContent newContent2">'+content+'</section>'+
    '<div class="f14r tl w90_persent col_grey mt20">'+userName+'</div>'+
    '<!--标签-->'+
    '<h3 class="labelTit '+label_isBlock+'">相关标签：</h3>'+
    '<ul class="labelsCon">'+labelsHtml+'</ul>'+
    '<!--<div class="tl w90_persent col_grey">浏览 <span class="watch_num" ></span><span class="ml10 watch_num" >喜欢 '+commonCla.cWan(data.like_num)+'</span></div>-->'

    //赋值
    $(".newCons").html(newsHtml);

    if(data.like=="true"){
      $(".zan").attr("src","../assets/images/icon-liked.png");
    }
    $("#like_num").html(commonCla.cWan(data.like_num));
    $("#like_num").attr("like_num",data.like_num)
    Echo.init({target:"newsMain"});
    
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
//初始化数据
var initContents=function(data){
  //填充分享数据;
  initShareInfo(data);
  currentTime=data.data.topic.systemTime;
  var url=data.data.topic.news_link;
  commonCla.ajaxCommonFun(url,"get",function(ret){
    initNewsDom(data,ret.description)
  })
}
var getCommentsData=function(me){
  //id=cmt_list

  var pageNum=Math.ceil($(".cmt_list li").length/10);
  
  var params={
    "pageNum":pageNum,
    "pageSize":"10",
    "topicId":new_id,
    "flag":"3"
  }
  if(token!=""){
    params.token=token
  }
  var url=host+"circleOfFans/commentList";
  commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
      removeLoadding();
      //0为查询数据正常,1为查询无数据,2为查询出错
      if(ret.reqstate=="0"){
        if($(".cmt_list li").length<=0 && $(".newCons").html()==""){
          //初始化内容
          initContents(ret);
        }
        initCmtList(ret,me);
        //二次分享
        if(isWeiXin()){
          wx_share( $("#share_info").attr("title"),
            $("#share_info").attr("content"),
            $("#share_info").attr("shareurl"),
            $("#share_info").attr("cover"));
        }
      }else if(ret.reqstate==3){
	      swal({
                "title":ret.reqmsg,
                "text":"<a class='btn_relogin' >重新登录</a>",
                "html":true,
                "animation":"slide-from-top",
                "showConfirmButton": false
              });
      }else if(ret.reqstate==2){
        $("body").html("<img src='../assets/images/404-del.png' width='100%' />")
        
      }else{
       // $("body").html("<img src='../assets/images/404-noNetwork.png' width='100%' />")
      }
  },params)
}
//评论
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

  $(".btn_msgSend").addClass("btn_loadding");
  $(".btn_msgSend").val("");
  $(".btn_msgSend").attr("disabled",true);

  var params = {
    "token":token,
    "topicId":id,
    "topicUserId":"0",
    "title": content,
    "flag":"3"
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
      //getCommentsData();
      afterComment(ret.list[0])

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
var shareFun=function(){
  //点赞
  $("#zanArea").click(function(){
    var token=commonCla.analyzParams("token");
    if (token == "" || token == undefined) {
         var id=commonCla.analyzParams("id");
          
          if(isWeiXin()){
            var params={
              "id":id,
            }
            wx_authorize(params,"news");
          }else{
             openApp_obj("home");
          }
      }else{
        tapLike();
      }
      
      
    })
  //评论
  $(".btn_msgSend").click(function(e){
        if (token == "" || token == undefined) {
          if(isWeiXin()){
            var params={"id":commonCla.analyzParams("id")}
            wx_authorize(params,"news");
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
    $("body").on("click",".btn_relogin",function(){
    	var params={"id":commonCla.analyzParams("id")}
    	 wx_authorize(params,"news");
    })
}
$(function(){
  //分享页发表评论
  var iShare=$("#hide_source").attr("iShare");
  if(iShare=="true"){
    shareFun();
  }
    



  commentFun();
  //初始化数据
  //getCommentsData();
  $('.pageMain').dropload({
      scrollArea : $('.pageMain'),
      loadDownFn : function(me){
          getCommentsData(me);
      }
  });
  /*$(".pageMain").scroll(function() {
    //当内容滚动到底部时加载新的内容
    var domHeight= $(".newCons").height()+ $(".cmt_short").height();
    if ($(this).scrollTop()+$(window).height()-100>= domHeight && $(this).scrollTop() > 150) {
      setTimeout(function(){
        //当前要加载的页码
        getCommentsData();
      },300)
    }
  });*/
})