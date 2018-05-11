
/*社区*/
var changeCurBanner=function(cover,title,id){
	var curVideo='<a href="newsDetail.html?id='+id+'&mt=3"><img src="'+cover+'"></a>'
	$(".comm_focus_con").html(curVideo);
	$(".comm_focus_con").addClass("animated fadeIn");
	setTimeout(function(){$(".comm_focus_con").removeClass("animated fadeIn")},1000)
}
var changeBanner=function(){

	var index=$(".comm_pagination").find(".cur").index();
	$(".comm_pagination li").removeClass("cur");
	if(index==7){
		$(".comm_pagination li").eq(0).addClass("cur");
	}else{
		$(".comm_pagination li").eq(Number(index)).next().addClass("cur");
	}
	 var title=$(".comm_pagination").find(".cur").attr("vtitle");
     var id=$(".comm_pagination").find(".cur").attr("vid")
     var cover=$(".comm_pagination").find(".cur").attr("vsrc");
     changeCurBanner(cover,title,id);
}

var getCommData=function(){
  var url=commonCla.hostBase+"/web/post"
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      //时间
      var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
      var news=data.news;
      var posts=data.posts;
      var collections=data.collections;
      var newsHtml=""
      $(".comm_focus_con").html('<a href="newsDetail.html?id='+news[0].id+'&mt=3"><img src="'+news[0].cover+'!750x563"></a>')
      for (var i = 0; i < news.length; i++) {
        var cur=""
        if(i==0){
           cur="cur"
        }
        newsHtml+='<li class="'+cur+'" vid="'+news[i].id+'" vtitle="'+news[i].title+'" vsrc="'+news[i].cover+'!750x563">'+news[i].title+'</li>';
      };
      $(".js_newsList").html(newsHtml)

      var postsHtml="";
      for (var i = 0; i < posts.length; i++) {
        var create_time=timesReview(posts[i].created_at,currentTime);
        var photos=posts[i].photos;
        var photosHtml="";
        
        var type_irregular="type_irregular"
        for (var a = 0; a < photos.length; a++) {
          photosHtml+='<li><img src="'+photos[a]+'!300x300"></li>'
        };
        if(photos.length%3==0){
          type_irregular="type_regular"
        }
        var rolesHtml="";
        if(posts[i].user.is_vip==1){
         rolesHtml='<img src="assets/images/icon-roles1.png" class="icon_role"  />';
        }else if(posts[i].user.is_vip==2){
         rolesHtml='<img src="assets/images/icon-roles2.png" class="icon_role"  />';
        }
        postsHtml+='<div class="post_con"><a href="postDetail.html?id='+posts[i].id+'&mt=3">'+
            '<div class="post_tit">'+
              '<div class="user_header fl">'+
                  '<img src="'+reviewHeader(posts[i].user.head_pic)+'" class="icon_header"/>'+rolesHtml+
                  '<span class="name">'+posts[i].user.name+'</span>'+
                '</div>'+
                '<span class="timer fl">'+create_time+'</span>'+
                '<div class="btn_list2">'+
                  '<img src="assets/images/icon-msg.png"><span>'+commonCla.cWan(posts[i].comment_num)+'</span>'+
                  '<img src="assets/images/icon-zan.png"><span>'+commonCla.cWan(posts[i].like_num)+'</span>'+
                '</div>'+
            '</div>'+
            '<div class="desc">'+posts[i].content+'</div>'+
            '<ul class="'+type_irregular+'">'+photosHtml+'</ul>'+
            
          '</a></div>'
        
      };
      $("#js_comm_post").html(postsHtml)

       var collHtml=""
      for (var i = 0; i < collections.length; i++) {
        collHtml+='<li><a href="goodsDetail.html?id='+collections[i].id+'&mt=1">'+
            '<div class="tw_one">'+
              '<div class="imgCon"><img src="'+collections[i].cover+'!750x563" /></div>'+
             ' <div class="tw_one_desc">'+collections[i].name+'</div>'+
            '</div>'+
           ' <div class="prices">'+
              '<span class="i-price">'+change_currency(collections[i].currency)+collections[i].start_price+'</span>'+
              '<input type="button" class="btn_tojoin" value="bidding">'+
            '</div>'+
          '</a></li>'
      };
      $("#js_canp_list").html(collHtml)

    }
  },{},[ $("#js_comm_post"), $("#js_canp_list")])
}
var initCommIndex=function(){
  getCommData();
	var b_timer="";
	$(".comm_pagination").on("click","li",function(){
		clearInterval(b_timer);
		b_timer=setInterval(function(){
			changeBanner();
		},5000)
		$(".comm_pagination li").removeClass("cur");
		$(this).addClass("cur");
		 var title=$(this).attr("vtitle");
         var id=$(this).attr("vid")
         var cover=$(this).attr("vsrc");
         changeCurBanner(cover,title,id);
	})
	 b_timer=setInterval(function(){
		changeBanner();
	},5000)

}

