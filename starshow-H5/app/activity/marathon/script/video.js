// JavaScript Document
var id = location.search.replace(/\?id=(\d+).*/, '$1');
var uid = location.search.slice(location.search.indexOf("&uid=") + 5).split("&")[0];
//var host = "http://123.57.0.118:5000/v3/"; //测试
var host = "https://startvshow.com/v3/"; //正式

var title = "";
var t = "";

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

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
var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token");
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
	}
var ad = [];
//

function splitTime(time) {
	var timeMark = time.split(":");
	var h = Number(timeMark[0]);
	var m = Number(timeMark[1]);
	var s = Number(timeMark[2]);
	var time_option = 0;
	var hs = 0;
	var ms = 0;
	var ss = 0;
	if (h > 0) {
		hs = Number(h * 3600);
	} else if (m > 0) {
		ms = Number(m * 60);
	} else {
		ss = Number(s);
	}
	time_option = hs + ms + ss;
	return time_option;
}
var duration = 0;
var adTime = 0;
function adv() {
	clearInterval(adTime);
	for (var i = 0; i < ad.length; i++) {

		var cTime = video.currentTime;
		var s_beginTime = splitTime(ad[i].pivot.begin_time);
		var s_endTime = splitTime(ad[i].pivot.end_time);
		if (cTime >= s_beginTime && cTime <= s_endTime) {
			duration = s_endTime - s_beginTime;

			$(".ad_area").show()
			var adHtml = ""
			adHtml = '<div class="ad_pic"><a href="' + ad[i].url + '"><img src="' + ad[i].cover + '"/></a></div><div class="close"><img src="images/close.png"></div>';
			
		}
		$(".ad_area").html(adHtml)
	}
	adTime = setInterval("adv()", duration * 1000);
}

var initLivePage = function() {

		//localstorage unlike 赋值
		var id = analyzParams("id") == undefined ? "" : analyzParams("id");
		var storage = window.localStorage;
		if (!storage.getItem("unlike" + id)) storage.setItem("unlike" + id, 0);
		//点赞
		$("#btn-zan").live('tap', function() {

			var zan = $(this).attr("zan");
			var liveLikeUrl = host + "video/" + id + "/like?jwt_token=" + jwt_token;
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
				thisObj.attr("src", "images/newLikeCur.png");
				thisObj.next("span").html(Number(zanNum + 1));
				thisObj.attr("zan", Number(zanNumAttr + 1))
			} else {
				thisObj.attr("src", "images/newLike.png");
				thisObj.next("span").html(Number(zanNum - 1) < 0 ? 0 : Number(zanNum - 1));
				thisObj.attr("zan", Number(zanNumAttr - 1) < 0 ? 0 : Number(zanNum - 1))
			}
			thisObj.addClass("animated");
			thisObj.addClass("rubberBand");
			setTimeout(function() {
				//thisObj.find("img").attr("src","assets/images/icon-like.png");
				thisObj.removeClass("animated");
				thisObj.removeClass("rubberBand")
			}, 500);
			//+1操作end
			ajaxCommonFun(liveLikeUrl, "post", function(resultData) {
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

		})
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

	}
	//autoscroll

function AutoScroll(obj) {
	if ($(".star_info ul:first li").length < 2) {
		window.clearInterval($t); //清楚定时器
		return;
	}
	$(obj).find("ul:first").animate({
		marginTop: "-4rem" //和上面的height一致 
	}, 800, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	});
}

