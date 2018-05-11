/*! starshow 2016-03-25 */
// JavaScript Document
var turl = "http://api.xingxiu.tv/",
	aurl = "http://testapi.xingxiu.tv/";
	var star_id= location.search.slice(location.search.indexOf("&star_id=") + 10).split("&")[0];
var uid= location.search.slice(location.search.indexOf("&uid=") + 5).split("&")[0];
var id = location.search.slice(location.search.indexOf("&id=") + 5).split("&")[0];	
var url = aurl + "index.php?app=mobile&mod=WeChat&act=sign&type=3&id="+star_id+"&url=" + encodeURIComponent(location.href) +"&returntype=jsonp&callback=?";
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
			title: '当古典遇上时尚 —朱亦兵大提琴演奏分享会',
			desc: '6月29日大提琴演奏师朱亦兵作客明星直播间，一场时尚音乐盛宴等你来',
			//link:'http://star.xingxiu.tv/festival?star_id='+star_id+'&uid='+uid+'&server=1',
			imgUrl: 'http://testshare.xingxiu.tv/musicShare/images/300.png',
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title:'6月29日大提琴演奏师朱亦兵作客明星直播间，一场时尚音乐盛宴等你来',
			//link:'http://star.xingxiu.tv/festival?star_id='+star_id+'&uid='+uid+'&server=1',
			imgUrl: 'http://testshare.xingxiu.tv/musicShare/images/300.png',
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})
	}))
});