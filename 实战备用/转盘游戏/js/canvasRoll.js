function Lottery(opt){
	this.config={
		targetBox:null,
		canvastarget:null,
		lotteryChoise:null,
		startBtn:null //开始转动的盒子
	};
	
	$.extend(this.config,opt);
	this.canvasEL = null;
	this.cxt = null;
	this.degInterval=0;
	
	this._create();
	this.addevent();
	
};
Lottery.prototype={
	_create:function(){
		var that=this;
		var canEL = document.createElement("canvas");
		var cxt = canEL.getContext("2d");
		//每块区域的大小，即每个奖项的面积
		var degInterval = 360/this.config.lotteryChoise.length;
		//指针的旋转角度
		var wizardDeg = degInterval/2+90;
		
		if(this.config.targetBox){
			//设置画布长宽,不能用css去设置宽高，因为画布会变形，要设置画布的宽高属性
			canEL.width = this.config.targetBox.width();
			canEL.height = this.config.targetBox.height();
			this.config.targetBox.css({"position":"relative"});
			
			//创建指针
			var wizardEL =$("<div>");//指针
			wizardEL.css({
				"position":"absolute",
				"top":"0",
				"left":"50%",
				"width":"0.2rem",
				"height":"3rem",
				"margin-left":"-0.1rem",
				"background":"#c00",
				
				//以物所在位置的左上角为原点来计算距离的rotate时的圆心
				"transformOrigin":"0.1rem "+canEL.height/2+"px",
				"transform":"rotate("+wizardDeg+"deg)"
			})
			
			console.log(degInterval);
			this.config.targetBox.css("transform","rotate("+(270-degInterval/2)+"deg)");
			this.config.startBtn.css({
				
				"transform":"rotate(-"+(270-degInterval/2)+"deg)",
				
			})
			this.config.canvastarget.append(canEL);
			this.config.targetBox.append(wizardEL);
			
			
		}
		this.canvasEL = canEL;
		this.cxt = cxt;
		
		$.each(this.config.lotteryChoise,function(i,r){
			r.thisdeg = i*degInterval;
			//绘制转盘
			that.createChoise(r.thisdeg,degInterval);
		})
		console.log(this.config.lotteryChoise)
		$.each(this.config.lotteryChoise,function(i,r){
			//写入文字
			that.createChoiseText(r.thisdeg,degInterval,r.name);
		})
//				console.log(this.canvasEL.width)
		
	},
	
	
	
	createChoise:function(actdeg,deg){
		//求半径
		var r=this.canvasEL.width/2;
		var degC = Math.PI/180;
		
		var degACT = actdeg*degC;//将开始时的角度转弧度
		this.cxt.fillStyle = this.getColor();
//				console.log(this.cxt.fillStyle)
		this.cxt.beginPath();
		this.cxt.moveTo(r,r);
		//连接到圆心
		this.cxt.lineTo(r,r);
		
		//(圆心x,圆心y,半径r,起始角度,结束角度)
		this.cxt.arc(r,r,r,degACT,deg*degC+degACT);
		this.cxt.closePath();
		this.cxt.fill();
	},
	createChoiseText:function(actdeg,deg,text){
		var r=this.canvasEL.width/2;
		var degC = Math.PI/180;
		var degACT = actdeg*degC;
		
		//保存当前环境的状态，锁定画布
		this.cxt.save();
		
		//从新开始路径，相当于换了个画笔，若没有开始路径与结束路径，填充颜色的时候会把之前的颜色覆盖掉
		this.cxt.beginPath();
		//设置字体样式
		this.cxt.font="1rem 微软雅黑";
		//设置字体颜色
		this.cxt.fillStyle="#000000";
		//将旋转中心挪到画布中心
		this.cxt.translate(r,r);
		
		//锁定画布后在画布上所画的路径进行旋转，旋转度数为degACT+deg/2*degC（跟扇形一样）
		this.cxt.rotate(deg/2*degC+degACT+0.1);
		
		//写入文字
		this.cxt.fillText(text,30,0);
		
		this.cxt.closePath();
		this.cxt.restore();
		//返回之前保存过的路径状态和属性
	},
	getColor:function(){
		var color="#";
		var str = "0123456789abcdef";
		for(var i=0;i<6;i++){
			color+=str[Math.floor(Math.random()*15)];
		}
		return color;
	},
	addevent:function(){
		var that=this;
		this.config.startBtn.bind("click",function(){
			that.move();
			
		})
	},
	
	
	move:function(){
		
		
		var rnum =this.rollnum();
		var rDeg = (360-rnum.thisdeg)+720;
		console.log(rnum);
		console.log(rDeg);
		console.log(rnum.name);
		this.config.canvastarget.css("transform","rotate("+rDeg+"deg)");
		 
	},
	rollnum:function(){
		console.log(this.config.lotteryChoise.length)
		var index=Math.floor(Math.random()*this.config.lotteryChoise.length)
		console.log(index);
		if(index){
			return this.config.lotteryChoise[index];
		}
		return this.rollnum();
	}
	
}



