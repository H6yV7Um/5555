var count=10;
var chart_option= "";
var chart_option_mould = {
	    grid: {bottom: 80,left:100,right:100},
	    legend: {
	        x: 'left',
		left:50,
		 itemWidth:70,  
                    itemHeight:5, 
	        data:[{  
                            name:'',  
                            textStyle:{  
                                fontSize:12,  
                                fontWeight:'bolder',  
                                color:'#1abbf6'  
                            },  
                            icon:'image://../assets/images/icon-blue.png',  
                        },  
                        {  
                            name:'消耗量',  
                            textStyle:{  
                                fontSize:12,  
                                fontWeight:'bolder',  
                                color:'#f2a90b'  
                            },  
                             icon:'image://../assets/images/icon-orange.png',  
                        }  ],   
           
	    },
	    toolbox: {
	        feature: {
	        	dataView: {show: true, readOnly: false},
	        	restore: {show: true},
	            dataZoom: { yAxisIndex: 'none'},
	            
	            saveAsImage: {}
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            animation: false,
	            label: {
	                backgroundColor: '#505765'
	            }
	        }
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLabel:{
					interval:"auto",//"auto"
					/*rotate:35,//倾斜度 -90 至 90 默认为0  
					textStyle:{  
						color:"#000000"  
					} */ 
	            },
	            axisLine:{show:false },
	            axisLine: {onZero: false},

	            /*data : [].map(function (str) {
	                return str.replace(' ', '\n')
	            })*/
	        }
	    ],
	    yAxis: [
	        {
	            name: '',
	            type: 'value',
	            axisLine:{show:false },
	            /*max: 500*/
	        },
	        {
	            name: '消耗量',
	            
	            /*max: 500,
		    inverse: true,*/
	            type: 'value',
	            
	        }
	    ],
	    series: [
	        {
	            name:'',
	            type:'line',
	            animation: false,
	            symbol:"circle",
		    	symbolSize:8,
	            areaStyle: {	
	                normal: {
	                	color:"#ffffff"
	                }
	            },
	            lineStyle: {
	                normal: {
	                    width: 2,
	                    color:"#11b8f6"
	                }
	            },
	            itemStyle:{
			            normal:{
			                color:"#11b8f6"
			            }
			    },
	            data: []
	        },
	        {
	            name:'消耗量',
	            type:'line',
	            yAxisIndex:1,
	            animation: false,
	            areaStyle: {	
	                normal: {
	                	color:"#ffffff"
	                }
	            },
	            lineStyle: {
	                normal: {
	                    width: 2,
	                    color:"#f2a90b"
	                }
	            },
	            itemStyle:{
			            normal:{
			                color:"#f2a90b"
			            }
			    },
	            data: []
	        }
	    ]
}
var chart_option = {
	    grid: {bottom: 80,left:100,right:100},
	    legend: {
	        x: 'left',
		left:50,
		 itemWidth:70,  
                    itemHeight:5, 
	        data:[{  
                            name:'点击量',  
                            textStyle:{  
                                fontSize:12,  
                                fontWeight:'bolder',  
                                color:'#1abbf6'  
                            },  
                            icon:'image://../assets/images/icon-blue.png',  
                        },  
                        {  
                            name:'消耗量',  
                            textStyle:{  
                                fontSize:12,  
                                fontWeight:'bolder',  
                                color:'#f2a90b'  
                            },  
                             icon:'image://../assets/images/icon-orange.png',  
                        }  ],   
           
	    },
	    toolbox: {
	        feature: {
	        	dataView: {show: true, readOnly: false},
	        	restore: {show: true},
	            dataZoom: { yAxisIndex: 'none'},
	            
	            saveAsImage: {}
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            animation: false,
	            label: {
	                backgroundColor: '#505765'
	            }
	        }
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLabel:{
					interval:"auto",//"auto"
					/*rotate:35,//倾斜度 -90 至 90 默认为0  
					textStyle:{  
						color:"#000000"  
					} */ 
	            },
	            axisLine:{show:false },
	            axisLine: {onZero: false},

	            /*data : [].map(function (str) {
	                return str.replace(' ', '\n')
	            })*/
	        }
	    ],
	    yAxis: [
	        {
	            name: '点击量',
	            type: 'value',
	            axisLine:{show:false },
	            /*max: 500*/
	        },
	        {
	            name: '消耗量',
	           
	            max: 500,
		    /*inverse: true,*/
	            type: 'value',
	            
	        }
	    ],
	    series: [
	        {
	            name:'点击量',
	            type:'line',
	            animation: false,
	            symbol:"circle",
		    	symbolSize:8,
	            areaStyle: {	
	                normal: {
	                	color:"#ffffff"
	                }
	            },
	            lineStyle: {
	                normal: {
	                    width: 2,
	                    color:"#11b8f6"
	                }
	            },
	            itemStyle:{
			            normal:{
			                color:"#11b8f6"
			            }
			    },
	            data: []
	        },
	        {
	            name:'消耗量',
	            type:'line',
	            yAxisIndex:1,
	            animation: false,
	            areaStyle: {	
	                normal: {
	                	color:"#ffffff"
	                }
	            },
	            lineStyle: {
	                normal: {
	                    width: 2,
	                    color:"#f2a90b"
	                }
	            },
	            itemStyle:{
			            normal:{
			                color:"#f2a90b"
			            }
			    },
	            data: []
	        }
	    ]
}
var changeChartParams=function(type,tit){

	chart_option.yAxis[0].name=tit
	chart_option.series[0].name=tit
	chart_option.legend.data[0].name=tit
	if(type=="minus"){
		chart_option.legend.data[1]={}
		chart_option.yAxis[1]={}
		chart_option.series[1]={"type":"line"}
	}else{
		chart_option.legend.data[1]=chart_option_mould.legend.data[1]
		chart_option.yAxis[1]=chart_option_mould.yAxis[1]
		chart_option.series[1]=chart_option_mould.series[1]
	}
}
var updateDate=function(date) {
	var str=date;
	if(date.indexOf("T")!=-1){
		 str=date.split("T")[0]+" "+date.split("T")[1].split("Z");
	}
	
	return str
}
var initChartHtml=function(ret){
	var AdList=ret.Data.AdList;
	var Analysis=ret.Data.Analysis;
	//x y
	var yClickData=[];var yDisplayData=[];var yUseUpData=[]; var xData=[];
   
	$(".curTime").html("("+ret.CurrentTime+")");
   var myChart = echarts.init(document.getElementById('main'));
  /* if(Analysis.length>12){
      chart_option.xAxis[0].axisLabel.interval=parseInt(Analysis.length/6);
    }else{
      chart_option.xAxis[0].axisLabel.interval=0;
    }*/
    
    //x轴数据
    if(Analysis!=null){
    	var pid=$('#sel_type option:selected').attr("pid");
    	var PaymentType=$('#sel_adList option:selected').attr("ptype");

    	var typeName="CPC";
    	if(PaymentType==2){
    		typeName="CPM"
    	}

    	$(".charts_title .fb_tit").html(typeName);
    	console.log(pid+"p"+PaymentType)
		
    	for (var i = 0; i < Analysis.length; i++) {
	    	//点击量
	    	yDisplayData.push(Analysis[i].DisplayNum);
	    	yClickData.push(Analysis[i].ClickNum);
	    	yUseUpData.push(Analysis[i].TotalCost);
	    	xData.push(updateDate(Analysis[i].PublicAt));
	    };
	    //判断cpm cpc
		if(pid==2 && pid==PaymentType){
			//加上cpm消耗量
			changeChartParams("add","展示量");

			chart_option.series[0].data=yDisplayData;
			chart_option.series[1].data=yUseUpData;
			//加上cpm消耗量
		}else if(pid==2 && pid!=PaymentType){
			//去掉cpm消耗量
			changeChartParams("minus","展示量");
			chart_option.series[0].data=yDisplayData;
			//去掉cpm消耗量
			/*chart_option.legend.data[1]={}
			chart_option.yAxis[1]={}
			chart_option.series[1]={"type":"line"}
			chart_option.series[1].data=[];*/

		}else if(pid==1 && pid!=PaymentType){
			//去掉cpc消耗量
			changeChartParams("minus","点击量");
			chart_option.series[0].data=yClickData;
			
			/*chart_option.legend.data[1]={}
			chart_option.yAxis[1]={}
			chart_option.series[1]={"type":"line"}
			chart_option.series[1].data=[];*/
		}else if(pid==1 && pid==PaymentType){
			//加上cpc消耗量
			changeChartParams("add","点击量");
			chart_option.series[0].data=yClickData;
			chart_option.series[1].data=yUseUpData;
			

		}else if(pid==undefined){
			if(PaymentType==1){
				//加上cpc消耗量
				changeChartParams("add","点击量");
				chart_option.series[0].data=yClickData;
				chart_option.series[1].data=yUseUpData;
			}else {
				//加上cpm消耗量
				changeChartParams("add","展示量");
				chart_option.series[0].data=yDisplayData;
				chart_option.series[1].data=yUseUpData;
			}
		}
	    chart_option.xAxis[0].data=xData;
		// 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(chart_option);
    }
    
}

