var server = 0;
var loginUid = "";
/*var host='http://123.57.0.118:5000/v3';*/
var host = commonCla.hostBase+'/v3';
/**************************************************APP TO H5通信部分*********************************************************/
/**
参数：
action : '1'        //1-跳登陆；2-跳个人；3-普通分享；4-打榜分享；5-支付宝支付；6-微信支付
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
    /*if(data.action==7){
      var responseData = '{"cancel": "再想想", "confirm": "去意已决", "title": "确认放弃支付？", "backSetp": "3"}';
    }else{
      var responseData = 'ok!!';
    } 
    responseCallback(responseData);*/
    if (data.nextStep == '1') { //打榜
      var jwt_token = ceremonyMain.analyzParams("uid") == undefined ? loginUid : ceremonyMain.analyzParams("uid");
      //alert(jwt_token+"-----"+ceremonyMain.analyzParams("uid")); 
      var star_id = ceremonyMain.analyzParams("star_id")

      if (jwt_token == "") {
        loginUid = data.jwt_token;
        //var host = window.location.host;
        //alert(host+"/starshow5.0/festival/index.html?jwt_token="+loginUid)
        window.location.href = "hitList.html?star_id="+star_id+"&uid=" + loginUid;
      } else {
        loginUid = data.jwt_token;
        ceremonyMain.toHitRank();
      }

    }
    if (data.nextStep == '2') {
      var jwt_token = "";
      if (ceremonyMain.analyzParams("jwt_token") == undefined || ceremonyMain.analyzParams("jwt_token") == "") {
        jwt_token = loginUid;
      } else {
        jwt_token = ceremonyMain.analyzParams("jwt_token");
      }
      if (jwt_token == "") {
        window.location.href = "index.html?jwt_token=" + data.jwt_token;
      } else {
        loginUid = data.jwt_token;
        ceremonyMain.initCeremonyPage();
        tcc.BOX_show("messdiv-award");

      }
    }
    if(data.nextStep=="7"){
      otherShare();
      
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
  //粉丝总榜--进入个人中心
  $(document).on("click", "#js-rankContainer li", function(e) {
      if ($("#js-switchTab .cur").index() == 2) {
        var uid = $(this).attr("uid");
        e.preventDefault()
        setBridgeCallHandler(bridge, {
          'action': '2',
          'user_id': uid
        })
      }

    })
    //明星详情个人背景图--进入个人中心
  $(".cereDetailBanner .bg").click(function(e) {
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '2',
        'user_id': $(".cereDetailBanner .bg").find("img").attr("uid")
      })
    })
    //明星详情页面，打榜用户进入个人中心
  $(document).on("click", "#js-rankConDetail li", function(e) {
      var uid = $(this).attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '2',
        'user_id': uid
      })
    })
  //活动分享
  var shareActivity=function(e){
      setBridgeCallHandler(bridge, {
        'action': '3',
        'share': {
          //'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
          'share_url':"https://lookmetv.com/starshow5.0/festival/indexShare.html?type=1",
          'title': "10•13北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来",
          'content': "为偶像打榜助力，多重豪礼为你开启，1013北京工人体育馆。",
          'cover':"https://lookmetv.com/starshow5.0/festival/"+ $(".cereBanner").find("img").attr("src")
        }
      })
  }
  //打榜分享
  var otherShare=function(e){
    var uid = $("#curUserName").attr("uid") == undefined ? "" : $("#curUserName").attr("uid");
      var star_id = $(".cereDetailBanner .bg").find("img").attr("uid");

      setBridgeCallHandler(bridge, {
        'action': '4',
        'user_id': uid,
        'star_id': star_id,
        'share': {
          //'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
          'share_url': host + "/wechat/festival?star_id=" + star_id + "&user_id=" + uid + "&server=" + server,
          'title': "和我一起为“" + $(".typeTitle").html() + "”助力，赢取【星秀盛典入场券】",
          'content': "10•13 北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来",
          'cover': $(".cereDetailBanner .bg").find("img").attr("src")
        }
      })
  }
    //邀请好友帮他打榜
  $("#letFriendHit").click(function(e) {
      var uid = $("#curUserName").attr("uid") == undefined ? "" : $("#curUserName").attr("uid");
      var star_id = $(".cereDetailBanner .bg").find("img").attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '4',
        'user_id': uid,
        'star_id': star_id,
        'share': {
          //'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
          'share_url': host + "/wechat/festival?star_id=" + star_id + "&user_id=" + uid + "&server=" + server,
          'title': "和我一起为“" + $(".typeTitle").html() + "”助力，赢取【星秀盛典入场券】",
          'content': "10•13 北京工人体育馆，2016时尚星秀年度人物盛典，盛邀你来",
          'cover': $(".cereDetailBanner .bg").find("img").attr("src")
        }
      })
    })
    //打榜
  $("#toHit").click(function(e) {
      tcc.BOX_show("loadding");
      var uid = $(this).attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1'
      })
    })
    //展示签到记录
  $("#btn_showDayRecord").click(function(e) {
    e.preventDefault()
    setBridgeCallHandler(bridge, {
      'action': '1',
      'nextStep': '2'
    })


  })

})

