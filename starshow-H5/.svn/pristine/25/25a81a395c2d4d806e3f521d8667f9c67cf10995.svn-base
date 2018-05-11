/*! starshow 2016-03-25 */
var turl = "http://api.xingxiu.tv/",
	aurl = "http://api.xingxiu.tv/";
var id = location.search.slice(location.search.indexOf("&id=") + 5).split("&")[0];	
var url = aurl + "index.php?app=mobile&mod=WeChat&act=sign&type=4&id="+id+"&url=" + encodeURIComponent(location.href) +"&returntype=jsonp&callback=?";
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
			title: '2016首届星秀杯纹身大师 挑战赛复赛火热开启!',
			desc: '晋级复赛选手火热比拼 中等你围观拉票哦~!',
			//link:a.share.url,
			imgUrl: a.share.thumb,
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title:'2016首届星秀杯纹身大师 挑战赛复赛火热开启!',
			desc:' 晋级复赛选手火热比拼 中等你围观拉票哦~!',
		//	link:a.share.url,
			imgUrl: a.share.thumb,
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})
	}))
});