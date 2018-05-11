var resultData=[{
          "id": "680",
          "user_id": "2",
          "type": "2",
          "title": "SaintLaurent重塑经典",
          "description": "  Saint Laurent重塑经典",
          "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475130251.jpg",
          "video_url": "http://starshow-file.b0.upaiyun.com/videos/acf592039e11ab739c40798104a514f1.mp4",
          "city": null,
          "watch_num": "938",
          "like_num": "99",
          "staff_id": 2,
          "created_at": "2016-09-29 14:23:57",
          "is_like": "0",
          "share": {
            "title": "SaintLaurent重塑经典",
            "content": "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
            "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475130251.jpg",
            "share_url": "http://share.xingxiu.tv/starshow5.0//video/share.html?id=680"
          },
          "tag": null
        },
        {
          "id": "679",
          "user_id": "2",
          "type": "2",
          "title": "性感玩出新花样 SF 时髦回春",
          "description": " 性感玩出新花样Salvatore Ferragamo时髦回春",
          "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475130108.jpg",
          "video_url": "http://starshow-file.b0.upaiyun.com/videos/9bc9e1f6116485e56e207072b110a4df.mp4",
          "city": null,
          "watch_num": "987",
          "like_num": "91",
          "staff_id": 2,
          "created_at": "2016-09-29 14:22:02",
          "is_like": "0",
          "share": {
            "title": "性感玩出新花样 SF 时髦回春",
            "content": "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
            "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475130108.jpg",
            "share_url": "http://share.xingxiu.tv/starshow5.0//video/share.html?id=679"
          },
          "tag": null
        },
        {
          "id": "678",
          "user_id": "2",
          "type": "2",
          "title": "BV 卓越工艺早就简约风范",
          "description": " ",
          "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475129781.jpg",
          "video_url": "http://starshow-file.b0.upaiyun.com/videos/a2439f9e2b95b4fdbac171c23e25b7c6.mp4",
          "city": null,
          "watch_num": "1058",
          "like_num": "101",
          "staff_id": 2,
          "created_at": "2016-09-29 14:16:32",
          "is_like": "0",
          "share": {
            "title": "BV 卓越工艺早就简约风范",
            "content": "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
            "cover": "http://starshow-pic.b0.upaiyun.com/videos/2/1475129781.jpg",
            "share_url": "http://share.xingxiu.tv/starshow5.0//video/share.html?id=678"
          },
          "tag": null
        }
]
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
          'share_url':"https://lookmetv.com/starshow5.0/live/share-topic.html",
          'title': "2017FW Tadashi Shoji",
          'content': "锁定时尚星秀，直击纽约秀场，Tadashi与您不见不散",
          'cover': "https://lookmetv.com/starshow5.0/festival/newyork-show.jpg"
        }
      })
    }
})
var host=commonCla.hostBase+"/v3/";
var initList=function(resultData){
      var lihtml="";
      for(var i=0;i<resultData.length;i++){
         lihtml+="<li><a href='"+resultData[i].share.share_url+"'>"
                  +"<div class='vedioCover'><img src='"+resultData[i].cover+"'/></div>"
                  +"<div class='vedioDesc'>"
                  +"<h2>"+resultData[i].title+"</h2>"
                  +"<ul class='activity'><li><img src='assets/images/icon-eye.jpg' /><span class='ml5'>"+resultData[i].watch_num+"</span></li>"
                  +"<li><img src='assets/images/icon-heart.jpg' /><span class='ml5'>"+resultData[i].like_num+"</span></li></ul>"
                  +"</div></a></li>";
      }
      $(".vedioList").html(lihtml);
 }

function getWatchNum(){
  $.ajax({
        url: host+"live/100521",
        type: "get",
        dataType: 'json',
        async: false,
        cache: false,
        success: function(data) {
          //回调函数
            var storage = window.localStorage;
            if (!storage.getItem("unlike")) storage.setItem("unlike",0);
             $("#watchNum").html(data.data.watch_num);
             $("#btn-zan").next("span").html(data.data.like_num);
             var unlike=localStorage.getItem("unlike");
             if(unlike==1){
               $("#btn-zan").attr("src","assets/images/icon-like-red.png");
             }
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
          title:"2017FW Tadashi Shoji",
          desc: "锁定时尚星秀，直击纽约秀场，Tadashi与您不见不散",
          link: "https://lookmetv.com/starshow5.0/live/share-topic.html",
          imgUrl:"https://lookmetv.com/starshow5.0/festival/newyork-show.jpg",
          trigger: function(a) {},
          success: function(a) {},
          cancel: function(a) {},
          fail: function(a) {}
        }), wx.onMenuShareTimeline({
          title:"2017FW Tadashi Shoji",
          desc: "锁定时尚星秀，直击纽约秀场，Tadashi与您不见不散",
          link: "https://lookmetv.com/starshow5.0/live/share-topic.html",
          imgUrl:"https://lookmetv.com/starshow5.0/festival/newyork-show.jpg",
          trigger: function(a) {},
          success: function(a) {},
          cancel: function(a) {},
          fail: function(a) {}
        })
      }))
    
  });

}
 $(function(){
  initList(resultData);
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