var onBridgeReady=function(){  
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {  
            document.getElementById('myAudio').play();
        });  
}
var addSounds=function(audio_path){
	if(audio_path!=""){
		$("#myAudio").attr("src",audio_path);
	}
   var ua = navigator.userAgent.toLowerCase();
   var isA = ua.indexOf("android") > -1;
   if (isA) {
    myAudio.play();
   }
   var isIph = ua.indexOf("iphone") > -1;
   if (isIph) {
    if (typeof WeixinJSBridge === "undefined"){
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady , false);    
    }else{
        onBridgeReady();
    }
   }
   if (!isA || !isIph) {
    myAudio.play();
   }
}

/*var createMrakImg=function(name){
    	var c=document.getElementById("myCanvas");
	    var ctx=c.getContext("2d");
	    ctx.font="30px 微软雅黑";
	    // Create gradient
	    var gradient=ctx.createLinearGradient(0,0,c.width,0);
	    gradient.addColorStop("0","#000");
	    gradient.addColorStop("0.5","#000");
	    gradient.addColorStop("1.0","red");
	    // Fill with gradient
	    ctx.fillStyle=gradient;
	    ctx.fillText(name,10,90);
	    var img = convertCanvasToImage(c);
	    return img
}
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}*/
setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') { //登录

    }else if (data.nextStep == '8') { 
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
   //交互方法
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/activity/goldenHorse/share.html",
          // 'share_url':"http://testshare.startvshow.com/activity/goldenHorse/share.html",
          'title': "我在金马奖颁奖典礼现场",
          'content': "你一定猜不到我旁边坐的谁？",
          'cover': "https://starshow-pic.b0.upaiyun.com/movies/jmj2.jpg"
        }
      })
    }
   $(".btn_share").click(function(){
   	shareActivity();
   })

})
var shareAgain=function(){
   //二次分享
    var tit="我在金马奖颁奖典礼现场";
    var desc="你一定猜不到我旁边坐的谁？";
    var link="https://lookmetv.com/activity/goldenHorse/share.html";
    var img="https://starshow-pic.b0.upaiyun.com/movies/jmj2.jpg"
    wx_share(tit,desc,link,img);
}
var wx_share=function(title,desc,link,imgUrl){
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
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			}), wx.onMenuShareTimeline({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
				trigger: function(a) {},
				success: function(a) {},
				cancel: function(a) {},
				fail: function(a) {}
			})
		}))
	});
}
var initpage=function(){
	if($("#hide_page").attr("pageName")=="share"){
		shareAgain();
	}
	
		    
	//index
	addSounds();
	setTimeout(function(){
	 $(".first_page").hide();
	 $(".main_page").show();
	 myAudio.pause();
	},3000)
	//answers question
	$(".questions_main").on("click",".btn_check",function(){
		$(this).attr("src","images/icon-check-selected.png");
		var thiss=$(this);
		var inx=thiss.parents(".questions_main").index()+1;
		setTimeout(function(){
			thiss.parents(".option_list").hide();
			thiss.parents(".option_list").prev(".ques_tit").hide();
			thiss.parents(".option_list").next(".answers").show();
			addSounds("images/audios/film0"+(inx-1)+".mp3");
		},200)
		setTimeout(function(){
			$(".questions_main").hide();
			if(inx<=4){
				$("#ques_con"+inx).show();		
			}else{
				$(".goldenHorse_pics").show();

			}
		},11000)

	})
	//生成图片
	$(".btn_submit").click(function(){
		var name=$(".txt_name").val();
		var mark_height=640/0.80
		var mark_width=260
		if(name==""){
			swal({
              "title":"请输入名字",
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

            });
		}else if(name.length>5){
			swal({
              "title":"名字不能超过五个字",
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

            });

		}else{
			var ua = navigator.userAgent.toLowerCase();
			var isA = ua.indexOf("android") > -1;
			if (isA) {
				$.ajax({
					cache : false,
					type : "get",
					url : "http://47.94.84.7:8085/CollectionAuction/msgcontroller/getNewImg",
					data : {
						name:name,
						words: encodeURI(name),
							},
					dataType : "json",
					success : function(ret) {
						$(".main_page").hide();
					    $(".result_main").show();
					    $(".result").attr("src", ret.imgurl)
					},
					error : function(ret) {
					}
				});
			}
			var isIph = ua.indexOf("iphone") > -1;
			if (isIph) {
				// default
		    	$(".result_enco").img2blob();
		    	// with watermark
		    	$(".result").img2blob({
			        watermark: name,
			        fontStyle: 'Microsoft YaHei,Arial',
			        fontSize: '40', // px
			        fontColor: 'black', // default 'black'
			        fontX: mark_width, // The x coordinate where to start painting the text
			        fontY: mark_height // The y coordinate where to start painting the text
		   		});
		    	$(".main_page").hide();
		    	$(".result_main").show();
		   }
		}
	})
	 

}
$(function(){
	initpage();
})