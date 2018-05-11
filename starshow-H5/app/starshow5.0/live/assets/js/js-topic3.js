var resultData=[{
          "id": "4199",
          "user_id": "4",
          "type": "2",
          "title": "Tory Burch早春度假系列",
          "description": "Tory Burch早春度假系列",
          "cover": "https://starshow-pic.b0.upaiyun.com/fashion/1/1481725673.jpg",
          "video_url": "",
          "city": null,
          "watch_num": "938",
          "like_num": "99",
          "staff_id": 2,
          "created_at": "2016-09-29 14:23:57",
          "is_like": "0",
          "share": {
            "title": "Tory Burch早春度假系列",
            "content": "Tory Burch早春度假系列！",
            "cover": "https://starshow-pic.b0.upaiyun.com/fashion/1/1481725673.jpg",
            "share_url": "https://lookmetv.com/starshow5.0/news/v5/share.html?new_id=4199"
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
          'share_url':"https://lookmetv.com/starshow5.0/live/share-topic3.html",
          'title': "TORY BURCH FW17",
          'content': "锁定时尚星秀，直击纽约秀场，TORY BURCH与您不见不散",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/show/newyork-20170214.jpg"
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

function getWatchNum(){//正式100554
  $.ajax({
        url: host+"live/100554",
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
          title:"TORY BURCH FW17",
          desc: "锁定时尚星秀，直击纽约秀场，Tadashi与您不见不散",
          link: "https://lookmetv.com/starshow5.0/live/share-topic3.html",
          imgUrl:"https://starshow-pic.b0.upaiyun.com/default/show/newyork-20170214.jpg",
          trigger: function(a) {},
          success: function(a) {},
          cancel: function(a) {},
          fail: function(a) {}
        }), wx.onMenuShareTimeline({
          title:"TORY BURCH FW17",
          desc: "锁定时尚星秀，直击纽约秀场，TORY BURCH与您不见不散",
          link: "https://lookmetv.com/starshow5.0/live/share-topic3.html",
          imgUrl:"https://starshow-pic.b0.upaiyun.com/default/show/newyork-20170214.jpg",
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