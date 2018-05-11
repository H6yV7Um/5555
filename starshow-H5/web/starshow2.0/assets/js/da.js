var host=commonCla.hostBase+"/v11"
var myChart="";
// 指定图表的配置项和数据

var initChartsData=function(start_time,end_time,star_id,platform_id){
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('main'));
    var params={
        "start_time":start_time,
        "end_time":end_time,
        "star_id":star_id,
        "platform_id":platform_id
    }
    var url=host+"/boards/analysis";
    commonCla.ajaxCommonFun(url,"get",function(data){
     if(data.code=="200"){
          initCharts(data);
     }
    },params)
}

options = {
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                show:false,
                type: 'line',
                snap:true,
                
            }
        },
        legend: {
            data:[]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
		        axisLine:{show:false },
                axisTick:{ show:false},
		        axisLabel:{
                 interval:0,
                 rotate:0,
                 margin:2,
                 textStyle:{
                     color:"#222",
        		     fontSize:"12px",
        		     fontFamily: "Microsoft YaHei",
                   }
                },
                data : []
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                 show:false
                },
                axisTick:{ show:false},
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: '#ddd',
                        type:"dash",
                        opacity:0.8
                    }
                 }
            }
        ],
        series : [
            {
                name:'',
                type:'line',
                stack: '',
		        symbol:"circle",
			    symbolSize:8,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {
                    color:"#fab3bc"
                }},
		        lineStyle:{
    	            normal:{
    	                color:"#fab3bc",
    	                width:1
    	            }
    	        },
    		  itemStyle:{
	            normal:{
	                color:"#ff1d3e"
	            }
	        },
            
              data:[]
            }
        ]
    };
 var getBeforeDate=function(n,time){
     var n = n;
     var d = new Date(time);
     var year = d.getFullYear();
     var mon=d.getMonth()+1;
     var day=d.getDate();
     if(day <= n){
             if(mon>1) {
                mon=mon-1;
             }
            else {
              year = year-1;
              mon = 12;
              }
     }
      d.setDate(d.getDate()-n);
      year = d.getFullYear();
      mon=d.getMonth()+1;
      day=d.getDate();
      s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
      return s;
 }
var rbDate=function(str,num){
    var list=str.split("-");
    var retDate="";
    if(list.length==3 && num==2){   
        retDate=list[1]+"月"+list[2]+"日";
    }else if(list.length==3 && num==3){
        retDate=list[0]+"年"+list[1]+"月"+list[2]+"日";
    }else if(list.length==2){
        retDate=list[0]+"月"+list[1]+"日";
    }
  return retDate;
}
var initCharts=function(data){
    if(data.data.length>8){
      options.xAxis[0].axisLabel.interval=parseInt(data.data.length/6);
    }else{
      options.xAxis[0].axisLabel.interval=0
    }
    options.xAxis[0].data=[];
    options.series[0].data=[];
    for (var i = 0; i < data.data.length; i++) {
       /* influences.push(data.data[i].influence)
        days.push(data.data[i].day);*/
        var t_day=data.data[i].day.split("-")[1]+"-"+data.data[i].day.split("-")[2];
        options.xAxis[0].data.push(t_day)
        options.series[0].data.push(data.data[i].influence);
    };
    $("#hide_da").attr("time",getBeforeDate(Number(-1),data.data[data.data.length-1].day));
    $("#hide_da").attr("cur_time",data.current_time);
    $(".da_date .s-slide").attr("first_time",data.data[0].day);
    $(".da_date .s-slide").html(rbDate(data.data[0].day,2)+"-"+rbDate(data.data[data.data.length-1].day,2));

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(options);
}
var initChart=function(star_id,platform_id){
 initChartsData("","",star_id,platform_id);
  //切换近日
  $(".da_header li").click(function(){
    if($(this).hasClass("cur")==false){
       $(".da_header li").removeClass("cur");
         $(this).addClass("cur");
         var num=$(this).attr("num");
         var end_time=$("#hide_da").attr("cur_time").split(" ")[0];
         var before_time=getBeforeDate(num,end_time);
         initChartsData(before_time,end_time,star_id,platform_id);
         if(num==7){
          counterN=3;
          counterS=0;
         }else{
          counterN=2;
          counterS=0;
         }
         if($(".btn-prev").hasClass("btn-disabled")){$(".btn-prev").removeClass("btn-disabled")};
         if(!$(".btn-next").hasClass("btn-disabled")){$(".btn-next").addClass("btn-disabled");}
    }

  })
  //向前
  var counterN=2;
  var counterS=0;
  
  $(".btn-prev").click(function(){
    var num=$(".da_header .cur").attr("num");
    if(num==7){
       counterN>=3?"3":counterN;
       if(counterN==2 && counterS==0){
         counterN=3;
       }
    }
    counterN=counterN-1;
    counterS=counterS+1;
    var isCan=$(this).hasClass("btn-disabled");
    if(!isCan){
        //获取数据
        var end_time=$(".s-slide").attr("first_time");
        var before_time=getBeforeDate(num,end_time);
        initChartsData(before_time,end_time,star_id,platform_id);
        if(counterN<=0){
           $(".btn-prev").addClass("btn-disabled");
        }
        if(counterN>0){
           $(".btn-next").removeClass("btn-disabled");
        }
    }
    
  })
  $(".btn-next").click(function(){
    var num=$(".da_header .cur").attr("num");
    counterN=counterN+1;
    counterS=counterS-1;
    if(num==7){
      counterN>=2?"2":counterN;
    }else{
      counterN>=3?"3":counterN;
    }
    var isCan=$(this).hasClass("btn-disabled");
    if(!isCan){
        var f_time=$(".s-slide").attr("first_time");
      //获取数据
       var first_time=$("#hide_da").attr("time");
       var after_time=getBeforeDate(Number("-"+num),first_time);
       initChartsData(first_time,after_time,star_id,platform_id);
      if(counterS<=0){
         $(".btn-next").addClass("btn-disabled");
      }
      //alert(counterN+"/"+counterS)
      if(counterN>0){
        $(".btn-prev").removeClass("btn-disabled");
      }
    }
  })
}          