/*精品拍卖列表auctions*/
var getTypeList=function(){
  var url=commonCla.hostBase+"/web/category";
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
       var menulist='<li class="cur" cid="0">All</li>';
        for (var i = 0; i < data.category.length; i++) {
         menulist+='<li cid="'+data.category[i].id+'">'+data.category[i].name+'</li>' 
        };
        $(".js-changeMenu").html(menulist)
    }
   
  },{},[$(".js-changeMenu")])
}
var getPaipinList=function(cid,status){
  //0:预展中;1:拍卖中;2:Results;3:unsold;
  var url=commonCla.hostBase+"/web/categoryList";
  var params={
    "category_id":cid,
    "status":status,
    "current_count":$(".js_paipinList li").length
  }
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    var paipin_html=""
    if(textStatus=="success"){
      var a_html=$(".js-changeMenu .cur").html();
      
      $("#auctions_tit").html(a_html)
      $("#auctions_num").html(data.total)
      $("#js_btn_more").show();
      $("#js_btn_more").html("load more");

      
      var current_count=$(".js_paipinList li").length;
      if(current_count+9>data.total){
        $("#js_btn_more").hide();
      }
      var paipin=data.page_data;
      for (var i = 0; i < paipin.length; i++) {
        var paipin_status='<span class="auc_status">on View</span>';
        var p_status=paipin[i].status
        if(p_status==0){
           paipin_status='<span class="auc_status preView">Upcoming</span>';
          if(paipin[i].auctions!=undefined&& paipin[i].auctions!=null && paipin[i].auctions!="" && paipin[i].auctions.length>0){
            paipin_status='<span class="auc_status preView">start time：'+cutDate(paipin[i].auctions[0].begin_time,"ymd")+'</span>';
          }
        }else if(p_status==2){
          paipin_status='<span class="auc_status done">Results</span>';
        }else if(p_status==3){
          paipin_status='<span class="auc_status lost">unsold</span>';
        }
        var paipin_name=paipin[i].name;
        if(paipin[i].name.length>20){
           paipin_name=paipin[i].name.substr(0,20)+"..."
        }

        var user=paipin[i].user==null?"":paipin[i].user
        paipin_html+='<li><a href="goodsDetail.html?id='+paipin[i].id+'&mt=1">'+
                      '<div class="imgCon">'+
                       ' <img src="'+paipin[i].cover+'" />'+paipin_status+
                      '</div>'+
                      '<div class="auc_desc">'+
                        '<p>'+paipin_name+'</p>'+
                          '<p class="">Seller：'+(user.name==undefined?"":user.name)+'</p>'+
                      '</div>'+
                    '</a></li>'
      };
      if(data.total==0){
       paipin_html="<div class='no_data'>暂时没有符合条件的藏品</div>"
      }
      $(".js_paipinList").append(paipin_html);


    }

  },params,[$(".js_paipinList")])
}
var initAuctionIndex=function() {
  getTypeList();


  $(".js_paipinList").html("")
  getPaipinList(0,4);
  $("#js_btn_more").click(function(){
    $(this).html("<img src='assets/images/loadding2.gif' width='20px'/>")
     var cid=$(".js-changeMenu .cur").attr("cid");
     var sid=$(".js-changeType .cur").attr("sid");
     getPaipinList(cid,sid);
  })
	// body...
	$(".js-changeType span").click(function(){
		$(".js-changeType span").removeClass("cur");
		$(this).addClass("cur");
    var cid=$(".js-changeMenu .cur").attr("cid");
    var sid=$(".js-changeType .cur").attr("sid");
    $(".js_paipinList").html("")
    getPaipinList(cid,sid)
	})
	$(".js-changeMenu").on("click","li",function(){
		$(".js-changeMenu li").removeClass("cur");
		$(this).addClass("cur");
    var cid=$(".js-changeMenu .cur").attr("cid");
    var sid=$(".js-changeType .cur").attr("sid");
    $(".js_paipinList").html("")
    getPaipinList(cid,sid)
	})
}
/*拍品详情*/
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
var changeName=function(str){
  var name=str.substr(0,1);
  var lastname=str.substr(str.length-1,1);
  for (var i = 0; i < str.length-2; i++) {
    name+='*'
  };
  return name+lastname;
}
var initGoodsDom=function(data){
   $(".js_goods_tit").html(data.name)
  var bannersHtml="";
  if(data.detail!=null){
    var photos= data.detail.photos;
    $(".goods_banner").attr("src",photos[0].picture_url);
    $(".js_collection_con").html(data.detail.description);
  }else{
    var photos= [];
     $(".goods_banner").attr("src",data.cover);
  }
  
  
  $(".goods_tit").html(data.name)
  for (var i = 0; i < photos.length; i++) {
    var v_src="";
    if(photos[i].video_url!=""){
      v_src=photos[i].video_url;
    }
    bannersHtml+='<li v_src="'+v_src+'">'+
                 ' <img src="'+photos[i].picture_url+'!300x300">'+
                '</li>'
    
  };
  $(".js_pagination").html(bannersHtml);
  var status=data.status;
  $(".priceName").html("current price：");
  if(status==2){
    $(".priceName").html("transaction price："+change_currency(data.currency));
  }else if(status==0){
    $(".goodsInfo h1").html("Upcoming");
  }else if(status==3){
    $(".goodsInfo h1").html("");
  }
  var offers="";var offersNum=0; var firstPrice=data.start_price;
  if(data.auctions.length>0){
    var offers=data.auctions[0].offers;
    if(offers.length>0){
      firstPrice=offers[0].price;
    }
  }
  //起拍价 
  $(".curPrice").html(firstPrice);
  $(".startPrice").html(change_currency(data.currency) + data.start_price);
  $(".watch_num").html(data.watch_num);
  $(".bail").html(change_currency(data.currency) + data.auctions[0].deposit_buyer)
  $(".goods_seller").html("Seller："+data.user.name)
  $(".offers_num").html(offers.length)
  //评论
  var appraisals=data.appraisals;
  var appraisals_str="";
  for (var i = 0; i < appraisals.length; i++) {
    var rolesHtml="";
    if(appraisals[i].user.is_vip==1){
     rolesHtml='<img src="assets/images/icon-roles1.png" class="icon_role"  />';
    }else if(appraisals[i].user.is_vip==2){
     rolesHtml='<img src="assets/images/icon-roles2.png" class="icon_role"  />';
    }
    appraisals_str+='<li>'+
            '<div class="user_header">'+
                '<img src="'+reviewHeader(appraisals[i].user.head_pic)+'" class="icon_header"/>'+
              rolesHtml+
              '  <span class="name">'+appraisals[i].user.name+'</span>'+
              '</div>'+
              '<h1 class="msg_tit">'+appraisals[i].title+'</h1>'+
              '<div class="msg_con">'+appraisals[i].comments+'</div>'+
         ' </li>'
    //appraisals[i]
  };
  $(".expertMsgList").html(appraisals_str);
  if(appraisals_str==""){
    $(".expertMsgList").hide();
    $(".expertMsgList").prev(".cangp_tit_left").hide();
  }
  //参数
  $(".coll_params h1 span").html(data.name);
  if(data.attributes!=null){
   var attributes=data.attributes.content;
  }else{
   var attributes={};
  }
  
  var attrHtml="";
  for(var a in attributes){
    attrHtml+='<li>'+a+':'+'<span>'+attributes[a]+'</span></li>';
  }
  $(".coll_params ul").html(attrHtml);
  

  //出价
  if(offers.length<=0){
    var offersHtml="<tr><td colspan='4' class='tc'>No record at the moment</td></tr>"
  }else{
    var offersHtml=""
  }
  for (var i = 0; i < offers.length; i++) {
    var status_label="";var cur=""
    if(i=="0"){
      if(data.status==1){
        status_label='<span class="status_leader">first</span>';
      }else{
        status_label='<span class="status_leader">成交</span>';
      }
      cur="cur"
    }else{
      status_label='<span class="status_out">out</span>'
    }
    offersHtml+='<tr class="'+cur+'">'+
                '<td>'+status_label+'</td>'+
                '<td>'+changeName(offers[i].user.name)+'</td>'+
                '<td>'+offers[i].price+'</td>'+
                '<td>'+offers[i].created_at+'</td>'+
              '</tr>'
   // offers[i]
  };
  
  $(".offersList table tbody").html(offersHtml);
  //热门藏品
  var hot=data.hot;
  var hotHtml="";
  for (var i = 0; i < hot.length; i++) {
     hotHtml+='<div class="swiper-slide"><a href="goodsDetail.html?id='+hot[i].id+'&mt=1">'+
                    '<div class="tw_one">'+
                      '<div class="imgCon"><img src="'+hot[i].cover+'" /></div>'+
                      '<div class="tw_one_desc">'+hot[i].name+'</div>'+
                    '</div>'+
                    '<div class="prices">'+
                     ' <span class="i-price">'+change_currency(hot[i].currency)+hot[i].start_price+'</span>'+
                      '<input type="button" class="btn_tojoin" value="bidding">'+
                    '</div>'+
               '</a></div>'   
    
  };
  $(".cangp_list .swiper-wrapper").html(hotHtml);
   var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    preventClicks:false,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  }) 
}
var getGoodsData=function(){
  var id=commonCla.analyzParams("id");
  var url=commonCla.hostBase+"/web/collection/"+id;
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      initGoodsDom(data);
    }

  })
}
var initGoodsIndex=function(){
  getGoodsData();
  $(".js_pagination").on("click","li",function(){
    var myVideo = document.getElementsByTagName('video')[0];
    if(myVideo!=undefined){
     if (myVideo.play)myVideo.pause();
    }

    var cur_src=$(this).find("img").attr("src").split("!")[0];
    $(".goods_banner").attr("src",cur_src);
    if($(this).attr("v_src")!=""){
      $(".goods_banner").hide();
      $(".js_goods_video").html("<video autoplay  preload='auto' poster='"+cur_src+"' width='100%' src='"+$(this).attr("v_src")+"'></video>")
       myVideo.pause();
    }else{
      $(".goods_banner").show();
    }
    
    $(".js_pagination li").removeClass("cur")
    $(this).addClass("cur")
  })

  $(".js_tab").on("click","li",function(){
    $(".js_tab li").removeClass("cur");
    $(this).addClass("cur");
    var num=$(this).index()+1;
    $(".tab_con").hide();
    $(".con"+num).show();
  })
}
//鉴宝直播列表
var initLiveList=function(data){
   var liveListHtml="";var expertListHtml="";
   var lives=data.treasureLives;
   for (var i = 0; i < lives.length; i++) {
    //0:预展中;1:拍卖中;2:Results;3:unsold;
    var status=lives[i].status;
    var live_status='<span class="auc_status">Living</span>';
    var p_status=lives[i].status
    if(p_status==2){
        live_status='<span class="auc_status preView">Highlight replays</span>';
    }
    var rolesHtml="";
    if(lives[i].user.is_vip==1){
     rolesHtml='<img src="assets/images/icon-roles1.png" class="icon_role"  />';
    }else if(lives[i].user.is_vip==2){
     rolesHtml='<img src="assets/images/icon-roles2.png" class="icon_role"  />';
    }
    var name=""
    if(lives[i].name.length>20){
      name=lives[i].name.substr(0,20)+"..."
    }else{
      name=lives[i].name
    }
     liveListHtml+='<li ><a href="expertLiveDetail.html?id='+lives[i].id+'&mt=2">'+
        '<div class="imgCon">'+
          '<img src="'+lives[i].cover+'" />'+live_status+
        '</div>'+
        '<div class="auc_desc">'+
          '<p>'+name+'</p>'+
           ' <div class="btn_list">'+
             ' <div class="user_header fl">'+
                '<img src="'+reviewHeader(lives[i].user.head_pic)+'" class="icon_header"/>'+rolesHtml+
               ' <span class="name">'+lives[i].user.name+'</span>'+
             ' </div>'+
              '<div class="watch_num fr">Watched'+lives[i].watch_num+'times</div>'+
            '</div>'+
        '</div>'+
          '<img src="assets/images/btn-play.png" height="40" width="40" class="btn_play">'
      '</a></li>'
   };
   $("#js_liveList").html(liveListHtml)
   //experts

   var experts=data.experts;
   var expertsHtml=""
   for (var i = 0; i < experts.length; i++) {
     var jobs="";
     if(experts[i].role_infos.length>0 && experts[i].role_infos[0].current_job.length>0){
      jobs=experts[i].role_infos[0].current_job[0];
     }
    expertsHtml+='<div class="swiper-slide">'+
                    '<div class="expert_con">'+
                      '<img src="'+reviewHeader(experts[i].head_pic)+'" />'+
                      '<div class="expert_desc">'+
                        '<div class="expert_desc_con">'+
                          '<h1>'+experts[i].name+'</h1>'+
                          '<p>'+jobs+'</p>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'
     
   };
   $("#js-livesList").html(expertsHtml);
    var expertSwiper = new Swiper('.swiper-container-expert', {
        initialSlide :0,
        slidesPerView:6,
        slidesPerGroup:6,
        loop:false,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    }); 

}
var getLiveListData=function(){
  var url=commonCla.hostBase+"/web/treasureLive"
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
     initLiveList(data);
    }
  },{},[$("#js_liveList")])
}
var initLiveIndex=function(){
  getLiveListData();

}
//专家鉴宝直播详情
var initPlayer=function(id,hls,flv,cover){
  
  var player = new TcPlayer(id, {
  //"app_id": "1400035854",
  "m3u8": hls, //请替换成实际可用的播放地址
  "flv":flv,
  "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
  "live":true,
  "coverpic" : {"style": "cover", "src":cover},
  "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
  "height" : 675,//视频的显示高度，请尽量使用视频分辨率高度
  listener:function(msg){
     if(msg.type == 'error'){
            window.setTimeout(function(){
                player.load();//进行重连
            },5000);
        }
      if(msg.type == 'ended'){
        $("#experts_player").html('<img class="end_bg" src="'+cover+'!750x563"/><div class="end_tit">the end<div>')
      }
     }
  });
}
var initReplayer=function(id,flv,m3u8,replay_url,cover){      
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
var initDetailDom=function(data){
  $(".js_live_tit").html(data.name);
  var mores=data.more; var moreHtml="";
  for (var i = 0; i < mores.length; i++) {
    var status=mores[i].status;
    var live_status='<span class="auc_status">Living</span>';
    var p_status=mores[i].status
    if(p_status==2){
        live_status='<span class="auc_status preView">Highlight replays</span>';
    }
    var rolesHtml="";
    if(mores[i].user.is_vip==1){
     rolesHtml='<img src="assets/images/icon-roles1.png" class="icon_role"  />';
    }else if(mores[i].user.is_vip==2){
     rolesHtml='<img src="assets/images/icon-roles2.png" class="icon_role"  />';
    }
     var tit_name=mores[i].name.length>20?mores[i].name.substr(0,20)+"...":mores[i].name;

     moreHtml+='<li><a href="expertLiveDetail.html?id='+mores[i].id+'&mt=2">'+
        '<div class="imgCon">'+
          '<img src="'+mores[i].cover+'" />'+live_status+
        '</div>'+
        '<div class="auc_desc">'+
          '<p>'+tit_name+'</p>'+
            '<div class="btn_list">'+
              '<div class="user_header fl">'+
                '<img src="'+reviewHeader(mores[i].user.head_pic)+'" class="icon_header"/>'+rolesHtml+
                '<span class="name">'+mores[i].user.name+'</span>'+
              '</div>'+
              '<div class="watch_num fr">Watched'+mores[i].watch_num+'times</div>'+
            '</div>'+
        '</div>'+

     '</a></li>'
  };

  $(".expert_liveList").html(moreHtml)
  //1进行，2回放，3预热
  var status=data.status;
  if(status==1){
    initPlayer("experts_player",data.pull_urls.pull_hls,data.pull_urls.pull_flv,data.cover);
  }else if(status==2){
    initReplayer("experts_player",data.pull_urls.pull_flv,data.pull_urls.pull_hls,data.replay_url,data.cover);
  }else if(status==0){
    $("#experts_player").html('<img class="end_bg" src="'+data.cover+'!750x563"/><div class="end_tit">the end<div>')
  }
 
  

}
var getDetailData=function(){
  var id=commonCla.analyzParams('id');
  var url=commonCla.hostBase+'/web/treasureLive/'+id;
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      initDetailDom(data)
    }
  })

}
var initLiveDetail=function(){
   getDetailData();
}
//新闻详情
var initNewDom=function(data,request){
  //时间
  var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
  var create_time=timesReview(data.created_at,currentTime);
  $("title").html(data.title)
  $(".news_tit").html(data.title)
  $(".new_banner").attr("src",data.cover+"!750x563");
  $(".icon_header").attr("src",reviewHeader(data.user.head_pic));
  $(".user_main .timer").html(create_time);
  $(".user_header .name").html(data.user.name)
  if(data.user.is_vip==1){
    $(".icon_role").attr("src","assets/images/icon-roles1.png");
  }else if(data.user.is_vip==2){
    $(".icon_role").attr("src","assets/images/icon-roles2.png");
  }else{
     $(".icon_role").hide();
  }
  $(".content_main").html(data.content);

  var moreNews=data.moreNews;
  var moreNewTit=moreNews[0].title>=15?moreNews[0].title.substr(0,15)+"...":moreNews[0].title;

  var moreNewsHtml="";
  var topNew ='<a href="newsDetail.html?id='+moreNews[0].id+'&mt=3"><div class="imgCon"><img src="'+moreNews[0].cover+'!750x563" /></div>'+
              '<div class="tw_one_desc">'+moreNewTit+'</div></a>'
  $("#js_news_more_top").html(topNew)
  for (var i = 1; i < moreNews.length; i++) {
    var moreNewTit2=moreNews[i].title.length>=15?moreNews[i].title.substr(0,15)+"...":moreNews[i].title;
    moreNewsHtml+='<li><a href="newsDetail.html?id='+moreNews[i].id+'&mt=3">'+moreNewTit2+'</a></li>'
  };
  $("#js_newsList").html(moreNewsHtml);

  var hotCollection=data.hotCollection;
  var hotcHtml=""
  for (var i = 0; i < hotCollection.length; i++) {
    hotcHtml+='<li><a href="goodsDetail.html?id='+hotCollection[i].id+'&mt=3">'+
            '<div class="tw_one">'+
              '<div class="imgCon"><img src="'+hotCollection[i].cover+'!750x563" /></div>'+
              '<div class="tw_one_desc">'+hotCollection[i].name+'</div>'+
            '</div>'+
            '<div class="prices">'+
              '<span class="i-price">'+change_currency(hotCollection[i].currency)+hotCollection[i].start_price+'</span>'+
              '<input type="button" class="btn_tojoin" value="bidding">'+
           ' </div>'+
          '</a></li>'
  };
  $("#js_hotCollList").html(hotcHtml)

}
var getNewsDetailData=function(){
  var id=commonCla.analyzParams("id");
  var url=commonCla.hostBase+"/web/news/"+id;
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      initNewDom(data,request);
    }
  })
}
var initNewsDetail=function(){
  getNewsDetailData();
}
//拍卖会详情
var initAuctionDom=function(data){
  $(".js_auctions_tit").html(data.name)
  $("#js_theme_desc h1").html(data.name);
  $("#js_theme_desc .desc_con1").html('<p>Seller：'+data.user.name+'</p><p>start time：'+cutDate(data.begin_time,"ymd")+'</p>')
  $("#js_theme_desc .desc_con2").html('<p>Auction profile：</p><p class="desc_con">'+data.description.substr(0,100)+'</p>')
  var collections=data.collections;
  $("#c_length").html(collections.length)
  var coll_html="";
  var coll_html2=""
  for (var i = 0; i < collections.length; i++) {
      var paipin_status='<span class="auc_status">On View</span>';
      var p_status=collections[i].status
      if(p_status==0){
        paipin_status='<span class="auc_status preView">start time：'+cutDate(data.begin_time,"ymd")+'</span>';
      }else if(p_status==2){
        paipin_status='<span class="auc_status done">Results</span>';
      }else if(p_status==3){
        paipin_status='<span class="auc_status lost">unsold</span>';
      }
     coll_html+='<div class="swiper-slide">'+
                   '<div class="imgCon"><img src="'+collections[i].cover+'!750x563" /></div>'+
                '</div>'
    coll_html2+='<li><a href="goodsDetail.html?id='+collections[i].id+'&mt=1">'+
                '<div class="imgCon">'+
                  '<img src="'+collections[i].cover+'!750x563"/>'+paipin_status+
                '</div>'+
                '<div class="auc_desc">'+
                  '<p>'+collections[i].name+'</p>'+
                    '<p class="">Seller：'+collections[i].user.name+'</p>'+
                '</div>'+
              '</a></li>'
  };
  $("#js-livesList").html(coll_html);
  $("#js_collections").html(coll_html2);
  var myLiveSwiper = new Swiper ('.swiper-container-auction', {
     loop: true,
    autoplay:5000,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  }) 
}
var getAuctionData=function(){
  var id=commonCla.analyzParams("id");
  //0默认1价格2热度
  var order_rule=$("#js_orderRule .cur").index();
  var url=commonCla.hostBase+"/web/auction/"+id+"?order_rule="+order_rule;
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      initAuctionDom(data);
    }
  })

}
var initAuctionDetail=function(){
  $("#js_orderRule").on("click","span",function(){
    $("#js_orderRule span").removeClass("cur")
    $(this).addClass("cur")
    getAuctionData();
  })
  getAuctionData();
}
//帖子详情
var initPostDom=function(data,request){

  //post帖子
  var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
  var create_time=timesReview(data.created_at,currentTime);
   var post_tit='<div class="user_header fl">'+
                  '<img src="'+reviewHeader(data.user.head_pic)+'" class="icon_header"/>'+
                  '<img src="assets/images/icon-roles1.png"  class="icon_role"/>'+
                  '<span class="name">'+data.user.name+'</span>'+
                '</div>'+
                '<span class="timer fl">'+create_time+'</span>'+
                '<div class="btn_list2">'+
                  '<img src="assets/images/icon-msg.png"><span>'+commonCla.cWan(data.comment_num)+'</span>'+
                  '<img src="assets/images/icon-zan.png"><span>'+commonCla.cWan(data.like_num)+'</span>'+
                '</div>'

  $("#js_post_tit").html(post_tit)
  $("#js_post_content").html(data.content)
  //
  var bannersHtml="";
  var photos=data.photos;
  if(photos.length>0){
    $(".goods_banner").attr("src",data.photos[0])
  }
  for (var i = 0; i < photos.length; i++) {
    if(i==0){
      var cur="cur"
    }else{
      var cur=""
    }
    bannersHtml+='<li class="'+cur+'">'+
                 ' <img src="'+photos[i]+'!300x300">'+
                '</li>'
    
  };
  $(".js_pagination").html(bannersHtml);
  var posts=data.hotPost;
  var postsHtml=""
  for (var i = 0; i <posts.length; i++) {
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
}
var getPostData=function(){
   var id=commonCla.analyzParams("id")
   var url=commonCla.hostBase+"/web/post/"+id;
   commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
     if(textStatus=="success"){
       initPostDom(data,request)
     }
   })
}

