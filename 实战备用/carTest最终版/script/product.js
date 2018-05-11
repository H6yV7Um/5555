;(function(){
	$("#backBtn").on("click",function(){
		window.history.back();
	})
})();

function getProduct(){
	var goodsID=getUrlParameter("goodsID")?getUrlParameter("goodsID"):null;
	if(goodsID){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function(data){
			
		})
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
	
	//console.log(parameterArr2);
}
