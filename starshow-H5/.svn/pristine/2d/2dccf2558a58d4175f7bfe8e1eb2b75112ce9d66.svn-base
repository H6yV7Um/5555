var host = commonCla.hostBase;
var pageCount = 0;
var count = 10;
var getMsgData = function(page) {
    var url = host+"/message";
    var cur_count = page ? (page - 1) * count : 0;
    var params = {
            "Token": getCookie("token"),
            "CurrentCount": cur_count,
            "Count": count,
        };
    commonCla.ajaxCommonFun(url, "get", function (ret) {
        if(ret.Code=="200") {
            if ($(".mes-list li").length <= 0 && ret.Data.PageData != null) {
                //分页
                $('.M-box').pagination({
                    pageCount: Math.ceil(ret.Data.Total / count),
                    jump: false,
                    callback: function (api) {
                        var data = {
                            page: api.getCurrent(),
                            name: 'mss',
                            say: 'oh'
                        };
                        getMsgData(data.page);    //把页数传回去
                    }
                });
            }
            initMsgList(ret)
        }else{
            $(".mes-list").html("获取数据失败")
        }
    },params)
}
var initMsgList = function(ret) {
    var readTime = (new Date(ret.Data.ReadMessageAt)).getTime();
    var msgHtml = "";
    var listData = ret.Data.PageData;
    var total = ret.Data.Total;
    if (listData != null) {
        $(".M-box").show();
        pageCount = Math.ceil(total / count);
        for (var i in listData) {
            //格式化日期格式
            var CreatedTime = timeFormat((new Date(listData[i].CreatedAt)).getTime());
            // 计算是否已读
            var isRead = (new Date(listData[i].CreatedAt)).getTime() - readTime;
            /* console.log("创建：" +CreatedTime)
            console.log("已读："+timeFormat(readTime)) */
            if (isRead>=0) {
                // 未读
                msgHtml += `<li class="mes-list-item">
                            <div class="item-head">
                                <h4 class="notic">${listData[i].Title}<span class="unread"></span></h4>
                                <span class="time">${CreatedTime}</span>
                            </div>
                            <p>${listData[i].Content}</p>
                        </li>`
            }else {
                // 已读
                msgHtml += `<li class="mes-list-item">
                            <div class="item-head">
                                <h4 class="notic">${listData[i].Title}</h4>
                                <span class="time">${CreatedTime}</span>
                            </div>
                            <p>${listData[i].Content}</p>
                        </li>`
            }
        }
    }else {
        $(".M-box").hide();
        msgHtml ="暂无数据";
        total="0";
    }
    $(".mes-total").html(total)
    $(".mes-list").html(msgHtml)
}
$(function () {
    getMsgData()
})