/*! starshow 2016-12-29 */
function wx_share(){
	var wx_host = "https://startvshow.com/v6";
	var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
	$.getJSON(wx_api, function(a) {	
		a.data.status && (wx.config({
			debug: !1,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
		}), 
		wx.ready(function() {
			wx.onMenuShareAppMessage({			
				title: "2017年时尚星秀评选地区年夜饭星菜单",
				desc: "为你喜欢的菜品投票，更有你喜欢的iDOL为你喜爱的菜品站台，快来参与我们的年夜饭星菜单活动吧！",
				link: "https://lookmetv.com/starshow5.0/newYearEve/share.html",
				imgUrl: "https://starshow-pic.b0.upaiyun.com/default/icon/nianyefan.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}), wx.onMenuShareTimeline({
				title: "2017年时尚星秀评选地区年夜饭星菜单",
				desc: "为你喜欢的菜品投票，更有你喜欢的iDOL为你喜爱的菜品站台，快来参与我们的年夜饭星菜单活动吧！",
				link: "https://lookmetv.com/starshow5.0/newYearEve/share.html",
				imgUrl: "https://starshow-pic.b0.upaiyun.com/default/icon/nianyefan.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}