var getChartData=function(obj_params) {
	var selectId=$('#sel_adList option:selected').attr("adId")==undefined?"0":$('#sel_adList option:selected').attr("adId");

	var params={
		"Type":obj_params.Type,
		"BeginDate":obj_params.BeginDate,
		"EndDate":obj_params.EndDate
	}
	var url=commonCla.hostBase+"/analysis/"+selectId+"?Token="+getCookie("token");
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.Code=="200"){
			if(selectId=="" || selectId=="0" || selectId=="-1"){
				var AdList=ret.Data.AdList;
				var options=""
				if(AdList==null){
					options+="<option adId='-1' ptype='-1'>暂无广告</option>"
				}else{
					if(AdList.length>0){
						for (var i = 0; i < AdList.length; i++) {
							options+="<option adId="+AdList[i].Id+" ptype="+AdList[i].PaymentType+">"+AdList[i].Name+"</option>"
						};
					}else{
						options+="<option adId='-1' ptype='-1'>暂无广告</option>"
					}
				}
				
				
			}
			$("#sel_adList").html(options);

			initChartHtml(ret)
		}

	},params)
}

var initReportListHtml=function(ret){
	var listHtml=""
	var Analysis=ret.Data.PageData;
	if(Analysis!=null && Analysis!=undefined && Analysis.length>0){
		$(".M-box").show();
		var PaymentType=ret.Data.PaymentType;
		var Payment_str="CPC"
		if(PaymentType==2){
			//1CPC、2CPM
			Payment_str="CPM"
		}
		for (var i = 0; i < Analysis.length; i++) {
			listHtml+='<tr>'+
				'<td>'+Analysis[i].PublicAt+'</td>'+
				'<td>'+Payment_str+'</td>'+
				'<td>'+Analysis[i].DisplayNum+'</td>'+
				'<td>'+Analysis[i].ClickNum+'</td>'+
				'<td>'+Analysis[i].Price+'</td>'+
				'<td>'+Analysis[i].TotalCost+'</td>'+
			'</tr>'
			
		};
		
	}else{
		$(".M-box").hide();
		listHtml='<tr >'+
			'<td colspan="6">暂无数据</td>'+
			'</tr>'
	}
	$("#report_list").html(listHtml)
}
var getReportListData=function(obj_params){
	var cur_count=Number($(".M-box .active").html()==undefined?0:$(".M-box .active").html())*10-10;
	cur_count=cur_count<0?0:cur_count
	var params={
		"Type":obj_params.Type,
		"BeginDate":obj_params.BeginDate,
		"EndDate":obj_params.EndDate,
		"CurrentCount":cur_count
	}
	var selectId=$('#sel_adList option:selected').attr("adId")==undefined?"1":$('#sel_adList option:selected').attr("adId");
	var url=commonCla.hostBase+"/analysis/list/"+selectId+"?Token="+getCookie("token");
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.Code=="200"){
			if($("#report_list tr").length<=0 && ret.Data!=null){
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
				        getReportListData(params);
				        
				       
			    	}
			    });
			}
			initReportListHtml(ret);
			
		}

	},params)

}
var common_getDataChart=function(){
	var startDate="";
	var endDate="";

	//$(".curTime").html($("#searchDateRange").html());
	if($("#searchDateRange").html()!=undefined){
	     startDate=$("#searchDateRange").html().split("至")[0];
	     endDate=$("#searchDateRange").html().split("至")[1];
	}
	var Type=$(".timer_tabs .cur").index()+1;
	var obj_params={
		"Type":Type,
		"BeginDate":startDate,
		"EndDate":endDate
	}
	getChartData(obj_params);
	getReportListData(obj_params);
}
var initReport=function(){
	common_getDataChart();
	//初始化日历
	if($("#searchDateRange").html()!=undefined){
	  initPicker();
	}
	
	//搜索
	$(".btn_create_search").click(function(){
		$("#report_list").html("")
		common_getDataChart();
	})
	//切换时间
	$(".timer_tabs ").on("click",".tab",function(){
		$(".timer_tabs .tab").removeClass("cur");
		$(this).addClass("cur");
		$("#report_list").html("")
		common_getDataChart();
	})
	//切换广告
	$("#sel_adList").change(function(){
		common_getDataChart();
		var ptype=$('#sel_adList option:selected').attr("ptype")==undefined?$('#sel_adList option').eq(0).attr("ptype"):$('#sel_adList option:selected').attr("ptype");
	    ptype=Number(ptype)-1;
		$('#sel_type').find("option").eq(ptype).attr("selected",true);
		})
	//切换方式
	$("#sel_type").change(function(){
		common_getDataChart();
	})

}
//初始化首页数据报表
var initHomeReport=function(){
	var Type=$(".timer_tabs .cur").index()+1;

	var obj_params={
		"Type":1,
		"BeginDate":"",
		"EndDate":""
	}
	getChartData(obj_params);
	//切换广告
	$("#sel_adList").change(function(){
		getChartData(obj_params);
	})

}

