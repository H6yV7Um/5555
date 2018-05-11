var host=commonCla.hostBase+"/";
var host_bridge="";
var token=commonCla.analyzParams("token");
//设置WebViewJavascriptBridge通信回调方法
/*setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法token
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    host_bridge=bridge;
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') {
          //登录状态保存
        if (jwt_token == "" || token!=data.token) {
          token_login = data.token;
          token = data.token;
        }
        //初始化页面
        window.location.href="commentList.html?id="+commonCla.analyzParams("id")+"&jwt_token="+data.token
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
  clientFun(bridge);
   
})*/
var isOursPic=function(url){
  var mark_url="";
  if(url.indexOf("collection-auction.b0.upaiyun.com")!=-1){
    mark_url="!250x250"
  }
  return mark_url
}
var nextStepFun_reply=function(data){
  if (data.nextStep == '3') {
          //登录状态保存
        if (token == "" || token!=data.token) {
          token_login = data.token;
          token = data.token;
        }
        //初始化页面
        var source=commonCla.analyzParams("source");
	var cid=commonCla.analyzParams("cid");
	var uid=commonCla.analyzParams("uid");
        window.location.href="commentList.html?uid="+uid+"&source="+source+"&cid="+cid+"&token="+data.token+"&iShare=false";
    }
}
var clientFun_reply=function(bridge){
  //发表评论
    $(".btn_msgSend").click(function(e){
      var msgId=$(this).attr("cid");
      var userId=$(this).attr("uid");
      var id=commonCla.analyzParams("id");
      token=commonCla.analyzParams("token");
      if($("#hide_source").attr("stype")=="reply"){
      var actionNum=1;
      var nextStepNum=3;
      }else{
       var actionNum=1;
       var nextStepNum=1;
      }
      if (token == "" || token == undefined) {
         e.preventDefault()
         setBridgeCallHandler(bridge, {
          'action': actionNum,
          'nextStep': nextStepNum,
          'id':commonCla.analyzParams("id")
         })
      }else{
        $("#msg_overlay").css("display", "none");
        token_login = token;
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
        //执行
        if(msgId=="" || userId=="" || userId==undefined || msgId==undefined){
           if($("#hide_source").attr("stype")=="reply"){
            $(".btn_msgSend").attr("cid", $(".cmt_list li").eq(0).attr("cid"));
            $(".btn_msgSend").attr("uid", $(".cmt_list li").eq(0).attr("uid"));   
            toReply(content);
           }else{
            toComment(content);
             //定位到评论
		location.href = "#comment";  
           }
          
          }else{ 
           toReply(content);
          }
    } 
   
  })

}

