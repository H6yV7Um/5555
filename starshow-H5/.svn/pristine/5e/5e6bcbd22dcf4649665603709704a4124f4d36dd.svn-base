var host=commonCla.hostBase+"/v15";
var tmp_bridge;
var clientFun=function(bridge){
	tmp_bridge=bridge
}
//下一步操作
var nextStepFun=function(data,bridge){
	if (data.nextStep == '1') { //登录
      if (get_token() == "") {
        login_token = data.jwt_token;
        window.location.href = "business/orderList.html?jwt_token=" + data.jwt_token;
      }
    }else if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
       window.location.href = "orderList.html?jwt_token=" + data.jwt_token;
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
var cutName=function(str,length){
  var finalStr=str;
  if(str.length>length){
    finalStr=str.substr(0,length)+"..."
  }
  return finalStr;
}
var initOrderList=function(data,me){
	var page_data=data.data.page_data;
	var liHtml="";
	for (var i = 0; i < page_data.length; i++) {
		var orders=page_data[i].orders;
		var prodInfo="";
		var attrs="";
		var cla_more="";
    
    var order_num=0;
    if(orders.length==0){
    }else if(orders.length<=1 && orders.length>0){
    order_num=orders[0].number;
			prodInfo='<div class="prodInfo">'+
							'<img src="'+orders[0].goods_cover+'!250x250"  class="prod_cover"/>'+
							'<div class="prod_desc">'+
								'<div class="prod_desc_con">'+
									'<h1>'+orders[0].goods_name+'</h1>'+
									'<p>选择：'+linkAttrs(orders[0].attrs)+'</p>'+
								'</div>'+
							'</div>'+
						'</div>'

		}else {
			cla_more="more";
			for(var a=0;a<orders.length;a++){
        order_num+=Number(orders[a].number);
				prodInfo+='<div class="prodInfo">'+
							'<img src="'+orders[a].goods_cover+'!250x250"  class="prod_cover"/>'+
						'</div>'

			}

		}
		//1待付款2待发货(已付款)3待收货(已发货)4已完成5已关闭6申请中7退款中8已退货
		var order_status=page_data[i].order_status;
		var str_order_status="";
		var btnList="";

		if(order_status==1){
			str_order_status='<span class="fr order_status c2">'+
								'待用户付款'+
							  '</span>'

		}else if(order_status==2){
			str_order_status='<span class="fr order_status c2">'+
								'待发货'+
							  '</span>'
			btnList='<div class="btn_sendOut">发货</div>'
		}else if(order_status==3){
			str_order_status='<span class="fr order_status c3">'+
								'待买家收货'+
							  '</span>'
		}else if(order_status==4){
			str_order_status='<span class="fr order_status c3">'+
								'已完成'+
							  '</span>'
		}else if(order_status==5){
			str_order_status='<span class="fr order_status c4">'+
								'已关闭'+
							  '</span>'
		}else if(order_status==6){
			str_order_status='<span class="fr order_status c1">'+
								'退款申请待处理'+
							  '</span>'
			btnList='<div class="btn_toDetail">查看售后详情</div>'
		}else if(order_status==7){
			str_order_status='<span class="fr order_status c1">'+
								'等待买家回寄'+
							  '</span>'
		}else if(order_status==8){
			str_order_status='<span class="fr order_status c1">'+
								'买家已经寄回，请确认收货'+
							  '</span>'
		}else if(order_status==9){
			str_order_status='<span class="fr order_status c3">售后已成功</span>'
		}else if(order_status==10){
			str_order_status='<span class="fr order_status c2">平台介入中</span>';
		}
		liHtml+='<li  orderid="'+page_data[i].id+'"><div shop_id="'+page_data[i].user.id+'" class="list_header" >'+
					'<div class="fl shopInfo">'+
						'<img src="'+page_data[i].user.head_pic+'"  class="shop_cover"/>'+
						'<span>'+cutName(page_data[i].user.name,10)+'</span>'+
					'</div>'+str_order_status+
				'</div>'+
				'<div class="list_products '+cla_more+'">'+
					'<div class="scroller">'+prodInfo+'</div>'+
				'</div>'+
				'<div class="list_price">'+
					'<div class="fl">'+
						'<p>实付<span class="prod_price">￥'+page_data[i].actual_payment+'</span></p>'+
						'<p class="col_grey">共<span class="prod_num">'+order_num+'</span>件商品</p>'+
					'</div>'+
					'<div class="fr">'+btnList+'</div>'+
				'</div></li>'

		

	};

	var olNum=$(".orderList li").length;

	if(olNum<=0 && liHtml==""){
	//无数据
		$(".dropload-down").remove();
      if($(".noData").html()==undefined){
       $(".orderMain").append("<div class='noData'><p>暂无数据</p></div>")
      }
	  	
	}else if(olNum<=0 && liHtml!=""){
		//第一页数据
		$(".noData").remove();
		$(".orderList").append(liHtml);
		if(me!=undefined){me.resetload();}
	}else if(olNum>=0 && liHtml==""){
		//第二页无数据
		$(".noData").remove();
		$(".dropload-down").html("")
	}else if(olNum>=0 && liHtml!=""){
		//第二页有数据
		$(".noData").remove();
		$(".orderList").append(liHtml);
		if(me!=undefined){me.resetload();}
	}

	/*if($(".orderList li").length<=0 && liHtml==""){
		if(me!=undefined){me.resetload();}
		$(".dropload-refresh").html("");
	  	$(".orderMain").append("<div class='noData'><p>暂无数据</p></div>")
	}else{
	  if(liHtml!="" && $(".orderList li").length<=0){
	  	$(".noData").remove();
	  	setTimeout(function(){
		   $(".orderList").append(liHtml);
		    if(me!=undefined){me.resetload();}
		 },400)
	  }else{
      $(".orderList").append(liHtml);
	  	if(me!=undefined){me.resetload();}
	  	//$("body").append("<div class='noData'><p>暂无数据</p></div>")
	  
	  }
	}*/
	
	
}
var getOrderList=function (me) {
	var url=host+"/order/business";
	var jwt_token=commonCla.analyzParams("jwt_token");
	var status=$(".listMenu .cur").index();
	var current_count=$(".orderList li").length;
	var params={
		"jwt_token":jwt_token,
		"current_count":current_count,
		"status":status
	}
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			initOrderList(ret,me);

		}else if(ret.code=="401"){
			reloginAlert(tmp_bridge,"重新登录","您的登录信息失效，请重新登录");
			// sAlert("登录信息失效，请重新登录");
       		$(".dropload-down").remove();
			//htmlAlert("","<a class='btn_relogin_underline' >您的登录信息失效，点击重新登录</a>")
		}else{
    	sAlert(ret.error);
      $(".dropload-down").remove();
    }

	},params)
}
var initOrderPage=function(me){
	$(".listMenu li").click(function(){
    $(".noData").remove();
		$(".listMenu li").removeClass("cur");
		$(this).addClass("cur");
		$(".orderList").html("");
		 //getOrderList(me);
     
     //清除
     $(".dropload-down").remove();
     $('.orderMain').dropload({
	      scrollArea :$(".orderMain"),
	      loadDownFn : function(me){
	          getOrderList(me);
	      }
	  });
	})
	/*$(".orderList").on("click",".list_header",function(){
		var shop_id=$(this).attr("shop_id");
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="../shophome.html?id="+shop_id+"&jwt_token="+jwt_token;

	})*/
	//订单详情
	$(".orderList").on("click",".list_products",function(){
		var order_id=$(this).parents("li").attr("orderId");
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="../orderDetail.html?id="+order_id+"&stype=sale&jwt_token="+jwt_token;
	})
	//售后详情
	$(".orderList").on("click",".btn_toDetail",function(){
		var order_id=$(this).parents("li").attr("orderId");
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="applyDetail.html?id="+order_id+"&stype=sale&jwt_token="+jwt_token;
	})
	//发货
	$(".orderList").on("click",".btn_sendOut",function(){
		var order_id=$(this).parents("li").attr("orderId");
		var jwt_token=commonCla.analyzParams("jwt_token");
		window.location.href="delivery.html?id="+order_id+"&stype=sale&jwt_token="+jwt_token;
	})
	
	//getOrderList();
}
$(function(){
	initOrderPage();
  setTimeout(function(){
    	$('.orderMain').dropload({
  	      scrollArea :$(".orderMain"),
  	      loadDownFn : function(me){
  	          getOrderList(me);
  	      }
  	  });
  },205)

	
})