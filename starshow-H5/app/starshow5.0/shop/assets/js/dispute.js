var host=commonCla.hostBase+"/v15";
var id = commonCla.analyzParams("id");
var jwt_token = commonCla.analyzParams("jwt_token");
var prodArr = [];
totalAmount = 0;
total_amount_freight = 0;
var selectService = function() {
    $('.service').on("click", "li", function () {
        var index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
    })
    // numModule()
}
/* 加减器 */
var numModule = function () {
    $(".edit-page").on('click', '.num-module .add', function () {
        var add = $(this);
        var num = $(this).siblings(".num");
        var minus = $(this).siblings(".minus");
        var max = $(this).parent().attr("max")
        //数量增加操作   
        $('.product-list li input:checkbox').attr("prodNum", num.val())
        num.val(Math.abs(parseInt(num.val())) + 1);
        if (parseInt(num.val()) != 1) {
            minus.attr('disabled', false);
            minus.removeClass('disabled')
        };
        if (parseInt(num.val()) >= max) {
            add.attr('disabled', true);
            add.addClass('disabled')
        };
    })
    $(".edit-page").on('click', '.num-module .minus', function () {
        var minus = $(this);
        var num = $(this).siblings(".num");
        var add = $(this).siblings(".add");
        var max = $(this).parent().attr("max")
        //数量减少操作   
        num.val(Math.abs(parseInt(num.val())) - 1);
        $('.product-list li input:checkbox').attr("prodNum", num.val())
        if (parseInt(num.val()) == 1) {
            minus.attr('disabled', true);
            minus.addClass('disabled')
        };
        if (parseInt(num.val()) <= max) {
            add.attr('disabled', false);
            add.removeClass('disabled')
        };

    })
}
//点击加号添加商品个数 

$(".add").off("click").on("click", function () {
    Geshu = parseInt($(this).parent().find("span:nth-of-type(2)").text())
    Geshu++
    $(this).parent().find("span:nth-of-type(2)").text(Geshu)
    countTotalPrice();
    totalGeshu();
})

//动态生成的元素点击减号减少商品个数 
$(".minus").off("click").on("click", function () {
    Geshu = parseInt($(this).parent().find("span:nth-of-type(2)").text());
    if (Geshu > 1) {
        Geshu--;
        $(this).parent().find("span:nth-of-type(2)").text(Geshu)
    } else {
        Geshu == 1;
    }
    countTotalPrice();
    totalGeshu();
}) 

// 客户端交互
var clientFun = function (bridge) {
    // 页面加载完成返回刷新
    $(function () {
        setBridgeCallHandler(bridge, {
            'action': '19',
        })
    })
    $(".upload-btn").on("click", function (e) {
        e.preventDefault()
        var lastPic = 5-($(".upload-area").children().length-1)
        setBridgeCallHandler(bridge, {
            'action': '17',
            'nextStep': '17',
            'lastPic': lastPic
        })
    })
    $(".upload-btn").on("click", function (e) {
        if (jwt_token == "" || jwt_token == undefined) {
            e.preventDefault()
            setBridgeCallHandler(bridge, {
                'action': '1',
                'nextStep': '1',
            })
        }
    }) 
    //过期重新登录
    $(".dialog_tip").on("click", ".btn_relogin", function (e) {
        e.preventDefault()
        setBridgeCallHandler(bridge, {
            'action': '10',
            'nextStep': '10'
        })
    })

}
//下一步操作
var nextStepFun = function (data, bridge) {
    if (data.nextStep == '1') { //登录
        if (jwt_token == "" || jwt_token != data.jwt_token) {
            login_token = data.jwt_token;
            window.location.href = "dispute.html?id="+id+"&jwt_token=" + data.jwt_token;
        }
    } else if (data.nextStep == '8') {
        shareActivity();
    } else if (data.nextStep == '10') { //过期登录
        login_token = data.jwt_token;
        //window.location.href = "index.html?jwt_token=" + data.jwt_token;
    } else if (data.nextStep == '17') { //上传图片
        pic = data.servicePic;
        handleVoucherPic(pic)
        // alert(pic)
        //window.location.href = "index.html?jwt_token=" + data.jwt_token;
    }
}

