var host=commonCla.hostBase;
var login_token="";
var page = 0;
var id = commonCla.analyzParams("id");
var flag = true; //是否加载更多

var get_token=function(){
   var token=commonCla.analyzParams("token");
    if(token=="" || token==undefined){
      token=login_token;
    }
    return token;
} 
var token=get_token();
var isWeiXin = function() {
    var share = $("#share").val();
    if(share == "share") {
        return true;
    }else {
        return false;
    }
}
/*
内嵌页
*/

var nextStepFun=function(data,bridge){
  
    if (data.nextStep == '1') {
        //登录状态保存
        if (token == "" || token!=data.token) {
            token_login = data.token;
            token = data.token;
        }
        //初始化页面
        window.location.href="auction.html?id="+commonCla.analyzParams("id")+"&token="+data.token
        // location.replace("auction.html?id="+commonCla.analyzParams("id")+"&token="+data.token)   
    }
    if(data.nextStep=="share"){
        shareActivity();
    }
    //活动分享
    function shareActivity() {
        var title=$("#share_info").attr("title");
        var cover=$("#share_info").attr("cover");
        var share_url=$("#share_info").attr("shareurl");
        var content=$("#share_info").attr("content");

        setBridgeCallHandler(bridge, {
            'action': '3',
            'share': {
                'share_url': share_url,
                'title': title,
                'content': content,
                'cover': cover
            }
        })
    }
}

var clientFun=function(bridge){
   $(".btn_follow").on("click", function(e){
        var token = get_token();
        if(get_token()=="" || get_token()==undefined){
            e.preventDefault();
            setBridgeCallHandler(bridge, {
               'action': '1',
               'nextStep':'1'
            })
        }else{
            //开拍提醒
            toFollow(token);
        }
   })
}
//页面初始化的时候获取当前提醒状态
var isFollow = function(beginTime) {
    var id=commonCla.analyzParams("id");
    var token = get_token();
    var url=host+"/auction/"+id+"?token="+token;
    commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
        //判断接口是否获取成功，成功显示开拍提醒按钮
        if(textStatus == "success") {
            $(".btn_follow").show()
            $(".btn_ring").show()

            $(".btn_follow").attr("is-follow", ret.follow_status);
            if(ret.follow_status == 0) {
                $(".btn_follow img").attr("src", "assets/images/btn-ring.png");
            }else {
                $(".btn_follow img").attr("src", "assets/images/btn-ring-dis.png");
            }
        }
    })
}
//开拍提醒
var toFollow = function(token) {
    var id=commonCla.analyzParams("id");
    var url = host+"/auction/"+ id +"/follow?token="+token;
    var follow = $(".btn_follow").attr("is-follow");
    var params = {
        // "token": token
    }
    commonCla.ajaxCommonFun(url,"post",function(ret,textStatus,request){
        if(textStatus=="success") {
            if(follow == 0) {
                $(".btn_follow img").attr("src", "assets/images/btn-ring-dis.png");
                swal({
                    "title":"预约提醒成功",
                    "animation":"slide-from-top",
                    "confirmButtonText":"确定",
                    "confirmButtonColor": "#ff1d3e",
                });
                $(".btn_follow").attr("is-follow", "1");   
            } else {
                $(".btn_follow img").attr("src", "assets/images/btn-ring.png");
                swal({
                    "title":"已取消",
                    "animation":"slide-from-top",
                    "confirmButtonText":"确定",
                    "confirmButtonColor": "#ff1d3e",
                });
                $(".btn_follow").attr("is-follow", "0");
            }
        }else {
            swal({
                "title":JSON.parse(ret.responseText).error,
                "animation":"slide-from-top",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
            });
        }
    }, params)
}

var getAuctionData=function(){
    page++;
	var id=commonCla.analyzParams("id");
    var url="https://cangpai-collection.b0.upaiyun.com/Collection/auction/other/"+id+"/"+ page +".json?token="+token;
	//API
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$("#js-vl-main").show();
		if(textStatus=="success"){
            initAuction(ret,request);

           //二次分享
          if(isWeiXin()){
            wx_share($("#share_info").attr("title"),
            $("#share_info").attr("content"),
            $("#share_info").attr("shareurl"),
            $("#share_info").attr("cover"));
          }
		}else{
			if(ret.status==404){
				// $("body").html("<img src='../assets/images/404.png'  width='100%' height='100%' />")
                $("#load_more").html("暂无更多数据")
                flag = false;
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

var initAuction=function(ret,request){
    /*$(".btn_follow").show();
	$(".btn_ring").show();*/

	var playHtml='<div class="player"></div><div class="shadow"></div><div class="pre_times" >'+ ret.begin_time_old+'开始</div><div class="m-title">'+ret.name+'</div>'+
			    '<div class="player_status" ></div>'
    $(".c-main .player_main").html(playHtml);
    //保存第一页的第一张图片为banner图片
    if(page == 1) {
        bannerCover = ret.collections[0].cover_big;
    }
    $(".player-banner").attr("src", bannerCover+"!750x563");
    $(".m-desc").html("拍卖地点："+ret.place);
    if(isWeiXin()) {
        $("title").html(ret.name);
    }else {
        $("title").html(ret.name+"&1&1");
    }
    var user=ret.user;
    var rolesHtml="";


    var userHtml='<span class="user_name vm" uid="'+ret.id+'">'+ret.description+'</span>';
    $(".m-user .users").html(userHtml);

    //加载更多
    if(ret.collection_count>10){
        $("#load_more").show();
    }
    var collections=ret.collections;
    var c_listHtml="";

    for (var i = 0; i < collections.length; i++) {
        var address = "";
        if(isWeiXin()) {
            address = "goodDetailShare"
        }else {
            address = "goodDetail"
        }
        c_listHtml+='<li><a href="'+ address +'.html?page='+page+'&curInx='+($(".lists li").length+i)%10+'&id='+id+'">'+
        '<div class="list_cover">'+
        '<img src="'+collections[i].cover_big+'!750x563" class="img_cover"/></div> '+
        '<p class="list_title">'+collections[i].name+'</p></li>'
    };

    $(".m-related .lists").append(c_listHtml);
    //分享信息
    $("#share_info").attr("content","⎾藏拍⏌专注于收藏品拍卖的交易平台！");
    $("#share_info").attr("cover",bannerCover+"!250x250");
    $("#share_info").attr("title","[藏拍资讯]"+ret.name);
    $("#share_info").attr("shareUrl","http://s.cangpai.lookmetv.com/auctionsOther/share.html?id="+id);
    // $("#share_info").attr("shareUrl","http://testshare.startvshow.com/collectionAuction/auctionsOther/share.html?id="+id);

    isFollow();
}

var initPage=function(){
	getAuctionData();
    
    //加载更多
    $("#load_more").click(function() {
        // 当flag为真的时候才加载数据
        if(flag) {
            getAuctionData();
        }
    });
    
}
$(function(){
	initPage();
    /*$(".btn_follow").on("click", function(){
        //开拍提醒
        toFollow(token);
        
    })*/
})