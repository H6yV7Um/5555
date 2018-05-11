var server = 1;
var host=commonCla.hostBase+"/v8/";
var login_token="";
var t="";
var timer_C="";


//点赞加1
    (function($) {
        $.extend({
            tipsBox: function(options) {
                options = $.extend({
                    obj: null,  //jq对象，要在那个html标签上显示
                    str: "+1",  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
                    startSize: "15px",  //动画开始的文字大小
                    endSize: "30px",    //动画结束的文字大小
                    interval: 600,  //动画时间间隔
                    color: "#fff",    //文字颜色
                    weight: "bold", //文字
                    callback: function() {}    //回调函数
                }, options);
                $("body").append("<span class='num'>"+ options.str +"</span>");
                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() / 2-10;
                var top = options.obj.offset().top - 10;
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",

                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color,
                    "font-weight": options.weight
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval , function() {
                    box.remove();
                    options.callback();
                });
            }
        });
    })(jQuery);
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
          'share_url':"https://lookmetv.com/starshow5.0/newYearEve/share.html",
          'title': "2017年时尚星秀评选地区年夜饭星菜单",
          'content': "为你喜欢的菜品投票，更有你喜欢的iDOL为你喜爱的菜品站台，快来参与我们的年夜饭星菜单活动吧！",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/icon/nianyefan.jpg"
        }
      })
    }
})
var clientInter=function(bridge){
   //过期重新登录
   $(".messdivCons").on("click",".js_toLogin",function(e){
       tcc.BOX_remove("messdiv");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
  //投票
  $(".dishList").on("click","li",function(e){
    var thi=$(this);
    var jwt_token=get_token();
    if(jwt_token=="" || jwt_token==undefined){
      /*过期重新登录*/
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep':'1'
      })
    }else{
      toVote($(this));
    }

  })
  //跳转
  $(".icon_prizes").on("click",function(e){
    var jwt_token=get_token();
    if(jwt_token.trim()==""){
      /*登录
       *nextStep2礼品跳转
      */
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep':'2'
      })
    }else{
       window.location.href="lottery.html?jwt_token="+jwt_token;
    }
  })
}

//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}
//
var afterVote=function(thi,ret){
  $(thi).find(".slected").show();
  $.tipsBox({
    obj: $(thi),
    str: "+ 1",
    callback: function() {
        //alert(5);
    }
  });
  //+1
  var num=$(thi).find(".like_num span").html();
  $(thi).find(".like_num span").html(Number(num)+1)
  //if has gift
  if(ret.data!=null && ret.data.id!=undefined){
    var activityHtml='恭喜您，累计签到'+ret.data.serial_day+'日获得<span class="pName">'+ret.data.name+
      '</span><span class="small_font">请于右下角奖励中心领取</span>';
    $(".info-tip").html(activityHtml);
    $(".icon_prizes .prize_num").html(Number($(".icon_prizes .prize_num").html())+1);
  }
  if($(".icon_prizes .prize_num").css("display")=="none"){
    $(".icon_prizes .prize_num").show();
  }
  
}
//去投票
var toVote=function(thi){
  var jwt_token=get_token();
  var url=host+"dinner/"+$(thi).attr("dishid")+"/voted?jwt_token="+jwt_token
  commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      afterVote(thi,ret);
      var type=$(thi).parent().attr("typeid");
      getDishList(type);
    }else if(ret.code=="401"){
      $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");
    }else if(ret.code=="422"){
      $(".messdivCons").html(ret.error);
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");
    }else{
      $(".messdivCons").html("投票失败了，请稍后再投一次试试哦~");
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");
    }
  })
  
 }
 //去投票--分享
var toVoteShare=function(thi){
  var jwt_token=get_token();
  var url=host+"dinner/"+$(thi).attr("dishid")+"/inviteVoted?jwt_token="+jwt_token
  commonCla.ajaxCommonFun(url,"get",function(ret){
    if(ret.code=="200"){
      afterVote(thi,ret);
      var type=$(thi).parent().attr("typeid");
      getDishList(type);
    }else if(ret.code=="401"){
      //授权
       window.location.href = host+"wechat/activityAuth?type=dinner";
      /*$(".messdivCons").html("您的登录信息已过期，需要重新授权。<a class='btn_get js_toLogin'>去授权</a>");
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");*/
    }else if(ret.code=="422"){
      $(".messdivCons").html("您已经投过票了，去时尚星秀APP，还有更多投票机会哦~<br/><a href='http://t.cn/R7COgYb' class='btn_get'>去下载</a>");
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");
    }else{
      $(".messdivCons").html("投票失败了，请稍后再投一次试试哦~");
      tcc.BOX_remove("messRegion");
      tcc.BOX_show("messdiv");
    }
  })
  
 }
