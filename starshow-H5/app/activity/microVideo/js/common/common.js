var commonCla = {
	//正式服务器
	hostBase: "https://startvshow.com",
	//测试服务器
	// hostBase: "http://test.startvshow.com",
	//分享地址
	//ajax
	ajaxCommonFun: function(url, type, callbackFun, params) {
		$.ajax({
			url: url,
			type: type,
			dataType: 'json',
			async: true,
			cache: false,
			data: params,
			success: function(data) {
				//回调函数
				if (callbackFun) {
					callbackFun(data);
				}
			},
			error: function() {}
		})
	},
	//获取时间差
	dateDiff: function(interval, date1, date2) {
		if (date1 == null || date2 == null) {
			return "";
		}
		var objInterval = {
			'D': 1000 * 60 * 60 * 24,
			'H': 1000 * 60 * 60,
			'M': 1000 * 60,
			'S': 1000,
			'T': 1
		};
		interval = interval.toUpperCase();
		var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
		var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
		try {
			return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.' + interval));
		} catch (e) {
			return e.message;
		}
	},
	//获取连接中的参数
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
	//autoscroll
	autoScroll: function(obj) {
		if ($(obj).find("ul:first li").length < 2) {
			window.clearInterval($t); //清楚定时器
			return;
		}
		$(obj).find("ul:first").animate({
			marginTop: "-4rem" //和上面的height一致 
		}, 800, function() {
			$(this).css({
				marginTop: "0px"
			}).find("li:first").appendTo(this);
		});
	},
	initJcountdown: function(currentTime, endTime, containerId) {
		var EndTime = new Date(endTime);
		var NowTime = new Date(currentTime);
		if (t == "") t = EndTime.getTime() - NowTime.getTime();
		var d = 0;
		var h = 0;
		var m = 0;
		var s = 0;
		if (t >= 0) {
			d = Math.floor(t / 1000 / 60 / 60 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}
		var formatDate = "精彩倒计时：<span>" + d + "</span>天" + "<span>" + h + "</span>时" + "<span>" + m + "</span>分"
		var status = $("#tvStatus").attr("status");
		$("#" + containerId).html(formatDate);
		//服务器时间，一分钟更新一次
		t = t - 60000;


	},cWan:function(num){
		var orderNum=num;
		if(num>10000){
			var num2=num/10000+"";
			orderNum=num2.substring(0,num2.lastIndexOf('.')+2) +"万"
		  }
		  return orderNum;
	  },

}
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
			}
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
		}*/ //改变窗体重新调整位置
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
//授权方法
var wx_authorize=function(params,type){
var paramStr="";
for(var key in params){
	paramStr+=key+"="+params[key]+"&";
}
/*paramStr=paramStr.substring(0,str.length-1);*/
//正式
var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2/activityAuth?"+paramStr+"type="+type+"&env=production");
//测试
// var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2/activityAuth?"+paramStr+"type="+type+"&env=development");
window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
+"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
}
var swal_confirm=function(title,btntext,callbackFun,isCancel){
swal({
	title: title,
	/*type: "warning",*/
	showCancelButton: isCancel,
	confirmButtonColor: "#ff1d3e",
	confirmButtonText: btntext,
	cancelButtonText:"取消",
	closeOnConfirm: true
},function(){
	//回调函数
	if (callbackFun) {
		callbackFun();
	}
})
}
var timesReview=function(created_at,endTime){
  var timeDiff=dateDiff('T',created_at,endTime);
  var timeHtml="";
  //日
  var dayDiff=dateDiff('D', created_at,endTime);
  //小时
  var hDiff=dateDiff('H', created_at,endTime);
  //分钟
  var mDiff=dateDiff('M', created_at,endTime);
  //秒
  var sTime=dateDiff('s', created_at,endTime);

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
var wx_share=function(title,desc,link,imgUrl){
var wx_host = "https://startvshow.com/v6";
var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
$.getJSON(wx_api, function(a) {	
	a.data.status && (wx.config({
		debug: !1,
		appId: a.data.appId,
		timestamp: a.data.timestamp,
		nonceStr: a.data.nonceStr,
		signature: a.data.signature,
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