$(function(){
	$("#headbox").load("common.html #head",function(){
		$(".menu-classify").hover(function(){
			$(".menu-wrap").show();
		},function(){
			$(".menu-wrap").hide();
		})
		$(".menu-list>li").mouseover(function(){
			$(".menu-list>li").removeClass("active");
			$(this).addClass("active");
			$(this).find("em").css("background-position-y","-129px");
			$(this).find("span").hide();
			$(".list-details").show();
			$(".list-details>div").removeClass("selected");
			$(".list-details>div").eq($(this).index()).addClass("selected");
		})
		$(".menu-wrap").mouseout(function(){
			$(".menu-list>li").removeClass("active");
			$(this).find("em").css("background-position-y","-111px");
			$(this).find("span").show();
			$(".list-details").hide();
			$(".list-details>div").removeClass("selected");
		})
	});
	$("#footbox").load("common.html #foot");
	
})
