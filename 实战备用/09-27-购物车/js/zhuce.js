
$(function(){
	
	$("#tel").blur(function(){
		if($.cookie("UserName")){
			var UserName = $.cookie("UserName")
		}else{
			var UserName = "";
		}
		if($("#tel").val()==UserName){
			console.log("chongming")
			$(".errorTip").show()
			$(".chongming").show()
			$(".erroruser").hide()
		}else{
			$(".errorTip").hide()
			$(".chongming").hide()
		}
		if($("#tel").val()=="" && $("#tel").val() != UserName){
			$(".errorTip").show()
			$(".erroruser").show()
			$(".errorpassword").hide()
		}else{	
			istrue($("#tel"));	
		}
	})
	$("#tel").focus(function(){
		$(".errorTip").hide()
	})
	$("#password").blur(function(){
		if($("#password").val()==""){
			$(".errorTip").show()
			$(".errorpassword").show()
			$(".erroruser").hide()
		}else{
			numtrue($("#password"));
		}
	})
	
	$("#password").focus(function(){
		$(".errorTip").hide()
	})
	var CheckedFlag = false;
	$("#checkbox").click(function () {
		var Checked = $("#checkbox").prop("checked");
		if(Checked)
		{
			CheckedFlag = true;
		}
		else{
			CheckedFlag = false;
		}
	})
	
	var Checked = $.cookie().choice;
		
	$("#zhuce").click(function(){
		if(istrue($("#tel")) && numtrue($("#password")) && CheckedFlag){
			window.location.href="denglu.html"
		}
		else if(istrue($("#tel")) && numtrue($("#password")) && !CheckedFlag){
			$(".errorTip").show()
			$(".errorpassword").hide()
			$(".erroruser").hide()
			$(".errortel").hide()
			$(".errorpass").hide()
			$(".error1").show()
		}
	})
})

function istrue(obj){
		var reg =/^1[34578]\d{9}$/
		var v = obj.val();
		if(reg.test(v)){
		    $.cookie("UserName",obj.val(),{expires:14});     
		}
		else{
			$(".errorTip").show()
			$(".errortel").show()
			$(".errorpassword").hide()
			$(".errorpass").hide()
			$(".erroruser").hide()
		}
		return reg.test(v);
	}

function numtrue(obj){
		var reg =/^\w{6,}$/;
		var v = obj.val();
		if(reg.test(v)){
            $.cookie("password",$("#password").val(),{expires:14});
		}
		else{
			$(".errorTip").show()
			$(".errorpass").show()
			$(".erroruser").hide()
			$(".errortel").hide()
			$(".errorpassword").hide()
		}
		return reg.test(v)
	}
		
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