//初始化菜品列表
var initDishList=function(ret,type){
  if($(".nyf_main").css("display")=="none"){ $(".nyf_main").show();}
  if(ret.data.count>0){
    $(".icon_prizes .prize_num").html(ret.data.count);
    $(".icon_prizes .prize_num").show();
  }else{
    $(".icon_prizes .prize_num").hide();
  }
  
  var dishHtml="";
  $('#region_bg').attr("src","assets/images/region_bg0"+(type-3)+".png");
  if(ret.data.dish!=null && ret.data.dish!="null"&& ret.data.dish.length>0){
    var select_status="";
    for (var i = 0; i < ret.data.dish.length; i++) {
      if(ret.data.dish[i].like_status=="1"){
        select_status='<img src="assets/images/slected-bg.png" width="100%" class="slected"/>'
      }else{
        select_status='<img src="assets/images/slected-bg.png" width="100%" style="display:none" class="slected"/>'
      }
      var dish_name=ret.data.dish[i].name.length>5?ret.data.dish[i].name.substr(0,5)+"...":ret.data.dish[i].name;
      dishHtml+='<li dishId="'+ret.data.dish[i].id+'">'+
                 ' <div  class="icon_pic">'+
                        '<img src="'+ret.data.dish[i].head_pic+'!250x250" />'+select_status+
                 ' </div>'+
                  '<p class="dish_name">'+dish_name+'</p>'+
                  '<p class="like_num"><span>'+ret.data.dish[i].like_num+'</span>票</p>'+
                '</li>'
    };
  }else{
    dishHtml="<h1 class='nodata'>暂无菜品</h1>";
  }
  $(".dishList").html(dishHtml);
  $(".dishList").attr("typeid",type);
}
var getDishList=function(type){
	var jwt_token=get_token();
	var params={
		"jwt_token":jwt_token,
		"type":type
	}
	commonCla.ajaxCommonFun(host+"dinner","get",function(ret){
    if(ret.code=="200"){
      //control time
      timeControl(ret,type);
      
    }else{
      //alert(ret.error);
    }
      
	},params)
}
//计时结束--选菜
var afterCounter=function(){
   /*var endhtml='<section class="overMain">'+
   '<img src="assets/images/end.jpg" width="100%" class="bg"/>'+
    '<a href="rules.html">'+
    '<img src="assets/images/icon_rule_end.png" class="icon_rule_end" /></a>'+
    '<img src="assets/images/icon_list.png" class="icon_list" />'+
  '</section>'+
  '<section class="dish_list" style="display:none">'+
    '<img src="assets/images/icon_list.png" class="icon_list_tit" />'+
    '<ul>'+
      '<li><img src="assets/images/list_hd.png" /></li>'+
      '<li><img src="assets/images/list_hn.png" /></li>'+
      '<li><img src="assets/images/list_xb.png" /></li>'+
      '<li><img src="assets/images/list_gat.png" /></li>'+
      '<li><img src="assets/images/list_hz.png" /></li>'+
      '<li><img src="assets/images/list_hb.png" /></li>'+
      '<li><img src="assets/images/list_xn.png" /></li>'+
      '<li><img src="assets/images/list_db.png" /></li>'+
    '</ul>'+
    '<img src="assets/images/icon-close.png" class="icon_close_end"/>'+
 ' </section>'*/
  $(".nyf_main").hide();
  $("#overMain").show();
  /*$("body").html(endhtml);*/
}
//倒计时
var initJcountdown=function(currentTime,endTime,sfun){
    var EndTime= new Date(endTime);
    var NowTime = new Date(currentTime);
    if(t===""){
      t =EndTime.getTime() - NowTime.getTime();
    } 
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    var dayHtml="";
    t=t-1000;
    if(d==0 && h==0 && m==0  && s==0){
     //清除计时器
      clearInterval(timer_C);
      sfun();
    }
   
}
//计算时间
var timeControl=function(data,type){
   //计算时间 27
    var local_endTime="2017-01-27 23:59:59";

    var btime=data.current_time.replace(/-/g, '/');
    var etime=local_endTime.replace(/-/g, '/');
    //结束日期
    var markDay=new Date(btime).getDate();
    var markYear=new Date(btime).getFullYear();
    var markMonth=new Date(btime).getMonth();
  if(markDay<new Date(etime).getDate() && markMonth==0){
    initDishList(data,type);
  }else if(markDay==new Date(etime).getDate() && markMonth==0){
    initDishList(data,type);
      //清除计时器
       clearInterval(timer_C);
      //初始化倒计时
        initJcountdown(btime,etime,function(){
              afterCounter();
        })
        timer_C=setInterval(function(){
            initJcountdown(btime,etime,function(){
              afterCounter();
            })
         },1000)
   }else if(markMonth>0 || markDay>new Date(etime).getDate()){
      afterCounter();
   }
   
}

/*ready*/
$(function(){
  //初始化
  getDishList("4");
  //弹出菜品
  $(".region_list").on("click","li",function(){
    var type=$(this).attr("typeid");
    getDishList(type);
    //初始化提示
    $(".info-tip").html("<p class='activity_desc'>点击菜品进行投票</p>");
     tcc.BOX_show("messRegion");
    //禁止滚动test
    $(".nyf_main").css("overflow","hidden");
    $(".nyf_main").css("height","100%");
    $(".nyf_main").css("top","0");
    $(".nyf_main").css("position","fixed");
    
  })
  $(".btn_closeRegion").click(function(){
    //启动滚动
    tcc.BOX_remove("messRegion");
     $(".nyf_main").removeAttr("style");
  })
  $(".js-close").click(function(){
    tcc.BOX_remove("messdiv");
    if($(".nyf_main").css("display")!="none"){
      $(".nyf_main").removeAttr("style");
    }
     
  })

  //删除
  //clientInter();
  //分享页面
 if($("#btn_down").html()!=undefined){
  //分享中-投票
  $(".dishList").on("click","li",function(e){
    var thi=$(this);
    var jwt_token=get_token();
    if(jwt_token=="" || jwt_token==undefined){
     //授权
      window.location.href = host+"wechat/activityAuth?type=dinner";
    }else{
      toVoteShare($(this));
    }

  })
  //分享中跳转
  $(".icon_prizes").on("click",function(e){
    $(".messdivCons").html("下载时尚星秀APP，领取您的奖品哦~<br/><a href='http://t.cn/R7COgYb' class='btn_get'>去下载</a>");
     tcc.BOX_show("messdiv");
  })
  //微信分享
  wx_share();
 }
 //show
 $(".icon_list").click(function(){
        $(".dish_list").slideDown(500);
   })
 
 //hide
 $(".icon_close_end").click(function(){
      $(".dish_list").slideUp(500);
 })
})
