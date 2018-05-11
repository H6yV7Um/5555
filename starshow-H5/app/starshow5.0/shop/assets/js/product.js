//data
var host=commonCla.hostBase+"/v15";
var urlBase=commonCla.shareUrlBase;
var prodId=commonCla.analyzParams("id");

var checkChose=function(){
	var choseList=$(".js_chose span");
	for (var i = 0; i < choseList.length; i++) {
		if($(choseList[i]).html()==""){
			return false
		}
	};
	return true;
}
//init photoalbum
var imgDataNumber;
var imgListData;
var initPhotoalbum=function(cla){
  var imgList=$("."+cla+" img");
  imgDataNumber=new Map();
  imgListData=[];
  for (var i = 0; i < imgList.length; i++) {
    var img_src=$(imgList[i]).attr("src");
    var img_src_fake=$(imgList[i]).attr("data-echo");
    if(img_src_fake==undefined || img_src_fake==null){
      imgDataNumber[img_src]=i;
      imgListData[i]=img_src;
    }else{
      imgDataNumber[img_src_fake]=i;
      imgListData[i]=img_src_fake;
    }

  };
}
var getImgNumber=function(val){
  return imgDataNumber[val];
}
//客户端交互
var addToClick=function(bridge,type){
	var source=$("#hide_info").attr("source");
	var jwt_token=get_token();
	if(source=="detail"){
	  if(jwt_token==""){
			//登录
			setBridgeCallHandler(bridge, {
			'action': '1',
			'nextStep':'1'
			})
		}else{
			var chose_status=checkChose();
			if(type=="buy"){
				if(!chose_status){
					//打开选项卡
					if($(".prod_params").css("display")=="none"){
						openParams();
					}else{
						sAlert_auto("请选择规格",1000);
					}
					
				}else{
					if(!isNum($(".txt_buyNum").val())){
						sAlert("请输入数字");
					}else{
						addToBuy(bridge);
					}
					
				}
				
			}else{
				if(!chose_status){
					//showSweetAlert
					sAlert_auto("请选择规格",1000);
				}else{
					if(!isNum($(".txt_buyNum").val())){
						sAlert("请输入数字");
					}else{
						addToCar(bridge);
					}
				}
			}
		}
	}else{
		openApp("home");
	}
		
}
var shareFun=function(){
	//分享跳转APP
	//加入购物车
	$(".params_cons").on("click",".js_addCar_sure",function(){
		addToClick("","car");
	})
	$(".params_cons").on("click",".js_toBuy_sure",function(){
		addToClick("","buy");
	})
  	//立即购买
	$(".btnList").on("click",".js_toBuy",function(){
		$('.params_cons .btn_sure').removeClass("js_addCar_sure").addClass('js_toBuy_sure')
		addToClick("","buy");

	})
  //商家首页
	$(".shopInfo").click(function(e){
      openApp("home")
	})
}
var viewPic=function(imgVal,bridge,e){
	var thisNumber=getImgNumber(imgVal);//从0开始
     //console.log(imgListData)
     //console.log(thisNumber+1+":"+imgListData.length+":"+imgListData[thisNumber])
    //var resutlData=JSON.stringify({"photos":imgListData,"position":thisNumber})
    e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '18',
        "photos":imgListData,
        "position":thisNumber
      })
}

