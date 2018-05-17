require("../common/lazyload.js");

var IScroll = require("../common/iscroll.js");

function Page(){
	this.cartList = $(".js-cart-list");

}

$.extend(Page.prototype, {
	
	init: function(){
		this.initIscroll();
		this.lazyload();
	},
	
	initIscroll: function(){
		this.cartScroll = new IScroll('.cart-wrapper', {
			scrollX: false, 
			scrollY: true
		});
		
		this.bindEvents();
	},
	
	bindEvents: function(){
		this.cartScroll.on("scroll", $.proxy(this.handleScroll, this));
	},
	
	handleScroll: function() {
		
	},
	
	lazyload: function(){
		$(".lazy").lazyload();
	}
	
})

var page = new Page();
page.init();
