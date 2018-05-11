		function ajax(url,fnWin,fnFaild){
			//创建Ajax		
			var xhr = null; 
			if(window.XMLHttpRequest){
				xhr = new XMLHttpRequest();
			}else{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//2.连接服务器	
			xhr.open("GET",url,true);
			//3.发送请求
			xhr.send();
			//4.返回数据
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4){
					if(xhr.status == 200){
						if(fnWin){
							fnWin(xhr.responseText);
						}
					}else{
						if(fnFaild){
							fnFaild();
						}
					}
				}
			}
		}
		

