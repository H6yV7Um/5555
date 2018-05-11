var host=commonCla.hostBase;
var login_token="";
var web_collections="";var web_currency=""
/*
*通用参数
*type 拍卖直播--0/普通直播--1
*token  
*/
var get_token=function(){
   var token=commonCla.analyzParams("token");
    if(token=="" || token==undefined){
      token=login_token;
    }
    return token;
} 
var link_type=commonCla.analyzParams("type")==""?"0":commonCla.analyzParams("type");
var token=get_token();
var live_share=function(ret){
	var title="";var content="";var shareurl="";var cover="";
	if(isWeiXin()){
	  if(link_type==1){
	  	//拍卖会直播
	  	title="[藏拍拍卖]"+ret.name;
	  	content="[藏拍]专注于收藏品拍卖的交易平台！";
	  	shareurl="http://s.cangpai.lookmetv.com/live/share.html?type=1&id="+commonCla.analyzParams("id")


	  }else{
	  	title="[藏拍专家]"+ret.user.name+"的鉴宝直播";
	  	content=ret.name;
	  	shareurl="http://s.cangpai.lookmetv.com/live/share.html?id="+commonCla.analyzParams("id")
	  }
	  cover=ret.cover
      wx_share(title,content,shareurl,cover);
     }
}

/*
*点赞
*/
var toZan=function(){
	var url=host+"/treasureLive/"+commonCla.analyzParams("id")+"/like?token="+get_token();
	var params={
		/*count:$(".btn_zan").attr("zanNum")*/
	}
   commonCla.ajaxCommonFun(url, "post", function(resultData,textStatus,request){
       if(textStatus=="success"){
			$(".btn_zan").css("background-image","url(../assets/images/icon/icon-zan-red.png)");
			/*$("#like_num").html(Number(Number($("#like_num").html())+1));*/
			$(".btn_zan").attr("zanNum",Number($(".btn_zan").attr("zanNum"))+1);
			$(".btn_zan").html(commonCla.cWan($(".btn_zan").attr("zanNum")))
        /*if(unlike==0){
          $("#like_num").prev("img").attr("src","../assets/images/icon/icon-zan-red.png");
          $("#like_num").html(Number(Number($("#like_num").html())+1));
          $("#share_info").attr("is_like","1");

        }else{
          $("#like_num").prev("img").attr("src","../assets/images/icon/btn_zan_dis_cross.png");
          $("#like_num").html(Number(Number($("#like_num").html())-1));
           $("#share_info").attr("is_like","0");

        }*/
        
       }else{
        $("#like_num").prev("img").attr("src",base_src);
        swal({
          "title":JSON.parse(resultData.responseText).error,
          "animation":"slide-from-top",
          "confirmButtonText":"确定",
          "confirmButtonColor": "#ff1d3e",

        });
       }
    },params)

	//btn_zan
}
/*
*计算涨幅
*/
var counterTime=function(current_time,begin_time){
	//执行
	var bTime=current_time.replace(/-/g,"/");
    var eTime=begin_time.replace(/-/g,"/")
    var times=commonCla.initJcountdown(bTime,eTime,1000);
    var h=Number(Number(times.d*24)+times.h);
    h=h<10?"0"+h:h;
    var m=times.m;
    m=m<10?"0"+m:m;
    var s=times.s;
    s=s<10?"0"+s:s;
    /*"d":d,"h":h,"m":m,"s":s*/
    var str="<span>"+h+"</span>:<span>" +m+"</span>:<span>"+s+"</span>"
    return str;
}

