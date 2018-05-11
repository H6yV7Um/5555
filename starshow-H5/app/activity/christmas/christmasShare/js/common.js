/*! starshow 2016-03-25 */
function wx_share(){
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
		}), 
		wx.ready(function() {
			wx.onMenuShareAppMessage({			
				title: "星姐帮你选 最全圣诞购物清单",
				desc: "2016圣诞来了，至此之际星姐甄选了一份圣诞购物清单，让你送给最珍惜的TA!",
				link: "http://share.xingxiu.tv/starshow5.0/christmasShare/index.html",
				imgUrl: "http://share.xingxiu.tv/starshow5.0/christmasShare/images/300.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			}), 
			wx.onMenuShareTimeline({
				title: "星姐帮你选 最全圣诞购物清单",
				desc: "2016圣诞来了，至此之际星姐甄选了一份圣诞购物清单，让你送给最珍惜的TA!",
				link: "http://share.xingxiu.tv/starshow5.0/christmasShare/index.html",
				imgUrl: "http://share.xingxiu.tv/starshow5.0/christmasShare/images/300.jpg",
				trigger: function() {},
				success: function() {},
				cancel: function() {},
				fail: function() {}
			})
		}))
	});
}