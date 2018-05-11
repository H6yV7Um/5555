var initNewsDesc=function(title,content,id){
	$(".curNew_con h1").html(title);
	$(".curNew_con .new_desc").html(content);
	$(".js_btn_more").find("a").attr("href","newsDetail.html?menuTag=0-11&id="+id)
}
//初始化video
var initvideo=function(cover,src){
	$("#js_video_bg .video_cover").attr("src",cover);
	$(".myVideo").attr("src",src);
	$(".video_bg").show();
	$(".myVideo").hide();
	$(".myVideo")[0].pause();   
}
var initFwPage=function(ret){
	var lives=ret.data.lives;
	var shows=ret.data.shows;
	var videos=ret.data.videos;
	var news=ret.data.news;
	//初始化lives
	var lives_html=""
	var lives=lives[0];
	lives_html='<div id="player"></div>'
	/*for (var i = 0; i < lives.length; i++) {
		if(lives[i].status!=0){
			lives_html+='<div class="swiper-slide">'+
			        	'<a target="_blank" href="liveDetail.html?menuTag=2-&id='+lives[i].id+'"><div class="imgCon" inx="'+Number(i+1)+'" link_m3u8="'+lives[i].url+'"><img src="'+lives[i].cover+'" width=100% />'+
			        	'<img src="assets/images/fw/btn-play.png" class="btn_player" width="50px"></div>'+
			        	'<!--<div id="player'+Number(i+1)+'" style="width:100%; height:auto;"></div>-->'
			            '</a></div>'
		}
		
	};*/
	$("#js-livesList").html(lives_html);
	var player = new CloudLivePlayer();
     //activityId 请换成自己设置的获得id
      player.init({url:lives.url,pic:lives.cover,auto_play:0,auto_size:1,pu:"1655aeb1f1"},"player");

	var mySwiper = new Swiper ('.swiper-container-lives', {
	    preventClicks:false,
	    // 如果需要分页器
	    slidesPerView : 4,
		slidesPerGroup : 4,
	   /* pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',*/
	}) 
	//初始化品牌
	var brand_html=""
	for(var brand in shows){ 
	   var obj=shows[brand];
	   brandList=""
	   for (var i = 0; i < obj.length; i++) {
	   	  brandList+='<li bid="'+obj[i].id+'" brand_cover="'+obj[i].cover+'">'+obj[i].title+'</li>'
	   };
	   brand_html+='<li>'+'<h1>'+brand+'</h1><ol>'+brandList+'</ol></li>'
	};
	$(".scroller ul").html(brand_html);
	$(".scroller").mCustomScrollbar({
		scrollInertia:600,
		autoDraggerLength:false
	});
	//初始化videos
	var videos_html="";
	initvideo(videos[0].cover,videos[0].url);
	for (var i = 0; i < videos.length; i++){
		var cur=""
		if(i==0){
			cur="cur";
		}
		videos_html+='<li class="swiper-slide '+cur+'" v_url="'+videos[i].url+
		'" v_cover="'+videos[i].cover+'"><span class="span_num">'+(i+1)+'</span><div class="v_line"></div></li>'
		
	};
	$(".js_change_video").html(videos_html)
	var myTvSwiper = new Swiper('.swiper-container-videos',{
		direction: 'vertical',
		height:300,
		slidesPerView:4,
		spaceBetween: 10,
	})
	$('.btn_top').on('click', function(e){
		e.preventDefault()
		myTvSwiper.slidePrev();
	})
	$('.btn_bottom').on('click', function(e){
		e.preventDefault()
		myTvSwiper.slideNext()
	})

	//初始化news
	var news_html=""
	for (var i = 0; i < news.length; i++) {
		news_html+='<div class="swiper-slide">'+
			        	'<div class="imgCon"><img src="'+news[i].cover+'" /></div>'+
			        	'<input type="hidden" class="hide_info" nid="'+news[i].id+
			        	'" title="'+news[i].title+'" content="'+news[i].content+'"/>'+
			        '</div>'
	};
	$("#js-newsCoverList").html(news_html);
    initNewsDesc(news[0].title,news[0].content,news[0].id);
	var mySwiper = new Swiper ('.swiper-container-covers', {
	    preventClicks:false,
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    onTransitionEnd: function(swiper){
	    	var container=swiper.container;
	    	var title=$(".swiper-slide-active").find("input.hide_info").attr("title");
	    	var content=$(".swiper-slide-active").find("input.hide_info").attr("content");
	    	var nid=$(".swiper-slide-active").find("input.hide_info").attr("nid");
	    	initNewsDesc(title,content,nid);
	    }
	}) 

}
var getFwData=function(){
   /*var url=commonCla.hostBase+"/fashionWeek/mercedesBenz"*/
   var url="http://47.94.175.204:5000/fashionWeek/mercedesBenz"
   commonCla.ajaxCommonFun(url,"get",function(ret){
   	if(ret.code=="200"){
   		initFwPage(ret)
   	}
   })
}

