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
    //立即参与登录返回
    if (data.nextStep == '1') {
      //登录状态保存
      if (jwt_token == "" || jwt_token!=data.jwt_token) {
        jwt_token_login = data.jwt_token;
        jwt_token = data.jwt_token;
      }
      //初始化页面
      window.location.href="index.html?jwt_token="+data.jwt_token
    }
    if (data.nextStep == '2') {
      if (jwt_token == undefined || jwt_token == "") {
        jwt_token_login = data.jwt_token;
        jwt_token = data.jwt_token;
      }
      if (jwt_token == "") {
        //window.location.href = "index.html?jwt_token=" + data.jwt_token;
      } else {
        

      }
    }
    if(data.nextStep=="8"){
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

  //活动页面->个人中心
  $(document).on("click", ".prodList .headPic", function(e) {
      var uid =$(this).attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '2',
        'user_id':uid
      })
    })
    //活动分享
    var shareActivity=function(){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          'share_url':"https://lookmetv.com/starshow5.0/schoolElchee/share.html",
          'title': "微视频校园大使招募",
          'content': "只为寻找优秀的你，为传统文化代言，关注时尚星秀，校园大使招募更多精彩为你呈现！",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/wsp.jpg"
        }
      })
    }
   //点击视频
  /*$("#btn_video").click(function(e){
    if(jwt_token=="" || jwt_token==undefined){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'activityType':'3'
      })
    }else{
      play_video();
    }
  })*/
  
  //立即参与 未登录去登录--已登录跳转reg
  $("#toAdd").click(function(e) {
    if(jwt_token=="" || jwt_token==undefined){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'activityType':'3'
      })
    }else{
      var category=$("#joinStatus").attr("categoryId");
      window.location.href="reg.html?jwt_token="+jwt_token+"&works_status="+$("#joinStatus").attr("status")+"&categoryId="+category;
    }
  })
  //点赞
  $(".prodList").on("click",".poster_zan",function(e){
    e.stopPropagation();//终止事件冒泡 
    if(jwt_token=="" || jwt_token==undefined){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'activityType':'3'
      })
    }else{
      var uid=$(this).parents("li").attr("uid");
      toVote(uid,$(this))
    }
      
  })
  //排行榜点赞
  $(".rankingMain").on("click",".follow-num",function(e){
    if(jwt_token=="" || jwt_token==undefined){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'activityType':'3'
      })
    }else{
      var uid=$(this).parents("li").attr("uid");
      toVote(uid,$(this))
    }
  })

})
/*client end*/

