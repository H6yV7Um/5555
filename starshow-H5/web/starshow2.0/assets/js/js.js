var masonryOptions = {
                        itemSelector: '.box',
                        gutter: 20,
                        isAnimated: false
                    }
var initPlayer=function(id,hls,cover){
  var v_height=$("#"+id).height();
  var player = new TcPlayer(id, {
  //"app_id": "1400035854",
  "m3u8": hls, //请替换成实际可用的播放地址
  "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
  "live":true,
  "coverpic" : {"style": "cover", "src":cover},
  "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
  "height" : v_height,//视频的显示高度，请尽量使用视频分辨率高度
  listener:function(msg){
     if(msg.type == 'error'){
            window.setTimeout(function(){
                player.load();//进行重连
            },5000);
        }
      if(msg.type == 'ended'){
        $("#experts_player").html('<img class="end_bg" src="'+cover+'!750x563"/><div class="end_tit">直播结束<div>')
      }
     }
  });
}
var initReplayer=function(id,replay_url,cover){      
  var player = new TcPlayer(id, {
  "mp4": replay_url, //请替换成实际可用的播放地址
  "controls":"default",
  "live": false,
  "flash" : true,
  "autoplay" : true,
  "coverpic" : {"style": "cover", "src":cover},
  "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
  "height" : 675//视频的显示高度，请尽量使用视频分辨率高度
  });
}
var newsDetail={
  getNewsData:function(){
  	var url=host+"/news/"+commonCla.analyzParams("id");
  	commonCla.ajaxCommonFun(url,"get",function(ret){
  		if(ret.code=="200"){
        $(".news_details").show();
  			 newsDetail.initNewsDom(ret);
         //plista
         (function(c){var g,s='script',w=window,n=c.name||'PLISTA';if(!w[n]){w[n]=c;g=w.document.getElementsByTagName(s)[0];s=w.document.createElement(s);s.async=true;s.type='text/javascript';s.src=(w.location.protocol==='https:'?'https:':'http:')+'//static'+(c.origin?'-'+c.origin:'')+'.plista.com/async'+(c.name?'/'+c.name:'')+'.js';g.parentNode.insertBefore(s,g);}
          }({
              "publickey": "530e0503202b995561f9febf",
              "item": {
                  "objectid":ret.data.id,  /*unique ID, alphanumeric*/
                  "title": ret.data.share.title,  /*max 255 characters*/
                  "text": ret.data.share.content,  /*max 255 characters*/
                  "url": "http://www.lookmetv.com/newsDetail.html?menuTag=0-&id="+ret.data.id,  /*max 1024 characters*/
                  "img": ret.data.share.cover,  /*max 255 characters*/
                  "category": "News",
                  "published_at": 1400000000,  /*UNIX timestamp, date article was first published*/
                  "updated_at": 1400000000  /*UNIX timestamp, date article was last modified*/
              },
              "origin": "cn"
          }));
         }else if(ret.code="404"){
        $(".news_details").html("<img src='assets/images/404.png'/>");
      }
     
  	})
  },
  changeLink:function(obj){
    var html=$(obj).find("urltitle").html();
    $(obj).css("background-size","20px");
    $(obj).css("display","block");
    if(html.length>15){ 
      $(obj).html(html.substr(0,6)+"..."+html.substr(6,6)+"-网页链接");
    }
  },parseDom:function(arg) { 
    //转换为dom对象
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
  },
  initNewsDom:function(ret){
    $(document).attr("title",ret.data.title);//修改title值
    /*$(".head_pic").attr("src",ret.data.cover);*/
    $(".user_desc .head_pic").attr("src",ret.data.user.head_pic);
    $(".user_name p").eq(0).html(ret.data.user.name);
    $(".user_name p").eq(1).html(ret.data.created_at);
    $(".arti_tit").html(ret.data.title);


   var content =newsDetail.parseDom(ret.data.content);
    //处理链接
    var linkList=$(content).find(".urlstyle");
    for (var i = 0; i < linkList.length; i++) {
      newsDetail.changeLink(linkList[i]);
    };
     var third_party="";
    if(ret.data.third_party_id!=0){
     third_party="本文著作权归：<span style='border-bottom:1px solid #ff1d3e;display:inline-block'>"+ret.data.user.name+"</span>所有";
   }
    $(".articles .content").html($(content).html()+third_party);

    $(".like_num").html(commonCla.cWan(ret.data.like_num));
    $(".watch_num").html(commonCla.cWan(ret.data.watch_num));

    $("#hide_info").attr("cover",ret.data.cover)

    var labels=ret.data.labels;
    if(labels.length>0){
       var labelHtml="";
       for (var i = 0; i < labels.length; i++) {
        labelHtml+="<span class='label'>"+labels[i].name+"</span>"
       };
       $(".labels_con").html(labelHtml)
    }else{
      $(".labels").hide();
    }

    var recommends=ret.data.recommend;
    var htmls="";
    for (var i = 0; i < recommends.length; i++) {
      htmls+='<div class="recom_lists"><a href="newsDetail.html?menuTag=0-&id='+recommends[i].id+'"><img src="'+recommends[i].cover+'!300x225"/><p>'+recommends[i].title+'</p></a></div>';
      //
    };
    $("#js-recomment").append(htmls)
  },
  initNewsPage:function(){
  	newsDetail.getNewsData();
    $(".share_sina").click(function(){
      newsDetail.shareTip("sina",$(".arti_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })
      $(".share_qq").click(function(){
        newsDetail.shareTip("zone",$(".arti_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })
      //语音播放
    $(".xingx_cons").on("click",".audio_main",function(e){
      var audio=$(this).find("audio")[0];
      var childList=document.getElementsByTagName("audio");
      if(audio!==null){
            if(audio.paused){
                        for(var i = 0; i < childList.length; i++){
                            var au=childList[i];
                          if(au!==null){
                          if(au.paused){
                          }else{
                          au.pause();// 这个就是暂停
                          }
                          }
                        }
             $(".audio_yuyin").removeClass("move");
             audio.play();//audio.play();// 这个就是播放
             $(this).find(".audio_yuyin").addClass("move");
            }else{
             $(this).find(".audio_yuyin").removeClass("move");
             audio.pause();// 这个就是暂停
            }
         }
        var thi=$(this);
         $(audio).on('ended',function () {
            thi.find('.audio_yuyin').removeClass('move');
       });
    });
  },
  shareTip :function(platTag,title,url,picurl){ 
    //分享到腾讯微博  
    if(platTag=="qq"){
      var sharstring='http://v.t.qq.com/share/share.php?title='+title+'&url='+url+'&pic='+picurl;
    }
    if(platTag=="sina"){
      var sharstring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
    }
    if(platTag=="zone"){
     var sharstring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc='+title+'&title='+title+'&summary='+title+'&url='+url+'&pics='+picurl;  
    }
    window.open(sharstring,'newwindow','height=100,width=100,top=100,left=100');
    
  },
}

var videosDetail={
  getVedioData:function(){
    var dtype=commonCla.analyzParams("dtype");
    if(dtype==3){
      var url=host+"/lsVideo/"+commonCla.analyzParams("id");
    }else{
      var url=host+"/video/"+commonCla.analyzParams("id");
    } 
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
        videosDetail.initVideoDom(ret,dtype);
      }else{
        $(".xingx_cons").html("<div class='tc'><img src='assets/images/404.png'/></div>");
      }
    })
  },
  initVideoDom:function(ret,dtype){
    if(dtype==3){
      var current_video=ret.data.lsVideo;
      var videolist=ret.data.relatedVideos;
      $(".star_info").hide();
      $(".prodList").hide();
      $(".user_desc").hide();
      $(".labels").hide();

      $(".likes .like_num").html(commonCla.cWan(current_video.like_num));
      $(".likes .watch_num").html(commonCla.cWan(current_video.watch_num));
      $(".video_tit").html(current_video.video_name);
      $(document).attr("title",current_video.video_name);//修改title值
      $(".video_content").html(current_video.synopsis);
      $(".times").html(timesReview(current_video.created_at,ret.current_time))
      $("#player").show();
      $(".video_banner video").hide();
      $("#hide_info").attr("cover",current_video.cover);
      //乐视回放//836964
      //var player = new CloudVodPlayer();
      //player.init({uu:"853371",vu:current_video.mms_id,pic:current_video.cover,auto_play:0,autoSize:2,pu:"1655aeb1f1",p:"102"},"player");
      initReplayer("player",current_video.replay_url,current_video.cover)
    }else{
    $("#hide_info").attr("cover",ret.data.current_video.cover);
    $(".video_banner video").attr("src",ret.data.current_video.video_url);
    $(".video_banner video").attr("poster",ret.data.current_video.cover);
    $(".video_tit").html(ret.data.current_video.title);
    $(document).attr("title",ret.data.current_video.title);//修改title值
    $(".user_desc .user_name p").eq(0).html(ret.data.current_video.user.name);
    $(".user_desc .head_pic").attr("src",ret.data.current_video.user.head_pic);
    $(".follow_num").html(commonCla.cWan(ret.data.current_video.user.followers_count));
    
    $(".likes .like_num").html(commonCla.cWan(ret.data.current_video.like_num));
    $(".likes .watch_num").html(commonCla.cWan(ret.data.current_video.watch_num));
    $(".video_content").html(ret.data.current_video.description);

    $(".times").html(timesReview(ret.data.current_video.created_at,ret.current_time))
    var stars=ret.data.current_video.stars;
    var dakas=ret.data.current_video.dakas;
    if(stars.length>0){
        var stars=ret.data.current_video.stars;
        var starsHtml="";
        for (var i = 0; i < stars.length; i++) {
          starsHtml+=' <li>'+
                       '<img src="'+stars[i].head_pic+'" class="head_pic fl" />'+
                       '<div class="stars fl">'+
                          '<p>本档明星</p>'+
                          '<p class="star_name">'+stars[i].name+'</p>'+
                       '</div>'+
                     '</li>'
        }; 
        $(".stars_menu").html(starsHtml);
        window.clearInterval($t); //清楚定时器
        $t=setInterval('autoScroll(".star_info")',3000)//轮换间隔，单位毫秒，下同 
        
        if(dakas.length>0){
          $(".starts_list").prev("img").show();
          var dakasHtml="";
          for (var i = 0; i < dakas.length; i++) {
            dakasHtml+='<div class="swiper-slide">'+
                          '<div class="starCon">'+
                            '<img src="'+dakas[i].head_pic+'" />'+
                            '<p>'+dakas[i].name+'</p>'+
                          '</div>'+
                         '</div>'
            
          };
          $("#js-starList").html(dakasHtml);
        }else{
          $(".starts_list").prev("img").hide();
        }
     
    }else{
      $(".star_info").hide();
    }
    
    var taobao_goods=ret.data.current_video.taobao_goods;
    if(taobao_goods.length>0){
      var goodsHtml="";
      for (var i = 0; i < taobao_goods.length; i++) {
         goodsHtml+='<div class="swiper-slide" gid="'+taobao_goods[i].goods_id+'">'+
                      '<div class="starCon" prodlink="'+taobao_goods[i].goods_detail_url+'">'+
                       ' <img src="'+taobao_goods[i].goods_pic+'" />'+
                        '<p>'+taobao_goods[i].goods_name+'</p>'+
                        '<p class="col_red">￥'+taobao_goods[i].goods_price+'</p>'+
                      '</div>'+
                     '</div>'

         
      };
      $("#js-prodList").html(goodsHtml);
    }else{
      $(".prodList").hide();
    }
   /* if(ret.data.current_video.advertisements.length>0){
      var advHtml='<a href="'+ret.data.current_video.advertisements[0].url+'"> <img class="mt20" src="'+ret.data.current_video.advertisements[0].cover+'" /></a>'
      $("#js_adv").html(advHtml);
    }*/
    /*if(ret.data.web_ad!=null){
      var advHtml='<a href="'+ret.data.web_ad.link+'"> <img class="mt20" src="'+ret.data.web_ad.cover+'" /></a>'
      $("#js_adv").html(advHtml);
    }*/
    //标签
    var labels=ret.data.current_video.labels;
    if(labels.length>0){
       var labelHtml="";
       for (var i = 0; i < labels.length; i++) {
        labelHtml+="<span class='label'>"+labels[i].name+"</span>"
       };
       $(".labels_con").html(labelHtml)
    }else{
      $(".labels").hide();
    }

    var videolist=ret.data.video_list.page_data;
    }

    var videolistHtml="";
    for (var i = 0; i < videolist.length; i++) {
      if(dtype==3){
         var video_tit=videolist[i].video_name;
         var dtypes="&dtype=3"
      }else{
        var video_tit=videolist[i].title;
        var dtypes="";
      }
      videolistHtml+='<li><a href="videoDetail.html?id='+videolist[i].id+dtypes+'">'+
          '<img src="'+videolist[i].cover+'!750x563" />  '+
          '<div class="activity">'+
           '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
           '<span class="vm">'+video_tit+'</span></p>'+
            '<span>'+timesReview(videolist[i].created_at,ret.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(videolist[i].watch_num)+'</span>'+
               '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(videolist[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
      
    };
    $("#js-livesList").html(videolistHtml);
  },
  initVideoPage:function(){
      videosDetail.getVedioData();
      $(".share_sina").click(function(){
      newsDetail.shareTip("sina",$(".video_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })
      $(".share_qq").click(function(){
        newsDetail.shareTip("zone",$(".video_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })

      $("#js-prodList").on("click",".starCon",function(){
         var prodlink=$(this).attr("prodlink");
         window.BC_SDK.goTaoke({
                tkUrl : prodlink,
                params : {
                  pid: "mm_122511581_24602349_83026078", // 淘客必填
                }
         });
      })
     var swiper = new Swiper('.swiper-container-stars', {
        initialSlide :0,
        slidesPerView:6,
        slidesPerGroup:6,
        loop:false,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
     var swiper = new Swiper('.swiper-container-prod', {
        initialSlide :0,
        slidesPerView:5,
        slidesPerGroup:5,
        loop:false,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
  }
}
var videoList={
   "tagid":commonCla.analyzParams("tagid"),
   getListData:function(){
    var current_count=$("#js-videoList2 li").length;
    var dtype=commonCla.analyzParams("dtype");
    if(dtype=="all"){
      var url=host+"/video?current_count="+current_count+"&count=8";
    }else{
      var url=host+"/video/tags/"+videoList.tagid+"?current_count="+current_count+"&count=8";
    }
    if(commonCla.analyzParams("dtype")==3){
      url=host+"/lsVideo?current_count="+current_count+"&count=8";
    }
    commonCla.ajaxCommonFun(url,"get",function(resultData){
      if(resultData.code=="200"){
        
        if(commonCla.analyzParams("dtype")==3){var v_length=resultData.data.lsVideos.length}else{
          var v_length=resultData.data.page_data.length;
        }
        if(v_length>0){
          videoList.initListDom(resultData,commonCla.analyzParams("dtype"));
        }else{
          $(".nodata").css("visibility","visible");
          setTimeout(function(){
           $(".nodata").css("visibility","hidden");
          },60000)
        }
      }
    })
   
  },
  initListDom:function(resultData,dtype){
      var listHtml="";var videosList="";var video_tit="";
      if(dtype==3){
        videosList=resultData.data.lsVideos;
        $("#js-videoList2").parent().addClass("xingx_list_video_ls")
      }else{
        videosList=resultData.data.page_data;
        $("#js-videoList2").parent().removeClass("xingx_list_video_ls")
      }
      for (var i = 0; i < videosList.length; i++) {
        if(dtype==3){
          video_tit=videosList[i].video_name;  
        }else{
          video_tit=videosList[i].title;     
        }
        listHtml+='<li><a target="_blank" href="videoDetail.html?dtype='+dtype+'&menuTag=1-&id='+videosList[i].id+'">'+
          '<img src="'+videosList[i].cover+'!750x563" />  '+
          '<div class="activity">'+
           '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
           '<span class="vm">'+video_tit+'</span></p>'+
            '<span>'+timesReview(videosList[i].created_at,resultData.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num"> '+commonCla.cWan(videosList[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png"/> '+
              '<span class="like_num">'+commonCla.cWan(videosList[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
      };
      $("#js-videoList2").append(listHtml)
  },
  initvideoListPage:function(){
     videoList.getListData();
  }
}

var newsList={
  //dtype single 0  , theme 1, group 2
   "dtype":commonCla.analyzParams("dtype"),
   "tagid":commonCla.analyzParams("tagid"),
   getListData:function(){
    var current_count=$("#js-newsList2 li").length;
    var url=host+"/fashion/"+newsList.tagid+"/tagList?current_count="+current_count+"&count=8";
    if(newsList.dtype==1){
      url=host+"/theme?current_count="+current_count+"&count=8";
    }else if(newsList.dtype==2){
      url=host+"/fashion/nestTagList?tag_ids="+newsList.tagid+"&current_count="+current_count+"&count=8";
    }else if(newsList.dtype=="all"){
      url=commonCla.hostBase+"/v12/news/all?current_count="+current_count+"&count=8"
    }
    commonCla.ajaxCommonFun(url,"get",function(resultData){
      if(resultData.code=="200"){
        if(resultData.data.page_data.length>0){
          newsList.initListDom(resultData,newsList.dtype);
        }else{
          $(".nodata").css("visibility","visible");
          setTimeout(function(){
           $(".nodata").css("visibility","hidden");
          },60000)
        }
        
      }
    })
   
  },
  initListDom:function(resultData,dtype){
     
      var listHtml="";var istheme=""
      alink='<a target="_blank" href="newsDetail.html?menuTag=0-&id=';
      if(dtype==1){
        alink='<a target="_blank" href="theme.html?menuTag=0-&id=';
        istheme="none";
      }
      for (var i = 0; i < resultData.data.page_data.length; i++) {
        listHtml+='<li>'+alink+resultData.data.page_data[i].id+'">'+
          '<img src="'+resultData.data.page_data[i].cover+'!750x563" />  '+
          '<div class="activity">'+
           '<p>'+
           '<span class="vm">'+resultData.data.page_data[i].title+'</span></p>'+
            '<span>'+timesReview(resultData.data.page_data[i].created_at,resultData.current_time)+'</span>'+
            '<div class="fr">'+ 
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num"> '+commonCla.cWan(resultData.data.page_data[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" class=" '+istheme+'" /> '+
              '<span class="like_num '+istheme+'">'+commonCla.cWan(resultData.data.page_data[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
      };
      $("#js-newsList2").append(listHtml).show('slow');
  },
  initNewListPage:function(){
     newsList.getListData();
  }
}
var liveList={
  initLiveDom:function(ret){
    var onlineLives=ret.data.onlineLives;
    var replayLives=ret.data.replayLives;
    //乐视
    var lsLives=ret.data.lsLives;
    var onlinHtml="";
    var preVideoHtml="";
    if(onlineLives.length>0){
       for (var i = 0; i < onlineLives.length; i++) {
        var transitHtml='<li><a target="_blank"  href="liveDetail.html?menuTag=2-&id='+onlineLives[i].id+'">'+
          '<img src="'+onlineLives[i].cover+'!750x563" />  '+
          '<div class="activity">'+
            '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
            '<span class="vm">'+onlineLives[i].title+'</span></p>'+
            '<span>'+timesReview(onlineLives[i].created_at,ret.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(onlineLives[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(onlineLives[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
          '</li>'
        if(onlineLives[i].status=="1"){
            onlinHtml+=transitHtml;
        }else{
           preVideoHtml+=transitHtml;
        }
         
      }
      if(preVideoHtml==""){
        $("#js-liveList-pre").parent().prev().hide();
      }else if(onlinHtml==""){
        $("#js-liveList-ing").parent().prev().hide();
      }
      $("#js-liveList-ing").html(onlinHtml);
      $("#js-liveList-pre").html(preVideoHtml);
    }else{
       $("#js-liveList-ing").parent().prev().hide();
       $("#js-liveList-pre").parent().prev().hide();
    }
    
    //le video
    var lsLivesHtml="";
    if(lsLives.length>0){
       for (var i = 0; i < lsLives.length; i++) {
          lsLivesHtml+='<li><a target="_blank" href="liveDetail.html?dtype=3&menuTag=2-&id='+lsLives[i].id+'">'+
              '<img src="'+lsLives[i].live_cover+'!750x563" />  '+
              '<div class="activity">'+
                '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
                '<span class="vm">'+lsLives[i].live_name+'</span></p>'+
                '<span>'+timesReview(lsLives[i].created_at,ret.current_time)+'</span>'+
                '<div class="fr">'+
                  '<img src="assets/images/icon/icon-see.png" />'+
                  '<span  class="watch_num">'+commonCla.cWan(lsLives[i].watch_num)+'</span>'+
                  '<img src="assets/images/icon/icon-like.png" />'+
                  '<span class="like_num">'+commonCla.cWan(lsLives[i].like_num)+'</span>'+
                '</div>'+
              '</div></a>'+
            '</li>'

        };
        $("#js-liveList-le").html(lsLivesHtml);
    }else{
       $("#js-liveList-le").parent().prev().hide();
    }
    
    //replay
    var replayLivesHtml="";
    for (var i = 0; i < replayLives.length; i++) {
      replayLivesHtml+='<li><a target="_blank" href="liveDetail.html?menuTag=2-&id='+replayLives[i].id+'">'+
          '<img src="'+replayLives[i].cover+'!750x563" />  '+
          '<div class="activity">'+
            '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
            '<span class="vm">'+replayLives[i].title+'</span></p>'+
            '<span>'+timesReview(replayLives[i].created_at,ret.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(replayLives[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(replayLives[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
    };
    $("#js-liveList-back").append(replayLivesHtml);
  },
  getLiveData:function(){
    var current_count=$("#js-liveList-back li").length;
    var url=host+"/live?current_count="+current_count+"&count=8";
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
        liveList.initLiveDom(ret);
      }
    })

  },
  initLivePage:function(){
    liveList.getLiveData();
  }
}
var livesDetail={
  getVedioData:function(){
    var dtype=commonCla.analyzParams("dtype");
    if(dtype==3){
      var url=host+"/lsLive/"+commonCla.analyzParams("id");
      commonCla.ajaxCommonFun(url,"get",function(ret){
        if(ret.code=="200"){
          livesDetail.initLsLiveDom(ret);
          livesDetail.initLsRecommend(ret);        
        }else{
          $(".xingx_cons").html("<div class='tc'><img src='assets/images/404.png'/></div>");
        }
      })
      
    }else{
      var url=host+"/live/"+commonCla.analyzParams("id");
      commonCla.ajaxCommonFun(url,"get",function(ret){
        if(ret.code=="200"){
          livesDetail.initLiveDom(ret);
          //执行
            var timeDiff=dateDiff('T',bTime,eTime);
            var bTime=ret.current_time.replace(/-/g,"/");
            var eTime=ret.data.created_at.replace(/-/g,"/");
            if(timeDiff>0){
              var Go = window.setInterval(function () {   
               commonCla.initJcountdown(bTime,eTime,"countdown");
              },60000)
            }
            
        }else{
          $(".xingx_cons").html("<div class='tc'><img src='assets/images/404.png'/></div>");
        }
      })
       var url2=host+"/live/"+commonCla.analyzParams("id")+"/liveRecommend"
      commonCla.ajaxCommonFun(url2,"get",function(ret){
        if(ret.code==200){
          livesDetail.initRecommend(ret)
        }else{
          $(".recommendCon").prev().hide();
        }
      })
    }
    
   
  },
  initLsLiveDom:function(ret){
     $(document).attr("title",ret.data.live_name);//修改title值
     var liveStatus=ret.data.lsLive.live_status;
     $("#hide_info").attr("cover",ret.data.lsLive.live_cover);
      $(".star_info").hide();
      //直播无商品
      $(".prodList").hide();
      $(".labels").hide();

      if(liveStatus==3){
        $("#player-pre").hide();
        $("#player").show();
        $("#player-live").hide();
         var player = new CloudVodPlayer();
         player.init({uu:"nnakh40hbq",vu:ret.data.lsLive.mms_id,pic:ret.data.lsLive.live_cover,autoSize:1,pu:"1655aeb1f1"},"player");
      }else{
        $(".video_bg").attr("src",ret.data.live_cover);
        $(".video_span").html("直播结束").show();
        $(".countdown").hide();
        $("#player").hide();
      }

      $(".video_tit").html(ret.data.lsLive.live_name);
      $(".user_desc .user_name p").eq(0).html(ret.data.lsLive.cp_name);
      $(".user_desc .head_pic").attr("src","assets/images/fasionicon.png");
      $(".follow_num").html("23.6万");
      $(".likes .like_num").html(commonCla.cWan(ret.data.lsLive.like_num));
      $(".likes .watch_num").html(commonCla.cWan(ret.data.lsLive.watch_num));
      $(".video_content").html("");

      $(".times").html(timesReview(ret.data.lsLive.created_at,ret.current_time))


  },
  initLiveDom:function(ret){
    $(document).attr("title",ret.data.title);//修改title值
    var liveStatus=ret.data.status;
    $("#hide_info").attr("cover",ret.data.cover);
    if(liveStatus==-1 || liveStatus==3 || liveStatus==0){
      $("#player").hide();
      if(ret.data.cover_video!=""){
        var cover_video="<video controls poster='"+ret.data.cover+"'  style='width:100%;height:560px;' src='"+ret.data.cover_video+"'></video>"
       $("#player-pre").append(cover_video);
      }else{
        $(".video_bg").attr("src",ret.data.cover)
      }
      if(liveStatus==0){
        $(".video_span").html("直播结束").show();
        $(".countdown").hide();
      }
      $("#player-pre").show();
      var bTime=ret.current_time.replace(/-/g,"/");
      var eTime=ret.data.created_at.replace(/-/g,"/")
      var timeDiff=dateDiff('T',bTime,eTime);
      if(timeDiff>0){
        commonCla.initJcountdown(bTime,eTime,"countdown");
      }else{
         $("#countdown").parent().hide();
         $(".video_span").html("直播即将开始");
         $(".video_span").show();
      }
      

    }else if(liveStatus==1){
      /*$(".video_bg").hide();
      $(".video_span").hide();*/
      $("#player-pre").hide();

      if(ret.data.iframe_type==0){
       /* $("#player").hide();
        $("#player-live").show();
        $(".video-js source").attr("src",ret.data.pull_hls);
        $(".video-js").attr("poster",ret.data.cover)*/
        initPlayer("player",ret.data.pull_hls,ret.data.cover)

      }else{
        $("#player").html(ret.data.iframe_code);

      }
      /* var player = new CloudLivePlayer();
     //activityId 请换成自己设置的获得id
      player.init({url:ret.data.pull_hls,pic:ret.data.cover,auto_play:0,auto_size:1,pu:"1655aeb1f1"},"player");*/
    }else if(liveStatus==2){
      $("#player-pre").hide();
      $("#player").show();
      $("#player-live").hide();
      if(ret.data.iframe_type==0){
          if(ret.data.replay_url!="" && ret.data.replay_url!=null){
            var videosHtml='<video width="100%" loop="loop" src="'+ret.data.replay_url+'" controls="controls">'+
                    　　'<source type="video/mp4" src="images/xnps.mp4" -webkit-playsinline=true>'+
                    '</video>'
             $("#player").html(videosHtml);
          }else{
            //var player = new CloudVodPlayer();
            //player.init({uu:"nnakh40hbq",vu:ret.data.vuid,pic:ret.data.cover,autoSize:2,pu:"1655aeb1f1"},"player");
            initReplayer("player",ret.data.replay_url,ret.data.cover)
        }
      }else{
        $("#player").show();
        $("#player-live").hide();
        $("#player").html(ret.data.iframe_code);
      }    
  }
      
    /*$(".video_banner video").attr("src",ret.data.pull_hls);
    $(".video_banner video").attr("poster",ret.data.cover);*/
    $(".video_tit").html(ret.data.title);
    $(".user_desc .user_name p").eq(0).html(ret.data.user.name);
    $(".user_desc .head_pic").attr("src",ret.data.user.head_pic);
    $(".follow_num").html(commonCla.cWan(ret.data.user.followers_count));
    
    $(".likes .like_num").html(commonCla.cWan(ret.data.like_num));
    $(".likes .watch_num").html(commonCla.cWan(ret.data.watch_num));
    $(".video_content").html("");

    $(".times").html(timesReview(ret.data.created_at,ret.current_time))
    var stars=ret.data.stars;
    var dakas=ret.data.dakas;
    if(stars.length>0){
        var stars=ret.data.stars;
        var starsHtml="";
        for (var i = 0; i < stars.length; i++) {
          starsHtml+=' <li>'+
                       '<img src="'+stars[i].head_pic+'" class="head_pic fl" />'+
                       '<div class="stars fl">'+
                          '<p>本档明星</p>'+
                          '<p class="star_name">'+stars[i].name+'</p>'+
                       '</div>'+
                     '</li>'
        }; 
        $(".stars_menu").html(starsHtml);
        window.clearInterval($t); //清楚定时器
        $t=setInterval('autoScroll(".star_info")',3000)//轮换间隔，单位毫秒，下同 
        
        if(dakas.length>0){
          $(".starts_list").prev("img").show();
          var dakasHtml="";
          for (var i = 0; i < dakas.length; i++) {
            dakasHtml+='<div class="swiper-slide">'+
                          '<div class="starCon">'+
                            '<img src="'+dakas[i].head_pic+'" />'+
                            '<p>'+dakas[i].name+'</p>'+
                          '</div>'+
                         '</div>'
            
          };
          $("#js-starList").html(dakasHtml);
        }else{
          $(".starts_list").prev("img").hide();
        }
     
    }else{
      $(".star_info").hide();
    }
    //直播无商品
    $(".prodList").hide();

    /*if(ret.data.web_ad!=null){
      var advHtml='<a href="'+ret.data.web_ad.link+'"> <img class="mt20" src="'+ret.data.web_ad.cover+'" /></a>'
      $("#js_adv").html(advHtml);
    }*/

    //标签
    var labels=ret.data.labels;
    if(labels.length>0){
       var labelHtml="";
       for (var i = 0; i < labels.length; i++) {
        labelHtml+="<span class='label'>"+labels[i].name+"</span>"
       };
       $(".labels_con").html(labelHtml)
    }else{
      $(".labels").hide();
    }
    
  },
  initRecommend:function(ret){
    var videolist=ret.data;
    var videolistHtml="";
    for (var i = 0; i < videolist.length; i++) {
      videolistHtml+='<li><a href="liveDetail.html?menuTag=2-&id='+videolist[i].id+'">'+
          '<img src="'+videolist[i].cover+'!750x563" />  '+
          '<div class="activity">'+
           '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
           '<span class="vm">'+videolist[i].title+'</span></p>'+
            '<span>'+timesReview(videolist[i].created_at,ret.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(videolist[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(videolist[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
      
    };
    $("#js-livesList").html(videolistHtml);
  },
  initLsRecommend:function(ret){
    var videolist=ret.data.relatedLives;
    var videolistHtml="";
    for (var i = 0; i < videolist.length; i++) {
      videolistHtml+='<li><a href="liveDetail.html?menuTag=2-&id='+videolist[i].id+'">'+
          '<img src="'+videolist[i].live_cover+'!750x563" />  '+
          '<div class="activity">'+
           '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'+
           '<span class="vm">'+videolist[i].live_name+'</span></p>'+
            '<span>'+timesReview(videolist[i].created_at,ret.current_time)+'</span>'+
            '<div class="fr">'+
              '<img src="assets/images/icon/icon-see.png" />'+
              '<span  class="watch_num">'+commonCla.cWan(videolist[i].watch_num)+'</span>'+
              '<img src="assets/images/icon/icon-like.png" />'+
              '<span class="like_num">'+commonCla.cWan(videolist[i].like_num)+'</span>'+
            '</div>'+
          '</div></a>'+
        '</li>'
      
    };
    $("#js-livesList").html(videolistHtml);
  },
  initLivePage:function(){
    livesDetail.getVedioData();
      $(".share_sina").click(function(){
      newsDetail.shareTip("sina",$(".video_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })
      $(".share_qq").click(function(){
        newsDetail.shareTip("zone",$(".video_tit").html(),encodeURIComponent(window.location.href),$("#hide_info").attr("cover"))
      })
     var swiper = new Swiper('.swiper-container-stars', {
        initialSlide :0,
        slidesPerView:5,
        slidesPerGroup:5,
        loop:false,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
  }
}

//pic
var picList={
  getPicData:function(){
    var current_count=$("#masonry .box").length;
    var id=commonCla.analyzParams("tagid");
    var dtype=commonCla.analyzParams("dtype");
    if(dtype=="all"){
      var url=host+"/picture/home?current_count="+current_count+"&count=15";
    }else{
      var url=host+"/picture/"+id+"/tagList?current_count="+current_count+"&count=15";
    }
   
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
        if(ret.data.page_data.length>0){
          picList.initPicDom(ret);
          //初始化masonry
           var $container = $('#masonry');
            $container.imagesLoaded(function() {
                $container.masonry(masonryOptions);
             });
          //$('#masonry').masonry().masonry('reloadItems');
          
          
        }else{
          $(".nodata").css("visibility","visible");
          setTimeout(function(){
           $(".nodata").css("visibility","hidden");
          },60000)
        }
        
      }
    })
  },
  initPicDom:function(ret){
    var picData=ret.data.page_data;
    var current_count=$("#masonry .box").length;
    var html=""
    for (var i = 0; i < picData.length; i++) {
      html+='<div class="box" bid="'+picData[i].id+'">'+
      '<a target="_blank" href="picDetail.html?menuTag=3-&tagid='+commonCla.analyzParams("tagid")+
      '&pid='+picData[i].id+'&curid='+(current_count+i)+'&total='+ret.data.total+'"><img src="'+picData[i].cover+'!375x0"></a></div>'
    };
    var el=$(html);
    $("#masonry").append(el).masonry( 'appended', el, true );
    
  },
  initPicPage:function(){
    picList.getPicData();
  }
}
var picDetail={
  initGoodList:function(ret){
   var goodsHtml="";
   var goodlist=ret.data;
   for (var i = 0; i < goodlist.length; i++) {
      goodsHtml+='<div class="swiper-slide">'+
                         ' <div class="goodCon" gid="'+goodlist[i].id+
                              '" shref="'+goodlist[i].goods_detail_url+'">'+
                              '<img src="'+goodlist[i].goods_pic+'" />'+
                               '<p class="good_name">'+goodlist[i].goods_name.substr(0,30)+'</p>'+
                               '<p class="col_red">￥'+goodlist[i].goods_price+'</p>'+
                          '</div>'+
                     ' </div>'
      
   };
   $("#js-goodsList").html(goodsHtml);
  },
  getGoodTags:function(id){
    var url=host+"/picture/taobaoTags?id="+id;
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
        picDetail.initGoodList(ret);
        
        var good_swiper2 = new Swiper('.swiper-container-goods', {
            initialSlide :0,
            initialSlide :0,
            slidesPerView:5,
            slidesPerGroup:5,
            loop:false,
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        if(ret.data.length<=5){
          $(".good_main .swiper-button-next").hide();
          $(".good_main .swiper-button-prev").hide();
        }else{
           $(".good_main .swiper-button-next").show();
          $(".good_main .swiper-button-prev").show();
        }
      }
    })
  },
  getDetailData:function(){
     var tag_id=commonCla.analyzParams("tagid");
     var id=commonCla.analyzParams("pid");
     var curid=commonCla.analyzParams("curid");
     var total=commonCla.analyzParams("total");
     var dtype=commonCla.analyzParams("dtype");
     var picId=commonCla.analyzParams("picId");
    if(tag_id=="" || tag_id==undefined){
      var params=""
      if(total-curid>curid){
        params="current_count="+curid;
      }else{
        params="from_id="+(curid-1);
      }
      var url=host+"/picture/home?"+params;
    }else if(dtype=="star"){
       var url=host+"/picture/"+picId;
     }else{
      var url=host+"/picture/"+id+"/detail?tag_id="+tag_id;
    } 
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
        if(tag_id=="" || tag_id==undefined){
        picDetail.initDetailDom(ret.data.page_data);
        }else{
          picDetail.initDetailDom(ret.data);
        }
      $("#hide_info").attr("total",ret.data.total);
      }

    })
  },
  initDetailDom:function(ret){
    var picHtml="";    
    var base_height=500;
    var auto_width=0;
    var detailList=ret;
    for (var i = 0; i < detailList.length; i++) {
    auto_width=Number(500/detailList[i].height*detailList[i].width).toFixed(1);
    var tags=detailList[i].attachment_goods_tags;
    var tagHtml="";
    for (var a = 0; a < tags.length; a++) {
      var left=tags[a].offset_x/detailList[i].width*100+"%";
      var top=tags[a].offset_y/detailList[i].height*100+"%";
      tagHtml+='<img goodid='+tags[a].id+' src="assets/images/icon/icon_tag.png" class="good_tag" style="top:'+top+
               '; left:'+left+';"/>'
    };
    var id=commonCla.analyzParams("pid");
    var cur_tag="";
    if(id==detailList[i].id){
      cur_tag="cur"
    }
    picHtml+='<div class="swiper-slide '+cur_tag+'">'+
              '<div class="picCon" style="width:'+auto_width+'px;height:'+base_height+'px;" '+
               's_width='+detailList[i].width+
               ' s_height='+detailList[i].height+'>'+
               '<img src="'+detailList[i].cover+'"/>'+
                tagHtml+
               '</div>'+
              '</div>'
      
    };
    $("#js-picList").html(picHtml)
  },
  initDetailPage:function(){
     picDetail.getDetailData();
     var swiper = new Swiper('.swiper-container-pics', {
        initialSlide :$("#js-picList > .cur").index(),
        loop:false,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        onTransitionStart: function(swiper){
        $(".good_main").hide();
        $("body").scrollTop(0);
      }
    });
     $("#js-picList").on("click",".good_tag",function(){
      var goodid=$(this).attr("goodid");
       picDetail.getGoodTags(goodid);
       $(".good_main").show();
       $("body").scrollTop(200);
     })
      $("#js-goodsList").on("click",".goodCon",function(){
         var prodlink=$(this).attr("shref");
         window.BC_SDK.goTaoke({
                tkUrl : prodlink,
                params : {
                  pid: "mm_122511581_24602349_83026078", // 淘客必填
		  target:"_blank",
                }
         });
      })
     
  }
}

var billBoard={
  changeColor:function(rose,trend){
      var roseStr="";
       if(trend==2){
           roseStr ='<span class="col_red">+'+rose+'%</span>'
         }else if(trend==3){
           roseStr ='<span class="col_green">-'+rose+'%</span>'
         }else{
          roseStr ='<span class="col_grey">+'+rose+'%</span>'
         }
        return roseStr;
    },
   initplatForm:function(board_id,time_id){
      var url=host+"/boards?type=1&board_id="+board_id;
      var platHtml="";
      commonCla.ajaxCommonFun(url, "get", function(resultData){
        platform=resultData.data.platforms;
         //初始化平台
           for (var i = 0; i < platform.length; i++) {
             if(i==0){
                platHtml+="<li class='cur' typeid='"+platform[i].platform.id+"'>"+platform[i].platform.name+
                          "<img class='icon_cur' src='assets/images/icon/icon-bottom-dist.png'></li>"
              }else{
                platHtml+="<li typeid='"+platform[i].platform.id+"'>"+platform[i].platform.name+
                          "<img class='icon_cur' src='assets/images/icon/icon-bottom-dist.png' style='display:none'></li>"
              }  
           }
           $("#js-platTab ul").html(platHtml);
           var plat_id=$("#js-platTab .cur").attr("typeid");
           //初始化
            billBoard.getBoardData(plat_id,board_id,time_id);
      })
    },
   initMenuList:function(){
      var type = 1;
      //var type=3;
      var url=host+"/boards?type="+type;
      commonCla.ajaxCommonFun(url, "get", function(resultData){
        if (resultData != null) {
           var background_pic="";
           var platHtml=""; 
           var boardsHtml="";
           var boardData=resultData.data.boards;
           var platform=resultData.data.platforms;
           if(boardData[0].user==null || boardData[0].user.star.background_pic=="" ){
              background_pic="assets/images/bannerDefault.png";
            }else{
              background_pic=boardData[0].user.star.background_pic+'!750x563';
            }
            $(".background-img").html("<img src='"+background_pic+"' width='100%'/>")
           for (var i = 0; i < boardData.length; i++){
            if(i==0){
              boardsHtml+='<li class="cur" boardid="'+boardData[i].id+'"><img cursrc="assets/images/icon/b'+Number(i+1)+'_r.png" dsrc="assets/images/icon/b'+Number(i+1)+'.png" src="assets/images/icon/b'+Number(i+1)+'_r.png" height="50" width="50" class="vm board_pic" />'+
                      '<span>'+boardData[i].name+'</span>'+
                      '<img class="icon_cur" src="assets/images/icon/icon-left-dist.png"></li>'
            }else{
              boardsHtml+='<li boardid="'+boardData[i].id+'"><img cursrc="assets/images/icon/b'+Number(i+1)+'_r.png" dsrc="assets/images/icon/b'+Number(i+1)+'.png" src="assets/images/icon/b'+Number(i+1)+'.png" height="50" width="50" class="vm board_pic" />'+
                      '<span>'+boardData[i].name+'</span>'+
                      '<img class="icon_cur" src="assets/images/icon/icon-left-dist.png" style="display:none"></li>'
            }
              
           };
           $("#js-boardTab ul").html(boardsHtml);
           
           //初始化平台
           for (var i = 0; i < platform.length; i++) {
             if(i==0){
                platHtml+="<li class='cur' typeid='"+platform[i].platform.id+"'>"+platform[i].platform.name+
                          "<img class='icon_cur' src='assets/images/icon/icon-bottom-dist.png'></li>"
              }else{
                platHtml+="<li typeid='"+platform[i].platform.id+"'>"+platform[i].platform.name+
                          "<img class='icon_cur' src='assets/images/icon/icon-bottom-dist.png' style='display:none'></li>"
              }  
           }
           $("#js-platTab ul").html(platHtml);
        }

      })
    },
    initDialogHtml:function(singleData){
          var influence_roseSli=billBoard.changeColor(singleData.influence_rose,singleData.influence_trend);
          var read_roseSli=billBoard.changeColor(singleData.read_rose,singleData.read_trend);
          var like_roseSli=billBoard.changeColor(singleData.like_rose,singleData.like_trend);
          var follower_roseSli=billBoard.changeColor(singleData.follower_rose,singleData.follower_trend);
          var board_roseSli=billBoard.changeColor(singleData.board_rose,singleData.board_trend)
          var share_roseSli=billBoard.changeColor(singleData.share_rose,singleData.share_trend);
          var comment_roseSli=billBoard.changeColor(singleData.comment_rose,singleData.comment_trend);
          var search_roseSli=billBoard.changeColor(singleData.search_rose,singleData.search_trend);
          
          var platform_id=singleData.platform_id;
          var boardHtml="";
          var time_mark="";
          if($("#js-switchTab-time .cur").index()==0){
            time_mark="日"
          }else if($("#js-switchTab-time .cur").index()==1){
            time_mark="周"
          }else{
            time_mark="月"
          }
          
          if(platform_id==2){
             boardHtml="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"打榜量</span>"+
              "<span>"+commonCla.cWan(singleData.board_num)+"</span>"+
             " <span>"+board_roseSli+"</span"+
            "</li>"
          }
          var li_yxl="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"影响力</span></span>"+
             " <span>"+commonCla.cWan(singleData.influence)+"</span>"+
             " <span>"+influence_roseSli+"</span>"+
            "</li>"

          var li_readSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"阅读量</span>"+
              "<span>"+commonCla.cWan(singleData.read)+"</span>"+
             " <span>"+read_roseSli+"</span>"+
            "</li>"
          var li_likeSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"点赞量</span>"+
              "<span>"+singleData.like+"</span>"+
             " <span>"+like_roseSli+"</span>"+
            "</li>"
          var li_followSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"粉丝量</span>"+
              "<span>"+commonCla.cWan(singleData.follower)+"</span>"+
             " <span>"+follower_roseSli+"</span>"+
            "</li>";
           var li_commentSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"评论量</span>"+
              "<span>"+commonCla.cWan(singleData.comment)+"</span>"+
             " <span>"+comment_roseSli+"</span>"+
            "</li>";
            var li_shareSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"转发量</span>"+
              "<span>"+commonCla.cWan(singleData.share)+"</span>"+
             " <span>"+share_roseSli+"</span>"+
            "</li>";
            var li_searchSli="<li>"+
              "<img src='assets/images/icon/icon-dian.png'/><span>"+time_mark+"搜索量</span>"+
              "<span>"+commonCla.cWan(singleData.search)+"</span>"+
             " <span>"+search_roseSli+"</span>"+
            "</li>";

            if(singleData.influence==undefined){
                li_yxl="";
             }
             if(singleData.read==undefined){
              li_readSli="";
            }
            if(singleData.like==undefined){
            li_likeSli="";
            }
            if(singleData.follower==undefined){
              li_followSli="";
            }
            if(singleData.comment==undefined){
              li_commentSli="";
            }
            if(singleData.share==undefined){
              li_shareSli="";
            }
            if(singleData.search==undefined){
              li_searchSli="";
            }
          var infohtml="<div class='detail-tit'><span>平台："+singleData.platform.name+"</span>"+
              "<span>分类："+$("#js-boardTab .cur span").html()+"</span>"+
              "</div><ul class='dataDetail'>"+li_yxl +li_readSli+li_likeSli+li_followSli+li_commentSli+li_shareSli+li_searchSli+boardHtml+"</ul>"
          return infohtml;
    },
    initRankCon: function(resultData, listPage, platform_id) {
      var liHtml = ""
      var listDdata = resultData.data.page_data;
      var bannerData = resultData.data.banner;
      var platform_id=Number(platform_id);
      
      var likeStr ="";
      var bannerHtml="";
      var timeMark="";

      var uname = "";var rose="";

      for (var i = 0; i < listDdata.length; i++) {
        if (listDdata[i].star.name != null) {
          uname = listDdata[i].star.name.length > 5 ? listDdata[i].star.name.substr(0,5) + "..." : listDdata[i].star.name;
        }
        //涨幅
        rose=billBoard.changeColor(listDdata[i].influence_rose,listDdata[i].influence_trend);
        var jobStr="";
        if(listDdata[i].star!=null && listDdata[i].star.social_info!=null && listDdata[i].star.social_info!="null"){
          jobStr=listDdata[i].star.social_info.job==undefined?"":listDdata[i].star.social_info.job;
        }
        var influenceStr=commonCla.cWan(listDdata[i].influence);
        //var followerStr=listDdata[i].follower>=10000?Number(listDdata[i].follower/10000).toFixed(1)+"万":listDdata[i].follower;
        var followerStr="<span>粉丝"+commonCla.cWan(listDdata[i].star.user.followers_count)+"</span>";
        
        //排行
       
        var rankNums="<span class='rank-num'>" +Number(listPage+i+1)+ "</span>";
        if(Number(listPage+i+1)>10){
          var rankNums="<span class='rank-num col_black'>" +Number(listPage+i+1) + "</span>";
        }
        var a_url = "";
        var avatar = listDdata[i].star.head_pic == "" ? "assets/images/headPic-default.png" : listDdata[i].star.head_pic;
         var rolesHtml="";
        if(listDdata[i].star.user.roles.length>0){
          //角色删除
          /*rolesHtml="<img src='assets/images/icon-roles/roles_"+listDdata[i].star.user.roles[0]+".png' class='icon_roles' />"*/
          rolesHtml="";
        }
        //区分前三
         var s_rankList="";
         //var s_type= ceremonyMain.analyzParams("type")==undefined?"1": ceremonyMain.analyzParams("type")
        if (i <= 2 && listPage < 10) {
          s_rankList="<li class='tops'>" + "<p class='head-pic'><a target='_blank' href='billDetail.html?uid="+listDdata[i].star.user_id+"'><span class='t-rank-num'><img src='assets/images/n" + Number(i + 1) + ".png' /></span><img class='head-pic-img'  src='" + avatar + "!250x250' />"+rolesHtml+"</a></p>"+
          "<div class='user-name col"+Number(i+1)+"'>" + uname +"<div class='user-follows'>"+followerStr+"</div></div>" + 
          "<div class='follow-num'><span>"+listDdata[i].influence+"</span>" +rose +  "</div>"+
          "<div class='btn_charts'><span class='vm'>数据详情</span><img src='assets/images/icon/icon-data-top.png' class=''></div>"+
          "<!--<img src='assets/images/icon/icon-data-top.png' class='btn_charts' />-->"

        } else {
            s_rankList="<li>" + "<p class='head-pic'><a  target='_blank'  href='billDetail.html?uid="+listDdata[i].star.user_id+"'>"+rankNums+"<img class='head-pic-img'  src='" + avatar + "!250x250' />"+rolesHtml+"</a></p>"+
            "<div class='user-name'>" + uname +"<div class='user-follows'>"+followerStr+"</div></div>" + 
	    "<div class='follow-num'><span>"+listDdata[i].influence+"</span>" +rose +  "</div>"+
            "<div class='btn_charts'><span class='vm'>数据详情</span><img src='assets/images/icon/icon-data-top.png' class=''></div>"+
            "<!--<img src='assets/images/icon/icon-data-top.png' class='btn_charts' />-->"
         
        }
         liHtml += s_rankList+
          "<div class='charts_con'>"+billBoard.initDialogHtml(listDdata[i])+"<div class='da_main'></div></div>"+
          "<input type='hidden' class='uinfo' name='"+listDdata[i].star.name+"' platName='"+listDdata[i].platform.name+
          "' starId='"+listDdata[i].star_id+
          "' platId='"+listDdata[i].platform_id+
          "' platPic='"+listDdata[i].platform.focus_pic+
          "' influence='"+listDdata[i].influence+
          "' influence_rose='"+listDdata[i].influence_rose+
          "' influence_trend='"+listDdata[i].influence_trend+
          "' like_rose='"+listDdata[i].like_rose+
          "' like_trend='"+listDdata[i].like_trend+
          "' like='"+listDdata[i].like+
          "' follower='"+listDdata[i].follower+
          "' follower_rose='"+listDdata[i].follower_rose+
          "' follower_trend='"+listDdata[i].follower_trend+
          "' read_rose='"+listDdata[i].read_rose+
          "' read_trend='"+listDdata[i].read_trend+
          "' read='"+listDdata[i].read+
          "' board_rose='"+listDdata[i].board_rose+
          "' board_trend='"+listDdata[i].board_trend+
          "' board_num='"+listDdata[i].board_num+
          "' share_rose='"+listDdata[i].share_rose+
          "' share_trend='"+listDdata[i].share_trend+
          "' share='"+listDdata[i].share+
          "' comment_rose='"+listDdata[i].comment_rose+
          "' comment_trend='"+listDdata[i].comment_trend+
          "' comment='"+listDdata[i].comment+
          "' search_rose='"+listDdata[i].search_rose+
          "' search_trend='"+listDdata[i].search_trend+
          "' search='"+listDdata[i].search+
          "' background_pic='"+listDdata[i].star.background_pic+
          "' job='"+jobStr+ "'/>"
           "</li>"

      }
      $("#js-rankContainer").append(liHtml);
    },
    getBoardData:function(platform_id,board_id,time_id){
    var listPage=$("#js-rankContainer >li").length;
    var url=host+"/boards/"+board_id+"?platform_id=" +Number(platform_id) + 
              "&type="+time_id+"&current_count=" + listPage 
     commonCla.ajaxCommonFun(url,"get",function(resultData){
        if (resultData != null) {
          $("#js-moreRank").show();
          $("#js-moreRank").html("点击加载更多...");
          if(resultData.data.page_data.length!=undefined &&　resultData.data.page_data.length<=0){
             $("#js-moreRank").html("暂无更多数据");
             setTimeout(function(){
               $("#js-moreRank").html("点击加载更多...");
             },60000)
            
          }else{
             billBoard.initRankCon(resultData, listPage, platform_id);
          }
          var b_pic=$("#js-rankContainer li").eq(0).find("input.uinfo").attr("background_pic");
           //修改封面
           if(b_pic=="" || b_pic==undefined ){
               background_pic=$("#js-rankContainer li").eq(0).find(".uinfo").attr("background_pic");
               $(".background-img").html("<img src='assets/images/bannerDefault.png' width='100%'/>")
            }else{
               $(".background-img").html("<img src='"+b_pic+"!750x563' width='100%'/>")
            }
         
          
        }

      })
    },
    initListPage:function(){
          billBoard.initMenuList();
          var time_id=Number($("#js-switchTab-time .cur").index())+1;
          var plat_id=$("#js-platTab .cur").attr("typeid");
          var board_id=$("#js-boardTab .cur").attr("boardid");
          //初始化
          billBoard.getBoardData(plat_id,board_id,time_id);
          //切换平台
          $("#js-platTab").on("click","li",function(){
            $("#js-rankContainer").html("");
            var time_id=Number($("#js-switchTab-time .cur").index())+1;
            var board_id=$("#js-boardTab .cur").attr("boardid");
            var plat_id=$(this).attr("typeid");
            //切换效果
            $("#js-platTab li").find(".icon_cur").css("display","none");
            $("#js-platTab li").removeClass("cur");
            $(this).find(".icon_cur").css("display","block");
            $("#js-platTab li").removeClass("cur");
            $(this).addClass("cur");
            
            plat_id=$(this).attr("typeid");
            billBoard.getBoardData(plat_id,board_id,time_id);
            
          })
          //切换模块
          $("#js-boardTab").on("click","li",function(){
            $("#js-rankContainer").html("");
            var board_id=$(this).attr("boardid");
            var time_id=Number($("#js-switchTab-time .cur").index())+1;
            var plat_id=$("#js-platTab .cur").attr("typeid");
            //切换效果
            $("#js-boardTab li").find(".icon_cur").css("display","none");
            $("#js-boardTab li").removeClass("cur");
            $(this).find(".icon_cur").css("display","block");
            $.each($("#js-boardTab li"),function () {
                $(this).find(".board_pic").attr("src",$(this).find(".board_pic").attr("dsrc"));
             })
            
            $(this).find(".board_pic").attr("src",$(this).find(".board_pic").attr("cursrc"));
            $("#js-boardTab li").removeClass("cur");
            $(this).addClass("cur");
            //初始化platform
            billBoard.initplatForm(board_id,time_id);
            
            

          })
          //切换时间
          $("#js-switchTab-time").on("click","li",function(){
            $("#js-rankContainer").html("");
            $("#js-switchTab-time li").removeClass("cur");
            $(this).addClass("cur");
            var time_id=Number($(this).index())+1;
            var plat_id=$("#js-platTab .cur").attr("typeid");
            var board_id=$("#js-boardTab .cur").attr("boardid");
            billBoard.getBoardData(plat_id,board_id,time_id);
          })
          //更多
          $("#js-moreRank").click(function(){
            var time_id=Number($("#js-switchTab-time .cur").index())+1;
            var plat_id=$("#js-platTab .cur").attr("typeid");
            var board_id=$("#js-boardTab .cur").attr("boardid");
            billBoard.getBoardData(plat_id,board_id,time_id);
          })
          //展示折线图
          $("#js-rankContainer").on("click",".btn_charts",function(){
            var chartsHtml= "<div class='daCharts'>"+
              "<div id='main' class='main' style='height:180px'></div>"+
              "</div>"+
              "<div class='da_date'>"+
               " <div class='s-container'>"+
                        "<div class='s-wrapper'>"+
                            "<div class='s-slide'></div>"+
                        "</div>"+
                        "<div class='btn-next btn-disabled'></div>"+
                        "<div class='btn-prev'></div>"+
                  "</div>"+
                  "<p class='da_tips'>因数据核算，每日24点产出昨日数据</p>"+
                   "<div class='da_header'>"+
                   "<ul>"+
                     "<li class='cur' num='7'>近7日</li>"+
                     "<li num='30'>近30日</li>"+
                   "</ul>"+
                "</div>"+
             " </div>"
            
            
            
            if($(this).next(".charts_con").css("display")=="none"){
              $(".btn_charts").next(".charts_con").hide();
              $(".btn_charts").next(".charts_con").find(".da_main").html("");
              $(this).next(".charts_con").find(".da_main").html(chartsHtml);
              $(this).next(".charts_con").show();
              var star_id=$(this).parent().find(".uinfo").attr("starid");
              var plat_id=$("#js-platTab .cur").attr("typeid");
              initChart(star_id,plat_id);
	      $(".btn_charts").find("img").attr("src","assets/images/icon/icon-data-top.png");
              $(this).find("img").attr("src","assets/images/icon/icon-data-bottom.png");
            }else{
              $(this).next(".charts_con").find(".da_main").html("");
              $(this).next(".charts_con").hide();
	      $(".btn_charts").find("img").attr("src","assets/images/icon/icon-data-top.png");
            }

          })
    }
}

var boardDetail={
   initUser:function(ret){
    $("#js-works-list").html("");
    var person_desc="";
    if(ret.data.description.length<200){
        person_desc=ret.data.description;
        $("#js_more_desc").hide();
    }else{
      person_desc=ret.data.description.substr(0,200)+"...";
       $("#js_more_desc").show();
    }
    $(".person_desc_con").html(person_desc==""?'<div class="tc mt30 mb30">暂无数据</div>':person_desc);
    $(".person_desc input").attr("desc",ret.data.description);

     var social_info=ret.data.social_info;
     var is_Null=false;
     for(var key in social_info){
      if(social_info[key]==null){
        social_info[key]="无";
      }else{
          if(key=="alias" || key=="born_date" || key=="company"|| key=="country"|| key=="en_name"|| key=="job"|| key=="nation"){
            is_Null=true;
          }
         
      }
     }
     if(social_info!=null && is_Null){
      var social_infoHtml="";
     var en_name=social_info.en_name==null || social_info.en_name=="无"?"":social_info.en_name;
     var jobs=social_info.job==null?"":social_info.job;
     var baseHtml='<pre class="desc">'+ret.data.description+'</pre>'+
                  '<table>'+
                      '<tr>'+
                          '<td>中文名</td>'+
                          '<td>'+social_info.real_name+'</td>'+
                          '<td>外文名</td>'+
                          '<td>'+en_name+'</td>'+
                      '</tr>'+
                       '<tr>'+
                          '<td>别名</td>'+
                          '<td>'+social_info.alias+'</td>'+
                          '<td>国籍</td>'+
                          '<td>'+social_info.country+'</td>'+
                      '</tr>'+
                      '<tr>'+
                          '<td>民族</td>'+
                          '<td>'+social_info.nation+'</td>'+
                          '<td>出生日期</td>'+
                          '<td>'+social_info.born_date+'</td>'+
                      '</tr>'+
                      '<tr>'+
                          '<td>职业</td>'+
                         ' <td>'+jobs.replace(/，/g, "/").replace(/、/g, "/")+'</td>'+
                          '<td>经纪公司</td>'+
                          '<td>'+social_info.company+'</td>'+
                      '</tr>'+
                  '</table>'
     $("#js-baseDesc").html(baseHtml)
     $("#js-experience").html("<pre>"+ret.data.act_experience+"</pre>");
     $(".p_desc").find("h1").html("<span class='mr20'>"+social_info.real_name+"</span>"+en_name);
     $(".p_nation").html(social_info.country);
     $(".p_job").html(jobs.replace(/，/g, "/").replace(/、/g, "/"));
     }else{
      $("#js-baseDesc").html('<div class="tc mt30 mb30">暂无数据</div>');
      $("#js-experience").html('<div class="tc mt30 mb30">暂无数据</div>');
     }
     

     //作品
    var works=ret.data.works;
    var typelist=["参演电影","参演电视剧","音乐专辑","音乐单曲","综艺节目","摄影作品","设计作品","美妆作品","造型作品","秀场作品","其他作品"]
    //初始化主要作品类型
    var workTypes=""
    for(var key in works){
       workTypes+='<li keytag='+key+'>'+typelist[key-1]+'</li>';
       var worksHtml="";
       for (var i = 0; i <works[key].length; i++) {
          var roles=""
          if(works[key][i].role!=""){
             roles='<p class="role">饰演：'+works[key][i].role+'</p>'
          }
          var workCover=works[key][i].cover==null?"assets/images/defalut_cover.png":works[key][i].cover
          if(key!=4 && key!=5){
            worksHtml+='<li>'+
                        '<img class="film_cover" src="'+workCover+'" >'+
                        '<div class="film_name"><p>'+works[key][i].title+'</p>'+roles+'</div>'+
                       '</li>'
          }else if(key==4){
            worksHtml+='<li><p class="music_name"><span>'+works[key][i].title+
                       '</span><span class="times">'+works[key][i].publish_time+
                       '</span></p><p class="music_desc">'+works[key][i].introduction+'</p></li>';
          }else if(key==5){
             worksHtml+='<tr><td>'+works[key][i].publish_time+'</td><td>'+works[key][i].title+'</td><td>'+works[key][i].introduction+'</td></tr>'
          }
        };
        if(key==5){
           $("#js-works-list").append('<table  class="works_con" id="workCon'+key+'" style="display:none"><tr><th>播出时间</th><th>节目名称</th><th>简介</th></tr>'+worksHtml+'</table>');
        }else{
           $("#js-works-list").append('<ul class="works_con" id="workCon'+key+'" style="display:none">'+worksHtml+'</ul>');
        }
       
    }
    $("#js-works-tit").html(workTypes);
    $("#js-works-tit").find("li").eq(0).addClass("cur");
    $("#js-works-list").find("ul").eq(0).show();
      
    //代表作
    //$("#js-worksCon").html(worksHtml)
   },
   getUserData:function(){
    //他人中心
    var url=host+"/user/"+commonCla.analyzParams("uid");
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code="200"){
        $(".personal_header").find(".p_header").attr("src",ret.data.head_pic);
        $(".p_desc").find("h1").html("<span class='mr20'>"+ret.data.name+"</span>");
      }
      //简介
      var desc_url=host+"/user/"+commonCla.analyzParams("uid")+"/introductions";
      commonCla.ajaxCommonFun(desc_url,"get",function(ret){
        boardDetail.initUser(ret);
      })
      
    })
    
   },
   getMediaData:function(type){
     var url="";var caseId="";var all_caseId=""
     var real_name=$(".personal_header").find("h1 span").html();

     //个人头条
     var icon_play='<img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">';
     if(type=="news"){
      /*url=host+"/user/"+commonCla.analyzParams("uid")+"/article";*/
      url=host+"/search/news";
      caseId="#js-newsList";
      all_caseId="#js-news-all"
      icon_play="";
     }else if(type=="video"){
      /*url=host+"/user/"+commonCla.analyzParams("uid")+"/videos";*/
      url=host+"/search/video";
      caseId="#js-videoList";
      all_caseId="#js-video-all"
    }else if(type=="live"){
      /*url=host+"/user/"+commonCla.analyzParams("uid")+"/lives";*/
      url=host+"/search/live";
      caseId="#js-liveList";
      all_caseId="#js-live-all"
    }
    var listpage=$(all_caseId+" li").length;
     var params={
        "key_word":real_name,
        "current_count":listpage,
        "count":12
      }
    commonCla.ajaxCommonFun(url,"get",function(ret){
       if(ret.code=="200"){
         if(ret.data.page_data.length>0){
           var pageData=ret.data.page_data;
           var news_short="";
           var news_all="";
           for (var i = 0; i < pageData.length; i++) {
            var tempHtml='<li><a href="'+type+'Detail.html?menuTag=0-&id='+pageData[i].id+'">'+
                             '<img src="'+pageData[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p>'+icon_play+
                                '<span class="vm">'+pageData[i].title+'</span>'+
                               '</p><span>'+timesReview(pageData[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(pageData[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(pageData[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
            if(i<4){news_short+=tempHtml;}
             news_all+=tempHtml;
           };
           $("#con1").find(caseId).html(news_short);
           $(all_caseId).prepend(news_all);
           if(pageData.length<=4){
             $("#con1").find(caseId).parent().prev().find("span.fr").hide();
           }

         }else{
            $("#con1").find(caseId).parent().prev().hide();
            $(all_caseId).find(".moreData").html("暂无更多数据");
            setTimeout(function(){
              $(all_caseId).find(".moreData").html("点击加载更多数据...");
            },60000)
         }
       }
    },params)
   },
   getPicData:function(){
    //个人图集 根据关键字查询
    var real_name=$(".personal_header").find("h1 span").html();
    var url=host+"/picture/search";
    var params={
      "keyword":real_name
    }
    commonCla.ajaxCommonFun(url,"post",function(ret){
      if(ret.code!="200" || ret.data.page_data.length<=0){
        $("#con1").find("#js-picList").parent().prev().hide();
        $("#js-pic-all").html('<div class="tc moreData">暂无数据</div>');
      }else{
        var pageData=ret.data.page_data;
           var news_short="";
           var news_all="";
           var cur_type=""
           for (var i = 0; i < pageData.length; i++) {
            var tempHtml='<li><a href="picDetail.html?tagid='+pageData[i].tag_id+'&picId='+pageData[i].id+'&dtype=star&menuTag=3-">'+
                             '<img src="'+pageData[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p><span class="abs_num">共'+pageData[i].num+'张</span>'+
                                '<span class="vm">'+pageData[i].title+'</span>'+
                               '</p>'+
                                '<!--<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(pageData[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(pageData[i].like_num)+'</span>'+
                                '</div>-->'+
                              '</div>'+
                             '</a></li>'
            if(i<4){news_short+=tempHtml;}
             news_all+=tempHtml;
           };
           $("#con1").find("#js-picList").html(news_short);
           $("#js-pic-all").html(news_all);
           if(pageData.length<=4){
             $("#con1").find("#js-picList").parent().prev().find("span.fr").hide();
           }
      }
    },params)

   },
   getAwardData:function(){
     var url=host+"/user/"+commonCla.analyzParams("uid")+"/awards";
     commonCla.ajaxCommonFun(url,"get",function(ret){
       var awardMain=""; 
       if(ret.code=="200"){
         for (var i = 0; i < ret.data.length; i++) {
          var awardCon="";
          for (var a = 0; a < ret.data[i].data.length; a++) {
            var theTime=ret.data[i].data[a].session;
            if(ret.data[i].data[a].session==null){
               theTime="----"
            }
            var theWork=ret.data[i].data[a].work;
            if(ret.data[i].data[a].work==null){
              theWork="----"
            }
            awardCon+='<tr>'+
                      '<td>'+ret.data[i].data[a].winning_time+'</td>'+
                      '<td>'+theTime+'</td>'+
                      '<td>'+ret.data[i].data[a].name+'</td>'+
                      '<td>'+theWork+'</td>'+
                      '<td>'+ret.data[i].data[a].comment+'</td>'+
                      '</tr>'
          };
           awardMain+='<h1>'+ret.data[i].category+'</h1>'+
                      '<table class="star_awards"><tr><th>获奖时间</th><th>届次</th><th>获奖名称</th>'+
                      '<th>获奖作品</th><th>备注</th></tr>'+awardCon+'</table>'
         };
         $(".personal_cons #con5").html(awardMain);
       }
     })
   },
   getHignest:function(){
    var url=host+"/boards/"+commonCla.analyzParams("uid")+"/highest";
    commonCla.ajaxCommonFun(url,"get",function(ret){
     if(ret.code=="200"){
      var xingxiu=ret.data.xingxiu;
      var highest=ret.data.highest;
      var xingx_rose=billBoard.changeColor(xingxiu.influence_rose,xingxiu.influence_trend);
      var highest_rose=billBoard.changeColor(highest.influence_rose,highest.influence_trend);

      $(".influ_desc .influences").eq(0).html(commonCla.cWan(xingxiu.influence));
      $(".influ_desc .influences").eq(1).html(commonCla.cWan(highest.influence));
      $(".influ_desc .trend").eq(0).html(xingx_rose);
      $(".influ_desc .trend").eq(1).html(highest_rose);
      $(".plat_name").html(highest.platform.name);
      $(".influ_desc #js_rank").html(xingxiu.rank);
      $(".influ_desc #js_rank_high").html(highest.rank);

     }else{
      $("#js-influenceCon").html("<p>暂无数据</p>");
     }
    })
   },
   initDetailDom:function(){

   },
   initDetailPage:function(){
      boardDetail.getUserData();
      boardDetail.getMediaData("news");
      boardDetail.getMediaData("video");
      boardDetail.getMediaData("live");
      boardDetail.getPicData();
      boardDetail.getAwardData();
      boardDetail.getHignest();
      $("#js_person_tab li").click(function(){
        $("#js_person_tab li").find(".icon_cur").hide();
        $("#js_person_tab li").removeClass("cur")
        $(".personal_content").hide();
        $(this).find(".icon_cur").show();
        $(this).addClass("cur");
        $("#con"+Number($(this).index()+1)).show();
      })
      //切换作品类型
      $("#js-works-tit").on("click","li",function(){
         var keytag=$(this).attr("keytag");
         $("#js-works-tit li").removeClass("cur");
         $(this).addClass("cur");
         $("#js-works-list .works_con").hide();
         $("#workCon"+keytag).show();
      })

      //更多简介
      $("#js_more_desc").click(function(){
        if($(this).html().indexOf("更多")>-1){
          $(".person_desc_con").html($(".person_desc input").attr("desc"));
          $(this).html("收起&gt;")
        }else{
          $(".person_desc_con").html($(".person_desc input").attr("desc").substr(0,200)+"...");
          $(this).html("更多&gt;")
        }
      })
      //切换更多资讯
      $("#con3 .info_type").on("click","li",function(){
         $("#con3 .info_type li").removeClass("cur");
         $(this).addClass("cur");
         var relateType=$(this).attr("type");
         $("#con3 .xingx_list ul").hide();
         $("#con3 #js-"+relateType+"-all").show();


      })
      //更多到相关资讯
       $(".type_tit .fr").click(function(){
         
          $("#js_person_tab li").find(".icon_cur").hide();
          $("#js_person_tab li").removeClass("cur")
          $(".personal_content").hide();
          $("#js_person_tab li").eq(2).find(".icon_cur").show();
          $("#js_person_tab li").eq(2).addClass("cur");
          $("#con3").show();

          var cur_index=$(this).attr("curId");
           $("#con3 .info_type li").removeClass("cur");
           $("#con3 .info_type li").eq(cur_index).addClass("cur");
           var relateType= $("#con3 .info_type li").eq(cur_index).attr("type");
           $("#con3 .xingx_list ul").hide();
           $("#con3 #js-"+relateType+"-all").show();
       })
       //相关资讯翻页
       $(".moreData").click(function(){
        var type=$("#con3 .info_type li.cur").attr("type");
        boardDetail.getMediaData(type);
       })
    }
}
var theme={
  getData:function(){
   var id=commonCla.analyzParams("id");
   var url=host+"/theme/"+id+"?count=12";
   commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      theme.initDomAll(ret);
    }
   })
  },
  initDomAll:function(ret){
   var cover=ret.data.cover;
   var description=ret.data.description;
   var watch_num=ret.data.watch_num;
   var title=ret.data.title;
   var lives=ret.data.lives.page_data;
   var news=ret.data.news.page_data;
   var videos=ret.data.videos.page_data;


   $("#js-themeCover").attr("src",cover);
   $(".theme_desc h1").html(title);
   $(".theme_desc .desc_con").html(description);
   $("#js-watch").html(commonCla.cWan(watch_num));

   var livesHtml="";
   if(lives.length>0){
     for (var i = 0; i < lives.length; i++) {
        livesHtml+='<li><a target="_blank" href="liveDetail.html?menuTag=2-&id='+lives[i].id+'">'+
                             '<img src="'+lives[i].cover+'!300x225">'+  
                             '<div class="activity">'+
                               '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26"><!--<span class="abs_num">共'+lives[i].num+'张</span>-->'+
                                '<span class="vm">'+lives[i].title+'</span>'+
                               '</p><span>'+timesReview(lives[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(lives[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(lives[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     livesHtml='<div class="tc mt30 mb30">暂无数据</div>';
    }
   $("#theme_list3").html(livesHtml);
   var videosHtml="";
   if(videos.length>0){
     for (var i = 0; i < videos.length; i++) {
        videosHtml+='<li><a target="_blank" href="videoDetail.html?menuTag=2-&id='+videos[i].id+'">'+
                             '<img src="'+videos[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26"><!--<span class="abs_num">共'+videos[i].num+'张</span>-->'+
                                '<span class="vm">'+videos[i].title+'</span>'+
                               '</p><span>'+timesReview(videos[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(videos[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(videos[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     videosHtml='<div class="tc mt30 mb30">暂无数据</div>';
    }
   $("#theme_list2").html(videosHtml);
   var newsHtml="";
   if(news.length>0){
     for (var i = 0; i < news.length; i++) {
       newsHtml+='<li><a target="_blank" href="newsDetail.html?menuTag=0-&id='+news[i].id+'">'+
                             '<img src="'+news[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p><!--<span class="abs_num">共'+news[i].num+'张</span>-->'+
                                '<span class="vm">'+news[i].title+'</span>'+
                               '</p><span>'+timesReview(news[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(news[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(news[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     newsHtml='<div class="tc mt30  mb30">暂无数据</div>';
    }
   $("#theme_list1").html(newsHtml);
  },
  getMoreData:function(){
    
    var type=$("#js-theme-tit .cur").attr("type");
    var caseid=Number($("#js-theme-tit .cur").index())+1;
    var id=commonCla.analyzParams("id");
    var btn_play='<img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'
    if(caseid==1){
       btn_play=''
    }

    var listpage=$("#theme_list"+caseid+" li").length;
    var count=12;
    if(listpage==96){
      count=4;
    }
    var url=host+"/theme/"+id+"/"+type+"?current_count="+listpage+"&count="+count;
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200" && ret.data.page_data.length>0){
       $(".moreData").html("下拉加载更多...").show();
        var data=ret.data.page_data;
        var moreHtml="";
        var typeTag="";
        if(type!="news"){
          typeTag=type.split("s")[0];
        }else{
          typeTag="news";
        }
        for (var i = 0; i < data.length; i++) {
          moreHtml+='<li><a target="_blank" href="'+typeTag+'Detail.html?menuTag=0-&id='+data[i].id+'">'+
                             '<img src="'+data[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p>'+btn_play+
                                '<span class="vm">'+data[i].title+'</span>'+
                               '</p><span>'+timesReview(data[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(data[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(data[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
        };
        $("#theme_list"+caseid).append(moreHtml);

      }else{
        if(listpage>0){
          $(".moreData").html("暂无数据");
          $(".moreData").show();
        }
        setTimeout(function(){
          $(".moreData").hide();
        },3000)
      }

    })

    
  },
  initPage:function(){
    theme.getData();
    $("#js-theme-tit").on("click","li",function(){
       $(".moreData").hide();
       $("#js-theme-tit li").removeClass("cur");
       $(this).addClass("cur");
       $(".lists").hide();
       $("#js-theme-tit  li").find(".icon_cur").css("display","none");
       $(this).find(".icon_cur").css("display","block");
       $("#theme_list"+Number($(this).index()+1)).show();
    })
    $(".share_sina").click(function(){
      newsDetail.shareTip("sina",$(".theme_desc h1").html(),encodeURIComponent(window.location.href),$("#js-themeCover").eq(0).attr("src"))
    })
    $(".share_qq").click(function(){
      newsDetail.shareTip("zone",$(".theme_desc h1").html(),encodeURIComponent(window.location.href),$("#js-themeCover").eq(0).attr("src"))
    })
}
}

var search={
  getData:function(){
   var keyword=commonCla.analyzParams("keyword");
   var url=host+"/search/act?key_word="+keyword+"&count=12";
   commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      search.initDomAll(ret);
    }
   })
  },
  initDomAll:function(ret){
   var cover=ret.data.cover;
   var description=ret.data.description;
   var watch_num=ret.data.watch_num;
   var title=ret.data.title;
   var lives=ret.data.lives;
   var news=ret.data.news;
   var videos=ret.data.videos;


   $("#js-themeCover").attr("src",cover);
   $(".theme_desc h1").html(title);
   $(".theme_desc .desc_con").html(description);
   $("#js-watch").html(commonCla.cWan(watch_num));

   var livesHtml="";
   if(lives.length>0){
     for (var i = 0; i < lives.length; i++) {
       var abs_status="";
       if(lives[i].status==3){
           abs_status='<span class="abs_num_live">直播预热</span>';
        }else if(lives[i].status==1){
           abs_status="直播中";
        }
        livesHtml+='<li><a target="_blank" href="liveDetail.html?menuTag=2-&id='+lives[i].id+'">'+
                             '<img src="'+lives[i].cover+'!750x563">'+abs_status+
                             '<div class="activity">'+
                               '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26"><!--<span class="abs_num">共'+lives[i].num+'张</span>-->'+
                                '<span class="vm">'+lives[i].title+'</span>'+
                               '</p><span>'+timesReview(lives[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(lives[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(lives[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     livesHtml='<div class="tc mt30 mb30">暂无数据</div>';
    }
   $("#theme_list3").html(livesHtml);
   var videosHtml="";
   if(videos.length>0){
     for (var i = 0; i < videos.length; i++) {
        videosHtml+='<li><a target="_blank" href="videoDetail.html?menuTag=2-&id='+videos[i].id+'">'+
                             '<img src="'+videos[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p><img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26"><!--<span class="abs_num">共'+videos[i].num+'张</span>-->'+
                                '<span class="vm">'+videos[i].title+'</span>'+
                               '</p><span>'+timesReview(videos[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(videos[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(videos[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     videosHtml='<div class="tc mt30 mb30">暂无数据</div>';
    }
   $("#theme_list2").html(videosHtml);
   var newsHtml="";
   if(news.length>0){
     for (var i = 0; i < news.length; i++) {
       newsHtml+='<li><a target="_blank" href="newsDetail.html?menuTag=0-&id='+news[i].id+'">'+
                             '<img src="'+news[i].cover+'!750x563">'+  
                             '<div class="activity">'+
                               '<p><!--<span class="abs_num">共'+news[i].num+'张</span>-->'+
                                '<span class="vm">'+news[i].title+'</span>'+
                               '</p><span>'+timesReview(news[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(news[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(news[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
      };
    }else{
     newsHtml='<div class="tc mt30 mb30">暂无数据</div>';
    }
   $("#theme_list1").html(newsHtml);
    /*$('img').error(function(){
    $(this).attr('src',"assets/images/defalut_cover2.png");
     })*/
   var curId=$("#js-theme-tit").find(".cur").index()+1;
   if($("#theme_list"+curId+" li").length>=12){
      $(".moreData").html("点击加载更多");
   }else{
      if($("#theme_list"+curId+" li").length>=0 && $("#theme_list"+curId+" li").length<12){
        $(".moreData").hide();
      }else{
        $(".moreData").html("暂无更多数据");
      }
   }
  },
  getMoreData:function(outType,outCaseid){    
    var type=$("#js-theme-tit .cur").attr("type");
    var caseid=Number($("#js-theme-tit .cur").index())+1;
    if(outType!=undefined){type=outType}
    if(outCaseid!=undefined){caseid=outCaseid}

    var id=commonCla.analyzParams("id");
    var keyword=commonCla.analyzParams("keyword");
    var btn_play='<img class="icon-play" src="assets/images/icon/icon-play.png" height="26" width="26">'
    if(caseid==1){
       btn_play=''
    }

    var listpage=$("#theme_list"+caseid+" li").length;
    if(type=="star"){
      var url=commonCla.hostBase+"/v12/search/star?key_word="+keyword+"&current_count="+listpage+"&count=12";
    }else{
      var url=host+"/search/"+type+"?key_word="+keyword+"&current_count="+listpage+"&count=12";
    } 
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200" && ret.data.page_data.length>0){
       // $(".moreData").html("下拉加载更多...").show();
        var data=ret.data.page_data;
        var moreHtml="";
        if(type=="star"){
          for (var i = 0; i < data.length; i++) {
            var social_info=data[i].social_info==null?"":data[i].social_info;
            /*if(data[i].roles.length>0){if (data[i].roles.contains('2')) {} }else{moreHtml+='<li style="display:none"></li>' }*/
              moreHtml+='<li class="users"><a target="_blank" href="billDetail.html?menuTag=4-&uid='+data[i].user_id+'">'+
                             '<img src="'+data[i].head_pic+'!250x250" class="head_pic">'+  
                             '<div class="fl star_desc"><span class="star_name">'+data[i].name+'</span>'+
                             '<p>职业：'+(social_info.job==undefined?"":social_info.job).replace(/，/g, "/").replace(/、/g, "/")+'</p><p>地区：'+(social_info.country==undefined?"":social_info.country)+
                             '</p></div></a></li>'
          };
        }else{
          for (var i = 0; i < data.length; i++) {
            var abs_status="";
             if(type=="live"){
              if(data[i].status==3){
                 abs_status='<span class="abs_num_live">直播预热</span>';
              }else if(data[i].status==1){
                 abs_status='<span class="abs_num_live">直播中</span>';
              }
             }
          moreHtml+='<li><a target="_blank" href="'+type+'Detail.html?menuTag=0-&id='+data[i].id+'">'+
                             '<img src="'+data[i].cover+'!750x563">'+abs_status+
                             '<div class="activity">'+
                               '<p>'+btn_play+
                                '<span class="vm">'+data[i].title+'</span>'+
                               '</p><span>'+timesReview(data[i].created_at,ret.current_time)+'</span>'+
                                '<div class="fr">'+
                                '<img src="assets/images/icon/icon-see.png"><span class="watch_num">'+commonCla.cWan(data[i].watch_num)+'</span>'+
                                '<img src="assets/images/icon/icon-like.png"><span class="like_num">'+commonCla.cWan(data[i].like_num)+'</span>'+
                                '</div>'+
                              '</div>'+
                             '</a></li>'
     
          };
        }
        $("#theme_list"+caseid).append(moreHtml);
        

      }else{
       if(type=="star"){
        $("#theme_list"+caseid).append('<div class="tc mt30 mb30">暂无数据</div>');
       }
        if($("#js-theme-tit .cur").index()>0){
          $(".moreData").html("暂无更多数据");
        }
        $(".moreData").show();
        setTimeout(function(){
          //$(".moreData").hide();
          $(".moreData").html("点击加载更多");
        },60000)
      }

    })

    
  },
  initPage:function(){
    $("#keyword").html("“"+decodeURI(commonCla.analyzParams("keyword"))+"”")
    search.getMoreData("star","4");
    search.getData();
    $("#js-theme-tit").on("click","li",function(){
      var liNum=$("#theme_list"+Number($(this).index()+1)).find("li").length;
      if(liNum>=12){
        $(".moreData").html("点击加载更多").show();
      }else{
        if(liNum<12 && liNum>0){
          $(".moreData").html("暂无更多数据");
        }else{
          $(".moreData").html("点击加载更多").hide();
        }
        
      }
       $("#js-theme-tit li").removeClass("cur");
       $(this).addClass("cur");
       $(".lists").hide();
       $("#js-theme-tit  li").find(".icon_cur").css("display","none");
       $(this).find(".icon_cur").css("display","block");
       $("#theme_list"+Number($(this).index()+1)).show();
    })
    $(".share_sina").click(function(){
      newsDetail.shareTip("sina",$(".theme_desc h1").html(),encodeURIComponent(window.location.href),$("#js-themeCover").eq(0).attr("src"))
    })
    $(".share_qq").click(function(){
      newsDetail.shareTip("zone",$(".theme_desc h1").html(),encodeURIComponent(window.location.href),$("#js-themeCover").eq(0).attr("src"))
    })
 }
}
$(function(){
   initMenu();
   //分享
   $(".qr").click(function(){
      if($(this).find(".tips").css("display")=="none"){
         $(this).find(".tips").slideDown(1000);
       }else{
         $(this).find(".tips").slideUp(1000);
       }
    })
    //区分页面
    var pageType=$("#hide_info").attr("pageType");
    //新闻
    if(pageType=="news"){
     newsDetail.initNewsPage();
    }
    //videos
    if(pageType=="videos"){
        videosDetail.initVideoPage();
    }
    //news list
    if(pageType=="newsList"){
      newsList.initNewListPage();
        $(window).scroll(function() {
          //当内容滚动到底部时加载新的内容
          if ($(this).scrollTop() + $(window).height()>= $(document).height() && $(this).scrollTop() > 150) {
            //当前要加载的页码
           newsList.initNewListPage();
          }
        });
    }
    //video list
    if(pageType=="videoList"){
      videoList.initvideoListPage();
      $(window).scroll(function() {
          //当内容滚动到底部时加载新的内容
          if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop() > 150) {
            //当前要加载的页码
           videoList.initvideoListPage();
          }
        });
    }
     //video list
    if(pageType=="liveList"){
      liveList.initLivePage();
       $(window).scroll(function() {
          //当内容滚动到底部时加载新的内容
          if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop() > 150) {
            //当前要加载的页码
            liveList.initLivePage();
          }
        });
    }
    //videos
    if(pageType=="lives"){
        livesDetail.initLivePage();
    }
    //pic
    if(pageType=="picList"){
          picList.initPicPage();
          $(window).scroll(function() {
              //当内容滚动到底部时加载新的内容
              if ($(this).scrollTop() + $(window).height()>= $(document).height() && $(this).scrollTop() > 150) {
                //当前要加载的页码
                //$('#masonry').masonry('reloadItems')
                picList.initPicPage();
                
              }
            });
          
    }
     //pic detail
    if(pageType=="picDetail"){
          picDetail.initDetailPage();
          
    }
     //pic detail
    if(pageType=="boardList"){
          billBoard.initListPage();
          
    }
     //board detail
    if(pageType=="boardDetail"){
         boardDetail.initDetailPage();
    }
    //theme
    if(pageType=="theme"){
         theme.initPage();
         $(window).scroll(function() {
              //当内容滚动到底部时加载新的内容
              if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop() > 150) {
                //当前要加载的页码
                 var caseid=Number($("#js-theme-tit .cur").index())+1;
                 var listpage=$("#theme_list"+caseid+" li").length;
                if(listpage<100){
                  theme.getMoreData();
                } 
                
              }
            });
    }
    //search
    if(pageType=="search"){
         search.initPage();
         $(".moreData").click(function(){
                search.getMoreData();
         })
         /*$(window).scroll(function() {
              //当内容滚动到底部时加载新的内容
              if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop() > 150) {
                
                
              }
            });*/
    }
    document.addEventListener("error", function (e) {
    var elem = e.target;
    if (elem.tagName.toLowerCase() === 'img') {
        elem.src = 'assets/images/defalut_cover2.png';
    }
    }, true); 
})