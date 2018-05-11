var host=commonCla.hostBase+"/v15";
// var id = 1;
var id = commonCla.analyzParams("id"); 
var jwt_token = commonCla.analyzParams("jwt_token");
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
var tmp_bridge;

/* 客户端交互 */
var clientFun = function (bridge) {
  tmp_bridge=bridge
	//过期重新登录
	$(".dialog_tip").on("click", ".btn_relogin", function (e) {
		e.preventDefault()
		setBridgeCallHandler(bridge, {
			'action': '10',
			'nextStep': '10'
		})
	})

}
var nextStepFun = function (data, bridge) {
	if (data.nextStep == '1') { //登录
		if (get_token() == "") {
			login_token = data.jwt_token;
			//window.location.href = "index.html?jwt_token=" + data.jwt_token;
		}
	} else if (data.nextStep == '8') {
		shareActivity();
	} else if (data.nextStep == '10') { //过期登录
		login_token = data.jwt_token;
		window.location.href = "disputeApply.html?jwt_token=" + data.jwt_token;
  }
}

/*同意收货或拒绝*/
var agreeFun=function(isAgree,id,fun,reason){
  loadding("show");
	var jwt_token=commonCla.analyzParams("jwt_token");
	var choice=1;
	if(!isAgree){
		 choice=2
	}
	var url=host+"/order/"+id+"/apply?jwt_token="+jwt_token+"&choice="+choice+"&refuse_reason="+reason;
	commonCla.ajaxCommonFun(url,"get",function(ret){
    loadding("hide");
		if(ret.code=="200"){
			sAlert(ret.data,fun)
		}else{
			sAlert(ret.error,fun)
		}
	})
}
//确认退货 
var conformReceipt=function(isAgree,id,fun,reason){
	var choice=1;
	if(!isAgree){
		 choice=2
	}
	var jwt_token=commonCla.analyzParams("jwt_token");
	var url=host+"/order/"+id+"/refund?jwt_token="+jwt_token+"&choice="+choice+"&refuse_reason="+reason;
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			sAlert(ret.data,fun)
		}else{
			sAlert(ret.error,fun)
		}
	})
}
// 判断退货原因
var reason = function (num) {
var t="";
    switch (num) {
        case 1: t = "尺码拍错(不喜欢)效果差"; break;
        case 2: t = "质量问题"; break;
        case 3: t = "面料材质与商品描述不符"; break;
        case 4: t = "大小尺寸与商品描述不符"; break;
        case 5: t = "颜色(款式)图案与描述不符"; break;
        case 6: t = "商家发错货"; break;
        case 7: t = "假冒品牌"; break;
        case 8: t = "收到商品少件或破损"; break;
    }
    return t;
}
// 我是商家
var business = {
    getPageData : function () {
        var params = {}
        if (jwt_token != "" && jwt_token != undefined) {
            params.jwt_token = jwt_token
        }
        var url = host + "/shop/" + id;
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if (ret.code == "200") {
                business.initPage(ret)
            }
        }, params)
    },

    initPage : function (ret) {
        var data = ret.data;
        $(".head .income").html(data.total_income)
    }
}
var obj_status=function(data,current_time){
    t=0
		var order_status=data.order_status;
		var over_time=data.over_time;
		var current_time=current_time;
		var str_order_status="";
		var btnList="";
		var str_counter="";
		if(order_status!=4 && order_status!=5){
			var obj_counter=commonCla.initCountdown(current_time,over_time);
			var str=obj_counter.d+"天"+obj_counter.h+"小时"+obj_counter.m+"分钟"
		}
		//btn_afterSale

		if(order_status==1){
				str_order_status='<span class="fr order_status c2">'+
									'待用户付款'+
								  '</span>'
				str_counter="请在"+str+"内完成付款"
			}else if(order_status==2){
				str_order_status='<span class="fr order_status c2">'+
									'待发货'+
								  '</span>'
				btnList='<div class="btn_sendOut">发货</div>'
			    str_counter="商家在"+str+"内完成发货"
			}else if(order_status==3){
				str_order_status='<span class="fr order_status c3">'+
									'待买家收货'+
								  '</span>'
				str_counter="买家在"+str+"内确认收货"
			}else if(order_status==4){
				str_order_status='<span class="fr order_status c3">'+
									'已完成'+
								  '</span>'
				str_counter="订单已关闭"
			}else if(order_status==5){
				str_order_status='<span class="fr order_status c4">'+
									'已关闭'+
								  '</span>'
				str_counter="订单已完成"
			}else if(order_status==6){
				str_order_status='<span class="fr order_status c1">'+
									'退款申请待处理'+
								  '</span>'
			    if(data.service!=1){
			    	btnList='<div class="refuse btn">拒绝</div>'+
                        '<div class="accept btn">接受</div>'
			    }else{
			    	btnList='<div class="refuse btn">拒绝</div>'+
                       '<div class="accept btn">接受</div>'
			    }
				
                str_counter=str+"后系统将自动处理"
			}else if(order_status==7){
				str_order_status='<span class="fr order_status c1">'+
									'等待买家回寄'+
								  '</span>'
				str_counter=str+"后系统将默认关闭";
                
			}else if(order_status==8){
				str_order_status='<span class="fr order_status c1">'+
									'买家已经寄回，请确认收货'+
								  '</span>'
				btnList='<div class="refuse btn">拒绝</div>'+
                        '<div class="btn_comfirm btn">确认收货</div>'
                str_counter="商家还有"+str+"确认收货"
			}else if(order_status==9){
				str_order_status='<span class="fr order_status c3">'+
									'售后已成功'+
								  '</span>'
                str_counter="退款将于72小时内完成"
			}else if(order_status==10){
				str_order_status='<span class="fr order_status c1">'+
									'等待平台介入'+
								  '</span>'
                str_counter="平台工作人员将在7个工作日内与您联系"
			}

		var obj={
			"status":str_order_status,
			"btnList":btnList,
			"counter":str_counter
		}
		return obj

}
// 获取售后列表
var applyList = {
	initPage:function(){
		//applyList.getApplyList();
		$(".orderList").on("click",".list_products",function(){
			var id=$(this).parents("li").attr("orderId");
			window.location.href='applyDetail.html?id='+id+"&jwt_token="+commonCla.analyzParams("jwt_token")
		})
	},
	getApplyList : function (me) {
		var url = host + "/user/service";
		var current_count = $(".orderList li").length;
		var params = {
			"jwt_token": jwt_token,
			"current_count": current_count,
			"status": 4
		}
		commonCla.ajaxCommonFun(url, "get", function (ret) {
			if (ret.code == "200") {
				applyList.initApplyList(ret,me);

			} else if (ret.code == "401") {
      	  reloginAlert(tmp_bridge,"重新登录","您的登录信息失效，请重新登录");
          $(".dropload-down").hide();
				// htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
			} else {
				sAlert_auto("服务器出小差啦~", 2000)
			}
		}, params)
	},
	initApplyList : function (data,me) {
		var page_data=data.data.page_data;
		var liHtml="";
		for (var i = 0; i < page_data.length; i++) {
			var orders=page_data[i].goods;
			var prodInfo="";
			var attrs="";
			var cla_more="";
      var order_num=0;

			if(orders.length==0){
      }else if(orders.length<=1 && orders.length>0){
        order_num=orders[0].number;
				prodInfo='<div class="prodInfo">'+
								'<img src="'+orders[0].cover+'!250x250"  class="prod_cover"/>'+
								'<div class="prod_desc">'+
									'<div class="prod_desc_con">'+
										'<h1>'+orders[0].name+'</h1>'+
										'<p>选择：'+linkAttrs(orders[0].attrs)+'</p>'+
									'</div>'+
								'</div>'+
							'</div>'

			}else {
				cla_more="more";
				for(var a=0;a<orders.length;a++){
          order_num+=Number(orders[a].number);
					prodInfo+='<div class="prodInfo">'+
								'<img src="'+orders[a].cover+'!250x250"  class="prod_cover"/>'+
							'</div>'

				}

			}
			//1待付款2待发货(已付款)3待收货(已发货)4已完成5已关闭6申请中7退款中8已退货9确认退款10商家拒绝退款
			var order_status=page_data[i].order_status;
			var obj=obj_status(page_data[i],data.current_time);
			var str_order_status=obj.status;
			var btnList=obj.btnList;
			//1仅退款2退款退货3换货
			var str_service="退款退货";
			if(page_data[i].service==1){
				str_service="仅退款";
			}
			liHtml+='<li  orderid="'+page_data[i].order_id+'"><div  class="list_header" >'+
						'<div class="fl shopInfo">'+
							'订单编号：'+
							'<span>'+page_data[i].order_number+'</span>'+
						'</div>'+str_order_status+
					'</div>'+
					'<div class="list_products '+cla_more+'">'+
						'<div class="scroller">'+prodInfo+'</div>'+
					'</div>'+
					'<!--<div class="list_price">'+
						'<div class="fl">'+
							'<p>实付<span class="prod_price">￥'+page_data[i].total_amount+'</span></p>'+
							'<p class="col_grey">共<span class="prod_num">'+order_num+'</span>件商品</p>'+
						'</div>'+
					'</div>-->'+
					
					'<div class="order-des">'+
                            '<div class="apply-type">'+
                                '<span>申请类型：</span>'+
                                '<span class="value">'+str_service+'</span>'+
                            '</div>'+
                            '<div class="apply-reason">'+
                                '<span>申请原因：</span>'+
                                '<span class="value">'+reason(parseInt(page_data[i].reason))+'</span>'+
                            '</div>'+
                            '<div class="apply-money">'+
                                '<span>申请金额：</span>'+
                                '<span class="value">&yen;'+page_data[i].total_amount+'</span>'+
                                '<span class="col_grey">(共<span class="prod_num">'+order_num+'</span>件商品)</span>'
                            '</div>'+
                        '</div>'+
                        '<div class="order-operate">'+btnList+'</div>'+
					'</li>'

			

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
		$(".dropload-load").html("没有更多数据");
	}else if(olNum>=0 && liHtml!=""){
		//第二页有数据
		$(".noData").remove();
		$(".orderList").append(liHtml);
		if(me!=undefined){me.resetload();}
	}
		/*setTimeout(function(){
		    $(".orderList").append(liHtml)
		    if(me!=undefined){ me.resetload();}
		  },300)*/
		
		
	}
}
// 申请详情页
var applyDetail = {
	initPage:function(){
		applyDetail.getDetailData();
	},
	getDetailData:function(){
		loadding("show","handle-page");
		var id=commonCla.analyzParams("id");
		var jwt_token=commonCla.analyzParams("jwt_token");
		var url=host+"/order/"+id+"/customerService?jwt_token="+jwt_token;
		commonCla.ajaxCommonFun(url,"get",function(ret){
			loadding("hide","handle-page");
			if(ret.code=="200"){
				var data=ret.data;
				$(".problem-des p").html(data.explain);
				var imgs="";
				var bigImgs="";
				for (var i = 0; i < data.voucher_pic.length; i++) {
					imgs+='<div class="img-outer">'+
                           ' <img src="'+data.voucher_pic[i]+'" alt="">'+
                        '</div>'
                        bigImgs+='<div class="swiper-slide">'+
					                '<img src="'+data.voucher_pic[i]+'" alt="">'+
					            '</div>'
				};
				$(".img-area").html(imgs);
				$("#pic-swiper .swiper-wrapper").html(bigImgs);
				var prods="";
				for (var i = 0; i < data.goods.length; i++) {
					prods+='<div class="product flex-row">'+
			                '<div class="product-img">'+
			                    '<img src="'+data.goods[i].cover+'!250x250" alt="">'+
			                '</div>'+
			                '<div class="product-info flex-column">'+
			                    '<div class="product-name two-line">'+data.goods[i].name+'</div>'+
			                    '<div class="product-size">'+
			                        '<span>选择</span>：'+
			                        '<span>'+linkAttrs(data.goods[i].attrs)+'</span>'+
			                    '</div>'+
			                    '<div class="product-price">'+
			                        '<span class="price">¥'+
			                            '<b>'+data.goods[i].price+'</b>'+
			                       ' </span>'+
			                        '<span class="amount">X'+
			                           ' <b>'+data.goods[i].number+'</b>'+
			                       ' </span>'+
			                   ' </div>'+
			               ' </div></div>'
					
				};

				$(".productCon").html(prods);
        
        	//1仅退款2退款退货 service
        	var refuse_reason="";
        		if(data.refuse_reason!="" && data.refuse_reason!=null && data.refuse_reason!=undefined){
        			 refuse_reason='<div>'+
					                '<span>拒绝理由：</span>'+
					                '<span>'+data.refuse_reason+'</span>'+
					            '</div>'
        		}
        		
				var disputeDesc='<div>'+
					                '<span>退货原因：</span>'+
					                '<span>'+reason(parseInt(data.reason))+'</span>'+
					            '</div>'+
                      '<div>'+
					                '<span>退货类型：</span>'+
					                '<span>'+(data.service==1?"仅退款":"退货退款")+'</span>'+
					            '</div>'+
					            '<div>'+
					                '<span>申请时间：</span>'+
					                '<span>'+data.created_at+'</span>'+
					            '</div>'+
					            '<div>'+
					                '<span>订单编号：</span>'+
					                '<span>'+data.order_number+'</span>'+
					            '</div>'+refuse_reason
				$(".dispute-des").html(disputeDesc);


				var obj=obj_status(data,ret.current_time);
				$(".tip").html("<p>"+obj.counter+"<p>");
				$(".tip2 p").eq(0).html(obj.status);
				$(".handle").html(obj.btnList)


			}else{
				sAlert(ret.error)
			}

		})

	},
    initSwiper: function (index) {
        var picSwiper = new Swiper('#pic-swiper', {
            initialSlide: index,
            observer: true,
            width: window.innerWidth,
            height: window.innerHeight
        })
    },

    handleClcikImg : function () {
        $(".img-area").on("click", ".img-outer", function () {
            var index = $(this).index()
            applyDetail.initSwiper(index);
            $(".pic-swiper").fadeIn()
        })

        $(".swiper-wrapper").on("click", function () {
            $(".pic-swiper").fadeOut()
        })
    }
}
// 发货
var linkAttrs=function(attrlist){
	var str_attr=""
	for (var b = 0; b < attrlist.length; b++) {
			str_attr+=attrlist[b]+"、";
	};
	return str_attr.substr(0,str_attr.length-1)
}
var delivery = {
	initDetail:function(ret){
		ret=ret.data;
		var adrHtml='<div>'+
	                    '<span>'+ret.consignee+'</span>'+
	                    '<span>'+ret.mobile+'</span>'+
	                '</div>'+
	                '<div class="ads">地址：'+ret.address+ret.address_detail+'</div>';
		$(".return-msg").html(adrHtml);
		var orders=ret.orders;
		var prodList="";
		for (var i = 0; i < orders.length; i++) {
			prodList+='<div  class="product flex-row">'+
                '<div class="product-img">'+
                    '<img src="'+orders[i].goods_cover+'!250x250" alt="">'+
                '</div>'+
               ' <div class="product-info flex-column">'+
                   ' <div class="product-name">'+orders[i].goods_name+'</div>'+
                    '<div class="product-size">'+
                       linkAttrs(orders[i].attrs)+
                    '</div>'+
                    '<div class="product-price">'+
                        '<span class="price">¥'+
                            '<b>'+orders[i].transaction_price+'</b>'+
                        '</span>'+
                        '<span class="amount">X'+
                            '<b>'+orders[i].number+'</b>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'
			
		};
		
		$(".product-list").html(prodList);
		$(".payment .value").html("￥"+ret.actual_payment)

	},
	//详情
	getDetailData:function(){
		loadding("show","delivery-page");
		var id=commonCla.analyzParams("id");
		var url=host+"/order/"+id+"?jwt_token="+commonCla.analyzParams("jwt_token");
		commonCla.ajaxCommonFun(url,"get",function(ret){
			loadding("hide","delivery-page");
			if(ret.code=="200"){
				delivery.initDetail(ret);
			}else{
				sAlert(ret.error);
			}

		})
	},
	// 发货
    handleSendGoods : function () {
		$(".delivery-page").on("click", ".confirm-btn",function () {

			var deliveryCompany = $("#deliveryCompany").val(); 
			var deliveryNumber = $("#deliveryNumber").val(); 

			if (deliveryCompany == "") {
				swal({
					title: "请输入快递公司",
					confirmButtonText: "确定",
					confirmButtonColor: "#ff1d3e",
					animation: "none"
				});
			} else if (deliveryNumber == "") {
				swal({
					title: "请输入快递单号",
					confirmButtonText: "确定",
					confirmButtonColor: "#ff1d3e",
					animation: "none"
				});
			} else {
        $(this).removeClass("confirm-btn").addClass("confirm-btn-dis");
				delivery.postDeliveryData();
			}
		});
	},
	postDeliveryData :function () {
		var params = {
			waybill_number: $(".delivery-number input").val(), 
			logistics_company: $(".delivery-select input").val() 
		};
        if (jwt_token != "" && jwt_token != undefined) {
          params.jwt_token = jwt_token;
        }
        var url = host + "/order/" + id + "/setGoods";
        commonCla.ajaxCommonFun(url, "post", function(ret, textStatus, request) {
            if (ret.code == "200") {
				swal({
					title: ret.data,
					confirmButtonText: "确定",
					confirmButtonColor: "#ff1d3e",
					animation: "none"
				},function(){
					window.location.href='orderList.html?jwt_token='+jwt_token
				});
			} else if(ret.code == "401") {
				htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
			} else {
				sAlert_auto("服务器出小差啦~", 2000)
			}
        }, params);
	},
	initPage : function () {
		delivery.handleSendGoods();
		delivery.getDetailData();
	}
}