var clientFun=function(bridge){
	//点击图片放大
    $(".js-mainPic").on("click","img",function(e){
    	 initPhotoalbum("js-mainPic");
         var imgVal=$(this).attr("src");
         viewPic(imgVal,bridge,e);
         
    })
    $(".prod_desc_con").on("click","img",function(e){
    	 initPhotoalbum("prod_desc_con");
         var imgVal=$(this).attr("src");
         viewPic(imgVal,bridge,e);
     })
	//加入购物车
	$(".params_cons").on("click",".js_addCar_sure",function(){
		addToClick(bridge,"car");
	})
	$(".params_cons").on("click",".js_toBuy_sure",function(){
		addToClick(bridge,"buy");
	})
	//立即购买
	$(".btnList").on("click",".js_toBuy",function(){
		$('.params_cons .btn_sure').removeClass("js_addCar_sure").addClass('js_toBuy_sure')
		addToClick(bridge,"buy");

	})
	//过期重新登录
   $("body").on("click",".btn_relogin_underline",function(e){
      e.preventDefault()
      setBridgeCallHandler(bridge, {
        'action': '10',
        'nextStep':'10'
      })
   })
   //商家首页
	$(".shopInfo").click(function(e){
      var id=$(this).attr("shop_id");
		  e.preventDefault()
	      setBridgeCallHandler(bridge, {
          'action':'20',
	        'id': id,
	        'buy_type':'2'
	      })
	})

}
//下一步操作
var nextStepFun=function(data,bridge){
  //活动分享
  var shareActivity=function(bridge){
    setBridgeCallHandler(bridge, {
      'action': '3',
      'share': {
        'share_url':commonCla.shareUrlBase+"/starshow5.0/shop/prodShare.html?id="+commonCla.analyzParams("id"),
        'title': $(".prod_tit h1").html(),
        'content': "时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",
        'cover': $(".params_cover").find("img").attr("src")
      }
    })
  }
	if (data.nextStep == '1') { //登录
      if (get_token() == "") {
        login_token = data.jwt_token;
        var id=commonCla.analyzParams("id")
        window.location.href = "prodDetail.html?id="+id+"&jwt_token=" + data.jwt_token;
      }
    }else if (data.nextStep == '8') { 
      shareActivity(bridge);
    }else if (data.nextStep == '10') { //过期登录
       login_token = data.jwt_token;
       var id=commonCla.analyzParams("id")
       window.location.href = "prodDetail.html?id="+id+"&jwt_token=" + data.jwt_token;
    }
}
//立即购买
var addToBuy=function(bridge){
	var shop_id=$(".shopInfo").attr("shop_id");
	var amount=$(".sale_price_num").html();
	var freight=$(".prod_freight").attr("freight");
	var goods_id=$(".js_chose").attr("goods_id");
	var spans=$(".js_chose span");
	
	var shopName=$(".shopInfo p span").html();
	var shopCover=$(".shopInfo img.shop_cover").attr("src");
	var goodsCover=$(".params_cover img").attr("src");
	var goodsName=$(".prod_tit h1").html();
	var buyNum=$(".txt_buyNum").val();
	var paramArr=[]
	var paramText=""
	for (var i = 0; i < spans.length; i++) {
		/*var paramMap={}
		var paramHtml=$(spans[i]).html();
		var paramType=$(spans[i]).attr("type");
		paramMap["name"]=paramType;
		paramMap["value"]=paramHtml;
		paramArr.push(paramMap);*/
		paramText+=$(spans[i]).html()+";"

	};
	paramText=paramText.substr(0,paramText.length-1);
	var buyParams={
		'action': '15',
		'nextStep':'15',
		'buy_shop': {
			'id': shop_id,
			'name': shopName,
			'cover': shopCover
		},
		'buy_goods':{
			'id':goods_id,
			'name' : goodsName,
			'cover' :goodsCover,
			'shop_price':amount,
			'freight': freight,
			'number':buyNum,
			'attrsText': paramText
		}
	}
	//登录
	/* {
	'action': '15',
	'nextStep':'15',
	"amount":amount,
	"shop_id":shop_id,
	"freight":freight,
	"goods_id":goods_id,
	"params":paramArr,
	"shopName":shopName,
	"shopCover":shopCover,
	"goodsCover":goodsCover,
	"goodsName":goodsName
	}*/
	setBridgeCallHandler(bridge,buyParams)
	//sAlert("立即购买")
}
//加入购物车
var addToCar=function(bridge){
	var url=host+"/cart";
	var jwt_token=commonCla.analyzParams("jwt_token");
	//var goods_id=commonCla.analyzParams("id");
	var goods_id=$(".js_chose").attr("goods_id");
	//内嵌页放入
	var params={
		"jwt_token":jwt_token,
		"goods_id":goods_id,
		"shop_id":$("#hide_info").attr("shop_id"),
		"number":$(".txt_buyNum").val()
	}
	commonCla.ajaxCommonFun(url,"post",function(ret){
		if(ret.code=="200"){
			sAlert_auto("加入成功",1000);
			setTimeout(function(){closeParams();},1200)
      if(bridge!=""&& bridge!=undefined){
        setBridgeCallHandler(bridge, {
  			'action': '19',
  			})
      }
      
		}else if(ret.code="401"){
       //sAlert(ret.error);
			//htmlAlert("","<a class='btn_relogin_underline' >您的登录信息失效，点击重新登录</a>")
			//sAlert_auto("加入失败，"+ret.error);
      reloginAlert(bridge,"重新登录","您的登录信息失效，请重新登录");
		}else{
			sAlert("加入失败，"+ret.error);
		}

	},params)
}

