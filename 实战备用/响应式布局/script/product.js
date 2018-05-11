;(function(){
	$("#backBtn").on("click",function(){
		window.history.back();
	})
	
})();

function getProduct(){
	var goodsID=getUrlParameter("goodsID")?getUrlParameter("goodsID"):null;
	if(goodsID){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function(data){
			createProduct(data);
		})
	}
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
function getUrlParameter(name){
	var parameterText=window.location.search.substr(1);
	var parameterArr1=parameterText.split("&");
	var parameterArr2=[];
	for(var i=0;i<parameterArr1.length;i++){
		var arr=parameterArr1[i].split("=");
		parameterArr2[i]=arr;
		if(parameterArr2[i][0]==name){
			return parameterArr2[i][1];
		}
	}
	
	console.log(parameterArr2);
}