//初始化排行榜
var initRankData=function(resultData){
  var user=resultData.data.current_user;
  // /user.user_rank=="0" || user.user_rank==undefined
  var category=Number($("#js-switchTab-area li.cur").index()+1);
  if(user==undefined || user.category!=category || user.status!=2){
    $(".curPersonInfo").hide();
  }else{
    var cur_score=user.score==null?"":'<span class="mr15">专家'+user.score+'</span>'
    var curPerson='<a href="'+toDetail(user.id)+'"><div class="head-pic"><img src="'+user.user.head_pic+'">'+
        '<span class="icon_rank">'+user.rank+'</span>'+
      '</div>'+
      '<div class="user-info">'+
        '<div class="currentName">'+user.user.name+'</div>'+
       ' <div class="col_grey f13">'+cur_score+'<span>票'+commonCla.cWan(user.like_nums)+'</span></div>'+
      '</div></a>'+
      '<div class="follow-num">'+
        '<!--<span id="followNum"></span>-->'+
        '<img src="assets/images/icon-like2.png">'+
      '</div>'+
    '<div class="divSpace cb"></div>'
    
    $(".rankingMain .curPersonInfo").html(curPerson);
    $(".curPersonInfo").show();

  }
   var current_count=$(".rankList li").length;
  var pageData=resultData.data.page_data;
  var rankHtml="";
  for (var i = 0; i < pageData.length; i++) {
    var score=pageData[i].score==null?"":"<span class='mr15'>专家"+pageData[i].score+"</span>"
    var curImg=pageData[i].is_like=="0"?"icon-like2":"icon-like-red";
    var cover=pageData[i].user.head_pic==""?"assets/images/headPic-default.png":pageData[i].user.head_pic;
    if(i<3 && current_count<1){
        rankHtml+="<a href='"+toDetail(pageData[i].id)+"'><li uid='"+pageData[i].id+"'>"
          +"<div class='head-pic'><div class='number"+(i+1)+"'></div><img src='"+cover+"'></div><div class='user-name'>"+
          pageData[i].user.name+"<div class='user_desc'>"+score+"<span class='like_nums'>票"+commonCla.cWan(pageData[i].like_nums)+"</span></div></div>"
          +"<p class='rank-topsNum'></p>"
          +"</a><div class='follow-num'>"
          +"<img src='assets/images/"+curImg+".png'/>"
          +"</div>"
          +"</li>"
    }else{
        rankHtml+="<a href='"+toDetail(pageData[i].id)+"'><li uid=''>"
          +"<div class='head-pic'><img src='"+cover+"'><span class='icon_rank'>"+Number(current_count+i+1)+"</span></div><div class='user-name'>"+
          pageData[i].user.name+"<div class='user_desc'>"+score+"<span class='like_nums'>票"+commonCla.cWan(pageData[i].like_nums)+"</span></div></div>"
          +"</a><div class='follow-num'>"
          +"<img src='assets/images/"+curImg+".png'/>"
          +"</div>"
          +"</li>"
    }
    
      
  }
  $(".rankList").append(rankHtml);
  //加载更多按钮文字
  var total=resultData.data.total;
  if(total>$(".rankList li").length){
    $(".rankList").next("div.more-rank").html("点击加载更多");
    $(".rankList").next("div.more-rank").attr("id","js-moreRank");
  }else if(pageData.length<=0 || total<=$(".rankList li").length){
    $(".rankList").next("div.more-rank").html("暂无更多数据");
    $(".rankList").next("div.more-rank").attr("id","");
    setTimeout(function(){
      $(".rankList").next("div.more-rank").html("点击加载更多");
      $(".rankList").next("div.more-rank").attr("id","js-moreRank");
     },60000)
  }
}
//获取排行榜列表数据
var getRankData=function(category){
  var current_count=$(".rankList li").length;
  var url=host+"/activities/schoolEmissary?jwt_token="+jwt_token+"&current_count="+current_count;
  var params={
    "category":category
  }
  commonCla.ajaxCommonFun(url, "get", function(resultData){
      if(resultData.code=="200"){
       initRankData(resultData);
     }
      
  },params)

}
//获取作品列表数据
var getWorksData=function(category){
  var current_count=$(".prodList li").length;
  var url=host+"/activities/schoolEmissary?jwt_token="+jwt_token+"&current_count="+current_count;
  var params={
    "category":category,
    "sort":"created_at"
  }
  commonCla.ajaxCommonFun(url, "get", function(resultData){
      if(resultData.code=="200"){
       $(".loadding").hide();
       $(".mrMain").show();
       initWorksData(resultData);
     }
      
  },params)

}

