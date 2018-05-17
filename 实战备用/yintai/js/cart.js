$(function(){
	//页面加载时，将cookie的数据取出  显示到页面购物车列表中
	var oldCookie = getCookie("shoplist");
	var html = "";
	for (var i= 0 ; i < oldCookie.length ; i++) {
		shopinfo = oldCookie[i];
		html += `<div class="product clearfix">
					<div class="th-chk"><input type="checkbox" class="ck"/></div>
					<div class="th-item">
						<div class="property">
							<div class="pro-img"><a href="#"><img src="images/${shopinfo.src}"/></a></div>
							<p class="pro-title"><a href="#">${shopinfo.name}</a></p>
							<div class="pro-pro">
								<p><span>颜色：<b>189</b></span><span>容量：<b>4g</b></span></p>
							</div>
						</div>
					</div>
					<div class="th-price"><strong>￥<em>${shopinfo.price}.00</em></strong></div>
					<div class="th-amount">
						<div class="pro-number" data-id=${shopinfo.id} data-src=${shopinfo.smallsrc} data-price=${shopinfo.price} data-name=${shopinfo.name}>
							<a href="javascript:;" class="jian updateCount" data-number="-1">-</a>
							<input type="text" / class="num" value="${shopinfo.count}">
							<a href="javascript:;" class="add updateCount" data-number="1">+</a>
						</div>
					</div>
					<div class="th-sum">${shopinfo.count*shopinfo.price}</div>
					<div class="th-op">
						<div class="operation"><a href="javascript:;" class="collect">移入收藏</a></div>
						<div class="operation"></div>
						<div class="operation"><a href="javascript:;" class="delete">删除商品</a></div>
					</div>
				</div>`;
	}
	
	$(".cartlist-list").html( html );
	
	function  sumPrice(){
		var count = 0;//总数量
		var sum = 0;//总金额
		$(".ck:checked").each(function(){
			count +=parseInt( $(this).parent().parent().find(".num").html() );
			sum +=parseInt( $(this).parent().parent().find(".th-sum").html() ) ;
		})
		$(".total").html("￥<b>"+sum+"</b>.00");
		$(".pay").html("￥<b>"+sum+"</b>.00");
		$(".endpay").html("￥<b>"+sum+"</b>.00");
	}
	
	//点击复选框  完成将被选中的复选框的数量和金额 添加到  count2  和  money2的标签中
	$(".ck").click(function(){
	 	sumPrice();
	})
	
	//全选
	$(".qx").click(function(){
		$(".ck").prop("checked", $(this).prop("checked") );
		sumPrice();
	})
	
	
	//加减操作
	$(".updateCount").click(function(){
		var id= $(this).parent().data("id");
		var name = $(this).parent().data("name");
		var flag = $(this).html();
		var count = $(this).parent().find(".num").html();
		if(flag == "-" && count == 1 ){  //如果商品的数量为1   并且点击的是 -    不在执行后面的代码
			return;
		}
		for(var i = 0 ; i < oldCookie.length ; i++){
			if( id == oldCookie[i].id && name == oldCookie[i].name ){
				flag == "+" ? oldCookie[i].count++ : oldCookie[i].count--;
				
				//重新设置cookie
				setCookie("shoplist",JSON.stringify(oldCookie));
				
				//刷新页面信息
				$(this).parent().find(".num").val( oldCookie[i].count );
				$(this).parent().parent().next().html( oldCookie[i].count*oldCookie[i].price );
				break;
			}
		}
	})
	//删除
	$(".delete").click(function(){
		//找到当前要删除的商品的编号
		var id = $(".pro-number").data("id");
		var name = $(".pro-number").data("name");
		if( confirm("确定要删除么？") ){
			for(var i = 0 ; i < oldCookie.length ; i++){
				if( id == oldCookie[i].id && name == oldCookie[i].name ){//找到了cookie数据中要删除的商品
					oldCookie.splice(i,1);
					
					//重新设置cookie
					setCookie("shoplist",JSON.stringify(oldCookie));
					break;
				}
			}
			$(this).parent().parent().parent().remove();
		}
	})
})
