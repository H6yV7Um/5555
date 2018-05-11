var login_token = "";
/*APP-H5*/
setupWebViewJavascriptBridge(function(bridge) {
	//注册js回调方法
	bridge.registerHandler('javascriptHandler', function(data, responseCallback) {
		if(isIphone()) {} else { var data = eval("(" + data + ")"); }
		//下一步操作
		if(data.nextStep == '10') { //过期登录
			login_token = data.jwt_token;
			window.location.href = "index.html?jwt_token=" + data.jwt_token;
		}
		if(data.nextStep == '1') {
			login_token = data.jwt_token;
			window.location.href = "index.html?jwt_token=" + data.jwt_token;
		}
		if(data.nextStep == '2') { //跳转
			login_token = data.jwt_token;
			window.location.href = "lottery.html?jwt_token=" + data.jwt_token;
		}

	})
	//调取客户端方法
	if(isIphone()) {} else {
		bridge.init(function(message, responseCallback) {
			var data = {
				'Javascript Responds': 'Wee!'
			}
			responseCallback(data)
		})
	}

})


var analyzParams = function(param_name) {
	var url = window.location.search.split("?")[1];
	if(url == "" || url == undefined) return url;
	url = url.split(param_name + "=")[1];
	if(url == "" || url == undefined) {
		url = "";
		return url;
	}
	if(url.indexOf("&") > 0) {
		url = url.split("&")[0];
	}
	return url;
}
//jwt_token初始化
var get_token = function() {
	var jwt_token = analyzParams("jwt_token");
	if(jwt_token == "" || jwt_token == undefined) {
		jwt_token = login_token;
	}
	return jwt_token;
}

var getCheckList = function() {
	var current_count = $("li").length;
	$.ajax({
		type: "get",
		url: "https://startvshow.com/v10/account/webMyCash?jwt_token=" + get_token() + "&start_time=" + analyzParams("start_time") + "&end_time=" + analyzParams("end_time") + "&current_count=" + current_count,
		dataType: "json",
		success: function(e) {
			//console.log(e)
			if(e.code == 200) {
				wx_share("时尚星秀电子对账单" + analyzParams("start_time")+"-"+analyzParams("end_time")+"账单","时尚星秀-让你更时尚，让你更闪耀","http://share.xingxiu.tv/starshow5.0/exportCheck/index.html?jwt_token=" + get_token() + "&start_time=" + analyzParams("start_time") + "&end_time=" + analyzParams("end_time") + "&current_count=" + current_count,"https://starshow-pic.b0.upaiyun.com/default/bill.jpg")
				$(".total_income").html(e.data.total_income)
				$(".total_spending").html(e.data.total_spending)
				var List = e.data.page_data;
				//console.log(List)
				if(List != "") {
					var listHtml = "";
					for(var i = 0; i < List.length; i++) {
						var tempTit = '<dl><dt class="dt_time s' + List[i].month.replace(/-/g, '') + '">' + List[i].month.replace(/-/g, '年') + '月</dt>' +
							'<dd><p class="income">收入￥' + List[i].income_count + '</p>' +
							'<p class="pay">支出￥' + List[i].spending_count + '</p></dd></dl>';
						if($(".get_list .s" + List[i].month.replace(/-/g, '')).html() == undefined) {
							listHtml += tempTit;
						}

						listHtml += '<ul>'
						for(var k = 0; k < List[i].data.length; k++) {
							if(List[i].data[k].status == 1) {
								var t = '<em class="crash" style="font-weight: bold;">' + List[i].data[k].amount + '</em><em class="arrow" style="float：right;">&nbsp;&nbsp;&gt;</em></a>' +
									'</li>'
							} else if(List[i].data[k].status == 0) {
								var t = '<p class="crash" style="font-weight: bold;">' + List[i].data[k].amount + '</p><p class="time status" style="color:#f90">处理中</p></div><em class="arrow" style="float：right;">&nbsp;&nbsp;&gt;</em></div>';

							}
							listHtml += '<li><a href="detail.html?id=' + List[i].data[k].id + '&jwt_token=' + get_token() + '" class="li_a">' +
								'<div class="left_detail"><p class="crash">' + List[i].data[k].detail.title + '</p>' +
								'<p class="time">' + List[i].data[k].created_at + '</p></div>' +
								'<div class="right_crash"><div class="right" style="float: left;text-align: right;">' + t + "</a></div></li>";

						}
						listHtml += '</ul>'

					}

					$(".get_list").append(listHtml)
				} else {

					$("#btn").text("没有更多数据了...")
				}

			} else {
				$(".total_income").html(0)
				$(".total_spending").html(0)
				$("#btn").text("没有更多数据了...")
			}
		}
	})
	//日期范围	
	var start_time = analyzParams("start_time")
	end_time = analyzParams("end_time")
	start_time = start_time.replace(/-/g, '.');
	end_time = end_time.replace(/-/g, '.');
	$(".start_time").text(start_time)
	$(".end_time").text(end_time)

}

