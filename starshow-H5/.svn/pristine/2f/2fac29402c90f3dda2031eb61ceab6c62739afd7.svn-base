var host=commonCla.hostBase+"/";

//初始化
var token_login="";
var new_id=commonCla.analyzParams("id");
var user_id=commonCla.analyzParams("user_id");
var token=commonCla.analyzParams("token");
//设置WebViewJavascriptBridge通信回调方法
/*setupWebViewJavascriptBridge(function(bridge) {
  //注册js回调方法token
  bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
    if (isIphone()) {} else {
      var data = eval("(" + data + ")");
    }
    if (data.nextStep == '1') {
          //登录状态保存
        if (jwt_token == "" || token!=data.token) {
          token_login = data.token;
          token = data.token;
        }
        //初始化页面
        window.location.href="detail.html?id="+commonCla.analyzParams("id")+"&jwt_token="+data.token
    }
    if(data.nextStep=="7"){
        otherShare();
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

//其他分享
var otherShare=function(){
  var title=$("#share_info").attr("title");
  var cover=$("#share_info").attr("cover");
  var share_url=$("#share_info").attr("share_url");
  var content=$("#share_info").attr("content");
    
  setBridgeCallHandler(bridge, {
    'action': '4',
    'user_id': uid,
    'star_id': star_id,
    'share': {
      //'share_url':"http://star.xingxiu.tv/festival?star_id="+star_id+"&uid="+uid+"&server="+server,
      'share_url': share_url,
      'title': title,
      'content': content,
      'cover': cover
    }
  })
}


clientFun(bridge);
})*/

var nextStepFun=function(data,bridge){
 nextStepFun_reply(data);
  //活动分享
  var shareActivity=function(){
      var title=$("#share_info").attr("title");
      var cover=$("#share_info").attr("cover");
      var share_url=$("#share_info").attr("shareurl");
      var content=$("#share_info").attr("content");
        
    setBridgeCallHandler(bridge, {
      'action': '3',
      'share': {
        'share_url': share_url,
        'title': title,
        'content': content,
        'cover': cover
      }
    })
  }
 if (data.nextStep == '1') {
  //登录状态保存
  if (token == "" || token!=data.token) {
    token_login = data.token;
    token = data.token;
  }
  //初始化页面
  window.location.href="detail.html?id="+commonCla.analyzParams("id")+"&token="+data.token
}
  if(data.nextStep=="share"){
    shareActivity();
  }
}
var clientFun=function(bridge){
  clientFun_reply(bridge);
 
  //活动页面->个人中心
  $(document).on("click", ".user-area .user_head", function(e) {
      var uid = $(this).attr("uid");
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '2',
        'user_id': uid
      })
  })
  //点赞
  $("#zanArea").click(function(e){
    var token=commonCla.analyzParams("token");
    if (token == "" || token == undefined) {
         e.preventDefault()
         setBridgeCallHandler(bridge, {
          'action': '1',
          'nextStep': '1',
          'id':commonCla.analyzParams("id")
         })
      }else{
        tapLike(token);
      }
   })
  //关注
  $("#newsMain").on("click",".btn_concern",function(e){
    var token=commonCla.analyzParams("token");
    var userId=$(this).attr("userId");
    if (token == "" || token == undefined){
         e.preventDefault()
         setBridgeCallHandler(bridge, {
          'action': '1',
          'nextStep': '1',
          'user_id':commonCla.analyzParams("id")
         })
      }else{
        makeConcern(userId);
      }

  })
    //点赞
  $("#toHit").click(function(e) {
    if(jwt_token=="" || jwt_token==undefined){
      var uid=commonCla.analyzParams("id");
        e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '1',
        'nextStep': '1',
        'user_id':commonCla.analyzParams("id")
       })
    }else{
      toVote()
    }
    
  })
  //放大图片
  /*  action = 5
      position
      photos*/
        //放大图片
  $("body").on("click","#newContent img",function(e){
        var imgVal=$(this).attr("src");
        var thisNumber=initPhotoalbum().imgDataNumber[imgVal];
        //var resutlData=JSON.stringify({"photos":initPhotoalbum().imgListData,"position":thisNumber});
          e.preventDefault()
          setBridgeCallHandler(bridge, {
            'action': '5',
            'position': thisNumber,
            'photos':initPhotoalbum().imgListData
           })
  })

}
//转换为dom对象
var parseDom=function(arg) { 
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
}
//初始化数据
var getNewsData=function(){
	var url=host+"news/"+new_id+"?token="+token;
	commonCla.ajaxCommonFun(url,"get",function(ret,textStatus,request){

      $(".pageMain").show();
      $(".loadding").hide();
      $(".news_nav").show();
      if(textStatus=="success"){
        initNewsDom(ret,request);
        //二次分享
        if(isWeiXin()){
          wx_share( $("#share_info").attr("title"),
            $("#share_info").attr("content"),
            $("#share_info").attr("shareurl"),
            $("#share_info").attr("cover"));
        }
        
      }else{
        if(ret.status==404){
          $("body").html("<img src='../assets/images/404.png' width='100%' />")
        }else{
          $("body").html("<img src='../assets/images/404-2.png' width='100%' />")
        }
        
      }
	})
}
var initPhotoalbum=function(){
   var imgDataNumber;
   var imgListData;
    var imgList=$("#newContent img");
    imgDataNumber=new Map();
    imgListData=[];
    for (var i = 0; i < imgList.length; i++) {
      var img_src=$(imgList[i]).attr("_src");
      imgDataNumber[img_src]=i;
      imgListData[i]=img_src;
    };
    var imgObj={
      "imgDataNumber":imgDataNumber,
      "imgListData":imgListData,
    };
    return imgObj;
  }
