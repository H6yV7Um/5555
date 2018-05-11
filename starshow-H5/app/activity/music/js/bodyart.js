// JavaScript Document
var analyzUrl = function() {
    var paramsList = {}
    var url = window.location.search.split("?")[1];
    var params = url.split("&");
    for (var i = 0; i < params.length; i++) {
        var keyName = params[i].split("=")[0];
        var value = params[i].split("=")[1];
        paramsList[keyName] = value;



    }
    return paramsList;

}
var uid = analyzUrl()["uid"];
var order_id = analyzUrl()["order_id"];
window.onload = function() {

    var t_urlpath = "http://api.xingxiu.tv/";
    var o_urlpath = "http://api.xingxiu.tv/";
    var orderDetail_url = t_urlpath + "index.php?app=mobile&mod=Activity&act=music_order_detail&uid=" + uid + "&order_id=" + order_id + "&returntype=jsonp&callback=?";
    console.log(order_id + '====+' + uid);
    var bUrl = t_urlpath + 'index.php?app=mobile&mod=Activity&act=music_order&uid=' + uid + '&order_id=' + order_id + '&t=' + Math.random() * 1000 + '&returntype=jsonp&callback=?';
    getConfirmInfo(bUrl);
    getBuyDetail(bUrl);

    // $(".banner a").attr("href", "myOrder.html?uid=" + uid);

}
var myUrl = "http://api.xingxiu.tv/index.php?app=mobile&mod=Activity&act=music_my_order&uid=" + uid + "&returntype=jsonp&callback=?";

$(".banner a").click(function() {
    getOrderDetail(myUrl);
})

function getOrderDetail(a) {
    $.getJSON(a,
        function(a) {
            if ("succ" == a.result) {
                if (a.info.code == "201") {
                    window.location.href = ("myOrder.html?uid=" + uid + "&order_id=" + a.info.order_id);
                } else {
                    window.location.href = ("buyDetail.html?uid=" + uid + "&order_id=" + a.info.order_id);
                }

            } else {
                BOX_show("messdiv");
            }


        })


}


function getBuyDetail(a) {
    $.getJSON(a,
        function(a) {
            if ("succ" == a.result) {
                var b = "<dl><dt> 联系人：</dt><dd>" + a.info.name + "</dd></dl> <dl><dt> 联系电话：</dt><dd>" + a.info.telephone + "</dd></dl>"

                $(".userInfo").prepend(b)


            }


        })


}

function formatSeconds(a) {
    var b = parseInt(a),
        c = 0,
        d = 0;
    if (b > 60 && (c = parseInt(b / 60), b = parseInt(b % 60), c > 60 && (d = parseInt(c / 60), c = parseInt(c % 60))), 10 > b) var e = "0" + parseInt(b);
    else var e = "" + parseInt(b);
    return c > 0 && (e = "" + parseInt(c) + ":" + e),
        d > 0 && (e = "" + parseInt(d) + "小时" + e),
        e


}

function getConfirmInfo(a) {
    $.getJSON(a,
        function(a) {
            function b() {
                0 == d ? d = c : ($(".st_orderC_where p span").text(formatSeconds(d)), d--, setTimeout(function() {
                        b()


                    },
                    1e3))


            }
            if ("succ" == a.result) {
                var c = a.info.create_at,
                    d = c;
                b();
                var e = "";
                //if (a.info.date.length > 0) {
                //				  for (var f = 0; f < a.info.create_at.length; f++) e += "<p>" + a.info.date[f] + "</p>";
                //				  $(".time_list").append(e)
                //			  }


            }


        })


}
var t_urlpath = "http://api.xingxiu.tv/",
    o_urlpath = "http://api.xingxiu.tv/",
    vcss = "201603171037",
    vjs = "201603171037",
    sum = "",
    st_sum_one = "",
    tageskarte = 80,
    passTickets = 120;
