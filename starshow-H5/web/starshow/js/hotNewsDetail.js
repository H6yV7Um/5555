// JavaScript Document
/*火星闻详情*/
var t = "";
var getHotNewsDetail = function() {
		var url = host + "video/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				$(".detailMain h2").text(resultData.data.current_video.title);
				var detailInfo = '<div class="fl">' + resultData.data.user_info.name + '<span>';
				detailInfo += '' + resultData.data.current_video.created_at + '</span></div>';
				detailInfo += '<div class="fr lookLike"><i></i>' + resultData.data.current_video.watch_num + '';
				detailInfo += '<span class="ilike"><i></i>' + resultData.data.current_video.like_num + '</span></div>'
				$(".detailInfo").html(detailInfo);
				$('#video').attr('src', resultData.data.current_video.video_url);
				$(".detailDesc").text(resultData.data.current_video.description);
				var relatedVideo = "";
				for (var i = 0; i < 6; i++) {

					if (resultData.data.video_list.page_data[i].id == id) {
						relatedVideo += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.video_list.page_data[6].id + "'>";
						relatedVideo += "<p class='newsPic'><img src=" + resultData.data.video_list.page_data[6].cover + "><i></i></p>";
						relatedVideo += "<h3>" + resultData.data.video_list.page_data[6].title + "</h3>"
						relatedVideo += "<p class='lookLike'><span><i></i>" + resultData.data.video_list.page_data[6].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.video_list.page_data[6].like_num + "</span></p></a> </li>";
					} else {
						relatedVideo += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.video_list.page_data[i].id + "'>";
						relatedVideo += "<p class='newsPic'><img src=" + resultData.data.video_list.page_data[i].cover + "><i></i></p>";
						relatedVideo += "<h3>" + resultData.data.video_list.page_data[i].title + "</h3>"
						relatedVideo += "<p class='lookLike'><span><i></i>" + resultData.data.video_list.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.video_list.page_data[i].like_num + "</span></p></a> </li>";
					}

				}

				$(".relatedVideo ul").append(relatedVideo)

			}
		})
	} /*时尚头条详情*/
var getNewsDetail = function() {
		var url = host + "news/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				$(".detailMain h2").text(resultData.data.title);
				var detailInfo = '<div class="fl">' + resultData.data.user.name + '<span>';
				detailInfo += '' + resultData.data.created_at + '</span></div>';
				detailInfo += '<div class="fr lookLike"><i></i>' + resultData.data.watch_num + '';
				detailInfo += '<span class="ilike"><i></i>' + resultData.data.like_num + '</span></div>'
				$(".detailInfo").html(detailInfo);
				$(".detailCon").html(resultData.data.content);
				$(".cover img").attr("src", resultData.data.cover)
				
				$("#item").attr("ids",resultData.data.id); /*unique ID, alphanumeric*/
				$("#item").attr("title",resultData.data.title);  /*max 255 characters*/
				$("#item").attr("content",resultData.data.share.content);  /*max 255 characters*/
				$("#item").attr("url","http://www.xingxiu.tv/NewsDetail.html?news_id="+resultData.data.id);  /*max 1024 characters*/
				$("#item").attr("img",resultData.data.cover);
				
				//ad
				(function(c){var g,s='script',w=window,n=c.name||'PLISTA';if(!w[n]){w[n]=c;g=w.document.getElementsByTagName(s)[0];s=w.document.createElement(s);s.async=true;s.type='text/javascript';s.src=(w.location.protocol==='https:'?'https:':'http:')+'//static'+(c.origin?'-'+c.origin:'')+'.plista.com/async'+(c.name?'/'+c.name:'')+'.js';g.parentNode.insertBefore(s,g);}
				}({
				    "publickey": "530e0503202b995561f9febf",
				    "item": {
				        "objectid": $("#item").attr("ids"),  /*unique ID, alphanumeric*/
				        "title": $("#item").attr("title"),  /*max 255 characters*/
				        "text": $("#item").attr("content"),  /*max 255 characters*/
				        "url":$("#item").attr("url"),  /*max 1024 characters*/
				        "img":  $("#item").attr("img"),  /*max 255 characters*/
				        "category": "News",
				        "published_at": 1400000000,  /*UNIX timestamp, date article was first published*/
				        "updated_at": 1400000000  /*UNIX timestamp, date article was last modified*/
				    },
				    "origin": "cn"
				}));
			}
		})
	} /*全部榜单*/