var tcc = {
  BOX_show: function(e) //显示
    {
      if (document.getElementById(e) == null) {
        return;
      }
      var selects = document.getElementsByTagName('select');
      for (i = 0; i < selects.length; i++) {
        selects[i].style.visibility = "hidden";
      }
      tcc.BOX_layout(e);
      window.onresize = function() {
          tcc.BOX_layout(e);
        } //改变窗体重新调整位置
      window.onscroll = function() {
          tcc.BOX_layout(e);
        } //滚动窗体重新调整位置
      document.onkeyup = function(event) {
        var evt = window.event || event;
        var code = evt.keyCode ? evt.keyCode : evt.which;
        //alert(code);
        if (code == 27) {
          tcc.BOX_remove(e);
        }
      }
    },
  BOX_remove: function(e) //移除
    {
      window.onscroll = null;
      window.onresize = null;
      document.getElementById('BOX_overlay').style.display = "none";
      document.getElementById(e).style.display = "none";
      var selects = document.getElementsByTagName('select');
      for (i = 0; i < selects.length; i++) {
        selects[i].style.visibility = "visible";
      }
    },
  BOX_layout: function(e) //调整位置
    {
      var a = document.getElementById(e);
      if (document.getElementById('BOX_overlay') == null) //判断是否新建遮掩层
      {
        var overlay = document.createElement("div");
        overlay.setAttribute('id', 'BOX_overlay');
        document.body.appendChild(overlay);
      }
      document.getElementById('BOX_overlay').ondblclick = function() {
        tcc.BOX_remove(e);
      };
      //取客户端左上坐标，宽，高
      var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      var clientWidth;
      if (window.innerWidth) {
        clientWidth = window.innerWidth;
        // clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
      } else {
        clientWidth = document.documentElement.clientWidth;
      }
      var clientHeight;
      if (window.innerHeight) {
        clientHeight = window.innerHeight;
        //clientHeight = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
      } else {
        clientHeight = document.documentElement.clientHeight;
      }
      var bo = document.getElementById('BOX_overlay');
      bo.style.left = scrollLeft + 'px';
      bo.style.top = scrollTop + 'px';
      bo.style.width = clientWidth + 'px';
      bo.style.height = clientHeight + 'px';
      bo.style.display = "";
      //Popup窗口定位
      a.style.position = 'absolute';
      a.style.zIndex = 999;
      a.style.display = "";
      a.style.left = scrollLeft + ((clientWidth - a.offsetWidth) / 2) + 'px';
      a.style.top = scrollTop + ((clientHeight - a.offsetHeight) / 2) + 'px';
    },
  HiddenButton: function(e) {
    e.style.visibility = 'hidden';
    e.coolcodeviousSibling.style.visibility = 'visible'
  }
}
var ceremonyMain = {
  ajaxCommonFun: function(url, type, callbackFun, params) {
    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      async: false,
      cache: false,
      data: params,
      success: function(data) {
        //回调函数
        if (callbackFun) {
          callbackFun(data);
        }
      },
      error: function() {
        //alert("error");
      }
    })
  },
  analyzUrl: function() {
    var paramsList = {}
    var url = window.location.search.split("?")[1];
    if (url == "" || url == undefined) {
      return paramsList;
    }
    var params = url.split("&");
    for (var i = 0; i < params.length; i++) {
      var keyName = params[i].split("=")[0];
      var value = params[i].split("=")[1];
      paramsList[keyName] = value;
    }
    return paramsList;

  },
  analyzParams: function(param_name) {
    var url = window.location.search.split("?")[1];
    if (url == "" || url == undefined) return url;
    url = url.split(param_name + "=")[1];
    if (url == "" || url == undefined) {
      url = "";
      return url;
    }
    if (url.indexOf("&") >=0) {
      url = url.split("&")[0];
    }
    return url;
  },
  addLoadding: function(targetId) {
    var loaddingHtml = "<div class='spinner' id='spinner'>" + "<div class='bounce1'></div>" + "<div class='bounce2'></div>" + "<div class='bounce3'></div>" + "</div>";
    $("#" + targetId).append(loaddingHtml)
  },
  removeLoadding: function(selfId) {
    $("#" + selfId).remove();
  },
  initRankCon: function(resultData, listPage, typeNum) {
    resultData = resultData.data;
    var liHtml = ""
    var listDdata = resultData.page_data;
    /*var uid=ceremonyMain.analyzParams("jwt_token")==undefined?loginUid:ceremonyMain.analyzParams("jwt_token");*/
    var jwt_token = "";
    if (ceremonyMain.analyzParams("jwt_token") == undefined || ceremonyMain.analyzParams("jwt_token") == "") {
      jwt_token = loginUid;
    } else {
      jwt_token = ceremonyMain.analyzParams("jwt_token");
    }
    for (var i = 0; i < listDdata.length; i++) {
      var likeNum = listDdata[i].like_num > 10000 ? (listDdata[i].like_num / 10000).toFixed(2) + "万" : listDdata[i].like_num + "&nbsp";
      var uname = "";
      if (listDdata[i].uname != null) {
        uname = listDdata[i].uname.length > 5 ? listDdata[i].uname.substr(0, 5) + "..." : listDdata[i].uname;
      }
      if (typeNum != 2) {
        var a_url = "<a href='hitList.html?star_id=" + listDdata[i].uid + "&" + new Date().toTimeString() + "&uid=" + jwt_token + "'>";
      } else {
        /*var a_url="<a href='http://star.xingxiu.tv/share.html?action=jumpToPersonal&uid="+listDdata[i].uid+"'>";*/
        var a_url = "";
      }
      var avatar = listDdata[i].avatar == "" ? "assets/images/headPic-default.png" : listDdata[i].avatar;
      if (i <= 2 && listPage < 10) {
        liHtml += a_url + "<li class='tops' uid='" + listDdata[i].uid + "'>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + uname + "</p>" + "<p class='rank-topsNum'><img src='assets/images/n" + Number(i + 1) + ".png' /></p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png'/>" + "</div>" + "</li></a>"
      } else {
        liHtml += a_url + "<li uid='" + listDdata[i].uid + "'>" + "<p class='rank-num'>" + Number(listDdata[i].grade) + "</p>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + uname + "</p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png' />" + "</div>" + "</li></a>"
      }

    }
    $("#js-rankContainer").append(liHtml);
    //初始化浮动签到球

    if (jwt_token == "") {
      $(".waft_area").html("<img src='assets/images/waft-bg.png' class='bg' />" +
        "<p class='c1'><span id='award_login' class='award_login'>请登录查看<br/><br/>打榜奖品</span></p>");
    } else {
      //$(".waft_area .c2 span").html(resultData.con_num);
      $(".waft_area").html("<img src='assets/images/waft-bg.png' class='bg' />" +
        "<p class='c1'>您已打榜</p>" +
        "<p class='c2'><span>" + resultData.con_num + "</span>天</p>" +
        "<p class='c3'>点击查看成就&gt;</p>");
    }

    //con_num 打榜次数,初始化签到表
    $("#hide_params").attr("mobile", resultData.mobile);
    $("#hide_params").attr("is_fina", resultData.is_fina);
    $("#hide_params").attr("is_fina_25",resultData.is_fina_25);
    $("#hide_params").attr("mobile_25",resultData.mobile_25);
    $("#hide_params").attr("mobile_12",resultData.mobile_12);
    $("#hide_params").attr("mobile_award_12",resultData.mobile_award_12);
    var a_list = [
      "http://waimai.baidu.com/hongbao/npactivity?caseid=HOTgxOTM1NDky&sign=47933419ed3fd3292bb0b46e83455a4d",
      "award/camera/index.html",
      "http://www.jianlc.com/static/extend/ssxx.html?source=ssxx_01",
      "http://m.womai.com/ticket/fanjuice1608/index.action?env=h5&sourceId=256526",
      "award/nx/lecake.html?mobile_award_12="+encodeURI(resultData.mobile_award_12)+"&mobile_12="+resultData.mobile_12,
      "award/stenders/index.html",
      "award/disney/disney.html?jwt_token="+jwt_token+"&mobile_25="+resultData.mobile_25,
      "#none"
    ] 
    if (resultData.con_num >= 1 && resultData.con_num < 3) {
      $(".awardList li").eq(0).find("p.award-pic").find("img").attr("src", "assets/images/award1.png");
      $(".awardList li").eq(0).find("a").attr("href", a_list[0]);
    } else if (resultData.con_num >= 3 && resultData.con_num < 5) {
      for (var i = 0; i < 2; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
      };
    } else if (resultData.con_num >= 5 && resultData.con_num < 9) {
      for (var i = 0; i < 3; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
      };
    } else if (resultData.con_num >= 9 && resultData.con_num < 12) {
      for (var i = 0; i < 4; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
      };
    } else if (resultData.con_num >= 12 && resultData.con_num < 18) {
      for (var i = 0; i < 5; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
        //弹框的领取
        /*if (i == 4) {
          $(".awardList li").eq(i).find("a").removeAttr("href");
          $(".awardList li").eq(i).find("a").attr("class", "btn_showAward");
          $(".awardList li").eq(i).find("a").attr("days","12")
        } else {
          $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
        }*/
      };
    } else if (resultData.con_num >= 18 && resultData.con_num < 25) {
      for (var i = 0; i < 6; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);

      };
    } else if (resultData.con_num >= 25 && resultData.con_num < 30) {
      for (var i = 0; i < 7; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
        //弹框的领取
        /*if (i == 6 ) {
	        $(".awardList li").eq(i).find("a").attr("days","25")
          $(".awardList li").eq(i).find("a").removeAttr("href");
          $(".awardList li").eq(i).find("a").attr("class", "btn_showAward");
          
        } else {
          $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
        }*/

      };
    } else if (resultData.con_num >= 30) {
      for (var i = 0; i < 8; i++) {
        $(".awardList li").eq(i).find("p.award-pic").find("img").attr("src", "assets/images/award" + Number(i + 1) + ".png");
        //弹框的领取
        if (i == 7) {
	  if(i==6){
	   $(".awardList li").eq(i).find("a").attr("days","25")
	  }else if(i==7){
	   $(".awardList li").eq(i).find("a").attr("days","30")
	  }
          $(".awardList li").eq(i).find("a").removeAttr("href");
          $(".awardList li").eq(i).find("a").attr("class", "btn_showAward");
         
        } else {
          $(".awardList li").eq(i).find("a").attr("href", a_list[i]);
        }

      };
    }
  },
  navSwitch: function(typeNum) {
    //添加缓冲
    ceremonyMain.addLoadding("js-rankContainer");
    var perDataLength = 20;
    //var listPage=$("#js-rankContainer li").length>=20?$("#js-rankContainer li").length/20+1:1;
    var listPage = $("#js-rankContainer li").length;
    //获取数据
    $("#js-moreRank").hide();
    var jwt_token = "";
    if (ceremonyMain.analyzParams("jwt_token") == undefined || ceremonyMain.analyzParams("jwt_token") == "") {
      jwt_token = loginUid;
    } else {
      jwt_token = ceremonyMain.analyzParams("jwt_token");
    }

    var url = host + "/festival?type=" + Number(Number(typeNum) + 1) + "&current_count=" + listPage + "&jwt_token=" + jwt_token;
    //var url = "http://star.xingxiu.tv/festival/getlist?type="+Number(Number(typeNum)+1)+"&current_count="+listPage+"&uid=114655&server="+server+"&callback=?";
    ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
      //移除缓冲
      ceremonyMain.removeLoadding("spinner");
      if (resultData != null) {
        ceremonyMain.initRankCon(resultData, listPage, typeNum);
        $("#js-moreRank").show();
      }

    })

  },
  searchShow: function(searchId, triggerBtn, hideContentId) {

    $("#" + triggerBtn).click(function() {
      //init
      $("#js-searchList").html("");
      $("#js-txt_search").val("");

      $("#" + searchId).show();
      $("#" + hideContentId).hide();
      $("#js-txt_search").focus();
    })
  },
  cancelSearch: function(searchId, triggerBtn, hideContentId) {
    $("#" + triggerBtn).click(function() {
      $("#" + searchId).hide();
      $("#" + hideContentId).show();
    })
  },
  initSearchList: function(resultData) {
    $("#js-searchList").html("");
    var searchHtml = "";
    var infoData = resultData.data;
    if (infoData.length <= 0) {
      $("#js-searchList").html("<p class='tc' style='margin-top:50px;font-size:1.5rem'>暂无此明星入驻</p>");
    } else {
      var uid = ceremonyMain.analyzParams("jwt_token");
      for (var i = 0; i < infoData.length; i++) {
        var likeNum = infoData[i].like_num > 10000 ? infoData[i].like_num / 10000 + "万" : infoData[i].like_num + "&nbsp";
        var uname = "";
        if (infoData[i].uname != null) {
          uname = infoData[i].uname.length > 5 ? infoData[i].uname.substr(0, 5) + "..." : infoData[i].uname;
        }
        var avatar = infoData[i].avatar == "" ? "assets/images/headPic-default.png" : infoData[i].avatar;
        searchHtml += "<a href='hitList.html?star_id=" + infoData[i].uid + "&uid=" + uid + "'><li class='curPersonInfo searchPersonInfo'>" + "<p class='head-pic'><img src='" + avatar + "'></p>" + "<div class='user-info'>" + "<div>" + uname + "</div>" + "<div class='col_grey f13'>" + (infoData[i].type == 1 ? "演员榜" : "歌手榜") + "排名：第" + infoData[i].grade + "</div>" + "</div>" + "<div class='follow-num'>" + " <span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png'>" + "</div>" + "</li></a>";

      }
      $("#js-searchList").html(searchHtml);
    }

  },
  toSearch: function() {
    var keyword = $("#js-txt_search").val().trim();
    if (keyword == "" || keyword == null) {
      //alert("请输入搜索的内容");
      tcc.BOX_show("messdiv");
      $(".messdivCons").html("请输入搜索的内容")
      return;
    }
    //添加缓冲
    ceremonyMain.addLoadding("js-searchList");
    var url = host + "/festival/search?keyword=" + keyword;
    //var url="http://star.xingxiu.tv/festival/search?keyword="+keyword+"&server="+server+"&callback=?"
    ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
      //移除缓冲
      ceremonyMain.removeLoadding("spinner");
      if (resultData != null) {
        ceremonyMain.initSearchList(resultData);
      }

    })

  },
  initCeremonyPage: function() {
    //初始化排行列表 type=0
    $("#js-rankContainer").html("");
    ceremonyMain.navSwitch(0);
    //切换排行类型
    $("#js-switchTab li").click(function() {
        //init ranklist
        $("#js-rankContainer").html("");
        var typeNum = $(this).index();
        $("#js-switchTab li").removeClass("cur");
        $(this).addClass("cur");
        ceremonyMain.navSwitch(typeNum);
      })
      //更多数据加载
    $("#js-moreRank").click(function() {
        var typeNum = $("#js-switchTab li.cur").index();
        ceremonyMain.navSwitch(typeNum);
      })
      //搜索
    $(".searchForm").submit(function(e) {
        ceremonyMain.toSearch();
      })
      //其他操作
    ceremonyMain.searchShow("js-searchMain", "js-search", "js-crecmonyMain");
    ceremonyMain.cancelSearch("js-searchMain", "js-btn_cancel", "js-crecmonyMain");
    //领取奖品5，打开输入手机弹框
    $("#messdiv-award").on("click", ".btn_showAward", function() {
        var days=$(this).attr("days");
        var mobile = $("#hide_params").attr("mobile");
        var is_fina = $("#hide_params").attr("is_fina");
        var is_fina_25= $("#hide_params").attr("is_fina_25");
        var mobile_25 = $("#hide_params").attr("mobile_25");
        var mobile_12 = $("#hide_params").attr("mobile_12");
        var mobile_award_12=$("#hide_params").attr("mobile_award_12");
        var html = "";
        /*if(days=="12"){
         html = "<p>获得"+mobile_award_12+"优惠券一张<p>" +
                "<p class='tc'>优惠码："+mobile_12+"</p>"+
                "<span class='js-close-award2' task='12'>确定</span>";
        }else if (days=="25"){
          if ((mobile_25 == "" || mobile_25 == null) && is_fina_25 == "0") {
            html = "<p>获得一次迪士尼周边抽奖机会，输入手机号参与抽奖<p>" +
              "<p class='tc'><input type='text' placeholder='输入手机号以便确认收货信息' class='txt_phone_25' /></p>" +
              "<span class='btn_getAward' task='25'>领取</span>";
          } else {
            html = "<p>活动结束后统一公布获奖名单<p>" +
              "<p class='tc'>您填写的电话：" + mobile_25 + "</p>"+
              "<span class='js-close-award2' task='12'>确定</span>";
          }

        }else{*/
          if ((mobile == "" || mobile == null) && is_fina == "0") {
            html = "<p>获得一次乐视车载净化器抽奖机会，输入手机号参与抽奖</p>" +
              "<p class='tc'><input type='text' placeholder='输入手机号以便确认收货信息' class='txt_phone' /></p>" +
              "<span class='btn_getAward' task='30'>领取</span>";
          } else {
            html = "<p>活动结束后统一公布获奖名单</p>" +
              "<p class='tc'>您填写的电话：" + mobile + "</p>"+
	      "<span class='js-close-award2' task='12'>确定</span>";
	      
          }
        /*}*/
        tcc.BOX_remove("messdiv-award");
        $(".messdivCons").html(html);
        tcc.BOX_show("messdiv");
      })
      //领取奖品5，输入手机号--首页
    $(".messdivCons").on("click", ".btn_getAward", function() {
      var task=$(this).attr("task");
      ceremonyMain.toSaveAwardPhone(task);
    })
    //关闭确定
     $("body").on("click",".js-close-award2",function() {
        tcc.BOX_remove("messdiv");
      })
     //点击领奖
     $("#topb").click(function(){
      var jwt_token=ceremonyMain.analyzParams("jwt_token")==undefined?"":ceremonyMain.analyzParams("jwt_token");
      window.location.href="getAward.html?jwt_token="+jwt_token;
     })
  },
  //ceremonyDetail page
  initCereDetailHtml: function(resultData) {
    var liHtml = "";
    var hitlist = resultData.data.hit_list;
    var star = resultData.data.star;
    var user = resultData.data.user;
    //star
    if (star != null && star != undefined) {
      var likeNum = star.like_num > 10000 ? star.like_num / 10000 + "万" : star.like_num + "&nbsp";
      var coverUrl = star.cover == "" ? "assets/images/bannerDefault.png" : star.cover;
      var bgHtml = "<img src=" + coverUrl + " uid='" + star.uid + "'/></a>"
      $(".cereDetailBanner .bg").html(bgHtml);

      $(".cereDetailBanner .typeTitle").html(star.uname);
      $(".heartNumber p").html(likeNum);
      $(".rankingNum").html(star.grade);
    } else {
      var coverUrl = "assets/images/bannerDefault.png";
      var bgHtml = "<img src=" + coverUrl + " uid=''/></a>"
      $(".cereDetailBanner .bg").html(bgHtml);
      $(".cereDetailBanner .typeTitle").html("");
      $(".heartNumber p").html("0");
      $(".rankingNum").html("0");
    }

    //user
    if (user != null) {
      var user_likeNum = user.like_num > 10000 ? user.like_num / 10000 + "万" : user.like_num + "&nbsp";
      $(".curPersonInfo .head-pic img").attr("src", user.avatar);
      $(".curPersonInfo #curUserName").html(user.uname.length > 7 ? user.uname.substr(0, 7) + "..." : user.uname);
      $(".curPersonInfo #curUserName").attr("uid", user.uid);
      if (user.grade == 0) {
        $(".gradeDesc").html("暂无排名");
      } else {
        $(".gradeDesc").html("排名第<span>" + user.grade + "</span>");
      }
      $(".curPersonInfo #followNum").html(user_likeNum);
    } else {
      $(".gradeDesc").html("暂无排名");
      $(".curPersonInfo #curUserName").html("未登录")
      $(".curPersonInfo #followNum").html(0);
    }
    //按钮操作
    var jwt_token = ceremonyMain.analyzParams("uid") == undefined ? loginUid : ceremonyMain.analyzParams("uid");
    $("#toHit").attr("num", resultData.data.hit_num);
    if (jwt_token == "") {
      $('#toHit').parent().show();
      $('#toHit').parent().css("width", "100%");
      $('#toHit').parent().removeClass("disabled");
      $("#letFriendHit").hide();
    } else {
      //已登录未打榜 次数用完  显示置灰帮偶像打榜按钮
      if (resultData.data.hit_num >= 3 && resultData.data.is_share == "0") {
        $("#letFriendHit").hide();
        $('#toHit').parent().show();
        $('#toHit').attr("disabled", true);
        $('#toHit').parent().css("width", "100%");
        $('#toHit').parent().addClass("disabled");
      } else if (resultData.data.hit_num >= 3 && resultData.data.is_share == "1") {
        //已登录已打榜，次数用完，显示可用邀请好友打榜
        $('#toHit').parent().hide();
        $("#letFriendHit").show();
        $('#letFriendHit').css("width", "100%");
      } else if (resultData.data.hit_num < 3 && resultData.data.is_share == "0") {
        //已登录未打榜，次数未完，显示帮偶像打榜。
        $('#toHit').parent().show();
        $('#toHit').parent().css("width", "100%");
        $('#toHit').parent().removeClass("disabled");
        $("#letFriendHit").hide();
      } else {
        //已登录已打榜，次数未完，同时显示帮偶像打榜，邀请好友打榜。
        $('#toHit').parent().show();
        $("#letFriendHit").show();
        $('#toHit').parent().css("width", "49.5%");
        $('#letFriendHit').css("width", "49.5%")
        $('#toHit').parent().removeClass("disabled");
      }
    }



    //hitlist
    for (var i = 0; i < hitlist.length; i++) {
      var likeNum = hitlist[i].like_num > 10000 ? hitlist[i].like_num / 10000 + "万" : hitlist[i].like_num + "&nbsp";
      if (hitlist[i].uname == null) {
        var userName = "";
      } else {
        var userName = hitlist[i].uname.length > 5 ? hitlist[i].uname.substr(0, 5) + "..." : hitlist[i].uname;
      }
      var avatar = hitlist[i].avatar == "" ? "assets/images/headPic-default.png" : hitlist[i].avatar;
      if (i <= 2) {
        liHtml += "<li class='tops' uid='" + hitlist[i].uid + "'>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + userName + "</p>" + "<p class='rank-topsNum'><img src='assets/images/n" + Number(i + 1) + ".png' /></p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png'/>" + "</div>" + "</li>"
      } else {
        liHtml += "<li uid='" + hitlist[i].uid + "'>" + "<p class='rank-num'>" + Number(Number(i) + 1) + "</p>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + userName + "</p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png' />" + "</div>" + "</li>"
      }

    }
    $("#js-rankConDetail").html(liHtml);
  },
  getDetailData: function() {
    //添加缓冲114655
    ceremonyMain.addLoadding("js-rankConDetail");

    var star_id = ceremonyMain.analyzParams("star_id");
    var uid = ceremonyMain.analyzParams("uid");
    if (uid == "" || uid == undefined) {
      uid = loginUid;
    }
    var url = host + "/festival/show?star_id=" + star_id + "&jwt_token=" + uid;
    //var url="http://star.xingxiu.tv/festival/hitList?star_id="+star_id+"&uid="+uid+"&server="+server+"&callback=?"
    ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
      //移除缓冲
      ceremonyMain.removeLoadding("spinner");
      if (resultData != null) {
        ceremonyMain.initCereDetailHtml(resultData);
      }

    })
  },
  toHitRank: function() {   
    var star_id = ceremonyMain.analyzParams("star_id");
    var uid = ceremonyMain.analyzParams("uid");
    if (uid == undefined || uid == "") {
      uid = loginUid;
    }
    //var url=" http://star.xingxiu.tv/festival/hit?star_id="+star_id+"&uid="+uid+"&server="+server+"&callback=?"
    var url = host + "/festival/" + star_id + "/like?jwt_token=" + uid;
    //alert(url);
    ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
      //alert(resultData);
      if (resultData != null && resultData.code == "200") {
        /*alert("打榜成功");*/

        var num = 3 - Number(Number($("#toHit").attr("num")) + 1);
        var serialDays = resultData.data.con_num;
        var awardName = "";
        var awardUrl = "";
        var messDivHtml = "";
       
        var mobile = resultData.data.mobile;
        var is_fina = resultData.data.is_fina;
        var is_fina_25= resultData.data.is_fina_25;
        var mobile_25 = resultData.data.mobile_25;
        var mobile_12 =  resultData.data.mobile_12;
        var mobile_award_12= resultData.data.mobile_award_12;
        /*alert("mobile_25"+mobile_25+":"+"is_fina_25"+is_fina_25+
          "mobile_12"+mobile_12+"is_fina"+is_fina+
          "mobile_award_12"+mobile_award_12+"mobile"+mobile)*/
       /* var is_fina_25= $("#hide_params").attr("is_fina_25");
        var mobile_25 = $("#hide_params").attr("mobile_25");
        var mobile_12 = $("#hide_params").attr("mobile_12");
        var mobile_award_12=$("#hide_params").attr("mobile_award_12");*/
        if (num >= 2) {
          if(serialDays==1){
            awardName = "获得百度外卖优惠券"
            awardUrl = "<a class='toDetail' bhref='http://waimai.baidu.com/hongbao/npactivity?caseid=HOTgxOTM1NDky&sign=47933419ed3fd3292bb0b46e83455a4d'>领取</a>";
          } else if (serialDays == 3) {
            awardName = "获得美颜奇机面膜一张"
            awardUrl = "<a class='toDetail' bhref='award/camera/index.html'>领取</a>";
          } else if (serialDays == 5) {
            awardName = "获得6000元理财基金";
            awardUrl = "<a class='toDetail' bhref='http://www.jianlc.com/static/extend/ssxx.html?source=ssxx_01'>领取</a>";
          } else if (serialDays == 9) {
            awardName = "获得中粮我买网优惠券";
            awardUrl = "<a class='toDetail' bhref='http://m.womai.com/ticket/fanjuice1608/index.action?env=h5&sourceId=256526'>领取</a>";
          } else if (serialDays == 12) {
            awardName = "获得"+mobile_award_12+"优惠券一张";
            awardUrl = "<a class='toDetail' bhref='award/nx/lecake.html?mobile_award_12="+mobile_award_12+"&mobile_12="+mobile_12+"'>领取</a>";
           // awardUrl = "<a href='http://m.womai.com/coupon/activate/activity.html?activityName=1FE49BBA2AC0C160&custom_url_single=http%3A%2F%2Fm.womai.com%2F0s4364.shtml&custom_url_multiple=&activateBG=http://m.womai.com/coupon/images/wxkq/577e1dca9182d.png&verify=image'>领取</a>";
          } else if (serialDays == 18) {
            awardName = "获得施丹兰沐浴组合一套";
            awardUrl = " <a class='toDetail' bhref='award/stenders/index.html'>领取</a>";
          } else if (serialDays == 25) {
          	  if((mobile_25 == "" || mobile_25 == null) && is_fina_25 == "0"){
          	     awardName = "<p>获得迪士尼周边抽奖机会<p>" 
                 awardUrl = "<a class='toDetail' bhref='award/disney/disney.html?jwt_token="+uid+"&mobile_25="+mobile_25+"'>领取</a>";
          	  }else{
          	    awardName = "<p>活动结束后统一公布获奖名单。<p>" +
                          "<p class='tc'>领取电话：" + mobile_25 + "</p>";
                        awardUrl = "<span class='js-close-award2' task='25'>确定</span>";
          	  }
          } else if (serialDays == 30) {
            var html = "";
            if ((mobile == "" || mobile == null) && is_fina == "0") {
              awardName = "<p>获得乐视车载净化器抽奖机会，输入手机号参与抽奖。</p>" +
                "<p class='tc'><input type='text' placeholder='请输入手机号领取' class='txt_phone' /></p>";
              awardUrl = "<span class='btn_getAward' task='30'>领取</span>";
            } else {
              awardName = "<p>活动结束后统一公布获奖名单。</p>" +
                "<p class='tc'>领取电话：" + mobile + "</p>"+
		            "<span class='js-close-award2' task='30'>确定</span>";
              awardUrl = "";
            }
          }
          messDivHtml = "<p>恭喜你</p><p>打榜" + serialDays + "天</p>" +
            "<div>" + awardName + "</div>" +
            "<p>您今天还有" + num + "次打榜机会</p>" +
            "<div class='dialogFooter-award'>" + awardUrl + "</div>";
          /*if (serialDays < 3) {
            messDivHtml = "<p>您今天还有" + num + "次打榜机会</p>";
          }*/
          $(".messdivCons").html(messDivHtml);
        } else if (num > 0 && num < 2) {
          $(".messdivCons").html("打榜成功！您今天还有" + num + "次打榜机会");
        }else {
          $(".messdivCons").html("打榜成功！您今天打榜机会已用完，请明天再来。");
          /*$('#toHit').attr("disabled",true);
          $('#toHit').parent().addClass("disabled");*/
          $('#letFriendHit').show();
          $('#toHit').parent().hide();
          $('#letFriendHit').css("width", "100%")

        }
        tcc.BOX_remove("loadding");
        tcc.BOX_show("messdiv");
        //1秒消失
        // setTimeout(function () { tcc.BOX_remove("messdiv"); }, 1000);
        ceremonyMain.getDetailData();

      } else {
        $(".messdivCons").html(resultData.error);
        tcc.BOX_remove("loadding");
        tcc.BOX_show("messdiv");
        ceremonyMain.getDetailData();
      }

    })
  },
  //提交手机号
  toSaveAwardPhone: function(task) {
    var mobile="";
    var insertHtml = "";
    if(task=="25"){
      mobile = $(".txt_phone_25");
      $(".txt_phone_25").next().remove();
    }else{
      mobile = $(".txt_phone");
      $(".txt_phone").next().remove();
    }
    if (mobile.val() == "") {
      insertHtml = "<p class='errorTip'>电话号码不能为空</p>"
      mobile.after(insertHtml);
      return;
    }
    if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(mobile.val())) {
      insertHtml = "<p class='errorTip'>请输入正确的手机号码</p>"
      mobile.after(insertHtml);
      return;
    }
    var jwt_token = "";
    if (ceremonyMain.analyzParams("jwt_token") == undefined || ceremonyMain.analyzParams("jwt_token") == "") {
      jwt_token = loginUid;
    } else {
      jwt_token = ceremonyMain.analyzParams("jwt_token");
    }
    var url = host + "/festival/saveAward?mobile=" + mobile.val() + "&task="+task+"&jwt_token=" + jwt_token;
    ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
      if (resultData.code == 200) {
        $(".messdivCons").html("<p>恭喜您，已经领取成功。</p><span class='js-close-award2'>确定</span>");
        //tcc.BOX_remove("messdiv");
	if(task=='25'){
	 $("#hide_params").attr("is_fina_25","1");
	 $("#hide_params").attr("mobile_25",mobile.val());
	}else{
	 $("#hide_params").attr("is_fina","1");
	 $("#hide_params").attr("mobile",mobile.val());
	}
	
      }
    })
  },
  initCereDetailPage: function() {
    ceremonyMain.getDetailData();
    //toDetail
    $(".messdivCons").on("click", ".toDetail", function() {
        var ahref= $(this).attr("bhref");
        tcc.BOX_remove("messdiv");
        window.location.href=ahref;
      })
    //领取奖品5，输入手机号
    $(".messdivCons").on("click", ".btn_getAward", function() {
        var task=$(this).attr("task");
        ceremonyMain.toSaveAwardPhone(task);
      })
      /*$("#toHit").click(function(){
       ceremonyMain.toHitRank();
      })*/
     //关闭确定
     $("body").on("click",".js-close-award2",function() {
        tcc.BOX_remove("messdiv");
      })

  },

}

$(function() {
  if ($(".js-close").html() != undefined) {
    $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
    })
  }
  if ($(".js-close-award").html() != undefined) {
    $(".js-close-award").click(function() {
      tcc.BOX_remove("messdiv-award");
    })
  }

  if ($("#js-crecmonyMain").html() != undefined) {
    ceremonyMain.initCeremonyPage();
  }
  if ($(".cereDetailBanner").html() != undefined) {
    ceremonyMain.initCereDetailPage();
  }



})