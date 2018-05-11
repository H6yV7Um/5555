
var initHomeDom=function(data){
	var activity=data.activity;
	var collections=data.collections;
	var focusList=data.focus;
	var news=data.news;
	var posts=data.posts;
	var treasure_live=data.treasure_lives;
	var experts=data.experts;
	var focusHtml="";var collHtml="";var expertsHtml="";var jobs="";var cla_hover="";

    //活动
    var activityHtml="";
    for (var i = 0; i < activity.length; i++) {
    	//activity[i]
    	var link=activity[i].url;
    	var linkId=""
    	if(link.indexOf("news/share.html")!=-1 || link.indexOf("news/detail.html")!=-1){
    		linkId=link.split("id=")[1].split("&")[0];
    		link='newsDetail.html?id='+linkId+'&mt=3'
    	}
    	activityHtml+='<li><a href="'+link+'" target="_blank">'+
				    '<div class="tw_one">'+
							'<div class="imgCon"><img src="'+activity[i].cover+'" /></div>'+
							'<div class="tw_one_desc">'+
								'<p class="post_tit">'+activity[i].title+'</p>'+
							'</div>'+
					 '</a></div>'+
				'</li>'
    };
    $("#js_activity").html(activityHtml)
	//post帖子
	var postsHtml=""
	var postsLength=posts.length>2?2:posts.length;
	for (var i = 0; i <postsLength; i++) {
		postsHtml+='<li><a href="postDetail.html?id='+posts[i].id+'&mt=3">'+
						'<div class="tw_one">'+
							'<div class="imgCon"><img src="'+posts[i].photos[0]+'!750x563" /></div>'+
							'<div class="tw_one_desc">'+
								'<p class="post_tit">'+posts[i].content+'</p>'+
								'<p class="post_imgNum">共'+posts[i].photos.length+'张</p>'+
							'</div>'+
						'</div>'+
					'</a></li>'
	};
	$("#js_postList").html(postsHtml)
	//资讯
	var newsLength=news.length>6?6:news.length;
	var newsHtml="";

	var title_one=news[0].title.length>15?news[0].title.substr(0,14)+"...":news[0].title;
	var news_top_Html='<div class="imgCon" nid="'+news[0].id+'"><a href="newsDetail.html?id='+news[0].id+'&mt=3"><img src="'+news[0].cover+'" /></div>'+
			  '<div class="tw_one_desc">'+title_one+'</a></div>'
	$("#js_one").html(news_top_Html)
	for (var i = 1; i < newsLength; i++) {
		var title=news[i].title.length>15?news[i].title.substr(0,14)+"...":news[i].title;
		newsHtml+='<li><a href="newsDetail.html?id='+news[i].id+'&mt=3">'+title+'</a></li>'
	};
	$("#js_newsCon").html(newsHtml);

	//专家鉴宝
	var livesHtml="";
	var treasure_live_length=treasure_live.length>5?5:treasure_live.length
	if(treasure_live_length<5){
         $(".jianBaoList").parent().hide();
	}else{
		for (var i = 0; i < treasure_live_length; i++) {
		 livesHtml+='<li><a href="expertLiveDetail.html?id='+treasure_live[i].id+'&mt=2">'+
						'<div class="tw_one">'+
								'<div class="imgCon"><img src="'+treasure_live[i].cover+'" /></div>'+
								'<div class="tw_one_desc">'+
									'<p class="post_tit">'+treasure_live[i].name+'</p>'+
								'</div>'+
							'</div>'+
							'<img src="assets/images/btn-play.png" height="40" width="40" class="btn_play">'
					'</li>'
		};
		$("#js_jianBaoList").html(livesHtml)
	}

    //专家
    var expertsLength=experts.length>=6?6:experts.length;
	for (var i = 0; i < expertsLength; i++) {
		var e_jobs="";
        if(experts[i].role_infos.length>0){
        	if(experts[i].role_infos[0].current_job.length>0){
        		e_jobs=experts[i].role_infos[0].current_job[0]
        	}
        }
        if(i==0){
        	cla_hover="";//hover
        }else{
        	cla_hover="";
        }
		expertsHtml+='<li class="'+cla_hover+'">'+
					'<div class="expert_head">'+
						'<img src="'+reviewHeader(experts[i].head_pic)+'">'+
						'<div class="bg"></div>'+
					'</div>'+
					'<div class="expert_desc">'+
						'<h1>'+experts[i].name+'</h1>'+
						'<p>'+e_jobs+'</p>'+
					'</div>'+
				'</li>'

	};
	expertsHtml+='<li>'+
					'<div class="expert_more">'+
						'<a href="expertLive.html?mt=2-0#experts">查看&gt;<br/><span style="font-size:12px;">所有大师</span></a>'+
					'</div>'+
				'</li>'
    $("#js_expertList").html(expertsHtml);
    //藏品
    var collLenth=collections.length>=4?4:collections.length;
    for (var i = 0; i < collLenth; i++) {
	    	var experts=collections[i].appraisals;
	    	var appraisalsHtml="";
	    	var appra_length=experts.length>6?6:experts.length;
	    	for (var a = 0; a < appra_length; a++) {
	    		appraisalsHtml+='<img src="'+reviewHeader(experts[a].user.head_pic)+'">'
	    	};
	    	if(experts.length<=0){
	    		appraisalsHtml+="<span class='no_data col_grey'>还没有鉴定师发表过评价</span>"
	    	}
    	
    		var str_status="";
	    	var status=collections[i].status;
	    	if(status==1){
	    		str_status='<span class="status">正在拍卖中</span>'
	    	}else if(status==0){
	    		if(collections[i].auctions.length>0){
	    			str_status='<span class="status pre_status">开始时间'+cutDate(collections[i].auctions[0].begin_time,"ymd")+'</span>'
	    		}else{
	    			str_status='<span class="status pre_status">待拍卖</span>'
	    		}
	    		

	    	}else if(status==3){
	    		str_status='<span class="status pre_end">已卖出</span>'
	    	}
	    	 collHtml+='<li><a href="goodsDetail.html?id='+collections[i].id+'&mt=1">'+
							'<div class="auc_pic"><img src="'+collections[i].cover+'"/></div>'+
							'<div class="auc_desc">'+
								'<h1>'+collections[i].name+'</h1>'+
								'<p>送拍机构：'+collections[i].user.name+'</p>'+str_status+
								'<div class="headList">'+
									'<img src="assets/images/icon-head_tit.png" height="56" width="56" >'+
								appraisalsHtml+'</div>'+
							'</div></a>'+
						'</li>'
    	
    	
    };
    $("#js_aucList").html(collHtml);
    //焦点
	for (var i = 0; i < focusList.length; i++) {
		var type=focusList[i].type;
        var foucusLink="";
        //0其他,1藏品,2专场,3拍卖会,4鉴宝直播,5新闻,6活动,7帖子
		if(type=="0" || type=="6"){
			foucusLink=focusList[i].link;
		}else if(type==1){
			foucusLink="goodsDetail.html?id="+focusList[i].link+"&mt=1";
		}else if(type==2 || type==3){
			foucusLink="auctionDetail.html?id="+focusList[i].link+"&mt=1";
		}else if(type==4){
			foucusLink="expertLiveDetail.html?id="+focusList[i].link+"&mt=2";
		}else  if(type==5){
			foucusLink="newsDetail.html?id="+focusList[i].link+"&mt=3";
		}else if(type=7){
			foucusLink+="postDetail.html?id="+focusList[i].link+"&mt=3"
		}
		if(type!=6){
			focusHtml+='<li class="swiper-slide" fid="'+focusList[i].id+'">'+
		           '<a target="_blank" href="'+foucusLink+'"><img src="'+focusList[i].cover+'!750x563" />'+
		           '</a></li>'
		}
		
	};
	$("#js-focusList").html(focusHtml);
	var mySwiper = new Swiper('.swiper-container-top',{
	    loop: true,
	    autoplay:5000,
	    speed:1000,
	    preventClicks:false,
	    onlyExternal : true,
	    slidesPerView :  1,
	    slidesPerGroup : 1,
	    loopedSlides :20,
	    loopAdditionalSlides : 20,
	    pagination: '.swiper-pagination',
	    onSlideChangeEnd: function(swiper){
	    //alert(swiper.activeIndex);
	    if(swiper.activeIndex==40){
	      swiper.swipeTo(0,0)
	      }
	    },

	  }); 
	$('.btn-left').on('click', function(e){
	    e.preventDefault()
	    mySwiper.slidePrev()
	  })
	  $('.btn-right').on('click', function(e){
	    e.preventDefault()
	    mySwiper.slideNext()
	  })


}
var getHomeData=function(){
	var domIdList=[$(".cangp_con2"),$(".cangp_con3"),$("#js_expertList")]
	var url=commonCla.hostBase+"/web/home"
	commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
		if(textStatus=="success"){
			initHomeDom(data)
		}
		
	},{},domIdList)
}
var initHomePage=function(){
	getHomeData();
	$("#js_expertList").on("hover","li",function(){
		if($(this).nextAll().length>0){
			$("#js_expertList li").removeClass("hover");
		    $(this).addClass("hover");
		}
		

	})
	$("#js_expertList").on("mouseout","li",function(){
		if($(this).nextAll().length>0){
			$("#js_expertList li").removeClass("hover");
		}
		

	})
	
	

}
$(function(){
  initHomePage();
  $("body").on("click",".js_dialog",function(){
    swal({
              "title":"下载藏拍APP",
              "text": "⎾藏拍⏌专注于收藏品拍卖的交易平台！",
              "imageUrl": "assets/images/code-app-big.png",
              "imageSize":"160x160",
              "animation":"slide-from-top",
              "confirmButtonText":"关闭",
              "confirmButtonColor": "#eb1010",

     });
  })
})