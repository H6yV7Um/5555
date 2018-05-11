// var jwt_token = commonCla.analyzParams("jwt_token") == undefined ?"": commonCla.analyzParams("jwt_token");
var host=commonCla.hostBase;
var server = 1;
var login_token="";
var t="";
var first_beginTime="2017-06-16 20:00:00";
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
   //交互方法
   clientInter(bridge);
   //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/activity/microVideo/shareIndex.html",
        //   'share_url':"http://testshare.startvshow.com/starshow5.0/microVideo/shareIndex.html",
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
//获取首页数据
var getIndexData = function(sort=1, currentCount=0, count=10, keyword='') {
    var jwt_token=get_token();
    $.ajax({
        // url : commonCla.hostBase+'/microVideo?sort='+sort+'&current_count='+currentCount,
        url : commonCla.hostBase+"/microVideo?jwt_token=" + jwt_token + '&sort=' + sort +'&current_count='+currentCount+'&count='+count+ '&keyword=' + keyword,
        dataType : 'json',
        type : 'get',
        global : false,
        success: function(data) {
            var videoList = data.data.list,
            videoTotal = data.data.total,
            html = "";
            if(data.code == 200) {
                for(var i = 0; i < videoList.length; i++) {
                    if(videoList[i].is_like == 0) {
                        html += `<li class="video-item" dataId="${videoList[i].id}">
                                    <div class="video-img-outer" dataId="${videoList[i].id}">
                                        <img src="${videoList[i].cover}">
                                        <a class="play-btn" href=""></a>
                                    </div>
                                    <div class="video-info border">
                                        <div class="left">
                                            <p class="video-name">${videoList[i].title}</p>
                                            <p class="video-des">${videoList[i].name} <span class="author-school">${videoList[i].school}</span></p>
                                        </div>
                                        <div class="right">
                                            <div class="support"><img src="images/heart.png"></div>
                                            <div class="support-num">${videoList[i].like_num}</div>
                                        </div>
                                    </div>
                                </li>`
                    }else {
                        html += `<li class="video-item" dataId="${videoList[i].id}">
                                <div class="video-img-outer" dataId="${videoList[i].id}">
                                    <img src="${videoList[i].cover}">
                                    <a class="play-btn" href=""></a>
                                </div>
                                <div class="video-info border">
                                    <div class="left">
                                        <p class="video-name">${videoList[i].title}</p>
                                        <p class="video-des">${videoList[i].name} <span class="author-school">${videoList[i].school}</span></p>
                                    </div>
                                    <div class="right" style="color:#ff1d3e;">
                                        <div class="support"><img src="images/heart-red.png"></div>
                                        <div class="support-num">${videoList[i].like_num}</div>
                                    </div>
                                </div>
                            </li>`
                    }
                }
                $(".js-total").html(videoTotal);
                $(".js-video-list").append(html);
                if(videoTotal > 10) {
                    $(".load").show()
                }else {
                    $(".load").hide()
                }
                if(videoTotal > $(".js-video-list li").length) {
                    $(".js-video-list").next().html("点击加载更多");
                    $(".js-video-list").next().attr("id","js-load");
                }else if(videoList.length <= 0 || videoTotal <= $(".js-video-list li").length) {
                    $(".js-video-list").next().html("暂无更多数据");
                    $(".js-video-list").next().attr("id","");
                }

            }
        }

    });
}
// getIndexData();
//跳转到视频详情页
$("ul").on("click", ".play-btn", function(e) {
    var videoId = $(this).parent().attr("dataId"),
        jwt_token = get_token();
    if($("input[type='hidden']").val() == 'share') {
        $(this).attr('href', 'shareDetail.html?video_id='+videoId+'&jwt_token='+jwt_token)
    }else {
        $(this).attr("href", 'detail.html?video_id='+videoId+'&jwt_token='+jwt_token)
    }
})
//排序
var flag = false;
$(".popular").on("click", function() {
    page = 0;
    if(flag) {
        $(this).find('img').attr('src','images/sort-arrows.png')
        $(".js-video-list").html("");
        toSearch(1);
    }else {
        $(this).find('img').attr('src','images/sort-arrows2.png')  
        $(".js-video-list").html("");        
        toSearch(2);
    }
    flag = !flag  

})
var clientInter=function(bridge){
    //投票
    $("ul").on("click", ".video-info", function(e) {
        e.stopPropagation();         
        var id=$(this).parent().attr("dataId");
        if(get_token()=="" || get_token()==undefined){
             e.preventDefault();
             setBridgeCallHandler(bridge, {
                 'action': '1',
                 'nextStep':'1'
             })
         }else{
             //投票
             toVote(id, $(this)) 
        }
    })
}

//投票
var toVote=function(id,obj){
    var defaultHeart = $(obj).find("img").attr("src");
    var jwt_token=get_token();
    var url=host+"/microVideo?jwt_token="+jwt_token;
    var params={
      "id":id
    }
    commonCla.ajaxCommonFun(url,"post",function(ret){
        // var voteNum = ret.vote_num;
        if(ret.code == 200){
            swal({
                "title":"投票成功",
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",
  
            });
  
            $(obj).find(".right").css("color", "#ff1d3e");
            $(obj).find(".support").children().attr("src", "images/heart-red.png");
            var likeNum=$(obj).find(".support-num").html();
            var num=Number(likeNum)+1;
            $(obj).find(".support-num").html(num);
        }else {
            swal({
                "title":ret.error,
                "confirmButtonText":"确定",
                "confirmButtonColor": "#ff1d3e",
                "animation":"none",
  
              });
            $(obj).find("img").attr("src", defaultHeart)
        }   
    },params)
}
//搜索
var toSearch = function(sort, currentCount) {
    var keyword = $(".search-area").val().trim();
    if(keyword) {
        getIndexData(sort,currentCount,10, keyword)
    }else {
        getIndexData(sort,currentCount,10, "")
    }
}
$(".search").submit(function(e) {
    page = 0;
    $(".video-list").html("")
    $(".popular").find('img').attr('src','images/sort-arrows.png')
    toSearch(1);
    flag=false;
})
//分享页
var shareAgain=function(){
    //二次分享
     var tit="第四届万方数据微视频大赛“最具人气奖”投票";
     var desc="助力原创微视频作品，赢取小蚁运动相机";
    //  var link="http://testshare.startvshow.com/starshow5.0/microVideo/shareIndex.html";
     var link="https://lookmetv.com/activity/microVideo/shareIndex.html";
     var img="https://starshow-pic.b0.upaiyun.com/micro_video/logo.jpg"
     wx_share(tit,desc,link,img);
}
$(function() {
    if($("input[type='hidden']").val() == "share") {
            //二次分享
        shareAgain();
        $("ul").on("click",".video-info",function(e){
            e.stopPropagation();          
            var id=$(this).parent().attr("dataId");
            
            // 微信授权          
            if(get_token()=="" || get_token()==undefined){
                wx_authorize({},"micro-video")
            }else{
                toVote(id, $(this))
            }

        })
       
    }
    //初始化数据
    // getIndexData();
    toSearch()

})
$(".js-close").on("click", function() {
    $("#alert").hide();
    $("#mask").hide();
})
//分页
var page=0,

count = 10;
$(".video").on("click","#js-load",function(e){
    page++;
    currentCount=count*page;
    setTimeout(function(){
        if(flag) {
            toSearch(2,currentCount)  
        }else {
            toSearch(1,currentCount)
        }
    },100)
})

