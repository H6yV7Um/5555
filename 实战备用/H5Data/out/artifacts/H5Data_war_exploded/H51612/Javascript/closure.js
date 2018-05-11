/**
 * Created by Evil on 16/8/8.
 */
/**1、匿名函数:没有名称只有函数体的一个函数,不能直接的仅做声明。
 * 2、一定要赋值给一个变量或者变成表达式自我运行。
 */
/*function (){
    //这里会报错。
}*/
/**
 * 匿名函数赋值给一个变量
 * @private
 */
var _handle=function (){
    //alert("error!!");
}
/**
 * 自运行方式
 */
/*(function(){
    alert("run!!");
})();*///这种方式更好理解
(function(){
    //alert("auto!!!");
}());

function common(){
    //alert("common");
}
//common();
//带名称的函数同样可以自我运行。但是一般不这么用。


/**
 * 回顾事件那一章节,绑定事件的方式。
 */
function closure(){
    var _div=document.getElementsByTagName("div");
    //第一种方式获取当前对象的索引值。
    for(var i=0;i<_div.length;i++){
        (function(n) {
            _div[n].onclick = function(){
                alert(n);
            };
        })(i);
    }//效果:自我执行的匿名函数并保存变量
    

    
    //第二种方式获取当前对象的索引值
    for(var m=0;m<_div.length;m++){
        _div[m].onclick = function () {
            //alert(m);//此处永远显示的是_div集合的长度,也就是退出循环时候的值。
            for (var j = 0; j < _div.length; j++) {
                if (this === _div[j]) {
                    j;//j就是我要找到的当前对象的索引值。
                    break;
                }
            }//利用对象比较的方式查到当前对象与集合中的第几个相等。相等时的所引值就是要找的所引值。
        }
    }
    
    
    /*//调用函数就是在复制函数的代码。所以自我执行的匿名函数可以保存变量的值。
    (function(n) {
        function c() {
            alert(n);
        }
        _div[i].onclick = c;
    })(0);
    (function(n) {
        function c() {
            alert(n);
        }
        _div[i].onclick = c;
    })(1);
    (function(n) {
        function c() {
            alert(n);
        }
        _div[i].onclick = c;
    })(2);*/
}





/*//证明HTML元素节点的作用域是默认全局范围有效的。
function closure02(){
    alert(document.getElementsByTagName("div")[0].innerHTML);
    //下面设置为1000,这个函数依然可以读取。
}
window.onload=function(){
    var _div=document.getElementsByTagName("div");
    _div[0].innerHTML=1000;//此处设置上面有效
    closure();
    closure02();
}*/





/**
 * 函数的链式调用
 * @param m
 * @returns {fn}
 */
/*function fn(m){
    alert(m);
    return fn;
}
fn(0)(1)(2)(3)==fn();
*/






//阐述闭包的概念:闭包是指在函数外部访问函数内部作用域中变量的函数。
//也可以说:闭包是指子函数在父函数外部访问父级函数作用域中变量的函数。
//比如:儿子在外地花老子钱,也是可以的。
function animal(){
    var m=1000;
    return function(){
        alert(m);
    }
}
var _tree=animal();
//_tree();//外部的tree函数可以访问m;



//为什么闭包会引发内存泄漏
function memory(){
    var m="memory";
    return function (){
        console.log(m);
    }
}
var _ABC=memory();
//内存泄漏的原因:因为_ABC是全局变量,此时全局变量保存了函数内部的匿名函数的内存
//以至于整个memory内存不能在调用完以后自动回收。所以要等到这个页面消失才能被回收。
//也就是一直占用内存。


//解决内存泄漏的问题方法:用函数的方式来解决。
// 第一种方式
function solution(){
    var _xyz=memory();
    return null;
}
solution();
//第二种方式:把全局变量手动回收内存。
_ABC=null;






