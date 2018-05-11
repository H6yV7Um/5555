var $ = {
	setCookie:function(key,value,days){
		var dDate = new Date();
		dDate.setDate(dDate.getDate() + days);
		document.cookie = key + "="+value +";expires=" + dDate;
	},
	getCookie:function(key){
		var aCookie = document.cookie.split("; ");
		for(var i = 0;i<aCookie.length;i++){
			var aCook = aCookie[i].split("=");
			if(aCook[0]==key){
				return aCook[1]
			}
		}
		return null
	},
	removeCookie:function(key){
		$.setCookie(key,"",-1)
	},
	
	
	getByClass:function(box, sClass){
    var aTag = box.getElementsByTagName("*");
    var result = [];
    for(var i=0; i<aTag.length; i++){
    	if(aTag[i].className == sClass){
    		result.push(aTag[i]);
    	}
    }
    return result;
	},
	
	ajax:function(url,fnsucc){
			var xhr = null;
			if(window.ActiveXObject){
				xhr = new ActiveXObject("MSXML2.XMLHttp");
			}else{
				xhr = new XMLHttpRequest();
			}
			xhr.open("GET",url+"?d="+new Date().getTime(), true);
			xhr.send(null);
			xhr.onreadystatechange=function(){
				if(xhr.readyState === 4){
					if(xhr.status === 200){
						fnsucc(xhr.responseText)
					}else{
						alert(xhr.status);
					}
				}
			}
	}
	
		
	

}