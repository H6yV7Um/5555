var host=commonCla.hostBase;
var page = commonCla.analyzParams("page");
var curInx = commonCla.analyzParams("curInx");
var id = commonCla.analyzParams("id");
var isWeiXin = function() {
    var share = $("#share").val();
    if(share == "share") {
        return true;
    }else {
        return false;
    }
}
var nextStepFun=function(data,bridge){
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
    if(data.nextStep=="share"){
        shareActivity();
    }
}

var initDetailDom=function(ret,request){
	var good = ret.collections[curInx];
	var des = good.description.replace("简介：", "");
	var playHtml='<div class="player"></div><div class="shadow"></div><div class="pre_times" >'+ ret.begin_time_old+'开始</div><div class="m-title">'+good.name+'</div>'+
			    '<div class="player_status" ></div>'
    $(".player_main").html(playHtml);
	$(".size").html(good.size);
	$(".des").html(des);
	$(".player-banner").attr("src", good.cover_big+"!750x563");
	$(".time").html(ret.begin_time);
	$(".session").html(ret.name);
	$(".company").html(ret.description);
	$(".place").html(ret.place);
	if(isWeiXin()) {
        $("title").html(good.name);
    }else {
        $("title").html(good.name+"&0&1");
    }

	$("#share_info").attr("content","⎾藏拍⏌专注于收藏品拍卖的交易平台！");
	$("#share_info").attr("cover",good.cover+"!250x250");
	$("#share_info").attr("title","[藏拍资讯]"+good.name);
	// $("#share_info").attr("shareUrl","http://s.cangpai.lookmetv.com/actions-new/goodDetailShare.html?id="+id);
	$("#share_info").attr("shareUrl","http://s.cangpai.lookmetv.com/auctionsOther/goodDetailShare.html?page="+ page +"&curInx="+ curInx +"&id="+ id );
	
}
var getDetailData=function(){
	var url="https://cangpai-collection.b0.upaiyun.com/Collection/auction/other/"+id+"/"+page+".json";
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){
		$(".init-loadding").hide();
		$(".c-detail").show();
		if(textStatus=="success"){
		 initDetailDom(ret,request);
		    //二次分享
	      if(isWeiXin()){
	        wx_share($("#share_info").attr("title"),
            $("#share_info").attr("content"),
            $("#share_info").attr("shareurl"),
            $("#share_info").attr("cover"));
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


var initPage=function(){
	getDetailData();
}
$(function(){
	initPage();
})