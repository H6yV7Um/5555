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
			title: "分享一条"+$(".userInfo h2").html()+"的动态",
			desc: $(".dynamicContent").html(),
			link: "http://share.xingxiu.tv/starshow5.0/post/share.html?id="+id,
			imgUrl: $(".thumbnails li:first").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: "分享一条"+$(".userInfo h2").html()+"的动态",
			desc: $(".dynamicContent").html(),
			link: "http://share.xingxiu.tv/starshow5.0/post/share.html?id="+id,
			imgUrl: $(".thumbnails li:first").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});
}