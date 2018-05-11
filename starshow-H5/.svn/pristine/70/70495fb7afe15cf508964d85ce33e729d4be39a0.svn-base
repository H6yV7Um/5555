var host = commonCla.hostBase+"/v12/"; 
var jwt_token = commonCla.analyzParams("jwt_token") == undefined ? "" : commonCla.analyzParams("jwt_token");

var isWeiXin=function() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
var get_time=function(uTime) {
	//JavaScript函数：
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;

	function getDateDiff(dateTimeStamp) {
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			//若日期不符则弹出窗口告之
			//alert("结束日期不能小于开始日期！");
		}
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = "发表于" + parseInt(monthC) + "个月前";
		} else if (weekC >= 1) {
			result = "发表于" + parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			result = "发表于" + parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			result = "发表于" + parseInt(hourC) + "个小时前";
		} else if (minC >= 1) {
			result = "发表于" + parseInt(minC) + "分钟前";
		} else result = "刚刚发表";
		return result;
	}

	function getDateTimeStamp(dateStr) {
		return Date.parse(dateStr.replace(/-/gi, "/"));
	}

	//将后台取到的值转换成毫秒
	var data = getDateTimeStamp(uTime);
	//得到结果的方法
	var result = getDateDiff(data);
	//给span赋值的方法，在页面加载的时候调用，注意body开始标签中使用onload调用此方法
	$(".userInfo p").text(result);
}
//评论列表
var getCommentData=function(){
  var post_id=commonCla.analyzParams("id");
  var url=host+"post/"+post_id+"/comment";
  var params={
    "count":5
  }
  commonCla.ajaxCommonFun(url,"get",function(data){
    if(data.code=="200"){
      var pageData=data.data.page_data;var liHtml="";
      if (pageData.length > 0) {
       for (var i = 0; i < pageData.length; i++) {
        var repliesHtml="";
        
        if (pageData[i].replies != null) {
            var reply_num=pageData[i].reply_num;
            var reply_num_html="";
            if(reply_num>=2){
              reply_num_html="<p class='replay_num'>查看全部"+reply_num+"条回复</p>"
            }
            repliesHtml+="<div class='reply'>"+
                         " <span class='reply_name'>"+pageData[i].replies.user.name+"回复：</span>"+
                         " <span>"+pageData[i].replies.content+"</span>"+reply_num_html
                         "</div>"
            //var name = pageData[i].user.name + " <span class='col_grey2'>回复</span> " +pageData[i].replies.answer.name
        }
        var name = pageData[i].user.name;
        liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
          "<div class='cmt_head fl'><img src='" + pageData[i].user.head_pic + "'></div>" +
          "<div class='cmt_content fr'>" +
          "<p class='cmt_name'>" + name + "</p>" +
          "<p class='cmt_data'>" + pageData[i].created_at + "</p>" +
          "<p class='cmt_reply'>回复</p>"+
          "<p class='cmt_comment'>" + pageData[i].content +
          " </p>" + repliesHtml +
          "</div>" +
          "</li>"
      }
      $(".cmt_list").html(liHtml)
    }else{
      //$(".cmt_short").hide();
      $(".cmt_list").html('<div class="tc mt30 pb30"><h1 style="font-size: 1.5rem;">暂无评论</h1><p class="mt20">快来发表第一条评论吧~</p></div>')
      $(".btn_more").hide();
    }
   }
  },params)
 
  
}
//授权方法
var wx_authorize=function(params,type){
   var paramStr="";
   for(var key in params){
     paramStr+=key+"="+params[key]+"&";
   }
   /*paramStr=paramStr.substring(0,str.length-1);*/
  //正式
  var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?"+paramStr+"type="+type+"&env=production");
  //测试
  //var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?"+paramStr+"type="+type+"&env=development");
  window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
  +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
}
var commentFun=function(){
	//点击评论跳转
  $(".cmt_short").on("click", "li .reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      window.location.href="commentList.html?uid="+uid+"&cid="+cid+"&jwt_token="+jwt_token;
      return;
    })
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
      $(".txtMsg").focus();

      $("#msg_overlay").show();


    })
   //点击遮罩层删除回复
    $("#msg_overlay").click(function() {
        if ($(this).css("display") != "none") {
          $(this).css("display", "none");
          $(".btn_msgSend").attr("cid", "");
          $(".btn_msgSend").attr("uid", "");
          $(".txtMsg").attr("placeHolder","快来评论");
        }
      })
    //授权跳转
     $(".txtMsg").click(function(){
      var jwt_token=commonCla.analyzParams("jwt_token");
      var id=commonCla.analyzParams("id");
        if(isWeiXin()){
          if(jwt_token=="" || jwt_token==undefined){
            var sourceType=$("#hide_source").attr("stype");
            if(sourceType=="reply"){
              var msgId=$(this).next(".btn_msgSend").attr("cid");
              var userId=$(this).next(".btn_msgSend").attr("uid");
              var params={
                "cid":commonCla.analyzParams("cid"),
                "uid":userId
              }
              wx_authorize(params,"postComment");
             }else{
              var params={
                "id":id,
              }
              wx_authorize(params,"post");
             }
        
          }
        }
      })
    //发表评论
    $(".btn_msgSend").click(function(){
    	var msgId=$(this).attr("cid");
    	var userId=$(this).attr("uid");
    	var id=commonCla.analyzParams("id");
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
    	jwt_token=commonCla.analyzParams("jwt_token");
    	if (jwt_token == "" || jwt_token == undefined) {
  		  if (isWeiXin()){
          var sourceType=$("#hide_source").attr("stype");
          if(sourceType=="reply"){
            var msgId=$(this).next(".btn_msgSend").attr("cid");
            var userId=$(this).next(".btn_msgSend").attr("uid");
            var params={
              "cid":commonCla.analyzParams("cid"),
              "uid":userId
            }
            wx_authorize(params,"postComment");
           }else{
            var params={
              "id":id,
            }
            wx_authorize(params,"post");
           }
  			}else{
  	    	//注册页面
              window.location.href = commonCla.shareUrlBase+"/starshow5.0/news/v5/reg.html?id=" + id+"&source=post"
  	    }
	    }else{
	    	$("#msg_overlay").css("display", "none");
			  jwt_token_login = jwt_token;  
			  //执行
			  if(msgId=="" || userId==""){
	    		toComment(content);
	    	  }else{
	    		toReply(content);
	    	  }
		}  
    //定位到评论
    location.href = "#comment"; 
   })
}
var toComment = function(content) {
  var id=commonCla.analyzParams("id");

  $(".btn_msgSend").addClass("btn_loadding");
  $(".btn_msgSend").val("");
  $(".btn_msgSend").attr("disabled",true);


  var params = {
    "content": content,
    "jwt_token": jwt_token,
  }
  var url = host + "post/" + id + "/comment";
  commonCla.ajaxCommonFun(url, "post", function(resultData) {
  	  $(".btn_msgSend").removeClass("btn_loadding");
	  $(".btn_msgSend").val("发表");
	  $(".btn_msgSend").removeAttr("disabled");
    if (resultData != null && resultData.code == "200") {
      swal({
      	"title":"评论成功",
      	"confirmButtonText":"确定",
      	"confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      afterComment(resultData);

     

    }else if(resultData.code == "422"){
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
    paramsClear();
  }, params)
}
var paramsClear=function(){
   $(".btn_msgSend").attr("cid", "");
   $(".btn_msgSend").attr("uid", "");
   $(".txtMsg").attr("placeHolder","快来评论");
}
var afterComment=function(ret){
      if($(".cmt_short").css("display")=="none"){
      	$(".cmt_short").show();
      }
      if($(".btn_more").css("display")=="none"){
        $(".btn_more").show();
        $(".cmt_list").html("");
      }
      var chtml="<li uid='" + ret.data.user.id + "'uname='" + ret.data.user.name + "' cid='" + ret.data.id + "'>" +
          "<div class='cmt_head fl'><img src='" + ret.data.user.head_pic + "'></div>" +
          "<div class='cmt_content fr'>" +
          "<p class='cmt_name'>" + ret.data.user.name + "</p>" +
          "<p class='cmt_data'>" + ret.data.created_at + "</p>" +
          "<p class='cmt_comment'>" + ret.data.content+
          "<p class='cmt_reply'>回复</p>"+
          " </p>"
          "</div>" +
          "</li>"
       $(".cmt_list").prepend(chtml);
       $("#comment_num").html(Number($("#comment_num").html())+1);
       $(".btn_msgSend").attr("cid", "");
       $(".btn_msgSend").attr("uid", "");
       $(".txtMsg").attr("placeHolder","快来评论");

}
var toReply=function(content){
	var id=commonCla.analyzParams("id");
	var cid="";
	if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
	 cid=$(".btn_msgSend").attr("cid");
	}else{
	 cid=commonCla.analyzParams("cid");
	}
   $(".btn_msgSend").addClass("btn_loadding");
   $(".btn_msgSend").val("");
   $(".btn_msgSend").attr("disabled",true);

	var replyId=$(".btn_msgSend").attr("cid");
    var uid=$(".btn_msgSend").attr("uid");
	var params = {
    "content": content,
    "jwt_token": jwt_token,
    "replyId": replyId,
    "answerId": uid
  }
  var url = host + "comment/" + cid + "/postReply";
  commonCla.ajaxCommonFun(url, "post", function(resultData) {
  	  $(".btn_msgSend").removeClass("btn_loadding");
	  $(".btn_msgSend").val("发表");
	  $(".btn_msgSend").removeAttr("disabled");
    if (resultData != null && resultData.code == "200") {
      swal({
      	"title":"回复成功",
      	"confirmButtonText":"确定",
      	"confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      //afterComment(resultData);
      if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
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

     

    }else if(resultData.code == "422"){
    	swal({
      	"title":"评论失败",
      	"text":"不能回复自己的评论~",
      	"animation":"slide-from-top",
      	"confirmButtonText":"确定",
      	"confirmButtonColor": "#ff1d3e",

      });
    }  else {
      swal({
      	"title":"回复失败",
      	"animation":"slide-from-top",
      	"confirmButtonText":"确定",
      	"confirmButtonColor": "#ff1d3e",

      });
    }
  }, params)
}
var initPostDom=function(ret){

      data = ret.data;
      $("#comment_num").html(ret.data.comment_num);
      var category=data.category;
      if(category!=1 && category!=2){
        var c_name="";
        if(category==3){
          c_name="男人装";
        }else if(category==4){
          c_name="时尚芭莎"
        }else if(category==5){
          c_name="时尚先生"
        }else if(category==6){
          c_name="微博"
        }else if(category==7){
          c_name="FaceBook"
        }else if(category==8){
          c_name="Instagram"
        }else if(category==9){
          c_name="推特"
        }
        var from_str="来自："+c_name;
        $(".from_path").html(from_str)
      }
			var v_detail = '<div class="userPic"><img src=' + data.user.head_pic + '></div>' + '<div class="userInfo"><h2>' + data.user.name + '</h2><p>' + data.created_at + '</p></div>' + '<div class="share_video_title_p ">';

			if (data.is_like == 1) {
				v_detail += '<img src="images/activezanicon.png"  class="ranksum_zan_icon" id="btn-zan" zan="' + data.like_num + '"/><span class="clickicon_span">' + data.like_num + '</span></div>'
			} else {
				v_detail += '<img src="images/dianzanicon.png"  class="ranksum_zan_icon" id="btn-zan" zan="' + data.like_num + '"/><span class="clickicon_span">' + data.like_num + '</span></div>'
			}
			var uTime = data.created_at;
			document.title = "分享一条" + data.user.name + "的动态";
			$('.dynamicTit').append(v_detail);
			get_time(uTime);
			if (data.tag != null) {
				var name = data.tag.name;
				var newName = data.content
				var cont = newName.substring(newName.indexOf(" "));
				$(".dynamicContent").html('<span>#' + name + '#</span>' + cont);

			} else {
				$(".dynamicContent").html(data.content);
			}
			if (data.type == 1) {
				var str = "";
        var watermark="";
        if(data.category==1){
           watermark='!750x0/watermark/url/L3dhdGVybWFyay9sb2dvLTcucG5n/align/southeast/margin/20x15/opacity/60';
        }
				for (var i = 0; i < data.photos.length; i++) {
					if (data.photos.length == 1) {
						str += '<li style="width:100%" class="span3"> <a href=' + data.photos[i] + watermark+'> <img src=' + data.photos[i] + '!750x563 > </a> </li>';
					} else if (data.photos.length == 2) {
						str += '<li style="width:46%; margin:2%" class="span3"><a href=' + data.photos[i] + watermark+'><img src=' + data.photos[i] + '!345x345></a></li>';
					} else {
						str += '<li class="span3" style="width:29%; margin:2%"><a href=' + data.photos[i] + watermark+'><img src=' + data.photos[i] + '!250x250></a></li>';
					}
				}
				$('#gallery').append(str);
				$('#gallery img').fsgallery()
			} else {
         var watermark='!750x0/watermark/url/L3dhdGVybWFyay9sb2dvLTcucG5n/align/southeast/margin/20x15/opacity/60';
				$('#gallery').append('<li><video poster="'+ data.photos[0]+watermark+'" controls  src=' + data.video + ' style="width:100%; margin:0 auto; text-align:center; height:auto"></li>');
			}

}
var initPostPage = function() {
	//localstorage unlike 赋值
	var id = commonCla.analyzParams("id") == undefined ? "" : commonCla.analyzParams("id");
	var storage = window.localStorage;
	if (!storage.getItem("unlike" + id)) storage.setItem("unlike" + id, 0);
	var v_url = host + "post/" + id + "?jwt_token=" + jwt_token;
	commonCla.ajaxCommonFun(v_url,"get",function(ret){
	    $(".postMain").show();
      $(".loadding").hide();
      $(".news_nav").show();
      if (ret.code == '200'){
			initPostDom(ret);
      wx_share(ret.data.title,ret.data.content,commonCla.shareUrlBase+"/starshow5.0/post/share.html?id="+ret.data.id,ret.data.photos[0])
	   }else if (ret.code == '404') {
			$("body").html("<img src='assets/images/404.png' width='100%' />")
	   }
	      
	})

	//点赞
	$(".dynamicTit").on('click','#btn-zan', function() {
      if (jwt_token == "" || jwt_token == undefined) {
        if (isWeiXin()){
          var id=commonCla.analyzParams("id");
          var params={
            "id":id,
          }
          wx_authorize(params,"post");
        }else{
        //注册页面
            window.location.href = commonCla.shareUrlBase+"/starshow5.0/news/v5/reg.html?id=" + id+"&source=post"
        }
      }else{
         jwt_token_login = jwt_token;

        var zan = $(this).attr("zan");
        var id = commonCla.analyzParams("id") == undefined ? "" : commonCla.analyzParams("id");
        var liveLikeUrl = host + "post/" + id + "/like?jwt_token=" + jwt_token;
        var unlike = localStorage.getItem("unlike" + id);
        var params = {
          "id": id,
          "type": "Live",
          "unlike": unlike
        }
        var thisObj = $(this);
        //+-1操作
        var zanNum = Number(thisObj.next("span").html());
        var zanNumAttr = Number(thisObj.attr("zan"));
        if (unlike == 0) {
          thisObj.attr("src", "images/activezanicon.png");
          thisObj.next("span").html(Number(zanNum + 1));
          thisObj.attr("zan", Number(zanNumAttr + 1))
        } else {
            tcc.BOX_show("zan");
            setTimeout(function() {
              tcc.BOX_remove("zan")
            }, 1000)
        }
        thisObj.addClass("animated");
        thisObj.addClass("rubberBand");
        setTimeout(function() {
          thisObj.removeClass("animated");
          thisObj.removeClass("rubberBand")
        }, 500);
        //+1操作end
        commonCla.ajaxCommonFun(liveLikeUrl, "get", function(resultData) {
          if (resultData != "" && resultData != null) {
            if (resultData.code == "200") {
              if (unlike == 0) {
                storage.setItem("unlike" + id, 1);
              } else {
                storage.setItem("unlike" + id, 0);
              }
            }
          }
        }, params)
      }
		

	})
    //评论列表
	getCommentData();

}
//初始化回复列表
var initReplyDom=function(data){
  var pageData=data.data.page_data;var liHtml="";
  if (pageData.length > 0) {
  	liHtml="<li class='bg_white' uid='" + data.data.user.id + "'uname='" + data.data.user.name + "' cid='" + data.data.id + "'>" +
      "<div class='cmt_head fl'><img src='" + data.data.user.head_pic + "'></div>" +
      "<div class='cmt_content fr'>" +
      "<p class='cmt_name'>" + data.data.user.name  + "</p>" +
      "<p class='cmt_data'>" + data.data.created_at + "</p>" +
      "<p class='cmt_comment'>" + data.data.content +
      "<!--<p class='cmt_reply'>回复</p>-->"+
      " </p>"
      "</div>" +
      "</li>"
   for (var i = 0; i < pageData.length; i++) {
    var name = pageData[i].user.name;
    liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
      "<div class='cmt_head fl'><img src='" + pageData[i].user.head_pic + "'></div>" +
      "<div class='cmt_content fr'>" +
      "<p class='cmt_name'>" + name + "</p>" +
      "<p class='cmt_data'>" + pageData[i].created_at + "</p>" +
      "<p class='cmt_comment'><span class='col_grey'>回复"+pageData[i].answer.name+"：</span>" + pageData[i].content +
      "<p class='cmt_reply'>回复</p>"+
      " </p>"
      "</div>" +
      "</li>"
  }
     $(".cmt_list").append(liHtml);
     //默认回复第一条
      $(".btn_msgSend").attr("uid", data.data.user.id);
      $(".btn_msgSend").attr("cid", data.data.id);
  }else{
	  $(".cmt_list").html("");
  }
  //判断是否显示查看更多按钮
  var current_count=$(".cmt_list li").length-1;
  if(current_count<15){
     $("#btn_more").hide();
  }else{
    if(current_count<=data.data.total){
      $("#btn_more").show();
      $("#btn_more").find("p").html("点击加载更多");
    }else{
      $("#btn_more").hide();
    }
   
  }

}
var getReplayData=function(){
    var current_count=$(".cmt_list li").length-1;
	var cid=commonCla.analyzParams("cid");
	var uid=commonCla.analyzParams("uid");
	var url=host+"comment/"+cid+"/postReply?current_count="+current_count;
	commonCla.ajaxCommonFun(url,"get",function(ret){
		    $(".postMain").show();
        $(".loadding").hide();
        $(".news_nav").show();
		if(ret.code=="200"){
			initReplyDom(ret);
		}
		
	})
}

$(function() {
	var sourceType=$("#hide_source").attr("stype");
   if(sourceType=="reply"){
	   	$(".cmt_list").html("");
	     getReplayData();
	     //加载更多
	     $("#btn_more").click(function(){
	       getReplayData();
	     })
   }else{
   		initPostPage();
   }
   commentFun();

   $(".txtMsg").click(function() {
      var $element=$(".sendMsg");
      setTimeout(function(){
       var viewTop = $(window).scrollTop();
      $(window).scrollTop(viewTop+"74"); // 调整value
      $(".txtMsg").focus();
      },500)
    });
});
