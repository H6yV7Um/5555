/*var server = 0;
var jwt_token_login = "";
//根据实际链接中参数名称变化,uid
var host = 'http://123.57.0.118:5000/v2';*/
var jwt_token = analyzParams("jwt_token") == undefined ? jwt_token_login : analyzParams("jwt_token");
var initSearchList = function(resultData) {
  //$("#js-searchList").html("");
  var searchHtml = "";
  var infoData = resultData.data.page_data;
  if (resultData.code=="404" && $("#js-searchList li").length==0) {
    $("#js-searchList").html("<p class='tc' style='margin-top:50px;font-size:1.5rem'>没有搜索到相关结果</p>");
  } else {
    for (var i = 0; i < infoData.length; i++) {
      var likeNum = infoData[i].like_num > 10000 ? infoData[i].like_num / 10000 + "万" : infoData[i].like_num ;
      var uname = "";
      if (infoData[i].user_name != null) {
        uname = infoData[i].user_name.length > 15 ? infoData[i].user_name.substr(0, 15) + "..." : infoData[i].user_name;
      }
      var avatar = infoData[i].user.head_pic == "" ? "assets/images/headPic-default.png" : infoData[i].user.head_pic;

      searchHtml += "<a href='movieRoleDetail.html?id="+infoData[i].user_id+"&jwt_token="+jwt_token+"'><li class='curPersonInfo searchPersonInfo' uid='"+infoData[i].user_id+"'>" + 
      "<p class='head-pic'><img src='" + avatar + "'></p>" + 
      "<div class='user-info'>" + "<div>" + uname + "</div>" + 
      "<div class='col_grey f13'>当前排名:" + (infoData[i].category == 1 ? "女组" : "男组") + "第" + 
      infoData[i].rank + "名</div>" + "</div>" + 
      "<div class='follow-num'>" +
      "<span id='followNum'>"+ likeNum +" </span>" + 
      "<img src='assets/images/icon-heart.png'>" +
      "</div>" + "</li></a>"
      
    }
    if(resultData.data.total>10){
      $("#js-moreRank").show();
    }else{
      $("#js-moreRank").hide();
    }
    var current_count = $("#js-searchList li").length;
    //if(current_count)
    $("#js-searchList").append(searchHtml);
  }
 //加载更多按钮文字
  var total=resultData.data.total;
  if(total>$("#js-searchList li").length){
    $("#js-searchList").next(".more-rank").html("点击加载更多...");
    $("#js-searchList").next(".more-rank").attr("id","js-moreRank");
  }else if( total<=$("#js-searchList li").length || resultData.code!="200"){
    $("#js-searchList").next(".more-rank").html("暂无更多数据...");
    $("#js-searchList").next(".more-rank").attr("id","");
    setTimeout(function(){
      $("#js-searchList").next(".more-rank").html("点击加载更多...");
      $("#js-searchList").next(".more-rank").attr("id","js-moreRank");
     },60000)
  }
}
var toSearch = function(current_count) {
  var keyword = $("#js-txt_search").val().trim();
  if (keyword == "" || keyword == null) {
    //alert("请输入搜索的内容");
    tcc.BOX_show("messdiv-tip");
    $(".messdivCons").html("请输入搜索的内容")
    return;
  }
  //添加缓冲
  addLoadding("js-searchList");
  var url = host + "/list/find?current_count=" + current_count;
  var params={
    "name":keyword
  }
  //var url="http://star.xingxiu.tv/festival/search?keyword="+keyword+"&server="+server+"&callback=?"
  ajaxCommonFun(url, "POST", function(resultData) {
    //移除缓冲
    removeLoadding("spinner");
    if (resultData != null && resultData.code=="200") {
      initSearchList(resultData);
    }else if(resultData.code=="404" && $("#js-searchList li").length==0){
      $("#js-searchList").html("<p class='tc' style='margin-top:50px;font-size:1.5rem'>该用户没有参加活动哦~</p>");
    }

  },params)

}

$(function() {
  //搜索
  $(".searchForm").submit(function(e) {
     $("#js-searchList").html("");
      toSearch("0");
    })
      //加载更多
    $(document).on("click","#js-moreRank",function(e){
     var current_count=$("#js-searchList li").length;
      toSearch(current_count);
    })
    /* $("#btn_search").click(function(){
       toSearch();
     })*/
    //
  $(".js-close").click(function() {
    tcc.BOX_remove("messdiv-tip");
  })

  $(".btn_cancel").click(function(){
    window.location.href="index.html?jwt_token="+jwt_token;
  })
})