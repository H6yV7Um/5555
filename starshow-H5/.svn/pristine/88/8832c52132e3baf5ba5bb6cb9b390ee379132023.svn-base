var host=commonCla.hostBase;
/** 
 * 计算n天后的日期 
 * initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd 
 * days:天数 
 * flag：返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式 
 */  
function getDateAfter_n(initDate, days, flag){  
      
    if(!days){  
        return initDate;  
    }  
    initDate = initDate.replace(/-/g,'');  
    //flag = $.trim(flag);  
    var date;  
    // 是否设置了起始日期  
    if(!$.trim(initDate)){ // 没有设置初始化日期，就默认为当前日期  
        date = new Date();    
    }else{  
        var year = initDate.substring(0,4);  
        var month = initDate.substring(4,6);  
        var day = initDate.substring(6,8);  
        date = new Date(year, month-1, day); // 月份是从0开始的  
    }  
    date.setDate(date.getDate() + days);  
  
    var yearStr = date.getFullYear();  
    var monthStr = ("0"+(date.getMonth()+1)).slice(-2, 8); // 拼接2位数月份  
    var dayStr = ("0"+date.getDate()).slice(-2, 8); // 拼接2位数日期  
    var hsm_timers=initDate.split(" ")[1]
    var result = "";  
    if(!flag){  
        result = yearStr+"年"+monthStr+"月"+dayStr+"日";  
    }else{  
        result = yearStr+flag+monthStr+flag+dayStr+" "+hsm_timers;  
    } 
    return result;  
}  
    
