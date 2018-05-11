$(function(){
	$(".pink").click(function(){
		var name = $.cookie("UserName");
		var password = $.cookie("password");
		var Checked = $("#checkbox").prop("checked");
		if(($("#tel").val() == name) && ($("#password").val() == password))
		{
			return $(".ff1").attr("action","index.html");
		}else if(($("#tel").val() == name) && ($("#password").val() != password)){
			alert("密码不对")
		}else if(($("#tel").val() != name) && $("#password").val()){
			alert("请先注册")
		}else if($("#password").val()==""){
			alert("请输入密码")
		}
		/*location.href="index.html";
		*/
		return false;
	})
	$("#checkbox").click(function () {
		$.cookie("choice","cheacked",{expires:14})
	});
	
	var Checked = $.cookie().choice;

	if(Checked == "cheacked")
	{
		// 复选框选中
		var Checked = $("#checkbox").prop("checked",true);
		console.log($.cookie().UserName)

		// 用户名进行赋值
		$("#UserName").val($.cookie().UserName)
	}
})