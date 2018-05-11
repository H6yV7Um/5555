//

//根据实际链接中参数名称变化,uid
var jwt_token = analyzParams("jwt_token") == undefined ? jwt_token_login : analyzParams("jwt_token");
/*var host = 'http://api.startvshow.com/';*/
/**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'        //1-跳登陆；2-跳个人；3-普通分享；4-打榜分享；5-支付宝支付；6-微信支付；7,点击返回请求的弹框内容；8-个人动态；9-上传；
share : {title : "分享标题", content: "分享内容", cover : "分享icon", share_url : "分享link"}
order_id : '11'     // 订单id
user_id : '22'      // 跳转个人页的用户id
nextStep : '1'      //返回js下一步跳转地址类型

方法：
javascriptHandler :  用于“客户端”调取“JavaScript”方法
nativeCallback :     用于“JavaScript”调取“客户端”方法

*/
window.onerror = function(err) {
  //alert('window.onerror: ' + err)
}

//判断是否是Android
function isAndroid() {
  var ua = navigator.userAgent.toLowerCase();
  var isA = ua.indexOf("android") > -1;
  if (isA) {
    return true;
  }
  return false;
}

//判断是否Iphone
function isIphone() {
  var ua = navigator.userAgent.toLowerCase();
  var isIph = ua.indexOf("iphone") > -1;
  if (isIph) {
    return true;
  }
  return false;
}

//设置WebViewJavascriptBridge通信
function setupWebViewJavascriptBridge(callback) {
  if (isIphone()) { //用于Iphone
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  } else {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady',
        function() {
          callback(WebViewJavascriptBridge)
        },
        false)
    }
  }
}

