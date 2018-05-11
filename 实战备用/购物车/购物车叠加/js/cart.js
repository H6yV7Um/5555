/*
 思路：
 	1.获取所要操作的节点对象
 	2.查看本地数据容器中是否含有商品。
 	   若有，则动态生成数据表格，否则，显示购物车里面没有商品
 	3.若有，读取本地数据，根据本地数据，动态生成tr
 	4.获取tbody下面的所有的checkbox多选框节点对象，为每一个ckeckbox添加onchange事件
 		循环遍历所有的checkbox，看哪个checkbox被选中，则取出小计并累加
 		计算总价格赋值给totalPrice
 	5.为所有商品数量减少按钮和增加按钮添加一个点击事件，更改数量
 		获取本商品的pid的值，根据pid更新本地数据，
 		
 */
//获取表格节点对象
var table = document.getElementById("table");
//获取显示没有商品的节点对象
var box = document.getElementById("box");
//获取总价格的容器对象
var h2 = document.getElementById("h2");
//获取显示总价格的节点对象
var totalPrice = document.getElementById("totalPrice");
//获取全选框
var allCheck = document.getElementById("allCheck");
//获取表格体对象
var tbody = document.getElementById("tbody");
var total = getTotal();//商品总数量
//判断是否含有商品
if(total==0){
	table.className = "active";//表格隐藏
	h2.className = "active";//总价格隐藏
	box.className = "box active";//显示没有商品
}else{
	table.className = "";//表格显示
	h2.className = "";//总价格显示
	box.className = "box";//隐藏没有商品
	var arr = getNewArr();//从本地获取最新的数据
	for(var i = 0,len=arr.length;i<len;i++){
		var good = arr[i];
		var tr = document.createElement("tr");//动态创建一个tr
		tr.setAttribute("pid",good.pid);
		tr.innerHTML = '<td><input type="checkbox" class="ck"  /></td>'+
		    	'<td><img src="'+ good.imgSrc + '" alt="" /></td>'+
		    	'<td>'+ good.desc +'</td>'+
		    	'<td><button class="down">-</button><input type="text" value="'+ good.count +'" readonly="readonly" /><button class="up">+</button></td>'+
		    	'<td>￥<span>'+ good.price +'</span></td>'+
		    	'<td>￥<span class="span1">'+ good.price*good.count +'</span></td>'+
				'<td><button class="del">删除</button></td>';
		tbody.appendChild(tr);//将tr插入到tbody中
	}
//为tbody下面每一个checkBox添加onchange事件	
	var ck = document.querySelectorAll("tbody .ck");
	for(var i = 0,len = ck.length;i<len;i++){
		ck[i].onchange = function(){
			var flag = true;  //表示allcheck是否被选中
			//循环遍历检测看是否有 没有选中的checkBox
			for(var i = 0,len = ck.length;i<len;i++){
				//如果其中有一个没有被选中则allcheck不能被选中。
				if(ck[i].checked==false){
					flag = false; 
					break;
				}
			}
			if(flag){
				allCheck.checked = true;
			}else{
				allCheck.checked = false;
			}
		
			totalPrice.innerHTML = calculateTotalPrice();
		}
	}
	
	//为全选按钮添加一个点击事件
	allCheck.onchange = function(){
		if(this.checked){
			for(var i = 0,len = ck.length;i<len;i++){
				ck[i].checked = true;
			}
		}else{
			for(var i = 0,len = ck.length;i<len;i++){
				ck[i].checked = false;
			}
		}
		
		totalPrice.innerHTML = calculateTotalPrice();
	}
//加减号改变	
	var downs = document.querySelectorAll(".down");
	var ups = document.querySelectorAll(".up");
	
	for(var i = 0,len=downs.length;i<len;i++){
		downs[i].onclick = function(){
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			var count = this.nextElementSibling.value;
			count--;
			if(count>=1){
				updateGoodCountById(pid,-1);
				tr.children[5].firstElementChild.innerHTML = tr.children[4].firstElementChild.innerHTML*count;
				this.nextElementSibling.value = count;
			}
			tr.children[0].firstElementChild.checked = true;
			totalPrice.innerHTML = calculateTotalPrice();
			allChoose();
		}
		ups[i].onclick = function(){
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			var count = this.previousElementSibling.value;
			count++;
			updateGoodCountById(pid,1);
			tr.children[5].firstElementChild.innerHTML = tr.children[4].firstElementChild.innerHTML*count;
			this.previousElementSibling.value = count;
			tr.children[0].firstElementChild.checked = true;
			totalPrice.innerHTML = calculateTotalPrice();
			allChoose();
		}
	}

//删除操作
	var del = document.querySelectorAll(".del");
	for(var i = 0,len=del.length;i<len;i++){
		del[i].onclick = function(){
			if(confirm("你确定要删除吗？")){
				var tr = this.parentNode.parentNode;
				var pid = tr.getAttribute("pid");
				tbody.removeChild(tr);
				deleteObjById(pid);
				totalPrice.innerHTML = calculateTotalPrice();
			}
		}
	}
	
}
//改变总价格
function calculateTotalPrice(){
	var sum = 0;
	for(var i = 0,len = ck.length;i<len;i++){
		if(ck[i].checked){
			var tr = ck[i].parentNode.parentNode;
			var xiaoji =  tr.children[5].firstElementChild.innerHTML;
			sum = sum + parseInt(xiaoji);
		}
	}
	return sum;		
}

//allChoose()判断是否全选
function allChoose(){
	var flag = 1;
	for(var i = 0;i<ck.length;i++){
		if(ck[i].checked){
			continue;
		}else{
			flag = 0;
			break;
		}
	}
	if(flag){
		allCheck.checked = true;
	}else{
		allCheck.checked = false;
	}
}