//获取详情数据
var getRecomment=function(){
	var url=host+"/goods/recommend"
	commonCla.ajaxCommonFun(url,"get",function(ret){
		var liHtml="";
    var source=$("#hide_info").attr("source");
    var htmlSrc="prodDetail";
    if(source!="detail"){
      htmlSrc="prodShare";
    }
		for (var i = 0; i < ret.data.length; i++) {
      var rebate=ret.data[i].rebate+"折";
      if(ret.data[i].rebate==0 || ret.data[i].rebate>=10){
        rebate=""
      }
			liHtml+='<li rid="'+ret.data[i].id+'"><a href="'+htmlSrc+'.html?id='+ret.data[i].id+'&jwt_token='+commonCla.analyzParams("jwt_token")+'">'+
						'<img src="'+ret.data[i].cover+'!330x420" class="rec_cover"/>'+
						
						'<p ><span class="rec_price">￥<span class="js_rec_price">'+ret.data[i].shop_price+'</span></span>'+
            '<span class="rebate">'+rebate+'</span></p>'+
            '<p class="rec_tit">'+ret.data[i].name+'</p>'+
        	'</li>'
			
		};
		$(".rec_list").html(liHtml)
	})
}
var getProdDetail=function(){
	var url=host+"/goods/"+prodId;
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			var data=ret.data;
			$("#hide_info").attr("shop_id",data.shop.id);
			$(".prod_tit h1").html(data.name);
			$(".js_sales_num").html(data.sales_num);
			$(".sale_price_num").html(data.shop_price);
			$(".real_price_num").html(data.market_price);
			//折扣
			var discount=""
			if(data.shop_price!=0 && data.market_price!=0){
				 discount=(data.shop_price/data.market_price*10).toFixed(2)+"折";
			}
			$(".prod_discount").html(data.rebate+"折");
			//运费
			if(data.shipping_fee==0){
				$(".prod_freight").html("免运费");
				$(".prod_freight").attr("freight",0);
			}else{
				$(".prod_freight").html("运费"+data.shipping_fee+"元");
				$(".prod_freight").attr("freight",data.shipping_fee);
			}
			//店铺
			$(".shopInfo").attr("shop_id",data.shop.id);
			$(".shopInfo p span").html(data.shop.name);
			$(".shopInfo .shop_cover").attr("src",data.shop.cover+"!250x250");

			//参数
			var attrs=data.attrs;
			var attrs_html="";var attrHtml=""
			for (var i = 0; i < attrs.length; i++) {
				var attr_con=""
				var attr_details=attrs[i].attr;
				for (var a = 0; a < attr_details.length; a++) {
           var clas="";
            /* if(a==0){
              clas="cur";
            }*/
					 attr_con+='<span class="'+clas+'" attr_id="'+attr_details[a].id+'" attr_pid="'+attr_details[a].attr_pid+'">'
								+attr_details[a].attr_value+'</span>'

					
				};
				attrs_html+='<h1 goods_pid="'+attrs[i].goods_pid+'">'+attrs[i].attr_name+'</h1>'+
				'<div class="param_lists">'+attr_con+'</div>'
				//选项添加容器
				$(".js_chose").append('<span type="'+attrs[i].attr_name+'" class="chose'+i+'"></span>')

			};
			$(".type_lists").html(attrs_html);

			//规格
			var param=data.param;
			var paramHtml=""
			for(var p in param){
				paramHtml+='<div class="info_con"><h1>'+p+'</h1><p>'+param[p]+'</p></div>'

			}
			//详情
			$(".tab_con").eq(0).html(data.content)
			$(".tab_con").eq(1).html(paramHtml);
			//售后
			$(".tab_con").eq(2).html(data.package_service)
			//封面
			$(".params_cover img").attr("src",data.cover+"!/fwfh/250x250")
			var covers=data.covers;
			var covers_html=""
			for (var i = 0; i < covers.length; i++) {
				covers_html+=' <div class="swiper-slide"><img src="'+covers[i]+'!750x0" width="100%"></div>'
				
			};
			$(".js-mainPic").html(covers_html);
			var mySwiper = new Swiper ('.swiper-container', {
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			   
			  }) 
			//is_on_sale 1上架  0 下架

			var is_on_sale=data.is_on_sale;
			if(is_on_sale==0){
				$(".btnList").html("");
        $(".btnList").after("<div class='dis_area'>已失效</div>")
				$(".btn_choose").hide();
        $(".buyerList").hide();
			}else{
        $(".btnList").show();
      }
			loadding("hide");
      //二次分享
      if($("#hide_info").attr("source")!="detail"){
       wx_share(data.name,"时尚星秀-全明星时尚平台，让你更时尚，让你更闪耀！",commonCla.shareUrlBase+"/starshow5.0/shop/prodShare.html?id="+commonCla.analyzParams("id"),data.cover);
      }
		}else if(ret.code=="404"){
			

			$(".loadding .spinner").find("img").attr("src","assets/images/icon-nodata.png");
			$(".loadding .spinner").find("img").css("width","100px")
			$(".loadding .spinner").find("img").css("height","100px")
      $(".loadding .spinner").append('<p class="mt10 col_grey" style="font-size:1.4rem">您查看的商品不见了~</p>')
		}else{

		}

	})
}
//改变购买按钮状态（加车，立即购买，弹框确定）
var changeBtns=function(is_able){
  //原来的class+disabled
  var disBtn=$('.params_cons .btn_sure').attr("class").split(" ")[1];//当前为不可用状态btn_sure_disabled  可用状态 btn_sure；
  if(is_able){
      if($(".btn_sure").hasClass("btn_sure_disabled")){
          var  oldClass=$(".btn_sure").attr("class").split(" ")[2];//js_xxxx_sure_disabled
					$('.params_cons .btn_sure').removeClass("btn_sure_disabled").removeClass(oldClass).addClass(oldClass.split("_disabled")[0]);
			}
      if($(".btnList li").eq(1).hasClass("js_addCar")){
         $(".btnList li").eq(1).addClass("js_toBuy").removeClass("js_addCar");
      }
      
  }else{
  //不可用
  if(!$(".btn_sure").hasClass("btn_sure_disabled")){
    $('.params_cons .btn_sure').addClass("btn_sure_disabled").addClass(disBtn+"_disabled").removeClass("js_addCar_sure").removeClass("js_toBuy_sure");
		$(".js_toBuy").addClass("js_addCar").removeClass("js_toBuy");
  }
    
  
  }
}
//点击属性获取自商品信息
var getChildGoods=function(attr_ids,pid){
	var url=host+"/goods";
	var params={
		"attr_ids":JSON.stringify(attr_ids),
		"goods_pid":pid
	}
	commonCla.ajaxCommonFun(url,"post",function(ret){
		if(ret.code=="200"){
			if(ret.data==null || ret.data.goods_number<=0){     
				changeBtns(false)
        
     		}else{
				changeBtns(true)
				$(".params_cover img").attr("src",ret.data.cover+"!/fwfh/250x250");
				$('.js_chose').attr("goods_id",ret.data.id);
				$(".js_chose").attr("sales_num",ret.data.goods_number);
				$(".sale_price_num").html(ret.data.shop_price);
        $(".prod_params .real_price_num").html(ret.data.market_price);
				if(ret.data.goods_number>=1){
					$(".txt_buyNum").val("1");
				}
			}
		}else{
			sAlert(ret.error);
			changeBtns(false)
			$('.js_chose').attr("goods_id","");
			$(".js_chose").attr("sales_num","");
		}
	},params)
}
var BOX_layout=function(box_overlay) //调整位置
		{
			document.getElementById(box_overlay).ondblclick = function() {
				tcc.BOX_remove(e);
			};
			var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
			var clientWidth;
			if (window.innerWidth) {
				clientWidth = window.innerWidth;
				// clientWidth = ((Sys.Browser.agent === Sys.Browser.Safari) ? window.innerWidth : Math.min(window.innerWidth, document.documentElement.clientWidth));
			} else {
				clientWidth = document.documentElement.clientWidth;
			}
			var clientHeight;
			if (window.innerHeight) {
				clientHeight = window.innerHeight;
				//clientHeight = ((Sys.Browser.agede3x3nt === Sys.Browser.Safari) ? window.innerHeight : Math.min(window.innerHeight, document.documentElement.clientHeight));
			} else {
				clientHeight = document.documentElement.clientHeight;
			}
			var bo = document.getElementById(box_overlay);
			bo.style.left = scrollLeft + 'px';
			bo.style.top = scrollTop*2 + 'px';
			bo.style.width = clientWidth + 'px';
			bo.style.height = clientHeight + 'px';
			bo.style.display = "";
}
//滚动固定背景
 var _isScroller=false;
 var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight
        if(top === 0) {
            el.scrollTop = 1
        } else if(currentScroll === totalScroll) {
            el.scrollTop = top - 1
        }
    })
    el.addEventListener('touchmove', function(evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if(el.offsetHeight < el.scrollHeight){
            evt._isScroller = true
            _isScroller=true;
        }
            
    })
}
var openParams=function(){
	flag=1;
	$("body").css("overflow","hidden");
	//$('html,body').addClass('ovfHiden');
	var h=$(window).height()+$(window).scrollTop();
	BOX_layout("bg_overflow")
	$(".bg_overflow").show();
	$(".prod_params").slideDown(200);
  //局部滚动
  overscroll(document.querySelector('.paramScroll'))
  $(".bg_overflow,.params_title,.btn_sure").on('touchmove', function(evt) {        
          evt.preventDefault()         
  })
  document.body.addEventListener('touchmove', function(evt) {
      if(!_isScroller) {
          evt.preventDefault()
      }
  })
}
var closeParams=function(){
  _isScroller=true;
	flag=0;
  if($('.params_cons .btn_sure').hasClass("js_toBuy_sure")){
				$('.params_cons .btn_sure').removeClass("js_toBuy_sure").addClass('js_addCar_sure')
	}
	$("body").css("overflow","auto");
	//$('html,body').removeClass('ovfHiden');
	$(".prod_params").slideUp(200);
	setTimeout(function(){
		$(".bg_overflow").hide();
	},200)
}
var isNum=function(val){
	var reg =/^\d*$/;		
	if(!reg.test(val)){
		return false;
	}
	return true;
}
//事件操作operation
var product={
	 initMainPic:function(){
		      
	},
	"sTop":0,
	headerScroll:function(h){
		var contentH=$(".js_main_pic").height();
		//console.log(h+"/"+contentH/2)
		if(h>0 && h<=contentH/2){
			var topH=contentH-h;
			$(".js_main_pic").addClass("prod_main_pic_abs");
			$(".js_detail").css("margin-top",topH+"px");

		}else if(h<=10){
			$(".js_detail").css("margin-top",0);
			//h==0
			$(".js_main_pic").removeClass("prod_main_pic_abs");
			//$(".js_detail").removeClass("prod_detail_abs");
			
		}
		//标题处理
		var titPos= $(".prod_info").offset().top; 
		console.log(h+"/"+titPos);
		
		if(h>=titPos){
			if(!$(".prod_info").hasClass("prod_info_fixed") && h==titPos){
				product.sTop=h
				//console.log(product.sTop+"0000000000000000")
			}else if($(".prod_info").hasClass("prod_info_fixed") && product.sTop==0){
				product.sTop=h
			}
			$(".prod_info").addClass("prod_info_fixed");
			$(".prod_desc").css("margin-top","80px")
			//console.log(product.sTop+"1111111111111111111111111")
			if(h<product.sTop){
				$(".prod_info").removeClass("prod_info_fixed");
				$(".prod_desc").css("margin-top",0)
			}
		}

	},
	initProduct:function(){
		getProdDetail();
		getRecomment();
		product.initMainPic();
		/*$(window).scroll(function(){
			var h=$(this).scrollTop()
			product.headerScroll(h)
		})*/
    var touch=function(){
      var h=$(this).scrollTop()
			product.headerScroll(h)
    }
    /*document.addEventListener('touchmove',touch, false); 
    document.addEventListener('touchend',touch, false); */

    window.ontouchmove = function(e){touch()}
　　window.onscroll = function (e) {touch()}
		//
		$(".txt_buyNum").blur(function(){
			var goodsNum=$(".js_chose").attr("sales_num");
			var num=Number($(this).val())
			if(!isNum($(this).val())){
				sAlert("请输入数字");
			}else if(goodsNum!=undefined && num+1>goodsNum){
				sAlert("库存不足");
				$(".txt_buyNum").val(goodsNum);

			}else if($(this).val()<=0 ||$(this).val()=="" ){
				$(this).val("1")
			}
		})

		//加减价格
		$(".buy_buttons span").click(function(){
			var inx=$(this).index();
			var num=Number($(".txt_buyNum").val());
			if(inx==0){
				if(num>1){
					$(".txt_buyNum").val(num-1)
				}
			}else{
				var goodsNum=$(".js_chose").attr("sales_num");
				if(num+1>goodsNum){
					sAlert("库存不足")

				}else{
					$(".txt_buyNum").val(num+1)
				}
				

			}
		})
		//tabs
		$(".js_prod_tabs .tab_title").click(function(){
			if($(this).parent().find(".tab_con").css("display")=="none"){
				$(this).parent().find(".tab_con").slideDown("1000");
				$(this).parent().find(".icon_arraw").attr("src","assets/images/icon-arraw-top.png");
			}else{
				$(this).parent().find(".tab_con").slideUp("1000");
				$(this).parent().find(".icon_arraw").attr("src","assets/images/icon-arraw-bot.png");
			}
			

		})
		//选项选择
		$(".type_lists").on("click","span",function(){
			$(this).parent().find("span").removeClass("cur");
			$(this).addClass("cur");
			var attr_value=$(this).html();
			var attr_pid=$(this).attr("attr_pid");
			var attr_id=$(this).attr("attr_id")
			var inx=$(this).parent().index(".param_lists");
			/*if(inx>=1){
				attr_value="&nbsp;&nbsp;"+attr_value

			}*/
			$(".chose"+inx).html(attr_value);
			$(".chose"+inx).attr("attrId",attr_id);
			//
			$(".btn_choose span").html("已选："+$(".js_chose").text())
			var pid=commonCla.analyzParams("id");
			var attrIds=[];
			var attrs=$(".js_chose span");
			if(checkChose()){
				for (var i = 0; i < attrs.length; i++) {
					attrIds.push($(attrs[i]).attr("attrId"));
				};
				console.log(attrIds)
				getChildGoods(attrIds,pid);
			}
      $(".js_chose_noParam").hide();

		})
		//放入购物车
		$(".btnList").on("click",".js_addCar",function(){
			if($('.params_cons .btn_sure').hasClass("js_toBuy_sure")){
				$('.params_cons .btn_sure').removeClass("js_toBuy_sure").addClass('js_addCar_sure')
			}
			openParams();
		})
		//打开选项卡
		$(".btn_choose").click(function(){
			openParams();
		})
		$(".bg_overflow").click(function(){
			closeParams();
		})
     getRecord();
		//lunbo
		 $t=setInterval('AutoScroll(".buyerList","30")',3000)//轮换间隔，单位毫秒，下同 
		
	}
}
var getRecord=function(){
	var url=host+"/goods/record";
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.code=="200"){
			var liHtml="";
			for (var i = 0; i < ret.data.length; i++) {
				liHtml+='<li>'+
						'<img src="'+ret.data[i].head_pic+'" /><span>'+ret.data[i].name+'提交了订单</span>'+
						'</li>'
				
			};
			$(".buyerList ul").html(liHtml)
		}
	})
}
//autoscroll
function AutoScroll(obj,topH){
 if($(obj).find("ul:first li").length<2){
  window.clearInterval($t); //清楚定时器
  return;
  }
 $(obj).find("ul:first").animate({ 
    marginTop:"-"+topH+"px"//和上面的height一致 
     },300,"swing",function(){ 
    $(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
     }); 
 }
//缓冲
var loadding=function(showType){
	if(showType=="show"){
		$(".loadding").show();
		$(".js_detail").hide();
		$(".js_main_pic").hide();
    $(".img-default").hide();
    $(".buyerList").hide();
	}else{
		$(".loadding").hide();
    $(".img-default").show();
		$(".js_detail").show();
		$(".js_main_pic").show();
    $(".buyerList").show();
	}
	
}


$(function(){
	var source=$("#hide_info").attr("source");
	product.initProduct();
	if(source!="detail"){
		shareFun();
	}

	//临时
	//clientFun();
	
})