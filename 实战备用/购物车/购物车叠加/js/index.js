/*
 	思路：
 		第一步：当页面加载完后后，获取所要操作的节点对象
 		第二步：为每个添加购物车按钮添加一个点击事件
 		第三步：
 			通过所点击的当前按钮，找到dl节点对象
 			通过dl节点对象，分别找到该商品信息。
 				商品的编号
 				图片路径
 				商品名称
 				商品描述
 				商品价格
 			把商品添加到购物车，实际上就是将 对象组织好的商品信息  添加到本地容器中
 			本地容器，其实就是一个cookie,cookie中就是一个字符串数组对象[]
 				添加商品的时候，先读取本地的数据（就想当于查看购物车），看本地数据中是否已经添加过了该商品。 如果添加过了，则把该商品（对象）拿出来，改变其数量，然后再放本地容器中。
 				否则，就用对象组织好的商品信息  添加到本地容器中 数量默认为1
 			
 			统计商品总数量：
 				循环遍历本地容器中所有对象，取出每个对象的count属性值，累加。
 */

var datas = getCookie("datas"); 
  //从本读取容器
  console.log(getCookie("datas"))
var listArr;  //转换后的JSON对象  
if(datas){ //本地有这个容器
	  listArr = JSON.parse(datas)
}else{    //本地没有这个容器
	 setCookie({
	 	name:"datas",
	 	value:"[]"
	 })
	 datas = getCookie("datas");  
	 listArr = JSON.parse(datas);
}

var btns = document.querySelectorAll(".list dl button"); //获取所有的添加购物车按钮
var ccount = document.getElementById("ccount");  //获取显示商品总数量的节点对象
/*循环遍历，为每个添加购物车按钮添加一个点击事件*/
ccount.innerHTML = getTotal();//更新

for(var i = 0,len = btns.length;i<len;i++){
	btns[i].onclick = function(){
		//this 当前按钮
		var dl = this.parentNode.parentNode;  //dl节点对象
		var nodes = dl.children;  //dl下面的所有子元素节对象
		var pid = dl.getAttribute("pid");  //商品编号
		var flag = isHasGoodsByPid(pid); //是否已经存在
		//alert(flag)
		if(flag){ //有这个商品  改变数量
			updateGoodCountById(pid,1);
			listArr = getNewArr();//程序中的数组对象必须与本地数据同步
			ccount.innerHTML = getTotal();
		}else{ //没有这个商品 用对象组织起来添加进去
			var imgSrc = nodes[0].firstElementChild.src; //图片的路径
			var pName = nodes[1].innerHTML;  //商品名称
			var desc = nodes[2].innerHTML;   //商品的描述
			var price = nodes[3].firstElementChild.innerHTML; //图片的路径
			var obj = {
				pid:pid,
				imgSrc:imgSrc,
				price:price,
				desc:desc,
				pName:pName,
				count:1
			};
			
			listArr.push(obj);
			updateData(listArr)
			ccount.innerHTML = getTotal();
		}
	}	
}























