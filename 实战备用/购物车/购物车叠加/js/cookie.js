	/*
		需求：封装cookie操作
			添加
			修改
			删除
			查找
		封装的依据：
			完整形式：[]中是可选项
			document.cookie  = “name=value[;expires=date][;path=path-to-resource][;domain=域名][;secure]”
	*/
	/*
	{
		name:"uName",value:"bruce",expires:new Date(),path:"",domain:"",secure:true
	}
	*/

	/*
		设置cookie(含有添加和修改的功能)
		参数：o 表示一个对象
			  o.name		cookie的名称
			  o.value		cookie的值
			  o.expires		过期时间
			  o.path		cookie限定的路径
			  o.domain		cookie域名的限定
			  o.secure		http协议限定 是否是https 
	*/
	function setCookie(o){
		//var name,value,expires,path,domain,secure;
		var cookieStr = encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);
		if(o.expires){
			cookieStr+=";expires=" + o.expires;
		}
		if(o.path){
			cookieStr+=";path=" + o.path;
		}
		if(o.domain){
			cookieStr+=";domain=" + o.domain;
		}
		if(o.secure){
			cookieStr+=";secure";
		}
		document.cookie = cookieStr;
	}
	
	/*
		删除cookie
		参数：
			name:o.name,
			value:o.value,
			expires:date,
			path:o.path,
			domain:o.domain,
			secure:o.secure
	*/
	function removeCookie(o){
		 var date = new Date();  //当前时间
		 date.setSeconds(-1);  //GMT   //设置当前的时间比当前时间早一秒，也就是过期
		 /*重新设置cookie即可*/
		 setCookie({
			name:o.name,
			value:o.value,
			expires:date,
			path:o.path,
			domain:o.domain,
			secure:o.secure
		 });
	}

	/*
		获取指定cookie的值
		参数：
			name:cookie名称
	*/
	function getCookie(cname){
		var strCookie = document.cookie;
		var cookies = strCookie.split("; ");
		for(var i = 0;i<cookies.length;i++){
			// "name=value"
			var arr = cookies[i].split("=");
			//decodeURIComponent(arr[0]);  //cookie的名称
			//decodeURIComponent(arr[1]);  //cookie的值
			if(cname==decodeURIComponent(arr[0])){
				return decodeURIComponent(arr[1]);
			}
		}
		return '';
		//console.log(cookies);
	}

