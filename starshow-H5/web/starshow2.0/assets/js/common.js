jQuery.support.cors = true;
var $t="";
var commonCla = {
	    t:"",
		//正式服务器
		hostBase: "https://startvshow.com",
		//测试服务器
		//hostBase: "http://test.startvshow.com",
		//正式广告的地址
		adBase:"http://api.dsp.startvshow.com/v1",
		// 测试广告地址
		//adBase: "http://47.94.175.204:8088/v1",

		//ajax
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
			if (commonCla.t == "") commonCla.t = EndTime.getTime() - NowTime.getTime();
			var d = 0;
			var h = 0;
			var m = 0;
			var s = 0;
			if (commonCla.t >= 0) {
				d = Math.floor(commonCla.t / 1000 / 60 / 60 / 24);
				h = Math.floor(commonCla.t / 1000 / 60 / 60 % 24);
				m = Math.floor(commonCla.t / 1000 / 60 % 60);
				s = Math.floor(commonCla.t / 1000 % 60);
			}
			var formatDate = "<span>" + d + "</span>天" + "<span>" + h + "</span>时" + "<span>" + m + "</span>分"
			$("#" + containerId).html(formatDate);
			//服务器时间，一分钟更新一次
			 commonCla.t = commonCla.t - 60000;
			 if(d==0 && h==0 && m==0){
			   $("#" + containerId).parent().hide();
			   $(".video_span").html("直播即将开始");
			   $(".video_span").show();
			   window.location.reload();
			 }


		},
		cWan:function(num){
		    var orderNum=num;
		    if(num>10000){
		        var num2=num/10000+"";
		        orderNum=num2.substring(0,num2.lastIndexOf('.')+2) +"万"
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
Array.prototype.contains = function ( needle ) {  for (i in this) {    if (this[i] == needle) return true;  }  return false;}
//autoscroll
var autoScroll=function(obj){
 if($(obj).find("ul:first li").length<2){
  window.clearInterval($t); //清楚定时器
  return;
  }
 $(obj).find("ul:first").animate({ 
    marginTop:"-80px"//和上面的height一致 
     },1000,function(){ 
    $(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
     }); 
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
//初始化页面
var appendHtml=function(){
	var headHtml='<div class="xingx_content">'+
 		'<a href="index.html"><img src="assets/images/logo.png" width="137" class="icon_logo" /></a>'+
 		'<div class="xingx_menus">'+
 		  '<ul class="xingx_nav"></ul>'+
 		  '<div class="xingx_other">'+
 		  	'<div class="xingx_link"><a target="_blank" href="http://e.xingxiu.tv"><span>广告投放</span></a><a target="_blank" href="downLoad.html">|<span>手机APP</span>|</a><a href="about.html"><span>关于我们</span>|</a></div>'+
	        '<div class="xingx_search toSearch">'+
	          '<img src="assets/images/icon-search.png" height="16" width="16"><!--<input type="text" class="txt_search" id="txt_search"/>-->'+
	        '</div>'+
	        '<div class="platList">'+
 			 '<div class="c1"><img src="assets/images/icon/icon-xingxiu.png" height="30" width="30">'+
	              '<div class="tips"><img src="assets/images/app.png" /></div>'+
	 			'</div>'+
	 			'<a class="fr" href="http://weibo.com/trendstarshow?refer_flag=1001030101_&is_all=1"><img src="assets/images/icon/icon-sina.png" height="30" width="30"></a>'+
	 			'<div class="c2"><img src="assets/images/icon/icon-wechat.png" height="30" width="30">'+
	             '<div class="tips"><img src="assets/images/weix.png" /></div>'+
	 			'</div>'+
	 		'</div>'+
 		  '</div>'+
 		'</div>'+
 		
 	  '</div>'
 	    //尾部
  var footerHtml='<!--<img class="fl" src="assets/images/footer-logo.png" height="53" width="170" />-->'+
            '<a class="fl" target="_blank" href="https://v.pinpaibao.com.cn/cert/site/?site=www.xingxiu.tv&amp;at=business "><img src="https://static.anquan.org/static/outer/image/aqkx_124x47.png " style="margin-top: 15px;"></a>'+
	 		'<div class="footer_cen fl">'+
	 			'<ul>'+
		 			'<li><a href="about.html">关于我们</a></li>'+
		 			'<li><a href="about.html?#partner">合作伙伴</a></li>'+
		 			'<li><a href="about.html?#link">联系我们</a></li>'+
		 			'<li><a href="about.html?#partner2">商务合作</a></li>'+
		 		'</ul>'+
		 		'<div class="cb"></div>'+
		 		'<p>广播电视节目制作经营许可证（京）字第04580号 / 网络文化经营许可证京网文 [ 2017 ]4086-455号</p>'+
		 		'<p>营业性演出许可证京演（机构）[ 2017 ] 3212 号 / 互联网ICP备案14027095号-2</p>'+
	 		'</div>'+
	 		'<ul class="footer_right">'+
	 			'<li>'+
	 				'<img src="assets/images/code-app.png" height="61" width="62">'+
	 				'<p>手机APP</p>'+
	 			'</li>'+
	 			'<li>'+
	 				'<img src="assets/images/code-wx.png" height="61" width="62">'+
	 				'<p>微信公众号</p>'+
	 			'</li>'+
	 			'<li>'+
	 				'<img src="assets/images/code-sina.png" height="61" width="62">'+
	 				'<p>新浪微博</p>'+
	 			'</li>'+
	 		'</ul>'
  $("#xingx_footer").html(footerHtml)
  $(".xingx_header").html(headHtml);
  //初始化菜单
  var menuHtml="";
  var resultData=menuData;
  for (var i = 0; i < resultData.data.length; i++) {
	  var childs="";
	  var childsHtml="";
	  if(resultData.data[i].childs!=null){
	    for (var a = 0; a < resultData.data[i].childs.length; a++) {
	      childsHtml+='<li><a href="'+resultData.data[i].childs[a].link+'">'+
	      resultData.data[i].childs[a].name+'</a></li>'
	    };
	   childs='<div class="childsMain"><ul class="menu_childs" style="display:none">'+childsHtml+'</ul></div>';
	  }
	  var cur_tag="";
	  if(i==0){
	  	var cur_tag='class="cur"'
	  }
	   menuHtml+='<li '+cur_tag+'><a href="'+resultData.data[i].link+'">'+resultData.data[i].name+'<div class="line"></div></a>'+childs+'</li>';
  };
  $(".xingx_nav").html(menuHtml);
  //初始化搜索
  var searchHtml='<div class="md-overlay"></div>'+
				 '<div class="md-modal md-effect-9 " id="modal-9">'+
					'<div class="md-content">'+
						'<div class="search_con">'+
							'<input type="text" class="txt_search" id="txt_search" placeholder="搜索"/>'+
							'<h1>热门推荐</h1>'+
							'<ul class="news"></ul>'+
						'</div>'+
					'</div>'+
				'</div>'
	 if($("md-overlay").html()==undefined){
	 	$("body").append(searchHtml);
	 }
	 
}

var initMenu=function(){
   appendHtml();
   getAdInfo()
   var parent_cur=-1;var child_cur=-1;
   var menuTag=commonCla.analyzParams("menuTag");
	if(menuTag!=undefined && menuTag!=""){
  	    parent_cur=Number(menuTag.split("-")[0])+1;
  	    child_cur=menuTag.split("-")[1];
     }
     if(parent_cur!=-1){
       $(".xingx_nav >li").eq(parent_cur).find(".line").css("display","block");
       if(child_cur!=-1 && child_cur!="" && child_cur!=0){
       	$(".xingx_nav >li").eq(parent_cur).find(".menu_childs").show();
        $(".xingx_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
       }else if(child_cur==0){
       	$(".xingx_nav >li").eq(parent_cur).find(".menu_childs").show();
	    $(".xingx_nav >li").eq(parent_cur).find(".menu_childs li").removeClass("cur")
       }
       
     }else{
     	$(".xingx_nav >li").find(".line").css("display","none");
     	$(".xingx_nav >li.cur").find(".line").css("display","block");
     }
  //
  $(".menu_childs").mouseout(function(){
	    $(".menu_childs").hide();
	    $(".line").hide();
	   	if(parent_cur!=-1 && parent_cur!=""){
	    	 $(".xingx_nav >li").eq(parent_cur).find(".line").show();
	    }
      	if(child_cur!=-1 && child_cur!=""){
        	$(".xingx_nav >li").eq(parent_cur).find(".menu_childs").show();
		if(child_cur!=0){
		$(".xingx_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
		}
            
       	}
	  })
  $(".xingx_nav li").mouseout(function(){
  	 if($(this).find(".menu_childs").html()==undefined){
		$(this).find(".line").hide();
		$(".xingx_nav >li.cur").find(".line").css("display","block");
  	    $(this).find(".menu_childs").hide();

  	    if(parent_cur!=-1 && parent_cur!=""){
	    	 $(".xingx_nav >li").eq(parent_cur).find(".line").show();
	    }
        if(child_cur!=-1 && child_cur!=""){
	       	$(".xingx_nav >li").eq(parent_cur).find(".menu_childs").show();
			if(child_cur!=0){
			$(".xingx_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
			}
	    }
  	 }
	   
  })
  $(".xingx_nav li").mouseover(function(){
    $(".menu_childs").hide();
    $(".line").hide();
    $(this).find(".line").show();
    $(".xingx_nav >li.cur").find(".line").css("display","block");
    if($(this).find(".menu_childs").html()!=undefined){
      $(this).find(".menu_childs").show();
    }else{
      $(".menu_childs").hide();
    }
    
  })
  $(".platList div").mouseover(function(){
  	$(this).find(".tips").show()
  })
  $(".platList div").mouseout(function(){
  	$(this).find(".tips").hide()
  })
  //搜索
  $(".xingx_mains").on("click",".toSearch",function(){
  	//热门推荐
  	var url=host+'/web/searchTop'
  	commonCla.ajaxCommonFun(url,"get",function(ret){
  		if(ret.code=="200"){
  			var ret=ret.data.news;
  			var newsHtml="";
  			for (var i = 0; i < ret.length; i++) {
  				newsHtml+='<li><a href="newsDetail.html?id='+ret[i].id+'&menuTag=0-">'+
  				'<img src="assets/images/icon_hours.png" height="8" width="7" class="vm"><span class="vm">'+
  				ret[i].title+'</span></li>'
  			};
  			$(".search_con .news").html(newsHtml);
  		}
  	})
  	$(".md-effect-9").addClass("md-show");
  	$(".md-overlay").addClass("md-show");
  })
  //搜索关闭
  $(".md-overlay").click(function(){
  	$(".md-effect-9").removeClass("md-show");
  	$(".md-overlay").removeClass("md-show");
  })
  //去搜索
  document.onkeydown = function(e){ 
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
    	 var pageType=$("#hide_info").attr("pageType");
	    //新闻
	    if(pageType=="search"){
	     window.location.href="search.html?keyword="+$("#txt_search").val();
	    }else{
	    	  window.open("search.html?keyword="+$("#txt_search").val());
	    }
         

     }
  }


}

var host=commonCla.hostBase+"/v12";
var menuData={
 "data":[{
	 	"name":"首页",
	 	"link":"/",
	 	"childs":null
	 },{
 	"name":"头条",
 	"link":"newsList.html?dtype=all&menuTag=0-0",
 	"childs":[
 	  {"name":"原创精选","link":"newsList.html?tagid=1-2245&dtype=2&menuTag=0-1"},
 	  {"name":"明星娱乐","link":"newsList.html?tagid=4&dtype=0&menuTag=0-2"},
 	  {"name":"明星访谈","link":"newsList.html?tagid=3&dtype=0&menuTag=0-3"},
 	  {"name":"时装","link":"newsList.html?tagid=2249&dtype=0&menuTag=0-4"},
 	  {"name":"生活","link":"newsList.html?tagid=5-2246&dtype=2&menuTag=0-5"},
 	  {"name":"美容","link":"newsList.html?tagid=6-2248&dtype=2&menuTag=0-6"},
 	  {"name":"人物","link":"newsList.html?tagid=2250&dtype=0&menuTag=0-7"},
 	  {"name":"品牌报","link":"newsList.html?tagid=2251&dtype=0&menuTag=0-8"},
 	  {"name":"秀场","link":"newsList.html?tagid=2252&dtype=0&menuTag=0-9"},
 	  {"name":"专题","link":"newsList.html?dtype=1&menuTag=0-10"},
 	  {"name":"时装周","link":"activity.html?dtype=1&menuTag=0-11"}
 	 ]
 	},{
 	"name":"视频",
 	"link":"videoList.html?dtype=all&menuTag=1-0",
 	"childs":[
 	  {"name":"原创精选","link":"videoList.html?tagid=2236&dtype=0&menuTag=1-1"},
 	  {"name":"乐活","link":"videoList.html?tagid=2237&dtype=0&menuTag=1-2"},
 	  {"name":"美妆","link":"videoList.html?tagid=2238&dtype=0&menuTag=1-3"},
 	  {"name":"人物","link":"videoList.html?tagid=2239&dtype=0&menuTag=1-4"},
 	  {"name":"穿搭","link":"videoList.html?tagid=2240&dtype=0&menuTag=1-5"},
 	  {"name":"万方视频","link":"videoList.html?tagid=2938&dtype=0&menuTag=1-6"}
 	 ]
 	},{
 	"name":"直播",
 	"link":"liveList.html?tagid=2238&dtype=0&menuTag=2-",
 	"childs":null
 },{
 	"name":"美图",
 	"link":"picList.html?dtype=all&menuTag=3-0",
 	"childs":[
 	  {"name":"明星","link":"picList.html?tagid=2243&dtype=0&menuTag=3-1"},
 	  {"name":"娱乐","link":"picList.html?tagid=2253&dtype=0&menuTag=3-2"},
 	  {"name":"时尚","link":"picList.html?tagid=2241&dtype=0&menuTag=3-3"},
 	  {"name":"美妆","link":"picList.html?tagid=2244&dtype=0&menuTag=3-4"},
 	  {"name":"尤物","link":"picList.html?tagid=2254&dtype=0&menuTag=3-5"},
 	  {"name":"乐活","link":"picList.html?tagid=2242&dtype=0&menuTag=3-6"}
 	 ]
 	},{
 	"name":"榜单",
 	"link":"billboard.html?menuTag=4-",
 	"childs":null
 },{
 	"name":"星秀盛典",
 	"link":"ceremonyStar.html?menuTag=5-",
 	"childs":null
 }
 ]
}
/*获取广告信息
type:首页：index、
	 新闻：news、
	 视频：video、
	 直播：live
*/
var getAdInfo = function() {
	var pageType=$("#hide_info").attr("pageType");
	var type;

	switch (pageType) {
		case "index": type = "index"; break;
		case "news": type = "news"; break;
		case "videos": type = "video"; break;
		case "lives": type = "live"; break;
	}

	if(pageType=="index" || pageType=="news" || pageType=="videos" || pageType=="lives") {
		var url = commonCla.adBase+"/extension/web/"+ type ;
		commonCla.ajaxCommonFun(url,"get",function(ret){
	  		if(ret.Code=="200"){
	  			initAdInfo(ret,type)
	  		}
	  	})
	}
}
/*AdType
1文章、2视频、3落地页、4无*/
var initAdInfo = function(ret,type) {
	var advs = ret.Data,
		payType = ret.Data.PaymentType,
	    adType = ret.Data.AdType,
	    jumpUrl = "javascript:;";
	// 根据不同的广告类型，跳转地址不一样
	switch (adType) {
		case 0: jumpUrl = "javascript:;"; break;
		case 1: jumpUrl = "newsDetail.html?id=" + advs.LinkId; break;
		case 2: jumpUrl = "videoDetail.html?id=" + advs.LinkId; break;
		case 3: jumpUrl = advs.LinkUrl; break;
	}
	if( advs.Id ) {
		$("#js_adv").show()
		var advHtml = '<a href="'+jumpUrl+'" ad-id="'+ advs.Id+'" target="_blank"><img src="'+advs.DisplayPic+'!1000x300" /></a>'
		$("#js_adv").html(advHtml)
		var newsHtml = '<div class="recom_lists" id="js_adv"><a href="'+jumpUrl+'" ad-id="'+ advs.Id+'" target="_blank"><img src="'+advs.DisplayPic+'!300x225"/><p>'+advs.Title+'</p></a></div>';
		$("#js-recomment").prepend(newsHtml)
	} else {
		$("#js_adv").hide()
	}
	charge(type)
}

/*广告展示计数*/
//CPM计费方式的时候收费开关
var adFlag = true; 			
var charge = function(type) {
/*	if(payType== 2) {	
		//CPM*/
	    var winHeight = $(window).height();
	    var advTop;
	    switch (type) {
			case "index": advTop = $(".index-ad").offset().top; break;
			case "video": advTop = 926; break;
			case "live": advTop = 926; break;
			case "news": advTop = 202; break;
		}
	    if(advTop<=winHeight) {
	    	if(adFlag) {
	        	var adId = $(document).find("#js_adv a").attr("ad-id")
	            postMoney(adId, 2)
	            adFlag = false;
        	}
	    } else {
			$(window).scroll(function () {
		        //获取页面滚走的距离,当广告出现在可视区的时候收费
		        var sTop = $(window).scrollTop();
		        if(sTop+winHeight-400 >= advTop || advTop<=winHeight){
		        	if(adFlag) {
			        	var adId = $(document).find("#js_adv a").attr("ad-id")
			            postMoney(adId, 2)
			            adFlag = false;
		        	}
		        }
		    })	
	    }	
	/*} else {*/
		//CPC  
		$(document).on("click", "#js_adv", function() {
	        var adId = $(this).find("a").attr("ad-id")
			postMoney(adId, 1)
		})
	// }
}
// 广告收费
// From 来源 1ios、2Android、3pc
var postMoney = function(adId, payType) {
	var url = commonCla.adBase+"/extension" ;
	var params = JSON.stringify({
		AdId: parseInt(adId),
		PaymentType: payType,
		From: 3
	})
	commonCla.ajaxCommonFun(url,"POST",function(ret){
  	}, params)
}
