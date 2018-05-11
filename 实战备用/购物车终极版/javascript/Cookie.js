/**
 * Created by Administrator on 2016/11/3.
 */
function CookieOperator(){
    /**
     * �˷����ǰѶ�λ����ת�����ַ���
     * @param _data type === Array (��ά����)
     * @returns {string} ���ض�λ������ַ�����ʽ
     */
    var format=function(_data){
        var _tmp="";
        for(var i=0;i<_data.length;i++){
            _tmp+="[\""+_data[i].join(",").replace(/\,/g,"\",\"")+"\"],";
        }
        return _tmp.replace(/\,$/g,"");
    }
    /**
     * ʵ�������save����Ҫ����������ʲô��
     * ���ǰ�JSON��ʽ��dataת�����ַ��������浽�������COOKIE�ڣ�
     * �������ı�������
     * @param _data type===Object like JSON
     * var cart={
            "1001":[[1,"310","3100"],[1,"no","���","��Χ","��Χ"],[1,"no","���","��Χ","��Χ"]],
            "1002":[[1,"yes","red","���","��Χ","��Χ"],[1,"no","���","��Χ","��Χ"]],
            "1003":[[1,"yes","red","���","��Χ","��Χ"]]
        }
     */
    this.save=function(_data){
        var _tmp="{";
        for(var k in _data){
            _tmp+="\""+k+"\":["+format(_data[k])+"],";//_data[k]��һ����λ����

        }
        _tmp=_tmp.replace(/\,$/g,"");
        _tmp+="}";//����Ϊֹ _tmp���� _data �ַ�������
        document.cookie="cart="+window.encodeURIComponent(_tmp);
    }
    /**
     * @param key type==string ��cookie��keyֵ
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
     * ҳ����Ҫ�浽cookie��������ԭ��cookie�ڵ����ݽ��бȽ�
     * @param data type==Object like JSON ʵ�ʾ��� cookie �ڵ�����ת����Object
     * @param _tmp type===Array ҳ���ϱ�ѡ�����Ʒ���������ҽ�Ҫ���浽cookie�ڵ�����
     * @param key type===String ��Ʒ��ID
     * @param num �������ͣ�Ҫ�����������һ��Ҫ����������
     * @param cmd Boolean���ͣ�true:��ʾҪ��cookie��������ӣ�false:��ʾֱ����дcookie�ڵ�����
     * @returns {*} JSON��ʽ����save�������浽cookie��
     */
    this.compareData=function(data,_tmp,key,num,cmd){
        var _has=1;//_has����:��¼_tmp�ڵ�Ԫ����data�е�С�����ڵ�Ԫ�ص���ͬ�ĸ���
        var _flag=0;//_flag���ã����ڼ�¼_tmp�����Ƿ���ӵ� data �ڣ�ֵΪ��1��ʱ���ʾ�Ѿ���ӵ�data��
        if(!data[key]){//���data[key]===undefined ��ִ��
            data[key]=[_tmp];
            return data;
        }
        for(var i=0;i<data[key].length;i++){
            if(_tmp.length!=data[key][i].length){
                //����ָҳ������ѡ��Ĳ�������
                // �͵�ǰ��cookie�е�ĳ��С����ĳ��Ȳ�ͬ���Ͳ��ñȽ�
                //����Ҫ������һ��ѭ������������С������бȽ�
                continue;//��������ѭ����break������ǰ����ѭ����
            }
            //�����ȵĻ���������ıȽ�
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
     * ����������������ٹ��ﳵ�е���Ʒ������
     * @param data JSON ��ʽ������ OBJECT ���ͣ����� COOKIE �ڵ�cart����Ӧ����������
     * @param _tmp //����Ҫ���ٵ���Ʒ�����������ļ��ϡ��������ͣ���һԪ�ر�������Ʒ����
     * @param key  //Ҫ������������Ʒ��ID
     * @param num //��ʾֱ����д�������������������ͣ�������Number����
     * @returns {*} //����ֵ������ JSON��ʽ��cookie���ݣ�����data��Ŀ����Ϊ����save����֪������ʲô������
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