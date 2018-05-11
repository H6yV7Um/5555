var host=commonCla.hostBase;
var login_token="";
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
var token=get_token();

var getAuctionData=function(){
	var id=commonCla.analyzParams("id");
	var url=host+"/auction/"+id+"?token="+token;
	//API
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$("#js-vl-main").show();
		if(textStatus=="success"){
            if(ret.is_check=="2"){
                $(".c-main").html('<div class="noData"><img src="assets/images/weigui.png"/><p>拍卖会因违规已被关闭，请查看其他的拍卖会</p></div>');
            }else{
                initAuction(ret,request);
            }
             /*
            *跳转
            */
            if($(".btn_point").css("display")!="none"){
                var myElement = document.getElementById("btn_point");
                var hammertime = new Hammer(myElement);
                hammertime.on('pan', function(ev) {
            		if($("#btn_point").attr("a_type")==4){
            		  window.location.href="../live2.0/share.html?type=1&id="+commonCla.analyzParams("id");
            		}else{
            		  window.location.href="../live/share.html?type=1&id="+commonCla.analyzParams("id");
            		}
            	});
            }
           //二次分享
          if(isWeiXin()){
            wx_share("[藏拍拍卖]"+ret.name,
              "[藏拍]专注于收藏品拍卖的交易平台",
              "http://s.cangpai.lookmetv.com/auctions/auction.html?id="+commonCla.analyzParams("id"),
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
    var name="";
    if(str!=null && str!=undefined){
        name=str.substr(0,1);
        for (var i = 0; i < str.length-1; i++) {
            name+='*'
        };
    }
    return name;
}
var initAuction=function(ret,request){
	//拍卖会类型；1:单品；2专场；3:线下拍卖会  4:7日拍；5:抓取拍卖会
	var type=ret.type;
	//是否是手机直播；0否；1ios；2android；
	var is_mobile=ret.is_mobile;
	//提醒状态:0:未提醒；1：已提醒；
	var follow_status=ret.follow_status;
	//关注状态:0:无关系; 1:已关注; 2:是当前用户粉丝; 3:已相互关注;
	var follow_status=ret.user.follow_status;

    $("#btn_point").attr("a_type",type);
	var aStatus=ret.status;
	if(aStatus==-1 || aStatus==3){
	 $(".btn_ring").show();
	}

    if(type==1){
        var cid=ret.collections[0].id;
        window.location.href="goodDetail.html?auctionId="+commonCla.analyzParams("id")+"&id="+cid;
    }
	var playHtml='<div class="player"></div><div class="deposit">本场保证金'+change_currency(ret.currency)+ret.deposit_buyer+'</div><div class="shadow"></div><div class="pre_times" ></div><div class="m-title">'+ret.name+'</div>'+
			    '<div class="player_status" ></div>'
     $(".c-main .player_main").html(playHtml);
     $(".player-banner").attr("src",ret.cover+"!750x563");
     $(".m-desc").html(ret.description==null?"":ret.description);
     $("title").html(ret.name);
     var user=ret.user;
     var rolesHtml=initUserRole(user);
     var userHtml='<img class="user_head vm" src="'+user.head_pic+'"/>'+
	    			'<span class="user_name vm" uid="'+user.id+'">'+user.name+'</span>'+rolesHtml
     $(".m-user .users").html(userHtml);

     var collections=ret.collections;
     var c_listHtml="";
     for (var i = 0; i < collections.length; i++) {
     	//0:未拍卖;1:正在拍卖;2:已卖出;3:流拍;
     	var doneHtml="";var doneIcon='';
     	var c_status=collections[i].status;
        var collects_inx='<span class="abs_inx">'+(i+1)+'</span>'
     	if(c_status=="0"){
            
     	     doneHtml='<div class="status status_succ">'+
    					'<p>起拍价：<span class="col_red price">'+change_currency(ret.currency)+collections[i].start_price+'</span></p>'+
    				 '</div>';
    		  dongIcon='';	
     	}else if(c_status=="1"){
    		doneHtml='<p class="status status2 col_red">拍卖中</p>'
    		dongIcon='';
    	}else if(c_status=="2"){
    		 doneHtml='<div class="status status_succ">'+
    					'<p>成交价：<span class="col_red price">'+change_currency(ret.currency)+collections[i].amount+'</span></p>'+
    					'<p>中标人：<span class="winner">'+changeName(collections[i].buyer)+'</span></p>'+
    				 '</div>'
    		 dongIcon='<img src="assets/images/icon-done.png" class="icon_mark">'
    	}else if(c_status=="3"){
    		doneHtml='<p class="status status2 col_grey">拍卖已结束</p>';
    		dongIcon='<img src="assets/images/liupai.png" class="icon_mark">'
    	}
     	c_listHtml+='<li><a href="goodDetail.html?id='+collections[i].id+'&auctionId='+commonCla.analyzParams("id")+'">'+
    			'<div class="list_cover">'+
    				'<img src="'+collections[i].cover+'!300x225" class="img_cover"/>'+dongIcon+collects_inx+
    			'</div> '+
    			'<p class="list_title">'+collections[i].name+'</p>'+
    			'<div class="list_desc">'+doneHtml+'</div></a>'+
    		'</li>'
     	
     };
     $(".m-related .lists").html(c_listHtml);

     //直播状态：-1未开始，0结束，1进行，2回放，3预热
    var liveStatus=ret.status;
    var pre_times="";
    if(liveStatus==-1 || liveStatus==3){
        $(".pre_times").html(ret.begin_time+'开始');
        $(".btn_ring").show();
        $(".btn_enter").html("直播未开始");
    }else if(liveStatus==1){
       $(".pre_times").html('直播中');
       $(".pre_times").css("color","#EB1010");
       
       $(".btn_enter").html("进入拍卖场>");
      // $(".btn_point").show();
    }else{
        $(".m-title").css("bottom","25px");
        $(".btn_enter").css("color","#666");
        $(".btn_enter").html("拍卖已结束");
       // $(".btn_point").show();
    }
}
var initPage=function(){
	getAuctionData();
	$(".btn_enter_main").click(function(){
        if($(this).find(".btn_enter").html().indexOf("进入")!=-1){
	  if($("#btn_point").attr("a_type")==4){
	    window.location.href="../live2.0/share.html?type=1&id="+commonCla.analyzParams("id");
	  }else{
	     window.location.href="../live/share.html?type=1&id="+commonCla.analyzParams("id");
	  }
            
        }
		
	})
    
}
$(function(){
	initPage();
})