//设置调用客户端方法并赋值
function setBridgeCallHandler(bridge, data) {
  if (isIphone()) {
    bridge.callHandler('nativeCallback', data,
      function(response) {
        //
      })
  } else {
    window.WebViewJavascriptBridge.callHandler('nativeCallback', data,
      function(response) {
        //
      })
  }
}

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
        /*var url=host+"/list/works?jwt_token="+jwt_token+"&current_count=0";
        //jwt_token=jwt_token;
        var params={
          "category":"1"
        }
        ajaxCommonFun(url, "get", function(resultData){
            if(resultData.code=="200"){
             initPageData(resultData);
             //之后判断立即参与
              var e = e || window.event;
              var joinStatus=resultData.data.is_join;
              $("#joinStatus").attr("status",resultData.data.is_join);
              if(joinStatus=="0"){
               tcc.BOX_show("messdiv");
              }else if(joinStatus!="3"){
               uploadCommon(e,joinStatus);
              }else{
      	        $("#toAdd").hide();
      	      }
           }
            
        },params)*/
      
      


    }
    if (data.nextStep == '2') {
      if (jwt_token == undefined || jwt_token == "") {
        jwt_token = loginUid;
      }
      if (jwt_token == "") {
        //window.location.href = "index.html?jwt_token=" + data.jwt_token;
      } else {
        

      }
    }
    //goback
    if (data.nextStep == '3') {
      if (jwt_token == undefined || jwt_token == "") {
        jwt_token = loginUid;
      }
      if (jwt_token == "") {
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
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
  //活动页面->打榜用户进入动态中心
  /*$(document).on("click", "#toDynamics", function(e) {
      var uid = 1;
      var dynamicId = 46;
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '8',
        'dynamicId': dynamicId
      })
    })*/
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
          'share_url':"https://lookmetv.com/starshow5.0/Film/activeShare.html",
          'title': "时尚星秀《时尚女模头》演员海选大招募",
          'content': "参与《时尚女模头》电影海选，赢时尚星秀签约艺人机会！",
          'cover': $(".mrBanner").find("img.mr_bg").attr("src")
        }
      })
    }
    //打榜
  $("#toHit").click(function(e) {
      var uid = $(this).attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '2',
        'activityType':'2',
      })
    })
  //立即参与
  function uploadCommon(e,joinStatus){
    var params= {
          'action': '9',
          'nextStep': '1',
          'activityType':'2',
          'picTitle':'上传作品',
          "videoTitle":'上传视频',
          'picBtnCon':'下一步',
          'videoBtnCon':'上传',
          'videoDuration':'180',
          'status':'imgAndTv'//imgAndTv TV  img
        }
    if(joinStatus=="0" || joinStatus=="1"){
       // e.preventDefault()
        setBridgeCallHandler(bridge,params)
      }else if(joinStatus=="2"){
        params.status="TV";
        //e.preventDefault()
        setBridgeCallHandler(bridge, params)
      }else{
        $(".messdivCons").html("您已经报过名");
        tcc.BOX_show("messdiv-tip");
      }
  }
  $("#toAdd").click(function(e) {
    if(jwt_token=="" || jwt_token==undefined){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'activityType':'2'
      })
    }else{
      var url=host+"/list/works?jwt_token="+jwt_token+"&current_count=0";
        //jwt_token=jwt_token;
        var params={
          "category":"1"
        }
        ajaxCommonFun(url, "get", function(resultData){
            if(resultData.code=="200"){
             //之后判断立即参与
              var joinStatus=resultData.data.is_join;
              $("#joinStatus").attr("status",resultData.data.is_join);
              if(joinStatus=="0"){
               tcc.BOX_show("messdiv");
              }else if(joinStatus!="3"){
               uploadCommon(e,joinStatus);
              }else{
                $(".messdivCons").html("您已经报过名");
                tcc.BOX_show("messdiv-tip");
                /*$("#toAdd").hide();*/
              }
           }
            
        },params)
 
    }
  })
    //上传作品按钮
  $("#toUpload").click(function(e) {
    //保存信息提交
    var url=host+"/list/sign_up?jwt_token="+jwt_token;
    var real_name=$("#txt_name").val();
    var mobile=$("#txt_mobile").val();
    var sexClass=$(".sex").find("img.cur").attr("teamNum");
    //验证
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    var reg2=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
    $(".errorTip").html("");
     if(real_name.trim()==""){
         $("#txt_name").parent().next("p.errorTip").html("请输入真实姓名。");   
         return;
     }else if(!reg2.test(real_name)){
        $("#txt_name").parent().next("p.errorTip").html("姓名只能输入汉字。"); 
        return;
     }
     if(mobile.trim()==""){
         $("#txt_mobile").parent().next("p.errorTip").html("请输入手机号。");
         return;
     }else if (!reg.test(mobile)) {
         $("#txt_mobile").parent().next("p.errorTip").html("请输入正确的手机号。");
         return;
     }
     if(sexClass==undefined || sexClass=="" || sexClass==null){
         $(".sex").find("p.errorTip").html("请选择参赛组别。");
         return;
     }
    var params={
       "real_name":real_name,
       "mobile":mobile,
       "category":sexClass
    }
    ajaxCommonFun(url, "post", function(resultData){
      if(resultData.code=="200"){
        tcc.BOX_remove("messdiv");
        //调用客户端上传方法
        uploadCommon(e,"1");
      }else{
        tcc.BOX_remove("messdiv");
        if(resultData.code=="401"){
          alert("用户信息失效，请重新登陆");
        }else if(resultData.code=="422"){
          alert("已经报过名");
        }else{
          alert(resultData.data);
        }
      }
      
    }, params)
    
  })

})
//初始化排行榜
var initRankData=function(resultData){
  var user=resultData.data.userInfo;
  if(user.user_rank=="0" || user.user_rank==undefined){
    $(".curPersonInfo").hide();
  }else{
    var team=user.category==1?"女组":"男组"
    $(".rankingMain .curPersonInfo .head-pic img").attr("src",user.user.head_pic);
    $(".rankingMain .curPersonInfo .currentName").html(user.user_name);
    $(".rankingMain .curPersonInfo .teamNum").html(team);
    $(".rankingMain .curPersonInfo .rankNumber").html(user.user_rank);
    $(".rankingMain .curPersonInfo .follow-num span").html(user.like_num);
    $(".curPersonInfo").show();
    $(".curPersonInfo a").attr("href","movieRoleDetail.html?id="+user.user_id+"&jwt_token="+jwt_token);
  }
   var current_count=$(".rankList li").length;
  var pageData=resultData.data.page_data;
  var rankHtml="";
  for (var i = 0; i < pageData.length; i++) {
    var cover=pageData[i].user.head_pic==""?"assets/images/headPic-default.png":pageData[i].user.head_pic;
    if(i<3 && current_count<1){
        rankHtml+="<a href='movieRoleDetail.html?id="+pageData[i].user_id+"&jwt_token="+jwt_token+"'><li uid='"+pageData[i].user_id+"'>"
          +"<div class='head-pic'><div class='number"+(i+1)+"'></div><img src='"+cover+"'></div><p class='user-name'>"+
          pageData[i].user_name+"</p>"
          +"<p class='rank-topsNum'></p>"
          +"<div class='follow-num'>"
          +"<span>"+pageData[i].like_num+"</span> "
          +"<img src='assets/images/icon-heart.png'/>"
          +"</div>"
          +"</li></a>"
    }else{
        rankHtml+="<a href='movieRoleDetail.html?id="+pageData[i].user_id+"&jwt_token="+jwt_token+"'><li uid=''>"
          +"<p class='head-pic'><img src='"+cover+"'></p><p class='user-name'>"+pageData[i].user_name+"</p>"
          +"<p class='rank-topsNum'>"+Number(current_count+i+1)+"</p>"
          +"<div class='follow-num'>"
          +"<span>"+pageData[i].like_num+"</span> "
          +"<img src='assets/images/icon-heart.png'/>"
          +"</div>"
          +"</li></a>"
    }
    
      
  }
  $(".rankList").append(rankHtml);
  //加载更多按钮文字
  var total=resultData.data.total;
  if(total>$(".rankList li").length){
    $(".rankList").next("div.more-rank").html("点击加载更多...");
    $(".rankList").next("div.more-rank").attr("id","js-moreRank");
  }else if(pageData.length<=0 || total<=$(".rankList li").length){
    $(".rankList").next("div.more-rank").html("暂无更多数据...");
    $(".rankList").next("div.more-rank").attr("id","");
    setTimeout(function(){
      $(".rankList").next("div.more-rank").html("点击加载更多...");
      $(".rankList").next("div.more-rank").attr("id","js-moreRank");
     },60000)
  }
}
//获取排行榜列表数据
var getRankData=function(category){
  var current_count=$(".rankList li").length;
  var url=host+"/list/chart?jwt_token="+jwt_token+"&current_count="+current_count;
  var params={
    "category":category
  }
  ajaxCommonFun(url, "get", function(resultData){
      if(resultData.code=="200"){
       initRankData(resultData);
     }
      
  },params)

}
//获取作品列表数据
var getWorksData=function(category){
  var current_count=$(".prodList li").length;
  var url=host+"/list/works?jwt_token="+jwt_token+"&current_count="+current_count;
  var params={
    "category":category
  }
  ajaxCommonFun(url, "get", function(resultData){
      if(resultData.code=="200"){
       initWorksData(resultData);
     }
      
  },params)

}

