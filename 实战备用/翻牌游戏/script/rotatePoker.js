/*
 * 扑克抽奖插件
 * 版本：1.0
 * 时间：2016/12/9
 * 作者：
 * 使用方法：
 * {
		pokers:[{
			backClass:"ba",
			faceContent:"",
			val:""，
			target:true,
			noChoise:true
		}],
		targetEl:"body",
		onlyOnce:false
	}
 */
function RotatePoker(opt){
	this.config={
		pokers:[{
			backClass:"ba",/*背面样式，ba,bb,bc,bd*/
			faceContent:"",/*正面显示内容，支持html标记*/
			val:""
		}],/*用户传入扑克数据*/
		targetEl:"body",/*扑克装载容器，默认BODY*/
		onlyOnce:false
	}
	$.extend(this.config,opt);
	this.$targetEl=$(this.config.targetEl);
	
	this.init();
}
/*
 * 扑克结构
 <div class="poker">
			<div class="back f"></div>
			<div class="face b">啊</div>
		</div>
 * */
RotatePoker.prototype={
	/*初始化*/
	init:function(){
		/*记录当前THIS*/
		var that=this;
		/*遍历用户数据，创建元素节点*/
		$.each(this.config.pokers, function(i,r) {
			/*调用创建扑克方法*/
			that._createPoker(i,r);
		});
		/*目标容器清除浮动*/
		this.$targetEl.addClass("clearBoth");
	},
	/*创建扑克方法*/
	_createPoker:function(i,r){
		var that=this;
		var $poker=$("<div class='poker'>");
		var $back=$("<div class='back b "+r.backClass+"'>");
		var $face=$("<div class='face f'>");
		$face.append(r.faceContent);
		$poker.append($back);
		$poker.append($face);
		this.$targetEl.append($poker);
		
		/*通过定时器，定义延时翻转动画*/
		setTimeout(function(){
			/*扑克反转*/
			that.rotateAnim($poker);
			/*Transition动画执行结束事件*/
//			$poker.bind("webkitTransitionEnd",function(){
//				console.log(i);
//				that.chaos();
//			})
			/*通过定时器，等在背面向上时，将扑克打乱顺序*/
			setTimeout(function(){
				that.chaos();
			},350);
			/*扑克元素添加点击事件*/
			$poker.bind("click",function(){
				/*记录，当前点击下标，目的，记录当前点击位置*/
				var i=$(this).index();
				alert("真笨，这都记不住！");
				/*判断用户是否只允许点击一次*/
				if(that.config.onlyOnce){
					/*清除所有扑克点击事件*/
					that.$targetEl.children().unbind("click");
				}
				/*判断当前被选扑克，是否不允许被抽中的*/
				if(r.noChoise){
					/*出千*/
					that.tazza(this)
				}
				/*调用扑克翻转动画，并指定当前点击位置的扑克*/
				that.rotateAnim(that.$targetEl.children().eq(i));
			})
		},1000);
		
	},
	/*扑克翻转动画*/
	rotateAnim:function($poker){
		var $thisChilds=$poker.children();
			$thisChilds.each(function(){
				if($(this).hasClass("b")){
					$(this).removeClass("b");
					$(this).addClass("f");
				}else if($(this).hasClass("f")){
					$(this).removeClass("f");
					$(this).addClass("b");
				}	
			});
	},
	/*打乱扑克现有顺序*/
	chaos:function(){
		var $pokers=this.$targetEl.children();
		$pokers.sort(function(){
			return Math.random()*10>5?1:-1;
		});
		this.$targetEl.append($pokers);
	},
	/*出千方法*/
	tazza:function(poker){
		var $pokers=this.$targetEl.children();
		var i=$(poker).index();
		if(i==0){
			 this.$targetEl.append($pokers[i]);
		}else{
			this.$targetEl.prepend($pokers[i]);
		}
	}
}
