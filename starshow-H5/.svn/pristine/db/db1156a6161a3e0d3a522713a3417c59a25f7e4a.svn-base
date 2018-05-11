var server = 1;
/*var host = "http://123.57.0.118:5000/v7/";*/
var host=commonCla.hostBase+"/v11/";
var featuredSwiper="";
var bannerInfo={
        "cover":"",
        "likeNum":"",
        "name":"",
        "icon_star":""
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
    initRankCon: function(resultData, listPage, platform_id,caseid) {
      var liHtml = ""
      var listDdata = resultData.data.page_data;
      var bannerData = resultData.data.banner;
      var uid = ceremonyMain.analyzParams("uid");
      var platform_id=Number(platform_id);
      if(listDdata.length<=0 && listPage==0){
        liHtml="<div style='text-align:center; font-size:1.4rem;margin-top:50px;'><img src='assets/images/noData.png' style='width:100px' /><P class='mt10'>暂无数据</p></div>";
        $("#top-banner").attr("src","assets/images/bannerDefault.png");
        $(".userName span").html("")
        $(".joinNumber #number").html("0")
        $("#js-moreRank").hide();
        $("#"+caseid+" #js-rankContainer").append(liHtml);
        return;
      }
      //init banner
      /*var changeNum ="";
      var likeNum ="";*/
      var likeStr ="";
      var bannerHtml="";
      var timeMark="";
       //修改封面20170410
       /*if(bannerData.length>0){
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
        
      }*/

      /*if(listDdata[0]!=undefined){
         $("#top-banner").attr("src",listDdata[0].user.background_pic+"!750x563");;
        $(".userName span").html(listDdata[0].user.name);
      }*/
      var listId = $("#js-switchTab .swiper-slide-active").attr("typeid");
      var yue=""; var uname = "";var rose="";
      if(listId=="4" || listId=="5" || listId=="7" ||listId=="3"){
         yue=" <img src='assets/images/yue.png'/>";
      }
      for (var i = 0; i < listDdata.length; i++) {
        if (listDdata[i].star.name != null) {
          uname = listDdata[i].star.name.length > 5 ? listDdata[i].star.name.substr(0,5) + "..." : listDdata[i].star.name;
        }
        /*if(listDdata[i].influence_rose.indexOf("+")>=0){
          rose="<span id='followNum' class='col_red2'>"+listDdata[i].influence_rose+"%</span>"
        }else if(listDdata[i].influence_rose.indexOf("-")>=0){
          rose="<span id='followNum' class='col_green'>"+listDdata[i].influence_rose+"%</span>"
        }else{
          rose="<span id='followNum'>" +listDdata[i].influence_rose+"%</span>"
        }*/
        rose=ceremonyMain.changeColor(listDdata[i].influence_rose,listDdata[i].influence_trend);
        var jobStr="";
        if(listDdata[i].star!=null && listDdata[i].star.social_info!=null && listDdata[i].star.social_info!="null"){
          jobStr=listDdata[i].star.social_info.job==undefined?"":listDdata[i].star.social_info.job;
        }
        var influenceStr=listDdata[i].influence>=10000?Number(listDdata[i].influence/10000).toFixed(0)+"万":listDdata[i].influence;
        //var followerStr=listDdata[i].follower>=10000?Number(listDdata[i].follower/10000).toFixed(1)+"万":listDdata[i].follower;
        var followerStr="<span>粉丝"+ceremonyMain.counteNum(listDdata[i].star.user.followers_count,1)+"</span>";
        if(listDdata[i].follower==undefined){
          followerStr="";
          var styles="style='line-height:4rem'";
        }else{
          var styles="";
        }
        //排行
        var gradeNum=(listDdata[i].grade==undefined?Number(listPage+i+1):listDdata[i].grade);
        var rankNums="<span class='rank-num'>" +gradeNum+ "</span>";
        if(Number(listPage+i+1)>10 || gradeNum>10){
          var rankNums="<span class='rank-num col_black'>" +gradeNum + "</span>";
        }
        var a_url = "";
        var avatar = listDdata[i].star.head_pic == "" ? "assets/images/headPic-default.png" : listDdata[i].star.head_pic;
         var rolesHtml="";
        if(listDdata[i].star.user.roles.length>0){
          //角色删除
          /*rolesHtml="<img src='assets/images/icon-roles/roles_"+listDdata[i].star.user.roles[0]+".png' class='icon_roles' />"*/
          rolesHtml="";
        }
        var icon_platform="";
        if(platform_id==1){
         icon_platform="<img src='"+listDdata[i].platform.search_pic+"' width='10px'/>"
        }
        //区分星榜单和大咖榜
         var s_rankList="";
         var s_type= ceremonyMain.analyzParams("type")==undefined?"1": ceremonyMain.analyzParams("type")
        if (i <= 2 && listPage < 10) {
          //头三名排行
          var top_grade="<span class='t-rank-num'><img src='assets/images/n" + Number(i + 1) + ".png' /></span>"
          if(listDdata[i].grade!=undefined && listDdata[i].grade>3){
            top_grade=rankNums;
          }else if(listDdata[i].grade!=undefined && listDdata[i].grade<=3){
            top_grade="<span class='t-rank-num'><img src='assets/images/n" + listDdata[i].grade+ ".png' /></span>"
          }
          if(s_type==1){
            s_rankList="<li class='tops'>" + "<p class='head-pic'>"+top_grade+"<img class='head-pic-img'  src='" + avatar + "!250x250' />"+rolesHtml+"</p>"+
            "<div class='user-name col"+Number(i+1)+"'"+styles+">" + uname +"<div class='user-follows'>"+followerStr+"</div></div>" + 
            "" + 
            "<div class='follow-num'><span>"+listDdata[i].influence+"</span>" +rose + 
            "</div>"
          }else if(s_type==2){
            $(".list_tit").hide();
            s_rankList="<li class='tops'>" + 
            "<p class='head-pic'>"+top_grade+"<img class='head-pic-img'  src='" + avatar + "!250x250' />"+
            rolesHtml+"</p>"+
            "<div class='user-name topLength  col"+Number(i+1)+"'>" + uname +"<div class='user-follows'><p>"+ceremonyMain.counteNum(listDdata[i].influence,1)+"影响力</p>" +rose+"</div></div>" + 
            "" + 
            "<div class='follow-num btns'>"+yue+"<div>粉丝："+ceremonyMain.counteNum(listDdata[i].star.user.followers_count,1)+
            "</div></div>"
          }
          liHtml += s_rankList +
          "<input type='hidden' class='uinfo' name='"+listDdata[i].star.name+"' platName='"+listDdata[i].platform.name+
          "' starId='"+listDdata[i].star_id+
          "' platId='"+listDdata[i].platform_id+
          "' platPic='"+listDdata[i].platform.focus_pic+
          "' influence='"+listDdata[i].influence+
          "' influence_rose='"+listDdata[i].influence_rose+
          "' influence_trend='"+listDdata[i].influence_trend+
          "' like_rose='"+listDdata[i].like_rose+
          "' like_trend='"+listDdata[i].like_trend+
          "' like='"+listDdata[i].like+
          "' follower='"+listDdata[i].follower+
          "' follower_rose='"+listDdata[i].follower_rose+
          "' follower_trend='"+listDdata[i].follower_trend+
          "' read_rose='"+listDdata[i].read_rose+
          "' read_trend='"+listDdata[i].read_trend+
          "' read='"+listDdata[i].read+
          "' board_rose='"+listDdata[i].board_rose+
          "' board_trend='"+listDdata[i].board_trend+
          "' board_num='"+listDdata[i].board_num+
          "' share_rose='"+listDdata[i].share_rose+
          "' share_trend='"+listDdata[i].share_trend+
          "' share='"+listDdata[i].share+
          "' comment_rose='"+listDdata[i].comment_rose+
          "' comment_trend='"+listDdata[i].comment_trend+
          "' comment='"+listDdata[i].comment+
          "' search_rose='"+listDdata[i].search_rose+
          "' search_trend='"+listDdata[i].search_trend+
          "' search='"+listDdata[i].search+
          "' background_pic='"+listDdata[i].star.background_pic+
          "' job='"+jobStr+ "'/>"
           "</li>"
        } else {
          if(s_type==1){
            s_rankList="<li>" + "<p class='head-pic'>"+rankNums+"<img class='head-pic-img'  src='" + avatar + "!250x250' />"+rolesHtml+"</p>"+
            "<div class='user-name'"+styles+">" + uname +"<div class='user-follows'>"+followerStr+"</div></div>" + 
            "" + 
            "<div class='follow-num'><span>"+listDdata[i].influence+"</span>" +rose + 
            "</div>"
          }else if(s_type==2){
            $(".list_tit").hide();
            s_rankList="<li>" + 
            "<p class='head-pic'>"+rankNums+"<img class='head-pic-img'  src='" + avatar + "!250x250' />"+
            rolesHtml+"</p>"+
            "<div class='user-name topLength'>" + uname +"<div class='user-follows'><p>"+ceremonyMain.counteNum(listDdata[i].influence,1)+"影响力</p>" +rose+"</div></div>" + 
            "" + 
            "<div class='follow-num btns'>"+yue+"<div>粉丝："+ceremonyMain.counteNum(listDdata[i].star.user.followers_count,1)+
            "</div></div>"
          }
          liHtml += s_rankList+
          "<input type='hidden' class='uinfo' name='"+listDdata[i].star.name+"' platName='"+listDdata[i].platform.name+
          "' starId='"+listDdata[i].star_id+
          "' platId='"+listDdata[i].platform_id+
          "' platPic='"+listDdata[i].platform.focus_pic+
          "' influence='"+listDdata[i].influence+
          "' influence_rose='"+listDdata[i].influence_rose+
          "' influence_trend='"+listDdata[i].influence_trend+
          "' like_rose='"+listDdata[i].like_rose+
          "' like_trend='"+listDdata[i].like_trend+
          "' like='"+listDdata[i].like+
          "' follower='"+listDdata[i].follower+
          "' follower_rose='"+listDdata[i].follower_rose+
          "' follower_trend='"+listDdata[i].follower_trend+
          "' read_rose='"+listDdata[i].read_rose+
          "' read_trend='"+listDdata[i].read_trend+
          "' read='"+listDdata[i].read+
          "' board_rose='"+listDdata[i].board_rose+
          "' board_trend='"+listDdata[i].board_trend+
          "' board_num='"+listDdata[i].board_num+
          "' share_rose='"+listDdata[i].share_rose+
          "' share_trend='"+listDdata[i].share_trend+
          "' share='"+listDdata[i].share+
          "' comment_rose='"+listDdata[i].comment_rose+
          "' comment_trend='"+listDdata[i].comment_trend+
          "' comment='"+listDdata[i].comment+
          "' search_rose='"+listDdata[i].search_rose+
          "' search_trend='"+listDdata[i].search_trend+
          "' search='"+listDdata[i].search+
	        "' background_pic='"+listDdata[i].star.background_pic+
          "' job='"+jobStr+ "'/>"
           "</li>"
        }

      }
      $("#"+caseid+" #js-rankContainer").append(liHtml);
      //alert("#"+caseid+" #js-rankContainer"+$("#"+caseid+" #js-rankContainer").html())

      var b_pic=$("#js-rankContainer li").eq(0).find("input.uinfo").attr("background_pic");
       //修改封面
       if(b_pic=="" || b_pic==undefined ){
            $(".swiper-slide-active #top-banner").attr("src","assets/images/topBanner.png");
        }else{
           $(".swiper-slide-active #top-banner").attr("src",b_pic+'!750x563');
        }
    },
    navSwitch: function(platform_id,board_id,time_id) {
      //添加缓冲
      ceremonyMain.addLoadding("js-rankContainer");
      var perDataLength = 20;
      //var listPage=$("#js-rankContainer li").length>=20?$("#js-rankContainer li").length/20+1:1;
      var listPage = $("#js-crecmonyMain #js-rankContainer > li").length;
      //获取数据
      $("#js-moreRank").hide();
      if(board_id==undefined || isNaN(board_id)){
        board_id=$("#js-switchTab .swiper-slide").eq(0).attr("typeid");
      }
      var url=host+"boards/"+board_id+"?platform_id=" +Number(platform_id) + 
              "&type="+time_id+"&current_count=" + listPage 
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
             ceremonyMain.initRankCon(resultData, listPage, platform_id,"js-crecmonyMain");
          }
         
          
        }

      })

    },
    initMenuList:function(curId,caseid){
      var type = ceremonyMain.analyzParams("type")==undefined?1:ceremonyMain.analyzParams("type");
      //var type=3;
      var url=host+"boards?type="+type;
      ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null) {
          $("#js-moreRank").show();

           var background_pic="";var liHtml="";
           var boardData=resultData.data.boards;
           var platform=resultData.data.platforms;
            $(".swiper-wrapper").show();
            $(".swiper-pagination").show();
            $(".swiper-container .bannerCon").remove();
            var boardsHtml="";
           
           for (var i = 0; i < boardData.length; i++){
            if(boardData[i].user==null || boardData[i].user.star.background_pic=="" ){
              background_pic="assets/images/topBanner.png";
            }else{
              background_pic=boardData[i].user.star.background_pic+'!750x563';
            }
            if(boardData[i].user!=null){
              liHtml+='<div class="swiper-slide" boards_name="'+boardData[i].name+'" typeid="'+boardData[i].id+'">'+ 
                '<section class="cereBanner ">'+
                '<img src="'+background_pic+'" id="top-banner"/>'+
                '<div class="abs_navCons"><p>'+boardData[i].name+'</p><p>'+boardData[i].en_title+'</p></div>'+
                '</section></div>'
              boardsHtml+="<li class='"+(i==0?"cur":"")+"' bid='"+boardData[i].id+"'>"+boardData[i].name+"</li>"
            }
           };
           $(".swiper-wrapper").html(liHtml);
           //初始化榜单列表--搜素中
           $("#cur_boardsName").html(boardData[0].name);
           $("#cur_boardsName").attr("bid",boardData[0].id);
           $("#js-boardsList").html(boardsHtml);

           /*for (var i = 0; i < boardData.length; i++) {
             if(i==curId){
              liHtml+="<li class='cur' typeid='"+boardData[i].id+"'>"+boardData[i].name+"</li>"
            }else{
              liHtml+="<li typeid='"+boardData[i].id+"'>"+boardData[i].name+"</li>"
            }
             
           };*/
           
          ceremonyMain.initPlatForm(platform,caseid)
        }

      })
    },
    initPlatForm:function(platform,caseid){
    var liHtml_plat="";
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
                             '<img class="icon_logo" src="'+platform[i].platform.focus_pic+
                             '" focus_pic="'+platform[i].platform.focus_pic+'" blur_pic="'+platform[i].platform.blur_pic+'"/>'+
                             '<p>'+platform[i].platform.name+'</p>'+
                             '<!--<img class="icon_cur" src="assets/images/jiantou.png"/>-->'
                             '</li>'
              }else{
                liHtml_plat+='<li typeid="'+platform[i].platform.id+'">'+
                             '<img class="icon_logo" src="'+platform[i].platform.blur_pic+
                             '" focus_pic="'+platform[i].platform.focus_pic+'" blur_pic="'+platform[i].platform.blur_pic+'"/>'+
                             '<p>'+platform[i].platform.name+'</p>'+
                             '<!--<img class="icon_cur" src="assets/images/jiantou.png" style="display:none"/>-->'
                             '</li>'
              }
               
             };
           }
           

           /*$("#js-switchTab").html(liHtml);*/
           $("#"+caseid+" #js-platTab ul").html(liHtml_plat)
    },
    searchShow: function(searchId, triggerBtn, hideContentId) {
      $("#" + triggerBtn).click(function() {
        //init
        $("#js-searchList").html("");
        $("#js-txt_search").val("");

        $("#" + searchId).show();
        $("#" + hideContentId).css("visibility","hidden");
        $("#js-txt_search").focus();
      })
    },
    cancelSearch: function(searchId, triggerBtn, hideContentId) {
      $("#" + triggerBtn).click(function() {
        $("#" + searchId).hide();
        $("#" + hideContentId).css("visibility","visible");
        $("#js-searchList").show();
        $("#js-search-moreRank").hide();
        $("#search_detail").hide();
      })
    },
    counteNum:function(number,length){
      var final_num=0;
      if(number>=10000){
        number=number/10000+"";
        var tempArray=number.split(".");
        var intNum=tempArray[0];
        var decimal=tempArray[1].substr(0,length);
        final_num=intNum+"."+decimal+"万"
      }else{
        final_num=number;
      }
      return final_num;
    },
    initSearchList: function(resultData) {
      var searchHtml = "";
      var infoData = resultData.data.page_data;
      var icon_change="";
      if (resultData.data.length<=0 || infoData.length <= 0 && $("#js-searchList li").length<=0 ) {
        $("#js-searchMain #js-search-moreRank").hide();
        $("#js-searchList").html("<p class='tc' style='margin-top:13rem;'><img src='assets/images/noData2.png' style='width:100px' /><p class='col_grey tc' style='font-size:1.4rem'>暂无内容</p></p>");
      } else {
        $("#js-searchMain #js-search-moreRank").show();
        for (var a = 0; a < infoData.length; a++) {
          searchHtml+='<li uid="'+infoData[a].star.user_id+'" class="curPersonInfo searchPersonInfo">'+
                  '<p class="head-pic"><img src="'+infoData[a].star.head_pic+'!250x250"></p>'+
                  '<div class="user-info">'+
                  '<div>'+infoData[a].star.name+'</div>'+
                  '</div>'+
                  '</li>'
         
        }
        $("#js-searchList").append(searchHtml);
      }

    },
    toSearchDetail: function(keyword,params_type) {
      //添加缓冲
      ceremonyMain.addLoadding("js-searchList");
      var url = host+"boards/search";
      var platform_id=Number($("#js-searchMain #js-platTab .cur").attr("typeid"));
      var time_id=Number($("#js-searchMain #js-switchTab-time .cur").index())+1;
      var board_id = $("#js-switchTab .swiper-slide-active").attr("typeid");
      if(params_type=="all"){
        var params={
        "name":keyword,
        "board_id":board_id,
        "platform_id":platform_id,
        "type":time_id
        }
      }else{
        var params={
        "name":keyword,
        "board_id":board_id,
        }
      }
      ceremonyMain.ajaxCommonFun(url, "post", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null && resultData.code=="200") {
          var listPage = $("#js-searchMain #js-rankContainer > li").length;
          //重组数据
          var resultDataNew={
               "data":{
                  "page_data":[],
               },
               "total":"1"
          }
          if(resultData.data.page_data.length>=2){
            var uid=$("#hide_keyword").attr("uid");
            for (var i = 0; i < resultData.data.page_data.length; i++) {
              if(resultData.data.page_data[i].star.user_id==uid){
                 resultDataNew.data.page_data.push(resultData.data.page_data[i]);
              }
            };
          }else{
            resultDataNew=resultData;
          }
          $("#js-searchMain #js-rankContainer").html("");      
          ceremonyMain.initRankCon(resultDataNew, listPage, platform_id,"js-searchMain");
          if(params_type!="all"){
           ceremonyMain.initPlatForm(resultDataNew.data.page_data[0].all_platforms,"js-searchMain");
          }
        }else{
          tcc.BOX_show("messdiv");
         $(".messdivCons").html(resultData.error)
        }

      },params)

    },
    toSearch: function() {
      $("#js-searchList").show();
      $("#js-search-moreRank").show();
      $("#search_detail").hide();
      var current_count=$("#js-searchMain #js-searchList li").length;
      var keyword = $("#js-txt_search").val();
      if (keyword == "" || keyword == null) {
        //alert("请输入搜索的内容");
        tcc.BOX_show("messdiv");
        $(".messdivCons").html("请输入搜索的内容")
        return false;
      }
      //添加缓冲
      ceremonyMain.addLoadding("js-searchList");
      var url = host+"boards/search?current_count="+current_count;
      /*var platform_id=Number($("#js-platTab .cur").attr("typeid"));
      var time_id=Number($("#js-switchTab-time .cur").index())+1;*/
      var board_id = $("#js-switchTab .swiper-slide-active").attr("typeid");
      var params={
        "name":keyword,
        "board_id":board_id,
        /*"platform_id":platform_id,
        "type":time_id*/
      }
      ceremonyMain.ajaxCommonFun(url, "post", function(resultData) {
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if (resultData != null && resultData.code=="200") {
          if(resultData.data.page_data!=undefined &&　resultData.data.page_data.length<=0){
             $("#js-searchMain #js-search-moreRank").html("暂无更多数据");
             setTimeout(function(){
               $("#js-searchMain #js-search-moreRank").html("点击加载更多...");
             },60000)
            
          }else{
             ceremonyMain.initSearchList(resultData);
          }
          
        }else{
          tcc.BOX_show("messdiv");
         $(".messdivCons").html(resultData.error)
        }

      },params)

    },
    changeColor:function(rose,trend){
      var roseStr="";
       if(trend==2){
           roseStr ='<span class="col_red">+'+rose+'%</span>'
         }else if(trend==3){
           roseStr ='<span class="col_green">-'+rose+'%</span>'
         }else{
          roseStr ='<span class="col_grey">+'+rose+'%</span>'
         }
        return roseStr;
    },
    initDialogHtml:function(uinfo,domid){
      var influence_roseStr=ceremonyMain.changeColor(uinfo.attr("influence_rose"),uinfo.attr("influence_trend"));
          var read_roseStr=ceremonyMain.changeColor(uinfo.attr("read_rose"),uinfo.attr("read_trend"));
          var like_roseStr=ceremonyMain.changeColor(uinfo.attr("like_rose"),uinfo.attr("like_trend"));
          var follower_roseStr=ceremonyMain.changeColor(uinfo.attr("follower_rose"),uinfo.attr("follower_trend"));
          var board_roseStr=ceremonyMain.changeColor(uinfo.attr("board_rose"),uinfo.attr("board_trend"))

          var share_roseStr=ceremonyMain.changeColor(uinfo.attr("share_rose"),uinfo.attr("share_trend"));
          var comment_roseStr=ceremonyMain.changeColor(uinfo.attr("comment_rose"),uinfo.attr("comment_trend"));
          var search_roseStr=ceremonyMain.changeColor(uinfo.attr("search_rose"),uinfo.attr("search_trend"));
          var platform_id=uinfo.attr("platId");
          var boardHtml='';
          var time_mark="";
          if($("#"+domid+" #js-switchTab-time .cur").index()==0){
            time_mark="日"
          }else if($("#"+domid+" #js-switchTab-time .cur").index()==1){
            time_mark="周"
          }else{
            time_mark="月"
          }
          
          if(platform_id==2){
             boardHtml='<tr class="tit_01">'+
              '<td>'+time_mark+'打榜量</td>'+
              '<td>'+uinfo.attr("board_num")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+board_roseStr+'</td>'+
            '</tr>'
          }
          var tr_yxl='<tr class="tit_02">'+
              '<td><span class="fb">'+time_mark+'影响力</span></td>'+
             ' <td>'+uinfo.attr("influence")+'</td>'+
             ' <td><span class="fb">'+time_mark+'涨幅：</span></td>'+
             ' <td>'+influence_roseStr+'</td>'+
            '</tr>'

          var tr_readStr='<tr class="tit_01">'+
              '<td>'+time_mark+'阅读量</td>'+
              '<td>'+uinfo.attr("read")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+read_roseStr+'</td>'+
            '</tr>'
          var tr_likeStr='<tr class="tit_01">'+
              '<td>'+time_mark+'点赞量</td>'+
              '<td>'+uinfo.attr("like")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+like_roseStr+'</td>'+
            '</tr>'
          var tr_followStr='<tr class="tit_01">'+
              '<td>'+time_mark+'粉丝量</td>'+
              '<td>'+uinfo.attr("follower")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+follower_roseStr+'</td>'+
            '</tr>';
           var tr_commentStr='<tr class="tit_01">'+
              '<td>'+time_mark+'评论量</td>'+
              '<td>'+uinfo.attr("comment")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+comment_roseStr+'</td>'+
            '</tr>';
            var tr_shareStr='<tr class="tit_01">'+
              '<td>'+time_mark+'转发量</td>'+
              '<td>'+uinfo.attr("share")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+share_roseStr+'</td>'+
            '</tr>';
            var tr_searchStr='<tr class="tit_01">'+
              '<td>'+time_mark+'搜索量</td>'+
              '<td>'+uinfo.attr("search")+'</td>'+
             ' <td>'+time_mark+'涨幅</td>'+
             ' <td>'+search_roseStr+'</td>'+
            '</tr>';

            if(uinfo.attr("influence")=="undefined"){
                tr_yxl="";
             }
             if(uinfo.attr("read")=="undefined"){
              tr_readStr="";
            }
            if(uinfo.attr("like")=="undefined"){
            tr_likeStr="";
            }
            if(uinfo.attr("follower")=="undefined"){
              tr_followStr="";
            }
            if(uinfo.attr("comment")=="undefined"){
              tr_commentStr="";
            }
            if(uinfo.attr("share")=="undefined"){
              tr_shareStr="";
            }
            if(uinfo.attr("search")=="undefined"){
              tr_searchStr="";
            }
          var tohitbtns="";
          if(uinfo.attr('platId')==2){
            tohitbtns='<tr>'+
              '<td class="tit_btn" colspan="4"><a class="app_link"><input type="button" value="为TA打榜" class="btn_toHit2"/></a>'+
              '</td>'+
            '</tr>'
          }
	  var type= ceremonyMain.analyzParams("type")==undefined?"1": ceremonyMain.analyzParams("type");
          var infohtml='<h1>'+uinfo.attr("name")+'</h1>'+
          '<a class="btn_toHit" href="starHitDa.html?type='+type+'&platform_id='+uinfo.attr('platId')+'&star_id='+uinfo.attr('starId')+'">数据分析&gt;</a>'+
          '<p><img  class="vm" src="'+uinfo.attr("platpic")+'" /> <span class="vm">|'+uinfo.attr("job")+'</span></p>'+
          '<table>'+
            '<tr class="tit_01">'+
              '<td>平台</span></td>'+
              '<td><span>'+uinfo.attr("platname")+'</span></td>'+
              '<td>分类：</td>'+
              '<td><span>'+$("#js-switchTab .swiper-slide-active").attr("boards_name")+'</span></td>'+
            '</tr>'+tr_yxl +tr_readStr+tr_likeStr+tr_followStr+tr_commentStr+tr_shareStr+tr_searchStr+boardHtml+
            tohitbtns+
          '</table>'
          $("#star_info").html(infohtml)
          tcc.BOX_show2("star_info");
        },
    initCeremonyPage: function() {
      //初始化排行列表 type=0
      //初始化menu
      ceremonyMain.initMenuList(0,"js-crecmonyMain");
      //初始化排行列表
      $("#js-rankContainer").html("");
      var board_id = $("#js-switchTab .swiper-slide-active").attr("typeid");
      var time_id=Number($("#js-switchTab-time .cur").index())+1;
      // ceremonyMain.navSwitch(1,board_id,time_id);
      /*切换排行类型*/
      $("#js-crecmonyMain #js-switchTab-time").on("click","li",function() {
          
          //var listId = Number(Number($(this).index())+1);
         // 初始化menu
         // var curId=Number($(this).index())
          //ceremonyMain.initMenuList(curId);
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-crecmonyMain #js-switchTab-time li").removeClass("cur");
          $(this).addClass("cur");
          //初始化列表
          var board_id=Number($("#js-switchTab .swiper-slide-active").attr("typeid"));
          var platform_id=Number($("#js-platTab .cur").attr("typeid"));
          var time_id=Number($(this).index())+1;
          ceremonyMain.navSwitch(platform_id,board_id,time_id);
        })
      /*切换日周月--搜索*/
      $("#js-searchMain #js-switchTab-time").on("click","li",function() {
          $("#js-searchMain #js-rankContainer").html("");
          $("#js-searchMain #js-switchTab-time li").removeClass("cur");
          $(this).addClass("cur");
          //初始化列表

          var keyword=$("#hide_keyword").attr("keyword");
          ceremonyMain.toSearchDetail(keyword,"all");
        })
      //切换平台排行
      $("#js-crecmonyMain #js-platTab").on("click","li",function(){
          //init ranklist
          $("#js-rankContainer").html("");
          $("#js-crecmonyMain #js-platTab li").removeClass("cur");
          $.each($("#js-platTab li"),function () {
            $(this).find("img.icon_logo").attr("src", $(this).find("img").attr("blur_pic"));
          })
          /*$("#js-platTab li .icon_cur").hide();
          $(this).find(".icon_cur").show();*/
          $(this).addClass("cur");
          $(this).find("img.icon_logo").attr("src", $(this).find("img").attr("focus_pic"));
          /*var listId = Number(Number($("#js-switchTab .swiper-slide-active").index())+1);*/
          var board_id=Number($("#js-switchTab .swiper-slide-active").attr("typeid"));
          var platform_id=Number($("#js-platTab .cur").attr("typeid"));
          var time_id=Number($("#js-switchTab-time .cur").index())+1;
          ceremonyMain.navSwitch(platform_id,board_id,time_id);
        })
       //切换平台---搜索
      $("#js-searchMain #js-platTab").on("click","li",function(){
          //init ranklist
          $("#js-searchMain #js-rankContainer").html("");
          $("#js-searchMain #js-platTab li").removeClass("cur");
          $.each($("#js-searchMain #js-platTab li"),function () {
            $(this).find("img.icon_logo").attr("src", $(this).find("img").attr("blur_pic"));
          })
          $(this).addClass("cur");
          $(this).find("img.icon_logo").attr("src", $(this).find("img").attr("focus_pic"));
          var keyword=$("#hide_keyword").attr("keyword");
          ceremonyMain.toSearchDetail(keyword,"all");
           
        })
        //更多数据加载
      $("#js-moreRank").click(function() {
          var board_id = $("#js-switchTab .swiper-slide-active").attr("typeid");
          var platform_id = $("#js-platTab .cur").attr("typeid");
          var time_id=Number($("#js-switchTab-time .cur").index())+1;
          ceremonyMain.navSwitch(platform_id,board_id,time_id);
        })
      //更多数据加载
      $("#js-search-moreRank").click(function() {
          ceremonyMain.toSearch();
        })
        //搜索
      $(".searchForm").submit(function(e) {
        $("#js-searchList").html("");
          ceremonyMain.toSearch();
        })
      //搜索选择榜单
      $(".btn_choose").click(function(){
         $(".hide_list").show();
      })
      //选择榜单
      $("#js-boardsList li").click(function(){
        var bid=$(this).attr("bid");
        var bname=$(this).html();
        $("#js-boardsList li").removeClass("cur");
        $(this).addClass("cur");
        $("#cur_boardsName").attr("bid",bid);
        $("#cur_boardsName").html(bname);

        $(".hide_list").hide();
        ceremonyMain.toSearch();
      })
      //其他操作--搜索
      ceremonyMain.searchShow("js-searchMain", "js-search", "js-crecmonyMain");
      ceremonyMain.cancelSearch("js-searchMain", "js-btn_cancel", "js-crecmonyMain");
      //点击列表查看详情
        $("#js-rankContainer").on("click","li",function(){
          var uinfo=$(this).find("input.uinfo");
          ceremonyMain.initDialogHtml(uinfo,"js-crecmonyMain");
        })
        //点击搜索详情列表查看详情
        $("#js-searchMain #js-rankContainer").on("click","li",function(){
          var uinfo=$(this).find("input.uinfo");
          ceremonyMain.initDialogHtml(uinfo,"js-searchMain");
        })
       //关闭弹框
       $(".js-close").click(function(){
         tcc.BOX_remove("messdiv");
       })
       //取消按钮
       $("#messdiv").on("click","#btn_cancel",function(){
         tcc.BOX_remove("messdiv");
       })
       //搜索查看详情
       $("#js-searchList").on("click","li",function(){
           var keyword=$(this).find(".user-info div").html();
           $("#hide_keyword").attr("keyword",keyword);
           $("#hide_keyword").attr("uid",$(this).attr("uid"));
           $("#js-searchList").hide();
           $("#js-search-moreRank").hide();
           $("#search_detail").show();
           ceremonyMain.toSearchDetail(keyword);
           
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
    /*var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 5000,//可选选项，自动滑动
            speed: 600,
            slidesPerView: 3,
            watchActiveIndex: true
        });*/
    //Featured Slide
       featuredSwiper = new Swiper('.swiper-container',{
        effect : 'coverflow',
        slidesPerView:'auto',
        centeredSlides: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 150
        },
        loop : true,
        loopedSlides :8,
        onTransitionEnd: function(swiper){
          var curIndex=swiper.activeIndex;
          /*$("#js-switchTab .swiper-slide").removeClass("cur");
          $("#js-switchTab .swiper-slide").eq(curIndex).addClass("cur");*/
          var board_id=$("#js-switchTab .swiper-slide-active").attr("typeid");
          //初始化列表
          $("#js-rankContainer").html("");
          
          var platform_id=Number($("#js-crecmonyMain #js-platTab .cur").attr("typeid"));
          var time_id=Number($("#js-switchTab-time .cur").index())+1;
          var type=ceremonyMain.analyzParams("type");
          var url=host+"boards?type="+type+"&board_id="+board_id;
          ceremonyMain.ajaxCommonFun(url, "get", function(resultData) {
            ceremonyMain.initPlatForm(resultData.data.platforms,"js-crecmonyMain");
            ceremonyMain.navSwitch(resultData.data.platforms[0].platform.id,board_id,time_id);
          })
          
        }
      })
  }
  if ($(".cereDetailBanner").html() != undefined) {
    ceremonyMain.initCereDetailPage();
  }



})