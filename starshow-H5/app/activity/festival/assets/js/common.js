/*! starshow 2016-03-25 */
function wx_share() {
var wx_host = "https://startvshow.com/v6";
var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
//var id = location.search.slice(location.search.indexOf("&id=") + 5).split("&")[0];	
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
			title: "10•13北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来",
			desc: '为偶像打榜助力，多重豪礼为你开启，1013北京工人体育馆。',
			link: 'http://share.xingxiu.tv/starshow5.0/festival/indexShare.html?type=1',
			imgUrl: "http://share.xingxiu.tv/starshow5.0/festival/"+$(".cereBanner").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: "10•13北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来",
			desc: '为偶像打榜助力，多重豪礼为你开启，1013北京工人体育馆。',
		    link: 'http://share.xingxiu.tv/starshow5.0/festival/indexShare.html?type=1',
			imgUrl: "http://share.xingxiu.tv/starshow5.0/festival/"+$(".cereBanner").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});
}