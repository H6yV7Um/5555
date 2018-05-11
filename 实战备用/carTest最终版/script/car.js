/*定义命名空间对象，用于存储全局属性*/
var carGlPr={
	carDataInit:[],/*用于存储原始数据，以便判监听数据变化*/
	carData:[],/*存储获取到的购物车数据*/
	timerAll:null/*创建全局定时器，以便按时提交数据，避免短时间内快速重复操作*/
}

;(function(){
	carinit();
	addTimerAll();
})();


function carinit(){
	
	var $nav=$("nav");
	getCar({
		userID:"xxxx",
		callback:function(data){
			/*将数据付给全局数据属性*/
			carGlPr.carData=data;
			/*通过自定义数组克隆方法，将数据复制一份*/
			carGlPr.carDataInit=carGlPr.carData.arrClone();
			
			var $box=$("#productBox").children("div");
			if(data){
				/*调用总数计算方法*/
				sumCounter(0,carGlPr.carData,$nav);
				/*通过循环，便利数据，并向页面中添加节点*/
				$.each(carGlPr.carData, function(i,r) {
					var $prod=$("<div class='prodBox'><div>"+r.goodsName+"</div></div>");
					var btn_sub=$("<button>-</button>");
					var btn_add=$("<button>+</button>");
					var numberBox=$("<input type='text' value="+r.number+" />");
					$prod.append(btn_sub);
					$prod.append(numberBox);
					$prod.append(btn_add);
					
					$box.append($prod);
					
					btn_sub.bind("click",function(){
						/*调用总数计算方法，减法操作*/
						sumCounter(-1,carGlPr.carData,$nav,i);
						/*将变更的数据从新赋值给input*/
						numberBox.val(r.number);
					})
					btn_add.bind("click",function(){
						
						sumCounter(1,carGlPr.carData,$nav,i);
						numberBox.val(r.number);
					})
				});
				
			}
		}
	})
}
/*加减操作*/
/*总数总价计算函数,及加减操作,参数（（-1，0，1），数据，目标变更容器）*/
function sumCounter(code,data,$nav,index){
	var sumNumber=0;
	var sumPrice=0;
	/*将变更之前的数据，克隆一份给原始数据变量*/
	carGlPr.carDataInit=carGlPr.carData.arrClone();
	if(code){
		/*数据变更操作*/
		data[index].number=parseInt(data[index].number)+code;
		if(data[index].number<1){
			data[index].number=1;
		}
	}
	/*便利数据计算总数及总价*/
	$.each(data, function(i,r) {
		sumNumber+=parseInt(r.number);
		sumPrice+=r.number*r.price;
	});
	/*总数总价的页面显示操作*/
	$nav.children().eq(0).html(sumNumber).next().html(sumPrice);
	//console.log(carGlPr.carDataInit[0].number);
	//console.log(carGlPr.carData[0].number);
	
	//carGlPr.carData.arrClone();
}

/*添加全局定时器*/
function addTimerAll(){
	clearInterval(carGlPr.timerAll);
	carGlPr.timerAll=setInterval(function(){
		/*原始数据与变更数据进行对比，长度一致则做下一步判断*/
		if(carGlPr.carDataInit.length==carGlPr.carData.length){
			/*便利变更数据*/
			$.each(carGlPr.carData,function(i,r){
				/*对比原始数据与变更数据的ID是否一直，并进行数量对比*/
				if(carGlPr.carDataInit[i].goodsID==r.goodsID){
					/*对比数量，发生变更时，向后台提交数据*/
					if(carGlPr.carDataInit[i].number!=r.number){
						/*提交数据同时，讲变更数据在此克隆给原始数据，避免重复提交相同数据*/
						carGlPr.carDataInit=carGlPr.carData.arrClone();
						updateCar({
							userID:"xxxx",
							goodsID:r.goodsID,
							number:r.number,
							updataCallBack:function(data){
								console.log(data);
							},
							gatcarCallBack:function(data){
										/*重置页面数据*/
							}
						});
					}
				}
			})
		}
		
	},1000);
}

/*数组克隆方法*/
Array.prototype.arrClone=function(){
	var newArr=[];
	//console.log(this);
	for(var i=0;i<this.length;i++){
		newArr[i]={};
		for(var x in this[i]){
			newArr[i][x]=this[i][x];
		}
	}
	return newArr;
}

