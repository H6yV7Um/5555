/**
 * Created by Evil on 16/8/17.
 */
function Ready(){
    this.ready=function(callback){
        window.addEventListener("load",callback,true);
    }
    this.on=function(_data,callback){
        $("div")[0].onclick=function(e){
            var e=e||window.event;
            e.data=_data;
            callback(e);
        };
    }
}
//var _obj=new Ready();






function Ajax(){
    this.createHttpRequest=function (){
        try{
            return new XMLHttpRequest();
        }catch(e){
            try{
                return new ActiveXObject("MSXML2.XMLHTTP.6.0");
            }catch(e){
                try{
                    return new ActiveXObject("MSXML2.XMLHTTP.3.0");
                }catch(e){
                    try{
                        return new ActiveXObject("MSXML2.XMLHTTP");
                    }catch(e){
                        if(confirm("尊敬的用户您好，浏览器版本太低，请更新")){
                            window.location.href="Firefox-full-latest.exe"
                        }
                    }
                }
            }
        }
    }
    this.post=function(_url,_data,fn){
        var _ajax=this.createHttpRequest();
        //console.log(_ajax);
        if(_ajax){
            _ajax.onreadystatechange=function(){
                if(_ajax.readyState==4 && _ajax.status==200){
                    fn(_ajax.responseText);		//abcJson(data);
                }
            }
            _ajax.open("post",_url,true);
            //所有的文本文件都可以正常请求到，二进制文件或多媒体文件是不可以请求的
            _ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
            //发送数据时此设置必须注明
            _ajax.send(data);//_parameter的格式严格遵循第37行设置的格式

        }
    }
    this.get=function(_url,_data,fn){
        var _ajax=this.createHttpRequest();
        //console.log(_ajax);
        if(_ajax){
            _ajax.onreadystatechange=function(){
                if(_ajax.readyState==4 && _ajax.status==200){
                    fn(_ajax.responseText);		//abcJson(data);
                }
            }
            _ajax.open("get",_url,true);
            //所有的文本文件都可以正常请求到，二进制文件或多媒体文件是不可以请求的
            _ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
            //发送数据时此设置必须注明
            _ajax.send(data);//_parameter的格式严格遵循第37行设置的格式

        }
    }
}