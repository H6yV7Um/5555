var host=commonCla.hostBase+"/v15";

var orderAdrList=function(){
	var url=host+"/address?jwt_token="+get_token();
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			var current_count=$(".firm_ardList li").length;
			var adrData=ret.data.page_data;
			var adrHtml=""
			if(adrData.length>0){
				for (var i = 0; i < adrData.length; i++) {
					var status_img='<img src="assets/images/icon-circle.png" />'
					if(adrData[i].status==1){
						status_img='<img src="assets/images/icon-checked.png" />';
						var first_ard='<div class="user_infos">'+
										'<img src="assets/images/icon-location.png" class="icon_loc">'+
										'<span class="loc_name">'+adrData[i].consignee+'</span>'+
										'<span class="loc_phone">'+adrData[i].mobile+'</span>'+
									'</div>'+
									'<div class="loc_infos">'+
										'地址：'+adrData[i].province+adrData[i].city+adrData[i].district+adrData[i].address+
									'</div>'
						$(".hasAdr").html(first_ard);

					}
					adrHtml+='<li>'+
						'<div class="user_infos">'+
							'<img src="assets/images/icon-location.png"  class="icon_loc">'+
							'<span class="loc_name">'+adrData[i].consignee+'</span>'+
							'<span class="loc_phone">'+adrData[i].mobile+'</span>'+
							'<div class="loc_infos">'+
								'地址：'+adrData[i].province+adrData[i].city+adrData[i].district+adrData[i].address+
							'</div>'+
						'</div>'+
						'<div class="btn_lists">'+
							'<div class="defalt_adr">'+status_img+'<span>默认地址</span>'+
							'</div>'+
						'</div>'+
					'</li>'	
				};
				$(".firm_ardList").html(adrHtml)
			}else{
				$(".hasAdr").hide();
				$(".noAdr").show();
			}

		}else if(ret.code=="401"){
			htmlAlert("登录信息失效","<a class='btn_relogin' >重新登录</a>")
		}

	})
	
}
var initFirm=function(){
	orderAdrList();
	$(".btn_confirm").click(function(){
		$(".order_pay").slideDown();
		var h=$(window).height()+$(window).scrollTop();
		$(".bg_overflow").css("height",h)
		$(".bg_overflow").show();
	})
	$(".icon_close").click(function(){
		$(".order_pay").slideUp();
		$(".bg_overflow").hide();
	})

	$(".order_location").click(function(){
		$(".addressCon").slideDown(150);
	})
	$(".icon_back").click(function(){
		$(".addressCon").slideUp(150);
	})
}
$(function(){
	if($("#hide_info").attr("source")=="firm"){
		initFirm()
	}else{

	}
	
})