//评论数据
var getCommentData=function(){
  var listPage= $(".cmt_list li").length;
  var post_id=commonCla.analyzParams("id");
  var url=commonCla.hostBase+"/web/post/"+post_id+"/comments";
  var params={
    "current_count":listPage
  }
  
  commonCla.ajaxCommonFun(url,"get",function(data,textStatus,request){
    if(textStatus=="success"){
      $("#btn_more_comment").html("load more");
      if(commonCla.analyzParams("lang")=="en"){
        $("#btn_more_comment").html("load more");
      }
      
      //$(".msg_num").html(data.total)
      //时间
      var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
      
      var pageData=data.page_data;var liHtml="";
      $(".msg_num").html(data.comment_num);
      if(data.total-listPage<=9 || data.total<=0){
          $("#btn_more_comment").hide();
        }
      if (pageData.length > 0) {
        var nLength=pageData.length;
        if($("#hide_source").attr("iShare")=="true" && pageData.length>5){
          nLength=5;
          $(".cmt_list").html("");
        }
        
       for (var i = 0; i < nLength; i++) {
        var repliesHtml="";
        var create_time=timesReview(pageData[i].created_at,currentTime);
        var reply_data=pageData[i].replies;
        var reply_num=reply_data.length;
        if (reply_data != null && reply_num>0) {
            
            var reply_num_html="";
            if(reply_num>=2){
              reply_num_html="<p class='reply_num js_reply_num'>There are"+reply_num+"replies</p>"
            }else{
	     reply_num_html="<p class='reply_num'><p>"
	    }
            var more_replys="";
            for (var a = 1; a < reply_data.length; a++) {
              more_replys+="<div class='reply_msg'>"+
                           "<span class='reply_name'>"+reply_data[a].user.name+"</span>Reply<span class='reply_name'>："+reply_data[a].asker.name+"</span>"+
                           " <span>"+reply_data[a].content+"</span>"+
                           "<div class='cmt_time2'>" +
                              "<span class='cmt_data'>" + cutDate(reply_data[a].created_at)+ "</span>" +
                              "<span class='cmt_reply fr js_dialog'>Reply</span>"+
                            "</div>" +
                         "</div>"
            };
            repliesHtml+="<div class='reply'>"+
                         "<div class='reply_msg'>"+
                           "<span class='reply_name'>"+reply_data[0].user.name+"</span>Reply<span class='reply_name'>"+reply_data[0].asker.name+"：</span>"+
                           " <span>"+reply_data[0].content+"</span>"+
                           "<div class='cmt_time2'>" +
                              "<span class='cmt_data'>" + cutDate(reply_data[0].created_at )+ "</span>" +
                              "<span class='cmt_reply fr js_dialog'>Reply</span>"+
                            "</div>" +
                         "</div><div class='more_replys' style='display:none'>"+more_replys+"</div>"
                         +reply_num_html+
                         "</div>"

            //var name = pageData[i].user.name + " <span class='col_grey2'>回复</span> " +pageData[i].replies.answer.name
        }
        var name = pageData[i].user.name;
        liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
          "<div class='cmt_head cmt_reply'><img src='" + reviewHeader(pageData[i].user.head_pic)+"'>" +
         
          "<div class='cmt_comment cmt_reply'>"+
           "<span class='cmt_name col_red'>" + name + "</span>："+
            pageData[i].content +" </div>" + 
          "</div>" +
          "<div class='cmt_time'>" +
          "<span class='cmt_data'>" + cutDate(pageData[i].created_at )+ "</span>" +
          "<span class='cmt_reply fr js_dialog'>Reply</span>"+
          "</div>" +repliesHtml +
          "</li>"
      }
      $(".cmt_list").append(liHtml);
    }else{
      //$(".cmt_short").hide();
      if(listPage>0){
        $(".btn_more").html("No more");
      }else{
         $(".cmt_list").html('<div class="tc mt30 pb30"><h1 style="font-size: 1.5rem;">No comment at the moment</h1><p class="mt20">快来发表第一条评论吧~</p></div>')
         if($("#hide_source").attr("iShare")!="true"){
           $(".btn_more").hide();
         }else{
          $(".btn_more").html("<p class='js_btn_down'>下载／打开藏拍APP</p>");
         }
         
      }
     
    }
   }
  },params)
}
var initPostPage=function(){
  $(".js_pagination").on("click","li",function(){
    var cur_src=$(this).find("img").attr("src").split("!")[0];
    $(".goods_banner").attr("src",cur_src);
    $(".js_pagination li").removeClass("cur")
    $(this).addClass("cur")
  })
  $("#btn_more_comment").click(function(){
    $(this).html("<img src='assets/images/loadding2.gif' width='20px'/>")
    getCommentData();
  })

  $(".cmt_list").on("click",".js_reply_num",function(){
    $(this).prev(".more_replys").show();
    $(this).hide();
  })
  getPostData();
  getCommentData();
}
$(function(){
  $("body").on("click",".js_dialog",function(){
    swal({
              "title":"Download the APP",
              "text": "We are a trading platform focused on collectibles！",
              "imageUrl": "assets/images/code-app-big.png",
              "imageSize":"160x160",
              "animation":"slide-from-top",
              "confirmButtonText":"close",
              "confirmButtonColor": "#eb1010",

     });
  })
	if($("#hide_cangp").attr("page")=="auctions"){
		initAuctionIndex();
	}
	if($("#hide_cangp").attr("page")=="comm"){
		initCommIndex();
	}
  if($("#hide_cangp").attr("page")=="goodsDetail"){
    initGoodsIndex();
  }
  if($("#hide_cangp").attr("page")=="expertLive"){
    initLiveIndex();
  }
  if($("#hide_cangp").attr("page")=="expertDetail"){
    initLiveDetail();
  }
  if($("#hide_cangp").attr("page")=="newsDetail"){
    initNewsDetail();
  }
  if($("#hide_cangp").attr("page")=="auctionDetail"){
    initAuctionDetail();
  }
  if($("#hide_cangp").attr("page")=="postDetail"){
    initPostPage();
  }
  
  
	
})