function animateSh(pobj) {
	var changeFront = pobj.find(".list").eq(0);
	var changeBack = pobj.find(".list").eq(1);
	if (changeBack.hasClass("none")) {
		changeFront.removeClass("flipInY").addClass("flipOutY");
		changeBack.removeClass("flipOutY").addClass("flipInY");
		setTimeout(function() {
			changeFront.addClass("none");
			changeBack.removeClass("none");
		}, 500)
	} else {
		changeFront.removeClass("flipOutY").addClass("flipInY");
		changeBack.removeClass("flipInY").addClass("flipOutY");
		setTimeout(function() {
			changeBack.addClass("none");
			changeFront.removeClass("none");
		}, 500)


	}
	if ($(pobj).next().length) {
		var Go = window.setTimeout(function() {
			animateSh($(pobj).next().eq(0))
		}, 500)

	}
}
$(function() {
	if (isWeiXin()) {
		if (jwt_token == "" || jwt_token == undefined) {
			//正式
			var redirect = encodeURIComponent("http://star.xingxiu.tv/oauth2?id=" + id + "&type=video&env=production");
			//测试
			//var redirect = encodeURIComponent("http://star.xingxiu.tv/oauth2?id=" + id + "&type=video&env=development")
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri=" + redirect

			+ "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
		}

	}

	var myDate = new Date();
	var v_url = host + "video/" + id + "?jwt_token=" + jwt_token;

	$.getJSON(v_url, function(data) {
		if (data.code == '200') { //stars
			ad = data.data.current_video.advertisements;
			if (data.data.current_video.stars.length <= 0) {
				$(".live_info").hide()
			} else {
				$(".live_info").show()
				//初始化明星
				var starsHtml = "";
				for (var i = 0; i < data.data.current_video.stars.length; i++) {
					starsHtml += '<li>' + '<img src="' + data.data.current_video.stars[i].head_pic + '" class="head_pic fl"/>' + '<div class="fl star_desc">' + '<p>本档明星</p>' + '<span class="star_name" nowrap style="white-space:nowrap;word-break:nowrap">' + (data.data.current_video.stars[i].name).substr(0, 4) + '</span>' + '</div>' + ' </li>'
				};
				$(".star_info ul").append(starsHtml);

				var staffList = data.data.current_video.dakas;
				var staffHtml = "";
				var staffName = "";
				for (var i = 0; i < staffList.length; i++) {
/*staffHtml+='<li uid="'+staffList[i].id+'">'+
              '<img src="'+staffList[i].head_pic+'"  class="head_pic"/>'+
             ' <p class="staff_name">'+staffList[i].name+'</p>'+
            '</li>'*/
					staffName = staffList[i].name.length <= 4 ? staffList[i].name : staffList[i].name.substr(0, 3) + '…';
					staffHtml += '<li uid="' + staffList[i].id + '"> ' + '<div class="box viewport-flip" title="">' + '<img class="list head_pic animated" src="' + staffList[i].head_pic + '" />' + ' <div class="list back animated none">' + staffList[i].list_name + '</div>' + '</div>' + ' <p class="staff_name">' + staffName + '</p>' + '</li>'
				};
				$(".staffList ul").append(staffHtml);

			}
			console.log(data);
			var v_detail = '<h2>' + data.data.current_video.en_title.toUpperCase() + '</h2>';
			v_detail += '<h1 aid="' + data.data.current_video.id + '">' + data.data.current_video.title + '</h1>';
			v_detail += '<div class="share_info"><span class="pr10">' + data.data.current_video.watch_num + '次观看</span>';
			v_detail += '<span class="created">' + data.data.current_video.created_at + '</span>';
			$(document).attr("title",data.data.current_video.title)
			if (data.data.current_video.city != null) {
				v_detail += '·' + data.data.current_video.city;
			}

			if (data.data.current_video.is_like == 1) {
				v_detail += '<div class="share_video_title_p "><p><img src="images/newLikeCur.png" id="btn-zan" class="newLike" /><span class="clickicon_span">' + data.data.current_video.like_num + '</span></p></div>';
			} else {
				v_detail += '<div class="share_video_title_p "><p><img src="images/newLike.png" id="btn-zan" class="newLike" /><span class="clickicon_span">' + data.data.current_video.like_num + '</span></p></div>';
			}

			v_detail += '</div>' + '<h2>' + data.data.current_video.description + '</h2>';

			$('.share_video_title').append(v_detail);
			$('#video').attr('src', data.data.current_video.video_url);
			$(".shareName img").attr("src", data.data.user_info.head_pic)
			$(".share_title_sum h2").text(data.data.user_info.name);
			$('.share_title_sum p span').text(data.data.user_info.followers_count);
			$(".poster").attr("src", data.data.current_video.cover);
			var str = "";
			for (var i = 0; i < data.data.video_list.page_data.length; i++) {
				if (id == data.data.video_list.page_data[i].id) {
					str += '<li class="share_list_li pcur"><a href="javascript:;">' + '<div class="share_list_img"><div class="nowPlay"><p>正在播放<i></i></p></div><img src="' + data.data.video_list.page_data[i].cover + '" alt="' + data.data.video_list.page_data[i].title + '"></div>' + '<div class="share_list_detail">' + '<h3>' + data.data.video_list.page_data[i].en_title.toUpperCase() + '</h3>' + '<h3>' + data.data.video_list.page_data[i].title + '</h3>' + '<h6>' + '<span class="share_list_look"><em></em><strong>' + data.data.video_list.page_data[i].watch_num + '</strong></span>' + '<span class="share_list_like"><em></em><strong>' + data.data.video_list.page_data[i].like_num + '</strong></span>' + '</h6>' + '</div>' + '</a>' + '</li>';
				} else {
					str += '<li class="share_list_li"><a href="http://share.xingxiu.tv/starshow5.0/video/share.html?id=' + data.data.video_list.page_data[i].id + '">' + '<div class="share_list_img"><img src="' + data.data.video_list.page_data[i].cover + '" alt="' + data.data.video_list.page_data[i].title + '"></div>' + '<div class="share_list_detail">' + '<h3>' + data.data.video_list.page_data[i].en_title.toUpperCase() + '</h3>' + '<h3>' + data.data.video_list.page_data[i].title + '</h3>' + '<h6>' + '<span class="share_list_look"><em></em><strong>' + data.data.video_list.page_data[i].watch_num + '</strong></span>' + '<span class="share_list_like"><em></em><strong>' + data.data.video_list.page_data[i].like_num + '</strong></span>' + '</h6>' + '</div>' + '</a>' + '</li>';
				}

			}


			var uTime = data.data.current_video.created_at;
			var title = data.data.current_video.title;
			document.title = title;
			$('#sharelist').append(str); /*发布时间*/
			get_time(uTime);
			$(".pcur").click(function() {
				BOX_show("curPlay");
				setTimeout(function() {
					BOX_remove("curPlay")
				}, 1000)
			})

			function get_time(uTime) {
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
						result = +parseInt(monthC) + "个月前";
					} else if (dayC >= 1) {
						result = +parseInt(dayC) + "天前";
					} else if (hourC >= 1) {
						result = +parseInt(hourC) + "个小时前";
					} else if (minC >= 1) {
						result = +parseInt(minC) + "分钟前";
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
				$(".created").text(result);
			}

		}
		if (data.code == '404') {
			window.location.href = "notFound.html";
		}

		//执行
		var Go = window.setInterval(function() {
			var bTime = data.current_time.replace(/-/g, "/");
			var eTime = data.data.current_video.created_at.replace(/-/g, "/")
			initJcountdown(bTime, eTime, "countdown");
			animateSh($(".staffList li").eq(0));
		}, 30000)
		if ($(".live_info").css("display") != "none" && $(".live_info") != undefined) {
			$t = setInterval('AutoScroll(".star_info")', 3000) //轮换间隔，单位毫秒，下同 
		}

	});
	initLivePage();
	$("#video").on("seeking", function() {
		adv()
	})
	adv()
	//var time_duration=(duration*1000)<=0?15000:(duration*1000)
	$(".ad_area").on("click",".close",function(){
		$(".ad_area").hide();	
	})
	
})