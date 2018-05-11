var commonCla = {
		//正式服务器
		hostBase: "http://cangpai.startvshow.com/api",
		//测试服务器
		//hostBase: "http://testcangpai.startvshow.com/api",
		//分享地址
		//ajax
		ajaxCommonFun: function(url, type, callbackFun, params,obj) {
			if(!params){
				var params={}
			}
			params["language"]="en"

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
		        	orderNum=num2.substring(0,num2.lastIndexOf('.')+2) +"W"
		        }else{
		        	orderNum=num2+"W"
		        }
		        
		      }
		      return orderNum;
		  }

}
var host=commonCla.hostBase+"/v12";
var menuData={
 "data":[{
	 	"name":"Home",
	 	"link":"index.html",
	 	"childs":null
	 },{
 	"name":"Auction",
 	"link":"auctions.html?mt=1",
 	"childs":null
 	},{
 	"name":"Experts&live",
 	"link":"expertLive.html?mt=2",
 	"childs":null
 	},{
 	"name":"community",
 	"link":"community.html?mt=3",
 	"childs":null
 },{
 	"name":"About us",
 	"link":"about.html?mt=4",
 	"childs":null
 	}
 ]
}

var appendHtml=function(){
	/*var language=commonCla.analyzParams("lang");
	if(language!="en"){
       var span_language='<span id="js_en">英文版</span>'
	}else {
       var span_language='<span id="js_cn">中文版</span>'
	}*/
	var headHtml=`<div class="cangp_content">
				 	<a href="index.html"><img src="assets/images/logo.png" class="icon_logo" /></a>
				 	<div class="change-lang">
				 		<div class="checked-lang">ENGLISH<i></i></div>
				 		<ul class="lang-list">
					 		<li class="ch"><a href="../index.html">中文版</a></li>
					 		<li class="en"><a href="en/index.html">ENGLISH</a></li>
					 	</ul>
				 	</div>
					<div class="cangp_menus">
				 		  <ul class="cangp_nav"></ul>
				 	</div>
				</div>`
 	    //尾部
  var footerHtml='<div class="cangp_footer_con">'+
	 		'<div class="footer_cen fl">'+
			'<img class="fl" src="assets/images/footer_logo.png" />'+
	 			'<!--<ul>'+
		 			'<li><a href="about.html">关于我们</a></li>'+
		 			'<li><a href="about.html?#partner">合作伙伴</a></li>'+
		 			'<li><a href="about.html?#link">contact us</a></li>'+
		 			'<li><a href="about.html?#partner2">商务合作</a></li>'+
		 		'</ul>-->'+
		 		'<div class="fl footer_info"><p>© 2017 藏拍国际拍卖（北京）有限公司 ICANGPAI.COM 版权所有</p>'+
		 		'<p>京ICP备17055255号-1</p></div>'+
	 		'</div>'+
	 		'<ul class="footer_right">'+
	 			'<li>'+
	 				'<img src="assets/images/code-app-big.png" height="100" width="100">'+
	 				'<p>APP</p>'+
	 			'</li>'+
	 			'<!--<li>'+
	 				'<img src="assets/images/code-wx.png" height="61" width="62">'+
	 				'<p>微信公众号</p>'+
	 			'</li>-->'+
	 			
	 		'</ul></div>'
  $("#js_footer").html(footerHtml)
  $("#js_header").html(headHtml);
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
  $(".cangp_nav").html(menuHtml);
  /*if(language=="en"){
  	changeLanguage($(".cangp_nav"))
  }*/
  
	 
}

