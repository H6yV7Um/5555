// JavaScript Documen
var getVideo = function() {
		var url = host + "web";
		ajaxCommonFun(url, "get", function(resultData) {
			//resultData=JSON.parse(resultData);
			if (resultData.code == "200") { /*原创视频*/
				var videos = "";
				for (i = 0; i < resultData.data.video.length; i++) {
					videos += "<dl><a href='hotNewsDetail.html?id=" + resultData.data.video[i].id + "'><dt><img src='" + resultData.data.video[i].cover + "' /><i></i></dt><dd>" + resultData.data.video[i].title + "</dd></a></dl>";
				}
				$(".videos").html(videos);
				$(".videos dl:odd").addClass("mr0"); /*乐视视频*/
				var leVideos = "";
				for (i = 0; i < resultData.data.page_data.length; i++) {
					leVideos += "<dl><a href='leVideoDetail.html?id=" + resultData.data.page_data[i].id + "'><dt><img src='" + resultData.data.page_data[i].cover + "!750x563' /><i></i></dt><dd>" + resultData.data.page_data[i].title + "</dd></a></dl>";
				}
				$(".leVideos").html(leVideos);
				$(".leVideos dl:odd").addClass("mr0");

			}
		})
	}

$(function() {
	$.support.cors = true;
	getVideo()
	$(".f426x240").responsiveSlides({
		auto: true,
		pager: true,
		nav: true,
		speed: 700,
		maxwidth: 1140
	});
});