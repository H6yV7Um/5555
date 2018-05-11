// JavaScript Document
/*火星闻列表*/

var getHotList = function() {
		var url = host + "video";
		var count = $(".newsMain li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var newsMainHtml = "";
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					newsMainHtml += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h3>" + resultData.data.page_data[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
				}
				$(".newsMain ul").append(newsMainHtml);
				$(".newsMain li:first").addClass("bigPic");

				$(".newsMain li:nth-child(5n+1)").addClass("bigPic");
				if (resultData.data.page_data == "") {
					$(".moreVideo a").text("没有更多数据了...");
				} else {

				}
			}
		}, {
			"current_count": count
		})

	} /*时尚头条*/
var getNewsList = function() {
		var url = host + "news";
		var count = $(".newsMain li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var newsMainHtml = "";
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					newsMainHtml += "<li> <a href='NewsDetail.html?news_id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /></p><h3>" + resultData.data.page_data[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
				}
				$(".newsMain ul").append(newsMainHtml);
				$(".newsMain li:first").addClass("bigPic");
				$(".newsMain li:nth-child(5n+1)").addClass("bigPic");
				if (resultData.data.page_data == "") {
					$(".moreArticle a").text("没有更多数据了...");
				}
			}
		}, {
			"current_count": count
		})

	} /*直播*/
var getLive = function() {
		var url = host2 + "live";
		var count = $(".Highlights  li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var liveIng = "";
				var livePreview = "";
				var Highlights = "";
				var festivalCon01 = "";
				for (var i = 0; i < resultData.data.onlineLives.length; i++) {
					if (resultData.data.onlineLives[i].status == 1) {
						$(".liveTit").html("<div class='tit w750'>直播中ing</div>")
						liveIng += "<li> <a href='liveDetail.html?id=" + resultData.data.onlineLives[i].id + "'><p class='newsPic'><img  src=" + resultData.data.onlineLives[i].cover + " /><i></i></p><h3>" + resultData.data.onlineLives[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.onlineLives[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.onlineLives[i].like_num + "</span></p></a> </li>";
					} else {
						$(".livePreviewTit").html("<div class='tit w750'>直播预告</div>")
						livePreview += "<li> <a href='liveDetail.html?id=" + resultData.data.onlineLives[i].id + "'><p class='newsPic'><img  src=" + resultData.data.onlineLives[i].cover + " /><i></i></p><h3>" + resultData.data.onlineLives[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.onlineLives[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.onlineLives[i].like_num + "</span></p></a> </li>";
					}
				}
				for (var i = 0; i < resultData.data.replayLives.length; i++) {
					Highlights += "<li> <a href='liveDetail.html?id=" + resultData.data.replayLives[i].id + "'><p class='newsPic'><img  src=" + resultData.data.replayLives[i].cover + " /><i></i></p><h3>" + resultData.data.replayLives[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.replayLives[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.replayLives[i].like_num + "</span></p></a> </li>";
					
				}
/*	
				for (var i = 0; i < 2; i++) {
					festivalCon01 += "<li> <a href='liveDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h2>" + resultData.data.page_data[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
				}

				$(".festivalCon01 ul").append(festivalCon01);
				$(".festivalCon01 ul li:eq(1)").addClass("last");
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					if (resultData.data.page_data[i].status == 1) {
						$(".liveTit").html("<div class='tit w750'>直播中ing</div>")
						liveIng += "<li> <a href='liveDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h2>" + resultData.data.page_data[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";

					}
					if (resultData.data.page_data[i].status == 3) {
						$(".livePreviewTit").html("<div class='tit w750'>直播预告</div>")
						livePreview += "<li> <a href='liveDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h2>" + resultData.data.page_data[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";


					}
					if (resultData.data.page_data[i].status == 2) {
						Highlights += "<li> <a href='liveDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h2>" + resultData.data.page_data[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";

					}

				}*/
				$(".liveIng ul").append(liveIng);
				$(".Highlights ul").append(Highlights);
				$(".livePreview ul").append(livePreview);
				$(".liveIng li:first").addClass("bigPic");

			}
		}, {
			"current_count": count
		})

	} /*精彩直播*/

var getLeLive = function() {
		var url = host2 + "lsLive";
		var count = $(".leLiveCon  li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				if (resultData.data.lsLives != "") {
					var leLiveCon = "";
					$(".leLiveTit").html("<div class='tit w750'>精彩直播</div>");
					for (var i = 0; i < resultData.data.page_data.length; i++) {
						leLiveCon += "<li> <a href='leLiveDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].live_cover + " /><i></i></p><h3>" + resultData.data.page_data[i].live_name + "</h3><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
					}
					$(".leLiveCon ul").append(leLiveCon);
				}
				if (resultData.data.page_data == "") {
					$(".leLiveCon .more a").text("没有更多数据了...");
				}
			}
		}, {
			"current_count": count
		});


	} /*精彩内容*/
var getLeVideo = function() {
		var url = host2 + "lsVideo";
		var count = $(".leVideoCon  li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				if (resultData.data.lsVideos != "") {
					var leVideoCon = "";
					$(".leVideoTit").html("<div class='tit w750'>精彩内容</div>");
					for (var i = 0; i < resultData.data.lsVideos.length; i++) {
						leVideoCon += "<li> <a href='leVideoDetail.html?id=" + resultData.data.lsVideos[i].id + "'><p class='newsPic'><img  src=" + resultData.data.lsVideos[i].cover + " /><i></i></p><h3>" + resultData.data.lsVideos[i].video_name + "</h3><p class='lookLike'><span><i></i>" + resultData.data.lsVideos[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.lsVideos[i].like_num + "</span></p></a> </li>";
					}
				
					$(".leVideoCon ul").append(leVideoCon);
				}
				if (resultData.data.page_data == "") {
					$(".leVideoCon .more a").text("没有更多数据了...");
				}
			}
		}, {
			"current_count": count
		});


	}