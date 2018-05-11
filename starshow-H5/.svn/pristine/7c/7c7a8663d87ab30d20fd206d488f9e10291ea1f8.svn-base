var server = 1;
/*var host = "http://123.57.0.118:5000/v7/";*/
var host=commonCla.hostBase+"/v7";

var bannerInfo={
        "cover":"",
        "likeNum":"",
        "name":""
}
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
    BOX_show2: function(e) //显示
    {
      if (document.getElementById(e) == null) {
        return;
      }
      var selects = document.getElementsByTagName('select');
      for (i = 0; i < selects.length; i++) {
        selects[i].style.visibility = "hidden";
      }
      tcc.BOX_layout2(e);
      window.onresize = function() {
          tcc.BOX_layout2(e);
        } //改变窗体重新调整位置
      window.onscroll = function() {
          tcc.BOX_layout2(e);
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
    BOX_layout2: function(e) //调整位置
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
      //a.style.position = 'absolute';
      a.style.zIndex = 999;
      a.style.display = "";
      /*a.style.left = scrollLeft + ((clientWidth - a.offsetWidth) / 2) + 'px';
      a.style.top = scrollTop + ((clientHeight - a.offsetHeight) / 2) + 'px';*/
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
        alert("error");
      }
    })
  },
  //从url获取参数
 analyzParams:function(param_name) {
      var url = window.location.search.split("?")[1];
      if (url == "" || url == undefined) return url;
      url = url.split(param_name + "=")[1];
      if (url == "" || url == undefined) {
        url = "";
        return url;
      }
      if (url.indexOf("&") > 0) {
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
    initRankCon: function(resultData, listPage, platform_id) {
      var liHtml = ""
      var listDdata = resultData.data.page_data;
      var bannerData = resultData.data.banner;
      var uid = ceremonyMain.analyzParams("uid");
      var platform_id=Number(platform_id);
      if(listDdata.length<=0 && listPage==0){
        liHtml="<div style='text-align:center; font-size:1.4rem;margin-top:30px;'>暂无数据</div>";
        $("#top-banner").attr("src","assets/images/bannerDefault.png");
        $(".userName span").html("")
        $(".joinNumber #number").html("0")
        $("#js-moreRank").hide();
        return;
      }
      //init banner
      /*var changeNum ="";
      var likeNum ="";*/
      var likeStr ="";
      var bannerHtml="";
      var timeMark="";
         
      if(listDdata[0]!=undefined && $("#js-rankContainer li").length<=0){
          var banner_top=listDdata[0].star;

          var head_pic_01=banner_top.background_pic == "" ? "assets/images/bannerDefault2.png" : banner_top.background_pic
          bannerHtml='<div class="swiper-slide">'+
            '<section class="cereBanner ">'+
         ' <img src="'+head_pic_01+'" id="top-banner"/>'+
         ' <div class="bannerTip">'+
           '<img src="assets/images/top-tip-week.png" />'+
           '<p class="userName"><img src="assets/images/icon-arrow-left.png" ><span>'+
           banner_top.name+'</span></p>'+
           '<p class="c1">本周影响力</p>'+
           '<div class="joinNumber">'+
             '<div id="number">'+listDdata[0].influence+'</div>'+
             '<img src="assets/images/icon-star.png" />'+
           '</div>'+
         '</div>'+
         '<p class="icon-rule"><a href="http://share.xingxiu.tv/starshow5.0/rankRule/index.html"><img src="assets/images/icon-rule.png"></a></p>'+
        '</section>'+
          '</div>';
          bannerInfo.cover=banner_top.background_pic;
          bannerInfo.name=banner_top.name;
          bannerInfo.likeNum =listDdata[0].influence;
       }else if($("#js-rankContainer li").length>0){
          var head_pic_01=bannerInfo.cover == "" ? "assets/images/bannerDefault2.png" : bannerInfo.cover
          bannerHtml='<div class="swiper-slide">'+
            '<section class="cereBanner ">'+
         ' <img src="'+head_pic_01+'" id="top-banner"/>'+
         ' <div class="bannerTip">'+
           '<img src="assets/images/top-tip-week.png" />'+
           '<p class="userName"><img src="assets/images/icon-arrow-left.png" ><span>'+
           bannerInfo.name+'</span></p>'+
           '<p class="c1">本周影响力</p>'+
           '<div class="joinNumber">'+
             '<div id="number">'+bannerInfo.likeNum+'</div>'+
             '<img src="assets/images/icon-star.png" />'+
           '</div>'+
         '</div>'+
         '<p class="icon-rule"><a href="http://share.xingxiu.tv/starshow5.0/rankRule/index.html"><img src="assets/images/icon-rule.png"></a></p>'+
        '</section>'+
          '</div>';
       }
       if(bannerData.length>0){
        $(".swiper-wrapper").show();
      	$(".swiper-pagination").show();
      	$(".swiper-container .bannerCon").remove();
        for (var i = 0; i < bannerData.length; i++) {
         bannerHtml+='<div class="swiper-slide">'+ 
            '<section class="cereBanner ">'+
            '<a href="'+bannerData[i].link+'">'+
            '<img src="'+bannerData[i].cover+'" id="top-banner"/>'+
            '</a>'+
            '</section></div>'
       };
       $(".swiper-wrapper").html(bannerHtml);
        
      }else{
        $(".swiper-container .bannerCon").remove();
        $(".swiper-wrapper").hide();
	      $(".swiper-pagination").hide();
        $(".swiper-container").append("<div class='bannerCon'>"+bannerHtml+"</div>");
        
      }

      /*if(listDdata[0]!=undefined){
         $("#top-banner").attr("src",listDdata[0].user.background_pic+"!750x563");;
        $(".userName span").html(listDdata[0].user.name);
      }*/
      var listId = $("#js-switchTab li.cur").attr("typeid");
      var yue=""; var uname = "";var rose="";
      if(listId=="4" || listId=="5" || listId=="7" ||listId=="3"){
         yue=" <img src='assets/images/yue.png'/>";
      }
      for (var i = 0; i < listDdata.length; i++) {
        if (listDdata[i].star.name != null) {
          uname = listDdata[i].star.name.length > 5 ? listDdata[i].star.name.substr(0,5) + "..." : listDdata[i].star.name;
        }
        if(listDdata[i].influence_rose.indexOf("+")>=0){
          rose="<span id='followNum' class='col_red2'>"+listDdata[i].influence_rose+"%</span>"
        }else if(listDdata[i].influence_rose.indexOf("-")>=0){
          rose="<span id='followNum' class='col_green'>"+listDdata[i].influence_rose+"%</span>"
        }else{
          rose="<span id='followNum'>" +listDdata[i].influence_rose+"%</span>"
        }
        var jobStr="";
        if(listDdata[i].star!=null && listDdata[i].star.social_info!=null){
          jobStr=listDdata[i].star.social_info.job==undefined?"":listDdata[i].star.social_info.job;
        }
        var influenceStr=listDdata[i].influence>=10000?Number(listDdata[i].influence/10000).toFixed(1)+"万":listDdata[i].influence;
        var followerStr=listDdata[i].follower>=10000?Number(listDdata[i].follower/10000).toFixed(1)+"万":listDdata[i].follower;
        var a_url = "";
        var avatar = listDdata[i].star.head_pic == "" ? "assets/images/headPic-default.png" : listDdata[i].star.head_pic;
         var rolesHtml="";
        if(listDdata[i].star.user.roles.length>0){
          rolesHtml="<img src='assets/images/icon-roles/roles_"+listDdata[i].star.user.roles[0]+".png' class='icon_roles' />"
         
        }
        if (i <= 2 && listPage < 10) {
          liHtml += a_url + "<li class='tops'>" + "<p class='head-pic'><img class='head-pic-img'  src='" + avatar + "!250x250' />"+
          rolesHtml+"</p>"+
          "<div class='user-name'>" + uname +yue+"<div class='user-follows'><img src='"+listDdata[i].platform.search_pic+"' width='10px'/><span>粉丝："+followerStr+"</span></div></div>" + 
          "<p class='rank-num'><img src='assets/images/n" + Number(i + 1) + ".png' /></p>" + 
          "<div class='follow-num'><span>"+influenceStr+"</span>" +rose + 
          "</div>" +
          "<input type='hidden' class='uinfo' name='"+listDdata[i].star.name+"' platName='"+listDdata[i].platform.name+
          "' platPic='"+listDdata[i].platform.focus_pic+
          "' influence='"+listDdata[i].influence+
          "' influence_rose='"+listDdata[i].influence_rose+
          "' like_rose='"+listDdata[i].like_rose+
          "' like='"+listDdata[i].like+
          "' follower='"+listDdata[i].follower+
          "' follower_rose='"+listDdata[i].follower_rose+
          "' read_rose='"+listDdata[i].read_rose+
          "' job='"+jobStr+
          "' read='"+listDdata[i].read+"'/>"
          "</li>"
        } else {
          liHtml += a_url + "<li>" + "<p class='rank-num'>" + Number(listPage+i+1) + "</p>" + 
          "<p class='head-pic'><img class='head-pic-img' src='" + avatar + "!250x250'>"+rolesHtml+"</p> <div class='user-name'>" + uname  +yue+ 
          "<div class='user-follows'><img src='"+listDdata[i].platform.search_pic+"' width='10px'/><span>粉丝："+followerStr+"</span></div></div>" + 
          "<div class='follow-num'><span>"+influenceStr+"</span>" +rose +  
          "</div>" +
          "<input type='hidden' class='uinfo' name='"+listDdata[i].star.name+"' platName='"+listDdata[i].platform.name+
          "' platPic='"+listDdata[i].platform.focus_pic+
          "' influence='"+listDdata[i].influence+
          "' influence_rose='"+listDdata[i].influence_rose+
          "' like_rose='"+listDdata[i].like_rose+
          "' like='"+listDdata[i].like+
          "' follower='"+listDdata[i].follower+
          "' follower_rose='"+listDdata[i].follower_rose+
          "' read_rose='"+listDdata[i].read_rose+
          "' job='"+jobStr+
          "' read='"+listDdata[i].read+"'/>"
           "</li>"
        }

      }
      $("#js-rankContainer").append(liHtml);
    },
    navSwitch: function(platform_id,board_id) {
      //添加缓冲
      ceremonyMain.addLoadding("js-rankContainer");
      var perDataLength = 20;
      //var listPage=$("#js-rankContainer li").length>=20?$("#js-rankContainer li").length/20+1:1;
      var listPage = $("#js-rankContainer > li").length;
      //获取数据
      $("#js-moreRank").hide();
      var url=host+"boards/"+board_id+"?platform_id=" +Number(platform_id) + 
              "&current_count=" + listPage 
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null) {
          $("#js-moreRank").show();
          $("#js-moreRank").html("点击加载更多...");
          if(resultData.data.page_data.length!=undefined &&　resultData.data.page_data.length<=0){
             $("#js-moreRank").html("暂无更多数据");
             setTimeout(function(){
               $("#js-moreRank").html("点击加载更多...");
             },60000)
            
          }else{
             ceremonyMain.initRankCon(resultData, listPage, platform_id);
          }
         
          
        }

      })

    },
    initMenuList:function(curId){
      var type = ceremonyMain.analyzParams("type")==undefined?1:ceremonyMain.analyzParams("type");
      //var type=3;
      var url=host+"boards?type="+type;
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null) {
          $("#js-moreRank").show();
           var liHtml="";var liHtml_plat="";
           var boardData=resultData.data.board;
           var platform=resultData.data.board[curId].platforms;
           for (var i = 0; i < boardData.length; i++) {
             if(i==curId){
              liHtml+="<li class='cur' typeid='"+boardData[i].id+"'>"+boardData[i].name+"</li>"
            }else{
              liHtml+="<li typeid='"+boardData[i].id+"'>"+boardData[i].name+"</li>"
            }
             
           };
           //初始化
           if(platform==null || platform.length<=0){
             $(".showMain").hide();
             $(".noData").show();
           }else{
            $(".showMain").show();
             $(".noData").hide();
             for (var i = 0; i < platform.length; i++) {
               if(i==0){
                liHtml_plat+='<li class="cur" typeid="'+platform[i].platform.id+'">'+
                             '<img src="'+platform[i].platform.focus_pic+
                             '" focus_pic="'+platform[i].platform.focus_pic+'" blur_pic="'+platform[i].platform.blur_pic+'"/>'+
                             '<p>'+platform[i].platform.name+'</p>'+
                             '</li>'
              }else{
                liHtml_plat+='<li typeid="'+platform[i].platform.id+'">'+
                             '<img src="'+platform[i].platform.blur_pic+
                             '" focus_pic="'+platform[i].platform.focus_pic+'" blur_pic="'+platform[i].platform.blur_pic+'"/>'+
                             '<p>'+platform[i].platform.name+'</p>'+
                             '</li>'
              }
               
             };
           }
           

           $("#js-switchTab").html(liHtml);
           $("#js-platTab ul").html(liHtml_plat)


           /*var board_id = $("#js-switchTab li.cur").attr("typeid");
           ceremonyMain.navSwitch(1,board_id);*/
          
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
      var resultData="";
      var icon_change="";
      if (infoData.length <= 0) {
        $("#js-searchList").html("<p class='tc' style='margin-top:50px'>您搜索的明星不在该榜单中哦~</p>");
      } else {
        var uid = ceremonyMain.analyzParams("uid");
        for (var a = 0; a < infoData.length; a++) {
          resultData=infoData[a].result;
          var uname = "";
          if (resultData[0].star.name != null) {
           uname = resultData[0].star.name.length > 5 ? resultData[0].star.name.substr(0, 5) + "..." : resultData[0].star.name;
          }
          var rolesHtml="";
          if(resultData[0].star.user.roles.length>0){
            rolesHtml="<img src='assets/images/icon-roles/roles_"+resultData[0].star.user.roles[0]+".png' class='icon_roles' />"
           }
          var avatar = resultData[0].star.head_pic == "" ? "assets/images/headPic-default.png" : resultData[0].star.head_pic+"!250x250";
          var personDiv=$("<div class='curPersonInfo searchPersonInfo'>" + 
            "<p class='head-pic'><img  class='head-pic-img' src='" + avatar + "'>"+rolesHtml+"</p></div>")
          var star_table=$("<table class='user-info'><tr><td>"+uname+"</td><td>周影响力</td><td>周涨幅</td></tr></table>");
          var table_cons="";
          for (var i=0;i<resultData.length;i++) {
            var influence = resultData[i].influence > 10000 ? (resultData[i].influence / 10000).toFixed(1) + "万" : resultData[i].influence + "&nbsp";
            var influence_rose=ceremonyMain.changeColor(resultData[i].influence_rose);
            table_cons += "<tr><td><img src='"+resultData[i].platform.search_pic+
                          "' width='15px'/>&nbsp;<span class='vm col_grey'>粉丝："+
                          resultData[i].star.user.followers_count+"</span></td>"+
                          "<td>"+influence+"</td><td>"+influence_rose+"</td></tr>"
          };
          
          star_table.append(table_cons);
          searchHtml=personDiv.append(star_table.prop("outerHTML")).append('<div class="tc  pt20 cb"><a href="http://t.cn/R7COgYb" class="col_red2">点击为TA打榜</a></div>').prop("outerHTML");
        }
        $("#js-searchList").html(searchHtml);
      }

    },
    toSearch: function() {
      var keyword = $("#js-txt_search").val();
      if (keyword == "" || keyword == null) {
        //alert("请输入搜索的内容");
        tcc.BOX_show("messdiv");
        $(".messdivCons").html("请输入搜索的内容")
        return false;
      }
      //添加缓冲
      ceremonyMain.addLoadding("js-searchList");
      var url = host+"boards/search"
      var params={
        "name":keyword,
        "board_id":$("#js-switchTab .cur").attr("typeid")
      }
      ceremonyMain.ajaxCommonFun(url, "post", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null && resultData.code=="200") {
          ceremonyMain.initSearchList(resultData);
        }else{
          tcc.BOX_show("messdiv");
         $(".messdivCons").html(resultData.error)
        }

      },params)

    },
    changeColor:function(rose){
      var roseStr="";
       if(rose.indexOf("+")>=0){
           roseStr ='<span class="fb col_red">'+rose+'%</span>'
         }else if(rose.indexOf("-")>=0){
           roseStr ='<span class="fb col_green">'+rose+'%</span>'
         }else{
          roseStr ='<span class="col_grey">'+rose+'%</span>'
         }
        return roseStr;
    },
    initCeremonyPage: function() {
      //初始化排行列表 type=0
      //初始化menu
      ceremonyMain.initMenuList(0);
      //初始化排行列表
      $("#js-rankContainer").html("");
      var board_id = $("#js-switchTab li.cur").attr("typeid");
      ceremonyMain.navSwitch(1,board_id);
      //切换排行类型
      $("#js-switchTab").on("click","li",function() {
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-switchTab li").removeClass("cur");
          $(this).addClass("cur");
          /*var listId = Number(Number($(this).index())+1);*/
          //初始化menu
          var curId=Number($(this).index())
          ceremonyMain.initMenuList(curId);
          //初始化列表
          var board_id = Number($(this).attr("typeid"));
          var platform_id=Number($("#js-platTab .cur").attr("typeid"));
          ceremonyMain.navSwitch(platform_id,board_id);
        })
      
      //切换平台排行
      $("#js-platTab").on("click","li",function(){
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-platTab li").removeClass("cur");
          $.each($("#js-platTab li"),function () {
            $(this).find("img").attr("src", $(this).find("img").attr("blur_pic"));
          })
          $(this).addClass("cur");
          $(this).find("img").attr("src", $(this).find("img").attr("focus_pic"));
          /*var listId = Number(Number($("#js-switchTab .cur").index())+1);*/
          var board_id=Number($("#js-switchTab .cur").attr("typeid"));
          var platform_id=Number($("#js-platTab .cur").attr("typeid"));
          ceremonyMain.navSwitch(platform_id,board_id);
        })
        //更多数据加载
      $("#js-moreRank").click(function() {
          var board_id = $("#js-switchTab li.cur").attr("typeid");
          var platform_id = $("#js-platTab li.cur").attr("typeid");
          ceremonyMain.navSwitch(platform_id,board_id);
        })
        //搜索
      $(".searchForm").submit(function(e) {
          ceremonyMain.toSearch();
        })
      //其他操作--搜索
      ceremonyMain.searchShow("js-searchMain", "js-search", "js-crecmonyMain");
      ceremonyMain.cancelSearch("js-searchMain", "js-btn_cancel", "js-crecmonyMain");
      //点击列表查看详情
        $("#js-rankContainer").on("click","li",function(){
          var uinfo=$(this).find("input.uinfo");
          var influence_roseStr=ceremonyMain.changeColor(uinfo.attr("influence_rose"));
          var read_roseStr=ceremonyMain.changeColor(uinfo.attr("read_rose"));
          var like_roseStr=ceremonyMain.changeColor(uinfo.attr("like_rose"));
          var follower_roseStr=ceremonyMain.changeColor(uinfo.attr("follower_rose"));
          var infohtml='<h1>'+uinfo.attr("name")+'</h1>'+
          '<a class="btn_toHit" href="http://t.cn/R7COgYb">为TA打榜</a>'+
          '<p><img  class="vm" src="'+uinfo.attr("platpic")+'" /><span class="vm">|'+uinfo.attr("job")+'</span></p>'+
          '<table>'+
            '<tr class="tit_01">'+
              '<td>平台</span></td>'+
              '<td><span>'+uinfo.attr("platname")+'</span></td>'+
              '<td>分类：</td>'+
              '<td><span>'+$("#js-switchTab .cur").html()+'</span></td>'+
            '</tr>'+
            '<tr class="tit_02">'+
              '<td><span class="fb">周影响力</span></td>'+
             ' <td>'+uinfo.attr("influence")+'</td>'+
             ' <td><span class="fb">周涨幅：</span></td>'+
             ' <td>'+influence_roseStr+'</td>'+
            '</tr>'+
            '<tr class="tit_01">'+
              '<td>周阅读量</td>'+
              '<td>'+uinfo.attr("read")+'</td>'+
             ' <td>周涨幅</td>'+
             ' <td>'+read_roseStr+'</td>'+
            '</tr>'+
            '<tr class="tit_01">'+
              '<td>周点赞量</td>'+
              '<td>'+uinfo.attr("like")+'</td>'+
             ' <td>周涨幅</td>'+
             ' <td>'+like_roseStr+'</td>'+
            '</tr>'+
            '<tr class="tit_01">'+
              '<td>粉丝数</td>'+
              '<td>'+uinfo.attr("follower")+'</td>'+
             ' <td>周涨幅</td>'+
             ' <td>'+follower_roseStr+'</td>'+
            '</tr>'+
          '</table>'
          $("#star_info").html(infohtml)
          tcc.BOX_show2("star_info");
        })
       //关闭弹框
       $(".js-close").click(function(){
         tcc.BOX_remove("messdiv");
       })
       //取消按钮
       $("#messdiv").on("click","#btn_cancel",function(){
         tcc.BOX_remove("messdiv");
       })
    },
    //ceremonyDetail page
    initCereDetailHtml: function(resultData) {
      var liHtml = "";
      var hitlist = resultData.info.hit_list;
      var star = resultData.info.star;
      var user = resultData.info.user;
      var likeNum = star.like_num > 10000 ? star.like_num / 10000 + "万" : star.like_num + "&nbsp";
      var user_likeNum = user.like_num > 10000 ? user.like_num / 10000 + "万" : user.like_num + "&nbsp";
      //star
      var coverUrl = star.cover == "" ? "assets/images/bannerDefault.png" : star.cover;
      var bgHtml = "<a href='"+host+"share.html?action=jumpToPersonal&uid=" + star.uid + "'><img src=" + coverUrl + " /></a>";
      $(".cereDetailBanner .bg").html(bgHtml);

      $(".cereDetailBanner .typeTitle").html(star.uname);
      $(".heartNumber p").html(likeNum);
      $(".rankingNum").html(star.grade);
      //user
      $(".curPersonInfo .head-pic img").attr("src", user.avatar);
      $(".curPersonInfo #curUserName").html(user.uname.length > 7 ? user.uname.substr(0, 7) + "..." : user.uname);
      if (user.grade == 0) {
        $(".gradeDesc").html("暂无排名");
      } else {
        $(".gradeDesc").html("排名第<span>" + user.grade + "</span>");
      }
      $(".curPersonInfo #followNum").html(user_likeNum);

      //btn operation
      if (user.is_like == 0) {
        $(".cereFooter").hide();
        $("#toHit").show();
      } else {
        $(".cereFooter").hide();
        var share_url = host+"festival?star_id=" + star.uid + "&uid=" + user.uid + "&server=" + server;
        $("#letFriendHit a").attr("href", host+"share.html?action=doBang&shareLink=" + encodeURIComponent(share_url));
        $("#letFriendHit").show();

      }
      //hitlist
      for (var i = 0; i < hitlist.length; i++) {
        var likeNum = hitlist[i].like_num > 10000 ? hitlist[i].like_num / 10000 + "万" : hitlist[i].like_num + "&nbsp";
        var uname = hitlist[i].uname.length > 5 ? hitlist[i].uname.substr(0, 5) + "..." : hitlist[i].uname;
        var avatar = hitlist[i].avatar == "" ? "assets/images/headPic-default.png" : hitlist[i].avatar+"!250x250";
        if (i <= 2) {
          liHtml += "<a><li class='tops'>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + uname + "</p>" + "<p class='rank-topsNum'><img src='assets/images/n" + Number(i + 1) + ".png' /></p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png'/>" + "</div>" + "</li></a>"
        } else {
          liHtml += "<a><li>" + "<p class='rank-num'>" + Number(Number(i) + 1) + "</p>" + "<p class='head-pic'><img src='" + avatar + "'></p><p class='user-name'>" + uname + "</p>" + "<div class='follow-num'>" + "<span id='followNum'>" + likeNum + "</span>" + "<img src='assets/images/icon-heart.png' />" + "</div>" + "</li></a>"
        }

      }
      $("#js-rankConDetail").html(liHtml);
    },
    getDetailData: function() {
      //添加缓冲114655
      ceremonyMain.addLoadding("js-rankConDetail");

      var star_id = ceremonyMain.analyzParams("star_id");
      var uid = ceremonyMain.analyzParams("uid");

      var url = host+"festival/hitList?star_id=" + star_id + "&uid=" + uid + "&server=" + server + "&callback=?"
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

      var url = host+"festival/hit?star_id=" + star_id + "&uid=" + uid + "&server=" + server + "&callback=?"
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        if (resultData != null && resultData.code == "200") {
          /*alert("打榜成功");*/
          tcc.BOX_show("messdiv");
          $(".messdivCons").html("打榜成功！")

          $(".cereFooter").hide();
          $("#letFriendHit").show();
          ceremonyMain.getDetailData();

        }

      })
    },
    initCereDetailPage: function() {
      ceremonyMain.getDetailData();
      /*$("#toHit").click(function(){
       ceremonyMain.toHitRank();
      })*/

    },

}
$(function() {
  if ($(".js-close").html() != undefined) {
    $(".js-close").click(function() {
      tcc.BOX_remove("messdiv");
    })
  }

  $("#BOX_overlay").click(function(){
    tcc.BOX_remove("star_info");
  })
  if ($("#js-crecmonyMain").html() != undefined) {
    ceremonyMain.initCeremonyPage();
    var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 5000,//可选选项，自动滑动
            speed: 600,
        });
  }
  if ($(".cereDetailBanner").html() != undefined) {
    ceremonyMain.initCereDetailPage();
  }



})