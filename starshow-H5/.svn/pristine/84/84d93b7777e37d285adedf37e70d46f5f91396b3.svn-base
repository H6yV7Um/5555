//var host = "http://123.57.0.118:5000/v5"; //测试
var host = "https://startvshow.com/v5"; //正式
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
var id = analyzParams("id") == undefined ? "" : analyzParams("id");
var starid = analyzParams("star_id") == undefined ? "" : analyzParams("star_id");
var userid = analyzParams("user_id") == undefined ? "" : analyzParams("user_id");
var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token");
var mh = $(window).height(); /*帮他打榜*/
var w = document.body.clientWidth || document.documentElement.clientWidth;
$('.st_rank_img').css('width', w);
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
	} /*打榜*/

function getDetail(a) {
	var url = host + "/boards/" + starid + "/rank?jwt_token=" + jwt_token;
	ajaxCommonFun(url, "get", function(a) {
		if (200 == a.code) {
			var bg = "" == a.data.starInfo.background_pic ? "../public/images/bannerDefault.png" : a.data.starInfo.background_pic + '!750x563';
			$(".st_rank_img img").attr("src", bg), $(".st_rank_con h2").html(a.data.starInfo.name), $(".st_rank_detail span").html(a.data.starInfo.name);
			$(".st_rank_con h4 b").html(a.data.starInfo.platform.influence);
			$(".st_rank_con h4 span").html(a.data.starInfo.total_like_num);
			//for (var b = "", c = 0; c < a.data.page_data.length; c++) b += '<li><img src="' + a.data.page_data[c].user.head_pic + '"><span>' + a.data.page_data[c].user.name + "</span><span>" + a.data.page_data[c].created_at + "</span></li>";
			//			$(".st_rank_list ul").append(b)
			if (a.data.invite_like == 1) {
				$(".tips").show();
				$(".maskLay").show();
				$(".maskLay").css("height", mh);
				$("body").addClass("overf");
				$(".st_rank").addClass("overf");
				$(".st_invite").show();
				$("#rank").hide();
				//location.href = 'Invite.htm?star_id=' + starid + '&user_id=' + userid+"&jwt_token=" + jwt_token;
			}else{
				$(".st_invite").hide();
				$("#rank").show();
			}
		}
	}, {
		"star_id": starid,
		"user_id": userid
	})
}

function getPrize(a) {
	$.getJSON(a, function(a) {

		if (a.code == 200) {
			for (var b = "", c = 0; c < a.data.page_data.length; c++) {
				var d = "" == a.data.page_data[c].cover ? "../public/images/defaultimage_65x65.png" : a.data.page_data[c].cover;
				console.log(d), b += "<li><p>" + a.data.page_data[c].points + '</p><div><img src="' + d + '"></div><h2>' + a.data.page_data[c].name + "</h2></li>"

			}
			$(".st_peize_list ul").append(b)
		}
	})
}
$(".st_invite").on("click", function() {
	$(".st_mark").show().next().show()
}), $(".st_mark").on("click", function() {
	$(this).hide().next().hide()
});

/*邀请好友列表*/
var I_url = host + "/boards/" + starid + "/invite"

function getInvite(resultData) {
	ajaxCommonFun(I_url, "get", function(resultData) {
		if (200 == resultData.code) {

			for (var b = "", c = 0; c < resultData.data.length; c++) {
				var d = "" == resultData.data[c].invite_user.head_pic ? "../public/images/onepage-headp.jpg" : resultData.data[c].invite_user.head_pic;
				console.log(d), b += '<li><img src="' + d + '"><span>' + resultData.data[c].invite_user.name + "</span><span>" + resultData.data[c].created_at + "</span></li>";
			}
			$(".st_rank_list ul").html(b)
		}
	}, {
		"user_id": userid
	})
}

function like() {
	var lurl = host + "/boards/invite?star_id=" + starid + "&user_id=" + userid + "&jwt_token=" + jwt_token;
	$.ajax({
		url: lurl,
		dataType: 'json',
		// data: { uid: uid},
		type: 'post',
		global: false,
		success: function(data) {
			var v = data.code;
			if (v == 200) {
				$(".maskLay").show();
				$(".maskLay").css("height", mh);
				$(".rankSuc").show();
				// $('.st_rank_list ul').prepend('<li><img src="'+data.page_data.user.head_pic+'" class="img-scale" /><span>'+data.page_data.user.name+'</span><span>'+ data.page_data.created_at+'</span> </li>').show();
				$(".sureBtn").click(function() {
					$(".maskLay").hide();
					$(".maskLay").css("height", mh);
					$(".rankSuc").hide();
				});
				$(".st_invite").show();
				$("#rank").hide();
				var likeNum = parseInt($('.st_rank_con h4 span').text());
				likeNum = likeNum + 1;
				$(".st_rank_con h4 span").html(likeNum);
				getInvite();

			} else {
				alert(data.error)
			}
		}
	});
}
$(".cancel").click(function() {
	$(".tips").hide();
	$(".maskLay").hide();
	$("body").removeClass("overf");
	$(".st_rank").removeClass("overf")
})