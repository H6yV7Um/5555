/*! starshow 2016-03-25 */

function getDetail(a) {
	$.getJSON(q_url, function(a) {
		if (200 == a.code) {
			$(".st_rank_img img").attr("src", a.data.star.cover+'!750x563'), $(".st_rank_con h2").html(a.data.star.uname), $(".st_rank_detail span").html(a.data.star.uname), $(".st_rank_con h3").html(a.data.star.list), $(".st_rank_con h4 span").html(a.data.star.grade), $(".st_rank_geshu h6").html(a.data.star.like_num), $(".st_rank_geshu h2 span").html(a.data.star.uname), $(".st_prize a").attr("href", a.data.star.grade), $(".st_prize a span").html(a.data.star.uname);
			for (var b = "", c = 0; c < a.data.invite_list.length; c++) b += '<li><img src="' + a.data.invite_list[c].avatar + '"><span>' + a.data.invite_list[c].uname + "</span><span>" + a.data.invite_list[c].ctime + "</span></li>";
			$(".st_rank_list ul").append(b)
		}
	})
}
function getPrize(a) {
	$.getJSON(a, function(a) {
		if ("succ" == a.result) {
			for (var b = "", c = 0; c < a.info.length; c++) {
				var d = "" == a.info[c].thumb ? "../public/images/defaultimage_65x65.png" : a.info[c].thumb;
				console.log(d), b += "<li><p>" + a.info[c].score + '</p><div><img src="' + d + '"></div><h2>' + a.info[c].name + "</h2></li>"
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
/*
var turl = "http://testapi.xingxiu.tv/",
	aurl = "http://api.xingxiu.tv/",*/
	//type = location.search.replace(/\?type=(\d+).*/, "$1"),
	/*id = location.search.slice(location.search.indexOf("&id=") + 4).split("&")[0],
	uid = location.search.slice(location.search.indexOf("&uid=") + 5).split("&")[0],
	sid="http://star.xingxiu.tv/rank?server=1&star_id="+ id + "&uid"+uid;
	var url = aurl + "index.php?app=mobile&mod=WeChat&act=sign&url=" + encodeURIComponent(sid) + "&id=" + id + "&type=" + type + "&returntype=jsonp&callback=?";
	$.getJSON(url, function(a) {
		a.info.status && (console.log(JSON.stringify(a) + "=====d"), wx.config({
			debug: false,
			appId: a.info.appId,
			timestamp: a.info.timestamp,
			nonceStr: a.info.nonceStr,
			signature: a.info.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
		}), wx.ready(function() {
			wx.onMenuShareAppMessage({
				title: a.share.title,
				desc: a.share.desc,
				imgUrl: a.share.thumb,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			}), wx.onMenuShareTimeline({
				title: a.share.title,
				desc: a.share.desc,
				imgUrl: a.share.thumb,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			})
		}))
});*/