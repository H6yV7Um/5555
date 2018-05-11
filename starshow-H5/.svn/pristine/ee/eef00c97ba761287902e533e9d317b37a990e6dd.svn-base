// var jwt_token = commonCla.analyzParams("jwt_token") == undefined ?"": commonCla.analyzParams("jwt_token");
var host=commonCla.hostBase;
var server = 1;
var login_token="";
var t="";
var first_beginTime="2017-06-16 20:00:00";
var videoId =commonCla.analyzParams("video_id");
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
        window.location.href = "detail.html?video_id="+videoId+"&jwt_token="+data.jwt_token;  
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
   //交互方法
   clientInter(bridge);
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
        //   'share_url':"http://testshare.startvshow.com/starshow5.0/microVideo/shareDetail.html?video_id=" + videoId,
          'share_url':"https://lookmetv.com/activity/microVideo/shareDetail.html?video_id=" + videoId,
          'title': "第四届万方数据微视频大赛“最具人气奖”投票",
          'content': "助力原创微视频作品，赢取小蚁运动相机",
          'cover': "https://starshow-pic.b0.upaiyun.com/micro_video/logo.jpg"
        }
      })
    }
})

//jwt_token初始化
var get_token=function(){
    var jwt_token=commonCla.analyzParams("jwt_token");
     if(jwt_token=="" || jwt_token==undefined){
       jwt_token=login_token;
     }
     return jwt_token;
}
//获取详情页数据
var getDetailData = function() {
    var jwt_token=get_token();
    $.ajax({
        url : commonCla.hostBase+'/microVideo/' + videoId + "?jwt_token=" + jwt_token,
        dataType : 'json',
        type : 'get',
        global : false,
        success: function(data) {
            var videoDetail = data.data,
            html = "";
            if(videoDetail.id == videoId) {
                if($("input[type='hidden']").val() == "share") {
                    $("title").html(videoDetail.title)       
                }else {
                    $("title").html(videoDetail.title+"&4&1&8")  
                }
                $("#video").attr("src",videoDetail.video);
                $(".video-title").html(videoDetail.title);
                $(".video-author").html(videoDetail.name);
                $(".author-school").html(videoDetail.school);
                $(".video-description").html(videoDetail.content);
                $(".vote").find("span").html(videoDetail.like_num);
                $(".vote").attr("videoId", videoDetail.id)
            }
        }
    });
}
getDetailData();
var clientInter=function(bridge){
    //投票
    $(".vote").on("click", function(e) {     
        var id =commonCla.analyzParams("video_id");
        if(get_token()=="" || get_token()==undefined){
             e.preventDefault();
             setBridgeCallHandler(bridge, {
                 'action': '1',
                 'nextStep':'1'
             })
         }else{
             //投票
            toVote(id)
        }
    })
}

//投票
var toVote=function(id){
    var jwt_token=get_token();
    var url=host+"/microVideo?jwt_token="+jwt_token;
    var params={
      "id":id
    }
    commonCla.ajaxCommonFun(url,"post",function(ret){
        // var voteNum = ret.data.vote_num;
        if(ret.code == 200) {
            swal({
                "title":"投票成功",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",
  
            });
            var likeNum=$(".vote").find("span").html();
            var num=Number(likeNum)+1;
            $(".vote").find("span").html(num);
            getDetailData()
        }else{
            swal({
                "title":ret.error,
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",
  
            });
        }  
    },params)
}

var shareAgain=function(){
    //二次分享
     var tit="第四届万方数据微视频大赛“最具人气奖”投票";
     var desc="助力原创微视频作品，赢取小蚁运动相机";
    //  var link="http://testshare.startvshow.com/starshow5.0/microVideo/shareDetail.html?video_id=" + videoId;
     var link="https://lookmetv.com/activity/microVideo/shareDetail.html?video_id=" + videoId;
     var img="https://starshow-pic.b0.upaiyun.com/micro_video/logo.jpg"
     wx_share(tit,desc,link,img);
}
$(function() {
    if($("input[type='hidden']").val() == "share") {
            //二次分享
        shareAgain();
        $(".vote").on("click", function() {         
            var id =commonCla.analyzParams("video_id");
            // 微信授权          
            if(get_token()=="" || get_token()==undefined){
                wx_authorize({video_id:id},"micro-video-detail")
            }else{
                toVote(id)
            }
        })
       
       //初始化数据
    //    getIndexData();
    }
})
$(".js-close").on("click", function() {
    $("#alert").hide();
    $("#mask").hide();
})

