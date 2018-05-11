var server=1;
/*var wxHost = "http://testapi.xingxiu.tv/";*/
var wxHost = "https://startvshow.com/v6";
var analyzParams = function(param_name) {
	var url = window.location.search.split("?")[1];
	if (url == "" || url == undefined) return url;
	url = url.split(param_name + "=")[1];
	if (url == "" || url == undefined) {
		url = "";
		return url;
	}
	if (url.indexOf("&") > 0) {
		url = url.split("&")[0];
	}
	return url;
}
var id = analyzParams("id");
var type = analyzParams("type");
if(type=="1"){
	var listId = 1;
}else{
	var listId = 3;
}
var url = wxHost + "/wechat/sign?url=" + encodeURIComponent(location.href);;
$.getJSON(url, function(a) {	
		a.data.status && (wx.config({
			debug: !1,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
		}),  wx.ready(function() {
		wx.onMenuShareAppMessage({
			title: "帮偶像打榜，赢取偶像赠送的限量好礼",
			desc: "来时尚星秀，为自己喜爱的偶像打榜，赢取偶像派送的限量好礼！",
			link: commonCla.shareUrlBase+"/starshow5.0/starHitRank2/starShare.html?type="+type,
			imgUrl: "http://starshow-pic.b0.upaiyun.com/default/3002.png",
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		}), wx.onMenuShareTimeline({
			title: "帮偶像打榜，赢取偶像赠送的限量好礼",
			desc: "来时尚星秀，为自己喜爱的偶像打榜，赢取偶像派送的限量好礼！",
			link: commonCla.shareUrlBase+"/starshow5.0/starHitRank2/starShare.html?type="+type,
			imgUrl: "http://starshow-pic.b0.upaiyun.com/default/3002.png",
			trigger: function(a) {},
			success: function(a) {},
			cancel: function(a) {},
			fail: function(a) {}
		})
	}))
});