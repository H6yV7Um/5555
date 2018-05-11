window.alert=function(text){
	dialog(text);
}

function dialog(text){
	var dialogBox=document.createElement("div");
	var title=document.createElement("div");
	var closeBtn=document.createElement("div");
	var textBox=document.createElement("div");
	
	textBox.innerHTML=text;
	closeBtn.innerHTML="X";
	
	title.appendChild(closeBtn);
	dialogBox.appendChild(title);
	dialogBox.appendChild(textBox);
	document.getElementsByTagName("body")[0].appendChild(dialogBox);
	closeBtn.onclick=function(){
		document.getElementsByTagName("body")[0].removeChild(dialogBox);
	}
}
