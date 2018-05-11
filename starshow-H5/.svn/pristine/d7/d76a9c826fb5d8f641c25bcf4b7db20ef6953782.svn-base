/*! starshow 2016-03-25 */
function wx_share(){
var host="http://api.startvshow.com/"
var wx_host = "https://startvshow.com/v6";
var server=0;
//var id = location.search.slice(location.search.indexOf("&id=") + 5).split("&")[0];	
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
			title: "和我一起为“"+$(".helpBanner span").html()+"”助力，赢取【星秀盛典入场券】",
			desc: '10•13 北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来。',
			link: host+"/wechat/festival?star_id="+star_id+"&user_id="+uid+"&server="+server,
			imgUrl: $(".starPic").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: "和我一起为“"+$(".helpBanner span").html()+"”助力，赢取【星秀盛典入场券】",
			desc: '10•13 北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来。',
		    link: host+"/wechat/festival?star_id="+star_id+"&user_id="+uid+"&server="+server,
			imgUrl: $(".starPic").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});
}