// JavaScript Document
//var host = "http://123.57.0.118:5000/";
var host = "https://startvshow.com/";  
$(function() {

	$(".subBtn").click(function() {
		if (navigator.onLine) {
			var mobile = $(".telephone").val();
			var password = $(".password").val();
			var url = host + "v2/api/csmall"
			if (mobile == '') {
				BOX_show("telephone");
				return;
			}
			if (password == '') {
				BOX_show("password");
				return;
			}

			if (password.length < 6 || password.length > 14) {
				BOX_show("password");
				return;
			}
			var params = {
				"mobile": mobile,
				"password": password
			}
			ajaxCommonFun(url, 'post', function(data) {
				if (data.code == 200) {
					$(".step1").hide();
					$(".step2").show();
					if (data.data.award == 50) {
						$(".step2 h2").html(" <h2>恭喜你获得<br>蛋糕50元优惠券一张</h2>")
					} else {
						$(".step2 h2").html(" <h2>恭喜你获得<br>蛋糕80元优惠券一张</h2>")
					}

				} else if (data.code == 422) {
					alert(data.error)
				} else {
					$(".step1").hide();
					$(".step3").show();
					if(data.code==423){
						$(".step3 h2").html(data.error)	
					}
					
				}

			}, params)
		} else {
			alert("请链接网络");
		}
	})

	var ajaxCommonFun = function(url, type, callbackFun, params) {
			$.ajax({
				url: url,
				type: type,
				dataType: 'json',
				async: false,
				cache: false,
				data: params,
				success: function(data) {
					//回调函数
					if (callbackFun) {
						callbackFun(data);

					}

				},
				error: function() {
					alert("error");

				}

			})

		}
	$(".js-close").click(function() {
		BOX_remove("telephone");
		BOX_remove("password")
	});

})