/*$(".st_buyD_con_time li").on("click", 
function(a) {
    var b = $(".Tageskarte").hasClass("active");
    b && $(this).addClass("active").siblings().removeClass("active")


}),
$(".Tageskarte").on("click", 
function() {
    var a = parseInt($(".buySum").text());
    $(this).addClass("active").siblings().removeClass("active"),
    $(".st_buyD_con_time li :gt(0)").removeClass("active");
    var b = a * tageskarte;
    $(".st_sum_one").text(b)


}),
$(".passTickets").on("click", 
function() {
    var a = parseInt($(".buySum").text());
    $(this).addClass("active"),
    $(this).siblings().removeClass("active"),
    $(".st_buyD_con_time li").addClass("active");
    var b = a * passTickets;
    $(".st_sum_one").text(b)


}),
$(".plus").on("click", 
function() {
    if (parseInt($(".buySum").text()) < 5) {
        var a = parseInt($(".buySum").text()) + 1;
        $(".buySum").text(a);
        var b = $(".Tageskarte").hasClass("active");
        if (b) var c = a * tageskarte;
        else var c = a * passTickets;
        $(".st_sum_one").text(c)


    } else $(".buySum").text(5),
    alert("单个订单最多购买5张")


}),
$(".minus").on("tap", 
function() {
    if (parseInt($(".buySum").text()) > 1) {
        var a = parseInt($(".buySum").text()) - 1;
        $(".buySum").text(a);
        var b = $(".Tageskarte").hasClass("active");
        if (b) var c = a * tageskarte;
        else var c = a * passTickets;
        $(".st_sum_one").text(c)


    } else $(".buySum").text(1)


}),*/
//支付
$(".st_orderC_pay li").on("tap",function() {
            $(this).addClass("active").siblings().removeClass("active")

})
    /*$(".st_sum a").on("tap", 
    function() {

        var a = $(".st_buyD_con_piao .active").attr("typeId"),
        b = $(".st_buyD_con_time .active").attr("date"),
        c = parseInt($(".st_buyD_con_sum .buySum").text()),
        d = location.search.slice(location.search.indexOf("&uid") + 5).split("&")[0],
        e = t_urlpath + "index.php?app=mobile&mod=Activity&act=tattoo_post&uid=" + d + "&type=" + a + "&date=" + b + "&num=" + c + "t=" + 1e3 * Math.random() + "&returntype=jsonp&callback=?";
        $.getJSON(e, 
        function(a) {
            if ("succ" == a.result) {
                console.log(a);
                var b = a.info;
                console.log(d),
                location.href = "orderConfirm.html?order_id=" + b + "&uid=" + d + "&time=" + 1e3 * Math.random()


            } else "fail" == a.result && alert(a.msg)


        })


    }),*/
    /*$(".banner a").on("tap", function() {
    	window.location.href = "?action=myOrder"
    })*/
$(".join a").on("tap",
        function() {
	alert('您好网上售票已停止，请到现场购票。');
            //window.location.href = "?action=joinImmediately"


})
$(".st_orderC_gopay .gopay").on("tap",
function() {
    var a = location.search.replace(/\?order_id=(\d+).*/, "$1"),
        b = $(".st_orderC_pay .active").attr("type");
    window.location.href = "?action=pay&type=" + b + "&orderId=" + order_id;


})
    //$(".st_orderC_gopay .gocancel").on("click",
        //function() {
            //var a = location.search.replace(/\?order_id=(\d+).*/, "$1"),
            //b = location.search.slice(location.search.indexOf("&uid") + 5).split("&")[0];
           // console.log(order_id + uid);
           // var c = t_urlpath + "index.php?app=mobile&mod=Activity&act=tattoo_order_delete&order_id=" + order_id + "&uid=" + uid + "&t=" + 1e3 * Math.random() + "&returntype=jsonp&callback=?";
            //$.getJSON(c,
                //function(a) {
                    //console.log(a),
                      //  "succ" == a.result ? window.location.href = "index.html" : "fail" == a.result && alert(a.msg)


               // })


        //});


function getCancelOrder(a) {
    $.getJSON(a, function(a) {
        if ("succ" == a.result) {
            window.location.href = ("myOrder.html?uid=" + uid + "&order_id=" + order_id);
        } else {
            //alert(a.msg)
             BOX_show("messdiv");
             $(".messdivCons").html(a.msg)
        }
    })
}
$(".cancelOrder").click(function() {
    var coUrl = "http://api.xingxiu.tv/index.php?app=mobile&mod=Activity&act=music_order_delete&uid=" + uid + "&order_id=" + order_id + "&returntype=jsonp&callback=?";
    getCancelOrder(coUrl);
});
$(".js-close").click(function(){
    /*$("#messdiv").hide();
    $("#name").hide();
    $("#telephone").hide();
    $("#BOX_overlay").hide();   */
  BOX_remove("messdiv");
  BOX_remove("name");
  BOX_remove("telephone");
})