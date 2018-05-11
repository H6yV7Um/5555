var host=commonCla.hostBase+"/v9";
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '8') { 
      shareActivity();
    }
    if (data.nextStep == '1') { //打榜登录
       login_token = data.jwt_token;
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
    if (data.nextStep == '2') { //跳转
       login_token = data.jwt_token;
        window.location.href = "lottery.html?jwt_token=" + data.jwt_token;
    }

  })
 //调取客户端方法
  if (isIphone()) {} else {
    bridge.init(function(message, responseCallback) {
      var data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  }
   //活动分享
    var shareActivity=function(){
      var title="";var desc="";var link=""; var img="";
      if($(".fw_dMain").html()!=undefined){
         title=$("#hideInfo").attr("title");
         desc=$("#hideInfo").attr("content");
         link=$("#hideInfo").attr("fw_link");
         img=$("#hideInfo").attr("cover");
      }else{
         title="聚焦时尚顶级盛宴";
         desc="锁定时尚星秀，四大时装周精彩回顾";
         link="http://testshare.xingxiu.tv/starshow5.0/fashionWeek/share.html";
         img="https://starshow-pic.b0.upaiyun.com/fashionWeek/300.png";
      }
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':link,
          'title': title,
          'content': desc,
          'cover': img
        }
      })
    }


})

//交互方法
var clientInter=function(bridge){

}


var initPageHtml=function(ret){
   $(".fw_dMain header img").attr("src",ret.cover);
   $(".fw_dMain .fw_desc").html(ret.content);
   //brands
   var brands_cover="";
   var brands_con="";
   for (var i = 0; i < ret.brands.length; i++) {
     brands_cover+='<li><img src="'+ret.brands[i].cover+'" alt="'+ret.brands[i].name+'"/>'+
          '<img src="assets/images/arraw.png" class="icon_choose'+(i==0?'':' none')+'" />'+
          '</li>'
      //初始化热门视频
      var videoLi="";
      for (var a = 0; a < ret.brands[i].videos.length; a++) {
        videoLi+='<li>'+
        '<video width="100%" loop="loop" poster="'+ret.brands[i].videos[a].cover+'" controls="controls">'+
        　　'<source  type="video/mp4" src="'+ret.brands[i].videos[a].video_url+
            '" -webkit-playsinline=true>'+
            ' </video>'+
            /*'<video width="100%" id="video1" -webkit-playsinline=true> '+
                '<source src="'+ret.brands[i].videos[a].video_url+'" type="video/mp4">'+
            '</video>'+
            '<div class="video-poster">'+
                '<img src="'+ret.brands[i].videos[a].cover+'">'+
                '<div class="i play"></div>'+
            '</div>'*/
       
      '</li>'
      };
      var videoStr="";
      if(ret.brands[i].videos.length==1){
       videoStr='<h2>热门视频</h2>'+'<ul class="vedio_list big">'+videoLi+'</ul>'
      }else if(ret.brands[i].videos.length==2){
       videoStr='<h2>热门视频</h2>'+'<ul class="vedio_list">'+videoLi+'</ul>'
      }else if(ret.brands[i].videos.length>=3){
         videoStr='<h2>热门视频</h2>'+'<ul class="vedio_list big">'+videoLi+'</ul>'
      }
    //初始化头条
    var singleNew="";
    for (var b = 0; b < ret.brands[i].news.length; b++) {
      //分享还是app
      if($("#btn_down").html()!=undefined){
        share_url=ret.brands[i].news[b].share.share_url;
      }else{
        share_url=ret.brands[i].news[b].detail_url;
      }
      singleNew+='<li>'+
         '<a href="'+share_url+'">'+
          '<div class="vedioCover"><img src="'+ret.brands[i].news[b].cover+'"></div>'+
        '<div class="vedioDesc">'+
          '<h2>'+ret.brands[i].news[b].title+'</h2>'+
          '<ul class="activity">'+
            '<li><img src="assets/images/icon-eye.jpg"><span class="ml5">'+ret.brands[i].news[b].watch_num+'</span></li>'+
            '<li><img src="assets/images/icon-heart.jpg"><span class="ml5">'+ret.brands[i].news[b].like_num+'</span></li>'+
           '</ul>'+
        '</div>'+
        '</a>'+
      '</li>'
      
    };
    var news="";
    if(ret.brands[i].news.length>0){
      news+='<h2>相关头条</h2>'+
      '<ul class="vedioList">'+singleNew+'</ul>'
      }
    //品牌详情 
    var lives="";
    if(ret.brands[i].live!=""){
      lives='<h2>直播回顾</h2>'+
            '<div class="vedio_con">'+ret.brands[i].live+'</div>'
    }
    brands_con+='<section id="fw_brand_con'+Number(i+1)+'" style="display:'+(i==0?'':'none')+'">'+
    lives+videoStr+
    '<div class="fw_news">'+news+'</div>'+
    '</section>'
   };
   $(".brands ul").html(brands_cover);
   $(".brands_cons").html(brands_con);
    //隐藏域赋值
    $("#hideInfo").attr("content",ret.content);
    $("#hideInfo").attr("cover",ret.cover);
    var fw_link="http://testshare.xingxiu.tv/starshow5.0/fashionWeek/detailShare.html?id="+ commonCla.analyzParams("id");
    $("#hideInfo").attr("fw_link",fw_link);
    $("#hideInfo").attr("title",ret.title);
    
}

var getDetailData=function(){
  //id=7/9/10/11
  var id=commonCla.analyzParams("id")
  var url=host+"/fashionWeek/detail/"+id;
  commonCla.ajaxCommonFun(url,"get",function(ret){
       initPageHtml(ret);
  })
}
function playPause(myVideo) {
  if (myVideo.paused){
    $(myVideo).next("video-poster").hide();
    $(myVideo).css("top","0");
    $(myVideo).css("position","initial")
    myVideo.play();
  }else{
    $(myVideo).next("video-poster").show();
    $(myVideo).css("top","1000px");
    $(myVideo).css("position","absolute")
    myVideo.pause();
  }
      
}
var initDetail=function(){
  $(".brands").on("click","li",function(){
     $("img.icon_choose").addClass("none");
     $(this).find("img.icon_choose").removeClass("none");
     //切换数据...
      $(".brands_cons section").hide();
      $("#fw_brand_con"+Number($(this).index()+1)).show();
  })
  /*$(".brands_cons").on("click","li",function(){
     var myVideo=$(this).find("video");
     playPause($(myVideo)[0])
  })*/
  //初始化页面数据
   getDetailData();
}
$(function(){
  //详情页操作
  if($(".fw_dMain").html()!=undefined){
    initDetail();

    if($("#btn_down").html()!=undefined){
      //分享
      var title=$("#hideInfo").attr("title");
      var desc=$("#hideInfo").attr("content");
      var link=$("#hideInfo").attr("fw_link");
      var img=$("#hideInfo").attr("cover");
      wx_share(title,desc,link,img);
    }else{
      //app
    }
  }
  //首页
  if($(".fw_main").html()!=undefined){
    

    if($("#btn_down").html()!=undefined){
      //分享
      title="聚焦时尚顶级盛宴";
      desc="锁定时尚星秀，四大时装周精彩回顾";
      var link="http://testshare.xingxiu.tv/starshow5.0/fashionWeek/share.html";
      var img="https://starshow-pic.b0.upaiyun.com/fashionWeek/300.png";
      wx_share(title,desc,link,img);
    }
  }
})