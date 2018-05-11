/*var host="http://123.57.0.118:5000/v5/";*/
var host=commonCla.hostBase+"/v13"
var initTheme = function(resultData) {
	$(".head_img img").attr("src", resultData.data.cover);
	$("#watch_number").html(cWan(resultData.data.watch_num));
	$(".head_desc").html(resultData.data.description)
	var news = resultData.data.news.page_data;
	var videos = resultData.data.videos.page_data;
	var lives = resultData.data.lives.page_data;
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
		newsHtml += '<li>' +
			'<div class="imgArea"><a href='+commonCla.shareUrlBase+'/starshow5.0/news2.0/share.html?new_id=' + news[i].id + '">' +
			'<img src="' + news[i].cover + '!300x225" /></a></div>' +
			'<div class="descArea">' +
			'<a href="'+commonCla.shareUrlBase+'/starshow5.0/news2.0/share.html?new_id=' + news[i].id + '">' +
			'<!--<h1>' + news[i].en_title.toUpperCase() + '</h1>-->' +
			'<p>' +tag+ news[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<img src="themeAssets/images/icon-eye.jpg" />' +
			'<span>' + cWan(news[i].watch_num) + '</span>' +
			'</section>' +
			'<section>' +
			'<img src="themeAssets/images/icon-heart.jpg"  />' +
			'<span>' + cWan(news[i].like_num) + '</span>' +
			'</section>' +
			'</article>' +
			'</a>' +
			'</div>' +
			'</li>'
	}
	$("#newsTopicList").html(newsHtml);
	if (lives!=null && lives != "") {
		var live_share_url=""
		for (var i = 0; i < lives.length; i++) {
			if(lives[i].is_erect=="0"){
              live_share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+lives[i].id;
			}else{
			  live_share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+lives[i].id;
			}
			livesHtml += '<li>' +
				'<div class="imgArea"><a href="' + live_share_url + '">' +
				'<img src="' + lives[i].cover + '!300x225" /></a></div>' +
				'<div class="descArea">' +
				'<a href="'+live_share_url+'">' +
			
				'<p>' + lives[i].title + '</p>' +
				'<article class="activityList">' +
				'<section>' +
				'<img src="themeAssets/images/icon-eye.jpg" />' +
				'<span>' + cWan(lives[i].watch_num) + '</span>' +
				'</section>' +
				'<section>' +
				'<img src="themeAssets/images/icon-heart.jpg"  />' +
				'<span>' + cWan(lives[i].like_num) + '</span>' +
				'</section>' +
				'</article>' +
				'</a>' +
				'</div>' +
				'</li>'
		}
		$("#livesTopicList").html(livesHtml);
	}

	for (var i = 0; i < videos.length; i++) {
		if(videos[i].tag!=null){
	   		tag=videos[i].tag.name+"|"
	   	}
	   	var share_url=commonCla.shareUrlBase+"/starshow5.0/video/share.html?id="+videos[i].id;
		videosHtml += '<li>' +
			'<div class="imgArea"><a href="' + share_url + '">' +
			'<img src="' + videos[i].cover + '!300x225" /></a></div>' +
			'<div class="descArea">' +
			'<a href="'+share_url+'">' +
			'<!--<h1>' + videos[i].en_title.toUpperCase() + '</h1>-->' +
			'<p>' + tag+videos[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<img src="themeAssets/images/icon-eye.jpg" />' +
			'<span>' + cWan(videos[i].watch_num) + '</span>' +
			'</section>' +
			'<section>' +
			'<img src="themeAssets/images/icon-heart.jpg"  />' +
			'<span>' + cWan(videos[i].like_num) + '</span>' +
			'</section>' +
			'</article>' +
			'</a>' +
			'</div>' +
			'</li>'
	}
	$("#videosTopicList").html(videosHtml);
	if($("#livesTopicList li").length>=resultData.data.lives.total){
		$("#livesTopicList").parent().find("#js_newsGetMore").hide();
	}
	if($("#videosTopicList li").length>=resultData.data.videos.total){
		$("#videosTopicList").parent().find("#js_newsGetMore").hide();
	}
	if($("#newsTopicList li").length>=resultData.data.news.total){
		$("#newsTopicList").parent().find("#js_newsGetMore").hide();
	}

}
var  cWan=function(num){
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
  	var news=ret.data.page_data;
   for (var i = 0; i < news.length; i++) {
	   	if(news[i].tag!=null){
	   		tag=news[i].tag.name+"|"
	   	}
	   	var share_url=commonCla.shareUrlBase+"/starshow5.0/news2.0/share.html?new_id="+news[i].id;
		newsHtml += '<li>' +
			'<div class="imgArea"><a href="'+share_url+'">' +
			'<img src="' + news[i].cover + '!300x225" /></a></div>' +
			'<div class="descArea">' +
			'<a href="'+share_url+'">' +
			'<!--<h1>' + news[i].en_title.toUpperCase() + '</h1>-->' +
			'<p>' + tag+news[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<img src="themeAssets/images/icon-eye.jpg" />' +
			'<span>' + cWan(news[i].watch_num) + '</span>' +
			'</section>' +
			'<section>' +
			'<img src="themeAssets/images/icon-heart.jpg"  />' +
			'<span>' + cWan(news[i].like_num)+ '</span>' +
			'</section>' +
			'</article>' +
			'</a>' +
			'</div>' +
			'</li>'
	}
	$("#newsTopicList").append(newsHtml);
  }else if(type=="videos"){
  	  var videos=ret.data.page_data;
      for (var i = 0; i < videos.length; i++) {
      	if(videos[i].tag!=null){
	   		tag=videos[i].tag.name+"|"
	   	}
	   	var share_url=commonCla.shareUrlBase+"/starshow5.0/video/share.html?id="+videos[i].id;
		videosHtml += '<li>' +
			'<div class="imgArea"><a href="' + share_url + '">' +
			'<img src="' + videos[i].cover + '!300x225" /></a></div>' +
			'<div class="descArea">' +
			'<a href="'+share_url+'">' +
			'<!--<h1>' + videos[i].en_title.toUpperCase() + '</h1>-->' +
			'<p>' + tag+videos[i].title + '</p>' +
			'<article class="activityList">' +
			'<section>' +
			'<img src="themeAssets/images/icon-eye.jpg" />' +
			'<span>' + cWan(videos[i].watch_num)+ '</span>' +
			'</section>' +
			'<section>' +
			'<img src="themeAssets/images/icon-heart.jpg"  />' +
			'<span>' + cWan(videos[i].like_num) + '</span>' +
			'</section>' +
			'</article>' +
			'</a>' +
			'</div>' +
			'</li>'
	}
	$("#videosTopicList").append(videosHtml);
  }else{
  	//lives
  	var lives=ret.data.page_data;
  	if (lives!=null && lives != "") {
        var live_share_url="";
		for (var i = 0; i < lives.length; i++) {
			if(lives[i].is_erect=="0"){
              live_share_url=commonCla.shareUrlBase+"/starshow5.0/live2.0/share.html?id="+lives[i].id;
			}else{
			  live_share_url=commonCla.shareUrlBase+"/starshow5.0/liveVertical/share.html?id="+lives[i].id;
			}
			livesHtml += '<li>' +
				'<div class="imgArea"><a href="' + live_share_url + '">' +
				'<img src="' + lives[i].cover + '!300x225" /></a></div>' +
				'<div class="descArea">' +
				'<a href="'+live_share_url+'">' +
			
				'<p>' + lives[i].title + '</p>' +
				'<article class="activityList">' +
				'<section>' +
				'<img src="themeAssets/images/icon-eye.jpg" />' +
				'<span>' + cWan(lives[i].watch_num)+ '</span>' +
				'</section>' +
				'<section>' +
				'<img src="themeAssets/images/icon-heart.jpg"  />' +
				'<span>' + cWan(lives[i].like_num) + '</span>' +
				'</section>' +
				'</article>' +
				'</a>' +
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
  if($("#"+type+"TopicList li").length>=90){
      count=7;
  }
  var url=host+"/theme/"+theme_id+"/"+type+"?current_count="+current_count+"&count="+count;
  commonCla.ajaxCommonFun(url,"get",function(ret){
  	if(ret!="" && ret!=null && ret.code=="200"){
  		initMoreHtml(ret,type);
  		if($("#"+type+"TopicList li").length>=100){
  			$("#"+type+"TopicList").parent().find(".moreData").hide();
  		}
  	}else{
  		$("#"+type+"TopicList").parent().find(".moreData").hide();
  	}
  })
}
var getThemeData = function() {
	var theme_id = commonCla.analyzParams("id");
	var url = host + "/theme/" + theme_id;
	commonCla.ajaxCommonFun(url, "get", function(resultData) {
		if (resultData != "" && resultData != null && resultData.code=="200") {
			initTheme(resultData);
      wx_share()
		} else if (resultData.code=="404"){
			 $("body").html("<img src='themeAssets/images/404.png' width='100%' />")
		}else{

		}

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