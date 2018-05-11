function Hot(){
	$.post("../json/zz.json",function(data){
		var _html="";
		for(var k in data){
			_html+='<div class="nov_items"><div class="nov_img"><a href="#"><img src="../images/'+data[k]["img"]+'" alt="" class="loading"></a></div><div class="nov_price"><a href="#">加入购物车</a></div></div>';
		}
		$(".nov_ms3").html(_html);
		$(".nov_img a").mouseover(function(){
			$(this).find("img").stop().animate({"marginTop":"-10px"},300);
				}).mouseout(function(){
			$(this).find("img").stop().animate({"marginTop":"0"},300);
		})


	},"json")
}

$(document).ready(function(){
	//console.log(111)
	Hot();
	});