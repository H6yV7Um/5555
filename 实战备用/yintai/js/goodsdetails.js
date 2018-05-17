

/*商品详情页的放大镜*/

$(function(){
	fdj();
	function fdj(){
		$("#bottom li").mouseover(function(){
	 		var index = $(this).index();
	 		$("#small img").eq(index).show().siblings("img").hide();
	 		$("#big img").eq(index).show().siblings().hide();
	 		
	 	})
	 	$("#small").on({
	 		"mouseover":function(){
	 			$("#mask").stop(true).fadeIn(1000).show();
	 			$("#big").stop(true).fadeIn(600).show();
	 		},
	 		"mouseout":function(){
	 			$("#mask").stop(true).fadeOut(1000).hide();
	 			$("#big").stop(true).fadeOut(600).hide();
	 		},
	 		"mousemove":function(evt){
	 			var evt = evt || event;
	 			 
	 			var x = evt.pageX - $("#small").offset().left - $("#mask").width()/2;
	 			var y = evt.pageY - $("#small").offset().top - $("#mask").height()/2;
	 			var maxW = $("#small").width() - $("#mask").width();
	 			var maxH = $("#small").height() - $("#mask").height();
	 			//边界处理
	 			x = x <= 0 ? 0 : (x>=maxW ? maxW : x);
	 			y = y <= 0 ? 0 : (y>=maxH ? maxH : y);
	 			
	 			$("#mask").css({
	 				"left" : x + "px",
	 				"top" :y + "px",
	 			})
	 			
	 			//大图宽度/小图宽度 = 大图移动距离 / mask移动距离
	 			var bigImgX = x * $(".bigImage").width()/$("#small").width();
	 			var bigImgY = y * $(".bigImage").height()/$("#small").height();
	 			
	 			$(".bigImage").css({
	 				"left": - bigImgX + "px",
	 				"top" : -bigImgY + "px"
	 			})
	 		}
	 	})
}
})
/*详情页读取内容*/
$(function(){
	var str = location.href;
	var arr = str.split("?");
	var arr = arr[1].split("&");
	var pid = arr[0].split("=")[1];
	var cname = arr[1].split("=")[1];	
	$.ajax({
		type:"get",
		url:"json/goods.json",
		success:function(glist){
			var 
				html = "",
				title = "",
				ytprice = "",
				marketprice = "",
				bigsrc = "",
				bbigsrc = "",
				smallsrc = "";
			for (var i = 0 ; i < glist[cname].list.length ; i++) {
				var pro = glist[cname].list[i];
				if(pid == pro.id){
				    title = `${pro.name}`;
				    ytprice = `￥${pro.price}.<em>00</em>`;
				    marketprice = `￥${pro.originalPrice}.<em>00</em>`;
				    bigsrc = `images/${pro.bigsrc}`;
				    bbigsrc = `images/${pro.bbigsrc}`;
				    smallsrc = `images/${pro.smallsrc}`;
				    html = `<span style="display:none" data-id=${pro.id} data-src=${pro.smallsrc} data-price=${pro.price} data-name=${pro.name}></span>`
					break;
				}
			}
			$(".d-info").find("h1").html(title);
			$(".ytprice").find("strong").html(ytprice);
			$(".marketPrice").find("s").html(marketprice);
			$("#small").find("img").attr("src",bigsrc);
			$("#big").find("img").attr("src",bbigsrc);
			$("#bottom").find("img").attr("src",smallsrc);
			$(".addcart").append(html);
		}
	});
	$(".addcart").on("click",".incart",function(){
		var arr = [];//用来存储某些个商品对象
		var flag = true;//值为true  表示要向cookie中添加新商品了
		//alert( $(this).prev().find("img").attr("src") )
		//alert( $(this).prev().find("p:first").html() )
		//alert( $(this).prev().data("id") )  data()  获取自定义属性 data-    参数为 - 后面的名称
		//json对象存储某个商品信息
		var d = {
			"id":$(this).next().data("id"),
			"name":$(this).next().data("name"),
			"src":$(this).next().data("src"),
			"price":$(this).next().data("price"),
			"count":1  //用来记录该商品添加了几次
		};
		console.log(d);
		//为了解决再次点击添加购物车按钮时，商品被覆盖 ， 先将购物车中的数据取出来，存放到数组中；；；；；然后在将当前点击的商品对象添加到数组中
		//取出购物车的数据 就是将cookie的信息取出来 
		oldCookie = getCookie("shoplist");
		//console.log(oldCookie)
		//判断cookie中是否含有数据  如果有就先将数据存入到数组中
		if( oldCookie.length !=  0 ){
			arr = oldCookie;//将cookie信息存入到数组中
			//遍历arr数组中的数据  判断当前添加的商品在数组中是否存在  如果存在就让count值++
			for(var i = 0 ; i <arr.length ; i ++){
				if( d.id == arr[i].id && d.name == arr[i].name ){
					arr[i].count++;
					flag = false;
					break;
				}
			}
		}
		
		//将获取的商品存入到数组
		if(flag){
			arr.push(d);
		}
		
		//将数组信息存入到购物车中  cookie
		setCookie("shoplist",JSON.stringify(arr));
		
		if( !confirm("继续购物，点击确定;点击取消 跳转到购物车页面") ){
			location.href = "cart.html";
		}
		console.log( document.cookie );
	})
})
