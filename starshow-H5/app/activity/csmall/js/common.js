/*! starshow 2016-03-25 */
var  aurl = "http://api.xingxiu.tv/";
var url = aurl + "index.php?app=mobile&mod=WeChat&act=sign&url=" + encodeURIComponent(location.href)  + "&returntype=jsonp&callback=?";
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
			title: "时尚星秀喊你来领奖啦！",
			desc: "金猫银猫携手时尚星秀 初秋送豪礼",
			imgUrl: "http://share.xingxiu.tv/starshow5.0/csmall/images/300.png",
			link:"http://share.xingxiu.tv/starshow5.0/csmall/index.html",
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title: "时尚星秀喊你来领奖啦！",
			desc: "金猫银猫携手时尚星秀 初秋送豪礼",
			imgUrl: "http://share.xingxiu.tv/starshow5.0/csmall/images/300.png",
			link:"http://share.xingxiu.tv/starshow5.0/csmall/index.html",
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})
	}))
});