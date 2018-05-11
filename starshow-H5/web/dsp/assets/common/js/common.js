var t="";
var commonCla = {
		//正式服务器
		/*hostBase: "http://api.xingxiu.tv/v1",*/
		//测试服务器
		hostBase: "http://api.dsp.startvshow.com/v1",
		//分享地址
		/*shareUrlBase:"http://s.xingxiu.tv",*/
		//测试分享地址
		shareUrlBase:"testshare.startvshow.com",
		//ajax
	ajaxCommonFun: function (url, type, callbackFun, params,obj) {
			if(type.toUpperCase()=="POST"){
				 params=JSON.stringify(params)
			}
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
						/*if(language=="en" && obj){
							for (var i = 0; i < obj.length; i++) {
								changeLanguage(obj[i])
							};
							
						}*/
					}
					//headers
					//request.getResponseHeader('some_header')
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
			//var data1=data1.replace(/-/g,"/")
           // var data1=data2.replace(/-/g,"/");
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
			a.style.zIndex = 1001;
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
//timePicker
var date_range_options={  
    // startDate: moment().startOf('day'),  
    //endDate: moment(),  
    minDate: '01/01/2017',    //最小时间  
    //maxDate : '01/01/2017', //最大时间   
    linkedCalendars: false,
    autoUpdateInput: false,
    dateLimit : {  
        days : 183
    }, //起止时间的最大间隔  
    showDropdowns : true,  
    showWeekNumbers : false, //是否显示第几周  
    timePicker : false, //是否显示小时和分钟  
    /*timePickerIncrement : 60, //时间的增量，单位为分钟  */
    timePicker12Hour : false, //是否使用12小时制来显示时间  
    /*ranges : {  
        //'最近1小时': [moment().subtract('hours',1), moment()],  
        '今日': [moment().startOf('day'), moment()],  
        '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],  
        '最近7日': [moment().subtract('days', 6), moment()],  
        '最近30日': [moment().subtract('days', 29), moment()]  
    }, */ 
    opens : 'right', //日期选择框的弹出位置  
    buttonClasses : [ 'btn btn-default' ],  
    applyClass : 'btn-small btn-primary blue',  
    cancelClass : 'btn-small',  
    format : 'YYYY-MM-DD', // HH:mm:ss控件中from和to 显示的日期格式  
    separator : ' to ',  
    locale : {  
        applyLabel : '确定',  
        cancelLabel : '取消',  
        fromLabel : '起始时间',  
        toLabel : '结束时间',  
        customRangeLabel : '自定义',  
        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
        firstDay : 1  
    }  
}
var initDatePicker=function(){
	//时间插件  
    /*$('#reportrange span').html(moment().subtract('hours', 1).format('YYYY-MM-DD') + ' 至 ' + moment().format('YYYY-MM-DD'));  */
    $('#reportrange').daterangepicker(date_range_options, function(start, end, label) {
    	//格式化日期显示框  
      $('#reportrange span').html(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));  
     });  
 
}
//cookie
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

//自定义过期时间
//程序代码
//s是代表20秒,s20
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function setCookie(name,value,time)
{
var strsec = getsec(time);
var exp = new Date();
exp.setTime(exp.getTime() + strsec*1);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getsec(str){
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if (str2=="s")
	{
	return str1*1000;
	}
	else if (str2=="h")
	{
	return str1*60*60*1000;
	}
	else if (str2=="d")
	{
	return str1*24*60*60*1000;
	}
}
//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//清除所有cookie
function clearAllCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
	}
}
/*
*获取用户信息
*/
var initUserInfo=function(){
	var token=getCookie("token");
	var userId=getCookie("Id");
	
	if(token!=null){
  //userId==null &&
		var url=commonCla.hostBase+"/user/"+token
		commonCla.ajaxCommonFun(url,"get",function(ret){
			if(ret.Code=="200"){
				//name,value,time
				setCookie("CurrentTime",ret.CurrentTime,"h12");
				var data=ret.Data;
				for(var key in data){
					setCookie(key,data[key],"h12");
					console.log(key,data[key],"h12");
				}
			}
			initHomePage();
			initLoginInfo();
			if($(".uName").html()=="" || $(".uName").html()=="name"){
				 initHome()
			}
		})
	}else if(token==null){
	  window.location.href="../index.html"
	}
}
//上传附件通用
function fileSubmit(obj,type,callbackFun){
	var data=new FormData(obj);
	data.append("UploadType", type);
	var url= commonCla.hostBase+'/upload?Token=' + getCookie("token");
	$.ajax({
		url: commonCla.hostBase+'/upload?Token=' + getCookie("token"),
		type: 'POST',
		cache: false,
		data: data,
		processData: false,
		contentType: false
	}).done(function (ret) {
		if (callbackFun) {
			callbackFun(ret);
		}
		
	}).fail(function (ret) {
		if (callbackFun) {
			callbackFun(ret);
		}
	});
	
}