variable();//函数表达式提升;
function variable(){
    //变量提升
    //alert(_v);//先使用
    var _v=0;//再声明并初始化
}
function variable(){
    var _v;//声明也叫定义一个变量
    //alert(_v);
    _v=0;//给变量赋值
}



/*fn();
var fn=function(){
    alert("var");
}*/
/**
 * 以上三句话,变量提升完成以后的结果为:
 * var fn;
 * fn();
 * fn=function(){
 * alert("var");
 * }
 */

/*function fn(){
    alert("function");
}*/


//第一种
/*var fn;
function fn(){
    alert("function");
}
fn();
fn=function(){
    alert("var");
}*/
//第二种
/*function fn(){
    alert("function");
}
var fn;
fn=function(){
    alert("abck");
};
fn();
fn=function(){
    alert("var");
}*/

/*
function fn(){
    alert("function");
}
var fn;
fn=function(){
    alert("abck");
};

fn();*/





















/**
 * 类:是对对象的抽象,也就是说类是一种抽象的数据类型。
 * 简单的理解,就是类是定义某一类事物的规则的函数。
 * 如:汽车这个类就定义来汽车必须有轮胎,引擎等等,所以构造(即生产)出来的对象也同样具有
 *    类函数定义的属性和方法。因为对象是在类的结构体系下创建的。
 * 构造函数:是一种特殊的方法,只能被new关键字调用,更是某一个类的公共标识
 *         (在编程语言中构造函数函数名必须与类名称完全相同,所以说构造函数是类的公共标识)。
 *
 */
function Car(){
    this.engine="4WD";
    this.wheel="4";
    this.color="red";
    this.driver=function(){

    }
    this.oil=function(){

    }
    this.join=function(){

    }
}
var _car=new Car();
//alert(_car.constructor);



var _json={
    "name":"tom",
    "age":"10"
}






/**
 * 所有引用类型数据都继承自Object对象。
//OOP(Object oriented Programming)编程,就是面向对象编程。
var _obj=new Object();
//alert(typeof _obj);
//alert(_obj.constructor);// constructor属性是原型属性下的其中一个属性,一个指针。
                        // 也就是说_obj这个对象下原本没有这个属性。
                        // prototype 是函数也就是类所特有的属性。
                        // 普通对象不具有该属性。
                        // prototype属性下还有一个属性叫 __proto__ 也是一个指针

_obj.attr=10000;//添加一个属性。不需要var声明
//alert(_obj.attr);
delete _obj.attr;
//alert(_obj.attr);

alert(Car instanceof Function);


window.onload=function(){
    var _div=document.getElementsByTagName("div");
    _div[0].attr=1000;
    alert(_div[0].attr);
    alert(_div[0] instanceof Object);
}*/




var _obj=new Object();
_obj.attr=100;
_obj.run=function(){
    alert("run");
    return 1;
}

var _o=_obj;


var _person=new Object();
_person.attr="name";
_person.run=function(){
    alert("run");
    return "person";
}


/*alert(_obj.run());
alert(_person.run());

alert(_obj.attr);
alert(_person.attr);
*/



//字面量方式声明对象;
var _json={
    "name":"tom",
    "run":function(){
        alert("run");
    }
};//==new Object;

_json["run"]();





























































//证明普通函数也是一个类。
function Comment(){
    var i=0;
    function small(){

    }
    small();
}
var _comment=new Comment();
//alert(typeof _comment);
_comment.age=10000;
//alert(_comment.age);





















function entry(){//类,本身也是一个对象。
    var name="";
    this.getName=function(){
        return name;
    }
    this.setName=function(_name){
        name=_name;
    }
}
var _entry=new entry();
_entry.setName("tom");
_entry.getName();
console.log(_entry);



















function mulitiple(){
    var x=1,y=1;
    return function(){
        for(;x<10;x++){
            for(y=1;y<=x;y++){
                document.write(x+"*"+y+"="+x*y);
            }
            document.write("<br/>");
        }
    }
}
mulitiple()();


































