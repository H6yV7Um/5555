function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
function startMove(obj, json,fn){
				
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var stop = true; //标志这一次运动就结束了-所有的值都到达了
		for(var attr in json){
			//1.取当前的值
			var cur = 0;
			if(attr == 'opacity'){
				cur = parseInt(parseFloat(getStyle(obj,attr)) * 100);
			}else{
				cur = parseInt(getStyle(obj,attr));
			}
			//2.算速度
			var speed = 50;
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			//3.检测停止
			if(cur != json[attr]){
				stop = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter ='alpha(opacity=' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed)/100;
			}else{
				obj.style[attr] = cur + speed + 'px';
				if(cur + speed >0){
					obj.style[attr] =0+ 'px';
				}
			}
							
		}
		if(stop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}	
		}
	},100);
}