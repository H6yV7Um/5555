var server = 1;
var host=commonCla.hostBase+"/v9/";
var login_token="";

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
          'share_url':"https://lookmetv.com/starshow5.0/mls/share.html",
          'title': "向上马拉松 时尚星秀能量星榜单",
          'content': "参与向上马拉松2017中国公开赛时尚星秀星榜单 为你的偶像助力加油！",
          'cover': "https://starshow-pic.b0.upaiyun.com/default/show/malasong-2017.jpg"
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
   //点赞
   $(".teams").on("click",".js_out",function(e){
      if(get_token()=="" || get_token()==undefined){
        e.preventDefault();
        setBridgeCallHandler(bridge, {
           'action': '1',
           'nextStep':'1'
        })
      }else{
        var id=$(this).find("img.js_zan").attr("bid");
        toZan(id);
      }
   })
  
}
//计算数量
var countNum=function(num){
  var countedNum=num;
  if(num>=10000){
    countedNum=Number(num/10000).toFixed(2)+"万" 
  }
  return countedNum;
}

//jwt_token初始化
var get_token=function(){
   var jwt_token=commonCla.analyzParams("jwt_token");
    if(jwt_token=="" || jwt_token==undefined){
      jwt_token=login_token;
    }
    return jwt_token;
}

var initMlsHtml=function(ret){
  $(".bg_banner").attr("src",ret.banner_pic);
  var now_board=ret.now_board;
  var now_boardHtml="";
  var old_boardHtml="";

  //总点赞数
  var all_like_num=Number(now_board[0].like_num)+Number(now_board[1].like_num)+Number(now_board[2].like_num);
  //初始化战队
  for (var i = 0; i < now_board.length; i++) {
    //计算比例
    var like_prop=(all_like_num==0?"0":now_board[i].like_num/all_like_num)*100;
    //判断状态
    var btnHtml="";
    var js_cla="";
    if(ret.is_like==0){
      js_cla="js_out";
      btnHtml='<img src="assets/images/btn-zan.png" bid="'+now_board[i].id+'" class="js_zan btn_zan zan_moves"/>';
    }
    if(now_board[i].is_like==1){
      btnHtml='<img src="assets/images/btn-zaned.png" class="btn_zan"/>';
    }
    now_boardHtml+='<li class="teams_'+now_board[i].name+' '+(i==1?'teams_style2':'')+'">'+
        '<img src="assets/images/n'+Number(i+1)+'.png" class="teams_num"/>'+
        '<div class="mls_stars_con">'+
          '<img src="'+now_board[i].name_pic+'" class="teams_name"/>'+
            '<img src="'+now_board[i].star_big_pic+'"  class="mls_stars"/>'+
        '</div>'+
        '<div class="mls_ball_main">'+
          '<div class="ball_cons">'+
            '<div class="r_out '+js_cla+'">'+
              '<img src="assets/images/ball-out.png" width="100%" class="out_bg"/>'+
                '<div class="r_in">'+
                 ' <div class="r_c c1" id="r_c'+i+'" height="'+like_prop+'%"></div>'+
                 ' <div class="r_num">'+btnHtml+'</div>'+
               ' </div>'+
             '</div>'+
             '<div class="ball_shadow"><img src="assets/images/ball-shadow.png" width="70%" ></div>'+
             '</div>'+
             '<!--<div class="ball_desc">'+
               '<p><span>'+countNum(now_board[i].like_num)+'</span></p>'+
               '<p class="font_small">能量</p>'+
             '</div>-->'+
           '<div class="team_remarks">'+
              '<div>能量<span>'+countNum(now_board[i].like_num)+'</span></div>'+
              '<div>书本<span>'+countNum(now_board[i].book_num)+'</span></div>'+
              '<div>平均战绩<span>'+now_board[i].step_num+'</span></div>'+
          '</div>'+
       ' </div>'+
    '</li>'
  };
  $(".teams").html(now_boardHtml);
  //比例添加
  for (var i = 0; i < 3; i++) {
    $("#r_c"+i).animate({
      height: $("#r_c"+i).attr("height")
    },1000);
  };
  //往期
  var old_boards=ret.old_boards;
  if(old_boards.length<=0){
    $(".mls_history_tit").hide();
  }else{
    $(".mls_history_tit").show();
    for (var a = 0; a < old_boards.length; a++) {
      var list=old_boards[a].boards;
      var listHtml="";
      for (var b = 0; b < list.length;b++) {
        var teamName="";
        if(list[b].name=="zs"){
          teamName="自胜队";
        }else if(list[b].name=="cy"){
          teamName="超越队";
        }else{
          teamName="动静队";
        }
        listHtml+='<ul class="'+list[b].name+'">'+
          '<li>'+teamName+'</li>'+
          '<li><img src="'+list[b].star_small_pic+'" width="100%"></li>'+
          '<li>'+list[b].step_num+'</li>'+
          '<li>'+countNum(list[b].book_num)+'</li>'+
          '<li>'+countNum(list[b].like_num)+'</li>'+
        '</ul>'
      };
      old_boardHtml+='<div class="history_con">'+
        '<img src="'+old_boards[a].title_pic+'"  class="icon_adr"/>'+
        '<ul class="score_title">'+
          '<li>战队</li>'+
          '<li>明星</li>'+
          '<li>平均战绩</li>'+
          '<li>书本</li>'+
          '<li class="w5">能量</li>'+
        '</ul>'+listHtml+
      '</div>'
    };
  }
  
  $(".mls_history").html(old_boardHtml);
}
var getMlsData=function(){
 var jwt_token=get_token();
 var mls_url=host+"marathon/boards?jwt_token="+jwt_token;
 commonCla.ajaxCommonFun(mls_url,"get",function(ret){
   initMlsHtml(ret.data);
 })
}
var toZan=function(id){
  var jwt_token=get_token();
  var mls_zan_url=host+"marathon/"+id+"/likeMarathonGroup?jwt_token="+jwt_token;
  commonCla.ajaxCommonFun(mls_zan_url,"post",function(ret){
    if(ret.code=="200"){
      $(".messdivCons").html("助力成功，明天再来~");
      tcc.BOX_show("messdiv");
      getMlsData();
    }else if(ret.code=="401"){
      if($("#btn_down").html()!=undefined){
        window.location.href =host+"wechat/activityAuth?type=mls"
      }else{
        $(".messdivCons").html("您的登录信息已过期，请重新登录。<a class='btn_get js_toLogin'>去登录</a>");
        tcc.BOX_show("messdiv");
      }
       
    }

  })
}
$(function(){
  if($("#btn_down").html()!=undefined){
     //授权
     if(get_token()=="" || get_token()==undefined){
       window.location.href =host+"wechat/activityAuth?type=mls"
      }
     //二次分享
     wx_share("向上马拉松 时尚星秀能量星榜单","参与向上马拉松2017中国公开赛时尚星秀星榜单 为你的偶像助力加油！","https://lookmetv.com/starshow5.0/mls/share.html","https://starshow-pic.b0.upaiyun.com/default/show/malasong-2017.jpg");
     $(".teams").on("click",".js_out",function(){
       //微信授权
       if(get_token()=="" || get_token()==undefined){
       window.location.href =host+"wechat/activityAuth?type=mls"
       }else{
        var bid=$(this).find("img.js_zan").attr("bid");
        toZan(bid);
       }
     })
  }
  //初始化数据
  getMlsData();
  //CLOSE
  $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
   })
})