var amountIncrease=function(start_price){
	var price=0;
	if(start_price<100){
		price=10;
	}else if(start_price>=100 && start_price<500){
		price=20;
	}else if(start_price>=500 && start_price<1000){
		price=50;
	}else if(start_price>=1000 && start_price<5000){
		price=100;
	}else if(start_price>=5000 && start_price<10000){
		price=200;
	}else if(start_price>=10000 && start_price<50000){
		price=500;
	}else if(start_price>=50000 && start_price<100000){
		price=1000;
	}else if(start_price>=100000 && start_price<1000000){
		price=10000;
	}else{
		price=100000;
	}
	return price;

}
var initDetailDom=function(ret,request){
	//0:未拍卖；1：正在拍卖；2：已卖出；3：流拍；
	var status=ret.status;
	
	var good_desc="";var good_desc_point="";var img_status="";

	$("#btn_point").attr("a_type",ret.auctions[0].type);

	$(".c-detail .player-banner").attr('src',ret.cover);
	$("title").html(ret.name)
	var freight_html="";
        if(ret.take_type==1){
	freight_html='<li>运费：<span class="start_freight">'+change_currency(ret.currency)+ret.freight+'</span></li>'
	}
  var gz="";
  if(ret.estimate!="" && ret.estimate!=undefined){
  	gz='<li>估值：<span class="start_price">'+change_currency(ret.currency)+ret.estimate+'</span></li>'
  }
	var bail="";
	if(ret.auctions!=null && ret.auctions.length>0){
		 bail=ret.auctions[0].deposit_buyer;
	}
	if(status==0){
		$(".btn_ring").show();
		if(ret.auctions!=null && ret.auctions.length>0){
			var time=ret.auctions[0].begin_time;
			var date=time.split(" ")[0].split("-");
			var times=time.split(" ")[1].split(":");
			var str_time=date[1]+"月"+date[2]+"日"+" "+times[0]+":"+times[1]
			$(".pre_times2").html(str_time+"开始");
			$(".pre_times2").show();
		}
		//简介
		
		//countIncrease
		var increase_price=amountIncrease(ret.start_price);
	
		good_desc_point='<ul>'+
	    		'<li>起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'+
	    		'<li>保证金：<span class="start_bail">￥'+bail+'</span></li>'
		good_desc='<ul>'+
	    		'<!--<li>起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'+
	    		'<li>保证金：<span class="start_bail">￥'+bail+'</span></li>-->'+
	    		'<!--<li>保值价：<span class="start_bail">'+change_currency(ret.currency)+ret.insurance+'</span></li>-->'+
	    		'<li>保留价：<span class="start_retainage">'+(ret.retainage==0?"无":"有")+'</span></li>'+
	    		gz+freight_html+
	    	    '</ul>'
		
		$(".btn_enter").html("预交保证金");
		$(".btn_enter").addClass("js_btn_down");
		$(".btn_enter").removeClass("toLive");
	}else if(status==1 || status==3){
		var currentPrice=""
		if(status==1){
	    	currentPrice='<li class="w100">当前价：<span class="current_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'
	    }
		good_desc_point='<ul>'+currentPrice+
	    		'<li>起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'+
	    		'<li>保证金：<span class="start_bail">￥'+bail+'</span></li>'
		good_desc='<ul>'+
	    		'<!--<li>起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'+
	    		'<li>保证金：<span class="start_bail">￥'+bail+'</span></li>-->'+
	    		'<!--<li>保值价：<span class="start_bail">'+change_currency(ret.currency)+ret.insurance+'</span></li>-->'+
	    		'<li>保留价：<span class="start_retainage">'+(ret.retainage==0?"无":"有")+'</span></li>'+
	    		gz+freight_html+
	    	    '</ul>'

	    if(status==1){
	    	if(!$(".btn_enter").hasClass("toLive")){
	    		$(".btn_enter").removeClass("js_btn_down");
	    		$(".btn_enter").addClass("toLive");
	    		$(".btn_enter").html("进入拍卖场&gt;");
	    		$(".btn_enter").attr("status","1");
	    		//$(".btn_point").show();
	    	}
	    	$(".pre_times2").html("热拍中");
		$(".pre_times2").show();
		if(ret.auctions[0].type==4){
			$(".pre_times2").html('距结束<p id="countdown" style="display:inline"></p><div class="skew"></div>');
			$(".skew").attr("style","background: rgba(235,16,16,1);width: 50px;height:100%;position: absolute;right: -20px;top: 0;z-index: -1;transform: skew(45deg);")
			$(".pre_times2").css("color","#fff");
			$(".pre_times2").css("background","rgba(235,16,16,1);");
			$(".pre_times2").css("width","auto");
			$(".pre_times2").css("left","auto");
			$(".pre_times2").css("right","auto");
			$(".pre_times2").css("padding","0 10px");
			

			var footersHtml='<a href="../protocol/sevenDayHelp.html">'+
					    		'<img src="assets/images/icon-help.png" width="20" class="vm"/>'+
					    		'<span class="vm">每日拍拍卖规则</span></a>'
					    	
			$(".detail_footer .fl").html(footersHtml);
      	var bTime=timeFormat(new Date(request.getResponseHeader("Date")));
			//var eTime=getDateAfter_n(ret.auctions[0].begin_time,7,"-");
      var eTime=ret.auctions[0].end_time;
			var time=commonCla.initJcountdown(bTime,eTime,"6000");
			$("#countdown").html('<span>'+time.d+'</span>天<span>'+time.h+'</span>小时<span>'+time.m+'</span>分')
			var Go = window.setInterval(function () {
				commonCla.initJcountdown(bTime,eTime,"6000");
				$("#countdown").html('<span>'+time.d+'</span>天<span>'+time.h+'</span>小时<span>'+time.m+'</span>分')

			},60000)
	       }
		
			$(".pre_times2 span").attr("style","background:#fff; margin:0 2px;padding:0 4px; color:#eb1010");

	    }else if(status==3){
	    	good_desc_point='<ul>'+
	    		'<li class="w100_normal">起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>'
            good_desc='<ul>'+
	    		'<!--<li>起拍价：<span class="start_price">'+change_currency(ret.currency)+ret.start_price+'</span></li>-->'+    		
	    		'<li>保留价：<span class="start_retainage">'+(ret.retainage==0?"无":"有")+'</span></li>'+
	    	    '</ul>'
	    	$(".btn_enter").addClass("btn_download");
		    $(".btn_enter").addClass("disabled");
		    $(".btn_enter").removeClass("toLive");
		    $(".btn_enter").html("已流拍");
		    img_status='<img src="assets/images/liupai.png" class="icon_status"/>';


	    }

	}else{
		good_desc='<ul>'+
	    		'<li>成交价：<span class="start_price">'+change_currency(ret.currency)+ret.amount+'</span></li>'+
	    		'<!--<li>保值价：<span class="start_bail">'+change_currency(ret.currency)+commonCla.cWan(ret.insurance)+'</span></li>-->'+
	    		'<li>保留价：<span class="start_retainage">'+(ret.retainage==0?"无":"有")+'</span></li>'+
	    		'<li>中标人：<span class="start_rise">'+(ret.buyer==null?"不知名买家":changeName(ret.buyer))+'</span></li>'+
	    	    '</ul>'
	    $(".btn_enter").addClass("btn_download");
	    $(".btn_enter").addClass("disabled");
	    $(".btn_enter").removeClass("toLive");
	    $(".btn_enter").html("已结拍");
	    img_status='<img src="assets/images/icon-done.png" class="icon_status"/>';
	}
	
	good_desc+=img_status;
	//简介
	$(".goodsInfo_point").html(good_desc_point);
	if(good_desc_point==""){
		$(".goodsInfo_point").hide();
	}
	$(".goodsInfo").html(good_desc);
	//用户
	var user=ret.user;
	var rolesHtml=initUserRole(user);

	var userHtml='<img class="user_head vm" src="'+user.head_pic+'"/>'+
	    		 '<span class="user_name vm" uid="'+user.id+'">'+user.name+'</span>'+rolesHtml
	$(".c-detail .m-user .users").html(userHtml);
	//鉴宝专家
	var appraisals=ret.appraisals;
	var expertList=""
	if(appraisals.length>0){
		for (var i = 0; i < appraisals.length; i++) {
			expertList+='<li><img class="user_head vm" src="'+reviewHeader(appraisals[i].user.head_pic)+'"/></li>'
		};
		$(".expertList .list").html("<a href='expertsMsg.html?cid="+commonCla.analyzParams("id")+"'>"+expertList+"</a>");
		$(".expert_num").html("<a href='expertsMsg.html?cid="+commonCla.analyzParams("id")+"'><span class='vm col_red'>"+ret.appraisals_count+"名</span><img class='vm' src='../assets/images/icon/icon-right.png ' width='15px'/></a>");
	}else{
		$(".expertList .fr").hide();
		$(".expertList .fl span").addClass("col_grey");
		$(".expertList .fl span").html("<a href='expertsMsg.html?cid="+commonCla.analyzParams("id")+"'>还没有专家进行鉴定，快来写第一条吧</a>")
	}
	//拍卖参数
	/*var auctionParams=ret.attributes.content;
	var strParams=""
	for(var key in auctionParams){
       strParams+='<p>'+key+':'+auctionParams[key]+'</p>'
	}
	if(strParams==""){
		$("#auction_params").prev("h1").hide();
	}
	$("#auction_params").html(strParams);*/
	//拍卖介绍
	$("#auction_con").html(ret.detail.description);
	//photos
    var videoH=$(window).width()/4*3;
	var photos=ret.detail.photos;
	if(photos.length==1){
		if(photos[0].type==1){
			var videos='<video id="myVideo" controls  poster="'+photos[0].picture_url+
						  '" width="100%" height="'+videoH+'px" src="'+photos[0].video_url+'">'+
					      '</video>'+
					      '<img src="'+photos[0].picture_url+'" width="100%"  class="video_pic"/>'
		     $(".swiper-container").html(videos)

		}else{
			$(".swiper-container").html('<img src="'+photos[0].picture_url+'!750x563" width="100%" />')
		}
		
	}else{
		var swiperCons="";
		for (var i = 0; i < photos.length; i++) {
			var swiperCon="";
			if(photos[i].type==1){
				//video
				swiperCon='<video id="myVideo" webkit-playsinline="true" controls preload="auto" poster="'+photos[i].picture_url+
						  '!750x563" width="100%" height="'+videoH+'px" src="'+photos[i].video_url+'">'+
					      '</video>'
			}else{
				//pic
				swiperCon='<img src="'+photos[i].picture_url+'!750x563" width="100%" />'

			}
			swiperCons+='<div class="swiper-slide">'+swiperCon+'</div>'
			
		};
		$("#swiper-wrapper").html(swiperCons);
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination',
			observer: true,//修改swiper自己或子元素时，自动初始化swiper
	        observeParents: true//修改swiper的父元素时，自动初始化swiper
		})
	}
	
	
}
var getDetailData=function(){
	var url=host+"/collection/"+commonCla.analyzParams("id")+"/web";
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$(".c-detail").show();
		if(textStatus=="success"){
			if(ret.auctions[0].is_check=="2"){
			    $(".c-main").html('<div class="noData"><img src="assets/images/weigui.png"/><p>该拍品因为违规被下架</p></div>');
			}else{
			     initDetailDom(ret,request);
			}
		 	//
		 	getPriceData();
			 /*
		    *跳转
		    */
		    if($(".btn_point").css("display")!="none"){
		        var myElement = document.getElementById("btn_point");
		        var hammertime = new Hammer(myElement);
		        hammertime.on('pan', function(ev) {
		        	if($("#btn_point").attr("a_type")==4){
					    window.location.href="../live2.0/share.html?type=1&id="+commonCla.analyzParams("auctionId");
					 }else{
					     window.location.href="../live/share.html?type=1&id="+commonCla.analyzParams("auctionId");
					 }
		        });
		    }
		    //二次分享
	      if(isWeiXin()){
	        wx_share("[藏拍拍卖]"+ret.name,
	          "[藏拍]专注于收藏品拍卖的交易平台",
	          "http://s.cangpai.lookmetv.com/auctions/goodDetail.html?id="+commonCla.analyzParams("id")+"&auctionId="+commonCla.analyzParams("auctionId"),
	          ret.cover);
	      }
		}else{
			if(ret.status==404){
				$("body").html("<img src='../assets/images/404.png'  width='100%' height='100%' />")
			}else{
				swal({
	              "title":"出错了，稍后刷新重试",
	              "animation":"slide-from-top",
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",

	            });
			}
		}
		

	})
}
var changeName=function(str){
	var name=str.substr(0,1);
	for (var i = 0; i < str.length-1; i++) {
		name+='*'
	};
	return name;
}
var initPriceDom=function(ret,request){
	if(ret.total>15){
		$("#price_more").show();
	}
	var html='';
	var priceNum=ret.total;
	if($("#priceList li").length+15>=ret.total){
		$("#price_more").html("暂无更多数据")
	}
	if(ret.page_data.length<=0 && $("#priceList li").length<=0){
		html='<div class="tc noprice">没有出价记录</span>'
	}else{
		
		for (var i = 0; i < ret.page_data.length; i++) {
			if(i==0 && $("#priceList li").length<=0){
				var icon_mark="中标";
				if($(".btn_enter").attr("status")=="1" || $(".btn_enter").html()=="已流拍"){icon_mark="领先";}
				
				html+='<li><span class="icon_lead">'+icon_mark+'</span><span>'+changeName(ret.page_data[i].user.name)+
				'</span>出价'+change_currency(ret.currency)+'<span class="price">'+ret.page_data[i].price+'</span></li>'
			}else{
				html+='<li><span class="icon_lead">出局</span><span>'+changeName(ret.page_data[i].user.name)+
				'</span>出价'+change_currency(ret.currency)+'<span class="price">'+ret.page_data[i].price+'</span></li>'
			}
		}
		
	}
	$(".price_num").html(priceNum)

	$("#priceList").append(html);
	$(".current_price").html(change_currency(ret.page_data[0].currency)+ret.page_data[0].price);
}
var getPriceData=function(){
	var current_count=$("#priceList li").length;

	var id=commonCla.analyzParams("id");
	var auctionId=commonCla.analyzParams("auctionId");
	var url=host+"/collection/"+id+"/offers?current_count="+current_count+"&auction_id="+auctionId;
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		if(textStatus=="success"){
		 initPriceDom(ret,request);
		}else{
			
		}

	})

}