// handleVoucherPic(pic)
// 上传凭证
function handleVoucherPic(pic) {
    var voucherPics = "";
    for(var i = 0; i<pic.length; i++) {
        voucherPics += '<div class="upload-item">'+
                        '<img src="' + pic[i]+'" alt="">'+
                            '<span class="delete"></span>'+
                        '</div>';
    }
    $(".dispute-proof .upload-area .upload-btn").before(voucherPics)
    if ($(".dispute-proof .upload-area").children(".upload-item").length >= 5) {
        $(".upload-btn").hide()
    } else {
        $(".upload-btn").show()
    }
    $(".dispute-proof").on("click", ".delete", function () {
        $(this).parent().remove()
        if ($(".dispute-proof .upload-area").children(".upload-item").length >= 5) {
            $(".upload-btn").hide()
        } else {
            $(".upload-btn").show()
        }
    })
    $(".dispute-proof").on("click", ".upload-item img ", function () {
        $(".bigImg").fadeIn()
        $(".bigImg img").attr("src", $(this).attr("src"))
    })
    $(".img-wrap").on("click", function () {
        $(".bigImg").fadeOut()
    })
}
/* 遮罩层 */
var reasonSelect = function () {

    var handler = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    var OpenMask = function (){
        document.addEventListener('touchmove', handler, false);
        document.addEventListener('wheel', handler, false);
    };

    var CloseMask = function () {
        document.removeEventListener('touchmove', handler, false);
        document.removeEventListener('wheel', handler, false);
    };
    $(".dispute-reason").click(function () {
        $("body").css("overflow", "hidden");

        $(".mask").css({ "height": $(document).height()}).show()
        $(".reason-select").slideDown();
        // OpenMask()

    })
    $(".mask, .close").click(function () {
        $("body").css("overflow", "auto");
        $(".reason-select").slideUp();
        setTimeout(function () {
            $(".mask").hide();
        }, 200)
        // CloseMask()
    })

    $(".select-area").on("click", "li", function () {
        var selectHtml = $(this).html()
        $(this).addClass("select").siblings().removeClass("select");
    })
    $(".determine").on("click", function() {
        var selectHtml = $(".select-area").find(".select").html()
        var num = $(".select-area").find(".select").attr("data-num")
        $(".dispute-reason h2").html(selectHtml)
        $(".dispute-reason h2").attr("num", num)
        var money = parseFloat($(".dispute-money b").html());
        if (num == "1") {
            $(".dispute-money b").html(totalAmount)
        } else {
            $(".dispute-money b").html(total_amount_freight)
        }
        $("body").css("overflow", "auto");
        $(".reason-select").slideUp();
        setTimeout(function () {
            $(".mask").hide();
        }, 200)
    })
}
var linkAttrs = function (attrlist) {
    var str_attr = ""
    for (var b = 0; b < attrlist.length; b++) {
        //str_attr += attrlist[b].attr.attr_value + "、";
        str_attr += attrlist[b] + "、";
    };
    return str_attr.substr(0, str_attr.length - 1)
}

