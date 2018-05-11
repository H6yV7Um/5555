/*var host="http://123.57.0.118:5000/v5/";*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') { //登录
      if (get_token() == "") {
        login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
      }

    }else if (data.nextStep == '8') { 
      shareActivity();
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

})
var clientInter=function(bridge){
	//
	$(".topicCons").click(function(e){
		var thi=$(this);
		//1新闻  2视频 3直播
		var main_type=thi.attr("main_type");
		var jump_params={
            'id':thi.attr("vid"),     //new 的id
		}
		if(main_type==1){
			jump_params.action="14";
		}else if(main_type==2){
			jump_params.action="11";
		}else if(main_type==3){
			jump_params.action="12";
			var status=thi.attr("vstatus");
			if(status==2){
				jump_params.action="13";
			}
			jump_params.is_erect=thi.attr("is_erect"),   // 直播是否竖屏 0否，1是
			jump_params.live_status=thi.attr("vstatus"), // 直播状态
			jump_params.is_mobile=thi.attr("vIsMobile")
			
		}

		e.preventDefault()
		setBridgeCallHandler(bridge,jump_params)

	})
	//news
	$("#newsTopicList").on("click","li",function(e){
		var thi=$(this);
		e.preventDefault()
          setBridgeCallHandler(bridge, {
             'action': 14,
             'id':thi.attr("nid"),     //new 的id
         })
		
	})
	$("#videosTopicList").on("click","li",function(e){
		var thi=$(this);
		e.preventDefault()
          setBridgeCallHandler(bridge, {
             'action': 11,
             'id':thi.attr("vid"),     //new 的id
         })
		
	})
	$("#livesTopicList").on("click","li",function(e){
		 var thi=$(this);
		 var actionNum=12;
		 var status=thi.attr("vstatus");
         if(status==2){actionNum=13;}
          e.preventDefault()
          setBridgeCallHandler(bridge, {
             'action': actionNum,
             'id':thi.attr("vid"),     // 直播、回播、TV 的id
             'is_erect':thi.attr("is_erect"),   // 直播是否竖屏 0否，1是
             'live_status':thi.attr("vstatus"), // 直播状态
             'is_mobile':thi.attr("vIsMobile")
         })
	})
}

var host=commonCla.hostBase+"/v13"
var initTheme = function(resultData) {
	var group=resultData.data.group
	$(".head_img img").attr("src", group.cover);
	$("#watch_number").html(cWan(group.watch_num));
	$("#like_number").html(cWan(group.like_num));
	$(".head_desc").html(group.title);
	$(".topicCons").attr("vid",group.id);
	$(".topicCons").attr("main_type",group.main_type);
	if(group.main_type==3){
		$(".topicCons").attr("is_erect",group.is_erect);
		$(".topicCons").attr("vstatus",group.status);
		$(".topicCons").attr("vIsMobile",group.is_mobile);
	}

	var news = resultData.data.news.list==undefined?[]:resultData.data.news.list;
	var videos = resultData.data.videos.list==undefined?[]:resultData.data.videos.list;
	var lives = resultData.data.lives.list==undefined?[]:resultData.data.lives.list;
    var tag="";
	var newsHtml = "",
		livesHtml = "",
		videosHtml = "";
	if(lives=="" || lives==null || lives.length<=0){
		$("#livesTopicList").parent().hide()
	} 
	if(videos=="" || videos==null || videos.length<=0){
		$("#videosTopicList").parent().hide()
	}
	
	if(news=="" || news==null || news.length<=0){
		$("#newsTopicList").parent().hide()
	}

	for (var i = 0; i < news.length; i++) {
		if(news[i].tag!=null){
	   		tag=news[i].tag.name+"|"
	   	}
		newsHtml += '<li nid="'+news[i].id+'">' +
			'<div class="imgArea">' +
			'<img src="' + news[i].cover + '!300x225" /></div>' +
			'<div class="descArea">' +
			'<p>' +tag+ news[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<!--<img src="images/icon-eye.jpg" />-->' +
			'<span>' + cWan(news[i].watch_num)+ '.阅读</span>' +
			'</section>' +
			'<!--<section>' +
			'<img src="images/icon-heart.jpg"  />' +
			'<span>' + cWan(news[i].like_num) + '</span>' +
			'</section>-->' +
			'<div class="userInfo"><img src="'+news[i].user.head_pic+'"/><span>'+news[i].user.name+'</span></div>'+
			'</article>' +
			'</div>' +
			'</li>'
	}
	$("#newsTopicList").html(newsHtml);
	if (lives!=null && lives != "") {
		var live_share_url=""
		for (var i = 0; i < lives.length; i++) {
			livesHtml += '<li vid="'+lives[i].id+'" vIsMobile="'+lives[i].is_mobile+'" is_erect='+lives[i].is_erect+' vstatus="'+lives[i].status+'">' +
				'<div class="imgArea">' +
				'<img src="' + lives[i].cover + '!300x225" /></div>' +
				'<div class="descArea">' +
				'<p>' + lives[i].title + '</p>' +
				'<article class="activityList">' +
				'<section>' +
				'<!--<img src="images/icon-eye.jpg" />-->' +
				'<span>' + cWan(lives[i].watch_num)+ '.播放</span>' +
				'</section>' +
				'<!--<section>' +
				'<img src="images/icon-heart.jpg"  />' +
				'<span>' + cWan(lives[i].like_num) + '</span>' +
				'</section>-->' +
				'<div class="userInfo"><img src="'+lives[i].user.head_pic+'"/><span>'+lives[i].user.name+'</span></div>'+
				'</article>' +
				'</div>' +
				'</li>'
		}
		$("#livesTopicList").html(livesHtml);
	}

	for (var i = 0; i < videos.length; i++) {
		if(videos[i].tag!=null){
	   		tag=videos[i].tag.name+"|"
	   	}
		videosHtml += '<li vid="'+ videos[i].id+'">' +
			'<div class="imgArea">' +
			'<img src="' + videos[i].cover + '!300x225" /></div>' +
			'<div class="descArea">' +
			'<p>' + tag+videos[i].title + '</p>' +
			'<article class="activityList">' +
				'<section>' +
				'<!--<img src="images/icon-eye.jpg" />-->' +
				'<span>' + cWan(videos[i].watch_num)+ '.播放</span>' +
				'</section>' +
				'<!--<section>' +
				'<img src="images/icon-heart.jpg"  />' +
				'<span>' + cWan(videos[i].like_num) + '</span>' +
				'</section>-->' +
				'<div class="userInfo"><img src="'+videos[i].user.head_pic+'"/><span>'+videos[i].user.name+'</span></div>'+
				'</article>' +
			'</div>' +
			'</li>'
	}
	$("#videosTopicList").html(videosHtml);

	if($("#livesTopicList li").length>=resultData.data.lives.total){
		$("#js_livesGetMore").hide();
	}
	if($("#videosTopicList li").length>=resultData.data.videos.total){
		$("#js_videosGetMore").hide();
	}
	if($("#newsTopicList li").length>=resultData.data.news.total){
		$("#js_newsGetMore").hide();
	}

}
var cWan=function(num){
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
initMoreHtml=function(ret,type){
  var newsHtml = "",
	 livesHtml = "",
	 videosHtml = "";
	 var tag="";
  if(type=="news"){
  	var news=ret.data.list;
   for (var i = 0; i < news.length; i++) {
	   	if(news[i].tag!=null){
	   		tag=news[i].tag.name+"|"
	   	}
		newsHtml += '<li  nid="'+news[i].id+'">' +
			'<div class="imgArea">' +
			'<img src="' + news[i].cover + '!300x225" /></div>' +
			'<div class="descArea">' +
			'<p>' + tag+news[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<!--<img src="images/icon-eye.jpg" />-->' +
			'<span>' + cWan(news[i].watch_num)+ '.阅读</span>' +
			'</section>' +
			'<!--<section>' +
			'<img src="images/icon-heart.jpg"  />' +
			'<span>' + cWan(news[i].like_num) + '</span>' +
			'</section>-->' +
			'<div class="userInfo"><img src="'+news[i].user.head_pic+'"/><span>'+news[i].user.name+'</span></div>'+
			'</article>' +
			'</div>' +
			'</li>'
	}
	$("#newsTopicList").append(newsHtml);
  }else if(type=="videos"){
  	  var videos=ret.data.list;
      for (var i = 0; i < videos.length; i++) {
      	if(videos[i].tag!=null){
	   		tag=videos[i].tag.name+"|"
	   	}
		videosHtml += '<li vid="'+ videos[i].id+'">' +
			'<div class="imgArea">' +
			'<img src="' + videos[i].cover + '!300x225" /></div>' +
			'<div class="descArea">' +
			'<p>' + tag+videos[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<!--<img src="images/icon-eye.jpg" />-->' +
			'<span>' + cWan(videos[i].watch_num)+ '.播放</span>' +
			'</section>' +
			'<!--<section>' +
			'<img src="images/icon-heart.jpg"  />' +
			'<span>' + cWan(videos[i].like_num) + '</span>' +
			'</section>-->' +
			'<div class="userInfo"><img src="'+videos[i].user.head_pic+'"/><span>'+videos[i].user.name+'</span></div>'+
			'</article>' +
			'</div>' +
			'</li>'
	}
	$("#videosTopicList").append(videosHtml);
  }else{
  	//lives
  	var lives=ret.data.list;
  	if (lives!=null && lives != "") {
		for (var i = 0; i < lives.length; i++) {
			livesHtml += '<li vid="'+lives[i].id+'" vIsMobile="'+lives[i].is_mobile+'" vid="'+lives[i].id+'" is_erect="'+lives[i].is_erect+'" vstatus="'+lives[i].status+'">' +
				'<div class="imgArea">' +
				'<img src="' + lives[i].cover + '!300x225" /></div>' +
				'<div class="descArea">' +
				'<p>' + lives[i].title + '</p>' +
				'<article class="activityList">' +
				'<section>' +
				'<!--<img src="images/icon-eye.jpg" />-->' +
				'<span>' + cWan(lives[i].watch_num)+ '.播放</span>' +
				'</section>' +
				'<!--<section>' +
				'<img src="images/icon-heart.jpg"  />' +
				'<span>' + cWan(lives[i].like_num) + '</span>' +
				'</section>-->' +
				'<div class="userInfo"><img src="'+lives[i].user.head_pic+'"/><span>'+lives[i].user.name+'</span></div>'+
				'</article>' +
				'</div>' +
				'</li>'
		}
		$("#livesTopicList").append(livesHtml);
	}
  }

  if($("#"+type+"TopicList li").length>=ret.data.total){
		$("#"+type+"TopicList").parent().find("#js_"+type+"GetMore").hide();
	  }
	
}
var getMoreData=function(type){
  var theme_id=commonCla.analyzParams("id");
  var current_count=$("#"+type+"TopicList li").length;
  var count=10;
  var style=1;
  if(type=="videos"){
  	style=2;
  }else if(type=="lives"){
  	style=3;
  }
  var params={
  	"type":style,
  	"current_count":current_count,
  	"count":count
  }
  var url=host+"/messageGroup/"+theme_id+"/items";
  commonCla.ajaxCommonFun(url,"get",function(ret){
  	if(ret!="" && ret!=null && ret.code=="200"){
  		initMoreHtml(ret,type);
  		if($("#"+type+"TopicList li").length>=100){
  			$("#"+type+"TopicList").parent().find(".moreData").hide();
  		}
  	}else{
  		$("#"+type+"TopicList").parent().find(".moreData").hide();
  	}
  },params)
}
var getThemeData = function() {
	var theme_id = commonCla.analyzParams("id");
	var url = host + "/messageGroup/" + theme_id;
	commonCla.ajaxCommonFun(url, "get", function(resultData) {
		if (resultData != "" && resultData != null && resultData.code=="200") {
			initTheme(resultData);
		} else if (resultData.code=="404"){
			 $("body").html("<img src='images/404.png' width='100%' />")
		}else{

		}
		$(".pageMain").show();
		$(".loadding").hide();

	})
}

$(function() {
	getThemeData();
	$("#js_videosGetMore").click(function(){
		getMoreData("videos");
	})
	$("#js_newsGetMore").click(function(){
		getMoreData("news");
	})
	$("#js_livesGetMore").click(function(){
		getMoreData("lives");
	})
})