var getNewsList = function(ind, list_id) {
		var url = host + "list/" + list_id;
		var count = $(".listCon dl").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var listConHtml = "";
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					if (ind == 1) {
						listConHtml += "<dl><a href='starsListDetail.html?id=" + resultData.data.page_data[i].user.id + "&key=" + resultData.data.page_data[i].user.name + "'><dt>" + (count + i + 1) + "</dt><dd class='listCover'><img src=" + resultData.data.page_data[i].user.head_pic + " /></dd><dd class='listName'>" + resultData.data.page_data[i].user.name + "</dd><dd class='listLike'><i></i>" + resultData.data.page_data[i].like_num + "</dd></a></dl>";
					} else if (ind == 2) {
						listConHtml += "<dl><a href='starsListDetail.html?id=" + resultData.data.page_data[i].user.id + "&key=" + resultData.data.page_data[i].user.name + "'><dt>" + (count + i + 1) + "</dt><dd class='listCover'><img src=" + resultData.data.page_data[i].user.head_pic + " /></dd><dd class='listName'>" + resultData.data.page_data[i].user.name + "</dd><dd class='listLike'><i></i>" + resultData.data.page_data[i].week_like_num + "</dd></a></dl>";
					} else if (ind == 3) {
						listConHtml += "<dl><a href='starsListDetail.html?id=" + resultData.data.page_data[i].user.id + "&key=" + resultData.data.page_data[i].user.name + "'><dt>" + (count + i + 1) + "</dt><dd class='listCover'><img src=" + resultData.data.page_data[i].user.head_pic + " /></dd><dd class='listName'>" + resultData.data.page_data[i].user.name + "</dd><dd class='listLike'><i></i>" + resultData.data.page_data[i].month_like_num + "</dd></a></dl>";
					}
				}
				$(".listCon ul").append(listConHtml);
				$(".listCon dl:odd").addClass("odd");
				$(".listCon dl:lt(3)").addClass("three");
				if (resultData.data.page_data == "") {
					alert("没有数据了")
				}
			}
		}, {
			"current_count": count,
			"type": ind,
			"list_id": list_id
		})
	}
var num = analyzParams("num"); /*榜单详情页*/
var getListDetail = function() {
		var url = host + "list/" + id + "/user";
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var userPic = '<dl><dt><img src=' + resultData.data.star.user.head_pic + ' /></dt>';
				userPic += '<dd>' + resultData.data.star.user_name + '</dd></dl>';
				$(".listRank dd").text(resultData.data.star.star_rank);
				$(".listNum dd span").text(resultData.data.star.like_num);
				$(".userPic").html(userPic);
				if (resultData.data.star.user.introduction == "") {
					$(".nullData").show();
				} else {
					$(".userCon").html(resultData.data.star.user.introduction);
				}
				if (resultData.data.star.user.description == "") {

				} else {
					var userDescTit = "<div class='peopleTit mt30 '>个人简介</div>";
					$(".userDescTit").append(userDescTit);
					$(".userDescCon").html(resultData.data.star.user.description);
				}
				var userWorksCon = "";
				for (var i = 0; i < resultData.data.star.userWorks.length; i++) {

					if (resultData.data.star.userWorks[i].work_type.id == 1) {
						userWorksCon += "<li> <a href='javascrpt:;'><p class='newsPic'><img  src=" + resultData.data.star.userWorks[i].cover + " ><i></i></p><h2>" + resultData.data.star.userWorks[i].title + "</h2></a> </li>";
						var userWorksTit = "<div class='peopleTit mt30 '>影视作品</div>";
					} else {

					}
				}
				$(".userWorksCon ul").append(userWorksCon);
				$(".userWorksTit").append(userWorksTit);
			}
		})
	}
var src = "";

/*直播视频*/

