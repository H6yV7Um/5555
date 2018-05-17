(function($){
	//商品列表
	$(function(){
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
	})
	//brand-con
	$(function(){
		$(".brand-con-nav>li").mouseover(function(){
			$(".brand-con-nav>li").removeClass("active");
			$(this).addClass("active");
			$(".brand-con-wrap>div").removeClass("selected");
			$(".brand-con-wrap>div").eq($(this).index()).addClass("selected");
		})
	})
	//银泰百货商场同款的tab
	$(function(){
		$(".tk-nav").find("li").mouseover(function(){
			$(".tk-nav").find("li").removeClass("active");
			$(this).addClass("active");
			$(".tk-con-wrap>ul").removeClass("selected");
			$(".tk-con-wrap>ul").eq($(this).index()).addClass("selected");
		})
	})
	//商品移入线条效果
	$(function(){
		function move(a){
		a.mouseenter(function(){
			var w=$(this).width(),
				h=$(this).height();
			$(this).find(".div-w").stop().animate({"width":w+"px"},500)
			$(this).find(".div-h").stop().animate({"height":h+"px"},500)
		})
		a.mouseleave(function(){
			$(this).find(".div-w").stop().animate({"width":0},500)
			$(this).find(".div-h").stop().animate({"height":0},500)
		})
	}
		move($(".brand-product"))
		move($(".tk-product"))
		move($(".banner-bor"))
	
	/*------------------------------ajax加载楼梯内容------------------------------*/

		$.ajax({
			type:"get",
			url:"json/floor.json",
			async:true,
			success:function(res){
				var sNav = "";
				var sSlide = "";
				var sBan = "";
				for( var i in res){
//					console.log(res[i]); //mp-floor
					//找导航的内容
					for(var j = 0 ; j < res[i].mpNav.length; j++){
//						console.log(res[i].mpNav[j]);
						var nav = res[i].mpNav[j];
						sNav += `<li><a href="goodlist.html">${nav}</a></li>`;
					}
					/*for( var j in res[i].mpWf){
//						console.log(res[i].mpWf[j]);
						for(var h in res[i].mpWf[j]){
							console.log(res[i].mpWf[j][1]);
						}
					}*/
					for(var j = 0 ; j < res[i].mpSlidesrc.length; j++){
						var Ssrc = res[i].mpSlidesrc[j];
						sSlide = `<div class="floor-slide-wrap">
									<a href="goodlist.html"><img src="images/${res[i].mpSlidesrc[0]}"/></a>
									<a href="goodlist.html"><img src="images/${res[i].mpSlidesrc[1]}"/></a>
								</div>
								<ul class="floor-slide-index">
									<li class="active"></li>
									<li></li>
								</ul>
									<a href="javascript:;" class="slide-prev"></a>
									<a href="javascript:;" class="slide-next"></a>`;
						
					}
					for(var j = 0 ; j < res[i].mpBannersrc.length; j++){
//						console.log(res[i].mpBannersrc[j]);
						var ban = res[i].mpBannersrc[j];
						sBan += `<div class="banner-block">
										<div class="banner-bor">
											<div class="div div-w"></div>
											<div class="div div-h"></div>
											<div class="div div-w"></div>
											<div class="div div-h"></div>
											<div class="img-wrap">
												<a href="goodlist.html">
													<img src="images/${ban}"/>
												</a>
											</div>
										</div>			
									</div>`;
					}
				}
				//把导航的内容加到导航的ul里面去
				$(".floor-nav-category").html(sNav);
				$(".floor-slide").html(sSlide);
				$(".banner-wrap").html(sBan);
			}
		})
		$(".banner-wrap").on("mouseover",$(".banner-bor"),function(){
			move($(".banner-bor"));
		})
		
/*-------------------------------------楼梯--------------------------------- */
	var flag = true;
	$(".float-nav-wrap a:not(:last)").click(function(){
		flag = false;
		$(this).addClass("f-active").siblings().removeClass("f-active");
		var top = $(".yt-floor").eq($(this).index()).offset().top-150;
		$("body,html").stop(true).animate({scrollTop:top},1000,function(){
			flag = true;
		});
	})

	$("body").on("click","#top",function(){
		flag = false;
		$(".float-nav-wrap").hide();
		$("body,html").animate({scrollTop:0},1000,function(){
			flag = true;
		});
		$(".float-nav-wrap a:not(:last)").removeClass("f-active");
	})
	$(window).scroll(function(){
		if(flag){
			var sTop = $(document).scrollTop();
			var $floor = $(".yt-floor").filter(function(){
				return Math.abs($(this).offset().top-150- sTop) < $(this).height()/2;
			})
			var index = $floor.index();
			if(index>=0){
				$(".float-nav-wrap a:not(:last)").eq(index-6).addClass("f-active").siblings().removeClass("f-active");
			}
			if(sTop >= $(".brand-sell").offset().top){
				$(".float-nav-wrap").show();
			}else{
				$(".float-nav-wrap").hide();
				
			}
		}
		
	})
	})
})(jQuery)
