var host ='https://startvshow.com/v2';
var server = 0;
var jwt_token_login = "";
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
			window.onresize = function() {
					tcc.BOX_layout(e);
				} //改变窗体重新调整位置
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
			$('html,body').addClass('ovfHiden'); 
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
			$('html,body').removeClass('ovfHiden'); 
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
			//取客户端左上坐标，宽，高
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
				//clientHeight = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
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

var ajaxCommonFun = function(url, type, callbackFun, params) {
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
}
var analyzParams = function(param_name) {
	var url = window.location.search.split("?")[1];
	if (url == "" || url == undefined) return url;
	url = url.split(param_name + "=")[1];
	if (url == "" || url == undefined) {
		url = "";
		return url;
	}
	if (url.indexOf("&") > 0) {
		url = url.split("&")[0];
	}
	return url;
}

var addLoadding = function(targetId) {
	var loaddingHtml = "<div class='spinner' id='spinner'>" + "<div class='bounce1'></div>" + "<div class='bounce2'></div>" + "<div class='bounce3'></div>" + "</div>";
	$("#" + targetId).append(loaddingHtml)
}
var removeLoadding = function(selfId) {
	$("#" + selfId).remove();
}
var dateDiff=function(interval, date1, date2){
    if(date1==null || date2==null){
      return "";
    }
     var objInterval = {'D':1000 * 60 * 60 * 24,'H':1000 * 60 * 60,'M':1000 * 60,'S':1000,'T':1};
     interval = interval.toUpperCase();
     var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
     var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
     try
     {
        return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.'+interval));
      }
      catch (e)
      {
        return e.message;
      }
  }