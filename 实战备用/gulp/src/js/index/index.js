require("../common/lazyload.js");
require("../common/demoUtils.js");

var IScroll = require("../common/iscroll.js");
var categoryTpl = require("./category_item.mustache");
var goodsItemTpl = require("./goods_item.mustache");

function Page(){
	this.categoryElem = $(".js-category");
	this.goositemElem = $(".js-goods-list");
	this.loadNotice = $(".loadNotice");
	this.flag = false;
}

$.extend(Page.prototype, {
	
	init: function(){
		this.promoteEfficiency();
		this.getCategoryData();
	},
	
	promoteEfficiency: function(){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, this.isPassive() ? {
			capture: false,
			passive: false
		} : false);
	},
	
	getCategoryData: function(){
		$.ajax({
			type:"get",
			url:"/mock/index.json",
			async:true,
			success: $.proxy(this.handleGetDataSucc, this)
		});
	},
	
	handleGetDataSucc: function(response){
		var data = response.data,
			categoriesHtml = categoryTpl({categories: data.category});
		goodsitemHtml = goodsItemTpl({goodsitem: data.goosItem});
		
		this.categoryElem.html(categoriesHtml);
		this.goositemElem.append(goodsitemHtml);
		
		this.initIscroll();
		this.lazyload();
		/*var html = "";
		
		for (var i = 0; i < categories.length; i++) {
			html += '<li class="category-item iconfont">'+ categories[i].icon +'</li>'
		}
		this.categoryElem.append(html);
		this.scroll.refresh();		//手动更新*/
	},
	
	initIscroll: function(){
		this.classifyScroll = new IScroll('.classify-wrapper', {
			scrollX: true, 
			scrollY: false 
		});
		this.goodsScroll = new IScroll('.goods-wrapper', {
			scrollX: false, 
			scrollY: true,
			probeType: 3,
			mouseWheel: true
		});
		this.bindEvents();
	},
	
	bindEvents: function(){
		this.goodsScroll.on("scroll", $.proxy(this.handleScrollDown, this));
		this.goodsScroll.on("scroll", $.proxy(this.handleScrollUp, this));
		this.goodsScroll.on("scrollEnd", $.proxy(this.handleScrollEnd, this));
	},
	
	handleScrollDown: function(){
		$(window).trigger("scroll");
	},
	
	handleScrollUp: function(){
		if(!this.loading){
			if(this.goodsScroll.y > 100){
				this.loadNotice.show();
				this.flag = true;
			}else{
				this.loadNotice.hide();
			}
		}
	},
	
	handleScrollEnd: function(){
		if(this.flag){
			this.loading = true;
			this.flag = false;
			setTimeout($.proxy(this.handleGetData, this), 500)
		}
	},
	
	handleGetData: function(){
		this.goositemElem.append(goodsitemHtml);
		this.loading = false;
		this.goodsScroll.refresh();
		this.lazyload();
	},
	
	lazyload: function(){
		$(".lazy").lazyload();
	},
	
	isPassive: function() {
	    var supportsPassiveOption = false;
	    try {
	        addEventListener("test", null, Object.defineProperty({}, 'passive', {
	            get: function () {
	                supportsPassiveOption = true;
	            }
	        }));
	    } catch(e) {}
	    return supportsPassiveOption;
	}
	
})

var page = new Page();
page.init();
