/*! starshow 2016-03-25 */
var wx_host = "https://startvshow.com/v6";
var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
$.getJSON(wx_api, function(a) {
	a.data.status && (wx.config({
		debug: false,
		appId: a.data.appId,
		timestamp: a.data.timestamp,
		nonceStr: a.data.nonceStr,
		signature: a.data.signature,
		jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
	}), wx.ready(function() {
		wx.onMenuShareAppMessage({
			title: '和我一起为'+$('.st_rank_con h2').html()+'打榜，赢取'+$('.st_rank_con h2').html()+'赠送的限量好礼',
			desc: '来时尚星秀，为自己喜爱的明星打榜，赢取明星派送的限量好礼',
			link: host+'/wechat/listHit?star_id='+star_id+'&user_id='+uid+'&server=0',
			imgUrl: $(".st_rank_img").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: '和我一起为'+$('.st_rank_con h2').html()+'打榜，赢取'+$('.st_rank_con h2').html()+'赠送的限量好礼',
			desc: '来时尚星秀，为自己喜爱的明星打榜，赢取明星派送的限量好礼',
			link: host+'/wechat/listHit?star_id='+star_id+'&user_id='+uid+'&server=0',
			imgUrl: $(".st_rank_img").find("img").attr("src"),
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});