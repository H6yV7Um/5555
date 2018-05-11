//https://startvshow.com
var host= "http://api.startvshow.com";
var toPay=function(){
	var TotalAmount=$("#recharge_total").val();
	//方式1微信、2支付宝
	var PaymentType=$("input[name='recharge']:checked").val();
	/*var params={
		"total_amount":parseFloat(TotalAmount),
		"payment_type":parseInt(PaymentType)
	}*/
	var url=host+"/recharge/"+getCookie("id")+"?total_amount="+parseFloat(TotalAmount)+
	"&payment_type="+parseInt(PaymentType);
	if(PaymentType==1){
		commonCla.ajaxCommonFun(url,"get",function(ret){
			if(ret.code=="200"){
				checkedtimer=setInterval(function(){checkedStatus();},3000)
				var img_src=ret.data.code_url;
				$("input[name='recharge']:checked").attr("tradeNo",ret.data.out_trade_no);
				$("input[name='recharge']:checked").attr("time_expire",ret.data.time_expire);
				var img_html='<img src="'+img_src+'" tradeNo="'+ret.data.out_trade_no+'"/>';
				swal({
					"title":"扫描二维码支付",
					"text":img_html,
					"html":true,
					"animation":"slide-from-top",
					"confirmButtonText":"关闭",
					"confirmButtonColor": "#dedede",
					"closeOnConfirm": false,
					"closeOnCancel": false
	              },function(){
						swal({
							"title":"您是否已经完成支付",
							"confirmButtonText":"确定",
							"showCancelButton":true,
							"confirmButtonColor": "#ff1d3e",
							"cancelButtonText":"取消",
							"cancelButtonColor": "#ff1d3e",
						},
				        function(isConfirm){
				          if(isConfirm){
				          	checkedStatus("true")
				          }
				        })
	              	clearInterval(checkedtimer)
	              });
			}
		})

	}else{
		
		window.location.href=url;
	}
	
	
}

var checkedStatus=function(showError) {
	var PaymentType=$("input[name='recharge']:checked").val();
	var url=host+"/webReturn?payment_type="+PaymentType;
	var app_id=commonCla.analyzParams("app_id");
	var seller_id=commonCla.analyzParams("seller_id");
	var sign_type=commonCla.analyzParams("sign_type");
	var sign=commonCla.analyzParams("sign");
	var charset=commonCla.analyzParams("charset");
	var timestamp=commonCla.analyzParams("timestamp");
	var version=commonCla.analyzParams("version");
	var auth_app_id=commonCla.analyzParams("auth_app_id");
	var out_trade_no=commonCla.analyzParams("out_trade_no");
	var trade_no=commonCla.analyzParams("trade_no");
	var total_amount=commonCla.analyzParams("total_amount");
	if(PaymentType==1){
		var params={
			"out_trade_no":$("input[name='recharge']:checked").attr("tradeNo")
		}

	}else{
		var params={
			"app_id":app_id,
			"method":"alipay.trade.page.pay.return",
			"sign_type":sign_type,
			"sign":sign,
			"charset":charset,
			"timestamp":timestamp,
			"version":version,
			"auth_app_id":auth_app_id,
			"out_trade_no":out_trade_no,
			"trade_no":trade_no,
			"total_amount":total_amount,
			"seller_id":seller_id,
		    "payment_type":PaymentType
		}
	}
	
	$.ajax({
		url: url,
		type: "POST",
		dataType: 'json',
		async: true,
		cache: false,
		data: params,
		success: function(data,textStatus,request) {
			//回调函数
			if(data.code=="200"){
				clearInterval(checkedtimer);
				swal({
				  "title":"支付成功",
				  "confirmButtonText":"确定",
				  "confirmButtonColor": "#ff1d3e",
				  "animation":"none",

				},function(){
					//window.location.href="money.html"
				});
				
			}else{
				if(PaymentType==1){
					if(showError=="true"){
						swal({
						  "title":"支付失败",
						  "confirmButtonText":"确定",
						  "confirmButtonColor": "#ff1d3e",
						  "animation":"none"
						})

					}
					var time_expire=$("input[name='recharge']:checked").attr("time_expire");
					var time_cur=data.error;
					var timeDiff=commonCla.dateDiff('S',time_cur,time_expire);
					console.log(timeDiff)
					if(timeDiff<=0){
						clearInterval(checkedtimer);
					}
				}

				/*swal({
				  "title":data.error,
				  "confirmButtonText":"确定",
				  "confirmButtonColor": "#ff1d3e",
				  "animation":"none",

				});*/
			}
		},error:function (argument) {
			swal({
				  "title":"失败",
				  "confirmButtonText":"确定",
				  "confirmButtonColor": "#ff1d3e",
				  "animation":"none",

				});
		}
	})
}
$(function(){
	if(commonCla.analyzParams("sign")!=undefined && commonCla.analyzParams("sign")!="undefined" && commonCla.analyzParams("sign")!=""){
		checkedStatus();
	}
	$(".btn_topay").click(function(){
		var money=$("#recharge_total").val();
		var reg = new RegExp(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/　);
		if(money==""){
			swal({
				  "title":"金额不能为空",
				  "confirmButtonText":"确定",
				  "confirmButtonColor": "#ff1d3e",
				  "animation":"none",

				});
         return;
		}else if(!reg.test(money)){
			swal({
				  "title":"请输入正确金额",
				  "confirmButtonText":"确定",
				  "confirmButtonColor": "#ff1d3e",
				  "animation":"none",

				});
        return;
		}
		toPay();
	})
})