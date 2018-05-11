$(function(){
	init();
})

function init(){
	var myPokers=new RotatePoker({
		pokers:[{
			backClass:"bd",/*背面样式，ba,bb,bc,bd*/
			faceContent:"1",/*正面显示内容，支持html标记*/
			val:1
		},
		{
			backClass:"ba",/*背面样式，ba,bb,bc,bd*/
			faceContent:"2",/*正面显示内容，支持html标记*/
			val:2
		},
		{
			backClass:"bc",/*背面样式，ba,bb,bc,bd*/
			faceContent:"3",/*正面显示内容，支持html标记*/
			val:3
		},
		{
			backClass:"bb",/*背面样式，ba,bb,bc,bd*/
			faceContent:"特等奖",/*正面显示内容，支持html标记*/
			val:4,
			target:true,
			noChoise:true
		}],
		targetEl:"#mainBox",
		onlyOnce:false
	});
	$("#gamealert").html("请找出4！！");
}
/*********************翻拍效果测试**************************/
//	$(".poker").bind("click",function(){
//		var $thisChilds=$(this).children();
//		$thisChilds.each(function(){
//			if($(this).hasClass("b")){
//				$(this).removeClass("b");
//				$(this).addClass("f");
//			}else if($(this).hasClass("f")){
//				$(this).removeClass("f");
//				$(this).addClass("b");
//			}
//			
//		});
//	})