$(function () {
    if($("#hidden").attr("page") == "business") {
		business.getPageData();
	}
	if ($("#hidden").attr("page") == "delivery") {
		delivery.initPage();
	}
	if ($("#hidden").attr("page") == "disputeApply") {
		applyList.initPage();
		setTimeout(function(){
    $('.apply-page').dropload({
	      scrollArea : window,
	      loadDownFn : function(me){
	          applyList.getApplyList(me);
	      }
	  });
    
    },205)
	}
	if($("#hidden").attr("page") == "applyDetail"){
		applyDetail.initPage();
	}
	if($("#hidden").attr("page") == "applyDetail" || $("#hidden").attr("page") == "disputeApply"){
		var source=$("#hidden").attr("page");
		$(".shopMain").on("click",".refuse",function(){
			var id=commonCla.analyzParams("id");
			if(id=="" || id==undefined){
				id=$(this).parents("li").attr("orderId")
			}
			//var html='66666<input type="text" placeholder="请填写拒绝理由" class="txt_reason"/>'
			if(!$(this).next("div").hasClass("btn_comfirm")){
				 inputAlert("拒绝售后申请",function(inputValue){
					agreeFun(false,id,function(){
						if(source=="applyDetail"){
              applyDetail.initPage();
							//window.location.href='disputeApply.html?jwt_token='+commonCla.analyzParams("jwt_token")
						}else{
	           				$(".orderList").html("");
							applyList.getApplyList();
						}
						
					},inputValue);

				})
				
			}else{
        inputAlert("拒绝退款",function(inputValue){
          conformReceipt(false,id,function(){
  					if(source=="applyDetail"){
  						window.location.href='disputeApply.html?jwt_token='+commonCla.analyzParams("jwt_token")
  					}else{
  						$(".orderList").html("");
  						applyList.getApplyList();
  					}
				});
      
        })
				

			}
			
		})
		$(".shopMain").on("click",".accept",function(){
			var id=commonCla.analyzParams("id");
			if($("#hidden").attr("page")=="disputeApply"){
				id=$(this).parents("li").attr("orderId")
			}
		    conformAlert("确定同意买家申请吗？",function(){
		    
					agreeFun(true,id,function(){
						if(source=="applyDetail"){
							 applyDetail.initPage();
							//$(".handle").html("");
						}else{
							$(".orderList").html("");
							applyList.getApplyList();
						}
					});
		    })
			
		})
		$(".shopMain").on("click",".btn_comfirm",function(){
			var id=commonCla.analyzParams("id");
			if(id==""){
				id=$(this).parents("li").attr("orderId")
			}
      conformAlert("确定确认收货吗？",function(){
        conformReceipt(true,id,function(){
  				if(source=="applyDetail"){
  					window.location.href='disputeApply.html?jwt_token='+commonCla.analyzParams("jwt_token")
  				}else{
  					$(".orderList").html("");
  					applyList.getApplyList();
  				}
  			});
      })
			
		})
	}
	applyDetail.handleClcikImg();
	
})