var host=commonCla.hostBase+"/v15";

var login_token="";
var tempBridge="";
var clientFun=function(bridge){
tempBridge=bridge
	$(".btnsCon").on("click",".btn_toPay",function(e){
		var order_amount=$(".js_price03").html().split("￥")[1];
		var order_id=commonCla.analyzParams("id");
		e.preventDefault()
		setBridgeCallHandler(bridge, {
			'action': "16",
			'order_id':order_id,
			'next_step':"6",
			'order_amount':order_amount
		})
	})

	//取消订单
	$(".btnsCon").on("click",".btn_buyer_cancel",function(){
		cancleOrder(bridge);
	})
}
//下一步操作
var nextStepFun=function(data,bridge ){
	if (data.nextStep == '1') { //登录
      if (get_token() == "") {
        login_token = data.jwt_token;
        var id=commonCla.analyzParams("id");
        window.location.href = "orderDetail.html?id="+id+"&jwt_token=" + data.jwt_token;
      }
    }else if (data.nextStep == '6') { //支付
        login_token = data.jwt_token;
        var id=commonCla.analyzParams("id");
        window.location.href = "orderDetail.html?id="+id+"&jwt_token=" + data.jwt_token;
    }else if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
        var id=commonCla.analyzParams("id");
        window.location.href = "orderDetail.html?id="+id+"&jwt_token=" + data.jwt_token;
    }
}
//缓冲
var loadding=function(showType,cla){
	if(showType=="show"){
		$(".loadding").show();
		$("."+cla).hide();
	}else{
		$(".loadding").hide();
		$("."+cla).show();
	}
	
}
var linkAttrs=function(attrlist){
	var str_attr=""
	for (var b = 0; b < attrlist.length; b++) {
		//str_attr+=attrlist[b].attr.attr_value+"、";
			str_attr+=attrlist[b]+"、";
	};
	return str_attr.substr(0,str_attr.length-1)
}
var obj_status=function(data,type){	
		var order_status=data.data.order_status;
		var over_time=data.data.over_time;
		var current_time=data.current_time;
		var str_order_status="";
		var btnList="";
		var str_counter="";
		if(order_status!=4 && order_status!=5){
			var obj_counter=commonCla.initCountdown(current_time,over_time);
			var str=obj_counter.d+"天"+obj_counter.h+"小时"+obj_counter.m+"分钟"
		}
		//btn_afterSale
		if(order_status==1){
			str_order_status='<span>待用户付款</span>'
			str_counter="请在"+str+"内完成付款"
			if(type!="sale"){
				btnList='<div class="btn_buyer_cancel bg_grey">取消订单</div>'+
						'<div class="btn_toPay bg_red">付款</div>'
			}

		}else if(order_status==2){
			str_order_status='<span>待发货</span>'
			if(type=="sale"){
				btnList='<div class="btn_sendOut bg_red w100p">发货</div>'
			}else{
				btnList='<div class="btn_toService bg_red w100p">申请售后</div>'
			}
			str_counter="商家在"+str+"内完成发货"
		}else if(order_status==3){
			str_order_status='<span>待收货</span>'
			str_counter="买家在"+str+"内确认收货"

			if(type!="sale"){
				btnList='<div class="btn_toService bg_grey w20p">申请售后</div><div class="btn_confirm bg_red w80p">确认收货</div>'
			}
		}else if(order_status==4){
			str_order_status='<span>已完成</span>'
			str_counter="订单已完成"
			if(type!="sale"){
				//btnList='<div class="btn_toService bg_red w100p">申请售后</div>'
        var counter=commonCla.initCountdown(current_time,over_time);
        if(counter.d>0 || counter.h>0|| counter.s>0){
          btnList='<div class="btn_toService bg_red w100p">申请售后</div>';
          setInterval(function(){
           commonCla.initCountdown(current_time,over_time);
            if(t<=0){
                $(".btnsCon").html("");
            }   
          },60000)
        }
			}
		}else if(order_status==5){
			str_order_status='<span>已关闭</span>'
			str_counter="订单已关闭"
		}else if(order_status==6){
			str_order_status='<span>退款申请待处理</span>'
			str_counter=str+"后系统将自动处理"
			if(type!="sale"){
				str_order_status='<span>申请提交成功，等待商家确认</span>'
			}
			btnList='<div class="btn_toServed bg_red w100p">进入售后详情</div>'
			
		}else if(order_status==7){
			str_order_status='<span>退款中</span>'
			
			if(type!="sale"){
				
				str_counter="请在"+str+"内填写物流信息"
			}else{
				str_order_status="商家已经同意退货，请寄回商品"
				str_counter=str+"后系统将默认关闭"
			}
			btnList='<div class="btn_toServed bg_red w100p">进入售后详情</div>'
		}else if(order_status==8){
			str_order_status='<span>买家已退货</span>'
			str_counter=str+"后系统将默认收货"
			if(type!="sale"){
				str_order_status="等待商家确认收货";
				
			}else{
				str_order_status="买家已经寄回，请确认收货";
			}
			btnList='<div class="btn_toServed bg_red w100p">进入售后详情</div>'
		}else if(order_status==9){
			str_order_status='<span>售后已成功</span>'
			str_counter="退款将于72小时内完成"
			btnList='<div class="btn_toServed bg_red w100p">进入售后详情</div>'
		}else if(order_status==10){
			str_order_status="商家未确认收货，平台将介入";
			str_counter='工作人员将在7个工作日内与您联系'
			btnList='<div class="btn_toServed bg_red w100p">进入售后详情</div>'
		}

		var obj={
			"status":str_order_status,
			"btnList":btnList,
			"counter":str_counter
		}
		return obj

}
var initDetail=function(data){
	var status_type=commonCla.analyzParams("stype")==""?"":"sale"
	var s_obj=obj_status(data,status_type);
	var ad_status_html='<h1>'+s_obj.status+'</h1>'+
				'<p>'+s_obj.counter+'</p>'
	$(".od_status").html(ad_status_html);
	$(".btnsCon").html(s_obj.btnList);

    $(".js_price01").html("￥"+data.data.order_amount);
    $(".js_price02").html("￥"+data.data.freight);
    $(".js_price03").html("￥"+data.data.actual_payment);
	var orders=data.data.orders;
	var li_html="";
	var userInfo='<img src="assets/images/icon-location.png" class="icon_loc">'+
				'<span class="loc_name">'+data.data.consignee+'</span>'+
				'<span class="loc_phone">'+data.data.mobile+'</span>'+
				'<div class="loc_infos">'+
					'地址：'+data.data.address+data.data.address_detail+
				'</div>'
	$('.user_infos').html(userInfo);

	var payTime="";
	if(data.data.pay_time!=null){
		payTime='<p>付款时间：'+data.data.pay_time+'</p>'
	}
	var order_info= '<p>订单编号：'+data.data.order_number+'</p>'+
					'<p>下单时间：'+data.data.created_at+'</p>'+payTime
					
	$(".od_order_info").html(order_info);
	for (var i = 0; i < orders.length; i++) {
		li_html+='<li>'+
				'<div class="prod_infos">'+
					'<img src="'+orders[i].goods_cover+'!250x250" class="order_prodCover">'+
					'<div class="o_prod_desc">'+
						'<p class="o_prod_tit">'+orders[i].goods_name+'</p>'+
						'<p class="o_prod_choose">选择：'+linkAttrs(orders[i].attrs)+'</p>'+
						'<p class="o_prod_price"><span class="js_prod_price">￥'+orders[i].transaction_price+
						'</span><span class="prod_num">x'+orders[i].number+'</span></p>'+
					'</div>'+
					'<!--<div class="btn_afterSale">售后</div>-->'+
				'</div>'+
			'</li>'
		
	};
	$(".od_prod_list").html(li_html);
	/*if(status_type=="sale"){
		$(".btn_afterSale").hide();
	}else{

	}*/
}
var getDetailData=function(){
	var id=commonCla.analyzParams("id");
	var url=host+"/order/"+id+"?jwt_token="+commonCla.analyzParams("jwt_token");
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			initDetail(ret);
			loadding("hide","o_detail_main");
		}else if(ret.code=="401"){
			reloginAlert(tempBridge,"重新登录","您的登录信息失效，请重新登录");
		}else{
			sAlert(ret.error);
		}

	})
}
var cancleOrder=function(bridge){
	loadding("show")
	var id=commonCla.analyzParams("id");
	var url=host+"/order/"+id+"/cancel?jwt_token="+commonCla.analyzParams("jwt_token");
	commonCla.ajaxCommonFun(url,"get",function(ret){
		loadding("hide")
		if(ret.code=="200"){ 
			sAlert("订单成功取消");
			$(".od_status h1").html("已关闭");
			$(".od_status p").html("订单已关闭");
			$(".btnsCon").html("");
			setBridgeCallHandler(bridge, {
				'action': "19"
			})
		}else{
			sAlert(ret.error);
		}

	})
}
//确认收货 
var conformReceipt=function(){
	var jwt_token=commonCla.analyzParams("jwt_token");
  var id=commonCla.analyzParams("id");
	var url=host+"/order/"+id+"/confirm?jwt_token="+jwt_token;
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			sAlert(ret.data,function(){
				getDetailData();
			})
		}else{
			sAlert(ret.error)
		}
	})
}
var initDetailPage=function(){
	getDetailData();
	//售后详情
	$(".btnsCon").on("click",".btn_toDetail",function(){
		var order_id=commonCla.analyzParams("id");
		var jwt_token=commonCla.analyzParams("jwt_token");
		var goods_id=1;
		window.location.href="business/applyDetail.html?id="+order_id+"&goods_id="+goods_id+"&jwt_token="+jwt_token;
	})
	//发货
	$(".btnsCon").on("click",".btn_sendOut",function(){
		var order_id=commonCla.analyzParams("id");;
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="business/delivery.html?id="+order_id+"&stype=sale&jwt_token="+jwt_token;
	})
	
	//发起售后
	$(".btnsCon").on("click",".btn_toService",function(){
		var order_id=commonCla.analyzParams("id");
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="dispute.html?id="+order_id+"&jwt_token="+jwt_token;
	})
	//进入售后页面
	$(".btnsCon").on("click",".btn_toServed",function(){
		var order_id=commonCla.analyzParams("id");
		var jwt_token=commonCla.analyzParams("jwt_token");
    var stype=commonCla.analyzParams("stype");
    if(stype=="sale"){
    		window.location.href="business/applyDetail.html?id="+order_id+"&jwt_token="+jwt_token;
    }else{
      		window.location.href="disputestatus.html?id="+order_id+"&jwt_token="+jwt_token;
    }
	})
	//支付
	/*$(".btnsCon").on("click",".btn_toPay",function(){
    
    	$(".truePay").html($(".js_price03").html())
		$(".order_pay").slideDown();
		var h=$(window).height()+$(window).scrollTop();
		$(".bg_overflow").css("height",h)
		$(".bg_overflow").show();
	})*/
	$(".icon_close").click(function(){
		$(".order_pay").slideUp();
		$(".bg_overflow").hide();
	})
	$(".payment p").click(function(){
		$(".payment p").removeClass("sel");
		$(this).addClass("sel");
	})
	//确认收货
	$(".btnsCon").on("click",".btn_confirm",function(){
		conformAlert("确定确认收货吗？",function(){
	        conformReceipt();
	      })

	})

}
$(function() {
	initDetailPage();
})