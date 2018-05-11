var host=commonCla.hostBase;
var pageCount=0;
var count=10;


var fDate=function(date){
	return date.replace("T"," ").replace("Z","").split("+")[0];
}
var initTableData=function(ret,urlMark){
	var tableHtml="";var tableHeader="";var tableBody="";
	//充值记录
	if(urlMark=="account"){
		tableHeader='<thead>'+
			 '<tr>'+
				'<th>时间</th>'+
				'<th>充值金额</th>'+
				'<!--<th>冻结金额（元）</th>-->'+
				'<th>账户余额（元）</th>'+
				'<th>充值方式</th>'+
				'<th>订单编号</th>'+
				'<th>备注</th>'+
			'</tr>'+
			'</thead>'
	}else{
		//消耗明细
		tableHeader='<thead>'+
			 '<tr>'+
				'<th>时间</th>'+
				'<th>项目名称</th>'+
				'<th>广告ID</th>'+
				'<th>金额（元）</th>'+
				'<!--<th>冻结金额（元）</th>-->'+
				'<th>账户余额（元）</th>'+
			'</tr>'+
			'</thead>'
	}
	if(ret.Data.PageData!=null){
		$(".M-box").show();
		var page_data=ret.Data.PageData;
		var total=ret.Data.Total;
		pageCount=Math.ceil(total/count);
		
		for (var i = 0; i < page_data.length; i++) {
			if(urlMark=="account"){
				tableBody+='<tr>'+
					'<td>'+fDate(page_data[i].SuccessAt)+'</td>'+
					'<td>'+page_data[i].TotalAmount+'</td>'+
					'<td>'+page_data[i].AccountBalance+'</td>'+
					'<td>'+(page_data[i].PaymentType==1?"微信":"支付宝")+'</td>'+
					'<td>'+page_data[i].OutTradeNo+'</td>'+
					'<td>'+page_data[i].Remarks+'</td>'+
					'</tr>'
			}else{
				tableBody+='<tr>'+
					'<td>'+fDate(page_data[i].CreatedAt)+'</td>'+
					'<td>'+page_data[i].AdName+'</td>'+
					'<td>'+page_data[i].AdId+'</td>'+
					'<td>'+page_data[i].Amount+'</td>'+
					'<!--<td></td>-->'+
					'<td>'+page_data[i].AccountBalance+'</td>'+
					'</tr>'

			}
			
			
		};
	}else{
		$(".M-box").hide();
		tableBody='<tr >'+
					'<td colspan="7">暂无数据</td>'+
					'</tr>'
	}
	
	tableHtml=tableHeader+tableBody;
	$("#money_tableCon").html(tableHtml);
}
var getListData=function(){
	var urlMark=$(".timer_tabs .cur").attr("urlmark");
	var BeginDate=$("#searchDateRange").html().split("至")[0];
	var EndDate=$("#searchDateRange").html().split("至")[1];
	var cur_count=Number($(".M-box .active").html()==undefined?0:$(".M-box .active").html())*10-10
	var Keyword=$(".txt_title").val()
	var params={
		"Token":getCookie("token"),
		"CurrentCount":cur_count,
		"Count":count,
		"Status":getCookie("status"),
		"Keyword":Keyword,
		"BeginDate":BeginDate,
		"EndDate":EndDate,

	}
	var url=host+"/"+urlMark;
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.Code=="200"){
			
			if($("#money_tableCon tr").length<=0 && ret.Data.PageData!=null){
				//分页
				$('.M-box').pagination({
			    	pageCount: Math.ceil(ret.Data.Total/count),
				    jump: false,
				    callback:function(api){
				        var data = {
				            page: api.getCurrent(),
				            name: 'mss',
				            say: 'oh'
				        };
				        getListData();
				        console.log(api.getCurrent())
				       
			    	}
			    });
			}
			initTableData(ret,urlMark);
			
		}else{
			swal({
              "title":ret.Error,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            },function(){
            	/*parent.location.href="home.html"*/
            });
		}
	},params)
}
var initSpreadPage=function(){
	/*moment.locale('en', {
	    calendar : {
	        lastDay : '[Yesterday at] LT',
	        sameDay : '[Today at] LT',
	        nextDay : 'L',
	        lastWeek : '[last] dddd [at] LT',
	        nextWeek : 'dddd [at] LT',
	        sameElse : 'L'
	    }
	});
	date_range_options.minDate=moment().add(1,'day').calendar();*/

	initDatePicker();
	
	getListData();
	$(".btn_create_search").click(function(){
		$("#money_tableCon").html("");
		getListData();
	})
	$(".timer_tabs span").click(function(){
		$("#money_tableCon").html("");
		$(".timer_tabs span").removeClass("cur")
		$(this).addClass("cur");
		getListData();
	})

}
$(function(){
	initSpreadPage();
})