var initLivePlayer=function(id,m3u8,cover,h){
	var player =  new TcPlayer(id, {
	"m3u8": m3u8,
	"autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
	"coverpic" : cover,
	"width" : "100%",//视频的显示宽度，请尽量使用视频分辨率宽度
	"height" : h//视频的显示高度，请尽量使用视频分辨率高度
	});
}


$(function() {
	initMenu();
	getFwData();
	$(".js_change_video").on("click","li",function(){
		var v_cover=$(this).attr("v_cover");
		var v_url=$(this).attr("v_url");
		initvideo(v_cover,v_url);
		$(".js_change_video li").removeClass("cur");
		$(this).addClass("cur");

	})
    $(".scroller").on("click","ol li",function(){
       var cover=$(this).attr("brand_cover");
       $(".fw_con3 .new_cover img").attr("src",cover);
       $(".fw_con3 .new_cover a").attr("href","newsDetail.html?menuTag=0-11&id="+$(this).attr("bid"));
       //$(".fw_con3 .new_cover img").addClass("animated fadeIn");
       //setTimeout(function(){$(".fw_con3 .new_cover img").removeClass("animated fadeIn");},800)
    })


	$(".video_bg").click(function(){
	  $(".video_bg").hide();
	  $(".myVideo").show();
	  $(".myVideo")[0].play();
	})
	$(".myVideo")[0].onended = function() {
		   $(".video_bg").show();
		   $(".myVideo").hide();   
	};

	//
     /*	var isMove=function(scroll_h){
		var length=$(".js_change_video li").length;
		var li_h=75
		var ul_h=length*75;
		alert(ul_h+"///"+(ul_h-scroll_h)+"///"+length)
		if(ul_h-scroll_h<75*3 || scroll_h==45){
			return true;
		}
		return false
	}
	$(".btn_top").click(function(){
		var top_length=(Number($(".js_change_video").css("margin-top").split("px")[0])-85-45);
		//alert(top_length)
		if(isMove($(".js_change_video").css("margin-top").split("px")[0])){
			$(".js_change_video").css("margin-top",top_length+"px");
		}
	 
	})
	$(".btn_bottom").click(function(){
		var top_length=(Number($(".js_change_video").css("margin-top").split("px")[0])+85-45);alert(top_length)
		//alert(top_length)
		if($(".js_change_video").css("margin-top").split("px")[0]>45){
			$(".js_change_video").css("margin-top",top_length+"px");
		}
	 
	})*/


	//直播

	/*$("#js-livesList").on("click",".imgCon",function(){
		$(this).hide();
		var link_m3u8=$(this).attr("link_m3u8");
		var cover=$(this).find("img").eq(0).attr("src");
		initLivePlayer("player"+Number($(this).attr("inx")),link_m3u8,cover,"178")


	})*/
	
})