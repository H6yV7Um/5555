var host=commonCla.hostBase+"/v15";
var id = commonCla.analyzParams("id"); 
var jwt_token = commonCla.analyzParams("jwt_token");
var loadMore = true;
//缓冲
var loadding=function(showType){
	if(showType=="show"){
		$(".loadding").show();
		$(".shop-page").hide();
	}else{
		$(".loadding").hide();
		$(".shop-page").show();
	}
	
}
var getShopData = function () {
    // var pageNum = Math.ceil($(".product-list li").length / 10);
    var pageNum = $(".product-list li").length;

    var params = {
        "current_count": pageNum,
        "count": "10"
    }
    if (jwt_token != "" && jwt_token != undefined) {
        params.jwt_token = jwt_token
    }
    var url = host + "/shop/" + id + "/goods";

    commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
        if (ret.code == "200") {
        loadding("hide")
            initShopList(ret)
        }
    }, params)
}

var initShopList = function (ret) {
    var shopData = ret.data.shop,
        data = ret.data.page_data,
        total = ret.total;

    $(".shop-pic img").attr("src", shopData.cover+"!250x250");
    $(".header-con-row .shop-name").html(shopData.name);
    $(".header-con-clm .shop-name").html(shopData.name);
    $("title").html(shopData.name);

    var listHtml = "";

    for (var i in data) {
        var imgUrl = data[i].cover + "!330x420";
        var rebate = data[i].rebate + "折";
        if (data[i].rebate == 0 || data[i].rebate >= 10) {
            rebate = ""
        }
        listHtml += '<li class="product-item" pid="'+data[i].id+'">'+
                        
                            '<div class="img-wrap">'+
                                '<img src="'+imgUrl+'" alt="">'+
                            '</div>'+
                            '<div class="item-info">'+
                                '<div class="item-price">&yen;'+
                                '<span>'+data[i].shop_price+'</span>'+
                                '<span class="discount">' + rebate + '</span>' +
                                '</div>'+
                                '<div class="item-name two-line">'+data[i].name+'</div>'+
                           ' </div>'+
                       
                    '</li>'
    }
    $(".product-list").append(listHtml)

    if (total == $(".product-list li").length) {
        loadMore = false;
        $(".no-data").show()
    } else {
        loadMore = true;
    }
}
var clientFun=function(bridge){
  $(".product-list").on("click","li",function(e){
   var inx=$(this).attr("pid");
    e.preventDefault()
	      setBridgeCallHandler(bridge, {
          'action':'20',
	        'id': inx,
	        'buy_type':'1'
	      })
    })
}
$(function () {
    getShopData();
    $(window).scroll(function () {
        // 加载更多
        if (loadMore) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                loadMore = false;
                getShopData();
            }
        }
        // 改变头部样式
        var sTop = $(window).scrollTop();
        var height = 140 - sTop;
        $(".shop-header").height(height)

        if ($(".shop-header").height() <= 45) {
            $(".shop-header").height(45)

            $(".header-con-row").css({
                "opacity": "1"
            })
            $(".header-con-clm").css({
                "opacity": "0"
            })
        }
        $(".header-con-row").css({
            "opacity": (sTop) / 100
        })
        $(".header-con-clm").css({
            "opacity": 1 - (sTop) / 50
        })

    })
    function titleChange(e) {
        // e.preventDefault()
        var sTop = document.scrollingElement.scrollTop,
            height = 140 - sTop;

        $(".shop-header").height(height)

        if ($(".shop-header").height() <= 44) {
            $(".shop-header").height(44)

            $(".header-con-row").css({
                "opacity": "1"
            })
            $(".header-con-clm").css({
                "opacity": "0"
            })
        }
        $(".header-con-row").css({
            "opacity": (sTop) / 100
        })
        $(".header-con-clm").css({
            "opacity": 1 - (sTop) / 50
        })

    }
    // document.addEventListener('touchstart', function (event) {
    //     renderTouches(event.touches); 
    // })
    // var touches = []
    // document.addEventListener('touchstart', function (event) {
    //     touches = event.touches;
    // }, false);
    // timer = setInterval(function () {
    //     renderTouches(touches);
    // }, 15);
    // document.addEventListener('scroll', titleChange, false)
    
})