/*! starshow 2016-03-25 */
function wx_share(){
var wx_host = "https://startvshow.com/v6";
var id = location.search.slice(location.search.indexOf("&id=") + 5).split("&")[0];	
var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
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
			title: $(".share_video_title h1").html(),
			desc: "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
			link: commonCla.shareUrlBase+"/starshow5.0/video/share.html?id="+id,
			imgUrl: $(".poster").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: $(".share_video_title h1").html(),
			desc: "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
			link: commonCla.shareUrlBase+"/starshow5.0/video/share.html?id="+id,
			imgUrl: $(".poster").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});
}