var host=commonCla.hostBase;
var pageCount=0;
var count=10;
var checkStatus=function(params){
	var statusId=params.statusId;
	//
	var btime=params.btime.replace(/-/g,"/");
	var etime=params.etime.replace(/-/g,"/");
	var curtime=params.curtime;
	//开启或关闭的状态 0关、1开
	var stopStatus=params.stopStatus;

	var str_status="";
	var str_btnList=""

	//按钮
	var btn_editor='<span class="tdBtn btn_editor">编辑</span>';
	var btn_delete='<span class="tdBtn btn_disabled">删除</span>';
	var btn_stop='<span class="tdBtn btn_stop">暂停</span>';
	//0待审核、1审核未通过、2审核通过，3推广中、4推广结束
	if(stopStatus==0){
		var btn_stop_value="开启"
	}else{
		var btn_stop_value="暂停"
	}
	var btn_stop='<span class="tdBtn btn_disabled">'+btn_stop_value+'</span>';
	if(statusId==0){
		str_status="草稿"
		btn_delete='<span class="tdBtn btn_delete">删除</span>'
	}else if(statusId==1){
		str_status="审核中"
		btn_editor='<span class="tdBtn btn_disabled">编辑</span>'
	}else if(statusId==2){
		str_status="审核失败"
		btn_delete='<span class="tdBtn btn_delete">删除</span>'
	}else if(statusId==3){
		str_status="审核成功"
		var btimeDiff=commonCla.dateDiff('T',btime,curtime);
		var etimeDiff=commonCla.dateDiff('T',etime,curtime);

		if(btimeDiff<0){
			str_status="未开始"
		}else if(btimeDiff>0 && etimeDiff<0){
			str_status="推广中"
			var btn_stop='<span class="tdBtn btn_stop" publish="'+stopStatus+'">'+btn_stop_value+'</span>';
		}else{
			str_status="已结束"
			btn_delete='<span class="tdBtn btn_delete">删除</span>'
		}
	}
	str_btnList=btn_editor+btn_stop+btn_delete;
	retObject={
		"Status":str_status,
		"btnList":str_btnList
	}
	return retObject
}
var justDate=function(date){
	return date.split("T")[0];
}
var initTableData=function(ret){
	var tableHtml="";
	if(ret.Data.PageData!=null){
		$(".M-box").show();
		var page_data=ret.Data.PageData;
		var total=ret.Data.Total;
		pageCount=Math.ceil(total/count);
		var payStr=""
		for (var i = 0; i < page_data.length; i++) {
			var times=page_data[i].TimeInterval;
			var bTime=times.split(",")[0];
			var eTime=times.split(",")[1];
			var params_status={
				"statusId":page_data[i].Status,
				"btime":justDate(page_data[i].BeginDate)+" "+bTime,
				"etime":justDate(page_data[i].EndDate)+" "+eTime,
				"curtime":ret.CurrentTime,
				"stopStatus":page_data[i].Publish
			}
			var statusData=checkStatus(params_status);
			if(page_data[i].PaymentType==0){
				payStr="无"
			}else if(page_data[i].PaymentType==1){
				payStr="CPC"
			}else if(page_data[i].PaymentType==2){
				payStr="CPM"
			}
      var bDate="-";
      var eDate="-";
      if(page_data[i].BeginDate.indexOf("0001")==-1){
        bDate=justDate(page_data[i].BeginDate);
      }
      if(page_data[i].BeginDate.indexOf("0001")==-1){
        eDate=justDate(page_data[i].EndDate);
      }
      var bTime="";var eTime="";var timeStr="";
      if(page_data[i].TimeInterval!=""){
        bTime=page_data[i].TimeInterval.split(",")[0];
        eTime=page_data[i].TimeInterval.split(",")[1];
        timeStr=bTime+"~"+eTime;
      }
			tableHtml+='<tr>'+
					'<!--<td>'+page_data[i].Id+'</td>-->'+
					'<td adv_id="'+page_data[i].Id+'">'+page_data[i].Name+'</td>'+
					'<td>'+payStr+'</td>'+
					'<td>'+page_data[i].DisplayNum+'</td>'+
					'<td>'+page_data[i].ClickNum+'</td>'+
					'<td>'+page_data[i].TotalCost+'</td>'+
					'<td>'+page_data[i].Price+'</td>'+
					'<td>'+
							bDate+'~'+eDate+'<br/>'+timeStr+
					'</td>'+
					
					'<td>'+justDate(page_data[i].CreatedAt)+'</td>'+
					'<td>'+statusData.Status+'</td>'+
					'<td>'+statusData.btnList+'</td>'+
					'</tr>'
			
		};
	}else{
		$(".M-box").hide();
		tableHtml='<tr >'+
					'<td colspan="11">暂无数据</td>'+
					'</tr>'
	}
	
	
	$("#spread_tableCon").html(tableHtml);
}
var getListData=function(){
	var BeginDate=$("#searchDateRange").html().split("至")[0];
	var EndDate=$("#searchDateRange").html().split("至")[1];
	//var cur_count=$("#spread_tableCon tr").length;
	var cur_count=Number($(".M-box .active").html()==undefined?0:$(".M-box .active").html())*10-10
	var Keyword=$(".txt_title").val()

	var status=$("#select_status").find("option:selected").attr("typeId");
	var params={
		"Token":getCookie("token"),
		"CurrentCount":cur_count,
		"Count":count,
		"Status":status,
		"Keyword":Keyword,
		"BeginDate":BeginDate,
		"EndDate":EndDate,

	}
	var url=host+"/ad"
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.Code=="200"){
			
			if($("#spread_tableCon tr").length<=0 && ret.Data.PageData!=null){
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
			initTableData(ret);
			
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
var advDelete=function(adv_id){
	var url=host+"/ad/delete/"+adv_id+"?Token="+getCookie("token");
	commonCla.ajaxCommonFun(url,"POST",function(ret){
		if(ret.Code=="200"){
			swal({
              "title":"删除成功",
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            });
            getListData();
		}else{
			swal({
              "title":ret.Error,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            });
		}
	})
}
//停止开启
var advOpen=function(adv_id,thi){
	var url=host+"/ad/open/"+adv_id+"?Token="+getCookie("token");
	var Publish=$(thi).attr("publish");
	var dialog_title=(Publish==1?"暂停成功":"开启成功");
	var changedTit=(Publish==1?"开启":"暂停");

	var params={
		"Publish":parseInt(Publish)==1?parseInt(0):parseInt(1)
	}
	commonCla.ajaxCommonFun(url,"POST",function(ret){
		if(ret.Code=="200"){
			swal({
              "title":dialog_title,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",
            });
            $(thi).html(changedTit)
            var update_publish=$(thi).attr("publish")==1?parseInt(0):parseInt(1);
            $(thi).attr("publish",update_publish)

            
		}else{
			swal({
              "title":ret.Error,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

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
		$("#spread_tableCon").html("")
		getListData();
	})
	//编辑
	$("#spread_tableCon").on("click",".btn_editor",function(){
		var adv_id=$(this).parents("tr").find("td").eq(0).attr("adv_id");
		window.location.href="spreadCreat.html?mt=1&advId="+adv_id
		
	})
	//停止开启
	$("#spread_tableCon").on("click",".btn_stop",function(){
		var adv_id=$(this).parents("tr").find("td").eq(0).attr("adv_id");
		advOpen(adv_id,$(this))
	})
	//删除
	$("#spread_tableCon").on("click",".btn_delete",function(){
		var adv_id=$(this).parents("tr").find("td").eq(0).attr("adv_id");
		advDelete(adv_id)
		
	})
	//完善信息
	$(".indexList").on("click",".toUserInfo",function(){
		/*$(".js_dspMenu li", window.parent.document).removeClass("cur");
		$(".js_dspMenu li", window.parent.document).eq(4).addClass("cur");
		$("iframe", window.parent.document).attr("src","profile.html");*/
		window.location.href="profile.html?mt=4"
	})

}
$(function(){
	initSpreadPage();
})