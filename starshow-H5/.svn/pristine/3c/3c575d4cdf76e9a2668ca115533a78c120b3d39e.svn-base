var browser = {
	versions : function() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident : u.indexOf('Trident') > -1, // IE内核
			presto : u.indexOf('Presto') > -1, // opera内核
			webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,// 火狐内核
			mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android : u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
			iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
			iPad : u.indexOf('iPad') > -1, // 是否iPad
			webApp : u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
			weixin : u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
			qq : u.match(/\sQQ/i) == "qq", // 是否QQ
			weibo : u.indexOf('Weibo') > -1 // 是否微博
		};
	}(),
	language : (navigator.browserLanguage || navigator.language).toLowerCase()
}
function openApp_obj(to, obj_map) {
	if (obj_map != null) {
		paramStr ={
		        "params" : obj_map,
			"to" : to || 'home'
		};
	} else {
		paramStr = {
			"params" : {},
			"to" : to || 'home'
		};
	}
	paramStr = JSON.stringify(paramStr);
	var params = encodeURIComponent(paramStr);
	if (browser.versions.ios) {
		var appUrl = "https://attopstar.com/starRank/applinks/index.html?data=" + params;
	} else if (browser.versions.android) {
		if (browser.versions.weixin) {
			var appUrl = "http://t.cn/R7COgYb";
		} else if(browser.versions.weibo) {
			var appUrl = "https://attopstar.com/starRank/applinks/index.html";
		} else {
			var appUrl = "starrank://starrank.com?data=" + params;
			var ifr = document.createElement('iframe');
			ifr.src = appUrl;
			ifr.style.display = 'none';
			document.body.appendChild(ifr);
			window.setTimeout(
				function() {
					document.body.removeChild(ifr);
					if (confirm("是否去下载App?")) {
						window.location.href = "https://attopstar.com/starRank/applinks/index.html";
					};
				}, 2000);
		}
	} else {
		var appUrl = "https://attopstar.com/starRank/applinks/index.html";
	}
	window.location.href = appUrl;
}

function openApp(to, paramsArr) {
	if (paramsArr != null) {
		paramStr = {
			"params" : {
				"id" : paramsArr['id'],
				"user_id" : paramsArr['user_id'],
				"url" : paramsArr['url'],
			},
			"to" : to || 'home'
		};
	} else {
		paramStr = {
			"params" : {},
			"to" : to || 'home'
		};
	}
	paramStr = JSON.stringify(paramStr);
	var params = encodeURIComponent(paramStr);
	if (browser.versions.ios) {
		var appUrl = "https://attopstar.com/starRank/applinks/index.html?data=" + params;
	} else if (browser.versions.android) {
		if (browser.versions.weixin) {
			var appUrl = "http://t.cn/R7COgYb";
		} else if(browser.versions.weibo) {
			var appUrl = "https://attopstar.com/starRank/applinks/index.html";
		} else {
			var appUrl = "starrank://starrank.com?data=" + params;
			var ifr = document.createElement('iframe');
			ifr.src = appUrl;
			ifr.style.display = 'none';
			document.body.appendChild(ifr);
			window.setTimeout(
				function() {
					document.body.removeChild(ifr);
					if (confirm("是否去下载App?")) {
						window.location.href = "https://attopstar.com/starRank/applinks/index.html";
					};
				}, 2000);
		}
	} else {
		var appUrl = "https://attopstar.com/applinks/index.html";
	}
	window.location.href = appUrl;
}

// 点击下载
$("#btn_download").bind("click", function() {
	openApp('home', null);
});

// 视频商品
$(".prod_con").on("click", "li", function() {
	var paramsArr = new Array();
		paramsArr['id'] = id;
	openApp('video', paramsArr);
});

// 头条商品
$("#newContent").on("click", "section .prodCon", function() {
	var paramsArr = new Array();
		paramsArr['id'] = channelDetail.analyzUrl()["new_id"];
		paramsArr['user_id'] = $("#share_info").attr("user_id");
		paramsArr['url'] = "https://lookmetv.com/starshow5.0/news/v5/detail.html?new_id=" + paramsArr['id'];
	openApp('news', paramsArr);
});