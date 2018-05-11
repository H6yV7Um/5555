var server=0;
/*var host='http://123.57.0.118:5000';*/
var host =commonCla.hostBase+'/v3';
var tcc={
  BOX_show:function(e) //显示
  {
      if(document.getElementById(e)==null)
      {
          return ;
      }
      var selects = document.getElementsByTagName('select');
      for(i = 0; i < selects.length; i++)
      {
          selects[i].style.visibility = "hidden";
      }
      tcc.BOX_layout(e);
      window.onresize = function(){BOX_layout(e);} //改变窗体重新调整位置
      window.onscroll = function(){BOX_layout(e);} //滚动窗体重新调整位置
      document.onkeyup = function(event)
      {
          var evt = window.event || event;
          var code = evt.keyCode?evt.keyCode : evt.which;
          //alert(code);
          if(code == 27)
          {
              tcc.BOX_remove(e);
          }
      }
  },
  BOX_remove:function(e)//移除
  {
      window.onscroll = null;
      window.onresize = null;
      document.getElementById('BOX_overlay').style.display="none";
      document.getElementById(e).style.display="none";
      var selects = document.getElementsByTagName('select');
      for(i = 0; i < selects.length; i++)
      {
          selects[i].style.visibility = "visible";
      }
  },
  BOX_layout:function(e)//调整位置
  {
      var a = document.getElementById(e);
      if (document.getElementById('BOX_overlay')==null)//判断是否新建遮掩层
      {
          var overlay = document.createElement("div");
          overlay.setAttribute('id','BOX_overlay');
          document.body.appendChild(overlay);
      }
      document.getElementById('BOX_overlay').ondblclick=function(){tcc.BOX_remove(e);};
      //取客户端左上坐标，宽，高
      var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      var clientWidth;
      if (window.innerWidth)
      {
          clientWidth = window.innerWidth;
         // clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
      }
      else
      {
          clientWidth = document.documentElement.clientWidth;
      }
      var clientHeight;
      if (window.innerHeight)
      {
          clientHeight = window.innerHeight;
          //clientHeight = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
      }
      else
      {
          clientHeight = document.documentElement.clientHeight;
      }
      var bo = document.getElementById('BOX_overlay');
      bo.style.left = scrollLeft+'px';
      bo.style.top = scrollTop+'px';
      bo.style.width = clientWidth+'px';
      bo.style.height = clientHeight+'px';
      bo.style.display="";
      //Popup窗口定位
      a.style.position = 'absolute';
      a.style.zIndex=999;
      a.style.display="";
      a.style.left = scrollLeft+((clientWidth-a.offsetWidth)/2)+'px';
      a.style.top = scrollTop+((clientHeight-a.offsetHeight)/2)+'px';
  },
  HiddenButton:function(e)
  {
      e.style.visibility='hidden';
      e.coolcodeviousSibling.style.visibility='visible'
  }
}
var ceremonyMain={
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
   analyzUrl: function() {
    var paramsList={}
    var url=window.location.search.split("?")[1];
    if(url=="" || url==undefined){return paramsList;}
    var params=url.split("&");
    for(var i=0;i<params.length;i++){
      var keyName=params[i].split("=")[0];
      var value=params[i].split("=")[1];
      paramsList[keyName]=value;
    }
    return paramsList;

   },
   addLoadding:function(targetId){
    var loaddingHtml="<div class='spinner' id='spinner'>"
      +"<div class='bounce1'></div>"
      +"<div class='bounce2'></div>"
      +"<div class='bounce3'></div>"
      +"</div>";
    $("#"+targetId).append(loaddingHtml)
   },
   removeLoadding:function(selfId){
    $("#"+selfId).remove();
   },
   initRankCon:function(resultData,listPage,typeNum){
      var liHtml=""
      var listDdata=resultData.data.page_data;
      var uid=ceremonyMain.analyzUrl()["uid"];
      for(var i=0;i<listDdata.length;i++){
        var likeNum=listDdata[i].like_num>10000?listDdata[i].like_num/10000+"万":listDdata[i].like_num+"&nbsp";
        var uname="";
        if(listDdata[i].uname!=null){
             uname=listDdata[i].uname.length>5?listDdata[i].uname.substr(0,5)+"...":listDdata[i].uname;
         }
        if(typeNum!=2){
          var a_url="<a>";
        }else{
          var a_url="<a>";
        }
        var avatar=listDdata[i].avatar==""?"assets/images/headPic-default.png":listDdata[i].avatar;
       if(i<=2 && listPage<10){
        liHtml+=a_url+"<li class='tops'>"
          +"<p class='head-pic'><img src='"+avatar+"'></p><p class='user-name'>"+uname+"</p>"
          +"<p class='rank-topsNum'><img src='assets/images/n"+Number(i+1)+".png' /></p>"
          +"<div class='follow-num'>"
          +"<span id='followNum'>"+likeNum+"</span>"
          +"<img src='assets/images/icon-heart.png'/>"
          +"</div>"
          +"</li></a>"
       }else{
        liHtml+=a_url+"<li>"
          +"<p class='rank-num'>"+Number(listDdata[i].grade)+"</p>"
          +"<p class='head-pic'><img src='"+avatar+"'></p><p class='user-name'>"+uname+"</p>"
          +"<div class='follow-num'>"
          +"<span id='followNum'>"+likeNum+"</span>"
          +"<img src='assets/images/icon-heart.png' />"
          +"</div>"
          +"</li></a>"
       }
       
      }
      $("#js-rankContainer").append(liHtml);
   },
   navSwitch:function(typeNum){
    //添加缓冲
    ceremonyMain.addLoadding("js-rankContainer");
    var perDataLength=20;
    //var listPage=$("#js-rankContainer li").length>=20?$("#js-rankContainer li").length/20+1:1;
    var listPage=$("#js-rankContainer li").length;
    //获取数据
    $("#js-moreRank").hide();
	var url = host+"/festival?type="+Number(Number(typeNum)+1)+"&current_count="+listPage;
    ceremonyMain.ajaxCommonFun(url,"get",function(resultData){
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if(resultData!=null){
             ceremonyMain.initRankCon(resultData,listPage,typeNum);
             $("#js-moreRank").show();
        }
      //二次分享
      wx_share();
      })
    
   },
   searchShow:function(searchId,triggerBtn,hideContentId){
      
      $("#"+triggerBtn).click(function(){
        //init
        $("#js-searchList").html("");
        $("#js-txt_search").val("");

        $("#"+searchId).show();
        $("#"+hideContentId).hide();
        $("#js-txt_search").focus();
      })
   },
   cancelSearch:function(searchId,triggerBtn,hideContentId){
      $("#"+triggerBtn).click(function(){
              $("#"+searchId).hide();
              $("#"+hideContentId).show();
       })
   },
   initSearchList:function(resultData){
     $("#js-searchList").html("");
     var searchHtml="";
     var infoData=resultData.data;
     if(infoData.length<=0){
      $("#js-searchList").html("<p class='tc' style='margin-top:50px'>暂无此明星入驻</p>");
     }else{
       var uid=ceremonyMain.analyzUrl()["uid"];
       for (var i = 0; i < infoData.length; i++) {
        var likeNum=infoData[i].like_num>10000?infoData[i].like_num/10000+"万":infoData[i].like_num+"&nbsp";
        var uname="";
        if(infoData[i].uname!=null){
          uname=infoData[i].uname.length>5?infoData[i].uname.substr(0,5)+"...":infoData[i].uname;
        }
        var avatar=infoData[i].avatar==""?"assets/images/headPic-default.png":infoData[i].avatar;
        searchHtml+="<a><li class='curPersonInfo searchPersonInfo'>"
          +"<p class='head-pic'><img src='"+avatar+"'></p>"
          +"<div class='user-info'>"
          +"<div>"+uname+"</div>"
          +"<div class='col_grey f13'>"+(infoData[i].type==1?"演员榜":"歌手榜")+"排名：第"+infoData[i].grade+"</div>"
          +"</div>"
          +"<div class='follow-num'>"
          +" <span id='followNum'>"+likeNum+"</span>"
          +"<img src='assets/images/icon-heart.png'>"
          +"</div>"
          +"</li></a>";
         
       }
       $("#js-searchList").html(searchHtml);
     }
     
   },
   toSearch:function(){
    var keyword=$("#js-txt_search").val();
    if(keyword=="" || keyword==null){
      //alert("请输入搜索的内容");
      tcc.BOX_show("messdiv");
      $(".messdivCons").html("请输入搜索的内容")
      return false;
    }
    //添加缓冲
    ceremonyMain.addLoadding("js-searchList");
    //var url="http://star.xingxiu.tv/festival/search?keyword="+keyword+"&server="+server+"&callback=?"
	var url=host+"/festival/search?keyword="+keyword;
    ceremonyMain.ajaxCommonFun(url,"get",function(resultData){
        //移除缓冲
        ceremonyMain.removeLoadding("spinner");
        if(resultData!=null){
             ceremonyMain.initSearchList(resultData);
        }

      })

   },
   initCeremonyPage:function(){
    //初始化排行列表 type=0
    $("#js-rankContainer").html("");
   	ceremonyMain.navSwitch(0);
    //切换排行类型
    $("#js-switchTab li").click(function(){
        //init ranklist
        $("#js-rankContainer").html("");
        var typeNum=$(this).index();
        $("#js-switchTab li").removeClass("cur");
        $(this).addClass("cur");
        ceremonyMain.navSwitch(typeNum);
     })
    //更多数据加载
    $("#js-moreRank").click(function(){
       var typeNum=$("#js-switchTab li.cur").index();
       ceremonyMain.navSwitch(typeNum);
    })
    //搜索
    $(".searchForm").submit(function(e){
      ceremonyMain.toSearch();
    })
    //其他操作
    ceremonyMain.searchShow("js-searchMain","js-search","js-crecmonyMain");
    ceremonyMain.cancelSearch("js-searchMain","js-btn_cancel","js-crecmonyMain");
     //去下载
     //toMsgArea
     $("#js-rankContainer").on("click","a",function(){
       $(".messdivCons").css("padding-bottom","20px")
       $(".messdivCons").html("下载星秀APP查看明星详情"+"<div class='dialogFooter mt10'>"+
      "<div class='btn_dialog'><a href='http://t.cn/R7COgYb'>去下载</a></div>"+
      "<div class='btn_dialog' id='btn_cancel'>取消</div></div>");
      tcc.BOX_show("messdiv");
     })
     $("#js-searchMain").on("click","a",function(){
       $(".messdivCons").css("padding-bottom","20px")
       $(".messdivCons").html("确认下载星秀APP"+"<div class='dialogFooter mt10'>"+
      "<div class='btn_dialog'><a href='http://t.cn/R7COgYb'>去下载</a></div>"+
      "<div class='btn_dialog' id='btn_cancel'>取消</div></div>");
      tcc.BOX_show("messdiv");
     })
     $(".js-close").click(function(){
       tcc.BOX_remove("messdiv");
     })
     $("#messdiv").on("click","#btn_cancel",function(){
       tcc.BOX_remove("messdiv");
     })
   },
   //ceremonyDetail page
   initCereDetailHtml:function(resultData){
    var liHtml="";
    var hitlist=resultData.info.hit_list;
    var star=resultData.info.star;
    var user=resultData.info.user;
    var likeNum=star.like_num>10000?star.like_num/10000+"万":star.like_num+"&nbsp";
    var user_likeNum=user.like_num>10000?user.like_num/10000+"万":user.like_num+"&nbsp";
    //star
    var coverUrl=star.cover==""?"assets/images/bannerDefault.png":star.cover+"!750x563";
    var bgHtml="<a href='http://star.xingxiu.tv/share.html?action=jumpToPersonal&uid="+star.uid+"'><img src="+coverUrl+" /></a>";
    $(".cereDetailBanner .bg").html(bgHtml);

    $(".cereDetailBanner .typeTitle").html(star.uname);
    $(".heartNumber p").html(likeNum);
    $(".rankingNum").html(star.grade);
    //user
    $(".curPersonInfo .head-pic img").attr("src",user.avatar);
    $(".curPersonInfo #curUserName").html(user.uname.length>7?user.uname.substr(0,7)+"...":user.uname);
    if(user.grade==0){
      $(".gradeDesc").html("暂无排名");
    }else{
      $(".gradeDesc").html("排名第<span>"+user.grade+"</span>");
    }
    $(".curPersonInfo #followNum").html(user_likeNum);
    
    //btn operation
    if(user.is_like==0){
      $(".cereFooter").hide();
      $("#toHit").show();
    }else{
      $(".cereFooter").hide();
      var share_url="http://star.xingxiu.tv/festival?star_id="+star.uid+"&uid="+user.uid+"&server="+server;
      $("#letFriendHit a").attr("href","http://star.xingxiu.tv/share.html?action=doBang&shareLink="+encodeURIComponent(share_url));
      $("#letFriendHit").show();

    }
    //hitlist
    for(var i = 0; i < hitlist.length; i++) {
        var likeNum=hitlist[i].like_num>10000?hitlist[i].like_num/10000+"万":hitlist[i].like_num+"&nbsp";
        var uname=hitlist[i].uname.length>5?hitlist[i].uname.substr(0,5)+"...":hitlist[i].uname;
        var avatar=hitlist[i].avatar==""?"assets/images/headPic-default.png":hitlist[i].avatar;
       if(i<=2){
        liHtml+="<a><li class='tops'>"
          +"<p class='head-pic'><img src='"+avatar+"'></p><p class='user-name'>"+uname+"</p>"
          +"<p class='rank-topsNum'><img src='assets/images/n"+Number(i+1)+".png' /></p>"
          +"<div class='follow-num'>"
          +"<span id='followNum'>"+likeNum+"</span>"
          +"<img src='assets/images/icon-heart.png'/>"
          +"</div>"
          +"</li></a>"
       }else{
        liHtml+="<a><li>"
          +"<p class='rank-num'>"+Number(Number(i)+1)+"</p>"
          +"<p class='head-pic'><img src='"+avatar+"'></p><p class='user-name'>"+uname+"</p>"
          +"<div class='follow-num'>"
          +"<span id='followNum'>"+likeNum+"</span>"
          +"<img src='assets/images/icon-heart.png' />"
          +"</div>"
          +"</li></a>"
       }
       
      }
      $("#js-rankConDetail").html(liHtml);
   },
   getDetailData:function(){
      //添加缓冲114655
      ceremonyMain.addLoadding("js-rankConDetail");

      var star_id=ceremonyMain.analyzUrl()["star_id"];
      var uid=ceremonyMain.analyzUrl()["uid"];
      
      var url="http://star.xingxiu.tv/festival/hitList?star_id="+star_id+"&uid="+uid+"&server="+server+"&callback=?"
      ceremonyMain.ajaxCommonFun(url,"get",function(resultData){
          //移除缓冲
          ceremonyMain.removeLoadding("spinner");
          if(resultData!=null){
               ceremonyMain.initCereDetailHtml(resultData);
          }

        })
   },
   toHitRank:function(){
      var star_id=ceremonyMain.analyzUrl()["star_id"];
      var uid=ceremonyMain.analyzUrl()["uid"];

      var url=" http://star.xingxiu.tv/festival/hit?star_id="+star_id+"&uid="+uid+"&server="+server+"&callback=?"
      ceremonyMain.ajaxCommonFun(url,"get",function(resultData){
          if(resultData!=null && resultData.code=="200"){
               /*alert("打榜成功");*/
               tcc.BOX_show("messdiv");
               $(".messdivCons").html("打榜成功！")
                
               $(".cereFooter").hide();
               $("#letFriendHit").show();
               ceremonyMain.getDetailData();

          }

        })
   },
   initCereDetailPage:function(){
     ceremonyMain.getDetailData();
     /*$("#toHit").click(function(){
      ceremonyMain.toHitRank();
     })*/
     
   },
   
}
$(function(){
  if($(".js-close").html()!=undefined){
    $(".js-close").click(function(){
      tcc.BOX_remove("messdiv");
     })
  }
  if($("#js-crecmonyMain").html()!=undefined){
    ceremonyMain.initCeremonyPage();
  }
  if($(".cereDetailBanner").html()!=undefined){
    ceremonyMain.initCereDetailPage();
  }
  
	

})