var initPage=function(){
	getDetailData();
	$(".detail_footer").on("click",".toLive",function(){
		if($("#btn_point").attr("a_type")==4){
			window.location.href="../live2.0/share.html?type=1&id="+commonCla.analyzParams("auctionId");
		}else{
			window.location.href="../live/share.html?type=1&id="+commonCla.analyzParams("auctionId");
		}
	})
	$("#priceList").html("");

    //获取更多出价记录
	$("#price_more").click(function(){
		getPriceData();
	})
	

}

/*
*鉴定列表
*/
var appraials=function(){
	var current_count=$("#msgList li").length;
	var cid=commonCla.analyzParams("cid");
	var params={
		"token":commonCla.analyzParams("token"),
		"current_count":current_count,
	}
	var url=host+'/collection/'+cid+'/appraisals';
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$(".c-comments").show();
		if(textStatus=="success"){
		 if(current_count==0){
		 	initCollection(ret);
		 }
		 initAppraials(ret,request);
		}else{
			swal({
	              "title":"出错了，稍后刷新重试",
	              "animation":"slide-from-top",
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",

	            });
		}
		
	},params)

}
var initCollection=function(ret){
  var expertsNum=0;
  if(ret.page_data!=null && ret.page_data.length>0){
  	expertsNum=ret.total;
  }
  var collects= '<div class="fl"><img src="'+ret.collection.cover+'!300x225" /></div>'+
			  	'<div class="fr">'+
			  		'<h1>'+ret.collection.name+'</h1>'+
			  		'<p class="price">起拍价：'+change_currency(ret.currency)+ret.collection.start_price+'</p>'+
			  		'<div class="experts">共计<span class="col_red">'+expertsNum+'</span>位大师鉴定</div>'+
			  	'</div>'
  $("#collectionInfo").html(collects);
}
var initAppraials=function(ret,request){
  
  var msgs=ret.page_data;
  if($("#msgList li").length+15>=ret.total){
		$(".btn_msgMore").html("暂无更多数据");
	}
  var msgHtml="";
  //时间
  var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));

  for (var i = 0; i < msgs.length; i++) {
  	var rolesHtml=initUserRole(msgs[i].user);
  	var create_time=timesReview(msgs[i].created_at,currentTime);
  	 msgHtml+='<li>'+
  	              '<div><img src="'+reviewHeader(msgs[i].user.head_pic)+'" class="head_pic"/>'+
  	                  '<span class="expertName">'+msgs[i].user.name+'</span>'+rolesHtml+
  	                  '<span class="times">'+create_time+'</span>'+
  	               '</div>'+
  	               '<h1>'+msgs[i].title+'</h1><div class="msgCons">'+msgs[i].comments+'</div>'+
  	             '</li>'
  };
  $("#msgList").append(msgHtml)

}
var initMsgPage=function(){
	$("#msgList").html();
	appraials();
	$(".btn_msgMore").click(function(){
		appraials();
	})
}
$(function(){
	
	if($("#hide_status").attr("formtype")=="expertMsg"){
		initMsgPage();
	}else{
		initPage();
	}
})