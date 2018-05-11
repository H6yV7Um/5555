// JavaScript Document
/*火星闻详情*/
var t = "";
var url = host + "web/" + id;
var getHotNewsDetail = function() {
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				$(".detailMain h2").text(resultData.data.video.title);
				$(".detailDesc p").text(resultData.data.video.description);
				var detailInfo = '<span>浏览量：' + resultData.data.video.watch_num + '</span>'
				detailInfo += '<span>发布时间：' + resultData.data.video.created_at + '</span>', $(".detailInfo").html(detailInfo);
				/*var player = new CloudVodPlayer();
				player.init({
					uu: "836964",
					vu: resultData.data.video.mms_id,
					p: "102",
					pu: "2964"
				}, "player");	*/
				var player = new CloudVodPlayer();
                player.init({url:resultData.data.video.video_url,posterType:2,autoSize:1},"player");
                
				var newsHtml = "";
				for (i = 0; i < resultData.data.related.length; i++) {
					newsHtml += "<dl><a href='hotNewsDetail.html?id=" + resultData.data.related[i].id + "'><dt><img src='" + resultData.data.related[i].cover + "!750x563' /></dt><dd>" + resultData.data.related[i].title + "</dd></a></dl>";
				}
				$(".news").html(newsHtml);				
				var recommend = "";
				for (var i = 0; i < resultData.data.recommend.length; i++) {
					recommend += "<li> <a href='leVideoDetail.html?id=" + resultData.data.recommend[i].id + "'>";
					recommend += "<p class='newsPic'><img src='" + resultData.data.recommend[i].cover + "!750x563'><i></i></p>";
					recommend += "<h3>" + resultData.data.recommend[i].title + "</h3>"
					recommend += "<p class='lookLike'><span>浏览量：" + resultData.data.recommend[i].watch_num + "</span><span class='ilike'>发布时间：" + resultData.data.recommend[i].created_at + "</span></p></a> </li>";
				}				
				$(".recommend ul").append(recommend)
				$(".newsMain li:nth-child(3n)").addClass("mr0");

			}
		}, {
			"type": 0
		})
	} /*乐视直播精彩内容详情*/
var getLeVideoDetail = function() {
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var relatedVideo = "";
				//sdk 移植
				/*var player = new CloudVodPlayer();
				player.init({
					uu: "836964",
					vu: resultData.data.video.mms_id,
					p: "102",
					pu: "2964"
				}, "player");*/
				var player = new CloudVodPlayer();
                player.init({url:resultData.data.video.video_url,posterType:2,autoSize:1},"player");
				$(".detailMain h2").text(resultData.data.video.title);
				$(".detailDesc p").text(resultData.data.video.description);
				var detailInfo = '<span>浏览量：' + resultData.data.video.watch_num + '</span>'
				detailInfo += '<span>发布时间：' + resultData.data.video.created_at + '</span>', $(".detailInfo").html(detailInfo);
				var newsHtml = "";
				for (i = 0; i < resultData.data.related.length; i++) {
					newsHtml += "<dl><a href='leVideoDetail.html?id=" + resultData.data.related[i].id + "'><dt><img src='" + resultData.data.related[i].cover + "!750x563' /></dt><dd>" + resultData.data.related[i].title + "</dd></a></dl>";
				}
				$(".news").html(newsHtml);				
				var recommend = "";
				for (var i = 0; i < resultData.data.recommend.length; i++) {
					recommend += "<li> <a href='leVideoDetail.html?id=" + resultData.data.recommend[i].id + "'>";
					recommend += "<p class='newsPic'><img src='" + resultData.data.recommend[i].cover + "!750x563'><i></i></p>";
					recommend += "<h3>" + resultData.data.recommend[i].title + "</h3>"
					recommend += "<p class='lookLike'><span>浏览量：" + resultData.data.recommend[i].watch_num + "</span><span class='ilike'>发布时间：" + resultData.data.recommend[i].created_at + "</span></p></a> </li>";
				}				
				$(".recommend ul").append(recommend)
				$(".newsMain li:nth-child(3n)").addClass("mr0");
			}
		})

	}
	
	var getFestival = function() {
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {	
				var newsHtml = "";
				for (i = 0; i < resultData.data.related.length; i++) {
					
						newsHtml += "<dl><a href='festivalDetail.html?id=" + resultData.data.related[i].id + "'><dt><img src='" + resultData.data.related[i].cover + "' /></dt><dd>" + resultData.data.related[i].title + "</dd></a></dl>";	
				
					
				}
				$(".news").html(newsHtml);				
				var recommend = "";
				for (var i = 0; i < resultData.data.recommend.length; i++) {
					recommend += "<li> <a href='leVideoDetail.html?id=" + resultData.data.recommend[i].id + "'>";
					recommend += "<p class='newsPic'><img src=" + resultData.data.recommend[i].cover + "><i></i></p>";
					recommend += "<h3>" + resultData.data.recommend[i].title + "</h3>";
					recommend += "<p class='lookLike'><span>浏览量：" + resultData.data.recommend[i].watch_num + "</span><span class='ilike'>发布时间：" + resultData.data.recommend[i].created_at + "</span></p></a> </li>";
				}				
				$(".recommend ul").append(recommend)
				$(".newsMain li:nth-child(3n)").addClass("mr0");

			}
		}, {
			"type": 2
		})
	}
	
	/*盛典详情*/
var getFestivalList = function() {
		var url = host + "web/"+100550;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var festivalCon = "";
				for (i = 0; i < resultData.data.related.length; i++) {
						festivalCon += "<li> <a href='festivalDetail.html?id="+resultData.data.related[i].id+"'> <p class='newsPic'><img  src="+resultData.data.related[i].cover+" /><i></i></p><h2>"+resultData.data.related[i].title+"</h2> <p class='lookLike'><span><i></i>"+resultData.data.related[i].watch_num+"</span></p> </a> </li>";		
				}
				$(".festivalCon ul").html(festivalCon);	
				$(".festivalCon li:nth-child(3n)").addClass("last");
			}
		},{"type":2});
	}
var getFestivalDetail = function() {
		var url = host + "web/"+id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var festivalCon = "";
				$(".detailMain h2").text(resultData.data.video.title);
				$(".detailInfo .fl span").text(resultData.data.video.created_at);
				$(".lookLike span").text(resultData.data.video.watch_num);
				//$("#video").attr("src",resultData.data.video.replay_url)
				//sdk 移植
				var player = new CloudVodPlayer();
                player.init({url:resultData.data.video.replay_url,posterType:2,autoSize:1},"player");
			}
		},{"type":2});
	}
		