var initWorksData=function(resultData){
  
  //保存状态
  var currentUser=resultData.data.current_user==null?"":resultData.data.current_user;
  var status=currentUser.status==undefined?"0":currentUser.status;
  if(status=="2"){
   $("#toAdd").hide();
  }else{
   $("#toAdd").show();
  }
  
  $("#joinStatus").attr("status",status);
  $("#joinStatus").attr("categoryId",currentUser.category);
  $("#joinStatus").attr("cur_userId",currentUser.id);
  //初始化列表
  var current_count=$(".prodList li").length;
  var worksHtml="";
  var cover="";
  $(".allNum").html(resultData.data.total);
  $("#joinNumber").html(resultData.data.user_num);
  var pageData=resultData.data.page_data;

  for (var i = 0; i < pageData.length; i++) {
   cover=pageData[i].user.head_pic==""?"assets/images/headPic-default.png":pageData[i].user.head_pic;
   var time=dateDiff("H", pageData[i].created_at, resultData.current_time);
   if(time<=1){
    time="1小时内"
   }else if(time>24){
    time=Math.round(time/24)+"天前"
   }else{
    time=time+"小时前"
   }
   var curStatus=pageData[i].is_like=="0"?"":" cur";
   var curImg=pageData[i].is_like=="0"?"icon-like":"icon-like-red";
   var score=pageData[i].score==null?"":"<span class='mr15'>专家"+pageData[i].score+"</span>"

   var works=pageData[i].works[0]==undefined?"":pageData[i].works[0];
   var users=pageData[i].user==undefined?"":pageData[i].user;
   var work_poster=users.head_pic;
   var default_url="https://starshow-pic.b0.upaiyun.com/default/icon/avatar.png!250x250"
   if(work_poster==undefined || work_poster==default_url){
     work_poster="assets/images/default_poster.png"
   }
    worksHtml+="<li uid='"+pageData[i].id+"'>"
    +"<div class='toDetail'></div>"
    +"<div class='prodPoster'>"
      +"<img class='poster' src='"+work_poster+"' />"
      +"<div class='poster_zan"+curStatus+"'>"
        +"<img src='assets/images/"+curImg+".png' />&nbsp;<span>投票</span>"
      +"</div>"
    +"</div>"
    +"<div class='prodInfo'>"
      +"<div class='headPic' uid='"+pageData[i].id+"'><img src='"+cover+"' /></div>"
      +"<div class='prodCons'>"
        +"<p><span>"+pageData[i].user.name+"</span></p>"
        +"<p>"+score+"<span class='like_nums'>票"+pageData[i].like_nums+"</span></p>"
      +"</div>"
    +"</div>"
  +"</li>"
  };
  $(".prodList").append(worksHtml);
  //加载更多按钮文字
  var total=resultData.data.total;
  if(total>$(".prodList li").length){
    $(".prodList").next("div.more-rank").html("点击加载更多");
    $(".prodList").next("div.more-rank").attr("id","js-moreRank");
  }
  if(pageData.length<=0 || total<=$(".prodList li").length){
    $(".prodList").next("div.more-rank").html("暂无更多数据");
    $(".prodList").next("div.more-rank").attr("id","");
    setTimeout(function(){
      $(".prodList").next("div.more-rank").html("点击加载更多");
      $(".prodList").next("div.more-rank").attr("id","js-moreRank");
     },60000)
  }
}
var chooseList=function(){
     var category=Number($("#js-switchTab-area li.cur").index()+1);
     if($("#js-switchTab li.cur").index()=="0"){
       getWorksData(category)
     }else{
      //获取排行
       getRankData(category);
     }
}
//
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
//投票
var toVote = function(uid,obj) {
  var default_heart=$(obj).find("img").eq(0).attr("src");
  if($(obj).hasClass("follow-num")){
     $(obj).find("img").eq(0).attr("src","assets/images/loadding2.gif");
  }else{
     $(obj).find("span").html("<img src='assets/images/loadding2.gif' style='width:20px'/>");
     $(obj).find("img").eq(0).hide();
  }
 
  var url = host + "/activities/" + uid + "/vote?jwt_token="+jwt_token;
  commonCla.ajaxCommonFun(url, "post", function(resultData) { 
    if (resultData.code == "200") {
        var nums=$(obj).parents("li").find(".like_nums").html().split("票")[1];
        $(obj).parents("li").find(".like_nums").html("票"+Number(Number(nums)+1));
        $(obj).find("img").attr("src","assets/images/icon-like-red.png")
       swal_tip("投票成功");
       //刷新列表
      
    }else{
      if(resultData.code == "422"){
       swal_tip("一天只能投票一次。");
      }else{
        swal_tip("账户信息失效，请重新登录");
      }
      $(obj).find("img").eq(0).attr("src",default_heart);
    }
    $(obj).find("span").html("投票");
    $(obj).find("img").show();
  })
}
var is_share=function(){
  if($("#type").attr("status")=="share"){
    return true;
  }else{
    return false;
  }
  
}
var toDetail=function(uid){
   var url_name="movieRoleDetail"
    if(is_share()){
      url_name="movieRoleShare"
    }
    var curr_userId=$("#joinStatus").attr("cur_userId");
    var result_url=url_name+".html?id="+uid+"&curUser="+curr_userId+"&jwt_token="+jwt_token;
    return result_url;
    //window.location.href=url_name+".html?id="+thi.parents("li").attr("uid")+"&curUser="+curr_userId+"&jwt_token="+jwt_token;
}

