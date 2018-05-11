var server = 1;
/*var host = "http://123.57.0.118:5000/v5/";*/
var host=commonCla.hostBase+"/v5/"

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
          BOX_layout(e);
        } //改变窗体重新调整位置
      window.onscroll = function() {
          BOX_layout(e);
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
    initRankCon: function(resultData, listPage, typeNum) {
      var liHtml = ""
      var listDdata = resultData.data.page_data.stars;
      var bannerData = resultData.data.banner;
      var uid = ceremonyMain.analyzParams("uid");
      var typeNum=Number(Number(typeNum)+1);
      if(listDdata.length<=0 && listPage==0){
        liHtml="<div style='text-align:center; font-size:1.4rem;margin-top:30px;'>暂无数据</div>";
        $("#top-banner").attr("src","assets/images/bannerDefault.png");
        $(".userName span").html("")
        $(".joinNumber #number").html("0")
        $("#js-moreRank").hide();
      }
      //init banner
      /*var changeNum ="";
      var likeNum ="";*/
      var likeStr ="";
      var bannerHtml="";
      var timeMark="";
      if(typeNum==1){
            likeStr = listDdata[0].day_result > 10000 ?Math.floor(listDdata[0].day_result / 10000) + 
           "万" : listDdata[0].day_result + "&nbsp";
           /*likeNum=listDdata[0].day_result;
           changeNum=listDdata[0].day_change;*/
           timeMark="day";
           //$(".joinNumber #number").html(listDdata[0].day_like_num)
         }else if(typeNum==2){
            likeStr = listDdata[0].week_result > 10000 ? Math.floor(listDdata[0].week_result / 10000) + 
           "万" : listDdata[0].week_like_num + "&nbsp";
           /*likeNum=listDdata[0].week_result;
           changeNum=listDdata[0].week_change;*/
           timeMark="week";
           //$(".joinNumber #number").html(listDdata[0].week_like_num)
         }else if(typeNum==3){
            likeStr = listDdata[0].month_result > 10000 ? Math.floor(listDdata[0].month_result / 10000) + 
           "万" : listDdata[0].month_result + "&nbsp";
           /*likeNum=listDdata[0].month_result;
           changeNum=listDdata[0].month_change;*/
           timeMark="month";
           //$(".joinNumber #number").html(listDdata[0].month_like_num)
         }
         
      if(listDdata[0]!=undefined && $("#js-rankContainer li").length<=0){
        

          var head_pic_01=listDdata[0].background_pic == "" ? "assets/images/bannerDefault2.png" : listDdata[0].background_pic
          bannerHtml='<div class="swiper-slide">'+
            '<section class="cereBanner ">'+
         ' <img src="'+head_pic_01+'" id="top-banner"/>'+
         ' <div class="bannerTip">'+
           '<img src="assets/images/top-tip.png" />'+
           '<p class="userName"><img src="assets/images/icon-arrow-left.png" ><span>'+
           listDdata[0].name+'</span></p>'+
           '<p class="c1">当前分数</p>'+
           '<div class="joinNumber">'+
             '<div id="number">'+likeStr+'</div>'+
             '<img src="assets/images/icon-star.png" />'+
           '</div>'+
         '</div>'+
         '<p class="icon-rule"><a href="http://share.xingxiu.tv/starshow5.0/rankRule/index.html"><img src="assets/images/icon-rule.png"></a></p>'+
        '</section>'+
          '</div>';
          bannerInfo.cover=listDdata[0].background_pic;
          bannerInfo.name=listDdata[0].name;
          bannerInfo.likeNum =likeStr;
       }else if($("#js-rankContainer li").length>0){
          var head_pic_01=bannerInfo.cover == "" ? "assets/images/bannerDefault2.png" : bannerInfo.cover
          bannerHtml='<div class="swiper-slide">'+
            '<section class="cereBanner ">'+
         ' <img src="'+head_pic_01+'" id="top-banner"/>'+
         ' <div class="bannerTip">'+
           '<img src="assets/images/top-tip.png" />'+
           '<p class="userName"><img src="assets/images/icon-arrow-left.png" ><span>'+
           bannerInfo.name+'</span></p>'+
           '<p class="c1">当前分数</p>'+
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
      var yue="";
      if(listId!="1" && listId!="2"){
         yue=" <img src='assets/images/yue.png' width='30px'/>";
      }
      for (var i = 0; i < listDdata.length; i++) {
        
        var icon_change="";
        var uname = "";
        var changeNum=listDdata[i][timeMark+"_change"];
        if(changeNum==1){
          icon_change="<img class='icon_change' src='assets/images/ping.png'/>"
        }else if(changeNum=="2"){
          icon_change="<img class='icon_change'  src='assets/images/shangsheng.png'/>"
        }else if(changeNum=="3"){
          icon_change="<img class='icon_change'  src='assets/images/xiajiang.png'/>"
        }
        if (listDdata[i].name != null) {
          uname = listDdata[i].name.length > 3 ? listDdata[i].name.substr(0,3) + "..." : listDdata[i].name;
        }
        var a_url = "";
        var avatar = listDdata[i].head_pic == "" ? "assets/images/headPic-default.png" : listDdata[i].head_pic;
        var baiduRankHtml=""
        var weiboRankHtml=""
        var likeRankHtml=""
        if(listDdata[i][timeMark+"_baidu_rank"]=="0"){
          baiduRankHtml="暂无排名";
        }else{
          baiduRankHtml="<span class='score-number'>"+listDdata[i][timeMark+"_baidu_num"]+"</span>"+
              "<span class='score-rank'>(NO."+listDdata[i][timeMark+"_baidu_rank"]+")</span>"
        }
        if(listDdata[i][timeMark+"_weibo_rank"]=="0"){
          weiboRankHtml="暂无排名";
        }else{
          weiboRankHtml= "<span class='score-number'>"+listDdata[i][timeMark+"_weibo_num"]+"</span>"+
              "<span class='score-rank'>(NO."+listDdata[i][timeMark+"_weibo_rank"]+")</span>"
        }
        if(listDdata[i][timeMark+"_like_rank"]=="0"){
          likeRankHtml="暂无排名";
        }else{
          likeRankHtml= "<span class='score-number'>"+listDdata[i][timeMark+"_like_num"]+"</span>"+
              "<span class='score-rank'>(NO."+listDdata[i][timeMark+"_like_rank"]+")</span>"
        }
        
        if (i <= 2 && listPage < 10) {
          liHtml += a_url + "<li class='tops'>" + "<p class='head-pic'><img src='" + avatar + "'></p>"+
          "<div class='user-name'>" + uname +yue+"</div>" + 
          "<p class='rank-num'><img src='assets/images/n" + Number(i + 1) + ".png' /></p>" + 
          "<div class='follow-num'>" + icon_change+"<span id='followNum'>" +listDdata[i][timeMark+"_result"] + "</span>" + 
          "<img class='icon_show' src='assets/images/xiala.png'/>" + "</div>" + 
          "<div  class='hit-dialog' style='display:none'><img class='dialog-bg' src='assets/images/tangchukuang.png'/>"+
           "<ul><li>" +
            "<div class='icon-type'>百度搜索</div>"+
            "<div class='score'>"+baiduRankHtml+ "</div>"+
          "</li>"+
	        "<li>" +
            "<div class='icon-type'>微博搜索</div>"+
            "<div class='score'>"+weiboRankHtml+"</div>"+
          "</li>"+
          "<li>" +
            "<div class='icon-type'>星秀打榜</div>"+
            "<div class='score'>"+likeRankHtml+"</div>"+
          "</li>"+
         "</ul></div>"+
          "</li>"
        } else {
          liHtml += a_url + "<li>" + "<p class='rank-num'>" + Number(listPage+i+1) + "</p>" + 
          "<p class='head-pic'><img src='" + avatar + "'></p> <p class='user-name'>" + uname  +yue+ "</p>" + 
          "<div class='follow-num'>" +icon_change+ "<span id='followNum'>" + listDdata[i][timeMark+"_result"]  + "</span>" + 
          "<img class='icon_show' src='assets/images/xiala.png' />" + "</div>" +
          "<div  class='hit-dialog' style='display:none'><img class='dialog-bg' src='assets/images/tangchukuang.png'/>"+
           "<ul><li>" +
            "<div class='icon-type'>百度搜索</div>"+
            "<div class='score'>"+baiduRankHtml+ "</div>"+
          "</li>"+
          "<li>" +
            "<div class='icon-type'>微博搜索</div>"+
            "<div class='score'>"+weiboRankHtml+"</div>"+
          "</li>"+
          "<li>" +
            "<div class='icon-type'>星秀打榜</div>"+
            "<div class='score'>"+likeRankHtml+"</div>"+
          "</li>"+
         "</ul></div>"+
           "</li>"
        }

      }
      $("#js-rankContainer").append(liHtml);
    },
    navSwitch: function(typeNum,listId) {
      //添加缓冲
      ceremonyMain.addLoadding("js-rankContainer");
      var perDataLength = 20;
      //var listPage=$("#js-rankContainer li").length>=20?$("#js-rankContainer li").length/20+1:1;
      var listPage = $("#js-rankContainer > li").length;
      //获取数据
      $("#js-moreRank").hide();
      var url=host+"boards/"+listId+"?type=" + Number(Number(typeNum) + 1) + 
              "&current_count=" + listPage 
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null) {
          $("#js-moreRank").show();
          if(resultData.data.page_data.stars.length!=undefined &&　resultData.data.page_data.stars.length<=0){
             $("#js-moreRank").html("暂无更多数据");
             setTimeout(function(){
               $("#js-moreRank").html("点击加载更多...");
             },60000)
            
          }else{
             ceremonyMain.initRankCon(resultData, listPage, typeNum);
          }
         
          
        }

      })

    },
    initMenuList:function(){
      //var type = ceremonyMain.analyzParams("type");
      var type=3;
      var url=host+"list?type="+type;
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null) {
          $("#js-moreRank").show();
           var liHtml="";
           for (var i = 0; i < resultData.data.length; i++) {
             if(i==0){
              liHtml+="<li class='cur' typeid='"+resultData.data[i].id+"'>"+resultData.data[i].name+"</li>"
            }else{
              liHtml+="<li typeid='"+resultData.data[i].id+"'>"+resultData.data[i].name+"</li>"
            }
             
           };

           $("#js-switchTab").html(liHtml);
           var listId = $("#js-switchTab li.cur").attr("typeid");
           ceremonyMain.navSwitch(0,listId);
          
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
      var infoData = resultData.data.page_data;
      var icon_change="";
      if (infoData.length <= 0) {
        $("#js-searchList").html("<p class='tc' style='margin-top:50px'>暂无此明星入驻</p>");
      } else {
        var uid = ceremonyMain.analyzParams("uid");

        for (var i = 0; i < infoData.length; i++) {
          var likeNum = infoData[i].total_like_num > 10000 ? (infoData[i].total_like_num / 10000).toFixed(1) + "万" : infoData[i].total_like_num + "&nbsp";
          var uname = "";
          var changeNum=infoData[i].day_change;
          if(changeNum<=1){
            icon_change="<img class='icon_change' src='assets/images/ping.png' width='10'/>"
          }else if(changeNum=="2"){
            icon_change="<img class='icon_change'  src='assets/images/shangsheng.png' width='10'/>"
          }else if(changeNum=="3"){
            icon_change="<img class='icon_change'  src='assets/images/xiajiang.png' width='10'/>"
          }
          if (infoData[i].name != null) {
            uname = infoData[i].name.length > 5 ? infoData[i].name.substr(0, 5) + "..." : infoData[i].name;
          }
          var avatar = infoData[i].head_pic == "" ? "assets/images/headPic-default.png" : infoData[i].head_pic+"!250x250";
          searchHtml += "<li class='curPersonInfo searchPersonInfo'>" + 
          "<p class='head-pic'><img src='" + avatar + "'></p>" + 
          "<div class='user-info'>" + "<div>" + uname + "</div>" + 
          "<div class='col_grey f13'>当前分数：" + infoData[i].day_result +" "+icon_change+ "</div>" + 
          "</div>" + "<div class='follow-num'>" + 
          " <span id='followNum'>" + likeNum + "</span>" + 
          "<img src='assets/images/icon-heart.png'>" + "</div>" + "</li>";

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
        "name":keyword
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
    initCeremonyPage: function() {
      //初始化排行列表 type=0
      $("#js-rankContainer").html("");
      ceremonyMain.initMenuList();
      
      //切换排行类型
      $("#js-switchTab li").click(function() {
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-switchTab li").removeClass("cur");
          $(this).addClass("cur");
          /*var listId = Number(Number($(this).index())+1);*/
          var listId = Number($(this).attr("typeid"));
          var typeNum=Number($("#js-switchTab-time .cur").index());
          ceremonyMain.navSwitch(typeNum,listId);
        })
      
      //切换星周日排行
      $("#js-switchTab-time li").click(function() {
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-switchTab-time li").removeClass("cur");
          $(this).addClass("cur");
          /*var listId = Number(Number($("#js-switchTab .cur").index())+1);*/
          var listId=Number($("#js-switchTab .cur").attr("typeid"));
          var typeNum=Number($(this).index());
          ceremonyMain.navSwitch(typeNum,listId);
        })
        //更多数据加载
      $("#js-moreRank").click(function() {
          var listId = $("#js-switchTab li.cur").attr("typeid");
          var typeNum = $("#js-switchTab-time li.cur").index();
          ceremonyMain.navSwitch(typeNum,listId);
        })
        //搜索
      $(".searchForm").submit(function(e) {
          ceremonyMain.toSearch();
        })
        //其他操作
      ceremonyMain.searchShow("js-searchMain", "js-search", "js-crecmonyMain");
      ceremonyMain.cancelSearch("js-searchMain", "js-btn_cancel", "js-crecmonyMain");
      //去下载
       //toMsgArea
       $("#js-rankContainer").on("click","li",function(e){
        e.preventDefault();
         /*$(".messdivCons").css("padding-bottom","20px")
         $(".messdivCons").html("下载星秀APP查看明星详情"+"<div class='dialogFooter mt10'>"+
        "<div class='btn_dialog'><a href='http://t.cn/R7COgYb'>去下载</a></div>"+
        "<div class='btn_dialog' id='btn_cancel'>取消</div></div>");
        tcc.BOX_show("messdiv");*/
        var is_show=$(this).find("div.hit-dialog").css("display"); 
        if(is_show=="none" || is_show==null){
          //$("#js-rankContainer li .hit-dialog").hide();
          //$("#js-rankContainer li .icon_show").attr("src","assets/images/xiala.png")
          $(this).find("div.hit-dialog").show();
          $(this).find(".icon_show").attr("src","assets/images/shouqi.png")
        }else{
          //$("#js-rankContainer li .icon_show").attr("src","assets/images/shouqi.png")
          $(this).find("div.hit-dialog").hide();
          $(this).find(".icon_show").attr("src","assets/images/xiala.png")
        }
        

       })
       $("#js-searchMain").on("click","li",function(e){
        /*e.preventDefault();
         $(".messdivCons").css("padding-bottom","20px")
         $(".messdivCons").html("确认下载星秀APP"+"<div class='dialogFooter mt10'>"+
        "<div class='btn_dialog'><a href='http://t.cn/R7COgYb'>去下载</a></div>"+
        "<div class='btn_dialog' id='btn_cancel'>取消</div></div>");
        tcc.BOX_show("messdiv");*/
        var is_show=$(this).find("div.hit-dialog").css("display");

        if(is_show=="none"){
          //$("#js-rankContainer li .hit-dialog").hide();
          //$("#js-rankContainer li .icon_show").attr("src","assets/images/xiala.png")
          $(this).find("div.hit-dialog").show();
          $(this).find(".icon_show").attr("src","assets/images/shouqi.png")
        }else{
          //$("#js-rankContainer li .icon_show").attr("src","assets/images/shouqi.png")
          $(this).find("div.hit-dialog").hide();
          $(this).find(".icon_show").attr("src","assets/images/xiala.png")
        }

       })
       $(".js-close").click(function(){
         tcc.BOX_remove("messdiv");
       })
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