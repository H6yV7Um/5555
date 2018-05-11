/*! starshow 2017-01-23 */
function wx_share() {
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
	var wxHost = "https://startvshow.com/v6";
	var shareHost = commonCla.shareUrlBase;
	var wx_api = wxHost + "/wechat/sign?url=" + encodeURIComponent(location.href);
	$.getJSON(wx_api, function(a) {
		a.data.status && (wx.config({
			debug: false,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
		}), wx.ready(function() {
			wx.onMenuShareAppMessage({
				title: $(".head_desc").html(),
				desc: $(".head_desc").html(),
				link: shareHost + "/starshow5.0/news/themeIndex.html?id="+id,
				imgUrl: $(".head_img img")[0].src + '!250x250',
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}), wx.onMenuShareTimeline({
				title: $(".head_desc").html(),
				desc: $(".head_desc").html(),
				link: shareHost + "/starshow5.0/news/themeIndex.html?id="+id,
				imgUrl: $(".head_img img")[0].src + '!250x250',
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}