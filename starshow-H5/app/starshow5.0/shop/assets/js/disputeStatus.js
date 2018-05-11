var host=commonCla.hostBase+"/v15";
var id = commonCla.analyzParams("id");
var jwt_token = commonCla.analyzParams("jwt_token");
// 客户端交互
var clientFun = function (bridge) {
    // 页面加载完成返回刷新
    $(function () {
        setBridgeCallHandler(bridge, {
            'action': '19',
        })
    })
    //过期重新登录
    $(".dialog_tip").on("click", ".btn_relogin", function (e) {
        e.preventDefault()
        setBridgeCallHandler(bridge, {
            'action': '10',
            'nextStep': '10'
        })
    })

}
var linkAttrs = function (attrlist) {
    var str_attr = ""
    for (var b = 0; b < attrlist.length; b++) {
        //str_attr += attrlist[b].attr.attr_value + "、";
        str_attr += attrlist[b] + "、";
    };
    return str_attr.substr(0, str_attr.length - 1)
}

//1待付款2待发货(已付款)3待收货(已发货)4已完成5已关闭6申请中7退款中8已退货
var obj_status = function (data) {

    var order_status = data.data.order_status;
    var service = data.data.service;
    var over_time = data.data.over_time;
    var current_time = data.current_time;
    var data = data.data;
    var str_order_status = "";
    var btnList = "";
    var str_counter = "";
    if (order_status != 4 && order_status != 5) {
        var obj_counter = commonCla.initCountdown(current_time, over_time);
        var str = obj_counter.d + "天" + obj_counter.h + "小时" + obj_counter.m + "分钟"
    }
    //btn_afterSale

    if (order_status == 1) {
        str_order_status = '<span>待用户付款</span>'
        str_counter = "请在" + str + "内完成付款"
        

    } else if (order_status == 2) {
        str_order_status = '<span>待发货</span>'
        
        str_counter = "商家在" + str + "内完成发货"
    } else if (order_status == 3) {
        str_order_status = '<span>待收货</span>'
        str_counter = "买家在" + str + "内确认收货"

        
    } else if (order_status == 4) {
        str_order_status = '<span>已完成</span>'
        str_counter = "订单已完成"
        
    } else if (order_status == 5) {
        str_order_status = '<span>已关闭</span>'
        str_counter = "订单已关闭"
    } else if (order_status == 6) {
        str_order_status = '<p>退款申请待处理</p>'+
                           '<p>商家还有' + str+'处理申请</p>';
        
        if (service == 1) {
            str_order_status2 = '<p>卖家尚未确认退款，请耐心等待</p>' +
                                '<div class="step flex-row">' +
                                    '<div class="gray red"><span class="step-icon"></span>申请退款</div>' +
                                    '<div class="gray"><span class="step-icon"></span>卖家同意</div>' +
                                    '<div class="gray"><span class="step-icon"></span>售后完成</div>' +
                                    '<div class="gray"><span class="step-icon last"></span><span>等待银行处理</span></div>' +
                                '</div>'
        } else {
            str_order_status2 = '<p>卖家尚未确认退款，请耐心等待</p>' +
                '<div class="step flex-row">' +
                '<div class="gray red"><span class="step-icon"></span>申请退款</div>' +
                '<div class="gray"><span class="step-icon"></span>卖家同意</div>' +
                '<div class="gray"><span class="step-icon"></span>买家发回</div>' +
                '<div class="gray"><span class="step-icon last"></span>售后完成</div>' +
                '</div>'
        }

    } else if (order_status == 7) {
        str_order_status = '<p>商家已经同意退货，请寄回商品</p>'+
                            '<p>请在'+str+'内填写物流信息</p>';
        str_order_status2 = '<p>卖家已经同意退货，请填写以下退地址</p>'+
                            '<div class="return-address flex-row">'+
                                '<span class="market-img"></span>'+
                                '<div class="return-msg">'+
                                    '<div>'+
                                        '<span>' + data.consignee+'</span>'+
                                        '<span>' + data.mobile+'</span>'+
                                    '</div>'+
                                    '<div>地址：' + data.address+'</div>'+
                                '</div>'+
                            '</div>'
        
    } else if (order_status == 8) {
        str_order_status = '<p>等待商家确认收货</p>'+
                            '<p>'+ str +'后系统将默认收货</p>';
        str_order_status2 = '<p>卖家尚未确认退款，请耐心等待</p>'+
                            '<div class="step flex-row">'+
                                '<div class="gray red"><span class="step-icon"></span>申请退款</div>'+
                                '<div class="gray red"><span class="step-icon"></span>卖家同意</div>'+
                                '<div class="gray red"><span class="step-icon"></span>买家发回</div>'+
                                '<div class="gray"><span class="step-icon last"></span>售后完成</div>'+      
                            '</div>'
        
    } else if (order_status == 9) {
        if(service == 1) {
            str_order_status = '<p>等待银行处理</p>'
            str_order_status2 = '<p>等待银行处理</p>'+
                                '<div class="step flex-row">'+
                                    '<div class="gray red"><span class="step-icon"></span>申请退款</div>'+
                                    '<div class="gray red"><span class="step-icon"></span>卖家同意</div>'+
                                    '<div class="gray red"><span class="step-icon"></span>售后完成</div>'+
                                    '<div class="gray red"><span class="step-icon last"></span><span>等待银行处理</span></div>'+      
                                '</div>'

        } else {
            str_order_status = '<p>退货已成功</p>'
            str_order_status2 = '<p>退款成功</p>' +
                '<div class="step flex-row">' +
                '<div class="gray red"><span class="step-icon"></span>申请退款</div>' +
                '<div class="gray red"><span class="step-icon"></span>卖家同意</div>' +
                '<div class="gray red"><span class="step-icon"></span>买家发回</div>' +
                '<div class="gray red"><span class="step-icon last"></span>退款成功</div>' +
                '</div>'
        }
        str_counter = "商家还有" + str + "确认收货"
        
    } else if (order_status == 10) {
        str_order_status = '<p>商家未确认收货，平台将介入</p>'
        str_order_status2 = '<p>请留意您的手机，平台工作人员将在7个工作日内与您联系</p>'+
                            '<div class="step flex-row">'+
                                '<div class="gray red"><span class="step-icon"></span>申请退款</div>'+
                                '<div class="gray red"><span class="step-icon"></span>卖家同意</div>'+
                                '<div class="gray red"><span class="step-icon"></span>买家发回</div>'+
                                '<div class="gray red"><span class="step-icon last"></span><span>等待平台调解</span></div>'+      
                            '</div>'
    }
    

    var obj = {
        "status": str_order_status,
        "status2": str_order_status2
    }
    return obj

}
// 判断退货原因
var reason = function (num) {
    var r;
    switch (num) {
        case 1: r = "尺码拍错(不喜欢)效果差"; break;
        case 2: r = "质量问题"; break;
        case 3: r = "面料材质与商品描述不符"; break;
        case 4: r = "大小尺寸与商品描述不符"; break;
        case 5: r = "颜色(款式)图案与描述不符"; break;
        case 6: r = "商家发错货"; break;
        case 7: r = "假冒品牌"; break;
        case 8: r = "收到商品少件或破损"; break;
        case 9: r = "未发货申请退款"; break;
    }
    return r;
}
var getOrderStatus = function () {
    var url = host + "/order/" + id +"/customerService";
    var params = {
        "jwt_token": jwt_token
    }
    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        if (ret.code == "200") {
            initStatusPage(ret)
            $(".loadding").hide()
            $(".disputewait-page").show()
        } else if (ret.code == "401") {
            // htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
        } else {
            sAlert_auto(ret.error, 2000)
        }
    }, params)
}
var initStatusPage = function (ret) {
    var obj = obj_status(ret)
    $(".status-block .tip").html(obj.status)
    $(".status-block .tip2").html(obj.status2)

    var data = ret.data
    var goodList = data.goods;
    var goodsListHtml = "";
    for (var i in goodList) {
        goodsListHtml += '<div class="product flex-row">'+
                                '<div class="product-img">'+
                                    '<img src="' + goodList[i].cover+'!250x250" alt="">'+
                                '</div>'+
                                '<div class="product-info flex-column">'+
                                    '<div class="product-name one-line">' + goodList[i].name+'</div>'+
                                    '<div class="product-size"><span>选择</span>：<span>' + linkAttrs(goodList[i].attrs)+'</span></div>'+
                                    '<div class="product-price">'+
                                        '<span class="price">&yen;<b>' + goodList[i].price+'</b></span>'+
                                        '<span class="amount">X<b>' + goodList[i].number+'</b></span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
    }
    $(".goods-list").html(goodsListHtml)
    $(".applyReason .value").html(reason(parseInt(data.reason)))

    $(".applyTime .value").html(data.created_at)
    $(".applyNum .value").html(data.order_number)
    var refuse_reason="";
        if(data.refuse_reason!="" && data.refuse_reason!=null && data.refuse_reason!=undefined){
    			 refuse_reason='<div>'+
			                '<span>拒绝理由：</span>'+
			                '<span>'+data.refuse_reason+'</span>'+
			            '</div>'
    		}
        $(".dispute-des").append(refuse_reason);
    if (data.order_status == 7) {
        $(".return-block").show()
        $(".status-block").hide()
        $(".return-block .tip").html(obj.status)
        $(".return-block .tip2 .add-con").html(obj.status2)
        $(".write-delivery").attr("href", "writedelivery.html?id=" + id + "&jwt_token=" + jwt_token)
    }
}
// 退回物流填写
var delivery = {
	initDetail:function(ret){
		var data=ret.data;
        var data = ret.data
        var goodList = data.goods;
        var goodsListHtml = "";
        for (var i in goodList) {
            goodsListHtml += '<div class="product flex-row">' +
                                '<div class="product-img">' +
                                    '<img src="' + goodList[i].cover + '!250x250" alt="">' +
                                '</div>' +
                                '<div class="product-info flex-column">' +
                                    '<div class="product-name one-line">' + goodList[i].name + '</div>' +
                                    '<div class="product-size"><span>选择</span>：<span>' + linkAttrs(goodList[i].attrs) + '</span></div>' +
                                    '<div class="product-price">' +
                                        '<span class="price">&yen;<b>' + goodList[i].price + '</b></span>' +
                                        '<span class="amount">X<b>' + goodList[i].number + '</b></span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
        }
		
        $(".goods-list").html(goodsListHtml)
        $(".applyReason .value").html(reason(data.reason))
        $(".applyTime .value").html(data.created_at)
        $(".applyNum .value").html(data.order_number)

	},
	//详情
	getDetailData:function(){
        var url = host + "/order/" + id + "/customerService";
        var params = {
            "jwt_token": jwt_token
        }
		commonCla.ajaxCommonFun(url,"get",function(ret){
			if(ret.code=="200"){
                delivery.initDetail(ret);
                $(".loadding").hide()
                $(".write-delivery").show()
			}else{
				sAlert(ret.error);
			}

		}, params)
	},
	// 发货
    handleSendGoods : function () {
        $(".confirm-info").on("click", function () {

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
        var url = host + "/order/" + id + "/write";
        commonCla.ajaxCommonFun(url, "post", function(ret, textStatus, request) {
            if (ret.code == "200") {
				swal({
					title: ret.data,
					confirmButtonText: "确定",
					confirmButtonColor: "#ff1d3e",
					animation: "none"
				},function(){
					window.location.href='disputestatus.html?id='+id+'&jwt_token='+jwt_token
				});
			} else if(ret.code == "401") {
				htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
			} else {
                sAlert_auto(ret.error, 2000)
			}
        }, params);
	},
	initPage : function () {
		delivery.handleSendGoods();
		delivery.getDetailData();
	}
}
$(function () {
    if ($("#hidden").attr("page") == "disputeStatus") {
        getOrderStatus()
    }
    if ($("#hidden").attr("page") == "writedelivery") {
        delivery.initPage();
    }
})