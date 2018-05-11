var t="";

//弹出框
var tcc = {
	BOX_show: function(e) //显示
		{
			if (document.getElementById(e) == null) {
				return;
			}
			var selects = document.getElementsByTagName('select');
			for (i = 0; i < selects.length; i++) {
				selects[i].style.visibility = "hidden";
			}
			tcc.BOX_layout(e);
			/*window.onresize = function() {
					tcc.BOX_layout(e);
				}*/ //改变窗体重新调整位置
			window.onscroll = function() {
					tcc.BOX_layout(e);
				} //滚动窗体重新调整位置
			document.onkeyup = function(event) {
				var evt = window.event || event;
				var code = evt.keyCode ? evt.keyCode : evt.which;
				//alert(code);
				if (code == 27) {
					tcc.BOX_remove(e);
				}
			}
		},
	BOX_remove: function(e) //移除
		{
			window.onscroll = null;
			window.onresize = null;
			document.getElementById('BOX_overlay').style.display = "none";
			document.getElementById(e).style.display = "none";
			var selects = document.getElementsByTagName('select');
			for (i = 0; i < selects.length; i++) {
				selects[i].style.visibility = "visible";
			}
		},
	BOX_layout: function(e) //调整位置
		{
			var a = document.getElementById(e);
			if (document.getElementById('BOX_overlay') == null) //判断是否新建遮掩层
			{
				var overlay = document.createElement("div");
				overlay.setAttribute('id', 'BOX_overlay');
				document.body.appendChild(overlay);
			}
			document.getElementById('BOX_overlay').ondblclick = function() {
				tcc.BOX_remove(e);
			};
			var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
			var clientWidth;
			if (window.innerWidth) {
				clientWidth = window.innerWidth;
				// clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
			} else {
				clientWidth = document.documentElement.clientWidth;
			}
			var clientHeight;
			if (window.innerHeight) {
				clientHeight = window.innerHeight;
				//clientHeight = ((Sys.Browser.agede3x3nt === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
			} else {
				clientHeight = document.documentElement.clientHeight;
			}
			var bo = document.getElementById('BOX_overlay');
			bo.style.left = scrollLeft + 'px';
			bo.style.top = scrollTop + 'px';
			bo.style.width = clientWidth + 'px';
			bo.style.height = clientHeight + 'px';
			bo.style.display = "";
			//Popup窗口定位
			a.style.position = 'absolute';
			a.style.zIndex = 999;
			a.style.display = "";
			a.style.left = scrollLeft + ((clientWidth - a.offsetWidth) / 2) + 'px';
			a.style.top = scrollTop + ((clientHeight - a.offsetHeight) / 2) + 'px';
		},
	HiddenButton: function(e) {
		e.style.visibility = 'hidden';
		e.coolcodeviousSibling.style.visibility = 'visible'
	}
}
var timesReview=function(created_at,endTime){
	  var timeDiff=commonCla.dateDiff('T',created_at,endTime);
	  var timeHtml="";
	  //日
      var dayDiff=commonCla.dateDiff('D', created_at,endTime);
      //小时
      var hDiff=commonCla.dateDiff('H', created_at,endTime);
      //分钟
      var mDiff=commonCla.dateDiff('M', created_at,endTime);
      //秒
      var sTime=commonCla.dateDiff('s', created_at,endTime);

	  var timeMark="前";
      if(sTime<0){
        sTime=Number(-sTime);
        timeMark="后";
      }
      if(hDiff<0){hDiff=-hDiff}
      if(dayDiff<0){dayDiff=-dayDiff}
      if(sTime<60){
      timeHtml=sTime+"秒"+timeMark
      }else if(sTime>=60 && sTime<3600){
         /* timeHtml=Math.round(sTime/60)+"分钟"+sTime%60+"秒"+timeMark;*/
         timeHtml=Math.round(sTime/60)+"分钟"+timeMark;
      }else if(sTime>=3600 && sTime<3600*24){
          timeHtml=hDiff.toFixed(0)+"小时"+timeMark;
      }else if(sTime>=3600*24 && sTime<3600*24*30){
          timeHtml=dayDiff+"天"+timeMark;
      }else if(sTime>=3600*24*30 && sTime<3600*24*30*12){
      	  timeHtml=(dayDiff/30).toFixed(0)+"月"+timeMark;
      }else{
      	 timeHtml=(dayDiff/30/12).toFixed(0)+"年"+timeMark;
      }

      return timeHtml;
}

var timeFormat=function(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
var isWeiXin=function() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
//判断是否存在指定函数 
function isExitsFunction(funcName) {
	try {
		if (typeof (eval(funcName)) == "function") {
			return true;
		}
	} catch (e) {
	}
	return false;
}
// 判断是否存在指定变量 
function isExitsVariable(variableName) {
	try {
		if (typeof (variableName) == "undefined") {
			return false;
		} else {
			return true;
		}
	} catch (e) {
	}
	return false;
}
//授权方法
var wx_authorize=function(params,type){
   var paramStr="";
   for(var key in params){
     paramStr+=key+"="+params[key]+"&";
   }
   /*paramStr=paramStr.substring(0,str.length-1);*/
  //正式
  var redirect = encodeURIComponent("http://cangpai.startvshow.com/api/v1/wechat/oauth2?"+paramStr+"type="+type+"&env=production");
  //测试
 //var redirect = encodeURIComponent("http://cangpai.startvshow.com/api/v1/wechat/oauth2?"+paramStr+"type="+type+"&env=development");
  window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88e9ea081555795c&redirect_uri="+redirect
  +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
}

var wx_share=function(title,desc,link,imgUrl){
	var wx_host = "http://cangpai.startvshow.com/api/v1";
	var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
	$.getJSON(wx_api, function(a) {	
		a.status && (wx.config({
			debug: !1,
			appId: a.appId,
			timestamp: a.timestamp,
			nonceStr: a.nonceStr,
			signature: a.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
		}), 
		wx.ready(function() {
			wx.onMenuShareAppMessage({			
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			}), wx.onMenuShareTimeline({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			})
		}))
	});
}
//
var reviewHeader=function(src){
  if(src.indexOf("collection-auction")!=-1){
  	src=src+"!250x250";
  }
  return src;
}
var cutDate=function(time,type){
	if(time!=null && time!="null" && time!=""){
		var date=time.split(" ")[0].split("-");
		var times=time.split(" ")[1].split(":");
		var str_time=date[1]+"-"+date[2]+""+" "+times[0]+":"+times[1]
		if(type=="ymd"){
	      var str_time=date[0]+"-"+date[1]+"-"+date[2]+""
		}
		return str_time
	}else{
		return ""
	}
	

}