var initWorksData=function(resultData){
  if(resultData.data.is_join=="3"){
   $("#toAdd").hide();
  }else{
   $("#toAdd").show();
  }
  //保存状态
  $("#joinStatus").attr("status",resultData.data.is_join);
  //初始化列表
  var current_count=$(".prodList li").length;
  var worksHtml="";
  var cover="";
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
    worksHtml+="<li uid='"+pageData[i].user_id+"'>"
    +"<div class='prodPoster'>"
      +"<a href='movieRoleDetail.html?id="+pageData[i].user_id+"&jwt_token="+jwt_token+"'><img class='poster' src='"+pageData[i].cover+"!250x250' /></a>"
      +"<div class='poster_zan"+curStatus+"'>"
        +"<span>"+pageData[i].like_num+"票</span>"
      +"</div>"
    +"</div>"
    +"<div class='prodInfo'>"
      +"<div class='headPic' uid='"+pageData[i].user_id+"'><img src='"+cover+"' /></div>"
      +"<div class='prodCons'>"
        +"<p><span>"+pageData[i].user_name+"</span></p>"
        +"<p><span>"+time+"</span></p>"
      +"</div>"
    +"</div>"
  +"</li>"
  };
  $(".prodList").append(worksHtml);
  //加载更多按钮文字
  var total=resultData.data.total;
  if(total>$(".prodList li").length){
    $(".prodList").next("div.more-rank").html("点击加载更多...");
    $(".prodList").next("div.more-rank").attr("id","js-moreRank");
  }
  if(pageData.length<=0 || total<=$(".prodList li").length){
    $(".prodList").next("div.more-rank").html("暂无更多数据...");
    $(".prodList").next("div.more-rank").attr("id","");
    setTimeout(function(){
      $(".prodList").next("div.more-rank").html("点击加载更多...");
      $(".prodList").next("div.more-rank").attr("id","js-moreRank");
     },60000)
  }
}
var chooseList=function(){
     var category=Number($("#js-switchTab-sex li.cur").index()+1);
     if($("#js-switchTab li.cur").index()=="0"){
          getWorksData(category)
     }else{
      //获取排行
       getRankData(category);
     }
}
var initPageAction=function(){
  //初始化作品列表
   $(".prodList").html("");
   getWorksData("1");
  //作品和排行切换操作
  $("#js-switchTab li").click(function(){
    $("#js-switchTab li").removeClass("cur");
    $(this).addClass("cur");
    var num=Number(Number($(this).index())+1);
    $(".listCons").hide();
    $("#con"+num).show();
    //获取列表
    $(".prodList").html("");
    $(".rankList").html("");
     chooseList();
  })
  //男组女足切换
  $("#js-switchTab-sex li").click(function(){
    $("#js-switchTab-sex li").removeClass("cur");
    $(this).addClass("cur");
    var num=Number(Number($(this).index())+1);
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
  $(".cere-search").click(function(){
    window.location.href="search.html?jwt_token="+jwt_token;
  })
  $(".js-close").click(function(){
    $("#txt_name").val("");
    $("#txt_mobile").val("");
    $(".errorTip").html("");
    tcc.BOX_remove("messdiv");
  })
  $(".js-close2").click(function(){
    tcc.BOX_remove("messdiv-tip");
  })
  //弹框选组
  $(".sex p img").click(function(){
    var teamnum=$(this).attr("teamnum");
    $(".sex p img").eq(0).attr("src","assets/images/icon-man-1.png");
    $(".sex p img").eq(1).attr("src","assets/images/icon-woman-1.png");
    if(teamnum=="1"){
      $(this).attr("src","assets/images/icon-woman-cur-1.png");
    }else{
      $(this).attr("src","assets/images/icon-man-cur-1.png");
    }
    $(".sex p img").removeClass("cur");
    $(this).addClass("cur");
    
  })
  
}
$(function(){
 initPageAction();
})
