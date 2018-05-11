/**
 * Created by Evil on 16/8/8.
 */
function obtainDistribute(_identify){
    ajaxRequest("post","Javascript/distribute.json",true,null,function(data){
        var _d=window.eval("("+data+")");
        var _as="";
        for(var i=0;i<_d["d"].length;i++){
            _as+="<a href=\"#\">"+_d["d"][i]+"</a>";
        }
        document.getElementById(_identify).innerHTML=_as;
    });
}
window.onload=function(){
    obtainDistribute();
    var _list=document.getElementById("top").getElementsByTagName("span");
    for(var i=0;i<_list.length;i++){
        _list[i].onmouseover=function(){
            if(this.className=="send"){
                this.style.backgroundColor="#fff"
                obtainDistribute(this.className);
            }
        }
        _list[i].onmouseout=function(){
            if(this.className=="send"){
                document.getElementById(this.className).style.display="none";
            }
            
        }
    }
    
}