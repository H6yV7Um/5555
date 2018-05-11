var t="";
var commonCla = {
		//正式服务器
		hostBase: "http://api.attopstar.com/StarListInterface",
		//测试服务器
		/*hostBase: "http://47.94.84.7:8086/StarListInterface",*/
		//分享地址
		shareUrlBase:"http://s.attopstar.com/starRank/",
		//测试分享地址
	/*	shareUrlBase:"http://testshare.startvshow.com",*/
		//ajax
		ajaxCommonFun: function(url, type, callbackFun, params) {
			$.ajax({
				url: url,
				type: type,
				dataType: 'json',
				async: true,
				cache: false,
				data: params,
				success: function(data,textStatus,request) {
					//回调函数
					if (callbackFun) {
						callbackFun(data,textStatus,request);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//回调函数
					console.log(XMLHttpRequest.status+"/"+textStatus)
					if (callbackFun) {
						callbackFun(XMLHttpRequest,textStatus,errorThrown);
					}
				}
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
		initJcountdown: function(currentTime,endTime,differ) {
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
			var times={
				"d":d,
				"h":h,
				"m":m,
				"s":s
			}
			//服务器时间，一分钟更新一次
			t = t - differ;
			return times;
		},
		cWan:function(num){
		    var orderNum=num;
		    if(num>10000){
		        var num2=num/10000+"";
		        /*alert(num2.lastIndexOf('.')+2)*/
		        if(num2.lastIndexOf('.')!=-1){
		        	orderNum=num2.substring(0,num2.lastIndexOf('.')+2) +"万"
		        }else{
		        	orderNum=num2+"万"
		        }
		        
		      }
		      return orderNum;
		  }

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
	var redirect = encodeURIComponent("http://admin.attopstar.com/StarListBackstage/weChat/power?"+paramStr+"type="+type+"&env=production");
  //测试
 //var redirect = encodeURIComponent("http://admin.attopstar.com/StarListBackstage/weChat/power?"+paramStr+"type="+type+"&env=development");
	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx12ffade8c3bca68c&redirect_uri="+redirect
  +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
}
//二次分享
var wx_share=function(title,desc,link,imgUrl){

	var wx_host = "http://admin.attopstar.com/StarListBackstage";
	//var wx_host = "http://10.0.134.215:8081/StarListBackstage";
	var wx_api = wx_host + "/weChat/sharePower?url=" + encodeURIComponent(location.href);
	$.ajax({
		url: wx_api,
		dataType: 'json',
		type: "POST",
		async: true,
		success: function(a) {	
			wx.config({
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
			})
		}
	});
}

function delQueStr(url, ref) {
	var url=url;
	var str = "";
	if (url.indexOf('?') != -1)
		str = url.substr(url.indexOf('?') + 1);
	else
		return url;
	var arr = "";
	var returnurl = "";
	var setparam = "";
	if (str.indexOf('&') != -1) {
		arr = str.split('&');
		for (i in arr) {
			if (arr[i].split('=')[0] != ref) {
				returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
			}
		}
		return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
	}
	else {
		arr = str.split('=');
		if (arr[0] == ref)
			return url.substr(0, url.indexOf('?'));
		else
			return url;
	}
}
//判断图片是否有后缀
var reviewHeader=function(src){
  if(src.indexOf("collection-auction")!=-1){
  	src=src+"!250x250";
  }
  return src;
}
//初始化角色
var initUserRole=function(user,src_single){
	var rolesHtml="";
	//未定
	if(user.is_vip>=1 && user.is_vip<=3){
		if(src_single==true){
			rolesHtml='../assets/images/roles/icon-roles'+user.is_vip+'.png';
	    }else{
	    	rolesHtml='<img src="../assets/images/roles/icon-roles'+user.is_vip+
	 		   '.png" height="12" width="12" class="icon_roles"  />';
	    }
		 
	}
	return rolesHtml;	
}
//转换货币
var change_currency=function(currency){
	//1人民币;2美元
	if(currency=="1"){
		return "￥"
	}else{
		return "$"
	}

}
// 获取url里的token
var get_token = function () {
	var token = commonCla.analyzParams("token");
	if (token == "" || token == undefined) {
		token = "";
	}
	return token;
}

$(function(){
	//下载btn_download
	$("#btn_download").click(function(){
		openApp_obj("home")
	})
	$(".cmt_short").on("click",".btn_download",function(){
		openApp_obj("home")
	})
	
})