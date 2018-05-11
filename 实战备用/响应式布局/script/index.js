var globalPr={
	myscroll:null
};
;(function(){
	getNav();
})();

function getNav(){
	globalPr.myscroll=new IScroll("#productBox",{click:true});
	$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
		
		if(data){
			var thisdata=JSON.parse(data);
			createNav(thisdata);
		}
	});
	
	function createNav(data){
		var $navBox=$("#navbox");
		$navBox.html("");
//		var btn;
//		for(var i=0;i<data.length;i++){
//			(function(i){
//				dom.onclick=function(){
//					i
//				}
//			})(i);
//		}
		$.each(data, function(i,r) {
			var $btn=$("<span><i class='iconfont'>"+r.icon+"</i><em>"+r.className+"</em></span>");
			$navBox.append($btn);
//			$btn.on("click",function(){
//				
//			})
//bind()方法绑定事件效率相对于on()，稍微高一些，但是on()带有事件委托机制
			$btn.bind("click",function(){
				getProductList(r.classID,"#productBox");
			})
		});
	}
}

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
				window.location="views/product.html?goodsID="+r.goodsID;
			})
		});
	}
}


			$("#productBox").on("touchend",function(){
				//console.log(myScroll.y);
				if(globalPr.myscroll.y>30){
					console.log("刷新")
				}
				if(globalPr.myscroll.y<globalPr.myscroll.maxScrollY-30){
					getNav()
				}
			})
//事件委托机制
//nav.onclick=function(e){
//	
//	if(e.target.nodeName=="I"){
//		
//	}
//}