var initCommonPage=function(){
   appendHtml();
   var parent_cur=-1;var child_cur=-1;
   var menuTag=commonCla.analyzParams("mt");
	if(menuTag!=undefined && menuTag!=""){
  	    parent_cur=Number(menuTag.split("-")[0]);
  	    child_cur=menuTag.split("-")[1];
     }

     if(parent_cur!=-1){
       $(".cangp_nav >li").eq(parent_cur).find(".line").css("display","block");
       if(child_cur!=-1 && child_cur!="" && child_cur!=0){
       	$(".cangp_nav >li").eq(parent_cur).find(".menu_childs").show();
        $(".cangp_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
       }else if(child_cur==0){
       	$(".cangp_nav >li").eq(parent_cur).find(".menu_childs").show();
	    $(".cangp_nav >li").eq(parent_cur).find(".menu_childs li").removeClass("cur")
       }
       
     }else{
     	$(".cangp_nav >li").find(".line").css("display","none");
     	$(".cangp_nav >li.cur").find(".line").css("display","block");
     }
  //二级菜单
  /*$(".menu_childs").mouseout(function(){
	    $(".menu_childs").hide();
	    $(".line").hide();
	   	if(parent_cur!=-1 && parent_cur!=""){
	    	 $(".cangp_nav >li").eq(parent_cur).find(".line").show();
	    }
      	if(child_cur!=-1 && child_cur!=""){
        	$(".cangp_nav >li").eq(parent_cur).find(".menu_childs").show();
		if(child_cur!=0){
		$(".cangp_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
		}
            
       	}
	  })*/
  $(".cangp_nav li").mouseout(function(){
  	 if($(this).find(".menu_childs").html()==undefined){
		$(this).find(".line").hide();
  	    $(this).find(".menu_childs").hide();

  	    if(parent_cur!=-1 && parent_cur!=""){
	    	 $(".cangp_nav >li").eq(parent_cur).find(".line").show();
	    }else{
	    	$(".cangp_nav >li.cur").find(".line").css("display","block");
	    }
        if(child_cur!=-1 && child_cur!=""){
	       	$(".cangp_nav >li").eq(parent_cur).find(".menu_childs").show();
			if(child_cur!=0){
			$(".cangp_nav >li").eq(parent_cur).find(".menu_childs li").eq(child_cur-1).addClass("cur");
			}
	    }
  	 }
	   
  })
  $(".cangp_nav li").mouseover(function(){
    $(".menu_childs").hide();
    $(".line").hide();
    $(this).find(".line").show();
    //$(".cangp_nav >li.cur").find(".line").css("display","block");
    if($(this).find(".menu_childs").html()!=undefined){
      $(this).find(".menu_childs").show();
    }else{
      $(".menu_childs").hide();
    }
    
  })

  //搜索
  /*$(".cangp_mains").on("click",".toSearch",function(){
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
  }*/
   
  //change language
   /*$("#js_en").click(function(){
      window.location.href="index.html?lang=en"
   })
   $("#js_cn").click(function(){
      window.location.href="index.html"
   })*/



}
var change_currency=function(currency){
	//1人民币;2美元
	if(currency=="1"){
		return "￥"
	}else{
		return "$"
	}

}
var changeLanguage=function(obj){
	  var language=commonCla.analyzParams("lang");
	  if(language=="en"){
	  	var html=$(obj).html()
		.replace(new RegExp("首页","g"),"Home")
		.replace(new RegExp("精品拍卖","g"),"Auction")
		.replace(new RegExp("专家鉴宝","g"),"Experts&live")
		.replace(new RegExp("藏品社区","g"),"community")
		.replace(new RegExp("关于我们","g"),"About us")
		.replace(new RegExp("送拍机构","g"),"Seller")
		.replace(new RegExp("查看","g"),"View")
		.replace(new RegExp("所有大师","g"),"all experts")
		.replace(new RegExp("藏友热帖","g"),"Net top posts")
		.replace(new RegExp("还没有鉴定师发表过评价","g"),"No one has ever written a comment")
		.replace(new RegExp("开始时间","g"),"start time")
		.replace(new RegExp("收藏资讯","g"),"Collect the news")
		.replace(new RegExp("专题活动","g"),"News Topics&activity")
		.replace(new RegExp("专家鉴宝","g"),"Experts treasure")
		.replace(new RegExp("拍卖流程","g"),"The auction process")
		.replace(new RegExp("缴纳保证金","g"),"Pay margin")
		.replace(new RegExp("出价拍卖","g"),"bidding")
		.replace(new RegExp("竞拍成功","g"),"successful bidder")
		.replace(new RegExp("更多","g"),"More")
		.replace(new RegExp("正在拍卖中","g"),"on View")
		.replace(new RegExp("拍卖中","g"),"on View")
		.replace(new RegExp("预展中","g"),"Upcoming")
		.replace(new RegExp("Upcoming","g"),"Upcoming")
		.replace(new RegExp("Results","g"),"Results")
		.replace(new RegExp("已流拍","g"),"unsold")
		.replace(new RegExp("加载","g"),"load ")
		.replace(new RegExp("加载更多","g"),"load more")
		.replace(new RegExp("全部拍品","g"),"All")
		.replace(new RegExp("全部","g"),"All")
		.replace(new RegExp("直播中","g"),"Living")
		.replace(new RegExp("年","g"),"-")
		.replace(new RegExp("月","g"),"-")
		.replace(new RegExp("日","g")," ")
		.replace(new RegExp("件","g"),"")
		.replace(new RegExp("热门藏品","g"),"popular collection")
		.replace(new RegExp("热门跟帖","g"),"Hot POSTS")
		.replace(new RegExp("参与拍卖","g"),"bidding")
		.replace(new RegExp("业务介绍","g"),"Business introduction")
		.replace(new RegExp("特色功能","g"),"Characteristic function")
		.replace(new RegExp("联系我们","g"),"contact us")
		.replace(new RegExp("观看","g"),"")
		.replace(new RegExp("次","g"),"")
		.replace(new RegExp("鉴宝直播","g"),"Treasure live")
		.replace(new RegExp("鉴定专家","g"),"Experts")
		.replace(new RegExp("Highlight replays","g"),"Replay")
		.replace(new RegExp("万","g"),"W")
		.replace(new RegExp("参与竞拍","g"),"bidding")
		$(obj).html(html)
	  }
}
$(function(){
	initCommonPage();
	/*var language=commonCla.analyzParams("lang")
	if(language=="en"){
		for(var i=0;i<$(".cangp_tit_left").length;i++){
		  changeLanguage($(".cangp_tit_left")[i]);
		  var this_left=$(".cangp_tit_left")[i]
		  $(this_left).find(".title_left").html("<span>"+$(this_left).find(".fb").html()+"</span>")
		}
		for(var i=0;i<$(".cangp_tit_cen").length;i++){
		  changeLanguage($(".cangp_tit_cen")[i])
		  var this_cen=$(".cangp_tit_cen")[i]
		  $(this_cen).find(".title_left").html("<span>"+$(this_cen).find(".fb").html()+"</span>")
		  
		}
		
	}*/
	
})

