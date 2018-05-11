// JavaScript Document
var src = "";
var t = "";
var timer_C = ""; /*直播视频*/
var getLiveDetail = function() {
		var url = host + "live/100583";
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				if (resultData.data.status == "12") {
					$("#replay").attr("src", resultData.data.replay_url)
					// var player = new CloudLivePlayer();
					//activityId 请换成自己设置的获得id
					//player.init({url:resultData.data.pull_hls},"player");
/*var player = new CloudVodPlayer();
		        player.init({uu:"cfd9191aeb",vu:"79ff602f42"});*/
					//$("#player-container").show()

				} //else{
				//					$("#end").show();	
				//					$("#player").hide();
				//				}
			}
		})
	}

function play() {
	if (src) {
		playM3U8(src);
	}
	return false;
}
var initJcountdown = function(currentTime, endTime, containerId, sfun) {
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
		//var formatDate = "<span>" + d + "</span>天" + "<span>" + h + "</span>时" + "<span>" + m + "</span>分" + "<span>" + s + "</span>秒"
		var formatDate = "<span>" + h + "</span>时" + "<span>" + m + "</span>分" + "<span>" + s + "</span>秒"

		$("#" + containerId).html(formatDate);
		t = t - 1000;
		if (d == 0 && h == 0 && m == 0) {
			//清除计时器
			clearInterval(timer_C);
			sfun();

		}

	}
var btime = new Date;
var etime = "2016/12/19 19:00:00";

timer_C = setInterval(function() {
	initJcountdown(btime, etime, "time_show", function() {
		afterCounter();
	})
}, 1000)

var afterCounter = function() {
		//$("#placeholder").hide();	
		getLiveDetail();
		//play()		


	}
var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token"); /*节目列表*/
var getSchool = function() {
		var url = host + "school?jwt_token=" + jwt_token;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var rankList = "";
				for (i = 0; i < resultData.data.length; i++) {
					rankList += '<div class="rankList"> <div class="tit" id=' + resultData.data[i].id + '>'
					rankList += '<div class="titNum"><i></i>第<span>' + (i + 1) + '</span>名</div>';
					rankList += '<div class="titName">' + resultData.data[i].name + '</div>';
					if (resultData.data[i].is_like == 0) {
						rankList += '<div class="titLike"><i></i><span>' + resultData.data[i].like_num + '</span></div>'
					} else {
						rankList += '<div class="titLike"><i class="like"></i><span>' + resultData.data[i].like_num + '</span></div>'
					}
					rankList += '<div class="arrowDown"></div></div>'
					rankList += '<div class="tag"><h2>表演者：</h2><div class="con"><ul>'
					for (j = 0; j < resultData.data[i].performer.length; j++) {
						rankList += '<li> <img src=' + resultData.data[i].performer[j].head_pic + '><p>' + resultData.data[i].performer[j].name + '</p> </li> '
					}
					rankList += '</ul></div></div></div>'
				}
				$(".rank").html(rankList);
				$(".titNum i:lt(3)").show();
				$(".tit .arrowDown:lt(3)").hide();
				$(".tag:lt(3)").show();
				$(".tit:lt(3)").css("border-bottom", "0");
				$(".titNum:lt(3)").addClass("titNumLt");
			}
		})
	}

	//邀请投票
var getVote = function(id) {
		var url = host + "school?id=" + id + "&jwt_token=" + jwt_token;
		ajaxCommonFun(url, "post", function(resultData) {
			if (resultData.code == "200") {
				tcc.BOX_show("messdiv");
				$(".messdivCons").html("打榜成功<br/>下载时尚星秀App领取更多打榜机会！");
			}
		})
	}
getSchool();
$(".tabTit li").click(function() {
	var ind = $(this).index();
	$(this).addClass("cur").siblings().removeClass("cur");
	$(".tabCon section").eq(ind).show().siblings().hide();
});


$(function() {
	$(".rank").on("click", "div.arrowDown", function() {
		var tag = $(this).parent().next();
		var tit = $(this).parent();
		if (tag.css("display") == "block") {
			tag.hide();
			tit.css("border-bottom", "1px solid #eee");
			tit.removeClass("cur")
		} else {
			tag.show();
			tit.css("border-bottom", "0");
			tit.addClass("cur")
		}


	});
});
//
//$(function(){
//	$(".rank").on("click",".titLike i",function(e) {alert(1)
//		$("#like").attr("likeId", $(this).parent().parent().attr("id"));
//		if (jwt_token == "") {
//			e.preventDefault()
//			setBridgeCallHandler(bridge, {
//				'action': '1',
//				'nextStep': '1'
//			})
//
//		} else {
//			var id=$("#like").attr("likeId")
//			ceremonyMain.toHitRank(id, $(this));
//
//		}
//		
//		tcc.BOX_show("loadding");
//
//	})
//	
//})