var getDetailList = function() {
	$.ajax({
		type: "get",
		url: "https://startvshow.com/trading/" + analyzParams("id") + "?jwt_token=" + get_token(),
		dataType: "json",
		success: function(e) {
			//console.log(e)

			if(e.data.categery_id == 3) {
				var totle_face = (Number(e.data.amount, 2) + Number(e.data.service_fee)).toFixed(2)
				detailLi = '<div class="main_section msin_sec"><p class="success">项目：' + e.data.detail.title + '</p></div>' +
					'<ul class="star_ul"><li class="star_li"><div class="left_de">金额：</div>' +
					'<div class="right_crash face" style="font-weight: bold;">' + totle_face + '</div></li>' +
					'<li class="star_li"><div class="left_de">服务费：</div><div class="right_crash">' + e.data.service_fee + '</div></li>' +
					'<li class="star_li"><div class="left_de">用途：</div><div class="right_crash">' + e.data.detail.title + '</div></li>' +
					'<li class="star_li"><div class="left_de">时间</div><div class="right_crash">' + e.data.created_at + '</div></li>' +
					'<li class="star_li"><div class="left_de">编号：</div><div class="right_crash">' + e.data.id + '</div></li>' +
					'<li class="star_li"><div class="left_de">备注：</div><div class="right_crash">' + e.data.detail.comment + '</div></li>'

			} else if(e.data.categery_id == 2) {
				detailLi = '<div class="main_section msin_sec"><p class="success">项目：' + e.data.detail.title + '</p></div>' +
					'<ul class="star_ul"><li class="star_li"><div class="left_de">金额：</div>' +
					'<div class="right_crash" style="font-weight: bold;">' + e.data.amount + '</div></li>'
				if(e.data.status == 0) {
					detailLi += '<li class="star_li"><div class="left_de">进度：</div><div class="right_crash">正在进行中</div></li>'
				} else if(e.data.status == 1) {
					detailLi += '<li class="star_li"><div class="left_de">进度：</div><div class="right_crash">已完成</div></li>'
				}
				detailLi += '<li class="star_li"><div class="left_de">时间</div><div class="right_crash">' + e.data.created_at + '</div></li>' +
					'<li class="star_li"><div class="left_de">编号：</div><div class="right_crash">' + e.data.id + '</div></li>' +
					'<li class="star_li"><div class="left_de">备注：</div><div class="right_crash"></div></li>'
			} else if(e.data.categery_id == 1) {
				detailLi = '<div class="main_section msin_sec"><p class="success">项目：' + e.data.detail.title + '</p></div>' +
					'<ul class="star_ul"><li class="star_li"><div class="left_de">金额：</div>' +
					'<div class="right_crash" style="font-weight: bold;">' + e.data.amount + '</div></li>' +
					'<li class="star_li"><div class="left_de">时间</div><div class="right_crash">' + e.data.created_at + '</div></li>' +
					'<li class="star_li"><div class="left_de">编号：</div><div class="right_crash">' + e.data.id + '</div></li>' +
					'<li class="star_li"><div class="left_de">备注：</div><div class="right_crash"></div></li>'
			} else if(e.data.categery_id == 4) {
				detailLi = '<div class="main_section msin_sec"><p class="success">项目：' + e.data.detail.title + '</p></div>' +
					'<ul class="star_ul"><li class="star_li"><div class="left_de">金额：</div>' +
					'<div class="right_crash face" style="font-weight: bold;">' + e.data.amount + '</div></li>' +
					'<li class="star_li"><div class="left_de">用途：</div><div class="right_crash">' + e.data.detail.title + '</div></li>' +
					'<li class="star_li"><div class="left_de">时间</div><div class="right_crash">' + e.data.created_at + '</div></li>' +
					'<li class="star_li"><div class="left_de">编号：</div><div class="right_crash">' + e.data.id + '</div></li>' +
					'<li class="star_li"><div class="left_de">备注：</div><div class="right_crash">' + e.data.detail.comment + '</div></li>'
			}
			$(".dt_mon").append(detailLi)

		}
	});

}