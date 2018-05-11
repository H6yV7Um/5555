/*! starshow 2016-03-25 */
var turl = "http://testapi.xingxiu.tv/",
	aurl = "http://api.xingxiu.tv/",
	type = location.search.replace(/\?type=(\d+).*/, "$1"),
	id = location.search.slice(location.search.indexOf("&id") + 4).split("&")[0];
console.log(id + "+========+" + type);
var url = aurl + "index.php?app=mobile&mod=WeChat&act=sign&url=" + encodeURIComponent(location.href) + "&id=" + id + "&type=" + type + "&returntype=jsonp&callback=?";
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
			title: a.share.title,
			desc: a.share.desc,
			imgUrl: a.share.thumb,
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title: a.share.title,
			desc: a.share.desc,
			imgUrl: a.share.thumb,
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})

	}))

});
