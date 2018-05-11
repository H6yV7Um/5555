// JavaScript Document

function autoScroll(obj) {
	$(obj).find("ul").animate({
		marginTop: "-39px"
	}, 500, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	})
}
$(function() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			var key = $(".search input").val();
			window.location.href = "Search.html?key=" + encodeURI(key);
			//getSearchAll();
		}
	}
	getNotice();
	getTags();
	var rHeight = $(".right").height() + 180;
	$(".left").css("height", rHeight);
	$(".iapp").hover(function(e) {
		$(".app").show();
	}, function() {
		$(".app").hide();
	});
	$(".iweix").hover(function(e) {
		$(".weix").show();
	}, function() {
		$(".weix").hide();
	});
	$(".search i").click(function() {
		var key = $(".search input").val();
		if (key == "") {
			$(".search input").val("请输入关键字");
		} else {
			window.location.href = "Search.html?key=" + encodeURI(key);
			getSearchAll();
		}
	})
	setInterval('autoScroll(".notice")', 2000);
});
//var host = "http://123.57.0.118:5000/v3/";
var host = "http://api.startvshow.com/v10/";
//var host2 = "http://123.57.0.118:5000/v6/";
var host2 = "http://api.startvshow.com/v10/";
var analyzParams = function(param_name) {
		var url = window.location.search.split("?")[1];
		if (url == "" || url == undefined) return url;
		url = url.split(param_name + "=")[1];
		if (url == "" || url == undefined) {
			url = "";
			return url;
		}
		if (url.indexOf("&") > 0) {
			url = url.split("&")[0];
		}
		return url;
	}
var id = analyzParams("id");
var ajaxCommonFun = function(url, type, callbackFun, params) {
		$.ajax({
			url: url,
			type: type,
			dataType: 'json',
			async: false,
			cache: false,
			data: params,
			success: function(data) {
				//回调函数
				if (callbackFun) {
					callbackFun(data);
				}
			},
			error: function() {}
		})
	} /*系统通知*/
