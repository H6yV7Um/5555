// JavaScript Document
var wx_host = "https://startvshow.com/v6";
var server = 1;
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
			title: "北青政管理系年度之星评选",
			desc: "#北青政管理系年度之星评选#时尚星秀携手北京青年政治学院管理系2017年元旦晚会，神猴辞岁，金鸡迎春，一起为喜欢节目助力打榜。",
			link: "http://share.xingxiu.tv/starshow5.0/school/share.html",
			imgUrl: "http://share.xingxiu.tv/starshow5.0/school/images/300.jpg",
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		}), 
		wx.onMenuShareTimeline({
			title: "北青政管理系年度之星评选",
			desc: "#北青政管理系年度之星评选#时尚星秀携手北京青年政治学院管理系2017年元旦晚会，神猴辞岁，金鸡迎春，一起为喜欢节目助力打榜。",
			link: "http://share.xingxiu.tv/starshow5.0/school/share.html",
			imgUrl: "http://share.xingxiu.tv/starshow5.0/school/images/300.jpg",
			trigger: function() {},
			success: function() {},
			cancel: function() {},
			fail: function() {}
		})
	}))
});
var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token");
var ceremonyMain = {
	ajaxCommonFun: function(url, type, callbackFun, params) {
		$.ajax({
			url: url,
			type: type,
			dataType: 'json',
			async: false,
			cache: false,
			data: params,
			success: function(data) {
				//回调函数
				if (callbackFun) {
					callbackFun(data);
				}
			},
			error: function() {
				//alert("error");
			}
		})
	},
	analyzUrl: function() {
		var paramsList = {}
		var url = window.location.search.split("?")[1];
		if (url == "" || url == undefined) {
			return paramsList;
		}
		var params = url.split("&");
		for (var i = 0; i < params.length; i++) {
			var keyName = params[i].split("=")[0];
			var value = params[i].split("=")[1];
			paramsList[keyName] = value;
		}
		return paramsList;

	},
	analyzParams: function(param_name) {
		var url = window.location.search.split("?")[1];
		if (url == "" || url == undefined) return url;
		url = url.split(param_name + "=")[1];
		if (url == "" || url == undefined) {
			url = "";
			return url;
		}
		if (url.indexOf("&") >= 0) {
			url = url.split("&")[0];
		}
		return url;
	},
	toHitRank: function(id, thi) {

		var url = host + "school/invite?id=" + id + "&jwt_token=" + jwt_token;
		ceremonyMain.ajaxCommonFun(url, "post", function(resultData) {
			//alert(resultData);
			if (resultData.code == "200") {
				//alert(1)
				tcc.BOX_show("messdiv");
				$(".messdivCons").html("打榜成功<br/>今日打榜机会已用完，下载时尚星秀App赢取更多打榜机会！");
				$(thi).addClass("like");
				var likeNum = $(thi).parent().find("span").html();
				var num = Number(likeNum) + 1;
				$(thi).parent().find("span").html(num)
				getSchool()
				//window.location.reload();
				//1秒消失
				// setTimeout(function () { tcc.BOX_remove("messdiv"); }, 1000);
				// ceremonyMain.getDetailData();

			} else {
				//alert(2)
				tcc.BOX_show("messdiv");
				$(".messdivCons").html(resultData.error);
			}

		})

	}
}
function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		alert("请在微信中打开")
		return false;
	}
}
$(function() {
	if ($(".js-close").html() != undefined) {
		$(".js-close").click(function() {
			tcc.BOX_remove("messdiv");
		})
	}
})

$(".titLike i").click(function() {
	is_weixn()
	  $("#like").attr("likeId", $(this).parent().parent().attr("id"));
	  if (jwt_token == "" || jwt_token == undefined) {
		  //授权
		   window.location.href = host+"wechat/programShare";	  
		  
	  } else {
		  var id = $("#like").attr("likeId")
		  ceremonyMain.toHitRank(id, $(this));
	  }

})
