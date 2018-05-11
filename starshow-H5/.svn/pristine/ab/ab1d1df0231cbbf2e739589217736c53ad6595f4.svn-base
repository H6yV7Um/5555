var host=commonCla.hostBase+"/v13"
//放大图
var picDetail={
  initGoodList:function(ret){
   var goodsHtml="";
   var goodlist=ret.data;
   for (var i = 0; i < goodlist.length; i++) {
      goodsHtml+='<div class="swiper-slide">'+
                         ' <div class="goodCon" gid="'+goodlist[i].id+
                              '" shref="'+goodlist[i].goods_detail_url+'">'+
                              '<div class="good_pic_con"><img src="'+goodlist[i].goods_pic+'" /></div>'+
                               '<div class="good_desc"><p class="good_name">'+goodlist[i].goods_name.substr(0,30)+'</p>'+
                               '<p class="col_red good_btns">￥'+goodlist[i].goods_price+'</p></div>'+
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
            slidesPerView:1.1,
            slidesPerGroup:1,
            loop:false,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            //observeParents:true//修改swiper的父元素时，自动初始化swiper
            // 如果需要前进后退按钮
            /*nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',*/
        });
        good_swiper2.update(true)
        /*if(ret.data.length<=5){
          $(".good_main .swiper-button-next").hide();
          $(".good_main .swiper-button-prev").hide();
        }else{
           $(".good_main .swiper-button-next").show();
          $(".good_main .swiper-button-prev").show();
        }*/
      }
    })
  },
  getDetailData:function(id){
    var url=host+"/picture/"+id+"/detail?type="+commonCla.analyzParams("t2");
    commonCla.ajaxCommonFun(url,"get",function(ret){
      if(ret.code=="200"){
         picDetail.initDetailDom(ret);
        $("#hide_info").attr("total",ret.data.total);
         var t2=commonCla.analyzParams("t2"); 
         wx_share("分享你一组来自时尚星秀的杂志大片",
          ret.data.title,
          commonCla.shareUrlBase+"/starshow5.0/pics/share.html?detailId="+ret.data.id+"&t2="+t2,
          ret.data.pictures[0].cover)
      }

    })
  },
  initDetailDom:function(ret){
  	$("title").html(ret.data.title);
  	$(".curNum").html("1");
  	$(".allNums").html(ret.data.pictures.length);
    var picHtml="";    
    var base_height=$(window).height();
    var auto_width=0;
    var detailList=ret.data.pictures;
    for (var i = 0; i < detailList.length; i++) {
    auto_width=Number(base_height/detailList[i].height*detailList[i].width).toFixed(1);
    var tags=detailList[i].attachment_goods_tags;
    var tagHtml="";
    for (var a = 0; a < tags.length; a++) {
      var left=tags[a].offset_x/detailList[i].width*100+"%";
      var top=tags[a].offset_y/detailList[i].height*100+"%";
      tagHtml+='<img goodid='+tags[a].id+' src="images/icon_tag.png" class="good_tag" style="top:'+top+
               '; left:'+left+';"/><div style="top:'+top+
               '; left:'+left+';" class="good_tag_bg"></div>'
    };
    var id=commonCla.analyzParams("pid");
    var cur_tag="";
    if(id==detailList[i].id){
      cur_tag="cur"
    }
    picHtml+='<div class="swiper-slide '+cur_tag+'">'+
              '<div class="picCon">'+
               '<img src="'+detailList[i].cover+'!750x0"/>'+
                tagHtml+
               '</div>'+
              '</div>'
      
    };
    if(picHtml==""){
    	picHtml='<div class="swiper-slide">'+
      	               '<div class="picCon">'+
      	               '<span class="pic_nodata">暂无图片</span>'+
      	               '</div>'+
      	               '</div>'
    }
    var nextData=ret.data.next;
    var prevData=ret.data.previous;
    var nextHtml="",prevHtml="";
    
    if(prevData==null || prevData=="" || prevData.id==undefined){
       prevHtml='<div class="prev_pics"><span>无图集</span></div>'
    }else{
       prevHtml='<div class="prev_pics js_pics" picId="'+prevData.id+'">'+
                     '<img src="'+prevData.cover+'!340x453" />'+
                     '<span>上一图集</span>'+
                    '</div>'
    }
    if(nextData==null || nextData=="" || nextData.id==undefined){
       nextHtml='<div class="prev_pics"><span>无图集</span></div>'
    }else{
        nextHtml='<div class="next_pics js_pics" picId="'+nextData.id+'">'+
                       '<img src="'+nextData.cover+'!340x453" />'+
                       '<span>下一图集</span>'+
                  '</div>'
    }
    var preAndNext=prevHtml+nextHtml;
    $("#js_silibingsPic").html(preAndNext);
    $("#js-picList").html(picHtml);
     var swiper = new Swiper('.swiper-container-pics', {
        initialSlide :0,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        onInit:function(swiper){
          $(".swiper-slide-active .good_tag_bg").addClass("bgfadeIn" );
        },
        onTransitionStart: function(swiper){
         $(".good_main").hide();
         $(".good_tag_bg").removeClass("bgfadeIn");
         $(".good_tag").attr("src","images/icon_tag.png");
         $(".curNum").html(swiper.activeIndex+1)
        },onTransitionEnd: function(swiper){
          $(".swiper-slide-active .good_tag_bg").addClass("bgfadeIn");
          
        }/*,
        onTouchEnd: function(swiper){
          var length=swiper.slides.length
          var curLength=swiper.activeIndex
          if(swiper.isEnd){
             console.log("展示上下图集");
             
              $("#js-picList").html("")
              $(".s-pics-detail").hide();
              $("#js_silibingsPic").show();
              $(".m-header").show();

           }
        }*/
    });
  },
  initDetailPage:function(){
     //open detail
      $("#js_pic_Detail").on("click",".box",function(){
      	var id=$(this).attr("bid")
      	picDetail.getDetailData(id);
      	$(".s-pics-detail").show();
      	$(".s-pics").hide();
      	$(".m-header").hide();
      	var loadding='<div class="swiper-slide">'+
      	               '<div class="picCon">'+
      	               '<img src="images/loadding2.gif" style="height: 40px; width: 40px;">'+
      	               '</div>'+
      	               '</div>'
      	$("#js-picList").html(loadding)
      })
      //close Detail
      $(".bigImg_tit").click(function(){
        if(commonCla.analyzParams("detailId")!=undefined && commonCla.analyzParams("detailId")!=""){
          window.history.back()
        }
      	$("#js-picList").html("")
      	$(".s-pics-detail").hide();
      	$(".s-pics").show();
      	$(".m-header").show();
      })

     //上下图集
     $("#js_silibingsPic").on("click",".js_pics",function(){
      //$("#header_back H1").html("图集")
         var id=$(this).attr("picid");
         picDetail.getDetailData(id);
        $(".s-pics-detail").show();
        $(".s-pics").hide();
        $(".m-header").hide();

        var loadding='<div class="swiper-slide">'+
                       '<div class="picCon">'+
                       '<img src="images/loadding2.gif" style="height: 40px; width: 40px;">'+
                       '</div>'+
                       '</div>'
        $("#js-picList").html(loadding);
        $("#js_silibingsPic").hide();
     })
     $("#js-picList").on("click",".good_tag",function(e){
     	e.stopPropagation(); 
      var goodid=$(this).attr("goodid");
       picDetail.getGoodTags(goodid);
       $(".good_tag").attr("src","images/icon_tag.png");
       $(this).attr("src","images/icon_tag_red.png");
       $(".good_main").show();
     })
     //close tag
     $("#js-picList").on("click",".picCon img",function(e){
     	if(!$(this).hasClass("good_tag")){
     		$(".good_main").hide();
     		$("#js-goodsList").html("")
     		$(".good_tag").attr("src","images/icon_tag.png");

     	}
     })
      $("#js-goodsList").on("click",".goodCon",function(){
         var prodlink=$(this).attr("shref");
         openApp_obj("home")
         /*window.BC_SDK.goTaoke({
                tkUrl : prodlink,
                params : {
                  pid: "mm_122511581_24602349_83026078", // 淘客必填
		              target:"_blank",
                }
         });*/
      })
      //
      $(".download").click(function(){
      	openApp_obj("home");
      })


     
  }
}
$(function(){
	var detailId=commonCla.analyzParams("detailId")
    picDetail.getDetailData(detailId);
    picDetail.initDetailPage();
})