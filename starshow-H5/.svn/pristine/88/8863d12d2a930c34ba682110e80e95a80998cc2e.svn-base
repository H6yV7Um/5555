// JavaScript Document
var host = "http://47.94.175.204:5000/v9/";
//var host = "http://api.startvshow.com/v6/";
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
var id = analyzParams("id");
var ajaxCommonFun = function(url, type, callbackFun, params) {
		$.ajax({
			url: url+"?callback=?",
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
	function getXMLHttpRequest() {  
          var xhr;  
          if(window.ActiveXObject) {  
                   xhr= new ActiveXObject("Microsoft.XMLHTTP");  
          }else if (window.XMLHttpRequest) {  
                   xhr= new XMLHttpRequest();  
          }else {  
                   xhr= null;  
          }  
          return xhr;  
}  
  
//function ajaxCommonFun(url, type, callbackFun, params) {  
//          var xhr = getXMLHttpRequest();  
//          xhr.open(type,url);  
//         // var data = "name=mikan&address=street...";  
//          xhr.send(null);  
//          xhr.onreadystatechange= function() {
//                   if(xhr.readyState == 4 && xhr.status == 200) {  
//                            /*alert("returned:"+ xhr.responseText);  */
//							
//							callbackFun(xhr.responseText)
//                   }  
//          };  
//}
$(function(){
	var userPhone=$(".userPhone").val();
	var uName="";
	if(window.localStorage){
		uName=localStorage.getItem('userName');
	}
	
	$(".iapp").hover(function(e) {
		$(".app").show();
	}, function() {
		$(".app").hide();
	});
	$(".iweix").hover(function(e) {
		$(".weix").show();
	}, function() {
		$(".weix").hide();
	});	
	$(".regist_btn").click(function(){
		
		$(".regist").show();
		$("#login").show();
		$("#regist").hide();	
		$("#findPwd").hide();
	})
	$(".findPwd").click(function(){
		$("#login").hide();
		$("#findPwd").show()	
	})
	/*$(".goRegist").click(function(){
		$("#regist").show();	
		$("#login").hide();
		$(".regist").show();
	});*/
	$(".close").click(function(){
		$(".regist").hide();	
	})
	$(".sureLogin").click(function(){
		var userPhone=$(".userPhone").val();
		if(userPhone=="" || userPhone==null){
			alert("请输入用户名")	
		}else{
			if(userPhone!=uName){
		 		alert("改用户名不存在，请先注册")	
			}else{
			  $(".regist").hide();
			  $(".welcome-info").show();
			  $(".welcome-info span").text(userPhone);	
			  $(".login_info").hide();
			}
		}
		
		
	})

	
	if(uName!=""&&uName!=null){
		$(".regist").hide();
		$(".welcome-info").show();	
		$(".welcome-info span").text(uName);	
		$(".login_info").hide();
	}else{
		$(".login_info").show();
	}
})	