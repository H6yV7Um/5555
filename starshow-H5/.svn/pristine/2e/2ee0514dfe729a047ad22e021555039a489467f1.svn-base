// JavaScript Documen
$(function() {
	
		$(".arrow i").click(function() {
		$(".box").animate({
			"left": "-1100px"
		});
		$(this).hide();
		$(".arrow p").show();
	});
	$(".arrow p").click(function() {
		$(".box").animate({
			"left": "0"
		});
		$(this).hide();
		$(".arrow i").css("display", "block");
	});
	$(".news dl:first").css("margin-top", 24);
	setInterval('autoScroll(".notice")', 2000);
})

	/*星美图点击切换*/
var count = "0";
$(".change").click(function() {

	getChange();
})
var getChange = function() {
		var url = host + "picture";

		ajaxCommonFun(url, "get", function(resultData) {
			if (resultData.code == "200") {
				var stellarMapCon = "";
				if (resultData.data.page_data.length > 5) {
					stellarMapCon += "<div class='w'><div class='fl box1'><a href='stellarMap.html?id=" + resultData.data.page_data[0].id + "'><img src=" + resultData.data.page_data[0].cover + " /><p>" + resultData.data.page_data[0].title + "</p>        </a></div>";
					stellarMapCon += "<div class='fr'><div class='box2'><a href='stellarMap.html?id=" + resultData.data.page_data[1].id + "'><i></i><img src=" + resultData.data.page_data[1].cover + " /><p>" + resultData.data.page_data[1].title + "</p></a></div>";
					stellarMapCon += "<div class='box2 box3'><a href='stellarMap.html?id=" + resultData.data.page_data[2].id + "'><i></i><p>" + resultData.data.page_data[2].title + "</p>     <img src=" + resultData.data.page_data[2].cover + " /></a></div></div></div>";
					stellarMapCon += "<div class='w'><div class='fl'><div class='box2 box4'> <a href='stellarMap.html?id=" + resultData.data.page_data[3].id + "'><i></i> <p>" + resultData.data.page_data[3].title + "</p><img src='" + resultData.data.page_data[3].cover + "' /> </a></div>";
					stellarMapCon += "<div class='box2 box5'><a href='stellarMap.html?id=" + resultData.data.page_data[4].id + "'><i></i> <img src=" + resultData.data.page_data[4].cover + " /></a><p>" + resultData.data.page_data[4].title + "</p></div></div>";
					stellarMapCon += "<div class='fr'><div class='fl box1'><a href='stellarMap.html?id=" + resultData.data.page_data[5].id + "'><img src=" + resultData.data.page_data[5].cover + " /><p>" + resultData.data.page_data[5].title + "</p></p></a></div></div></div>";
					$(".stellarMapCon").html(stellarMapCon);
					count = Number(count) + 6;
				} else {
					$(".change").text("没有更多数据了...");
				}

			}
		}, {
			"current_count": count

		})

	}