var initPicker=function () {
	moment.locale('en', {
	    calendar : {
	        lastDay : '[Yesterday at] LT',
	        sameDay : '[Today at] LT',
	        nextDay : 'L',
	        lastWeek : '[last] dddd [at] LT',
	        nextWeek : 'dddd [at] LT',
	        sameElse : 'L'
	    }
	});
	date_range_options.maxDate=moment().add(1,'day').calendar();
	$('#reportrange span').html(moment().subtract('hours', 1).format('YYYY-MM-DD') + ' 至 ' + moment().format('YYYY-MM-DD')); 
	//initDatePicker();
	$('#reportrange').daterangepicker(date_range_options, function(start, end, label) {
    	//格式化日期显示框  
      $('#reportrange span').html(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));
      initTimeTabs();
    });
}
var initTimeTabs=function(){
	var dates=$('#searchDateRange').html().split("至");
	var dayDiff=commonCla.dateDiff('D', dates[0], dates[1]);
	$(".timer_tabs span").addClass("tab");
	$(".timer_tabs span").removeClass("tab").addClass("tab_disabled");
	//日
	$(".timer_tabs span").eq(1).removeClass("tab_disabled").addClass("tab");
	if(dayDiff<=7){
		//时
		$(".timer_tabs span").eq(0).removeClass("tab_disabled").addClass("tab");
	}else if(dayDiff>7 && dayDiff<=14){
		//周
		$(".timer_tabs span").eq(0).removeClass("tab_disabled").addClass("tab");
		$(".timer_tabs span").eq(2).removeClass("tab_disabled").addClass("tab");
	}else if(dayDiff>14 && dayDiff<90){
		$(".timer_tabs span").eq(0).removeClass("cur");
		$(".timer_tabs span").eq(1).addClass("cur")
		//周
		$(".timer_tabs span").eq(2).removeClass("tab_disabled").addClass("tab");
		
	}else{
		$(".timer_tabs span").eq(0).removeClass("cur");
		$(".timer_tabs span").eq(1).addClass("cur")
		$(".timer_tabs span").eq(2).removeClass("tab_disabled").addClass("tab");
		$(".timer_tabs span").eq(3).removeClass("tab_disabled").addClass("tab");
	}

}
$(function(){
	//初始化数据报告
	if($("#hide_info").attr("page")=="report"){
		initReport();
	}
	if($("#hide_info").attr("page")=="indexList"){
		initHomeReport();
	}
	
	
})