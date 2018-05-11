var host =commonCla.hostBase;
var server = 0;
var jwt_token_login = "";
var jwt_token = commonCla.analyzParams("jwt_token") == undefined ? jwt_token_login : commonCla.analyzParams("jwt_token");


//设置WebViewJavascriptBridge通信回调方法
setupWebViewJavascriptBridge(function(bridge) {
	//注册js回调方法
	bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
		if (isIphone()) {} else {
			var data = eval("(" + data + ")");
		}
		if (data.nextStep == '1') {
          //登录状态保存
	      if (jwt_token == "" || jwt_token!=data.jwt_token) {
	        jwt_token_login = data.jwt_token;
	        jwt_token = data.jwt_token;
	      }
	      //初始化页面
	      window.location.href="movieRoleDetail.html?id="+commonCla.analyzParams("id")+"&jwt_token="+data.jwt_token
		}
		if(data.nextStep=="7"){
	      otherShare();
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

//其他分享
  /*var otherShare=function(){
		var title="";
		var cover="";
		var share_url="";
		var content="";
			
		setBridgeCallHandler(bridge, {
			'action': '4',
			'user_id': uid,
			'star_id': star_id,
			'share': {
				//'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
				'share_url': share_url,
				'title': title,
				'content': content,
				'cover': cover
			}
		})
    }*/
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/starshow5.0/schoolElchee/movieRoleShare.html?id="+commonCla.analyzParams("id"),
          'title': "我在参加星秀微视频校园大使招募，快来帮我拉票",
          'content': "只为寻找优秀的你，为传统文化代言，关注时尚星秀，校园大使招募更多精彩为你呈现！",
          'cover': $(".mrDetailHeader .head-pic img").attr("src")
        }
      })
    }
	//活动页面->个人中心
	$(document).on("click", ".mrDetailHeader .head-pic", function(e) {
			var uid = $(this).attr("uid");
			e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '2',
				'user_id': uid
			})
		})
    //分享
    $("#toShare").click(function(){
    	shareActivity();
    })
	//打榜
	$("#toHit").click(function(e) {
		if(jwt_token=="" || jwt_token==undefined){
			var uid=commonCla.analyzParams("id");
		    e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '1',
				'nextStep': '1',
				'user_id':commonCla.analyzParams("id")
		   })
		}else{
			toVote()
		}
		
	})
	$("#toDel").click(function(){
		if(jwt_token=="" || jwt_token==undefined){
			var uid=commonCla.analyzParams("id");
		    e.preventDefault()
			setBridgeCallHandler(bridge, {
				'action': '1',
				'nextStep': '1',
				'user_id':commonCla.analyzParams("id")
		   })
		}else{
			 delWorks();
		}
	})
   
})
var play_video=function(){
  tcc.BOX_show("videoCon");
  $("#video_close").click(function(){
    /*var isEnd = document.getElementById("adVideo").ended;
    swal_confirm("登录后，首次观看完视频赠送一次投票机会，确定关闭吗？","关闭",function(){
         tcc.BOX_remove("videoCon");
      },true);*/
    $("#myVideo").hide();
    $("#adVideo").hide();
    tcc.BOX_show("messdiv-tip");
    $("#messdiv-tip").css("z-index","10000");
  })
  $("#adVideo").on('ended', function(){
    playVideoAdd();
  });
  
}
var playVideoAdd=function(){
  var url=host+"/activities/schoolEmissary/finishVideo?jwt_token="+jwt_token;
    commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      tcc.BOX_remove("videoCon");
      //swal_tip("");
      swal_confirm("恭喜你，观看视频获得了一次投票机会","确定",function(){
				$("#myVideo").show();
            },false);
      
    }else{
      if(ret.code!="401"){
      	 tcc.BOX_remove("videoCon");
        //swal_tip(ret.error);
        swal_confirm(ret.error,"确定",function(){
				$("#myVideo").show();
            },false);
        $("#myVideo").show();
	   
      }
      
    }
   })
}
var initDetailPage = function(resultData) {
	/*if(resultData.data.is_like==0){
		$("#toHit").removeAttr("disabled");
		$("#toHit").removeClass("disabled")
	}else{
		$("#toHit").attr("disabled");
		$("#toHit").addClass("disabled")
	}*/
	var id=commonCla.analyzParams("id");
	var cur_user=commonCla.analyzParams("curUser");
	if(id==cur_user){
		$("#toDel").show();
	}
	var works=resultData.data.works;
	if(works.length>0){
		$("#myVideo").attr("src",works[0].video_url);
		$("#shareInfo").attr("workid",works[0].id)
	}
	var users=resultData.data.user==null?"":resultData.data.user;
	var score=resultData.data.score==null?"":"<span class='mr15'>专家"+resultData.data.score+"</span>"
	
	$(".self_cons .head-pic img").attr("src",users.head_pic);
	/*$("#myVideo").attr("poster",users.head_pic);*/
	$(".self_cons .head-pic").attr("uid",resultData.data.user_id);
	var user_info='<div class="currentName">'+users.name+'</div>'+
	'<div class="desc">'+(resultData.data.comments==null?"":resultData.data.comments.substr(0,30))+'</div>'+
	'<div class="likes"><img class="vm" src="assets/images/icon-like.png" width="15px"/>'+
	'<span class="vm" id="followNum">'+resultData.data.like_nums+'</span></div>'+
	'<div class="score">'+score+'</div>'
	$(".user-info").html(user_info);
}
//获取详情页面
var getDetailData = function(uid) {
		var jwt_token=commonCla.analyzParams("jwt_token");
		var url = host + "/activities/schoolEmissary/" + uid + "?jwt_token="+jwt_token;
		commonCla.ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				$(".loadding").hide();
				$(".mrDetailCons").show();
				initDetailPage(resultData);
				 var s_share_url="http://testshare.xingxiu.tv/starshow5.0/schoolElchee/movieRoleShare.html?id="+commonCla.analyzParams("id");
			     var s_title="我在参加星秀微视频校园大使招募，快来帮我拉票";
			     var s_content= "只为寻找优秀的你，为传统文化代言，关注时尚星秀，校园大使招募更多精彩为你呈现！";
				 var s_cover= $(".mrDetailHeader .head-pic img").attr("src");
				 if(is_share()){
				 	 wx_share(s_title,s_content,s_share_url,resultData.data.user.head_pic);
				 }
                
			}

		})

}