var play_video=function(){
  tcc.BOX_show("videoCon");
  $("#adVideo").show();
  $("#video_close").click(function(){
    var video=document.getElementById("adVideo")
    video.pause();
    $("#adVideo").hide();
    tcc.BOX_show("messdiv-tip");
    $("#messdiv-tip").css("z-index","10000");
    /*swal_confirm("登录后，首次观看完视频赠送一次投票机会，确定关闭吗？","关闭",function(){	 
	  tcc.BOX_remove("videoCon");
      },true);*/
  })
  $("#adVideo").on('ended', function(){
    playVideoAdd();
  });
  
}
var playVideoAdd=function(){
  var url=host+"/activities/schoolEmissary/finishVideo?jwt_token="+jwt_token;
    commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      swal_tip("恭喜你，观看视频获得了一次投票机会");
    }else{
      if(ret.code!="401"){
        swal_tip(ret.error);
      }
      tcc.BOX_remove("videoCon");
    }
   })
}
var initPageAction=function(){
  //初始化作品列表
   $(".prodList").html("");
   var categoryId=1;
   if(commonCla.analyzParams("categoryId")!=undefined && commonCla.analyzParams("categoryId")!="undefined" && commonCla.analyzParams("categoryId")!="" && commonCla.analyzParams("categoryId")!=null && commonCla.analyzParams("categoryId")!="null"){
     categoryId=commonCla.analyzParams("categoryId");
   }
   $("#js-switchTab-area li").removeClass("cur");
   $("#js-switchTab-area li").eq(categoryId-1).addClass("cur");
   getWorksData(categoryId);
  //作品和排行切换操作
  $("#js-switchTab li").click(function(){
    if(!$(this).hasClass("cur")){
      $("#js-switchTab li").removeClass("cur");
      $(this).addClass("cur");
      var num=Number(Number($(this).index())+1);
      $(".listCons").hide();
      $("#con"+num).show();
      //获取列表
      $(".prodList").html("");
      $(".rankList").html("");
       chooseList();
    }
    
  })
  //赛区切换
  $("#js-switchTab-area li").click(function(){
    $("#js-switchTab-area li").removeClass("cur");
    $(this).addClass("cur");
    //var num=Number(Number($(this).index())+1);
    //获取列表两个接口
    $(".prodList").html("");
    $(".rankList").html("");
     chooseList();
  })
  //加载更多
  /*$(document).on("click","#js-moreRank",function(){alert(1)
      chooseList();
  })*/
  $(".more-rank").click(function(){
     chooseList();
  })
  /*$(".cere-search").click(function(){
    window.location.href="search.html?jwt_token="+jwt_token;
  })*/
  //进详情
  $(".prodList").on("click",".toDetail",function(){
    var uid=$(this).parents("li").attr("uid")
    window.location.href=toDetail(uid);
  })

   //点击视频
  $("#btn_video").click(function(){
    play_video();
  })
  
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
}
$(function(){
 initPageAction();

//分享页
 if(is_share()){
   //二次分享
   var s_share_url="https://lookmetv.com/starshow5.0/schoolElchee/share.html";
   var s_title="微视频校园大使招募";
   var s_content= "只为寻找优秀的你，为传统文化代言，关注时尚星秀，校园大使招募更多精彩为你呈现！";
   var s_cover= "https://starshow-pic.b0.upaiyun.com/default/wsp.jpg";
   wx_share(s_title,s_content,s_share_url,s_cover);
  //点赞
  $(".prodList").on("click",".poster_zan",function(e){ 
     e.stopPropagation();
    if(jwt_token=="" || jwt_token==undefined){
     /*window.location.href= host+"/v12/wechat/generalAuth?redirect_url=http://testshare.xingxiu.tv/starshow5.0/schoolElchee/share.html?";*/
     window.location.href=host+"/v8/wechat/activityAuth?type=schoolElchee";
    }else{
      var uid=$(this).parents("li").attr("uid");
      toVote(uid,$(this))
    }
  })
  //点赞
  $(".rankingMain").on("click",".follow-num",function(e){ 
    if(jwt_token=="" || jwt_token==undefined){
     /*window.location.href= host+"/v12/wechat/generalAuth?redirect_url=http://testshare.xingxiu.tv/starshow5.0/schoolElchee/share.html?";*/
     window.location.href=host+"/v8/wechat/activityAuth?type=schoolElchee";
    }else{
      var uid=$(this).parents("li").attr("uid");
      toVote(uid,$(this))
    }
  })
  //参赛
  $("#toAdd").click(function(){
      swal_confirm("请下载时尚星秀APP进行参赛","下载",function(){
        //打开app
        openApp('home', null);
      },true);
  })
  

 }
})
