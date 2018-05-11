$(".btn").on("click", function() {

	var region = $("#region").val();
	if(region == "") {
		alert("请选择参赛战区！！！");
		return false;
	}

	var userLocal = $("#team").val();
	if(userLocal == "") {
		alert("请选择参赛战队！！！");
		return false;
	}
	var userName = $(".name").val();
	if(userName == "") {
		alert("请输入您的姓名！！！");
		return false;
	}
	var userCard = $(".id_card").val();
	if(userCard == "") {
		alert("请输入您的身份证号码！！！");
		return false;
	}

	var Tele_number = $(".mobile").val();
	if(Tele_number == "") {
		alert("请输入您的联系方式！！！");
		return false;
	}

	var userSize = $("#size").val();
	if(userSize == "") {
		alert("请选择队服尺码！！！");
		return false;
	}
	
	var group = isCardEnter(userCard);
	if(isOverTime(region) && isCardNo(userCard) && isTeleNo(Tele_number) == true && isCardEnter(userCard)!= false){
		//var host = "http://123.57.0.118:5000";
		var host = 'https://startvshow.com';
		$.ajax({
			type: "post",
			url: host + "/v9/marathon",
			data: {
				region: region,
				team: userLocal,
				name: userName,
				mobile: Tele_number,
				id_card: userCard,
				size: userSize,
				group: group
			},
			success: function(e) {
				if(e.code == 200) {
					alert(e.data);
				} else {
					alert(e.error);
				}
	
			}
	
		});
		
	}else{
		alert("报名失败！")
	}
	
})

function isCardNo(card) {
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(reg.test(card) === false) {
		alert("身份证输入不合法！！！")
		return false
	} else {
		return true
	}
}
//用身份证判断性别，年龄
function isCardEnter(userCard) {
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();

	var age = myDate.getFullYear() - userCard.substring(6, 10) - 1;
	if(userCard.substring(10, 12) < month || userCard.substring(10, 12) == month && userCard.substring(12, 14) <= day) {
		age++;
	}
	if(age >= 40 && age <= 50) {
		userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14);
		if(parseInt(userCard.substr(16, 1)) % 2 == 1) {
			//alert("男中")
			return "1"
		} else {
			//alert("女中")
			return "2"
		}
	
	} else if(age >= 18 && age <= 39) {
		
		userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14);
			if(parseInt(userCard.substr(16, 1)) % 2 == 1) {
				//alert("男青")
				return "3"
			} else {
				//alert("女青")
				return "4"
			}
	} else {
		alert("年龄不在参加范围内！！！");
		return false
	}
}

function isTeleNo(tele) {
	var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(reg.test(tele) === false) {
		alert("手机号输入不正确！！！");
		return false
	} else {
		return true;
	}
}
//日期
function isOverTime(region) {
	if(region == 1) {
		timestamp = '2017-3-19 23:59:59';
	} else if(region == 2) {
		timestamp = '2017-3-25 23:59:59';
	} else if(region == 3) {
		timestamp = '2017-3-26 23:59:59';
	} else if(region == 4) {
		timestamp = '2017-4-08 23:59:59';
	} else if(region == 5) {
		timestamp = '2017-4-09 23:59:59';
	} else {
		timestamp = '2017-4-15 23:59:59';
	}
	var CurrentTime = (new Date()).valueOf();
	var timestamp1 = (new Date(timestamp)).valueOf();
	//alert(timestamp1-CurrentTime);
	if(CurrentTime >= timestamp1) {
		alert('报名时间已过期');
		return false
	} else {
		return true;
	}

}