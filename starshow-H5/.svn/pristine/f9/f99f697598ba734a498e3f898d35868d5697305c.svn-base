/*! starshow 2016-12-30 */
function wx_share(){
	var wx_host = "https://startvshow.com/v6";
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
				title: "来星秀，票选你心中的完美主厨！",
				desc: "参与《大厨之作》票选，赢每日签到好礼！用佳肴触碰味蕾，用选票见证完美！",
				link: "http://share.xingxiu.tv/starshow5.0/chefWorks/share.html",
				imgUrl: "http://testshare.xingxiu.tv/starshow5.0/chefWorks/assets/images/icon-share.png",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}),
			wx.onMenuShareTimeline({
				title: "来星秀，票选你心中的完美主厨！",
				desc: "参与《大厨之作》票选，赢每日签到好礼！用佳肴触碰味蕾，用选票见证完美！",
				link: "http://share.xingxiu.tv/starshow5.0/chefWorks/share.html",
				imgUrl: "http://testshare.xingxiu.tv/starshow5.0/chefWorks/assets/images/icon-share.png",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}