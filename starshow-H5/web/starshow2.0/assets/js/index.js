
var initHome=function(resultData){
  //初始焦点图
  var focusList=resultData.data.focus;
  var news=resultData.data.headline;
  var videos=resultData.data.video;
  var lists=resultData.data.board;
  var pics=resultData.data.picture;
  var lives=resultData.data.live;
  var hours=resultData.data.hours;
  var special=resultData.data.special;
  var advert=resultData.data.advert;

  var focusHtml="";
  for (var i = 0; i < focusList.length; i++) {
      var type=focusList[i].type;
      var foucusLink="";
      if(focusList[i].link.indexOf("http")>=0){
        var linkid=focusList[i].link.split("id=")[1];
      }else{
        if(focusList[i].link!=""){
          var linkid=focusList[i].link;
        }
        
      }
      
      if(type==3 || type==5 ||type==10){
        foucusLink="liveDetail.html?menuTag=2-&id="+linkid;
      }else if(type==4){
        foucusLink="videoDetail.html?dtype=0&menuTag=1-&id="+linkid;
      }else if(type==6){
         foucusLink="newsDetail.html?menuTag=0-&id="+linkid;
      }else if(type==8){
         foucusLink=focusList[i].link;
      }else if(type==9){
         foucusLink="videoDetail.html?dtype=3&menuTag=1-&id="+linkid;
      }else if(type==0){
        foucusLink="javascript:void(0);"
      }
      if(type!=1 && type!=2 && type!=7 && type!=13 && type!=12){
        focusHtml+='<li class="swiper-slide" fid="'+focusList[i].id+'"><a target="_blank" href="'+
        foucusLink+'"><img src="'+focusList[i].cover+'!750x563" /></a>'+
        '<p class="focus_tit">'+focusList[i].title+'</p></li>'
      }
      
  };
  $("#js-focusList").append(focusHtml);
  //初始化头条]
  var newsHtml=""
  var nlength=news.length>4?4:news.length;
  if(nlength<=0){
    $("#js-newsList").parents(".xingx_list").prev(".xingx_tit_center").hide();
  }else{
      for (var i = 0; i <news.length; i++) {
        newsHtml+='<li><a href="newsDetail.html?id='+news[i].id+'&menuTag=0-">'+
                    '<img src="'+news[i].cover+'!750x563"/>'+
                    '<div class="box">'+
                    '<h1>'+news[i].title+'</h1>'+
                    '<div class="desc">'+news[i].description.substr(0,30)+'</div>'+
                    '</div></a>'+
                  '</li>'
        /*newsHtml+='<li><a href="newsDetail.html?id='+news[i].id+'&menuTag=0-">'+
                      '<img src="'+news[i].cover+'!750x563" />  '+
                      '<div class="activity">'+
                          '<p>'+news[i].title+'</p>'+
                          '<span>'+timesReview(news[i].created_at,resultData.current_time)+'</span>'+
                          '<div class="fr">'+
                              '<img src="assets/images/icon/icon-see.png" />'+
                              '<span  class="watch_num">'+commonCla.cWan(news[i].watch_num)+'</span>'+
                              '<img src="assets/images/icon/icon-like.png" />'+
                              '<span class="like_num">'+commonCla.cWan(news[i].like_num)+'</span> '+
                          '</div>'+
                      '</div></a>'+
                  '</li>'*/
    };
    $("#js-newsList").html(newsHtml);
  }
  /*24 hours*/
  var hoursHtml="";
  var hours_length=hours.length>8?8:hours.length;
  for (var i = 0; i < hours.length; i++) {
    var hours_title=hours[i].title;
    if(hours_title.length>=29){
      hours_title=hours[i].title.substr(0,29)+'...';
    }
    hoursHtml+= '<li><a href="newsDetail.html?id='+hours[i].id+'&menuTag=0-">'+
                '<img src="assets/images/icon_hours.png" height="8" width="7" class="vm"/>'+
                '<span class="vm">'+hours_title+'</span>'+
                '</a></li>'
    
  };
  $(".h_cons").html(hoursHtml);
  /*special*/
  var specialHtml="";
  var specialLength=special.length>3?3:special.length;
  for (var i = 0; i < specialLength; i++) {
    specialHtml+='<li sid="'+special[i].id+'"><a href="theme.html?menuTag=0-&id='+special[i].id+'">'+
                 '<div class="img_con"><img src="'+special[i].cover+'" /></div><p>'+special[i].title+
                 '</p></a></li>'
    
  };
  $(".js-special").html(specialHtml);

  var videosHtml="";
  var vlength=videos.length>5?5:videos.length;
  for (var i = 0; i <vlength; i++) {
      videosHtml+='<div class="swiper-slide" vid="'+videos[i].id+'" vtitle="'+videos[i].title+'">'+
                    '<div class="imgCon"><img src="'+videos[i].cover+'!750x563" /></div>'+
               '</div>'
               // <a target="_blank" href="videoDetail.html?dtype=0&menuTag=1-&id='+videos[i].id+'"></a>
  };
 // changeCurVideo(videos[0].cover,videos[0].title);

  $("#js-videoList").html(videosHtml);

  //榜单
  var rankHtml="";
  /*var starsLength=lists.length>5?5:lists.length;*/
  for (var i = 0; i < lists.length; i++) {
    var cla_color="";
    if(i<3){
      cla_color="col_"+Number(i+1)   
    }
    var boardId=lists[i].board_id;var boardName="";
    if(boardId==8){
      boardName="内地NO.1"
    }else if(boardId==9){
      boardName="港澳台NO.1"
    }else if(boardId==10){
      boardName="日韩NO.1"
    }else if(boardId==11){
      boardName="欧美NO.1"
    }else if(boardId==12){
      boardName="新星NO.1"
    }
    rankHtml+='<li>'+
                    '<div class="rankCon"><a target="_blank" href="billDetail.html?menuTag=4-&uid='+lists[i].user_id+'">'+
                        '<img src="'+lists[i].head_pic+'!250x250" />'+
                        '<div class="bg"><div class="font_con">'+lists[i].name+'<p>'+boardName+'</p><p>'+(lists[i].social_info.job==null?"":lists[i].social_info.job)+'</p></div></div>'+
                   '</a> </div>'+
                '</li>'

  };
  $("#js-rankList").html(rankHtml);
  //星美图
  var picsHtml="";
  for (var i = 0; i < pics.length; i++) {
    var childTag="";
    if(pics[i].tag_id=="2244"){childTag=4}else if(pics[i].tag_id=="2254"){childTag=5}else if(pics[i].tag_id=="2242"){childTag=6}
    else if(pics[i].tag_id=="2243"){childTag=1}else if(pics[i].tag_id=="2253"){childTag=2}else if(pics[i].tag_id=="2241"){childTag=3}
    if(pics[i].cover!=undefined && pics[i].cover!=null){
      picsHtml+='<div picid="'+pics[i].tag_id+'" class="swiper-slide">'+
                 '<a target="_blank" href="picList.html?menuTag=3-'+childTag+'&dtype=0&tagid='+pics[i].tag_id+
                 '"><img src="'+pics[i].cover+'!640x640"  />'+
                 '<span class="tagName">'+pics[i].tag.name+'</span>'+
                 '</a>'+
               '</div>' 
    }
     // pics[i]
  };
  $("#js-picList").html(picsHtml);

  //直播
  var liveHtml="";
  var livelength=lives.length>5?5:lives.length;
  var livelength2=lives.length>3?3:lives.length;
  if(livelength<=0){
    $("#js-livesList").parents(".liveMain").prev(".xingx_tit_left").hide();
  }else{
   for (var i = 0; i < livelength2; i++) {
       var abs_status="";
       if(lives[i].status==3){
           abs_status='<span class="abs_num_live">直播预热</span>';
        }else if(lives[i].status==1){
           abs_status="直播中";
        }

     liveHtml+='<div class="swiper-slide"><a href="liveDetail.html?menuTag=2-&id='+lives[i].id+'" target="_blank">'+
          '<img src="'+lives[i].cover+'!750x563" />  '+abs_status+'</a><p class="tit_live">'+lives[i].title+'</p></div>'
   };
   $("#js-livesList").html(liveHtml);
   if(livelength>3){
    var self_live_html="";
     for (var a = 3; a < livelength; a++) {
       self_live_html+='<div class="live_con">'+
          '<a href="liveDetail.html?menuTag=2-&id='+lives[a].id+'" target="_blank">'+
          '<img src="'+lives[a].cover+'!750x563" /></a>'+
          '<img src="assets/images/btn-play.png" height="58" width="58" class="btn_play"><p class="tit_live">'+lives[a].title+'</p></div>'
     };
     $("#js-lives-self").html(self_live_html)
   }
 }
 //广告
/* var advs=resultData.data.advert;
  if(advs.length>0){
    var advHtml="";
    for (var i = 0; i < advs.length; i++) {
       advHtml+='<a href="'+advs[i].link+'"><img src="'+advs[i].cover+'" /></a>';
     };
    $(".adv_con3").html(advHtml)
  }else{
    $(".adv_con3").hide();
  }*/


}

