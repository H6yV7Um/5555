/**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'       
1-跳登陆；2-跳个人；3-普通分享；
4-打榜分享；5-支付宝支付；
6-微信支付；7-H5弹窗；
8-跳动态详情；9-上传作品；
10-token过期；11-TV；
12-直播；13-回播
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

//设置WebViewJavascriptBridge通信回调方法--相对应js中
/*setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') { //登录
      if (get_token() == "") {
        login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
      }

    }else if (data.nextStep == '8') { 
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
   //交互方法
   clientInter(bridge);

})*/