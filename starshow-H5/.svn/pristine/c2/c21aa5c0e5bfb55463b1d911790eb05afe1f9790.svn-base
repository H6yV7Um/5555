var host=commonCla.hostBase+"/v12/";

//初始化
var jwt_token_login="";
var new_id=commonCla.analyzParams("new_id");
var user_id=commonCla.analyzParams("user_id");
var jwt_token=commonCla.analyzParams("jwt_token");

//转换为dom对象
var parseDom=function(arg) { 
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
}
//初始化数据
var getNewsData=function(){
	var url=host+"news/"+new_id+"?jwt_token="+jwt_token;
	commonCla.ajaxCommonFun(url,"get",function(ret){
      $(".pageMain").show();
      $(".loadding").hide();
      $(".news_nav").show();
      if(ret.code=="200"){
        initNewsDom(ret);
        //二次分享
        wx_share(ret.data.title,ret.data.description,ret.data.short_url,ret.data.cover);
        
      }else{
        $("body").html("<img src='assets/images/404.png' width='100%' />")
      }
	})
}
var countHeight=function(obj){
    var img_width=$(obj).attr("data-w");
    var img_height=$(obj).attr("data-h");
    var auto_width=$(window).width(); 
    var tag=$(obj).attr("present");
    if(tag==undefined || tag=="" || tag==null){
      var parentEls = $(obj).parents()
        .map(function () { 
         	var p_width=this.style.width.split("%")[0];
	        var width=auto_width*p_width/100;
		if(width>0){
		return width; 
		}
              
      });
      auto_width=Math.min.apply(null,parentEls);
      if(img_width>$(window).width()){
        if(auto_width>$(window).width()){
          auto_width=$(window).width()
        }
         var auto_height=img_height/img_width*auto_width;
         $(obj).attr("width",auto_width+"px");
         if(auto_height!=0){
          $(obj).attr("height",auto_height+"px");
         }
         
      }else{
        if(img_width!=0 || img_width!=0){
          $(obj).attr("width",img_width+"px");
          $(obj).attr("height",img_height+"px");
        }
        
      }
    }else{
      var auto_height=auto_width*tag;
      $(obj).attr("height",auto_height+"px");
    }
}
var changeLink=function(obj){
  var html=$(obj).find("urltitle").html();
  $(obj).css("background-size","20px");
  $(obj).css("display","block");
  if(html.length>15){ 
    $(obj).html(html.substr(0,6)+"..."+html.substr(6,6)+"-网页链接");
  }
}
var reviewContent=function(data){
	var content =parseDom(data.data.content);
	//图片处理 占位
	var imgList=$(content).find("img");
    for (var i = 0; i < imgList.length; i++) {
      var trueSrc=imgList[i].src;
      if($(imgList[i]).parents(".prodCon").html()==undefined){
        $(imgList[i]).attr("data-echo",trueSrc);
        $(imgList[i]).attr("src","assets/images/defalut_cover.png");
        //计算宽高
        countHeight(imgList[i]);
        $(imgList[i]).css("display","inline-block");
        $(imgList[i]).css("margin","0 auto");
      }
    }
 //处理链接
 var linkList=$(content).find(".urlstyle");
 for (var i = 0; i < linkList.length; i++) {
   changeLink(linkList[i])
 };
	return $(content).html();
}
//no useful
var iframe_fun=function(content){
      //iframe 处理
    var srcList=[];
    for (var i = 0; i < $(content).find("iframe").length; i++) {
      var src=$(content).find("iframe").eq(i).attr("src");
      srcList.push(src);
      $(content).find("iframe").eq(i).removeAttr("src");    

    };
    $(content).find("iframe").hide();
    var num=0;
    function run(){
        $(content).find("iframe").eq(num).attr("src", srcList[num])
    }
    var timer=setInterval(function(){
       run();
       num++;
       if(num>=$(content).find("iframe").length){
         clearInterval(timer);
        $(content).find("iframe").show();
       }
    },10)
}
var initNewsDom=function(data){
   $("title").html(data.data.title); 
   if(data.data.comment_num=="0"){
      $("#comment_num").hide();
    }else{
      $("#comment_num").show();
      $("#comment_num").html(data.data.comment_num);
    }
    if(data.data.is_like!=0){
      $(".zan").attr("src","assets/images/btn-zan.png")
    }
    /*if(data.data.like_num==0){
      $("#like_num").hide();
    }else{
      $("#like_num").show();
      $("#like_num").html(data.data.like_num);
    }*/
   var rolesHtml="";
   //角色
   if(data.data.user.roles.length<=0){
       var experience=data.data.user.experience;
       var star=experience/100;
       var moon=star/100;
       var sun=moon/100;
       var crown=sun/100;
       if(star>=1 && moon<1 && sun<1){
        rolesHtml="assets/images/roles_normal_star.png";
       }else if(moon>=1 && sun<1){
         rolesHtml="assets/images/roles_normal_moon.png";
      }else if(sun>=1 && crown<1){
         rolesHtml="assets/images/roles_normal_sun.png";
      }else if(crown>=1){
         rolesHtml="assets/images/roles_normal_huangguan.png";
      }
    }else{
         rolesHtml="assets/images/roles_"+data.data.user.roles[0]+".png";
   }
   var labelsHtml="";var label_isBlock="none";
   //标签
   var labels=data.data.labels;
   if(labels!=null && labels.length>0){
        $(".labelTit").show();
        var labelsHtml="";
        for (var i = 0; i < labels.length; i++) {
        labelsHtml+="<li labelId='"+labels[i].id+"'>"+labels[i].name+"</li>"
        };
    }
   if(labelsHtml!=""){label_isBlock=""};
   //计算banner高度
   var bannerHeight=$(window).width()/750*563;
   //对内容进行处理
   var content=reviewContent(data);
   var userName="";
   if(data.data.third_party_id!=0){
    userName="本文著作权归：<span style='border-bottom:1px solid #ff1d3e'>"+data.data.user.name+"</span>所有";
   }
   //dom
   var newsHtml='<section class="news_title">'+
			'<img src="'+data.data.cover+'!750x563" width="100%" height="'+bannerHeight+'"/>'+
		'</section>'+
		'<div class="div-title">'+
			'<div class="tip-area">'+
				'<img src="'+data.data.user.head_pic+'" height="37" width="37" class="tip-pic"/>'+
				'<img src="'+rolesHtml+'" height="12" width="12" class="icon_roles"  />'+
				'<span>'+data.data.user.name+'</span>'+
			'</div>'+
			'<img src="assets/images/btn_bot.png" width="6%" />'+
		'</div>'+
		'<div class="mt10 channel_info">'+
			'<!--<P id="content-title-en"></P>-->'+
			'<P id="content-title">'+data.data.title+'</P>'+
			'<div><span id="curTime">'+data.data.created_at+'</span></div>'+
		'</div>'+
		'<!--内容-->'+
        '<section id="newContent" class="newContent">'+content+'</section>'+
        '<div class="f14r tl w90_persent col_grey mt20">'+userName+'</div>'+
        '<!--标签-->'+
        '<h3 class="labelTit '+label_isBlock+'">相关标签：</h3>'+
		'<ul class="labelsCon">'+labelsHtml+'</ul>'+
		'<div class="tl w90_persent col_grey">浏览 <span id="watch_num" >'+commonCla.cWan(data.data.watch_num)+
    '</span><span class="ml10" id="watch_num" >喜欢 '+commonCla.cWan(data.data.like_num)+'</span></div>'

    //赋值
    $(".newCons").html(newsHtml);

    //推荐列表
    if(data.data.recommend.length<=0 || data.data.recommend==null){
      $(".rcmdList").hide();
    }else{
      $(".rcmdList").html("");
      var recommend=data.data.recommend;
      var liHtml="";
	  if(jwt_token==""){
	      jwt_token=jwt_token_login;
	  }
      for (var i = 0; i < recommend.length; i++) {
          liHtml+="<li><a href='"+commonCla.shareUrlBase+"/starshow5.0/news2.0/share.html?new_id="+recommend[i].id+"&jwt_token="+jwt_token+"'><div class='imgArea'><img src='assets/images/defalut_cover.png' data-echo='"+recommend[i].cover+"!300x225' style='max-width: 100%;min-height:100px;'  /></a></div>"
                +" <div class='descArea'>"
                +"<h1><a href='"+commonCla.shareUrlBase+"/starshow5.0/news2.0/share.html?new_id="+recommend[i].id+"&jwt_token="+jwt_token+"'>"+recommend[i].title+"</a></h1>"
                +"<!--<article class='activityList'>"
                +"<section>"
                +"<img src='assets/images/icon-eye.jpg' /> "
                +"<span>"+commonCla.cWan(recommend[i].watch_num)+"</span>"
                +"</section>"
                +"<section>"
                +"<img src='assets/images/icon-heart.jpg'  /> "
                +"<span>"+commonCla.cWan(recommend[i].like_num)+"</span>"
                +"</section>"
                +"<section>"
                +"<img src='assets/images/icon-msg.jpg' /> "
                +"<span>"+(commonCla.cWan(recommend[i].comment_num)==undefined?"0":commonCla.cWan(recommend[i].comment_num))+"</span>"
                +"</section>"
                +"</article>-->"
                +"</div></li>"
        }
      $(".rcmdList").html(liHtml);
    }
    //广告
    if(data.data.advertisements.length<=0){
       $(".prod_rcmdCons").hide();
    }else{
      $(".prod_rcmdCons").show();
      var html="";
      for (var i = 0; i < data.data.advertisements.length; i++) {
        html+="<li><a href='"+data.data.advertisements[i].url+"'>"+
              "<img src='"+data.data.advertisements[i].cover+"'/></a></li>"
      };
      $(".prod_rcmdCons ul").append(html);
    }
    Echo.init({target:"newsMain"});
    //share info 
    $("#share_info").attr("new_id",data.data.id);
    $("#share_info").attr("content",data.data.description);//data.data.content)
    $("#share_info").attr("cover",data.data.cover);
    $("#share_info").attr("shareUrl",data.data.share_url);
    $("#share_info").attr("title",data.data.title);
    $("#share_info").attr("user_id",data.data.user_id);
    $("#share_info").attr("is_like",data.data.is_like);
    $("#share_info").attr("short_url",data.data.short_url);


}
var isWeiXin=function() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
//授权方法
var wx_authorize=function(params,type){
   var paramStr="";
   for(var key in params){
     paramStr+=key+"="+params[key]+"&";
   }
   /*paramStr=paramStr.substring(0,str.length-1);*/
  //正式
  var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?"+paramStr+"type="+type+"&env=production");
  //测试
  //var redirect = encodeURIComponent("http://wx.lookmetv.com/oauth2?"+paramStr+"type="+type+"&env=development");
  window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5c31a99aca28c5f&redirect_uri="+redirect
  +"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
}
var commentFun=function(){
  //点击评论跳转
  $(".cmt_short").on("click", "li .reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      window.location.href="commentList.html?uid="+uid+"&cid="+cid+"&jwt_token="+jwt_token;
      return;
    })
  //点击评论回复
  $(".cmt_list").on("click", ".cmt_reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      var currentId = commonCla.analyzParams("user_id");
      if (uid == currentId) {
        return;
      }
      var cname = $(this).parents("li").attr("uname");
      $(".txtMsg").attr("placeHolder","回复 " + cname + "：");
      $(".btn_msgSend").attr("cid", cid);
      $(".btn_msgSend").attr("uid", uid);
      $(".txtMsg").focus();

      $("#msg_overlay").show();


    })
   //点击遮罩层删除回复
    $("#msg_overlay").click(function() {
        if ($(this).css("display") != "none") {
          $(this).css("display", "none");
          $(".btn_msgSend").attr("cid", "");
          $(".btn_msgSend").attr("uid", "");
          $(".txtMsg").attr("placeHolder","快来评论");
        }
      })
    
    //授权跳转
     $(".txtMsg").click(function(){
      var jwt_token=commonCla.analyzParams("jwt_token");
      var id=commonCla.analyzParams("new_id");
      
        if(isWeiXin()){
          if(jwt_token=="" || jwt_token==undefined){
            var sourceType=$("#hide_source").attr("stype");
            if(sourceType=="reply"){
              var msgId=commonCla.analyzParams("cid");
              var userId=$(this).next(".btn_msgSend").attr("uid");
              var params={
                "cid":msgId,
                "uid":userId
              }
              wx_authorize(params,"newsComment");
            }else{
              var params={
                "id":id,
              }
              wx_authorize(params,"newShare");
            }
         
          }
         
        }
      })
    //发表评论
    $(".btn_msgSend").click(function(){
      var msgId=$(this).attr("cid");
      var userId=$(this).attr("uid");
      var id=commonCla.analyzParams("new_id");
      jwt_token=commonCla.analyzParams("jwt_token");

      if (jwt_token == "" || jwt_token == undefined) {
        if (isWeiXin()){
          var sourceType=$("#hide_source").attr("stype");
          if(sourceType=="reply"){
                var params={
                  "cid":commonCla.analyzParams("cid"),
                  "uid":userId
                }
                wx_authorize(params,"newsComment");
              }else{
                var params={
                  "id":id,
                }
                wx_authorize(params,"newShare");
              }
         
        }else{
          //注册页面
              window.location.href =commonCla.shareUrlBase+"/starshow5.0/news/v5/reg.html?id=" + id+"&source=news"
        }
      }else{
        $("#msg_overlay").css("display", "none");
        jwt_token_login = jwt_token;
        var content = $(".txtMsg").val();
        if (content.trim() == "") {
          swal({
              "title":"请输入评论内容",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            });
          return;
        }
        if (content.trim().length>100) {
          swal({
              "title":"评论内容不能超过100个字",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            });
          return;
        }
        //执行
        if(msgId=="" || userId=="" || userId==undefined || msgId==undefined){
           if($("#hide_source").attr("stype")=="reply"){
            $(".btn_msgSend").attr("cid", $(".cmt_list li").eq(0).attr("cid"));
            $(".btn_msgSend").attr("uid", $(".cmt_list li").eq(0).attr("uid"));   
            toReply(content);
           }else{
            toComment(content);
           }
          
          }else{ 
           toReply(content);
          }
    } 
    //定位到评论
    location.href = "#comment";  
  })
}
var toComment = function(content) {
  var id=commonCla.analyzParams("id");

  $(".btn_msgSend").addClass("btn_loadding");
  $(".btn_msgSend").val("");
  $(".btn_msgSend").attr("disabled",true);


  var params = {
    "content": content,
    "jwt_token": jwt_token,
  }
  var url = host + "news/" + id + "/comment";
  commonCla.ajaxCommonFun(url, "post", function(resultData) {
    $(".btn_msgSend").removeClass("btn_loadding");
    $(".btn_msgSend").val("发表");
    $(".btn_msgSend").removeAttr("disabled");
    if (resultData != null && resultData.code == "200") {
      swal({
        "title":"评论成功",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      afterComment(resultData);

     

    }else if(resultData.code == "422"){
      swal({
        "title":"评论失败",
        "text":"不能回复自己的评论~",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
    } else {
      swal({
        "title":"评论失败",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
    }
    paramsClear();
  }, params)
}
var paramsClear=function(){
   $(".btn_msgSend").attr("cid", "");
   $(".btn_msgSend").attr("uid", "");
   $(".txtMsg").attr("placeHolder","快来评论");
}
var afterComment=function(ret){
      if($(".cmt_short").css("display")=="none"){
        $(".cmt_short").show();
      }
      if($(".btn_more").css("display")=="none"){
        $(".btn_more").show();
        $(".cmt_list").html("");
      }
      var chtml="<li uid='" + ret.data.user.id + "'uname='" + ret.data.user.name + "' cid='" + ret.data.id + "'>" +
          "<div class='cmt_head fl'><img src='" + ret.data.user.head_pic + "'></div>" +
          "<div class='cmt_content fr'>" +
          "<p class='cmt_name'>" + ret.data.user.name + "</p>" +
          "<p class='cmt_data'>" + ret.data.created_at + "</p>" +
          "<p class='cmt_comment'>" + ret.data.content+
          "<p class='cmt_reply'>回复</p>"+
          " </p>"
          "</div>" +
          "</li>"
       $(".cmt_list").prepend(chtml);
       $("#comment_num").html(Number($("#comment_num").html())+1);
       $(".btn_msgSend").attr("cid", "");
       $(".btn_msgSend").attr("uid", "");
       $(".txtMsg").attr("placeHolder","快来评论");

       

}
var toReply=function(content){
  var id=commonCla.analyzParams("id");
  var cid="";
  if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
    cid=$(".btn_msgSend").attr("cid");
  }else{
     cid=commonCla.analyzParams("cid");
  }
   $(".btn_msgSend").addClass("btn_loadding");
   $(".btn_msgSend").val("");
   $(".btn_msgSend").attr("disabled",true);

  var replyId=$(".btn_msgSend").attr("cid");
  var uid=$(".btn_msgSend").attr("uid");
  var params = {
    "content": content,
    "jwt_token": jwt_token,
    "replyId": replyId,
    "answerId": uid
  }
  var url = host + "comment/" + cid + "/newsReply";
  commonCla.ajaxCommonFun(url, "post", function(resultData) {
      $(".btn_msgSend").removeClass("btn_loadding");
    $(".btn_msgSend").val("发表");
    $(".btn_msgSend").removeAttr("disabled");
    if (resultData != null && resultData.code == "200") {
      swal({
        "title":"回复成功",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
      $(".txtMsg").val("");
      //$(".cmt_list").html("");
      //afterComment(resultData);
      if(commonCla.analyzParams("cid")==undefined || commonCla.analyzParams("cid")==""){
        getCommentData();
      }else{
        $(".cmt_list").html("");
        getReplayData();
      }
    //comment +1
    $("#comment_num").html(Number($("#comment_num").html())+1)
    $(".btn_msgSend").attr("cid", "");
    $(".btn_msgSend").attr("uid", "");
    $(".txtMsg").attr("placeHolder","快来评论");

     

    }else if(resultData.code == "422"){
      swal({
        "title":"评论失败",
        "text":"不能回复自己的评论~",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
    }  else {
      swal({
        "title":"回复失败",
        "animation":"slide-from-top",
        "confirmButtonText":"确定",
        "confirmButtonColor": "#ff1d3e",

      });
    }
  }, params)
}
//头条内初始化评论数据
var getCommentData=function(){
  var news_id=commonCla.analyzParams("new_id");
  var url=host+"news/"+news_id+"/comment";
  var params={
    "count":5
  }
  commonCla.ajaxCommonFun(url,"get",function(data){
    if(data.code=="200"){
      var pageData=data.data.page_data;var liHtml="";
      if (pageData.length > 0) {
       for (var i = 0; i < pageData.length; i++) {
        var repliesHtml="";
        
        if (pageData[i].replies != null) {
            var reply_num=pageData[i].reply_num;
            var reply_num_html="";
            if(reply_num>=2){
              reply_num_html="<p class='reply_num'>查看全部"+reply_num+"条回复</p>"
            }
            repliesHtml+="<div class='reply'>"+
                         " <span class='reply_name'>"+pageData[i].replies.user.name+"回复：</span>"+
                         " <span>"+pageData[i].replies.content+"</span>"+reply_num_html
                         "</div>"
            //var name = pageData[i].user.name + " <span class='col_grey2'>回复</span> " +pageData[i].replies.answer.name
        }
        var name = pageData[i].user.name;
        liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
          "<div class='cmt_head fl'><img src='" + pageData[i].user.head_pic + "'></div>" +
          "<div class='cmt_content fr'>" +
          "<p class='cmt_name'>" + name + "</p>" +
          "<p class='cmt_data'>" + pageData[i].created_at + "</p>" +
          "<p class='cmt_comment'>" + pageData[i].content +
          "<p class='cmt_reply'>回复</p>"+
          " </p>" + repliesHtml +
          "</div>" +
          "</li>"
      }
      $(".cmt_list").html(liHtml)
    }else{
      //$(".cmt_short").hide();
      $(".cmt_list").html('<div class="tc mt30 pb30"><h1 style="font-size: 1.5rem;">暂无评论</h1><p class="mt20">快来发表第一条评论吧~</p></div>')
      $(".btn_more").hide();
    }
   }
  },params)
}
var tapLike=function(jwt_token){
      var storage = window.localStorage;
      var id=commonCla.analyzParams("new_id");
      /*var url=host+"share/like/";*/
      var url=host+"news/"+id+"/like?jwt_token="+jwt_token;
      //var unlike=storage.getItem("unlike"+id);
      var unlike=$("#share_info").attr("is_like");
      //无限点赞的参数，share/like/ 类型为post
      var params={
       /* "id":id,
        "type":"News",
        "unlike":unlike*/
      }
      if(unlike==0){
        var base_src=$("#like_num").prev("img").attr("src");
        $("#like_num").prev("img").attr("src","assets/images/loadding2.gif");
        //var url="json/like.json";
        commonCla.ajaxCommonFun(url, "get", function(resultData){
           if(resultData.data!=null){
             $("#like_num").prev("img").attr("src","assets/images/btn-zan.png");
             $("#like_num").html(Number(Number($("#like_num").html())+1));
               /*if(unlike==0){
                  storage.setItem("unlike"+id,1);
                }else{
                  storage.setItem("unlike"+id,0);
                }*/
               //var timeout=setTimeout(function(){$("#like_num").prev("img").attr("src","assets/images/icon-nav-zan.png")},1000);
               //调用anroid
               /*window.starResult.addLikeSuccess(id);
               return false;*/

           }else{
            $("#like_num").prev("img").attr("src",base_src);
            swal({
              "title":resultData.error,
              "animation":"slide-from-top",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",

            });
           }
        },params)
      }else{
        $("#like_num").prev("img").attr("src",base_src);
        swal({
          "title":"您已经点过赞了",
          /*"text":"不能回复自己的评论~",*/
          "animation":"slide-from-top",
          "confirmButtonText":"确定",
          "confirmButtonColor": "#ff1d3e",

        });
      }
      
      
}
var initNewsPage=function(){
 //初始化数据
  getNewsData();
  getCommentData();
  //点赞
  $("#zanArea").click(function(){
    var jwt_token=commonCla.analyzParams("jwt_token");
    if (jwt_token == "" || jwt_token == undefined) {
        if (isWeiXin()){
          var id=commonCla.analyzParams("id");
          var params={
            "id":id,
          }
          wx_authorize(params,"newShare");
        }
      }else{
        tapLike(jwt_token);
      }
      
      
    })

  // 全部评论--打开app相应头条
  /*$("#newContent").on("click", ".btn_more", function() {
    var paramsArr = new Array();
      paramsArr['id'] = new_id;
      paramsArr['url'] = "http://testshare.xingxiu.tv/starshow5.0/news2.0/detail.html?new_id=" + paramsArr['id'];
      openApp('news', paramsArr);
  });*/
}
//初始化回复列表
var initReplyDom=function(data){
  var pageData=data.data.page_data;var liHtml="";
  if (pageData.length > 0) {
    liHtml="<li class='bg_white' uid='" + data.data.user.id + "'uname='" + data.data.user.name + "' cid='" + data.data.id + "'>" +
      "<div class='cmt_head fl'><img src='" + data.data.user.head_pic + "'></div>" +
      "<div class='cmt_content fr'>" +
      "<p class='cmt_name'>" + data.data.user.name  + "</p>" +
      "<p class='cmt_data'>" + data.data.created_at + "</p>" +
      "<p class='cmt_comment'>" + data.data.content +
      "<!--<p class='cmt_reply'>回复</p>-->"+
      " </p>"
      "</div>" +
      "</li>"
   for (var i = 0; i < pageData.length; i++) {
    var name = pageData[i].user.name;
    liHtml += "<li uid='" + pageData[i].user.id + "'uname='" + pageData[i].user.name + "' cid='" + pageData[i].id + "'>" +
      "<div class='cmt_head fl'><img src='" + pageData[i].user.head_pic + "'></div>" +
      "<div class='cmt_content fr'>" +
      "<p class='cmt_name'>" + name + "</p>" +
      "<p class='cmt_data'>" + pageData[i].created_at + "</p>" +
      "<p class='cmt_comment'><span class='col_grey'>回复"+pageData[i].answer.name+"：</span>" + pageData[i].content +
      "<p class='cmt_reply'>回复</p>"+
      " </p>"
      "</div>" +
      "</li>"
  }
     $(".cmt_list").append(liHtml);
     //默认回复第一条
      $(".btn_msgSend").attr("uid", data.data.user.id);
      $(".btn_msgSend").attr("cid", data.data.id);
  }
  //判断是否显示查看更多按钮
  var current_count=$(".cmt_list li").length-1;
  if(current_count<15){
     $("#btn_more").hide();
  }else{
    if(current_count<=data.data.total){
      $("#btn_more").show();
      $("#btn_more").find("p").html("点击加载更多");
    }else{
      $("#btn_more").hide();
    }
   
  }
  

}
var getReplayData=function(){
    var current_count=$(".cmt_list li").length-1<=0?0:$(".cmt_list li").length;
  var cid=commonCla.analyzParams("cid");
  var uid=commonCla.analyzParams("uid");
  var url=host+"comment/"+cid+"/newsReply?current_count="+current_count;
  commonCla.ajaxCommonFun(url,"get",function(ret){
    $(".postMain").show();
    $(".loadding").hide();
    $(".news_nav").show();
    if(ret.code=="200"){
      initReplyDom(ret);
    }
    
  })

 
}
$(function(){
  var sourceType=$("#hide_source").attr("stype")
  if(sourceType=="reply"){
    $(".cmt_list").html("");
     getReplayData();
     //加载更多
     $("#btn_more").click(function(){
       getReplayData();
     })
   }else{
    initNewsPage();
   }
   commentFun();
   
   $(".txtMsg").click(function() {
      var $element=$(".sendMsg");
      setTimeout(function(){
       var viewTop = $(window).scrollTop();
      $(window).scrollTop(viewTop+"74"); // 调整value
      $(".txtMsg").focus();
      },500)
    });
	
})