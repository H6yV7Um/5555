/**
 * Created by Administrator on 2016/11/3.
 */
function CookieOperator(){
    /**
     * 此方法是把二位数组转换成字符串
     * @param _data type === Array (二维数组)
     * @returns {string} 返回二位数组的字符串格式
     */
    var format=function(_data){
        var _tmp="";
        for(var i=0;i<_data.length;i++){
            _tmp+="[\""+_data[i].join(",").replace(/\,/g,"\",\"")+"\"],";
        }
        return _tmp.replace(/\,$/g,"");
    }
    /**
     * 实际上这个save方法要做的事情是什么？
     * 就是把JSON格式的data转换成字符串，保存到浏览器的COOKIE内；
     * 考虑中文编码问题
     * @param _data type===Object like JSON
     * var cart={
            "1001":[[1,"310","3100"],[1,"no","肩宽","腰围","臀围"],[1,"no","肩宽","腰围","胸围"]],
            "1002":[[1,"yes","red","肩宽","腰围","臀围"],[1,"no","肩宽","腰围","臀围"]],
            "1003":[[1,"yes","red","肩宽","腰围","臀围"]]
        }
     */
    this.save=function(_data){
        var _tmp="{";
        for(var k in _data){
            _tmp+="\""+k+"\":["+format(_data[k])+"],";//_data[k]是一个二位数组

        }
        _tmp=_tmp.replace(/\,$/g,"");
        _tmp+="}";//到此为止 _tmp就是 _data 字符串化身
        document.cookie="cart="+window.encodeURIComponent(_tmp);
    }
    /**
     * @param key type==string 是cookie的key值
     */
    this.read=function(key){
        var _reg=new RegExp(key+"=","g");//    /cart=/g
        if(_reg.test(document.cookie)) {
            _reg.lastIndex=0;
            var cookie = document.cookie.split(/;\s*/g);
            for (var i = 0; i < cookie.length; i++) {
                if (_reg.test(cookie[i])) {
                    _reg.lastIndex = 0;
                    return JSON.parse(window.decodeURIComponent(cookie[i].replace(_reg, "")));
                    //return JSON.parse(cookie[i].split("=")[1]);
                }
            }
        }else{
            return new Object();
        }
    }
    /***
     * 页面上要存到cookie的数据与原来cookie内的数据进行比较
     * @param data type==Object like JSON 实际就是 cookie 内的数据转换成Object
     * @param _tmp type===Array 页面上被选择的商品参数，而且将要保存到cookie内的数据
     * @param key type===String 产品的ID
     * @param num 数字类型，要购买的数量。一定要是数字类型
     * @param cmd Boolean类型，true:表示要和cookie的数量相加，false:表示直接重写cookie内的数量
     * @returns {*} JSON格式，供save方法保存到cookie内
     */
    this.compareData=function(data,_tmp,key,num,cmd){
        var _has=1;//_has作用:记录_tmp内的元素与data中的小数组内的元素的相同的个数
        var _flag=0;//_flag作用：用于记录_tmp数据是否添加到 data 内，值为：1的时候表示已经添加到data里
        if(!data[key]){//如果data[key]===undefined 就执行
            data[key]=[_tmp];
            return data;
        }
        for(var i=0;i<data[key].length;i++){
            if(_tmp.length!=data[key][i].length){
                //就是指页面上所选择的参数长度
                // 和当前的cookie中的某个小数组的长度不同，就不用比较
                //所以要进行下一次循环，跟其他的小数组进行比较
                continue;//结束本次循环；break结束当前整个循环；
            }
            //如果相等的话进行下面的比较
            for(var n=1;n<_tmp.length && data[key][i].length;n++){
                if(data[key][i][n]==_tmp[n]){
                    _has++;
                }
            }
            if(_has==_tmp.length){
                data[key][i][0]=(num?(cmd?num+parseInt(data[key][i][0]):num):parseInt(data[key][i][0])+1);
                _flag=1;
                break;
            }else{
                _has=1;
            }
        }
        if(_flag<1) {
            data[key].push(_tmp);
        }
        return data;
    }
    /**
     * 这个方法是用来减少购物车中的商品的数量
     * @param data JSON 格式的数据 OBJECT 类型，还是 COOKIE 内的cart键对应的完整数据
     * @param _tmp //就是要减少的商品参数与数量的集合。数组类型，第一元素必须是商品数量
     * @param key  //要减少数量的商品的ID
     * @param num //表示直接填写的最终数量。数据类型，必须是Number类型
     * @returns {*} //返回值必须是 JSON格式的cookie数据，返回data的目的是为了让save方法知道保存什么东西。
     */
    this.dealNum=function(data,_tmp,key,num){
        var _has=1;
        for(var i=0;i<data[key].length;i++){
            for(var n=1;n<_tmp.length;n++){
                if(data[key][i][n]===_tmp[n]){
                    _has++;
                }
            }
            if(_has==_tmp.length){
                data[key][i][0]=(num?num:parseInt(data[key][i][0])-1);
                break;
            }else{
                _has=1;
            }
        }
        return data;
    }

    this.deleteArray=function(data,_tmp,key){
        var _has=1;
        for(var i=0;i<data[key].length;i++){
            for(var n=1;n<_tmp.length;n++){
                if(data[key][i][n]===_tmp[n]){
                    _has++;
                }
            }
            if(_has==_tmp.length){
                data[key].splice(i,1);
                break;
            }else{
                _has=1;
            }
        }
        return data;
    }

    this.dealRecordSet=function(data,key){
        delete data[key];
        return data;
    }
}