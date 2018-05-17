/*------------------------登录页选项卡-------------------------*/
$(function(){
	$(".login-tab>li").click(function(){
		$(".login-tab>li").removeClass("active");
		$(this).addClass("active");
		$(".login-tab-con").removeClass("selected");
		$(".login-tab-con").eq($(this).index()).addClass("selected");
	})
})

/*-----------------------------遮罩层-----------------------------*/
$(function(){
	$(".confirm").click(function(){
		$(".errmask").hide();
	})
})
/*-----------------------------注册-----------------------------*/
/*$(function(){
	$("#submitbtn").click(function(){
		var deff = $.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"register",
				userID:$("#tel").val(),
				password:$("#password").val()
			}
		});
		$(".errmask").show();
		deff.done(function(msg){
			switch(msg){
				case "0" : $(".errcon").html("用户名重复了");break;
				case "1" : $(".errcon").html("注册成功了，3秒后将进行跳转进行登录");
						   setTimeout(function(){
						   		location.href = "login.html";
						   },3000)
						   break;
				case "2" : $(".errcon").html("服务器产生错误，请稍后再试");break;
			}
		})
		deff.error(function(){
			alert("请求失败了");
		})
	})
})*/
$(function(){
	$("#submitbtn").click(function(){
		var reg = /^1[35789]\d{9}/;
		var utel = $("#tel").val();
		if($("#uname").val() === "" ){
			$(".errmask").show();
			$(".errcon").html("请输入正确的手机号");
		}else if( reg.test(utel) ){
			var deff = $.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"register",
					userID:$("#tel").val(),
					password:$("#password").val()
				}
			});
			$(".errmask").show();
			deff.done(function(msg){
				switch(msg){
					case "0" : $(".errcon").html("用户名重复了");break;
					case "1" : $(".errcon").html("注册成功了，3秒后将进行跳转进行登录");
							   setTimeout(function(){
							   		location.href = "login.html";
							   },3000)
							   break;
					case "2" : $(".errcon").html("服务器产生错误，请稍后再试");break;
				}
			})
			deff.error(function(){
				alert("请求失败了");
			})
		}else{
			$(".errmask").show();
			$(".errcon").html("请输入正确的手机号");
		}
	})
	$(".regList").find("input").blur(function(){
		if($("#tel").val() !=="" && $("#code").val() !=="" && $("#password").val() !=="" && $("#repassword").val() !==""){
			$("#submitbtn").removeClass("forbid");
			$("#submitbtn").removeProp("disabled");
		}
	})
})

/*-----------------------------登录----------------------------*/
/*$(function(){
	$("#pwdlogin").click(function(){
			var deff = $.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"login",
					userID:$("#tel").val(),
					password:$("#password").val()
				}
			});
			$(".errmask").show();
			deff.done(function(msg){
				switch(msg){
					case "0" : $(".errcon").html("用户名不存在");break;
					case "2" : $(".errcon").html("密码错误");break;
					default : $(".errcon").html("登陆成功");
							setTimeout(function(){
						   		location.href = "index.html";
						   },1000)
							break;
				}
			})
	})	
})*/
/*-----------------------------输入框验证----------------------------*/
$(function(){
	$("#pwdlogin").click(function(){
		var reg = /^1[35789]\d{9}/;
		var uname = $("#uname").val();
		if($("#uname").val() === "" ){
			$(".errmask").show();
			$(".errcon").html("请输入正确的手机号");
		}else if( reg.test(uname) ){
			var deff = $.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"login",
					userID:$("#tel").val(),
					password:$("#password").val()
				}
			});
			$(".errmask").show();
			deff.done(function(msg){
				switch(msg){
					case "0" : $(".errcon").html("用户名不存在");break;
					case "2" : $(".errcon").html("密码错误");break;
					default : $(".errcon").html("登陆成功");
							setTimeout(function(){
						   		location.href = "index.html";
						   },1000)
							break;
				}
			})
		}else{
			$(".errmask").show();
			$(".errcon").html("请输入正确的手机号");
		}
	})
})