/*
*直播
*/
var getLiveData=function(){
	var id=commonCla.analyzParams("id");
	if(link_type==0){
        var url=host+"/treasureLive/"+id+"?token="+token;
        $("#js-vl-main").addClass("ordi_player");
	}else{
		$("#js-vl-main").removeClass("ordi_player");
		var url=host+"/auction/"+id+"?token="+token;
	}

	//API
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$("#js-vl-main").show();
		if(textStatus=="success"){
		 initLive(ret,request);
		 //二次分享
         live_share(ret);
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
var initLive=function(ret,request){
	//横竖屏:0横屏；1竖屏
	var is_erect=ret.is_erect;
	//直播状态：-1未开始，0结束，1进行，2回放，3预热
	var status=ret.status;
	//拍卖会类型；1:单品；2专场；3:线下拍卖会
	var type=ret.type;
	//是否是手机直播；0否；1ios；2android；
	var is_mobile=ret.is_mobile;
	//提醒状态:0:未提醒；1：已提醒；
	var follow_status=ret.follow_status;
	//关注状态:0:无关系; 1:已关注; 2:是当前用户粉丝; 3:已相互关注;
	var follow_status=ret.user.follow_status;

	web_collections=ret.collections;
	web_currency=ret.currency

	if(is_erect==0){
		$("#js-vl-main").removeClass("player_ver");
		$("#js-vl-main").addClass("player_cross");
		$(".users_ver").hide();
		//普通拍卖直播非直播中状态
		if(status!=1 && link_type==0){
			$("#js_tab").hide();
			$(".msg_cons").hide();
			$(".recommend").show();

		}
	}else{
		$("#js-vl-main").removeClass("player_cross");
		$("#js-vl-main").addClass("player_ver");
	}
	$(".js_users_name").html(ret.user.name);

	var lat_mark="";
	if(ret.user.head_pic.indexOf("collection-auction")!=-1){
		lat_mark="!250x250";
	}
	$(".js_users_head").attr("src",ret.user.head_pic+lat_mark);
	$(".follow_num").html(ret.user.follow_num);
	$("title").html(ret.name);
	$(".watch_num").html(commonCla.cWan(ret.watch_num));
	$("#user-icon-fans").html(commonCla.cWan(ret.watch_num));
    $(".btn_zan").attr("zanNum",ret.like_num);
    if(is_erect!=1){
    	 $(".btn_zan").html(ret.like_num)
    }
	if(ret.like_num!=undefined){
		$(".like_num").html(commonCla.cWan(ret.like_num));
	}else{
		$(".ended_info p").eq(1).hide();
	}
	
	$(".icon_role").attr("src",initUserRole(ret.user,true))
   
	//根据状态操作
	if(status==0){
		//结束
		$(".player_ended").show();
	}else if(status==1){
		//weChat
		console.log(ret.im_id)
		//weChatFun(ret.im_id)
		getUsersig(ret.im_id);
		//直播中msgList show
		initPlayer("id_test_video",ret.pull_urls.pull_hls,ret.cover,is_erect);

	}else if(status==2){
		//回放
		$(".player_ended .icon_close").show();
		$(".player_ended .end_btns").show();
		$(".vl_users .btn_down").show();
		if(is_erect=="1"){
			$(".vl_footer").hide();
		}
		$(".msgList").hide();
		initReplayer("id_test_video",ret.replay_url,ret.cover,is_erect);
		/*var videoHtml='<video id="myVideo" controls preload="auto" '+
		'poster="'+ret.cover+'" width="100%" height="'+vheight+'" src='+ret.replay_url+'></video>'
		$("#id_test_video").html(videoHtml);*/

	}else{
		//预热 msgList show status -1 / 3
		/*倒计时*/
		//var current_time=timeFormat(new Date(request.getResponseHeader("Date")));
		//var current_time=ret.current_time!=undefined?ret.current_time:timeFormat(new Date(request.getResponseHeader("Date")));
		var time=ret.begin_time;
			var date=time.split(" ")[0].split("-");
			var times=time.split(" ")[1].split(":");
			var str_time=date[1]+"月"+date[2]+"日"+" "+times[0]+":"+times[1]
		var pretimes='<div class="pre_times2" style="">'+str_time+'开始</div>'
		var str='<div><p>'+ret.name+'</p><p></p></div>';
		$(".player").append(pretimes);
		$(".player_times").html(str);
		$(".player_times").show();
		$(".vl_tabs").css("margin","15px 0")
		$(".vl_tabs").css("border","none")
		 
	    /*赋值*/
		var prev_cons="<img src='"+ret.cover+"' width='100%' class='prev_bg'/>";
		$("#id_test_video").html(prev_cons);




	}

	//拍卖直播
	if(link_type!=0){
		$(".player_times").hide();
		var collections=ret.collections==null?"":ret.collections;
		var collectionPics="";
		var ind=0;var is_status=0;
		var auctionId=commonCla.analyzParams("id");
		for (var i = 0; i < collections.length; i++) {
			if (collections[i].status==1) {
				ind=i;
				is_status=1;
				collectionPics+='<a href="http://s.cangpai.lookmetv.com/auctions/goodDetail.html?id='+
				                 ret.collections[i].id+'&auctionId='+auctionId+'"><img src="'+ret.collections[i].cover+
								'!300x225" sPrice="'+change_currency(ret.currency)+ret.collections[i].start_price+
								'" style=""></a>'
				$(".sale_num").html(ret.collections[i].offers_count)

			}else{
				collectionPics+='<a href="http://s.cangpai.lookmetv.com/auctions/goodDetail.html?id='+
				                 ret.collections[i].id+'&auctionId='+auctionId+'"><img src="'+ret.collections[i].cover+
								'!300x225" sPrice="'+change_currency(ret.currency)+ret.collections[i].start_price+
								'" style="display:none"></a>'
			
			}
		};
		if(is_status!=1){
			ind=collections.length-1;
		}

		//非单品
		if(type!=1){
			$(".prod_nums").show();
			 var collectionNums='<div class="prod_nums">'+
							'<span class="cur_num">'+Number(Number(ind)+1)+'</span>/'+
							'<span class="all_num">'+ret.collections.length+'</span>'+
							'</div>'
			$(".prod_info .cur_num").html(Number(ind)+1);//当前拍品
	     	$(".prod_info .all_num").html(ret.collections.length);
	     	collectionPics+=collectionNums;
		}
		$(".prod_pics").html(collectionPics);
		//判断拍品是否全部拍完
		if(is_status!=1){
			$(".prod_pics").find("img").eq(ind).css("display","block");
			$(".sale_num").html(ret.collections[ind].offers_count);

		}
	      $(".prod_desc .js_initPrice").html(change_currency(ret.currency)+ret.collections[ind].start_price);
		//领先
		var offers=ret.collections[ind].offers[0];
		if(ret.collections[ind].offers.length<=0){
			$(".lead_man").hide();
		}else{
			$(".lead_man .man_header img").attr("src",offers.user.head_pic);
			$(".lead_man .man_info .man_name").html(offers.user.name);
			$(".lead_man .man_info .man_price").html(change_currency(ret.currency)+offers.price);
		}

	}
	//普通直播
	else{
		//推荐直播
		var re_lives=ret.treasureLives;
		var livesHtml="";
		if(re_lives.length>0){
			for (var i = 0; i < re_lives.length; i++) {
				var status=re_lives[i].status; var label_status="";
				if(status==1){
					label_status='<span class="label_status living">直播中</span>'
				}else if(status==2){
					label_status='<span class="label_status replay">回放</span>'
				}else{
					var time=re_lives[i].begin_time;
					var date=time.split(" ")[0].split("-");
					var times=time.split(" ")[1].split(":");
					var str_time=date[1]+"月"+date[2]+"日"+" "+times[0]+":"+times[1]

					label_status='<span class="label_status preview">'+str_time+'开始</span>'
				}
				livesHtml+='<li><a href="share.html?id='+re_lives[i].id+'">'+
							'<img class="recomm_cover" src="'+re_lives[i].cover+'">'+label_status+
							'<div class="recomm_prod_desc">'+
								'<div class="recomm_title">'+re_lives[i].name.substr(0,30)+'</div>'+
								'<div class="re_like_num "><img src="../assets/images/icon/btn_zan_dis_cross.png"/><span class="follow_num vm">'+commonCla.cWan(re_lives[i].like_num)+'</span></div>'+
								'<div class="re_watch_num"><img src="../assets/images/icon/icon-eye-like.png"/><span class="follow_num vm">'+commonCla.cWan(re_lives[i].watch_num)+'</span></div>'+
							'</div>'+
						'</li>'
			};
			$(".recomm_list").html(livesHtml);

		}
	

	}


}


//换拍品
var changeAuctionGoods=function(){
  $(".lead_man").css("display","none");
  $("#video_sms_list").html("")
  var curNum=Number($(".prod_nums .cur_num").html());

  $(".prod_pics img").hide();
  if($(".prod_pics img").eq(curNum)==undefined){
  	$(".prod_pics img").eq(curNum-1).show();
  }else{
	$(".prod_pics img").eq(curNum).show();
	$(".prod_nums .cur_num").html(curNum+1);
	$(".js_initPrice").html($(".prod_pics img").eq(curNum).attr("sPrice"));
	$(".sale_num").html("0");
  }
  if(web_collections[curNum].offers.length>0){
  	var offers=web_collections[curNum].offers[0];

  	$(".lead_man").css("display","inline-block");
  	$(".lead_man .man_header img").attr("src",offers.user.head_pic);
	$(".lead_man .man_info .man_name").html(offers.user.name);
	$(".lead_man .man_info .man_price").html(change_currency(web_currency)+offers.price);

	$(".sale_num").html("1");
  }
}

//初始化player
var initPlayer=function(id,hls,cover,is_erect){
	if(is_erect==1){
	  var v_height=$(window).width()/0.5625;
	}else{
	 var v_height=$(".player_main").height();
	}
	var player = new TcPlayer(id, {
	"m3u8": hls, //请替换成实际可用的播放地址
	"autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
	"live":true,
	"x5_type":"h5",
	"controls":"default",
	"coverpic" : {"style": "default", "src":"../assets/images/btn-play64.png"},
	"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
	"height" : v_height//视频的显示高度，请尽量使用视频分辨率高度
	});
}
var initReplayer=function(id,replay_url,cover,is_erect){
       if(is_erect==1){
	  var v_height= $(".vl_player_main").height()
	}else{
	 var v_height=$(".player_main").height();
	}
	var player = new TcPlayer(id, {
	"mp4": replay_url, //请替换成实际可用的播放地址
	"autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
	"live":true,
	"x5_type":"h5",
	"controls":"default",
	"coverpic" : {"style": "cover", "src":cover},
	"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
	"height" : v_height//视频的显示高度，请尽量使用视频分辨率高度
	});
}
var  initPage=function(){
	//初始化
	getLiveData();

	/*
	*--切换推荐和聊天
	*--普通直播
	*/

	$("#js_tab li").click(function(){
		var index=$(this).index();
		$("#js_tab li").removeClass("cur");
		$(this).addClass("cur");
		$(".js-tabCon").hide();
		$(".js-tabCon").eq(index).show();

	})
	/*
	*关闭结束层
	*/
	$("#js_icon_close").click(function(){
		$("#js_player_ended").hide();
	})
	/*
	*跳转
	*/
	if($(".btn_point").css("display")!="none"){
		var myElement = document.getElementById("btn_point");
		var hammertime = new Hammer(myElement);
		hammertime.on('pan', function(ev) {
			window.location.href="../auctions/auction.html?id="+commonCla.analyzParams("id");
		});
	}
	/*
    *点赞
	*/
	$(".btn_zan").click(function(){
		if(get_token()==""){
			//授权
			var params={
				"id":commonCla.analyzParams("id")
			}
			wx_authorize(params,"live")
		}else{
			toZan();
		}
	})
    
}


var getUsersig=function(avChatRoomId){
	var url=commonCla.webHostBase+"/web/qcloud/sig"
	commonCla.ajaxCommonFun(url,"get",function(ret){
		var uid=ret.user_id;
		var sig=ret.sig;
		weChatFun(uid,sig,avChatRoomId)
	})
}
/*
*聊天
*/

$(function(){
        initPage();
         $('img').error(function(){
            $(this).attr('src', "images/touxiang.png");
         });
	
})