
function addhot(){
	$.get("../json/hot.json",function(data){
		//console.log(data)
		var _html="";
		for(var k in data){
			_html+='<div class="item"><dl><dt><img src="../images/'+data[k]["img"]+'" alt=""></dt><dd><p><a href="">'+data[k]["name"]+'</a></p><span><a href="">吊牌价￥'+data[k]["num"]+'</a></span></dd></dl><div class="red"><img src="../images/qg.jpg" alt=""></div><div class="word">'+data[k]["price"]+'</div></div>'
		}
		$(".run2").html(_html);
	},"json")
}
$(document).ready(function(){
	addhot();
});