// 添加和编辑
var handleEditPage = {
    getGoodsList : function () {
        var url = host + "/order/" + id;
        var params = {
            "jwt_token": jwt_token
        }
        commonCla.ajaxCommonFun(url, "get", function (ret, textStatus, request) {
            if (ret.code == "200") {
                // 如果订单状态为2待发货的时候，申请售后不进入批量选择页
                if (parseInt(ret.data.order_status) == 2) {
                    handleEditPage.initDispute(ret)
                    $(".loadding").hide()
                    $(".dispute-page").show()
                } else {
                    handleEditPage.initGoodsList(ret)
                    $(".loadding").hide()
                    $(".edit-page").show()
                }
            } else if (ret.code == "401") {
                htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
            } else {
                sAlert_auto("服务器出小差啦~", 2000)
            }
        }, params)
    },
    // 初始化编辑列表
    initGoodsList : function (ret) {
        var goodList = ret.data.orders;
        freight = parseFloat(ret.data.freight);
        var listHtml = ""
        for (var i in goodList) {
            if (parseInt(goodList[i].number) <= 1) {
                var numModuleHtml = '<div class="num-module" max="' + parseInt(goodList[i].number) + '">' +
                                        '<input type="button" class="minus disabled" disabled="disabled" value="-"/>' +
                                        '<input type="number" class="num" readonly="readonly" value="' + parseInt(goodList[i].number) + '" />' +
                                        '<input type="button" class="add disabled" disabled="disabled" value="+"/>' +
                                    '</div>'
            } else {
                var numModuleHtml = '<div class="num-module" max="' + parseInt(goodList[i].number) + '">' +
                                        '<input type="button" class="minus" value="-"/>' +
                                        '<input type="number" class="num" readonly="readonly" value="' + parseInt(goodList[i].number) + '" />' +
                                        '<input type="button" class="add disabled" disabled="disabled" value="+"/>' +
                                    '</div>'
            }
            listHtml += '<li class="product flex-row">'+
                            '<input id="checked" type="checkbox" name="checked" value='+ i +'>'+
                            '<div class="product-img">'+
                                '<img src="' + goodList[i].goods_cover+'!250x250" alt="">'+
                            '</div>'+
                            '<div class="product-info flex-column">'+
                                '<div class="product-name one-line">' + goodList[i].goods_name+'</div>'+
                                '<div class="product-size two-line">'+
                                    '<span>选择</span>：'+
                                '<span>' + linkAttrs(goodList[i].attrs)+'</span>'+
                                '</div>'+
                                '<div class="product-price">'+
                                    '<span class="price">&yen;'+
                                '<b>' + goodList[i].transaction_price+'</b>'+
                                    '</span>'+
                                '</div>'+
                                '</div>' + 
                                numModuleHtml +
                        '</li>';
            
        }

        $(".product-list").html(listHtml)
        handleEditPage.selectProd(ret)
    },
    // 选择退货商品
    selectProd: function (ret) {
        var prodList = $('.product-list li input:checkbox')
        // 将选中商品的序列存入序列数组中
        prodList.change(function () {
            if ($(this).is(':checked')) {
                if (prodArr.indexOf($(this).val())) {
                    prodArr.push($(this).val())
                }
            } else {
                prodArr.splice(prodArr.indexOf($(this).val()), 1)
            }
            prodArr = prodArr.sort()
        });
        $(".edit-page .determine").on("click", function() {
            var len = $(".product-list input:checkbox:checked").length; 
            if( len < 1 ) {
                sAlert_auto("请至少选择一件商品", 1500)
            } else {
                $(".edit-page").hide()
                $(".dispute-page").show()
                // 将每件商品的退货数量存入数组中
                var numObj = $(".edit-page .num")
                var numArr = [];
                numObj.each(function (k, v) {
                    if ($(this).parent().siblings("#checked").is(':checked')) {
                        numArr.push($(this).val())
                    } else {
                        numArr.push(0)
                    }
                })
                handleEditPage.initDispute(ret, prodArr, numArr)

            }
            $(window).scrollTop(0);
        })
    },
    // 初始化申请商品列表
    initDispute: function (ret, prodArr, numArr) {
        var orders = ret.data.orders;
        var status = parseInt(ret.data.order_status)
        var prodListHtml = "";
        var total_amount = 0;
        var prodData = [];
        if(status !==2 ) {
            for (var i in orders) {
                for (var j = 0; j < prodArr.length; j++) {
                    if (i == prodArr[j]) {
                        prodListHtml +='<div class="single flex-row">'+
                                            '<div class="product-img">'+
                                                '<img src="' + orders[i].goods_cover+'!250x250" alt="">'+
                                            '</div>'+
                                            '<div class="product-info flex-column">'+
                                                '<div class="product-name one-line">' + orders[i].goods_name+'</div>'+
                                                '<div class="product-size"><span>选择</span>：<span>' + linkAttrs(orders[i].attrs)+'</span></div>'+
                                                '<div class="product-price">'+
                                                    '<span class="price">&yen;<b>' + orders[i].transaction_price+'</b></span>'+
                                                    '<span class="amount">X<b>' + numArr[i] +'</b></span>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="more-info">'+
                                                '<div class="goods-price">&yen;' + orders[i].transaction_price+'</div>'+
                                            '</div>'+
                                        '</div>';
                        // 总价
                        total_amount += parseFloat(orders[i].transaction_price * numArr[i])
                        // 退回商品信息
                        prodData.push(orders[i])
                        
                    }
                }
            }
            if (prodArr.length > 1) {
                $(".dispute-page .product").addClass("more")
            } else {
                $(".dispute-page .product").removeClass("more")
            }
            $(".dispute-page .scroll").html(prodListHtml)
            // 无运费总价
            totalAmount = parseFloat(total_amount.toFixed(2))
            // 有运费总价
            total_amount_freight = (parseFloat(total_amount.toFixed(2)) + parseFloat(ret.data.freight)).toFixed(2)
            if ($(".dispute-reason h2").attr("num") == "1" || $(".dispute-reason h2").attr("num") == "0") {
                $(".dispute-money b").html(totalAmount)
            } else {
                $(".dispute-money b").html(total_amount_freight)
            }
        } else {
            for(i in orders) {
                prodListHtml += '<div class="single flex-row">' +
                    '<div class="product-img">' +
                    '<img src="' + orders[i].goods_cover + '!250x250" alt="">' +
                    '</div>' +
                    '<div class="product-info flex-column">' +
                    '<div class="product-name one-line">' + orders[i].goods_name + '</div>' +
                    '<div class="product-size"><span>选择</span>：<span>' + linkAttrs(orders[i].attrs) + '</span></div>' +
                    '<div class="product-price">' +
                    '<span class="price">&yen;<b>' + orders[i].transaction_price + '</b></span>' +
                    '<span class="amount">X<b>' + orders[i].number + '</b></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="more-info">' +
                    '<div class="goods-price">&yen;' + orders[i].transaction_price + '</div>' +
                    '</div>' +
                    '</div>';
                prodData.push(orders[i])
            }
            if (orders.length > 1) {
                $(".dispute-page .product").addClass("more")
            } else {
                $(".dispute-page .product").removeClass("more")
            }
            $(".dispute-page .scroll").html(prodListHtml)
            // 如果订单状态为2待发货，售后总价为实付款
            $(".dispute-money b").html(ret.data.actual_payment)
            // 隐藏编辑按钮和退货退款按钮
            $(".retreatAll").hide()
            $(".add-or-edit").hide()
            // 退款原因改为9，取消点击事件
            $(".dispute-reason h2").html("9、未发货申请退款")
            $(".dispute-reason h2").attr("num", 9)
            $(".dispute-reason span").hide()
            $(".dispute-reason").off("click")
        }

        // 处理退货商品数据
        var prodData = JSON.parse(JSON.stringify(prodData))
        
        for (var k = 0; k < prodData.length; k++) {
            delete prodData[k]["id"];
            delete prodData[k]["goods_cover"];
            delete prodData[k]["goods_name"];
            delete prodData[k]["order_id"];
            delete prodData[k]["attrs"];
            var price = prodData[k].transaction_price;
            delete prodData[k]["transaction_price"];
            if(status !== 2) {
                prodData[k].number = parseInt(numArr[k]);
            }
            prodData[k].price = price;
        }
        handleEditPage.repeatEdit()
        applyService.handleSendApply(prodData)

    },
    // 再次编辑
    repeatEdit: function () {
        $(".add-or-edit").on("click", function () {
            $(".edit-page").show()
            $(".dispute-page").hide()
        })
    }

}
// 售后申请
var applyService = {
    postServiceData: function (prodData, voucher_pic) {
        var data = JSON.stringify(prodData),
            service = $(".service .select").attr("type"),
            reason = $(".dispute-reason h2").attr("num"),
            explain = $(".des-con").val(),
            total_amount = $(".dispute-money b").html(),
            voucher_pic = JSON.stringify(voucher_pic);
        var params = {
            data: data,
            service: service,
            reason: reason,
            explain: explain,
            voucher_pic: voucher_pic,
            total_amount: total_amount
        };
        if (jwt_token != "" && jwt_token != undefined) {
            params.jwt_token = jwt_token;
        }
        var url = host + "/order/" + id + "/applyService";
        commonCla.ajaxCommonFun(url, "post", function (ret, textStatus, request) {
            if (ret.code == "200") {
                
                window.location.href = "disputestatus.html?id=" + id + "&jwt_token=" + jwt_token
            } else if (ret.code == "401") {
                htmlAlert("", "<a class='btn_relogin' >重新登录</a>")
            } else {
                sAlert_auto(ret.error, 2000)
            }
        }, params);
    },
    // 申请验证
    handleSendApply: function (prodData) {
        $(".des-con").on('input propertychange', function () {
            var content = $(this).val();
            if (content.length >= 200) {
               $(this).val(content.substring(0, 200)) 
               sAlert_auto("退款说明不能超过200字", 1500)
            }
        });
        $('.js-submit').off('click').on('click', applyService.checkDispute(prodData))
    },
    // 验证防抖函数
    checkDispute: function (prodData) {
        var timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                var reason = $(".dispute-reason h2").html(),
                    explain = $(".des-con").val();
                var imgArr = $(".upload-area .upload-item")
                var voucher_pic = [];
                // 凭证截取域名后的路径
                imgArr.each(function (k, v) {
                    voucher_pic.push($(this).children().attr("src").substring($(this).children().attr("src").indexOf('tv') + 2))
                })
                if (reason == "申请退款原因") {
                    sAlert_auto("请选择退款原因", 1500)
                } else if (explain == "") {
                    sAlert_auto("请输入退款说明", 1500)
                } else if (explain.length >= 200) {
                    sAlert_auto("退款说明不能超过200字", 1500)
                } else if (voucher_pic.length <= 0) {
                    sAlert_auto("请上传凭证", 1500)
                } else {
                    applyService.postServiceData(prodData, voucher_pic)
                }
            }, 500);
        }
    }
}
$(function () {
    selectService()
    reasonSelect()
    handleEditPage.getGoodsList()
    numModule()
    // 解决手机软件键盘遮挡input框的问题
    window.onresize = function () {
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
            setTimeout(function () {
                var top = document.activeElement.getBoundingClientRect().top;
                window.scrollTo(0, top);
            }, 0);
        }
    }
})