var countHeight=function(obj){
    var img_width=$(obj).attr("data-w");
    var img_height=$(obj).attr("data-h");
    var auto_width=$(window).width()*0.9; 
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
      if(img_width>$(window).width()*0.9){
        if(auto_width>$(window).width()*0.9){
          auto_width=$(window).width()*0.9
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
    var content =parseDom(data.content);
    var share_con =""?data.title:$(content).find(".newContent").text().trim().substr(0,30);
    //$("#share_info").attr("content",share_con);
    $("#share_info").attr("content","⎾CANGPAI⏌A trading platform focused on collectibles！");
    //share info 
    $("#share_info").attr("new_id",data.id);
    $("#share_info").attr("user_id",data.user_id);
    $("#share_info").attr("is_like",data.is_like);
    $("#share_info").attr("title","[Information]"+data.title);
    $("#share_info").attr("cover",data.cover+"!250x250");
    $("#share_info").attr("shareUrl","http://s.cangpai.lookmetv.com/en/news/share.html?id="+new_id);
    // $("#share_info").attr("shareUrl","http://s.cangpai.lookmetv.com/news/share.html?id="+new_id);

  	//图片处理 占位
  	var imgList=$(content).find("img");
    for (var i = 0; i < imgList.length; i++) {
      var trueSrc=imgList[i].src;
      if($(imgList[i]).parents(".prodCon").html()==undefined){
        $(imgList[i]).attr("data-echo",trueSrc);
        $(imgList[i]).attr("src","images/defalut_cover.png");
        //计算宽高
        countHeight(imgList[i]);
        $(imgList[i]).css("display","block");
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
var initNewsDom=function(data,request){
    var data=data;
    var user=data.user;

    $("title").html(data.title+"&1&1"); 
    
    
    
    //时间
    var currentTime=timeFormat(new Date(request.getResponseHeader("Date")));
    //console.log(currentTime)
    var create_time=timesReview(data.created_at,currentTime);
    
   var rolesHtml="";
   if(user.is_vip==1){
     rolesHtml='<img src="../assets/images/roles/icon-roles1.png" height="12" width="12" class="icon_roles"  />';
   }else if(user.is_vip==2){
     rolesHtml='<img src="../assets/images/roles/icon-roles2.png" height="12" width="12" class="icon_roles"  />';
   }
   /*if(user.roles.length<=0){
       var experience=user.experience;
       var star=experience/100;
       var moon=star/100;
       var sun=moon/100;
       var crown=sun/100;
       if(star>=1 && moon<1 && sun<1){
        rolesHtml="../assets/images/roles/roles_normal_star.png";
       }else if(moon>=1 && sun<1){
         rolesHtml="../assets/images/roles/roles_normal_moon.png";
      }else if(sun>=1 && crown<1){
         rolesHtml="../assets/images/roles/roles_normal_sun.png";
      }else if(crown>=1){
         rolesHtml="../assets/images/roles/roles_normal_huangguan.png";
      }
    }else{
         rolesHtml="../assets/images/roles/roles_"+data.data.user.roles[0]+".png";
   }*/
   var labelsHtml="";var label_isBlock="none";
   //标签
   var labels=data.tags;
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
   /*if(data.third_party_id!=0){
    userName="本文著作权归：<span style='border-bottom:1px solid #ff1d3e'>"+data.user.name+"</span>所有";
   }*/
   //dom
   var user_head_pic=user.head_pic.indexOf("collection-auction")==-1?user.head_pic:user.head_pic+"!250x250"
   var newsHtml=
    '<section class="news_banner">'+
			'<img src="'+data.cover+'!750x563" width="100%"/>'+
		'</section>'+
    '<div class="mt10 n-title">'+
      '<!--<P id="content-title-en"></P>-->'+
      '<P id="content-title">'+data.title+'</P>'+
    '</div>'+
		'<div class="users-cons">'+
			'<div class="user-area">'+
				'<div class="user_head" uid="'+user.id+'">'+
        '<img src="'+user_head_pic+'" height="37" width="37" class="tip-pic"/>'+rolesHtml+
				'</div>'+
				'<div class="user_name"><span>'+user.name+'</span><br/>'+
        '<span class="n-times">'+create_time+'</span></div>'+
			'</div>'+
      '<div userId="'+user.id+'" class="btn_concern">follow</div>'+
		'</div>'+
    '<section id="newContent" class="newContent newContent2">'+content+'</section>'+
    '<div class="f14r tl w90_persent col_grey mt20">'+userName+'</div>'+
    '<!--标签-->'+
    '<h3 class="labelTit '+label_isBlock+'">Related tags：</h3>'+
		'<ul class="labelsCon">'+labelsHtml+'</ul>'+
		'<!--<div class="tl w90_persent col_grey">Browse <span class="watch_num" >'+commonCla.cWan(data.watch_num)+
    '</span><span class="ml10 watch_num" >like '+commonCla.cWan(data.like_num)+'</span></div>-->'

    //赋值
    $(".newCons").html(newsHtml);

    if(data.is_like!=0){
      $(".zan").attr("src","../assets/images/icon/icon-zan-red.png");
    }
    //角色
    if(user.follow_status!=0){
      $(".btn_concern").html("followed");

    }
    Echo.init({target:"newsMain"});
    $("#watch_num").html(commonCla.cWan(data.watch_num));

    $("#like_num").attr("like_num",data.like_num);
    $("#like_num").html(commonCla.cWan(data.like_num));
    $(".msg_num").html(commonCla.cWan(data.comment_num));
    

}
var isWeiXin=function() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

/* to like */
var tapLike=function(token){
      var storage = window.localStorage;
      var id=commonCla.analyzParams("id");
      /*var url=host+"share/like/";*/
      var url=host+"news/"+id+"/like?token="+token;
      //var unlike=storage.getItem("unlike"+id);
      var unlike=$("#share_info").attr("is_like");
      //无限点赞的参数，share/like/ 类型为post
      var params={
       /* "id":id,
        "type":"News",
        "unlike":unlike*/
      }
      var base_src=$("#like_num").prev("img").attr("src");
        $("#like_num").prev("img").attr("src","../assets/images/loadding.gif");
        //var url="json/like.json";
        commonCla.ajaxCommonFun(url, "post", function(resultData,textStatus,request){
           if(textStatus=="success"){
            var num=Number($("#like_num").attr("like_num"));
            if(unlike==0){
              $("#like_num").prev("img").attr("src","../assets/images/icon/icon-zan-red.png");
              $("#like_num").html(commonCla.cWan(Number(num)+1));
              $("#like_num").attr("like_num",Number(num)+1);
              $("#share_info").attr("is_like","1");

            }else{
              $("#like_num").prev("img").attr("src","../assets/images/icon/btn_zan_dis_cross.png");
              $("#like_num").html(commonCla.cWan(Number(num)-1));
              $("#like_num").attr("like_num",Number(num)-1);
              $("#share_info").attr("is_like","0");

            }
            
           }else{
            $("#like_num").prev("img").attr("src",base_src);
            swal({
              "title":JSON.parse(resultData.responseText).error,
              "animation":"slide-from-top",
              "confirmButtonText":"OK",
              "confirmButtonColor": "#ff1d3e",

            });
           }
        },params)
      
      
      
}
/**/
var makeConcern=function(userId){

  var url=host+"user/"+userId+"/follow?token="+token;
  commonCla.ajaxCommonFun(url,"post",function(ret,textStatus,request){
    if(textStatus=="success"){
     if(ret.follow_status==0){
      $(".btn_concern").html("follow");
     }else{
      $(".btn_concern").html("followed");
     }
      
    }else{
      if(ret.status=="422"){
        swal({
              "title":"Can not follow on myself",
              "animation":"slide-from-top",
              "confirmButtonText":"OK",
              "confirmButtonColor": "#ff1d3e",

            });
      }else{
        swal({
              "title":JSON.parse(ret.responseText).error,
              "animation":"slide-from-top",
              "confirmButtonText":"OK",
              "confirmButtonColor": "#ff1d3e",

            });
      }
    }

  })

}
var initNewsPage=function(){
 //初始化数据
  getNewsData();
  
  //评论
  $(".cmt_list").html("");
  getCommentData();
  //加载更多评论
  $("#btn_more_comment").click(function(){
      getCommentData();
    })
  //点击评论跳转
  $(".cmt_short").on("click", "li .reply", function() {
      var cid = $(this).parents("li").attr("cid");
      var uid = $(this).parents("li").attr("uid");
      var iShare=$("#hide_source").attr("ishare")!=undefined?"&ishare="+$("#hide_source").attr("ishare"):"";
      window.location.href="../comments/commentList.html?uid="+uid+"&source=news&cid="+cid+"&token="+token+iShare;
      return;
    })
  

  
}
var shareFun=function(){
  //点赞
  $("#zanArea").click(function(){
    var token=commonCla.analyzParams("token");
    if (token == "" || token == undefined) {
         var id=commonCla.analyzParams("id");
          var params={
            "id":id,
          }
          wx_authorize(params,"news");
      }else{
        tapLike(token);
      }
      
      
    })
  //关注
  $("#newsMain").on("click",".btn_concern",function(){
    var token=commonCla.analyzParams("token");
    var userId=$(this).attr("userId");
    if (token == "" || token == undefined) {
         var id=commonCla.analyzParams("id");
          var params={
            "id":id,
          }
          wx_authorize(params,"news");
      }else{
        makeConcern(userId);
      }

  })
}
$(function(){
  var sourceType=$("#hide_source").attr("stype");
  var sourceShare=$("#hide_source").attr("ishare");
  if(sourceShare=="true"){
    shareFun();
  }
  if(sourceType=="reply"){
    /*$(".cmt_list").html("");
     getReplayData();
     //加载更多
     $("#btn_more").click(function(){
       getReplayData();
     })*/
   }else{
    initNewsPage();
   }
   
   /*$(".txtMsg").click(function() {
      var $element=$(".sendMsg");
      setTimeout(function(){
       var viewTop = $(window).scrollTop();
      $(window).scrollTop(viewTop+"74"); // 调整value
      $(".txtMsg").focus();
      },500)
    });*/
	
})