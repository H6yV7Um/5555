/**
 * Created by Evil on 16/8/9.
 */

var _obj=new Object();
var _person=new Object();
//以上方式创建对象的缺点:数据类型不清晰

//alert(_person instanceof Object)

//构造函数方式创建对象;
function People(){
    this.arm="2";
    this.leg="2";
    this.head="1";
    this.body=1;
    this.eat=function(){
        console.log("eat");
    }
    this.sleep=function(){
        console.log("sleep");
    }
}
var _person=new People();
_person["eat"]();//访问对象属性和方法的方法,可以通过中(括号加双引号加属性名或者方法名),也可以通过(.方法名),或者(.属性名)
//console.log(People);
var _zhansan=new People();
_zhansan.arm;












//alert(_person instanceof People);//People类型。
// 构造函数的方式创建对象可以精确的区分对象的数据类型。
function Animal(){
    this.leg=4;
}
var _cat=new Animal();
//alert(_cat instanceof Animal);//Animal类型




















function checkOOP(){
    var _obj=new Object();
    console.log(_obj.constructor);
    console.log(Object.prototype);
    //hasOwnProperty表示是否是自己拥有的属性
    console.log(_obj.hasOwnProperty("constructor"));
}
window.onload=function(){
    //checkOOP();
}



/**
 * 在函数内部不使用var关键字定义的变量,会自动转成全局变量。整个script标签内均有效;
function test(){
    a=100;
    var b=1000;
}
test();
alert(a);
alert(b);*/



















//prototype是一个特殊的内置属性。
/*Array.prototype.c_sort=function(){//原型属性也是一个对象,即引用类型属性。
    var _tmp=this[0];
    for(var i=0;i<this.length;i++){
        for(var n=i+1;n<this.length;n++){
            if(this[i]<this[n]){
                _tmp=this[n];
                this[n]=this[i];
                this[i]=_tmp;
            }
        }
    }
};
console.log(Array.prototype);
var _arr=new Array(2,5,3,1);
_arr.c_sort();
console.log(_arr);
console.log(Array.prototype);

function People(){
    
}

People.prototype.abc=function(){
    console.log("123");
}
var _p=new People();
console.log(_p.abc);*/

















/*function Animal(){
    this.move=function(){
        console.log("move");
    }
    this.eat=function() {
        console.log("eat");
    }
    this.sleep=function(){
        console.log("sleep");
    }
}
function People(){
    this.head=1;
    this.eye=2;
    this.mouth=1;
    this.walk=function(){
        
    }
    this.think=function(){
        
    }
    this.move=function(){
        console.log("run");
    }
}
function Parents(){
    this.money=100000000000000;
}



var _animal=new Animal();
//var _a=_animal;
//_a.move();
People.prototype=_animal;
var _p=new People();
//_p.move();
Parents.prototype=new People();
var _parents=new Parents();
_parents.eat();
 */













/*var _parents=new Parents();
_parents.constructor=Parents;
//console.log(_parents);

function checkProperty(){
    if("money" in _parents){
        if(_parents.hasOwnProperty("money")){//hasOwnProperty()方法检测是否拥有该属性。返回值为boolean类型。
            alert("该属性为实例属性");
        }else{
            alert("该属性为原型属性");
        }
    }
}
checkProperty();*/

//isPrototypeOf:检测原型是否属于该对象
//alert(People.prototype.isPrototypeOf(_parents));
















//另外一种继承方式:通过调用call、apply

function Animal(){
    this.move=function(){
        console.log("move");
    }
    this.eat=function() {
        console.log("eat");
    }
    this.sleep=function(){
        console.log("sleep");
    }
}
function People(_no1,_no2){
    this.head=_no1;
    this.eye=_no2;
    this.mouth=1;
    this.walk=function(){

    }
    this.think=function(){

    }
    this.move=function(){
        console.log("run");
    }
}
function Parents(){
    this.money=100000000000000;
}
var _parents=new Parents();
//alert(_parents.money);
People.call(_parents,"abc","xyz");
//alert(_parents.eye);
Animal.apply(_parents,["abc","xyz"]);
_parents.eat();
//alert(_parents.money);






//接口
/*function Interface(){
    this.face=null;
}
var _usb=new Interface();
_usb.face=function(){
    alert("usb");
}
_usb.face();
var _ssd=new Interface();
_ssd.face=function(){
    alert("ssd");
}
_ssd.face();*/











//factory 工厂模式
/*function factory(){
    var _obj=new Object();
    _obj.age=10;
    _obj.tall=1000+"a";
    _obj.walk=function(){
        alert("walk");
    }
    return _obj;
}
var _o=factory();
alert(_o.tall);
var _p=factory();
alert(_p.tall);
alert(_p===_o);*/


function OOP(){
    this.abc="10000";
}
OOP.prototype.fly=function(){
    alert("fly");
}
var _oop=new OOP();
var _fly=new OOP();




/*var _obj=new Object();
_obj.abc=1000;
_obj.xyz=1000;
_obj=new Object();*/












/*循环继承
People.prototype=new Animal();
Parents.prototype=new People();
Animal.prototype=new Parents();
var _an=new Animal();
console.log(_an.eye);*/



















/*function Dog(){
    
}
Dog.prototype.abc=new Object();
Dog.prototype.abc.xyz=100;//xyz是abc对象的私有属性。不是Object的实例属性,也不是Object的原型属性。
var _dog=new Dog();
alert(_dog.xyz);*///所以这个地方找不到该属性。私有属性只能通过直接拥有者调用。





/*var abc=new Object();
abc.xyz=1000;
var _obj=new Object();
_obj.xyz*/
//私有属性是不能被继承的。只有公共属性才可以被继承








































