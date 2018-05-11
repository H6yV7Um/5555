var server = 0;
var loginUid = ""; /**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'        //1-跳登陆；2-跳个人；3-普通分享；4-打榜分享；5-支付宝支付；6-微信支付
share : {title : "分享标题", content: "分享内容", cover : "分享icon", share_url : "分享link"}
order_id : '11'     // 订单id
user_id : '22'      // 跳转个人页的用户id
nextStep : '1'      //返回js下一步跳转地址类型

方法：
javascriptHandler :  用于“客户端”调取“JavaScript”方法
nativeCallback :     用于“JavaScript”调取“客户端”方法

*/
window.onerror = function(err) {
	//alert('window.onerror: ' + err)
}

//判断是否是Android

function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	var isA = ua.indexOf("android") > -1;
	if (isA) {
		return true;
	}
	return false;
}

//判断是否Iphone

function isIphone() {
	var ua = navigator.userAgent.toLowerCase();
	var isIph = ua.indexOf("iphone") > -1;
	if (isIph) {
		return true;
	}
	return false;
}

//设置WebViewJavascriptBridge通信

function setupWebViewJavascriptBridge(callback) {
	if (isIphone()) { //用于Iphone
		if (window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		}
		if (window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0)
	} else {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge)
			}, false)
		}
	}
}

//设置调用客户端方法并赋值

function setBridgeCallHandler(bridge, data) {
	if (isIphone()) {
		bridge.callHandler('nativeCallback', data, function(response) {
			//
		})
	} else {
		window.WebViewJavascriptBridge.callHandler('nativeCallback', data, function(response) {
			//
		})
	}
}

//设置WebViewJavascriptBridge通信回调方法
setupWebViewJavascriptBridge(function(bridge) {
	//注册js回调方法
	bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
		if (isIphone()) {} else {
			var data = eval("(" + data + ")");
		}
/*if(data.action==7){
      var responseData = '{"cancel": "再想想", "confirm": "去意已决", "title": "确认放弃支付？", "backSetp": "3"}';
    }else{
      var responseData = 'ok!!';
    } 
    responseCallback(responseData);*/
		if (data.nextStep == '1') { //打榜
			loginUid = data.jwt_token;
			if (jwt_token == "") {
				var host = window.location.host;
				window.location.href = "index.html?jwt_token=" + loginUid;
			}

		}

		if (data.nextStep == "7") {
			otherShare();

		}
		if (data.nextStep == "8") {
			shareActivity();
		}
	})
	//调取客户端方法
	if (isIphone()) {} else {
		bridge.init(function(message, responseCallback) {
			var data = {
				'Javascript Responds': 'Wee!'
			}
			responseCallback(data)
		})
	}
	//活动分享
	var shareActivity = function(e) {
			setBridgeCallHandler(bridge, {
				'action': '3',
				'share': {
					//'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
					'share_url': "http://share.xingxiu.tv/starshow5.0/school/share.html",
					'title': "北青政管理系年度之星评选",
					'content': "#北青政管理系年度之星评选#时尚星秀携手北京青年政治学院管理系2017年元旦晚会，神猴辞岁，金鸡迎春，一起为喜欢节目助力打榜。",
					'cover': "https://share.startvshow.com/starshow5.0/school/images/300.jpg"
				}
			})
		}

		//打榜
	var jwt_token = ceremonyMain.analyzParams("jwt_token") == undefined ? loginUid : ceremonyMain.analyzParams("jwt_token");
	$(".rank").on("click",".titLike i",function(e) {
		$("#like").attr("likeId", $(this).parent().parent().attr("id"));
		if (jwt_token == "") {
			e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '1',
				'nextStep': '1'
			})

		} else {
			var id=$("#like").attr("likeId")
			ceremonyMain.toHitRank(id, $(this));

		}
		
		tcc.BOX_show("loadding");

	})

})

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
		var jwt_token = ceremonyMain.analyzParams("jwt_token");
		if (jwt_token == undefined || jwt_token == "") {
			jwt_token = jwt_token;
		}
		var url = host + "school?id="+id+"&jwt_token=" + jwt_token;
		ceremonyMain.ajaxCommonFun(url, "post", function(resultData) {
			//alert(resultData);
			if (resultData != null && resultData.code == "200") {
				tcc.BOX_show("messdiv");
				$(".messdivCons").html("打榜成功<br/>今日还剩"+(3-resultData.data.count)+"次机会");
				 $(thi).addClass("like");
				 var likeNum=$(thi).parent().find("span").html();
      		  	 var num=Number(likeNum)+1;
				$(thi).parent().find("span").html(num);
				getSchool()
         		//window.location.reload();
				//1秒消失
				// setTimeout(function () { tcc.BOX_remove("messdiv"); }, 1000);
				// ceremonyMain.getDetailData();

			} else {
				tcc.BOX_show("messdiv");
				$(".messdivCons").html(resultData.error);
			}

		})

	}

}

$(function() {
	if ($(".js-close").html() != undefined) {
		$(".js-close").click(function() {
			tcc.BOX_remove("messdiv");
		})
	}

})