var url = host + "home";
var getNotice = function() {
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") { /*时尚头条*/
				var newsHtml = "";
				for (i = 0; i < resultData.data.heads.length; i++) {
					newsHtml += "<dl><a href='NewsDetail.html?news_id=" + resultData.data.heads[i].id + "'><dt><img src='" + resultData.data.heads[i].cover + "' /></dt><dd>" + resultData.data.heads[i].title + "</dd></a></dl>";
				}
				$(".news").html(newsHtml); /*星榜*/
				var starListHtml = "";
				for (var i = 0; i < resultData.data.lists.length; i++) {
					starListHtml += "<dl><a href='starsListDetail.html?id=" + resultData.data.lists[i].user.id + "&key=" + resultData.data.lists[i].user_name + "'><dt><img src='" + resultData.data.lists[i].user.head_pic + "' /><span class='starNumber'>" + (i + 1) + "</span></dt><dd>" + resultData.data.lists[i].user_name + "</dd></a></dl>";
				}
				$(".box").html(starListHtml); /*火星闻*/
				var videos = "";
				for (i = 0; i < resultData.data.videos.length; i++) {
					videos += "<dl><a href='hotNewsDetail.html?id=" + resultData.data.videos[i].id + "'><dt><img src='" + resultData.data.videos[i].cover + "' /><i></i></dt><dd>" + resultData.data.videos[i].title + "</dd></a></dl>";
				}
				$(".videos").html(videos);
				$(".videos dl:eq(0)").addClass("bigPic");
				$(".videos dl:eq(1)").addClass("bigPic mr0");
				$(".videos dl:eq(4)").addClass("mr0"); /*时尚头条*/
				var newsBox = "";
				for (i = 0; i < resultData.data.news.length; i++) {
					newsBox += "<dl><a href='NewsDetail.html?news_id=" + resultData.data.news[i].id + "'><dt><img src='" + resultData.data.news[i].cover + "' /></dt><dd>" + resultData.data.news[i].title + "</dd></a></dl>";
				}
				$(".newsBox").html(newsBox);
				$(".newsBox dl:eq(0)").addClass("bigPic");
				$(".newsBox dl:eq(1)").addClass("bigPic mr0");
				$(".newsBox dl:eq(4)").addClass("mr0"); /*星推荐*/
				var starsHtml = "";
				for (var i = 0; i < resultData.data.stars.length; i++) {
					starsHtml += "<dl><a href='NewsDetail.html?news_id=" + resultData.data.stars[i].bound_id + "'><dt><img src=" + resultData.data.stars[i].users.head_pic + " /></dt><dd>" + resultData.data.stars[i].users.name + "</dd></a></dl>";
				}
				$(".stars").html(starsHtml); /*星美图*/
				var stellarMapCon = "";
				stellarMapCon += "<div class='w'><div class='fl box1'><a href='stellarMap.html?id=" + resultData.data.pictures[0].id + "'><img src=" + resultData.data.pictures[0].cover + " /><p>" + resultData.data.pictures[0].title + "</p>        </a></div>";
				stellarMapCon += "<div class='fr'><div class='box2'><a href='stellarMap.html?id=" + resultData.data.pictures[1].id + "'><i></i><img src=" + resultData.data.pictures[1].cover + " /><p>" + resultData.data.pictures[1].title + "</p></a></div>";
				stellarMapCon += "<div class='box2 box3'><a href='stellarMap.html?id=" + resultData.data.pictures[2].id + "'><i></i><p>" + resultData.data.pictures[2].title + "</p>     <img src=" + resultData.data.pictures[2].cover + " /></a></div></div></div>";
				stellarMapCon += "<div class='w'><div class='fl'><div class='box2 box4'> <a href='stellarMap.html?id=" + resultData.data.pictures[3].id + "'><i></i> <p>" + resultData.data.pictures[3].title + "</p><img src='" + resultData.data.pictures[3].cover + "' /> </a></div>";
				stellarMapCon += "<div class='box2 box5'><a href='stellarMap.html?id=" + resultData.data.pictures[4].id + "'><i></i> <img src=" + resultData.data.pictures[4].cover + " /></a><p>" + resultData.data.pictures[4].title + "</p></div></div>";
				stellarMapCon += "<div class='fr'><div class='fl box1'><a href='stellarMap.html?id=" + resultData.data.pictures[5].id + "'><img src=" + resultData.data.pictures[5].cover + " /><p>" + resultData.data.pictures[5].title + "</p></p></a></div></div></div>";
				$(".stellarMapCon").append(stellarMapCon);
				var focusHtml = "";
				for (i = 0; i < resultData.data.focus.length; i++) {
					if (resultData.data.focus[i].type == 4) {
						focusHtml += "<li><a href='hotNewsDetail.html?id=" + resultData.data.focus[i].object_id + "' ><img src='" + resultData.data.focus[i].cover + "'  /></a></li>";
					} else if (resultData.data.focus[i].type == 6) {
						focusHtml += "<li><a href='NewsDetail.html?id=" + resultData.data.focus[i].object_id + "' ><img src='" + resultData.data.focus[i].cover + "'  /></a></li>";
					} else if (resultData.data.focus[i].type == 3) {
						focusHtml += "<li><a href='liveDetail.html?id=" + resultData.data.focus[i].object_id + "' ><img src='" + resultData.data.focus[i].cover + "'  /></a></li>";
					} else if (resultData.data.focus[i].type == 1) {
						focusHtml += "";
					} else {
						focusHtml += "<li><a href='javascript:;' ><img src='" + resultData.data.focus[i].cover + "'  /></a></li>";
					}

				}

				$(".rslides").html(focusHtml);
				if ($(".f426x240").html() != undefined) {
					$(".f426x240").responsiveSlides({
						auto: true,
						pager: true,
						nav: true,
						speed: 700,
						maxwidth: 750
					});
				}
				if (resultData.data.systems == "") {
					$(".notice i").hide();
				} else {
					$(".notice i").show();
					var notice = "";
					for (var i = 0; i < resultData.data.systems.length; i++) {
						notice += " <li><a href='javascript:;'>" + resultData.data.systems[i].title + " </a></li>";
					}
					$(".notice ul").html(notice);
				}
				var topNews = "";
				for (var i = 0; i < resultData.data.heads.length; i++) {
					topNews += " <dl><a href='NewsDetail.html?id=" + resultData.data.heads[i].id + "'><dt class='fl'><img src=" + resultData.data.heads[i].cover + " width='185' height='139' /></dt><dd class='fl'>" + resultData.data.heads[i].title + "</dd></a></dl>";
				}
				$(".topNews").html(topNews);
			}
		})
	} /*搜索*/
var key = decodeURI(analyzParams("key"));
var getSearch = function() {
		var url = host + "list/search";
		var count = $(".peopleCon dl").length;
		ajaxCommonFun(url, "post", function(resultData) {
			if (resultData.code == "200") {
				if (resultData.data.page_data == "") {
					$(".peopleWrap .more a").text("没有更多数据了...");
				} else {
					$(".more").show();
					for (var i = 0; i < resultData.data.page_data.length; i++) {
						var peopleCon = "";
						peopleCon += "<dl><a href='starsListDetail.html?id=" + resultData.data.page_data[i].user_id + "&key=" + resultData.data.page_data[i].user.name + "'><dt><img src=" + resultData.data.page_data[i].user.head_pic + " /></dt><dd>" + resultData.data.page_data[i].user.name + "</dd></dl>"
						$(".peopleCon ul").append(peopleCon);
					}
					var searchPeople = "<div class='peopleTit '>相关人物</div>";
					$(".searchPeople").html(searchPeople);
					if ($(".peopleCon ul") !== "") {
						$(".nullData").hide();
					}
				}

			}
		}, {
			"name": key,
			"current_count": count
		})

	} /*搜索视频 搜索新闻*/
