
var initHome=function(resultData){
  //初始焦点图
  var focusList=resultData.data.focus;
  var news=resultData.data.news;
  var videos=resultData.data.videos;
  var lists=resultData.data.boards;
  var pics=resultData.data.pictures;
  var lives=resultData.data.lives;

  var focusHtml="";
  for (var i = 0; i < focusList.length; i++) {
      var type=focusList[i].type;
      var foucusLink="";
      if(focusList[i].link.indexOf("http")>=0){
        var linkid=focusList[i].link.split("id=")[1];
      }else{
        var linkid=focusList[i].link;
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
      }
      if(type!=1 && type!=2 && type!=7 && type!=13 && type!=12){
        focusHtml+='<div class="swiper-slide" fid="'+focusList[i].id+'"><a target="_blank" href="'+
        foucusLink+'"><img src="'+focusList[i].cover+'" /></a>'+
        '<p class="focus_tit">'+focusList[i].title+'</p></div>'
      }
      
  };
  $("#js-focusList").append(focusHtml);
  //初始化头条]
  var newsHtml=""
  var nlength=news.length>4?4:news.length;
  if(nlength<=0){
    $("#js-newsList").parents(".xingx_list").prev(".xingx_tit").hide();
  }else{
      for (var i = 0; i <nlength; i++) {
        newsHtml+='<li><a href="newsDetail.html?id='+news[i].id+'&menuTag=0-">'+
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
                  '</li>'
    };
    $("#js-newsList").html(newsHtml);
  }
  

  var videosHtml="";
  var vlength=videos.length>5?5:videos.length;
  for (var i = 0; i <vlength; i++) {
      videosHtml+='<li vid="'+videos[i].id+'"><a target="_blank" href="videoDetail.html?dtype=0&menuTag=1-&id='+videos[i].id+'">'+
                    '<img src="'+videos[i].cover+'!750x563" />  '+
                   ' <div class="activity">'+
                       '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
                       '<span class="vm">'+videos[i].title+'</span></p>'+
                        '<span>'+timesReview(videos[i].created_at,resultData.current_time)+'</span>'+
                        '<div class="fr">'+
                            '<img src="assets/images/icon/icon-see.png" />'+
                            '<span  class="watch_num">'+commonCla.cWan(videos[i].watch_num)+'</span>'+
                            '<img src="assets/images/icon/icon-like.png" />'+
                            '<span class="like_num">'+commonCla.cWan(videos[i].like_num)+'</span> '+
                        '</div>'+
                    '</div>'+
               ' </a></li>'
  };
  $("#js-videoList").html(videosHtml);

  //榜单
  var rankHtml="";
  /*var starsLength=lists.length>5?5:lists.length;*/
  for (var i = 0; i < lists.length; i++) {
    var cla_color="";
    if(i<3){
      cla_color="col_"+Number(i+1)   
    }
    
    rankHtml+='<div class="swiper-slide">'+
                    '<div class="rankCon"><a target="_blank" href="billDetail.html?menuTag=4-&uid='+lists[i].user_id+'">'+
                        '<img src="'+lists[i].head_pic+'!250x250" />'+
                        '<div class="bg">'+lists[i].name+'</div>'+
                        '<div class="icon_num '+cla_color+'"></div>'+
                        '<span class="num">'+(i+1)+'</span>'+
                   '</a> </div>'+
                '</div>'

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
                 '<a target="_blank" href="picList.html?menuTag=3-'+childTag+'&dtype=0&tagid='+pics[i].tag_id+'"><img src="'+pics[i].cover+'!640x640"  /></a>'+
               '</div>' 
    }
     // pics[i]
  };
  $("#js-picList").html(picsHtml);

  //直播
  var liveHtml="";
  var livelength=lives.length>5?5:lives.length;
  if(livelength<=0){
    $("#js-livesList").parents(".xingx_list").prev(".xingx_tit").hide();
  }else{
   for (var i = 0; i < livelength; i++) {
       var abs_status="";
       if(lives[i].status==3){
           abs_status='<span class="abs_num_live">直播预热</span>';
        }else if(lives[i].status==1){
           abs_status="直播中";
        }
     liveHtml+='<li><a href="liveDetail.html?menuTag=2-&id='+lives[i].id+'" target="_blank">'+
          '<img src="'+lives[i].cover+'!750x563" />  '+abs_status+
          '<div class="activity">'+
            '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
           ' <span class="vm">'+lives[i].title+'</span></p>'+
            '<span>'+timesReview(lives[i].created_at,resultData.current_time)+'</span>'+
            '<div class="fr">'+
             
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(lives[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(lives[i].like_num)+'</span>'+
            '</div>'+
          '</div>'+
        '</a></li>'
   };
   $("#js-livesList").html(liveHtml);
 }
 //广告
 var advs=resultData.data.advert;
  if(advs.length>0){
   for (var i = 0; i < advs.length; i++) {
     if(advs[i].board_id==5){
      /*var advHtml='<a href="'+advs[i].link+'"><img src="'+advs[i].cover+'" />'+
          '<p>'+advs[i].title+'</p></a>'
      $(".adv_con1").html(advHtml);*/
     }else{
      $(".adv_con3").html('<a href="'+advs[i].link+'"><img src="'+advs[i].cover+'" /></a>')
     }
   };
  }else{
    $(".adv_con1").hide();
    $(".adv_con3").hide();
    $(".adv_con2").css("margin-top","0");
  }

  //判断是否与广告1
  if($(".adv_con1 img").length>0){
    $(".adv_con2").hide();
    $(".adv_con2").css("margin-top","19px");
    $(".adv_con2").find("img").attr("src","assets/images/pic/down.png");
    $(".adv_con1").show();
    $(".adv_con2").show();
  }

}

var getHomeData=function(){
    var url=host+"/home";
    commonCla.ajaxCommonFun(url,"get",function(resultData){
      if(resultData.code=="200"){
        initHome(resultData)
      }
    })
}

var initHomePage=function(){
    initMenu();
    getHomeData();
    var mySwiper = new Swiper ('.swiper-container-top', {
    initialSlide :0,
    loop: true,
    loopedSlides :8,
     preventClicks:false,
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
            rotate: 30,
            stretch: 10,
            depth: 150
        }
    });

    $("#js-rankList").on("mouseover",".rankCon",function(){
      $(this).find(".bg").show();
    })
    $("#js-rankList").on("mouseout",".rankCon",function(){
      $(this).find(".bg").hide();
    })
}
$(function(){

	initHomePage();

})