var swal_tip=function(title){
  swal({
              "title":title,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

       });
}
var swal_confirm=function(title,btntext,callbackFun,isCancel){
  swal({
          title: title,
          /*type: "warning",*/
          showCancelButton: isCancel,
          confirmButtonColor: "#ff1d3e",
          confirmButtonText: btntext,
          cancelButtonText:"取消",
          closeOnConfirm: true
      },function(){
        //回调函数
          if (callbackFun) {
            callbackFun();
          }
      })
}
var swal_confirm_cancel=function(title,btntext,callbackFun,isCancel){
  swal({
          title: title,
          showCancelButton: isCancel,
          confirmButtonColor: "#ff1d3e",
          confirmButtonText: btntext,
          cancelButtonText:"取消",
          closeOnConfirm: true,
          closeOnCancel: true
      },function(isConfirm){
      	//回调函数
          if (callbackFun) {
            callbackFun(isConfirm);
          }
	  /*if (isConfirm) {
	    swal("Deleted!", "Your imaginary file has been deleted.", "success");
	  } else {
	    swal("Cancelled", "Your imaginary file is safe :)", "error");
	  }*/
    })
}
var is_share=function(){
  if($("#type").attr("status")=="share"){
    return true;
  }else{
    return false;
  }
  
}
var toVote = function() {
	$(".loadding2").show();
	$("#myVideo").hide();
	var uid = commonCla.analyzParams("id");
	var host =commonCla.hostBase;
	var url = host + "/activities/" + uid + "/vote?jwt_token="+jwt_token;
	commonCla.ajaxCommonFun(url, "POST", function(resultData) {
		$(".loadding2").hide();
		if (resultData.code == "200") {
			/*swal_confirm("投票成功","确定",function(){
				if(resultData.data.finish_video==0){
					play_video();
				}else{
					setTimeout(function(){
						$("#myVideo").show();
					},500)
				}
            },false);*/
	        if(resultData.data.finish_video==0){
	        	swal_confirm_cancel("投票成功,观看视频可获得一次投票机会","确定",function(isConfirm){
	        		if(isConfirm){
	        			play_video();
	        		}else{
	        			setTimeout(function(){
						$("#myVideo").show();
					   },500)
	        		}
                   
	        	},true)

	        }else{
	        	swal_confirm("投票成功","确定",function(){
	        		setTimeout(function(){
						$("#myVideo").show();
					},500)
	        	},false);
	        }
	      
			getDetailData(uid);
		}else{
			var msg=resultData.error.msg
			if(msg==undefined){
				msg=resultData.error;
			}
			if(resultData.error.finish_video==0){
				swal_confirm_cancel(msg+"投票成功,观看视频可获得一次投票机会","确定",function(isConfirm){
	        		if(isConfirm){
	        			play_video();
	        		}else{
	        			setTimeout(function(){
						$("#myVideo").show();
					   },500)
	        		}
                   
	             },true)
			}else{
				swal_confirm(msg,"确定",function(){
	        		setTimeout(function(){
						$("#myVideo").show();
					},500)
	        	},false);
			}
			/*swal_confirm(msg,"确定",function(){
				if(resultData.error.finish_video==0){
					play_video();
				}else{
					setTimeout(function(){
						$("#myVideo").show();
					},500)
				}
            },false);*/


		}
		

	})
}

