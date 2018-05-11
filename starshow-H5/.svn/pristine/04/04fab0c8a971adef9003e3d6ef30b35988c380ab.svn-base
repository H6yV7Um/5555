var jwt_token_login = "";
var user_id_login = "";
var host = commonCla.hostBase + "/v11/";
//正式9882
var zeroRange_id = "9882";

/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '8') { 
      shareActivity();
    }
    if (data.nextStep == '1') { //评论登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
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
   //交互方法
   clientInter(bridge);
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/starshow5.0/starZeroRange2/share.html",
          'title': "#思美人# 签名福利等你来拿",
          'content': "追剧有惊喜，互动拿签名，快来安利的你爱豆吧",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/show/simeiren.jpg"
        }
      })
    }
})

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
	//发送消息
      $(".btn_msgSend").click(function(e){
        var jwt_token=get_token();
	      var id=zeroRange_id;
        if(jwt_token==undefined || jwt_token==""){
           /*去登录*/
          e.preventDefault()
          setBridgeCallHandler(bridge, {
            'action': '1',
            'nextStep':'1'
          })
        }else{
          toComment(jwt_token);
        }
      })
}
//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=jwt_token_login;
    }
    return jwt_token;
}
var isWeiXin=function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//评论
var toComment = function(jwt_token) {
	$("#msg_overlay").css("display", "none");

	jwt_token_login = jwt_token;

	var url = host + "news/" + zeroRange_id + "/comment";
	if ($(".txtMsg").val().trim() == "") {
		$(".messdivCons").html("请输入评论内容");
		tcc.BOX_show("messdiv");
		return;
	}
	var params = {
		"content": $(".txtMsg").val(),
		"jwt_token": jwt_token
	}
	commonCla.ajaxCommonFun(url, "post", function(resultData) {
		if (resultData != null && resultData.code == "200") {
			$(".messdivCons").html("评论成功");
			tcc.BOX_show("messdiv");
			$("#BOX_overlay").hide();
			setTimeout(function() {
				tcc.BOX_remove("messdiv");
			},5000)
       var top=$(".zero_main").scrollTop()+$(".cmtArea").offset().top;
      $(".zero_main").scrollTop(top)
			
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
 var initCommentHtml= function(resultData) {
    $("#hide_total").val(resultData.data.total);
    var currentConunt=$(".cmt_list li").length;
    var liHtml=""
    var repliesHtml="";
    var pageData=resultData.data.page_data;
    var total=resultData.data.total;
    if(pageData.length>0){
      $(".cmtArea").css("background","#ffffff");
      $("body").css("background","#ffffff");
     for(var i=0;i<pageData.length;i++){
        var name=pageData[i].user.name;
        liHtml+="<li uid='"+pageData[i].user.id+"'uname='"+pageData[i].user.name+"' cid='"+pageData[i].id+"'>"+
          "<div class='cmt_head fl'><img src='"+pageData[i].user.head_pic+"'></div>"+
          "<div class='cmt_content fr'>"+
            "<p class='cmt_name'>"+name+"</p>"+
            "<p class='cmt_data'>"+(total-currentConunt-i)+"楼&nbsp;"+pageData[i].created_at+"</p>"+
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
     liHtml="<div style='margin-top:30px; text-align:center'>暂无数据</div>"
    }
    
    $(".cmt_list").append(liHtml)
  }
var getCommentList=function(){
      var id=zeroRange_id;
      var url=host+"news/"+id+"/comment";
      //var url="json/comment.json";
      var params={
        "current_count":$(".cmt_list li").length
      }
      commonCla.ajaxCommonFun(url, "get", function(resultData){
         if(resultData!=null && resultData.code=="200"){
            initCommentHtml(resultData);
            if($(".cmt_list li").length<15){
              $("#js-getMoreComment").hide();
            }else{
              $("#js-getMoreComment").show();
            }
         }else if(resultData.code=="404" && $(".cmt_list li").length<=0){
	        /* $("body").css("background","#f3f3f3");
           $("body").html("<img src='assets/images/404.png' width='100%' />");*/
	 }

      },params)
  }
  var initCommentPage=function(){

      $(".js-close").click(function(){
        tcc.BOX_remove("messdiv");
      })
      //初始化
      $(".cmt_list").html("");
      getCommentList();
      //加载更多
       $("#js-getMoreComment").click(function(){
        getCommentList();
       })
      //判断是否为分享页
      if($("#btn_down").html()!=undefined){
	      $(".btn_msgSend").click(function(){
	          var jwt_token=get_token();
		      var id=zeroRange_id;
	        if(jwt_token=="" || jwt_token==undefined){
            //授权
             window.location.href = host+"wechat/activityAuth?type=starZeroRange2";
         }else{
	          toComment(jwt_token);
	        }
	      })
        wx_share();
      }
      
      
  }

  $(function(){
  	initCommentPage();
	
  })