var getHomeData=function(){
    var url=host + "/web";
    commonCla.ajaxCommonFun(url,"get",function(resultData){
      if(resultData.code=="200"){
        initHome(resultData)
      }
    })
}

var initHomePage=function(){
    initMenu();
    getHomeData();

var mySwiper = new Swiper('.swiper-container-top',{
    loop: true,
    autoplay:5000,
    speed:1000,
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

  var myTvSwiper = new Swiper('.swiper-container-tv',{
        direction: 'vertical',
        height:530,
        slidesPerView:3,
        spaceBetween: 10,
        loop:true,
        onSlideChangeStart: function(swiper){
          var title=$(swiper.wrapper).find(".swiper-slide-active").attr("vtitle");
          var id=$(swiper.wrapper).find(".swiper-slide-active").attr("vid")
          var cover=$(swiper.wrapper).find(".swiper-slide-active img").attr("src");
          changeCurVideo(cover,title,id);
        },
        onTap: function(swiper){
         var slideNum=$(swiper.clickedSlide).index();
         if(slideNum>=9){
          swiper.slideNext();
          slideNum=4;
         }
         swiper.slideTo(slideNum);


        }
  })
  $('.btn-top').on('click', function(e){
    e.preventDefault()
    myTvSwiper.slidePrev();
  })
  $('.btn-bottom').on('click', function(e){
    e.preventDefault()
    myTvSwiper.slideNext()
  })
  $(".tvMain .btn_play").click(function(){
    var id=$(this).parent().next(".fr").find(".swiper-slide-active").attr("vid");
    window.location.href="videoDetail.html?dtype=0&menuTag=1-&id="+id
  })

  var myLiveSwiper = new Swiper ('.swiper-container-live', {
     loop: true,
    autoplay:5000,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  })  
  var swiper2 = new Swiper('.swiper-container-rank', {
        initialSlide :0,
        slidesPerView:5,
        slidesPerGroup:5,
        loop:false,
        // 如果需要前进后退按钮
        /*nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',*/
    });


    var swiper3 = new Swiper('.featured', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView:3,
        slidesPerGroup:1,
        initialSlide :2,
      	loop:true,
        loopedSlides :8,
      	 preventClicks:false,
	  pagination: '.swiper-pagination2',
         // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        coverflow: {
         /*   rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true*/
            rotate: 0,
            stretch: 10,
            depth: 300
        }
    });

    $("#js-rankList .rankCon").hover(function(){
      $(this).find("img").removeClass("turnFront");
      $(this).find(".bg").removeClass("turnFront");
      $(this).find("img").addClass("turnBack");
      $(this).find(".bg").addClass("turnBack");
    },function(){
      $(this).find("img").removeClass("turnBack");
      $(this).find(".bg").removeClass("turnBack");
      $(this).find("img").addClass("turnFront");
      $(this).find(".bg").addClass("turnFront");
    })

    $(".headlines li:last-child").hover(function(){
       if($(".headlines li").length>4){
        var left=Number($("body").width())*0.2-40-440
        $(".headlines").animate({left:left});
       }
         
      },function(){
        if($(".headlines li").length>4){
         $(".headlines").animate({left:"0"});
       }
    })
    //scroll show menu
    window.onscroll = function(){
      var t = document.documentElement.scrollTop || document.body.scrollTop; 
      var top_div = document.getElementById("ind_xingx_header");
      if( t >= 200 ) {
          top_div.style.display = "inline";
      } else {
          top_div.style.display = "none";
      }
  }
}
var changeCurVideo=function(cover,title,id){
  var curVideo='<a href="videoDetail.html?dtype=0&menuTag=1-&id='+id+'"><img src="'+cover+'"><p>'+title+'</p></a>'
  $(".tv_con").html(curVideo);
}
$(function(){

	initHomePage();

})