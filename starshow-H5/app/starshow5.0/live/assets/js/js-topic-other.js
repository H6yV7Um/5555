var shareInfo="";
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {var data = eval("(" + data + ")");}
    //下一步操作
    if (data.nextStep == '8') { 
      shareActivity();
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
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':shareInfo.share_url,
          'title': shareInfo.title,
          'content':shareInfo.content,
          'cover': shareInfo.cover
        }
      })
    }
})
var host=commonCla.hostBase+"/v3/";
var initList=function(data){
      var markId=$("#hide_markId").attr("markId");
      var markType=$("#hide_markId").attr("markType");
      var resultData=data["resultData"+markId];
      shareInfo=data["shareInfo"+markId];
      var lihtml="";var share_url="";
      
      for(var i=0;i<resultData.length;i++){
	      if(markType=="app"){
	         share_url=resultData[i].share.detail_url;
	      }else{
	         share_url=resultData[i].share.share_url;
	      }
         lihtml+="<li><a href='"+share_url+"'>"
                  +"<div class='vedioCover'><img src='"+resultData[i].share.cover+"'/></div>"
                  +"<div class='vedioDesc'>"
                  +"<h2>"+resultData[i].share.title+"</h2>"
                  +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+resultData[i].watch_num+"</span></li>"
                  +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+resultData[i].like_num+"</span></li></ul>"
                  +"</div></a></li>";
      }
      $(".vedioList").html(lihtml);
 }

function getWatchNum(){//正式
  var id=shareInfo.id;
  $.ajax({
        url: host+"live/"+id,
        type: "get",
        dataType: 'json',
        async: false,
        cache: false,
        success: function(data) {
        	$("#watchNum").html(data.data.watch_num);
            $("#btn-zan").next("span").html(data.data.like_num);
          //回调函数
            /*var storage = window.localStorage;
            if (!storage.getItem("unlike")) storage.setItem("unlike",0);
             $("#watchNum").html(data.data.watch_num);
             $("#btn-zan").next("span").html(data.data.like_num);
             var unlike=localStorage.getItem("unlike");
             if(unlike==1){
               $("#btn-zan").attr("src","assets/images/icon-like-red.png");
             }*/
        },
        error: function() {
        }
      })
}
/*! starshow 2016-03-25 */
function wx_share() {
  var wx_host = "https://startvshow.com/v6";
  var wx_api = wx_host + "/wechat/sign?url=" + encodeURIComponent(location.href);
  $.getJSON(wx_api, function(a) {
     a.data.status && (wx.config({
			debug: !1,
			appId: a.data.appId,
			timestamp: a.data.timestamp,
			nonceStr: a.data.nonceStr,
			signature: a.data.signature,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
	}),
       wx.ready(function() {
        wx.onMenuShareAppMessage({
          /*title: data.data.share.title,
          desc: data.data.share.content,
          link: data.data.share.share_url,
          imgUrl: data.data.share.cover,*/
          title:shareInfo.title,
          desc: shareInfo.content,
          link: shareInfo.share_url,
          imgUrl:shareInfo.cover,
          trigger: function(a) {},
          success: function(a) {},
          cancel: function(a) {},
          fail: function(a) {}
        }), wx.onMenuShareTimeline({
           title:shareInfo.title,
          desc: shareInfo.content,
          link: shareInfo.share_url,
          imgUrl:shareInfo.cover,
          trigger: function(a) {},
          success: function(a) {},
          cancel: function(a) {},
          fail: function(a) {}
        })
      }))
    
  });

}

function initData(){
  $.ajax({
    url:"assets/mock/resultData.json",
    type: "get",
    dataType: 'json',
    async: false,
    cache: false,
    success:function(data){
      initList(data);
    },
    error: function() {

        }
  })
}
 $(function(){
  //初始化页面数据
  initData();

  wx_share();
  getWatchNum();
   $("#btn-zan").click(function(){
        var storage = window.localStorage;
        if (!storage.getItem("unlike")) storage.setItem("unlike",0);
        var zan=$(this).attr("zan");
        var unlike=localStorage.getItem("unlike");
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
        
        if(unlike==0){
                storage.setItem("unlike",1);
              }else{
                storage.setItem("unlike",0);
        }

     })
 })