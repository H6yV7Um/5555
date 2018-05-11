var jwt_token_login="";
var user_id_login="";

var host="http://api.startvshow.com/v11/"
/*var host="http://test.startvshow.com/v11/"*/

var changeCommentNumber=function(number){
   $("#comment_num").html(number);
   $("#comment_num").show();
}
var stopDefault=function(e) { 
     if ( e && e.preventDefault ) 
        e.preventDefault(); 
    else 
        window.event.returnValue = false; 
        
    return false; 
} 
//init photoalbum
var imgDataNumber;
var imgListData;
var initPhotoalbum=function(){
  var imgList=$("#newContent img");
  imgDataNumber=new Map();
  imgListData=[];
  for (var i = 0; i < imgList.length; i++) {
    var img_src=$(imgList[i]).attr("src");
    var img_src_fake=$(imgList[i]).attr("data-echo");
    if(img_src_fake==undefined || img_src_fake==null){
      imgDataNumber[img_src]=i;
      imgListData[i]=img_src;
    }else{
      imgDataNumber[img_src_fake]=i;
      imgListData[i]=img_src_fake;
    }

  };
}

var getImgNumber=function(val){
  return imgDataNumber[val];
}
var countHeight=function(obj){
    var img_width=$(obj).attr("data-w");
    var img_height=$(obj).attr("data-h");
    var auto_width=$(window).width(); 
    var tag=$(obj).attr("present");
    if(tag==undefined || tag=="" || tag==null){
      if(img_width>auto_width){
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
       /* $(imgList[i]).attr("data-echo",trueSrc);
        $(imgList[i]).attr("src","assets/images/defalut_cover.png");*/
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

var initDetailCons=function(data){
    var content=data.data.content;
    content=reviewContent(data);
    //解析content
    content=parseDom(content);
    
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

    $("#newContent").html(content);
    //加载到展示图片
   // echo.init();

    initPage();
}
 var parseDom=function(arg) { 
　　 var objE = document.createElement("div"); 
　　 objE.innerHTML = arg; 
　　 return objE; 
  }
var analyzParams=function(param_name) {
      var url = window.location.search.split("?")[1];
      if (url == "" || url == undefined) return url;
      url = url.split(param_name + "=")[1];
      if (url == "" || url == undefined) {
        url = "";
        return url;
      }
      if (url.indexOf("&") >= 0) {
        url = url.split("&")[0];
      }
      return url;
    }
function delHtmlTag(str){
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
 }
function jumpUrl(id,user_id,title,cover,share_url,url){
	//alert(id);
  var content=$("#hide_newInfo").attr("content");
	window.location.href = url;
	window.starResult.chooseOtherNewsUserIdTitleContentCoverShareUrl(id,user_id,title,content,cover,share_url);
}

function changePlayer(){
  var link=$("iframe").attr("src");
  if(link!=undefined){
    if(link.indexOf("preview.html")>=0){
    link=link.replace("preview.html","player.html").split("&height=")[0];
    }
    $("iframe").attr("src",link)
  }
  
}
var initPage=function(){
  initPhotoalbum();
  //点击放大
  $("body").on("click","#newContent img",function(){
       var imgVal=$(this).attr("src");
       var thisNumber=getImgNumber(imgVal);//从0开始
      // alert(thisNumber+1+":"+imgListData.length+":"+imgListData[thisNumber])
      var resutlData=JSON.stringify({"photos":imgListData,"position":thisNumber})
      window.starResult.gainPhotos(resutlData);
  })
  //标签点击
  $(".channelCons").on("click","ul.labelsCon li",function(){
    //调用客户端
    var id=$(this).attr("labelId");
    var name=$(this).html();
    window.starResult.getTagInfo(id,name);
  })
  $(".js-close").click(function(){
      tcc.BOX_remove("messdiv");
    })
  //播放器
   changePlayer()
   //商品跳转
  $("#newContent").on("click",".prodCon",function(){
      var itemId=$(this).attr("itemId");
      window.starResult.goodsDetail(itemId);
         
    })
   //点击audio播放
    $("#newContent").on("click",".audio_main",function(e){
     var audio=$(this).find("audio")[0];
     var childList=document.getElementsByTagName("audio");
    if(audio!==null){
      if(audio.paused){
        for(var i = 0; i < childList.length; i++){
                var au=childList[i];
              if(au!==null){
                  if(au.paused){
                  }else{
                  au.pause();// 这个就是暂停
                  }
              }
          }
          $(".audio_yuyin").removeClass("move");
          audio.play();//audio.play();// 这个就是播放
          $(this).find(".audio_yuyin").addClass("move");
        }else{
           $(this).find(".audio_yuyin").removeClass("move");
         audio.pause();// 这个就是暂停
        }
     }
    var thi=$(this);
     $(audio).on('ended',function () {
        thi.find('.audio_yuyin').removeClass('move');
   });

  })
    //点击链接
   $("#newContent").on("click","a",function(e){
    stopDefault(e); 
    var title=$(this).find("urltitle").html();
    var url=$(this).attr("href");
     window.starResult.hyperLinkTitle(url,title); 
     
   })


}

$(function(){
    var id=analyzParams("new_id");
    var jwt_token=analyzParams("jwt_token");
    var url=host+"news/"+id+"?jwt_token="+jwt_token;
    $.ajax({
        url: url,
        type: "get",
        dataType: 'json',
        async: true,
        cache: false,
        success: function(data) {
          initDetailCons(data)
          
        },
        error: function() {}
      })
     
})