var initialize = function() {
	var video;
	
	video = document.getElementById("myVideo");
	video.addEventListener('loadeddata',captureImage);
};
 
var captureImage = function() {
		var video = document.getElementById("myVideo");
		var scale = 0.8;
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
 
            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            video.attr("poster",canvas.toDataURL("image/png"))
            //output.appendChild(img);
};
var delWorks=function(){
	var workId=$("#shareInfo").attr("workid");
	var url=host+"/activities/works/"+workId+"/delete";
	var params={
		"jwt_token":jwt_token
	}
	$("#toDel").html("<img src='assets/images/loadding2.gif' style='width:15px;' />")
	commonCla.ajaxCommonFun(url,"post",function(ret){
		$("#myVideo").hide();
		if(ret.code==200){
			swal_confirm(ret.data,"确定",function(){
				 window.location.href="index.html?jwt_token="+jwt_token;
			},false);
         
		}else{
			swal_confirm(ret.error,"关闭",function(){
	        		setTimeout(function(){
						$("#myVideo").show();
					},200)
	        	},false);
		}
		$("#toDel").html("删除作品")
	},params)
}


$(function() {
	var uid = commonCla.analyzParams("id");
	getDetailData(uid);
	$("#btn_cancel").click(function(){
        tcc.BOX_remove("messdiv-tip");
        $("#adVideo").show();
        tcc.BOX_show("videoCon");
       
	})
	$("#btn_sure").click(function(){
		tcc.BOX_remove("messdiv-tip");
		tcc.BOX_remove("videoCon");
		$("#adVideo").show();
		 var video=document.getElementById("adVideo")
                 video.pause();
		$("#myVideo").show();
	})
	//截图
	//initialize();
	//分享页
	if(is_share()){
		//打榜
		$("#toHit").click(function(e) {
			var uid=commonCla.analyzParams("id");
			if(jwt_token=="" || jwt_token==undefined){
				 //window.location.href= host+"/v12/wechat/generalAuth?redirect_url=http://testshare.xingxiu.tv/starshow5.0/schoolElchee/movieRoleShare.html?id=247&";
			    window.location.href=host+"/v8/wechat/activityAuth?type=schoolElcheeDetail&id="+uid;
			}else{
				toVote();
			}
			
		})
	}

   
})