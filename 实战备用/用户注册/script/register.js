var userInfo={
	
}

;(function(){
	addevent();
})();

function addevent(){
	document.getElementById("register").onclick=function(){
		var user=getuser();
		if(validate(user)){
			usersubmit(user);
		}
	}
	
	//对象属性操作，以及事件添加方法
//	document.getElementById("register").addEventListener("click",function(){})
//	document.getElementById("register")["onclick"]=function(){}
//	var arr=[1,2,3];
//	console.log(arr.length);
//	arr[5]=6;
//	console.log(arr.length);
//	arr["v"]=7;
//	console.log(arr.length);
//	console.log(arr.v);
}

function getuser(){
	var user={
		userName:document.getElementById("userName").value,
		password1:document.getElementById("password1").value,
		password2:document.getElementById("password2").value
	}
	
	return user;
}

function validate(user){
	var state=false;
	if(user.userName==""||user.userName==" "){
		alert("用户名不能为空！！！");
	}else if(user.password1!=user.password2){
		alert("两次输入密码不一致！！！");
	}else{
		state=true;
	}
	
	return state;
}

function usersubmit(user){
	ajax({
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{
			status:"register",
			userID:user.userName,
			password:user.password1
		},
		success:function(data){
			if(data==1){
				console.log("注册成功！！请去登录页面登录！");
				//window.sessionStorage["userName"]=user.userName;
			}else if(data==0){
				console.log("用户重名，请重新注册！！！");
			}
		}
	})
}

function ajax(opt){
	var config={
		url:"",
		data:{},
		type:"get",
		success:function(){
			
		}
	}
	for(var i in opt){
		config[i]=opt[i];
	}
	var XMLHTTP=new XMLHttpRequest();
	if(config.type=="get"){
		var userdata="?";
		for(var x in config.data){
			userdata+=x+"="+config.data[x]+"&";
		}
		var url=config.url+userdata;
	}
	XMLHTTP.open(config.type,url,true);
	XMLHTTP.send();
	XMLHTTP.onreadystatechange=function(){
		if (XMLHTTP.readyState==4 && XMLHTTP.status==200){
			if(typeof config.success=="function"){
				config.success(XMLHTTP.responseText);
			}
   			
    	}
	}
}
//闭包的应用
//getuser()();
//function getuser(){
//	var i=0;
//	return function(){
//		i++;
//	}
//}


