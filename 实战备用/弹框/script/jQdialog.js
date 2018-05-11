function JQDialog(opt){
	this.config={
		width:300,
		height:200,
		left:$(window).width()/2-150,
		top:$(window).height()/2-100,
		text:"",
		title:"",
		btnClass:"none",/*close,none,confirm*/
		class:"",
		confirmCallback:function(){
			
		},
		closeCallback:function(){
			
		}
	}
	$.extend(this.config,opt);
	this.$dialogEl=null;
	console.log(this)
}
JQDialog.prototype={
	_create:function(){
		var that=this;
		var $dialogEl=$("<div class='dialog "+this.config.class+"'>");
		var $xxbtn=$("<div class='dialog_xxbtn'>x</div>");
		var $textBox=$("<div class='dialog_textBox'>"+this.config.text+"</div>");
		var $titleBox=$("<div class='dialog_titleBox'>"+this.config.title+"</div>");
		var $btnBox=$("<div class='dialog_btnBox'></div>");
		$dialogEl.css({
			width:this.config.width,
			minHeight:this.config.height,
			top:this.config.top,
			left:this.config.left
		});
		if(this.config.title){
			$dialogEl.append($titleBox);
		}
		
		$dialogEl.append($xxbtn);
		$dialogEl.append($textBox);
		if(this.config.btnClass=="close"){
			var $closeBtn=$("<button>关闭</button>"); 
			$btnBox.append($closeBtn);
			$dialogEl.append($btnBox);
			$closeBtn.bind("click",function(){
				console.log(this)
				that._delete();
			})
		}
		
		
		$("body").append($dialogEl);
		$xxbtn.bind("click",function(){
			that._delete();
		})
		this.$dialogEl=$dialogEl;
	},
	_delete:function(){
		this.$dialogEl.remove();
		this.config.closeCallback();
	},
	drag:function(){
		
	}
}
/*重写源生alert方法*/
window.alert=function(text){
	var thisalert=new JQDialog({
		text:text
	});
	thisalert._create();
}

;(function($){
	$.fn.mydialog=function(opt){
		var config={
			text:"",
			width:300,
			height:200
		}
		$.extend(config,opt);
		//console.log(this);
		this.bind("click",function(){
			var pos=$(this).offset();
			var thisdialog=new JQDialog({
				left:pos.left,
				top:pos.top+$(this).height(),
				text:config.text
			});
			thisdialog._create();
		})
	}
})(jQuery)

