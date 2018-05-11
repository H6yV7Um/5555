// JavaScript Document
/*盛典列表*/
var getFestivalList = function() {
		var url = host + "web/"+100550;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var festivalCon = "";
				for (i = 0; i < resultData.data.related.length; i++) {
						festivalCon += "<li> <a href='festivalDetail.html?id="+resultData.data.related[i].id+"'> <p class='newsPic'><img  src="+resultData.data.related[i].cover+" /><i></i></p><h2>"+resultData.data.related[i].title+"</h2> <p class='lookLike'><span><i></i>"+resultData.data.related[i].watch_num+"</span></p> </a> </li>";		
				}
				$(".festivalCon ul").html(festivalCon);	
				$(".festivalCon li:nth-child(3n)").addClass("last");
			}
		},{"type":2});
	}
var getFestivalDetail = function() {
		var url = host + "web/"+id;
		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var festivalCon = "";
				$(".detailMain h2").text(resultData.data.video.title);
				$(".detailInfo .fl span").text(resultData.data.video.created_at);
				$(".lookLike span").text(resultData.data.video.watch_num);
				$("#video").attr("scr",resultData.data.video.replay_url)
				
			}
		},{"type":2});
	}
		