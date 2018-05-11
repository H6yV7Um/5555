$(function(){
	$(".indexList").on("click",".toUserInfo",function(){
		/*$(".js_dspMenu li", window.parent.document).removeClass("cur");
		$(".js_dspMenu li", window.parent.document).eq(4).addClass("cur");
		$("iframe", window.parent.document).attr("src","profile.html");*/
		window.location.href="profile.html?mt=4"
	})
	$(".indexList").on("click","#toRecharge",function(){
		/*$(".js_dspMenu li", window.parent.document).removeClass("cur");
		$(".js_dspMenu li", window.parent.document).eq(3).addClass("cur");*/
		window.location.href="recharge.html?mt=3"
	})
	$(".indexList").on("click","#moreReport",function(){
		/*$(".js_dspMenu li", window.parent.document).removeClass("cur");
		$(".js_dspMenu li", window.parent.document).eq(2).addClass("cur");
		$("iframe", window.parent.document).attr("src","dataReport.html");*/
		window.location.href="dataReport.html?mt=2"
	})

	
})