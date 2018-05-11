/**
 * Created by Evil on 16/8/25.
 */

    function getCookie(_key){
        var _cookie=document.cookie;
        var _arr=_cookie.split(/;\s*/g);
        var _tmp=null;
        for(var i=0;i<_arr.length;i++){
            _tmp=_arr[i].split("=");
            if(_tmp[0]==_key){
                return window.decodeURIComponent(_tmp[1]);
            }
        }
    }
    function setCookie(_key,_value,_expires){
        if(_expires) {
            document.cookie = _key + "=" + _value + ";expires=" + _expires;
        }else{
            document.cookie = _key + "=" + _value + ";";
        }
    }
    function delCookie(_key){
        var _cookie=document.cookie;
        var _arr=_cookie.split(/;\s*/g);
        var _tmp=null;
        for(var i=0;i<_arr.length;i++){
            _tmp=_arr[i].split("=");
            if(_tmp[0]==_key){
                document.cookie=_tmp[0]+"="+_tmp[1]+";expires="+new Date("1970-01-01");
                break;
            }
        }
    }
