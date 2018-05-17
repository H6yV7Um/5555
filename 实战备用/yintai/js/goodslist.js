/*列表页加载数据 */
$(function(){
	$.ajax({
		type:"get",
		url:"json/goods.json",
		async:true,
		success:function(res){
			var html = "";
			for (var i  in  res) {
				//页面信息加载
				for(var j = 0 ; j < res[i].list.length ; j++){
					var child = res[i].list[j];
					html += `<div class="goodInfo">
								<div class="goods-wrap">
									<div class="bigImg">
										<a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank"><img src="images/${child.bigsrc}" alt="${child.name}"/></a>
									</div>
									<div class="smallImg">
										<div class="smallImgList">
											<ul>
												<li><a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank"><img src="images/${child.smallsrc}"/></a></li>
												<li><a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank"><img src="images/${child.smallsrc}"/></a></li>
												<li><a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank"><img src="images/${child.smallsrc}"/></a></li>
												<li><a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank"><img src="images/${child.smallsrc}"/></a></li>
											</ul>
										</div>
									</div>
									<div class="goodPrice">
										<strong>￥${child.price}</strong>
										<s>￥${child.originalPrice}</s>
									</div>
									<div class="goodTxt">
										<p><a href="goodsdetails.html?pid=${child.id}&cname=${i}" target="_blank">${child.name}</a></p>
									</div>
									<div class="mz">
										<span><em>满赠</em></span>
									</div>
									<div class="goodAddInfo">
										<p><a href="#">兰蔻买即赠精华乳10ml，赠完为止</a></p>
										<p><a href="#">兰蔻品牌店</a></p>
									</div>
								</div>
							</div>`;
				}
			}
			$(".goods-main").html(html);		
		}
	});
	
})