var initLoginInfo=function(){
	var Token=getCookie("token"); 
	$("#js_UseAmount").html(getCookie("UseAmount"));
	$("#js_FreezAmount").html(getCookie("FreezAmount"));
	$("#js_Account").html(getCookie("Account"));
	$("#js_canUse").html((getCookie("Account")*100-getCookie("FreezAmount")*100)/100);
	var updateAt="";
	if(getCookie("UpdatedAt")!=null){
		var updateAt=getCookie("UpdatedAt").split("T")[0]+" "+getCookie("UpdatedAt").split("T")[1].split("+")[0]
	}

	$(".UpdatedAt_time").html(updateAt);
	var Status=getCookie("Status");
	if(Status==0){
		$("#complete_tip").show();
	}


}
//表单验证通用方法
function checkForm(data, callback) {
	var reg = data.reg;
	if (data.obj.val() == "") {
		data.obj.parent().find(".error-info").html(data.error1).show();
		data.obj.parent().addClass("form-error");
		return false;
	} else if (!reg.test(data.obj.val())) {
		data.obj.parent().find(".error-info").html(data.error2).show();
		data.obj.parent().addClass("form-error");
		return false;
	} else {
		data.obj.parent().find(".error-info").hide();
		data.obj.parent().removeClass("form-error");
		return true;
	}
	if (callback) {
		callback
	}
}
//验证两次密码是否输入一致
var pasdIsSame = function (pasd1, pasd2) {
	if ($(pasd1).val() === $(pasd2).val()) {
		$(pasd1).next().html("").hide();
		$(pasd1).parent().removeClass("form-error");
		$(pasd2).next().html("").hide();
		$(pasd2).parent().removeClass("form-error");
		return true;
	} else {
		$(pasd1).next().html("两次密码输入不一致").show();
		$(pasd1).parent().addClass("form-error");
		$(pasd2).next().html("两次密码输入不一致").show();
		$(pasd2).parent().addClass("form-error");
		return false;
	}
}
// 获取验证码
var getVerifyCode = function (mobile, type, obj) {
	// var that = $(obj)
	var url = host + "/sms";
	var params = {
		"Mobile": mobile,
		"Type": type
	}
	commonCla.ajaxCommonFun(url, "POST", function (ret, textStatus, request) {
		if (ret.Code == "200") {
			swal({
				"title": ret.Data,
				"confirmButtonText": "确定",
				"confirmButtonColor": "#ff1d3e",
				"animation": "none",
			});
			invokeSettime($(obj), mobile, type)
		} else {
			swal({
				"title": ret.Error,
				"confirmButtonText": "确定",
				"confirmButtonColor": "#ff1d3e",
				"animation": "none",
			});
		}
	}, params)
}
// 获取验证码倒计时
function invokeSettime(obj, mobile, type) {
	var countdown = 120;
	settime(obj);

	function settime(obj) {
		if (countdown == 0) {
			$(obj).removeAttr("disabled"); 
			$(obj).parent().removeClass("readonly");
			$(obj).text("获取验证码");
			countdown = 120;
			return;
		} else if ($(obj).parents("ul").find(".input-tel").val() == ""){
			$(obj).text("获取验证码");
		} else {
			$(obj).attr("disabled", true)
			$(obj).parent().addClass("readonly");
			$(obj).prev().css({ "background": "#fff" })
			$(obj).text("(" + countdown + ") s 重新发送");
			countdown--;
		}
		codeTimer = setTimeout(function () {
			settime(obj)
		}, 1000)
	}
}
//判断是否存在token
var checkLogin = function () {
	var userToken = getCookie("token");
	var url = window.location.href;
	if (userToken) {
		if (url.indexOf("register") > -1) {
			window.location.href = "backstage/indexList.html?mt=0";
		} else {
			$(".register-btn").hide();
			$(".login-btn").hide();
			$(".goto-backstage").show();
			$(".goto-login").html("进入后台管理平台>")
			$(".goto-login").attr("href", "backstage/indexList.html?mt=0")
			$(".goto-login").off("click")
		}
	}
}
var initHome=function(){
	$(".dspMenu").on("click",".js_dspMenu li",function(){
			var pageLink=$(this).attr("pageLink");
			window.location.href=pageLink+"?mt="+$(this).index();
	})
   if(getCookie("UnSysMsg")<=0){
		$(".msg_num").hide();
	}else{
		$(".msg_num").show();
		$(".msg_num").html(getCookie("UnSysMsg"));
	}
	$(".uName").html(getCookie("Name"));
	//站内信
	$(".icon_msg").click(function () {
		$(".js_dspMenu li").removeClass("cur");
		$(this).find("msg_num").hide();
		var pageLink = $(this).attr("pageLink");
		window.location.href=pageLink;
	})
		//退出
	$(".dspHeader").on("click", ".loginStatus", function () {
			clearAllCookie()
			/* swal({
				"title": "退出成功",
				"confirmButtonText": "确定",
				"confirmButtonColor": "#ff1d3e",
				"animation": "none",
			}); */
			//清除cookie 跳转至首页，首页根据exit判断是否清除cookie
			setTimeout(function () {
				window.location.href = "../index.html?exit=1"
			}, 200);
		})
    	//根据参数不同跳转到资质页  type:1资质 2修改密码
	var type = commonCla.analyzParams("profile");
		if (type == "1") {
			/*$(".js_dspMenu li", window.parent.document).removeClass("cur");
			$(".js_dspMenu li", window.parent.document).eq(4).addClass("cur");
			$("iframe", window.parent.document).attr("src", "profile.html");
			history.replaceState({ data: "reset" }, "nofresh", "home.html");*/

		}
	/*var changeStatus = function () {
		var token = getCookie("token");

		if (token != null) {
			var url = commonCla.hostBase + "/user/" + token
			$.ajax({
				url: url,
				type: "Get",
				success: function (ret) {
					if (ret.Code == "200") {
						document.cookie = "Status=" + ret.Data.Status;
					}
				}
			})
		}
	}*/
	// 每次载入页面的时候都判断资质状态
	/*changeStatus()*/
}
//record
var initHomePage=function(){
	if(getCookie("token")=="" || getCookie("token")==undefined){
		window.location.href="../index.html"
	}
	var headerHtml='<img src="../assets/images/back_logo.png" height="40" width="127" class="logo" />'+
		'<div class="platName">广告投放管理平台</div>'+
		'<div class="icon_msg" pageLink="message.html?mt=0">'+
			'<img src="../assets/images/icon-msg.png" height="23" width="31" />'+
			'<span class="msg_num" style="display:none">1</span>'+
		'</div>'+
		'<div class="userInfo">'+
			'<img src="../assets/images/header-default.png" class="img_header">'+
			'<span class="uName">name</span>'+
		'</div>'+
		'<div class="loginStatus">'+
			'<img src="../assets/images/btn-quit.png" height="80" width="103">'+
		'</div>'
	var mt=commonCla.analyzParams("mt");
	var menuHtml='<ul class="js_dspMenu">'+
			'<li class="cur" pageLink="indexList.html"><i class="icon-home"></i><span>首页列表</span></li>'+
			'<li pageLink="spread.html"><i class="icon-globe"></i><span>推广管理</span></li>'+
			'<li pageLink="dataReport.html"><i class="icon-bar-chart"></i><span>数据报告</span></li>'+
			'<li pageLink="money.html"><i class="icon-credit-card"></i><span>财务管理</span></li>'+
			'<li pageLink="profile.html"><i class="icon-user"></i><span>账号管理</span></li>'+
			'<li pageLink="help.html"><i class="icon-question-sign"></i><span>帮助中心</span></li>'+
		'</ul>'
	$(".dspHeader").html(headerHtml);
	$(".dspMenu").html(menuHtml);

	$(".dspMenu li").removeClass("cur");
	$(".dspMenu li").eq(mt).addClass("cur");
	
}
$(function(){
	var url = window.location.href;
	if (url.indexOf("backstage") > -1) {
		initUserInfo();
	}
 	
	
	//tab切换
	$(".dsp_tabs").on("click","div.tab",function(){
			$(this).parents(".dsp_tabs").find(".tab").removeClass("cur");
			$(this).addClass("cur");
			var inx=$(this).index()+1;
			$(this).parents(".dsp_tabs").next(".tabsCons").find(".tabCon").hide();
			$(this).parents(".dsp_tabs").next(".tabsCons").find("#tabCon"+inx).show();
	})
})