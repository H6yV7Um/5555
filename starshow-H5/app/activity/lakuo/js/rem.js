(function(win,doc){
	function change(){
		doc.documentElement.style.fontSize=
		20/320*doc.documentElement.clientWidth+'px';
	}
	 change();
	win.addEventListener('resize',change,false);	
})(window,document)