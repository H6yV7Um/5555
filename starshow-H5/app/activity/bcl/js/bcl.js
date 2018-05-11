// JavaScript Document
//var host = "http://123.57.0.118:5000/v8/"; //测试
var host = "https://startvshow.com/v8/"; //正式
//var linkUrl = "http://testshare.xingxiu.tv/starshow5.0/"; //测试
var linkUrl="http://share.xingxiu.tv/starshow5.0/";//正式
var id = 26;

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
var analyzParams = function(param_name) {
		var url = window.location.search.split("?")[1];
		if (url == "" || url == undefined) return url;
		url = url.split(param_name + "=")[1];
		if (url == "" || url == undefined) {
			url = "";
			return url;
		}
		if (url.indexOf("&") > 0) {
			url = url.split("&")[0];
		}
		return url;
	}

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

var jwt_token = analyzParams("jwt_token") == undefined ? "" : analyzParams("jwt_token");
var count = 0
/*集赞详情*/
var getLike = function() {
		var url = host + "activity/" + id;
		ajaxCommonFun(url, "get", function(resultData) {
			count = resultData.data.count;
			if(resultData.data.message!=""&&resultData.data.message!=undefined){
				name=resultData.data.message.name;
				mobile=resultData.data.message.mobile;
			}
			if (resultData.code == "200") {
				if(count>=6){
					$(".bcl img").attr("src", "images/bcl06.png");
				}else{
					$(".bcl img").attr("src", "images/bcl0" + resultData.data.count + ".png");	
				}
				
			}
		}, {
			"jwt_token": jwt_token
		})
	}
/*登记信息*/
var toRecordInfo = function() {
		var url = host + "activity/signUp?jwt_token=" + jwt_token;
		var name = $("#txt_name").val();
		var phone = $("#txt_phone").val();
		var params = {
			"name": name,
			"mobile": phone
		}
		var re = /^1\d{10}$/;
		$(".tip_error").html("");
		if (name == "") {
			$("#txt_name").next(".tip_error").html("请填写姓名");
			return;
		} else if (phone == "") {
			$("#txt_phone").next(".tip_error").html("请填写电话");
			return;
		} else if (!re.test(phone)) {
			$("#txt_phone").next(".tip_error").html("电话格式不正确");
			return;
		}
		ajaxCommonFun(url, "post", function(ret) {
			if (ret.code == "200") {
				$(".messdivCons").html("您已成功参与此次抽奖");
				tcc.BOX_show("messdiv");
				$("#joinLottery").hide()
			} else if (ret.code == "422") {
				$("#messdiv .messdivCons").html("您输入的手机号已经参与过抽奖了哦~");
				tcc.BOX_show("messdiv");
				$("#joinLottery").hide()
			}
		}, params)
	}
$(function() {
	//关闭弹框-jion
	$(".js-close-join").click(function() {
		$("#joinLottery").hide();
	})
	$(".js-close").click(function() {
		tcc.BOX_remove("messdiv");
		tcc.BOX_remove("tips");
	})
	//保存抽奖信息
	$("#btn_join").click(function() {
		toRecordInfo();
	})
	getLike();
})