var getLiveDetail = function() {
		var url = host + "live/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				initJcountdown(resultData.current_time.replace(/-/g, "/"), resultData.data.created_at.replace(/-/g, "/"), "countdown");
				//执行
				var Go = window.setInterval(function() {
					var bTime = resultData.current_time.replace(/-/g, "/");
					var eTime = resultData.data.created_at.replace(/-/g, "/")
					initJcountdown(bTime, eTime, "countdown");

				}, 60000)
				var url = host + "user/" + resultData.data.user.id + "/lives";
				ajaxCommonFun(url, "get", function(resultData) {
					if (resultData.code == "200") {
						var relatedVideo = "";
						if (resultData.data.page_data.length > 0) {
							$(".relatedNews").show();
							for (var i = 0; i < resultData.data.page_data.length; i++) {
								relatedVideo += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.page_data[i].id + "'>";
								relatedVideo += "<p class='newsPic'><img src=" + resultData.data.page_data[i].cover + "><i></i></p>";
								relatedVideo += "<h3>" + resultData.data.page_data[i].title + "</h3>"
								relatedVideo += "<p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
							}

							$(".relatedVideo ul").append(relatedVideo)
						}
					}
				})
				$(".detailMain h2").text(resultData.data.title);
				var detailInfo = '<div class="fl">' + resultData.data.user.name + '<span>';
				detailInfo += '' + resultData.data.created_at + '</span></div>';
				detailInfo += '<div class="fr lookLike"><i></i>' + resultData.data.watch_num + '';
				detailInfo += '<span class="ilike"><i></i>' + resultData.data.like_num + '</span></div>'
				$(".detailInfo").html(detailInfo);
				/*status 1直播*/
				if (resultData.data.status == 1) {
					$("#player-container").show()
					src = resultData.data.pull_url;
					$("#Highlights").hide();
					$("#livePreview").hide();
				}
				/*status 2回放*/
				if (resultData.data.status == 2) {
					$("#player-container").hide();
					$("#Highlights").html("<video  controls='controls' autoplay webkit-playsinline style='width: 100%; height: 100%; position: relative; display: inline;' src='" + resultData.data.replay_url + "'> </video>");
					$("#Highlights").show();
					$("#livePreview").hide();
				}
				/*status 3预热*/
				if (resultData.data.status == 3) {
					$("#player-container").hide();
					$("#Highlights").hide();
					$("#livePreview").show();
					if (resultData.data.cover != "") {
						$("#livePreview ul").html("<img src='" + resultData.data.cover + "'> </img>");
					}else{
						$("#livePreview ul").html("<video  controls='controls' autoplay webkit-playsinline style='width: 100%; height: 100%; position: relative; display: inline;' src='" + resultData.data.cover_video + "'> </video>");
					}
				}
			}
		})
	}

function play() {
	if (src) {
		playM3U8(src);
	}
	return false;
}
var initJcountdown = function(currentTime, endTime, containerId) {
		var EndTime = new Date(endTime);
		var NowTime = new Date(currentTime);
		if (t == "") t = EndTime.getTime() - NowTime.getTime();
		var d = 0;
		var h = 0;
		var m = 0;
		var s = 0;
		if (t >= 0) {
			d = Math.floor(t / 1000 / 60 / 60 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}
		var formatDate = "精彩倒计时：<span>" + d + "</span>天" + "<span>" + h + "</span>时" + "<span>" + m + "</span>分"
		var status = $("#tvStatus").attr("status");
		$("#" + containerId).html(formatDate);
		t = t - 60000;
		if (d == 0 && h == 0 && m == 0) {

			if (status == -1 || status == 3) {
				$("#countdown").html("即将开始");
			}

		}

	} /*乐视直播详情*/
var getLeLiveDetail = function() {
		var url = host2 + "lsLive/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var relatedVideo = "";
				//sdk 移植
				var player = new CloudLivePlayer();
				//activityId 请换成自己设置的获得id
				player.init({activityId: resultData.data.lsLive.mms_id,p:"102",customerId:"853371"}, "player");
				$(".detailMain h2").text(resultData.data.lsLive.live_name);
				var detailInfo = '<div class="fl">' + resultData.data.lsLive.cp_name + '<span>';
				detailInfo += '' + resultData.data.lsLive.created_at + '</span></div>';
				detailInfo += '<div class="fr lookLike"><i></i>' + resultData.data.lsLive.watch_num + '';
				detailInfo += '<span class="ilike"><i></i>' + resultData.data.lsLive.like_num + '</span></div>'
				$(".detailInfo").html(detailInfo);

			}
		})
	} /*乐视直播精彩内容详情*/
var getLeVideoDetail = function() {
		var url = host2 + "lsVideo/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var relatedVideo = "";
				//sdk 移植
				var player = new CloudVodPlayer();
				player.init({uu: "853371",vu: resultData.data.lsVideo.mms_id,p: "102",pu: "2576"}, "player");
				$(".detailMain h2").text(resultData.data.lsVideo.video_name);
				var detailInfo = '<div class="fl">' + resultData.data.lsVideo.cp_name + '<span>';
				detailInfo += '' + resultData.data.lsVideo.created_at + '</span></div>';
				detailInfo += '<div class="fr lookLike"><i></i>' + resultData.data.lsVideo.watch_num + '';
				detailInfo += '<span class="ilike"><i></i>' + resultData.data.lsVideo.like_num + '</span></div>'
				$(".detailInfo").html(detailInfo);

			}
		})

	}