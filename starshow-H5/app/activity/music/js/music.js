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

$(function() {
    var sureOrderUrl = "http://api.xingxiu.tv/index.php?app=mobile&mod=Activity&act=music_my_order&uid=" + uid + "&returntype=jsonp&callback=?";
    getSureOrder(sureOrderUrl);
    //提交订单
    $(".btn").click(function() {
        var name = $(".name").val();
        var telephone = $(".telephone").val();
        var url = "http://api.xingxiu.tv/index.php?app=mobile&mod=Activity&act=music_post&returntype=jsonp&callback=?"
        if (name == '') {
            BOX_show("name");
            return;
        }
        if (telephone == '') {
            BOX_show("telephone");
            return;
        }
        var params = {
            "uid": uid,
            "name": name,
            "telephone": telephone
        }
        ajaxCommonFun(url, 'get',
            function(data) {
                if (data.result != "succ") {
                    window.location.href = ("buyDetail.html?uid=" + uid + "&order_id=" + data.info);
                    //if (data.info.code == 201) {
                    //                    alert('一个用户只能购买一张哟~');
                    //
                    //                } else {
                    //                    $(".gopayBtn").click(function() {
                    //                        window.location.href = ("buyDetail.html?uid=" + uid + "&order_id=" + data.info.order_id);
                    //
                    //                    })
                    //                   
                    //
                    //                }

                }else if(data.result == "fail"){
                	alert(data.msg);
                } else {
                	alert(data.msg);
                    //window.location.href = ("buyDetail.html?uid=" + uid + "&order_id=" + data.info);

                }

            },
            params)

    })
    var ajaxCommonFun = function(url, type, callbackFun, params) {
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            async: false,
            cache: false,
            data: params,
            success: function(data) {
                //回调函数
                if (callbackFun) {
                    callbackFun(data);

                }

            },
            error: function() {
                alert("error");

            }

        })

    }

    function getCancelOrder(a) {
        $.getJSON(a,
            function(a) {
                if ("succ" == a.result) {
                    window.location.href = ("myOrder.html?uid=" + uid + "&order_id=" + a.info.order_id);

                } else {
                    alert(a.msg)

                }

            })

    }

    function getSureOrder(a) {
        $.getJSON(a,
            function(a) {
                if ("succ" == a.result) {
                    if (a.info.code == "201") {
                        $(".paid").show();
                        $(".sureOrder").hide();
                        $(".btn").hide();

                    } else {
                        BOX_show("messdiv");
                        $(".gopayBtn").click(function() {
                            window.location.href = ("buyDetail.html?uid=" + uid + "&order_id=" + a.info.order_id);

                        })

                    }

                } else {
                    $(".btn").show();

                }

            })

    }
    $(".js-close").click(function(){
      BOX_remove("messdiv");
      BOX_remove("name");
      BOX_remove("telephone");
    })

})