var getSearchAll = function() {
		var url = host + "search/act";
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				if (resultData.data.videos == "" && resultData.data.news == "") {
					$(".nullData").show();
				} else {
					var searchHot = "";
					for (var i = 0; i < resultData.data.videos.length; i++) {
						searchHot += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.videos[i].id + "'><p class='newsPic'><img  src=" + resultData.data.videos[i].cover + " /><i></i></p><h2>" + resultData.data.videos[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.videos[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.videos[i].like_num + "</span></p></a> </li>";
					}
					var searchVideoTit = "<div class='peopleTit mt30 '>火星闻</div>"
					$(".searchHot ul").append(searchHot);
					$(".searchVideoTit").append(searchVideoTit);
					if (resultData.data.videos != "") {
						var relatedVideoTit = "<div class='tit mt30'>相关视频</div>"
						$(".relatedVideoTit").html(relatedVideoTit)
					}
					$(".relatedVideoCon ul").append(searchHot)
					var searchNews = "";
					for (var i = 0; i < resultData.data.news.length; i++) {
						searchNews += "<li> <a href='NewsDetail.html?id=" + resultData.data.news[i].id + "'><p class='newsPic'><img  src=" + resultData.data.news[i].cover + " /></p><h2>" + resultData.data.news[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.news[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.news[i].like_num + "</span></p></a> </li>";
					}
					var searchNewsTit = "<div class='peopleTit mt30 '>时尚头条</div>"
					$(".searchNews ul").append(searchNews);
					$(".searchNewsTit").append(searchNewsTit)
					if (resultData.data.news != "") {
						var relatedNewsTit = "<div class='tit mt30 '>相关新闻</div>";
						$(".relatedNewsTit").append(relatedNewsTit);
					}
					$(".relatedNewsCon ul").append(searchNews)
				}

			}
		}, {
			"key_word": key

		})

	}

	/*标签分类*/
var getTags = function() {
		var url = host2 + "user/role";
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var tagHtml = "";
				for (var i = 0; i < resultData.data.length; i++) {
					//for (var j = 0; j < resultData.data[i].users.length; j++) {					
					if (resultData.data[i].id == id) {
						tagHtml += "<a href='tags.html?id=" + resultData.data[i].id + "' class='cur'>" + resultData.data[i].name + "</a>";
					} else {
						tagHtml += "<a href='tags.html?id=" + resultData.data[i].id + "'>" + resultData.data[i].name + "</a>";
					}
					//}
				}
				$(".tag p").html("<a href='leFashion.html'>乐时尚</a>" + tagHtml);
				$(".tag a:nth-child(2n)").addClass("fr");


			}
		})
	} /*用户视频*/
var getUserVideo = function() {
		var url = host + "user/" + id + "/videos";
		var count = $(".userVideo li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var userVideoHtml = "";
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					userVideoHtml += "<li> <a href='hotNewsDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /><i></i></p><h2>" + resultData.data.page_data[i].title + "</h2><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
				}
				$(".userVideo ul").append(userVideoHtml);
				if (resultData.data.page_data.length == "" || resultData.data.total < 10) {
					$(".moreVideo a").text("没有更多数据了...");
				}
				if (resultData.data.total == 0) {
					$(".userVideo").hide();
				}
			}
		}, {
			"current_count": count

		})

	} /*用户文章*/
var getUserArticle = function() {
		var url = host + "user/" + id + "/article";
		var count = $(".userArticle li").length;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var userArticleHtml = "";
				for (var i = 0; i < resultData.data.page_data.length; i++) {
					userArticleHtml += "<li> <a href='NewsDetail.html?id=" + resultData.data.page_data[i].id + "'><p class='newsPic'><img  src=" + resultData.data.page_data[i].cover + " /></p><h3>" + resultData.data.page_data[i].title + "</h3><p class='lookLike'><span><i></i>" + resultData.data.page_data[i].watch_num + "</span><span class='ilike'><i></i>" + resultData.data.page_data[i].like_num + "</span></p></a> </li>";
				}
				$(".userArticle ul").append(userArticleHtml);
				if (resultData.data.page_data == "" || resultData.data.total < 10) {
					$(".moreArticle a").text("没有更多数据了...");
				}
				if (resultData.data.total == 0) {
					$(".userArticle").hide();
				}
			}
		}, {
			"current_count": count

		})

	} /*星美图列表*/
var getPicture = function() {
		var url = host + "picture/home";
		ajaxCommonFun(url, "post", function(resultData) {
			if (resultData.code == "200") {
				var pictureHtml = "";
				for (var i = 0; i < resultData.data.length; i++) {
					pictureHtml += "<a href='stellarMap.html?id=" + resultData.data[i].id + "'><img src='" + resultData.data[i].cover + "'/></a>";
				}
				$(".pictureList").append(pictureHtml);
				$(".pictureList a:even").addClass("fl");
				$(".pictureList a:odd").addClass("fr");
			}
		})

	}