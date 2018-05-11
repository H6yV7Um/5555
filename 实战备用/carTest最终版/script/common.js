//targetEL格式为”#id名“
function getProductList(classID,targetEL){
//	$.ajax({
//		url:"",
//		dataType:"jsonp",
//		success:function(){
//			
//		}
//	})
	
	var $box=$(targetEL);
	$box.children().html("");
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
		classID:classID
	},function(data){
		createProduct(data);
	})
	
	function createProduct(data){
		$.each(data,function(i,r){
			var $product=$("<div class='product'></div>");
			var $inBox=$("<div class='inBox'><img src='"+r.goodsListImg+"'></div>");
			var $TextBox=$("<div class='textBox'></div>")
//			var thisimg=new Image();
//			thisimg.src=r.goodsListImg;
//			$inBox.append(thisimg);
			$product.append($inBox);
			$product.append($TextBox);
			$box.children().append($product);
//			thisimg.onload=function(){
//				globalPr.myscroll.refresh();
//			}
			globalPr.myscroll.refresh();
			
			$product.bind("click",function(){
				console.log(r.goodsID);
				//window.location="views/product.html?goodsID="+r.goodsID;
				/*调用购买动画*/
				shopingAni({
					staEL:$(this).children(".inBox"),
					target:globalPr.$carSum,
					callback:function(){
						/*动画执行完，在调用更新购物车函数*/
						updateCar({
							userID:globalPr.userID,
							goodsID:r.goodsID,
							number:1,
							sumBox:globalPr.$carSum,
							updataCallBack:function(data){
								if(data){
									alert("以添加至购物车，请去购物车中查看！");
								}else{
									alert("添加失败！");
								}
								
							}
						})
					}
				});
				
				
			})
		});
	}
}

/*
 * 购物车更新方法，参数（{
	userID:用户ID,
	goodsID:商品ID,
	number:购买商品数量,
	sumBox:购物车总数显示的容器，JQ结果集类型,
	updataCallBack:更新成功回调函数，类型function
}）
 */
function updateCar(opt){
	var config={
		userID:"",
		goodsID:"",
		number:1,
		sumBox:null,
		updataCallBack:function(){
			
		},
		gatcarCallBack:function(data){
				config.sumBox.html(data.length);
		}
	};
	$.extend(config,opt);
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
		userID:config.userID,
		goodsID:config.goodsID,
		number:config.number
	},function(data){
		if(typeof config.updataCallBack =="function"){
			config.updataCallBack(data);
		}
		if(data==1){
			getCar({
				userID:config.userID,
				callback:config.gatcarCallBack()
			})
		}
	})
	
	
}

/*查看购物车方法*/
function getCar(opt){
	var config={
		userID:"",
		callback:function(){
			
		}
	}
	$.extend(config, opt);
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{
		userID:config.userID
	},function(data){
		if(typeof config.callback=="function"){
			config.callback(data);
		}
	})
}
//事件委托机制
//nav.onclick=function(e){
//	
//	if(e.target.nodeName=="I"){
//		
//	}
//}

/*加入购物车动画效果
 参数
 {
		staEL:起始元素，jq结果集对象类型,
		target:目标元素，jq结果集对象类型,
		callback:动画完成回调函数
	}
 * */
function shopingAni(opt){
	var config={
		staEL:null,
		target:null,
		callback:function(){
			
		}
	}
	$.extend(config,opt);
	var staELPos=config.staEL.offset();
	var targetPos=config.target.offset();
	var AniEl=config.staEL.clone();
	AniEl.css({
		position:"absolute",
		top:staELPos.top,
		left:staELPos.left,
		width:100,
		height:100
	});
	console.log(AniEl);
	$("body").append(AniEl);
	AniEl.animate({top:targetPos.top,left:targetPos.left,width:0,height:0},1000,function(){
		AniEl.remove();
		if(typeof config.callback=="function"){
			config.callback();
		}
		
	});
}