/*
*评论
*/
var initUrl=function(type){
  var source_path=$("#hide_source").attr("source");
  if(source_path==undefined){
  	source_path=commonCla.analyzParams("source");
  }
  var id=commonCla.analyzParams("id");
  var token=commonCla.analyzParams("token");
  var url="";
  if(type=="toComment"){
   url=host + source_path+"/" + id + "/comment?token="+token;;
  }else if(type=="toReply"){
  	var cid=$(".btn_msgSend").attr("cid");
    url = host + source_path+"Comment/" + cid + "/reply?token="+token;

  }else if(type=="replyList"){
  	var cid=commonCla.analyzParams("cid");
  	url=host+source_path+"/"+cid+"/replyList";

  }else if(type=="commentList"){
  	url=host+source_path+"/"+id+"/comments";
  }

  return url;
}
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
              var msgId=commonCla.analyzParams("cid");
              var userId=$(this).next(".btn_msgSend").attr("uid");
              var params={
                "cid":msgId,
                "uid":userId,
                "ishare":true,
                "source":commonCla.analyzParams("source")
              }
              wx_authorize(params,"comments");
            }else{
              var params={
                "id":id,
              }
              if(commonCla.analyzParams("source")=="news" || $("#hide_source").attr("source")=="news"){
                wx_authorize(params,"news");
              }else{
                wx_authorize(params,"post");
              }
              
            }
         
          }
         
        }
      })
    
}
var toComment = function(content) {
  var id=commonCla.analyzParams("id");

  $(".btn_msgSend").addClass("btn_loadding");
  $(".btn_msgSend").val("");
  $(".btn_msgSend").attr("disabled",true);


  var params = {
    "content": content,
  }
  //var url = host + "news/" + id + "/comment?token="+token;
  var url=initUrl("toComment");
  commonCla.ajaxCommonFun(url, "post", function(resultData,textStatus,request) {
    paramsClear();

    $(".btn_msgSend").removeClass("btn_loadding");
    $(".btn_msgSend").val("发表");
    $(".btn_msgSend").removeAttr("disabled");
    if (textStatus=="success") {
      swal({
        "title":"评论成功",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      afterComment(resultData,request);

    }else if(resultData.status == "422"){
      swal({
        "title":"评论失败",
        "text":"不能回复自己的评论~",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

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
var paramsClear=function(){
   $(".md-modal").removeClass("md-show");
   $(".md-overlay").removeClass("md-show");
   $(".btn_msgSend").attr("cid", "");
   $(".btn_msgSend").attr("uid", "");
   $(".txtMsg").attr("placeHolder","快来评论");
   $(".txtMsg").val("");
}
var afterComment=function(ret,request){
//时间
      var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
      var create_time=timesReview(ret.created_at,currentTime);
      if($(".cmt_short").css("display")=="none"){
        $(".cmt_short").show();
      }
      if($(".btn_more").css("display")=="none" && $("#hide_source").attr("iShare")=="true"){
        $(".btn_more").show();
        $(".cmt_list").html("");
      }
      var chtml="<li uid='" + ret.user.id + "'uname='" + ret.user.name + "' cid='" + ret.id + "'>" +
          "<div class='cmt_head cmt_reply'><img src='" + ret.user.head_pic +isOursPic(ret.user.head_pic )+ "'>"+
          "<span class='cmt_name'>" + ret.user.name + "</span>" +
          "<span class='cmt_data'>" + ret.created_at + "</span>" +
          "</div>" +
          "<div class='cmt_content'>" +   
          "<p class='cmt_comment cmt_reply'>" + ret.content+
          "<!--<p class='cmt_reply'>回复</p>-->"+
          " </p>"
          "</div>" +
          "</li>"
       if($(".cmt_list li").length<=0){
          $(".cmt_list").html(chtml);
        }else{
          $(".cmt_list").prepend(chtml);
        }
       $(".msg_num").html(Number($(".msg_num").html())+1);
       $("#comment_num").html(Number($("#comment_num").html())+1);
       $(".btn_msgSend").attr("cid", "");
       $(".btn_msgSend").attr("uid", "");
       $(".txtMsg").attr("placeHolder","快来评论");

       

}
var toReply=function(content){
  var id=commonCla.analyzParams("id");
  var cid="";
  /*if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
    cid=$(".btn_msgSend").attr("cid");
  }else{
     cid=commonCla.analyzParams("cid");
  }*/
   cid=$(".btn_msgSend").attr("cid");
   $(".btn_msgSend").addClass("btn_loadding");
   $(".btn_msgSend").val("");
   $(".btn_msgSend").attr("disabled",true);

  var replyId=$(".btn_msgSend").attr("cid");
  var uid=$(".btn_msgSend").attr("uid");
  var params = {
    "content": content,    
    "replyId": replyId,
    "answerId": uid
  }
  /*var url = host + "newsComment/" + cid + "/reply?token="+token;*/
  var url=initUrl("toReply");
  commonCla.ajaxCommonFun(url, "post", function(resultData,textStatus,request) {
    paramsClear();

    $(".btn_msgSend").removeClass("btn_loadding");
    $(".btn_msgSend").val("发表");
    $(".btn_msgSend").removeAttr("disabled");
    if (textStatus=="success") {
      swal({
        "title":"回复成功",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      //afterComment(resultData);
      if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
        $(".cmt_list").html("");
        getCommentData();
      }else{
        $(".cmt_list").html("");
        getReplayData();
      }
    //comment +1
    $("#comment_num").html(Number($("#comment_num").html())+1)
    $(".btn_msgSend").attr("cid", "");
    $(".btn_msgSend").attr("uid", "");
    $(".txtMsg").attr("placeHolder","快来评论");

     

    }else {
      swal({
          "title":"评论失败",
          "text":JSON.parse(resultData.responseText).error,
          "animation":"slide-from-top",
          "confirmButtonText":"确定",
          "confirmButtonColor": "#ff1d3e",

        });
    }
  }, params)

}
//头条内初始化评论数据
var getCommentData=function(){
  var listPage= $(".cmt_list li").length;
  var news_id=commonCla.analyzParams("id");
  /*var url=host+"news/"+news_id+"/comments";*/
  var url=initUrl("commentList");
  var params={
    "current_count":listPage
  }
  
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      //$(".msg_num").html(data.total)
      //时间
      var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
      
      var pageData=data.page_data;var liHtml="";
      $(".msg_num").html(data.comment_num);
      if (pageData.length > 0) {
      	var nLength=pageData.length;
      	if($("#hide_source").attr("iShare")=="true" && pageData.length>5){
      		nLength=5;
      		$(".cmt_list").html("");
      	}
        if(listPage+15>data.total){
          $("#btn_more_comment").hide();
        }
       for (var i = 0; i < nLength; i++) {
        var repliesHtml="";
        var create_time=timesReview(pageData[i].created_at,currentTime);
        if (pageData[i].replies != null) {
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
        }
        var name = pageData[i].user.name;
        liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
          "<div class='cmt_head cmt_reply'><img src='" + pageData[i].user.head_pic +isOursPic(pageData[i].user.head_pic)+"'>" +
          "<span class='cmt_name'>" + name + "</span>"+
          "<span class='cmt_data'>" + create_time + "</span>" +
          "</div>" +
          "<div class='cmt_content'>" +
          "<p class='cmt_comment cmt_reply'>" + pageData[i].content +
          "<!--<p class='cmt_reply'>回复</p>-->"+
          " </p>" + repliesHtml +
          "</div>" +
          "</li>"
      }
      $(".cmt_list").append(liHtml);
    }else{
      //$(".cmt_short").hide();
      if(listPage>0){
        $(".btn_more").html("暂无更多");
      }else{
         $(".cmt_list").html('<div class="tc mt30 pb30"><h1 style="font-size: 1.5rem;">暂无评论</h1><p class="mt20">快来发表第一条评论吧~</p></div>')
         if($("#hide_source").attr("iShare")!="true"){
           $(".btn_more").hide();
         }else{
          $(".btn_more").html("<p class='js_btn_down'>下载／打开藏拍APP</p>");
         }
         
      }
     
    }
   }
  },params)
}

//初始化回复列表
var initReplyDom=function(data,request){
//时间
      var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
      var create_time=timesReview(data.created_at,currentTime);
  var pageData=data.page_data;var liHtml="";
  if (pageData.length > 0) {
    liHtml="<li class='bg_white' uid='" + data.user.id + "'uname='" + data.user.name + "' cid='" + data.id + "'>" +
      "<div class='cmt_head'><img src='" + data.user.head_pic + isOursPic(data.user.head_pic)+"'>"+
      "<span class='cmt_name'>" + data.user.name  + "</span>" +
      "<span class='cmt_data'>" + create_time + "</span>" +
      "<img src='icon-msg-top.png' class='icon_top'/>"+
      "</div>" +
      "<div class='cmt_content'>" +
      "<p class='cmt_comment'>" + data.content +
      "<!--<p class='cmt_reply'>回复</p>-->"+
      " </p>"
      "</div>" +
      "</li>"
   for (var i = 0; i < pageData.length; i++) {
    var name = pageData[i].user.name;
    var create_time2=timesReview(pageData[i].created_at,currentTime);
    liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
      "<div class='cmt_head cmt_reply'><img src='" + pageData[i].user.head_pic + isOursPic(pageData[i].user.head_pic)+"'>"+
      "<span class='cmt_name'>" + name + "</span>" +
      "<span class='cmt_data'>" + create_time2 + "</span>" +
      "</div>" +
      "<div class='cmt_content'>" +
      "<p class='cmt_comment cmt_reply'><span class='col_grey'>回复<span class='reply_name'>"+pageData[i].asker.name+"：</span></span>" + pageData[i].content +
      "<!--<p class='cmt_reply'>回复</p>-->"+
      " </p>"
      "</div>" +
      "</li>"
  }
     $(".cmt_list").append(liHtml);
     //默认回复第一条
      $(".btn_msgSend").attr("uid", data.user.id);
      $(".btn_msgSend").attr("cid", data.id);
  }
  //判断是否显示查看更多按钮
  var current_count=$(".cmt_list li").length-1;
  if(current_count<15){
     $("#btn_more").hide();
  }else{
    if(current_count<data.total){
      $("#btn_more").show();
      $("#btn_more").html("<p>点击加载更多</p>");
    }else{
      $("#btn_more").hide();
    }
   
  }
  

}
var getReplayData=function(){
    var current_count=$(".cmt_list li").length-1<=0?0:$(".cmt_list li").length;
  var cid=commonCla.analyzParams("cid");
  var uid=commonCla.analyzParams("uid");
  /*var url=host+"news/"+cid+"/replyList?current_count="+current_count;*/
   var url=initUrl("replyList")+"?current_count="+current_count;
  commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
    $(".postMain").show();
    $(".init-loadding").hide();
    $(".news_nav").show();
    if(textStatus=="success"){
      initReplyDom(ret,request);
      if( iShare=commonCla.analyzParams("ishare")=="true"){
       $("title").html(ret.total+"条回复")
      }else{
         $("title").html(ret.total+"条回复&0")
      }
     
    }
    
  })

 
}


$(function(){
	commentFun();
	var sourceType=$("#hide_source").attr("stype");
  var iShare="";
    if(sourceType=="reply"){
      iShare=commonCla.analyzParams("ishare");
	    $(".cmt_list").html("");
	     getReplayData();
	     //加载更多
	     $("#btn_more").click(function(){
	       getReplayData();
	     })  
   }else{
    iShare=$("#hide_source").attr("iShare");
   }
   if(iShare=="true"){
          //发表评论
          $(".btn_msgSend").click(function(e){
            var msgId=$(this).attr("cid");
            var userId=$(this).attr("uid");
            var id=commonCla.analyzParams("id");
            token=commonCla.analyzParams("token");

            if (token == "" || token == undefined) {
                var sourceType=$("#hide_source").attr("stype");
                if(sourceType=="reply"){
                      var params={
                          "cid":msgId,
                          "uid":userId,
                          "ishare":true,
                          "source":commonCla.analyzParams("source")
                        }
                        wx_authorize(params,"comments");
                    }else{
                      var params={
                        "id":id,
                      }
                      if(commonCla.analyzParams("source")=="news" || $("#hide_source").attr("source")=="news"){
                          wx_authorize(params,"news");
                        }else{
                          wx_authorize(params,"post");
                        }
                    }
             /* if (isWeiXin()){
                
               
              }else{
                 
                //注册页面
                   // window.location.href = "https://lookmetv.com/starshow5.0/news/v5/reg.html?id=" + id+"&source=news"
              }*/
            }else{
              $("#msg_overlay").css("display", "none");
              token_login = token;
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
              //执行
              if(msgId=="" || userId=="" || userId==undefined || msgId==undefined){
                 if($("#hide_source").attr("stype")=="reply"){
                  $(".btn_msgSend").attr("cid", $(".cmt_list li").eq(0).attr("cid"));
                  $(".btn_msgSend").attr("uid", $(".cmt_list li").eq(0).attr("uid"));   
                  toReply(content);
                 }else{
                  toComment(content);
                 }
                
                }else{ 
                 toReply(content);
                }
          } 
          //定位到评论
          location.href = "#comment";  
        })
    }else{
      //$(".cmt_list").css("padding-top","64px")
    }
   
})