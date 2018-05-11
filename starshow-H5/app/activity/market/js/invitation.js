// JavaScript Document
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
			error: function() {}
		})
	}
//var host="http://123.57.0.118:5000/v3/";
var host="http://api.xingxiu.tv/"
var url =host+ "festival/saveInvitation";
var getInfo = function() {
		var name = $(".name").val();
		var media_name = $(".media_name").val();
		var email = $(".email ").val();
		var mobile = $(".mobile ").val();
		ajaxCommonFun(url, "post", function(resultData) {
				if(resultData.code==200){
					alert("提交成功")	
				}else{
					alert(resultData.error)	
				}
			}, {
			"name": name,
			"media_name": media_name,
			"email": email,
			"mobile": mobile
		})
	}