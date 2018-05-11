/**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'  			//1-跳登陆；2-跳个人；3-普通分享；4-打榜分享；5-支付宝支付；6-微信支付
share : {title : "分享标题", content: "分享内容", cover : "分享icon", share_url : "分享link"}
order_id : '11' 		// 订单id
user_id : '22' 			// 跳转个人页的用户id
nextStep : '1'			//返回js下一步跳转地址类型

方法：
javascriptHandler :  用于“客户端”调取“JavaScript”方法
nativeCallback :     用于“JavaScript”调取“客户端”方法

*/
window.onerror = function(err) {
	//alert('window.onerror: ' + err)
}

//判断是否是Android
function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	var isA = ua.indexOf("android") > -1;
	if(isA){
		return true;
	} 
	return false;
}

//判断是否Iphone
function isIphone(){
	var ua = navigator.userAgent.toLowerCase();
	var isIph = ua.indexOf("iphone") > -1;
	if(isIph){
		return true;
	}
	return false;
}
	
//设置WebViewJavascriptBridge通信
function setupWebViewJavascriptBridge(callback) {
	if(isIphone()){ //用于Iphone
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	}else{
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
function setBridgeCallHandler(bridge,data){
	if(isIphone()){
		bridge.callHandler('nativeCallback', data, 
		function(response) {
			//
		}) 
	}else{
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
		if(isIphone()){			
		}else{
			var data = eval("("+data+")");
		}	
		/*if(data.action==7){
			var responseData = '{"cancel": "再想想", "confirm": "去意已决", "title": "确认放弃支付？", "backSetp": "3"}';
		}else{
			var responseData = 'ok!!';
		}	
		responseCallback(responseData);*/
		if(data.nextStep == '1'){ //个人中心
			
		}else if(data.nextStep == '2'){ //打榜
			getOrderDetail(114655);
		}else if(data.nextStep == '3'){//打榜分享
			114665;
			var uid = data.jwt_token;
			window.location.href = ("myOrder.html?uid="+uid+"&order_id=" + data.order_id + "&t=1");
		}else{
			//alert('跳转中...');
		}
	})
	
	
	//调取客户端方法
	if(isIphone()){ 
	}else{
		bridge.init(function(message, responseCallback) {
			var data = {
				'Javascript Responds': 'Wee!'
			}
			responseCallback(data)
		})
	}	
		
	
	
/*	//支付操作
	var payButton = document.getElementById('pay');
	if(payButton){
		payButton.onclick = function(e) {
			e.preventDefault()
			setBridgeCallHandler(bridge,{
				'action': $(".st_orderC_pay .active").attr("type"),
				'nextStep': '3',
				'order_id': 189
			})
		}
	}
	
	//我的订单
	var myOrderButton = document.getElementById('myOrder');
	if(myOrderButton){
		myOrderButton.onclick = function(e) {
			e.preventDefault()
			setBridgeCallHandler(bridge,{
				'action': '1',
				'nextStep': '2'
			})
		}
	}*/
})
	
	
	



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/***************************************************Android To H5 通信部分*******************************************************/
/*function dd(){
	alert('调用Android');
	//调用Native方法
	window.WebViewJavascriptBridge.callHandler('submitFromWeb', {
		'param': 1,
	},
	function(responseData) {
		alert("useCallHander repsonseData from java, data = " + responseData);
	})
}*/

/*function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge)
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady',
		function() {
			callback(WebViewJavascriptBridge)
		},
		false)
	}
}*/

/*connectWebViewJavascriptBridge(function(bridge) {
	bridge.init(function(message, responseCallback) {
		var data = {
			'Javascript Responds': 'Wee!'
		}
		responseCallback(data)
	})

	bridge.registerHandler("functionInJs",
		function(data, responseCallback) {
			alert("data from Java: = " + data);
			var responseData = "Javascript Says Right back atcha!";
			responseCallback(responseData);
		})
})*/


