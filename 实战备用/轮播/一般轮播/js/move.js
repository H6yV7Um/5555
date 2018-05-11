function move(obj, json, fn) {

	clearInterval(obj.timer);

	obj.timer = setInterval(function(argument) {
		for(var attr in json) {
			var nowCurrent = 0;
			var BS = true;
			if(attr == "opacity") {
				nowCurrent = parseFloat(getClass(obj, attr)) * 100;

			} else {
				nowCurrent = parseInt(getClass(obj, attr));

			}
			if(nowCurrent != json[attr]) {
				BS = false;
			}
			var speed = (json[attr] - nowCurrent) / 8;

			// 缓冲运动 速度取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(attr == "opacity") {
				obj.style[attr] = (nowCurrent + speed) / 100;
			} else {
				obj.style[attr] = nowCurrent + speed + "px";
				//设置物体运动
			}
		}
		if(BS) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30);

}

function getClass(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}