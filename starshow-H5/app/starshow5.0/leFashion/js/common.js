/*! starshow 2016-03-25 */
var analyzParams = function (param_name) {
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
function wx_share(){
	var wx_host = "https://startvshow.com/v6";
	var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
	var id = analyzParams("id") == undefined ? "" : analyzParams("id");	
	$.getJSON(wx_api, function(a) {	
		a.data.status && (wx.config({
			debug: !1,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
		}), wx.ready(function() {
			wx.onMenuShareAppMessage({			
				title: $(".share_video_title h1").html(),
				desc: $(".share_video_title h1").attr("desc"),
				link:"https://lookmetv.com/starshow5.0/leFashion/share.html?id="+id,
				imgUrl: $(".pcur .share_list_img").find("img").attr("src"),
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}), wx.onMenuShareTimeline({
				title: $(".share_video_title h1").html(),
				desc:$(".share_video_title h1").attr("desc"),
				link:"https://lookmetv.com/starshow5.0/leFashion/share.html?id="+id,
				imgUrl: $(".pcur .share_list_img").find("img").attr("src"),
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}