/*! starshow 2016-03-25 */
function wx_share() {
	/*var host="http://123.57.0.118:5000/v1/";*/
    var host="http://api.startvshow.com/"
	var wxHost = "https://startvshow.com/v6";
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
	var id = analyzParams("new_id");
	var jwt_token = analyzParams("jwt_token");
	var wx_api = wxHost + "/wechat/sign?url=" + encodeURIComponent(location.href);
	var newUrl = host + "news/" + id + "?jwt_token=" + jwt_token;

	$.getJSON(wx_api, function(a) {
		a.data.status && (wx.config({
			debug: false,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
		}), 
		wx.ready(function() {
			wx.onMenuShareAppMessage({
				title: "2018潮音发布夜，现场门票等你拿！",
				desc: "李宇春、莫文蔚、窦靖童、华晨宇等多位大咖与你相约国内首个顶尖潮音发布夜",
				link: "http://s.xingxiu.tv/activity/starZeroRange6/share.html",
				imgUrl: "https://starshow-pic.b0.upaiyun.com/lakuo/music.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}), 
			wx.onMenuShareTimeline({
				title: "2018潮音发布夜，现场门票等你拿！",
				desc: "李宇春、莫文蔚、窦靖童、华晨宇等多位大咖与你相约国内首个顶尖潮音发布夜",
				link: "http://s.xingxiu.tv/activity/starZeroRange6/share.html",
				imgUrl:"https://starshow-pic.b0.upaiyun.com/lakuo/music.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}