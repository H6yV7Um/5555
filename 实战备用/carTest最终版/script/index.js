var globalPr={
	myscroll:null,
	userID:"xxxx",
	$carSum:$(".carSum"),
	router:[{
		name:"home",
		url:"views/home.html"
	},
	{
		name:"listBtn",
		url:"views/list.html"
	},{
		name:"car",
		url:"views/car.html"
	}
	]
};
;(function(){
	getNav();
	indexaddevent();
})();

function getNav(){
	getCar({
				userID:globalPr.userID,
				callback:function(data){
					$(".carSum").html(data.length);
				}
			})
	
	
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

function indexaddevent(){
	$.each(globalPr.router,function(i,r){
		var _class="."+r.name;
		$(_class).on("click",function(){
			window.location=r.url;
		})
	})
	
}
