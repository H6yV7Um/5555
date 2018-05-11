var host = commonCla.hostBase + "/v9/";
var jwt_token_login = "";
var user_id_login = "";

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
function is_qq() {
  if (ua.match(/QQ/i) == "qq") {
    return true;
  } else {
    return false;
  }
}
var initCommentHtml = function(resultData) {
  $("#hide_total").val(resultData.data.total);
  var liHtml = ""
  var repliesHtml = "";
  var pageData = resultData.data.page_data;
  if (pageData.length > 0) {
    $(".cmtArea").css("background", "#ffffff");
    $("body").css("background", "#ffffff");
    for (var i = 0; i < pageData.length; i++) {
      if (pageData[i].answer != null) {
        /*repliesHtml+="<div class='reply'>"+
                  " <p>"+pageData[i].replies.user_name+"：</p>"+
                  " <p>"+pageData[i].replies.content+"</p>"+
                  "</div>"*/
        var name = pageData[i].user.name + " <span class='col_grey2'>回复</span> " +
          pageData[i].answer.name
      } else {
        var name = pageData[i].user.name;
      }

      liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
        "<div class='cmt_head fl'><img src='" + pageData[i].user.head_pic + "'></div>" +
        "<div class='cmt_content fr'>" +
        "<p class='cmt_name'>" + name + "</p>" +
        "<p class='cmt_data'>" + pageData[i].created_at + "</p>" +
        "<p class='cmt_comment'>" + pageData[i].content +
        " </p>" + repliesHtml +
        "</div>" +
        "</li>"
    }
  } else if ($(".cmt_list li").length >= 0) {
    $("#js-getMoreComment").html("暂无更多数据，请稍后刷新");
    setTimeout(function() {
      $("#js-getMoreComment").html("点击加载更多");
    }, 60000)
  } else {
    $("body").css("background", "#f3f3f3");
    $(".cmtArea").css("background", "#f3f3f3");
    $(".cmt_list").html("<img src='assets/images/noContent.png' width='100%' />");
  }

  $(".cmt_list").append(liHtml)
}
var getCommentList = function() {
  var id ="";

  if($("#hide_source").attr("source")=="post"){
     id = commonCla.analyzParams("id")
    var url = host + "post/" + id + "/comment";
  }else{
    id = commonCla.analyzParams("new_id")
    var url = host + "news/" + id + "/comment";
  }
  
  //var url="json/comment.json";
  var params = {
    "current_count": $(".cmt_list li").length
  }
  commonCla.ajaxCommonFun(url, "get", function(resultData) {
    if (resultData != null && resultData.code == "200") {
    if(resultData.data.page_data.length<=0  && $(".cmt_list li").length <= 0){
      $("body").css("background", "#f3f3f3");
      $(".cmtArea").css("background", "#f3f3f3");
      $(".cmt_list").html("<img src='assets/images/noContent.png' width='100%' />");
    }else{
      initCommentHtml(resultData);
    }
      
      if ($(".cmt_list li").length < 15) {
        $("#js-getMoreComment").hide();
      } else {
        $("#js-getMoreComment").show();
      }
    } else if (resultData.code == "404" && $(".cmt_list li").length <= 0) {
      $("body").css("background", "#f3f3f3");
      $("body").html("<img src='assets/images/404.png' width='100%' />");
    }
  }, params)
}
var toComment = function(user_id, jwt_token) {
  $("#msg_overlay").css("display", "none");
  var id="";
  jwt_token_login = jwt_token;
  user_id_login = user_id;
  if($("#hide_source").attr("source")=="post"){
    id = commonCla.analyzParams("id");
    var url = host + "post/" + id + "/comment";
  }else{
    id = commonCla.analyzParams("new_id");
    var url = host + "news/" + id + "/comment";
  }
  
  var content = "";
  if ($(".txtMsg").val().split("：").length > 1 && $(".txtMsg").val().split("：")[0].indexOf("回复") >= 0 && $(".btn_msgSend").attr("uid") != "" && 　$(".btn_msgSend").attr("cid") != "" && $(".btn_msgSend").attr("uid") != undefined && $(".btn_msgSend").attr("cid") != undefined) {
    content = $(".txtMsg").val().split("：")[1];
    var uid = $(".btn_msgSend").attr("uid") == undefined ? "" : $(".btn_msgSend").attr("uid");
    var cid = $(".btn_msgSend").attr("cid") == undefined ? "" : $(".btn_msgSend").attr("cid");

  } else {
    var uid = "";
    var cid = "";
    content = $(".txtMsg").val();
  }
  if (content.trim() == "") {
    tcc.BOX_show("messdiv");
    $(".messdivCons").html("请输入评论内容");
    return;
  }
  //var url="json/comment.json";
  /*var uid=$(".btn_msgSend").attr("uid")==undefined?"":$(".btn_msgSend").attr("uid");
  var cid=$(".btn_msgSend").attr("cid")==undefined?"":$(".btn_msgSend").attr("cid");*/
  var params = {
    "content": content,
    "jwt_token": jwt_token,
    "parentId": cid,
    "answerId": uid
  }
  commonCla.ajaxCommonFun(url, "post", function(resultData) {
    if (resultData != null && resultData.code == "200") {
      tcc.BOX_show("messdiv");
      $(".messdivCons").html("<img src='assets/images/right.png' height='30' width='30' /> 评论成功");
      setTimeout(function() {
        tcc.BOX_remove("messdiv");
      }, 1000)
      $(".txtMsg").val("");
      $(".cmt_list").html("");
      getCommentList();

    } else {
      tcc.BOX_show("messdiv");
      $(".messdivCons").html("评论失败，请稍后重试");
      setTimeout(function() {
        tcc.BOX_remove("messdiv");
      }, 1000)
    }
  }, params)
}
var initCommentPage = function() {

  $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
    })
    //初始化
  $(".cmt_list").html("");
  getCommentList();
  //加载更多
  $("#js-getMoreComment").click(function() {
      getCommentList();
    })
    //回复
  $(".cmtArea").on("click", ".cmt_list li", function() {
      var cid = $(this).attr("cid");
      var uid = $(this).attr("uid");
      var currentId = commonCla.analyzParams("user_id");
      if (uid == currentId) {
        return;
      }
      var cname = $(this).attr("uname");
      $(".txtMsg").val("回复 " + cname + "：");
      $(".btn_msgSend").attr("cid", cid);
      $(".btn_msgSend").attr("uid", uid);
      $(".txtMsg").focus();

      $("#msg_overlay").show();


    })
    //删除回复
  $(".txtMsg").keyup(function() {
      if (event.keyCode == "8") {
        $(".btn_msgSend").attr("cid", "");
        $(".btn_msgSend").attr("uid", "");
      }
    })
    //点击遮罩层删除回复
  $("#msg_overlay").click(function() {
      if ($(this).css("display") != "none") {
        $(this).css("display", "none");
        $(".btn_msgSend").attr("cid", "");
        $(".btn_msgSend").attr("uid", "");
        $(".txtMsg").val("");
      }
    })
    //发送消息
  $(".btn_msgSend").click(function() {
      var jwt_token = commonCla.analyzParams("jwt_token");
      if($("#hide_source").attr("source")=="post"){
        var id = commonCla.analyzParams("id");
      }else{
        var id = commonCla.analyzParams("new_id");
      }
      
      if (jwt_token == "") {
        jwt_token = jwt_token_login;
      }
      var user_id = "";
      if (commonCla.analyzParams("user_id") == undefined || commonCla.analyzParams("user_id") == "") {
        user_id = user_id_login;
      } else {
        user_id = commonCla.analyzParams("user_id");
      }
      if (isWeiXin()) {
        if (jwt_token == "" || jwt_token == undefined) {
          if($("#hide_source").attr("source")=="post"){
             //正式
            var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?id=" + id + "&type=post&env=production");
            //测试
            //var redirect=encodeURIComponent("http://star.xingxiu.tv/oauth2?id="+id+"&type=post&env=development")
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
          }else{
            //正式
            var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?id=" + id + "&type=news&env=production");
            //测试
            //var redirect = encodeURIComponent("http://star.xingxiu.tv/oauth2?id=" + id + "&type=news&env=development");
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
          }
         }else {
            toComment(user_id, jwt_token);
        }
      } else {
        var shareIs = $("#share_comment").attr("share");
        if (shareIs == "true") {
          if (jwt_token == "" || jwt_token == undefined) {
            //注册页面
            window.location.href = "https://lookmetv.com/starshow5.0/news/v5/reg.html?new_id=" + id+"&source="+($("#hide_source").attr("source")==undefined?"":$("#hide_source").attr("source"))
          } else {
            toComment(user_id, jwt_token);
          }
        } else {
          if (jwt_token == undefined || jwt_token == "") {
            //调用客户端
            window.starResult.commentLogin();
            return false;
          } else {
            toComment(user_id, jwt_token);
          }
        }

      }

    })
    //授权跳转
  $(".txtMsg").click(function() {
    var jwt_token = commonCla.analyzParams("jwt_token");
    if($("#hide_source").attr("source")=="post"){
        var id = commonCla.analyzParams("id");
      }else{
        var id = commonCla.analyzParams("new_id");
      }
    if (isWeiXin()) {
      if (jwt_token == "" || jwt_token == undefined) {
        if($("#hide_source").attr("source")=="post"){
           //正式
          var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?id=" + id + "&type=post&env=production");
          //测试
          //var redirect=encodeURIComponent("http://wx.lookmetv.com/oauth2?id="+id+"&type=post&env=development")
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
        }else{
          //正式
          var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?id=" + id + "&type=news&env=production");
          //测试
          //var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?id=" + id + "&type=news&env=development");
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect + "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
        }
       
      }

    } else {
      //it is share?
      var shareIs = $("#share_comment").attr("share");
      if (shareIs == "true") {
        if (jwt_token == "" || jwt_token == undefined) {
          //注册页面
            window.location.href = "https://lookmetv.com/starshow5.0/news/v5/reg.html?new_id=" + id+"&source="+($("#hide_source").attr("source")==undefined?"":$("#hide_source").attr("source"))
        }
      } else {
        if (jwt_token == "" || jwt_token == undefined) {
          //调用客户端
          window.starResult.commentLogin();
          return false;
        }
      }
    }
  })
}


$(function() {
  initCommentPage();
})