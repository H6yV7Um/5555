/*! starshow 2016-03-25 */
var turl = "http://testapi.xingxiu.tv/",
	aurl = "http://api.xingxiu.tv/";
	
var url = turl + "index.php?app=mobile&mod=WeChat&act=sign&url=" + encodeURIComponent(location.href) +"&returntype=jsonp&callback=?";
$.getJSON(url, function(a) {
	a.info.status && (console.log(JSON.stringify(a) + "=====d"), wx.config({
		debug: !1,
		appId: a.info.appId,
		timestamp: a.info.timestamp,
		nonceStr: a.info.nonceStr,
		signature: a.info.signature,
		jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
	}), wx.ready(function() {
		wx.onMenuShareAppMessage({
			title: '时尚星秀-明星时尚媒体平台',
			desc: '时尚星秀让你更时尚，                  让你更闪耀！',
			//link:a.share.url,
			imgUrl: 'http://testshare.xingxiu.tv/activity/starIntro/images/300.png',
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title:'时尚星秀-明星时尚媒体平台',
			desc:' 时尚星秀让你更时尚，                  让你更闪耀！',
		//	link:a.share.url,
			imgUrl: 'http://testshare.xingxiu.tv/activity/starIntro/images/300.png',
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})
	}))
});