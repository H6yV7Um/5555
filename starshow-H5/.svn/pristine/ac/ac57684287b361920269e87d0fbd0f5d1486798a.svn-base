/*var host = "http://123.57.0.118:5000/v5";*/
var host=commonCla.hostBase+"/v5"

var getTimeDiff = function(data) {
  var isLive=data.data.lsLive;
  //获取时间差
  var endTime = isLive.live_end_time == null ? data.current_time : isLive.live_end_time;
  var timeDiff = commonCla.dateDiff('T', isLive.live_start_time, endTime);
  var timeHtml = "";
  var sTime = timeDiff / 1000;
  var timeMark = "";
  if (sTime < 0) {
    sTime = -sTime;
    timeMark = "后";
  }
  if (sTime < 60) {
    timeHtml = sTime + "秒" + timeMark
  } else if (sTime >= 60 && sTime < 3600) {
    timeHtml = Math.round(sTime / 60) + "分钟" + sTime % 60 + "秒" + timeMark
  } else if (sTime >= 3600) {
    timeHtml = (sTime / 3600).toFixed(1) + "小时" + timeMark
  }
  return timeHtml;
  //$("#tit_desc_info").html(timeHtml+"&nbsp;"+data.city);
}
var app_jump=function(){
     var params = {
        "liveID":commonCla.analyzParams("id"),
        "mms_id":$("#tvStatus").attr("mms_id"),
      };
      openApp_obj('leLive', params);
 }
var initLeTvDom = function(data) {
  var isLive = data.data.lsLive;
  $("#tvStatus").attr("mms_id",isLive.mms_id); 
  var relatedLives = data.data.relatedLives;
  $("#watchNum").html(isLive.watch_num);
  var id = commonCla.analyzParams("id") == undefined ? "" : commonCla.analyzParams("id");
  var unlike=localStorage.getItem("unlike"+id);
  if(unlike==0){
     $("#btn-zan").attr("src","assets/images/icon-like.png");
   }else{
     $("#btn-zan").attr("src","assets/images/icon-like-red.png");
   }
  $("#btn-zan").next("span").html(isLive.like_num);
  $(".tv-title").html(isLive.live_name);
  $("#seeNum").html(isLive.watch_num + "次观看")
  $("#tit_desc_info").html(getTimeDiff(data) + "&nbsp;" );
  var status=isLive.live_status;
  $(".vedio_title img").attr("src",isLive.live_cover)
  if(status=="3"){
  $(".vedio_title").hide();
  $("#player").show();
  var player = new CloudLivePlayer();
    //activityId 请换成自己设置的获得idc
    player.init({
      activityId: isLive.mms_id,
      /*activityId:"A2016010500713",*/
      posterType: 2,
      pic: isLive.live_cover,
      p:"102",
      customerId:"853371"

      
    }, "player");
  }else if(status=="5"){
    $("#player").hide();
    $(".vedio_title h1").html("直播已结束")
    $(".vedio_title").show();
  }else {
    $("#player").hide(); 
    $(".vedio_title h1").html("直播未开始")
    $(".vedio_title").show();
  }
  



  var lihtml="";
  for(var i=0;i<relatedLives.length;i++){
     lihtml+="<li leid='"+relatedLives[i].id+"'>"
              +"<div class='vedioCover'><img src='"+relatedLives[i].live_cover+"'/></div>"
              +"<div class='vedioDesc'>"
              +"<h2>"+relatedLives[i].live_name+"</h2>"
              +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+relatedLives[i].watch_num+"</span></li>"
              +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+relatedLives[i].like_num+"</span></li></ul>"
              +"</div></li>";
  }
  $(".vedioList").html(lihtml);

  



}
var getLeTvData = function(id) {
  var storage = window.localStorage;
  if (!storage.getItem("unlike"+id)) storage.setItem("unlike"+id,0);
  var jwt_token = commonCla.analyzParams("jwt_token") == undefined ? "" : commonCla.analyzParams("jwt_token");
  var url = host + "/lsLive/" + id;
  var params = {
    "jwt_token": jwt_token
  }
  commonCla.ajaxCommonFun(url, "get", function(data) {
    if (data.code == "200" && 　data != null) {
      initLeTvDom(data);
    }
  }, params)
}
var initLeTvPage = function() {
  //初始化页面数据
  var id = commonCla.analyzParams("id") == undefined ? "" : commonCla.analyzParams("id");
  getLeTvData(id);
  //切换直播
  $(".rcdLiveVedio").on("click",".vedioList li",function(){
    scrolldelay=setTimeout(function(){
      if(document.documentElement.scrollTop==0)clearTimeout(scrolldelay);
      window.scroll(0,0);
    },100);
    var leid=$(this).attr("leid");
    getLeTvData(leid);
  })
  //
   $(".app_link").click(function() {
      app_jump();
     });

}

$(function() {
  var storage = window.localStorage;
  initLeTvPage();
   //点赞
     $("#btn-zan").click(function(){
        var zan=$(this).attr("zan");
        var id=commonCla.analyzParams("id")==undefined?"":commonCla.analyzParams("id");
        var liveLikeUrl=host+"/share/like";
        /*var liveLikeUrl=host+"/lsVideo/"+id+"/like";*/
        var unlike=localStorage.getItem("unlike"+id);
        var params={
          "type":"LsLive",
          "unlike":unlike,
	  "id":id
        }
        var thisObj=$(this);
        //+-1操作
          var zanNum=Number(thisObj.next("span").html());
          var zanNumAttr=Number(thisObj.attr("zan"));
          if(unlike==0){
             thisObj.attr("src","assets/images/icon-like-red.png");
             thisObj.next("span").html(Number(zanNum+1)); 
             thisObj.attr("zan",Number(zanNumAttr+1))
          }else{
            thisObj.attr("src","assets/images/icon-like.png");
            thisObj.next("span").html(Number(zanNum-1)<0?0:Number(zanNum-1));
            thisObj.attr("zan",Number(zanNumAttr-1)<0?0:Number(zanNum-1))
          }        
          thisObj.addClass("animated");
          thisObj.addClass("rubberBand");
          setTimeout(function(){ 
                //thisObj.find("img").attr("src","assets/images/icon-like.png");
                thisObj.removeClass("animated");
                thisObj.removeClass("rubberBand")
              },500);
        //+1操作end
       commonCla.ajaxCommonFun(liveLikeUrl,"post",function(resultData){
          if(resultData!="" && resultData!=null){
            if(resultData.code=="200"){
              if(unlike==0){
                storage.setItem("unlike"+id,1);
              }else{
                storage.setItem("unlike"+id,0);
              }
            }
          }
        },params)

     })
})