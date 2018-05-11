var jwt_token = analyzParams("jwt_token") == undefined ? jwt_token_login : analyzParams("jwt_token");
/**************************************************APP TO H5通信部分*********************************************************/
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
			document.addEventListener('WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false)
		}
	}
}

//设置调用客户端方法并赋值
function setBridgeCallHandler(bridge, data) {
	if (isIphone()) {
		bridge.callHandler('nativeCallback', data,
			function(response) {
				//
			})
	} else {
		window.WebViewJavascriptBridge.callHandler('nativeCallback', data,
			function(response) {
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
		if (data.nextStep == '3') { //打榜
			if (navigator.onLine){
				jwt_token = data.jwt_token;
				jwt_token_login = data.jwt_token;
				//投票
				toVote();
			  } else {
		         $(".messdivCons").html("断网了");
			     tcc.BOX_show("messdiv-tip");
			 } 
			
		}
		if (data.nextStep == '2') {

		}
		if(data.nextStep=="7"){
	      otherShare();
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
	$(".tv_area").click(function(e){
      var dynamicId = $(this).attr("dynamicId");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '8',
        'dynamicId': dynamicId
      })
    })
//其他分享
var otherShare=function(){
	var title=$("#shareInfo").attr("title");
			var cover=$("#shareInfo").attr("cover");
			var share_url=$("#shareInfo").attr("share_url");
			var content=$("#shareInfo").attr("content");
			
			setBridgeCallHandler(bridge, {
				'action': '4',
				'user_id': uid,
				'star_id': star_id,
				'share': {
					//'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
					'share_url': share_url,
					'title': title,
					'content': content,
					'cover': cover
				}
			})
    }
	//活动页面->个人中心
	$(document).on("click", ".mrDetailHeader .head-pic", function(e) {
			var uid = $(this).attr("uid");
			e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '2',
				'user_id': uid
			})
		})

	//打榜
	$("#toHit").click(function(e) {
		var is_like=$("#toHit").attr("is_like");
		var uid=analyzParams("id");
		var star_id=$(".mrDetailHeader .curPersonInfo .head-pic").attr("uid");
		if(is_like=="0"){
			e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '1',
				'nextStep': '3'
		   })
		}else{

			var title=$("#shareInfo").attr("title");
			var cover=$("#shareInfo").attr("cover");
			var share_url=$("#shareInfo").attr("share_url");
			var content=$("#shareInfo").attr("content");
			e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '4',
				'user_id': uid,
				'star_id': star_id,
				'share': {
					//'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
					'share_url': share_url,
					'title': title,
					'content': content,
					'cover': cover
				}
			})
		}

		
	})
   

})

var initDetailPage = function(resultData) {
		var user = resultData.data.user;
		var team = resultData.data.category == 1 ? "女组" : "男组"
		if(user!=undefined &&　user!=null){
			$(".mrDetailHeader .curPersonInfo .head-pic img").attr("src", user.head_pic);
			$(".mrDetailHeader .curPersonInfo .head-pic").attr("uid", user.id);
			$(".mrDetailHeader .curPersonInfo .currentName").html(user.name);
			$(".mrDetailHeader .curPersonInfo .teamNum").html(team);
			$(".mrDetailHeader .curPersonInfo .rankNumber").html(resultData.data.user_rank);
			$(".mrDetailHeader .curPersonInfo .follow-num span").html(resultData.data.like_num);
		}
		if(resultData.data.videos!=null){
			$("#myVideo").attr("src", resultData.data.videos.photos[0]+"!640x640");
		    $(".tv_area").attr("dynamicId",resultData.data.videos.id)
		   //$("#myVideo").attr("src", resultData.data.videos.video);
		}
		
		//shareinfo
		$("#shareInfo").attr("title", resultData.data.work_share.title);
		$("#shareInfo").attr("content", resultData.data.work_share.content);
		$("#shareInfo").attr("cover", resultData.data.work_share.cover);
		$("#shareInfo").attr("share_url", resultData.data.work_share.share_url);
		//is_like
		//alert(resultData.data.is_like)
		if (resultData.data.is_like == "0") {
			$("#toHit").attr("is_like", "0");
		}else {
			$("#toHit").attr("is_like", "1");
			$("#toHit").val("召唤好友支持TA");
		}
		//pic init
		var picHtml = [];
		var picData = resultData.data.pictures.photos;
		$(".swiper-wrapper").attr("dynamicsId", resultData.data.pictures.id)
		for (var i = 0; i < picData.length; i++) {
			picHtml[i] = "<div class='swiper-slide'><a href='" + picData[i] + "'><img src='" + picData[i] + "!250x250' width='100%''></a></div>";
		}
		mySwiper.prependSlide(picHtml);
		$('#gallery img').fsgallery();
	}
	//获取详情页面
var getRankData = function(uid) {
		/*  var jwt_token=analyzParams("jwt_token");*/
		var url = host + "/list/" + uid + "/detail?jwt_token="+jwt_token;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				initDetailPage(resultData);
			}

		})

	}
	//投票
var toVote = function() {
	var uid = analyzParams("id");
	var url = host + "/list/" + uid + "/voted?jwt_token="+jwt_token;
	ajaxCommonFun(url, "get", function(resultData) {
		$("#toHit").attr("is_like","1");
			$(".mrDetailHeader #followNum").html(Number(Number($(".mrDetailHeader #followNum").html())+1));
			$("#toHit").val("召唤好友帮TA投票")
		if (resultData.code == "200") {
			
			tcc.BOX_show("messdiv-tip");
			$(".messdivCons").html("投票成功")
		}else{

		  if(resultData.code == "422"){
		  	tcc.BOX_show("messdiv-tip");
			$(".messdivCons").html("一天只能投票一次。");
		  }else{
		  	tcc.BOX_show("messdiv-tip");
			$(".messdivCons").html("账户信息失效，请重新登录");
		  }
		
		}

	})
}
$(function() {
	
    mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 3,
		paginationClickable: true,
		spaceBetween: 10,
		freeMode: true,
		initialSlide :0,
		// 如果需要分页器
		/*pagination: '.swiper-pagination'*/
		// 如果需要前进后退按钮
		/*nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',*/
	})
	var uid = analyzParams("id");
	getRankData(uid);
	//close tip
	$(".js-close").click(function() {
		tcc.BOX_remove("messdiv-tip");
	})
	
})