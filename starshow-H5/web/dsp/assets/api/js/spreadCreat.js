var host=commonCla.hostBase;
var ue = UE.getEditor('editor');
var upload_VideoUrl="";
var allParams={};
/*
*编辑
*/
var initPicShow=function(params){
	//大图
	var img_tip='图片比例：'+params.present+'  建议尺寸：'+params.size+'<br>图片大小：小于1M';
	//预览图
	$(".putIn_type_preview img").attr("src",params.previewImg);
	//adv_img_type 选中状态
	if(params.advImgTypeNum=="all"){
		$(".js_adv_imgType div").removeClass("tab_disable").addClass("tab");
    var formNum=$("#hide_info").attr("Form")
		$(".js_adv_imgType div").eq(formNum-1).addClass("cur")
	}else{
		$(".js_adv_imgType div").eq(params.advImgTypeNum).removeClass("tab_disable").addClass("tab").addClass("cur");
	}
	
	//尺寸提示
	$(".uploads .js_upload_con p").html(img_tip);
}
var advId=commonCla.analyzParams("advId");
//初始化创意
var initStep2=function(){
	//1文章2视频3落地页 0无
	var AdType=$("#js_stype1_type .cur").index()+1;
	if(AdType==4 ||  AdType==0){
		$(".js_adv_PaymentType div").eq(0).removeClass("tab").removeClass("cur").addClass("tab_disable");
		$(".js_adv_PaymentType").find(".tab").eq(1).addClass("cur");
	}
	if(AdType==4 || AdType==3){
    var Position=$("#js_adv_mobile").find("tr.cur").index();
    if(Position==6){
      $(".orient_con").show();
    }
    $("#js_adv_mobile tr:last-child").show();
	}else{
		$(".orient_con").hide();
		$("#js_adv_mobile tr:last-child").hide();
	}
}
var initStep3=function(){
	var params={}
	//1文章2视频3落地页 0无
	var AdType=$("#js_stype1_type .cur").index()+1;
	//1APP 2PC
	var ClientType=$(".js_adv_platform .cur").index()+1;
	var Position=$(".js_adv_location").eq(ClientType-1).find("tr.cur").index();
	//不可选
	$(".js_adv_imgType div").removeClass("tab").removeClass("cur").addClass("tab_disable")
	//单图配置
	$(".uploads li").hide();
	$(".uploads li").eq(0).show();
	$(".uploads li").eq(0).css("width","100%");
	$(".upload_area").css("height","300px");

	if(ClientType==1){
		if(Position==1){
			//启动页	大图
			params.size="1242X1900"
			params.present="5:7";
			params.previewImg="../assets/images/adv_tu01.png";
			params.advImgTypeNum="1"
			initPicShow(params);
			//显示视频选项
			$(".js_adv_display").show();
			$(".js_adv_display").prev(".dsp_tit").show();
		}else if(Position==2 || Position==4){
			//banner  大图
			params.size="750x563"
			params.present="4:3";
			params.previewImg="../assets/images/adv_tu02.png";
			params.advImgTypeNum="1"
			initPicShow(params);

		}else if(Position==3){	
			//首页信息流
			if(AdType==3 || AdType==0 || AdType==4){
				var step3Form=$("#hide_info").attr("Form");
				if(step3Form!=3 && step3Form!=0){
				 //小图 大图
				 //组图配置
				    $(".uploads li").hide();
					$(".uploads li").eq(0).show();
					$(".uploads li").css("width","100%");
					$(".upload_area").css("height","300px");
          if(step3Form==1){
           params.size="750X563"
					 params.present="4:3";
          }else{
            params.size="750X422"
				  	params.present="16:9";
          }
					
					//params.advImgTypeNum=(step3Form-1)

				}else{
					//组图配置
					$(".uploads li").show();
					$(".uploads li").css("width","150px");
					$(".upload_area").css("height","150px");
					params.size="250X250"
					params.present="1:1";
				

				}
        var status=$("#hide_info").attr("Status");
        if(status!=3){
        	params.advImgTypeNum="all"
        }else{
          params.advImgTypeNum=(step3Form-1)
        }
        
				//组图  大图  小图
				params.previewImg="../assets/images/putIn0"+step3Form+".png";
				
			}else if(AdType==2){
				//大图
				params.size="750X422"
				params.present="16:9";
				params.previewImg="../assets/images/putIn02.png";
				params.advImgTypeNum="1"
			}else if(AdType==1){
				//小图
				params.size="750X563"
				params.present="4:3";
				params.previewImg="../assets/images/putIn01.png";
				params.advImgTypeNum="0"
			}
			
			initPicShow(params);

		}else if(Position==5){
			//新闻底部插件
			//小图
			params.size="750x300"
			params.present="3:1";
			params.previewImg="../assets/images/adv_tu05.png";
			params.advImgTypeNum="0";
			initPicShow(params);
		}else if(Position==6){
			//视频贴片
			//大图
			params.size="750X422"
			params.present="16:9";
			params.previewImg="../assets/images/adv_tu06.png";
			params.advImgTypeNum="1";
			initPicShow(params);
			//显示视频选项
			$(".js_adv_display").show();
			$(".js_adv_display").prev(".dsp_tit").show();
			$(".js_adv_display div").eq(0).removeClass("tab").addClass("tab_disable");
			$(".js_adv_display div").eq(1).addClass("cur");

			$("#app_video").prev(".dsp_tit").html("展示视频")
			$("#app_video").find(".js_upload_con p").html('为保证正常播放，请上传MP4格式视频<br>视频小于30M,时长5s-15s')
			$("ul.uploads").hide();
			$("#app_video").show();
      if($("#app_video .js_look").css("display")=="none"){
        $(".del-upload").hide();
      }
			
		}
		
	}else{
		if(Position==2){
			//小图
			params.size="750x563"
			params.present="4:3";
			params.previewImg="../assets/images/adv_tu_pc02.png";
			params.advImgTypeNum="0";
			initPicShow(params);
		}else{
			//banner  大图
			params.size="1000x300"
			params.present="10：3";
			params.previewImg="../assets/images/adv_tu_pc0"+Position+".png";
			params.advImgTypeNum="1"
			initPicShow(params);
		}

	}
	
}
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}
//获取详情
var getDetailInfo=function(advId){
	var url=host+"/ad/"+advId+"?Token="+getCookie("token");
	commonCla.ajaxCommonFun(url,"get",function(ret){
		if(ret.Code=="200"){
			var Status=ret.Data.Status;
			//存储详情状态0草稿、1审核中、2审核失败、3推广中
			$("#hide_info").attr("status",Status);
			$("#hide_info").attr("advId",ret.Data.Id);
			//投放目的类型
			var AdType=ret.Data.AdType;
			$("#txt_adv_name").val(ret.Data.Name);
			$("#js_stype1_type div").removeClass("cur").removeClass("tab").addClass("tab_disable");

			$("#stype1 .tabCon").hide();
			if(AdType!=0){
				$("#js_stype1_type div").eq(AdType-1).removeClass("tab_disable").addClass("tab").addClass("cur");
				if(AdType==1){
					$("#txt_article_tit").val(ret.Data.Title);
					 	var content=ret.Data.Content;
						ue.addListener('ready', function (editor) {
							ue.setHeight(700);
							ue.setContent(content);
						});
					 
				}else if(AdType==2){
					$("#txt_video_tit").val(ret.Data.Title);
					if(ret.Data.VideoUrl!=""|| ret.Data.VideoUrl!=null){
						$("#stype1 .js_upload_con").hide();
						$("#stype1 .js_look").show();
						$(".uploadVideo").attr("src",ret.Data.VideoUrl)

					}else{
					

					}
				}else if(AdType==3){
					$("#txt_link_tit").val(ret.Data.Title);
					$("#txt_link").val(ret.Data.LinkUrl);
				}else if(AdType==4){
					$("#txt_wu_tit").val(ret.Data.Title);
				}
				//表格
	
				$("#stype1 #tabCon"+AdType).show();
			}else{
				$("#js_stype1_type div").eq(3).removeClass("tab_disable").addClass("tab").addClass("cur");
				//表格
				$("#style1 #tabCon4").show();
			}
			//style2
			//投放平台位置
			$("#hide_info").attr("ClientType",ClientType);
			var ClientType=ret.Data.ClientType;
			var Position=ret.Data.Position;
			var pc_app=ClientType==1?"":"_pc"

			var Directional=ret.Data.Directional;
			var dArr=Directional.split(",");
      var isall=true;
			$("input[name=orient]").each(function(){
				 var oid=$(this).attr("orientId");
				if(isInArray(dArr,oid)){
					this.checked="checked";
				}else{
          isall=false;
        }
			  });
      if(isall){
        $("#check_all").attr("checked","checked")
      }
			if(Status!=0){	
				
				$(".js_adv_platform .tab").hide();
				$(".js_adv_platform .tab").eq(ClientType-1).show();
				$(".js_adv_platform .tab").addClass("cur");
				//表格
				$(".js_adv_platform .tab").removeClass("cur")
				$(".js_adv_platform .tab").eq(ClientType-1).addClass("cur");
				$("#stype2 .tabCon").hide();
				$("#stype2 #tabCon"+ClientType).show();
				//选项
				
				/*$(".js_adv_location").eq(ClientType-1).find("tr").hide();
				$(".js_adv_location").eq(ClientType-1).find("tr").eq(Position).show();*/
				$(".js_adv_location").eq(ClientType-1).find("tr").removeClass("tab").removeClass("cur");
				$(".js_adv_location").eq(ClientType-1).find("tr").eq(Position).addClass("tab").addClass("cur");

				$(".adv_Pic img").eq(1).attr("src","../assets/images/adv_tu"+pc_app+"0"+Position+".png")

				//付费方式
				var PaymentType=ret.Data.PaymentType;
				$(".js_adv_PaymentType .tab").removeClass("cur").removeClass("tab").addClass("tab_disable");
				$(".js_adv_PaymentType div").eq(PaymentType-1).removeClass("tab_disable").addClass("tab").addClass("cur");
				var t_top=Position*40+25;
				$("#tabCon"+ClientType+" .abs_icon").css("top",Number(t_top)+"px");
			}else{
				if(ClientType==0){
					ClientType=1
				}
				$(".js_adv_platform .tab").removeClass("cur")
				$(".js_adv_platform .tab").eq(ClientType-1).addClass("cur");
				//表格
				$("#stype2 .tabCon").hide();

				$("#stype2 #tabCon"+ClientType).show();
				//选项
				if(Position==0){Position=1}if(ClientType==0){ClientType=1}
				$(".js_adv_location").eq(ClientType-1).find("tr").removeClass("cur");
				$(".js_adv_location").eq(ClientType-1).find("tr").eq(Position).addClass("cur");
				$(".adv_Pic img").eq(1).attr("src","../assets/images/adv_tu"+pc_app+"0"+Position+".png")

				var t_top=Position*40+25;
				
				$("#tabCon"+ClientType+" .abs_icon").css("top",Number(t_top)+"px");
				
				//付费方式
				var PaymentType=ret.Data.PaymentType;
				$(".js_adv_PaymentType .tab").removeClass("cur");
				$(".js_adv_PaymentType div").eq(PaymentType-1).addClass("cur");

			}
			

			$("#txt_DailyLimit").val(ret.Data.DailyLimit);
			$("#txt_BeginDate").val(ret.Data.BeginDate.split("T")[0])
			$("#txt_EndDate").val(ret.Data.EndDate.split("T")[0]);
			var TimeInterval=ret.Data.TimeInterval
			$("#txt_beginTime").val(TimeInterval.split(",")[0])
			$("#txt_endTime").val(TimeInterval.split(",")[1])

			
			$("#txt_single_price").val(ret.Data.Price)
			/*
			**style3
			*/
			//投放创意
			var Form=ret.Data.Form;
			$("#hide_info").attr("Form",Form);
			/*if(Status!=0){
				$(".js_adv_imgType .tab").removeClass("cur").removeClass("tab").addClass("tab_disable");
				$(".js_adv_imgType div").eq(Form-1).removeClass("tab_disable").addClass("tab").addClass("cur");
			}else{
				$(".js_adv_imgType .tab").removeClass("cur");
				$(".js_adv_imgType div").eq(Form-1).addClass("cur");

			}*/
			//pic
			var DisplayPic=ret.Data.DisplayPic;
			if(DisplayPic!=""){
				$("#stype3 .js_look").show();
				$("#stype3 .del-upload").show();  
				$("#stype3 .js_upload_con").hide();
			}
			var DisplayType=ret.Data.DisplayType;
			if(DisplayType==0 || DisplayType==1){
				if(Form!=3 && Form!=0 && Form!=""){
					$(".uploads li").hide();
					$(".uploads li").eq(0).show();
					$(".uploads li").css("width","100%")
					$(".upload_area").css("height","300px")

					$("#stype3 .uploads li .js_look").html("<img class='adv_img' src='"+ret.Data.DisplayPic+"'/>");
				}else{
					$(".uploads li").css("width","150px")
					var list=ret.Data.DisplayPic.split("|");
					for (var i = 0; i < list.length; i++) {
					   $("#stype3 .uploads li .js_look").eq(i).html("<img class='adv_img' src='"+list[i]+"'/>")
						
					};
					
				}
			}else{
				$("#app_video").prev(".dsp_tit").html("展示视频").show();
				$(".js_adv_display div").removeClass("cur");
				$(".js_adv_display div").eq(DisplayType-1).addClass("cur");
				$("#app_video .js_look").show();
				$("#app_video .js_upload_con").hide();
				$("#app_video .js_look video").attr("src",ret.Data.DisplayPic);
				$("#stype3 .uploads").hide();
				$("#app_video .js_upload_con p").html('为保证正常播放，请上传MP4格式视频<br>视频小于100M,时长小于10分钟')
				$("#app_video").show();
			
			}
			if(Form==0){Form=3}
			$(".putIn_type_preview img").attr("src","../assets/images/putIn0"+(Form)+".png")
			$("#txt_adv_source").val(ret.Data.Source);
			var PaymentType=$(".js_adv_PaymentType .cur").index();
			if(PaymentType==0){
				$("#txt_single_price").attr("placeHolder","RMB：建议出价1元/次");
			}else{
				$("#txt_single_price").attr("placeHolder","RMB：建议出价10-1000元/千人次");
			}

		}
	})
}



/*
*创建
*/

//获取上传的videourl
 var uploadVideo=function(){
 	var url=host+"/upload?Token="+getCookie("token");
 	/*
 	*UploadType
 	*广告图片ad_pic、
 	*广告视频ad_video、
 	*营业执照business_license、
 	*资质证明certificate、
 	*身份照id_number
 	*/
 	var params={
 		"UploadType":"ad_video",
 		"UploadName":$("#input_file").files[0]
 	}
 	alert($("#input_file").files[0])
 }

var copyParams=function(old_params){
  for(var key in old_params){
  	allParams[key]=old_params[key];
  }
}
//创建目的
var toCreatStep1=function(){
	//判断是否为编辑
	var dialog_title="创建目的成功"
	var submit_type="POST"
	if(advId=="" || advId==undefined){
		var url=host+"/ad?Token="+getCookie("token");
	}else{
		var url=host+"/ad/edit/"+advId+"?Token="+getCookie("token");
		//submit_type="PUT"
		dialog_title="修改目的成功"
	}
	
	var Name=$("#txt_adv_name").val();
	//0无、1文章、2视频、3落地页
	var AdType=$("#js_stype1_type .cur").index()+1;
	/*if(AdType==4){AdType=0}*/
	var Title="";
	if(AdType==1){
		 Title=$("#txt_article_tit").val();
	}else if(AdType==2){
		 Title=$("#txt_video_tit").val();
	}else if(AdType==3){
		 Title=$("#txt_link_tit").val();
	}else{
		Title=$("#txt_wu_tit").val();
	}
	var Content=ue.getContent();
	var VideoUrl=$(".uploadVideo").attr("src");
	var LinkUrl=$("#txt_link").val();
	var params={
		"Name":Name,
		"AdType":AdType,
		"Title":Title,
		"Content":Content,
		"VideoUrl":VideoUrl,
		"LinkUrl":LinkUrl
	}
	var d_status=$("#hide_info").attr("status")==undefined?0:$("#hide_info").attr("status");
  if(d_status!=0){
		copyParams(params);
		initStep2();//隐藏或显示cpc
		$(".stypes").hide();
		$("#stype2").show();
		$(".creat_process li").eq(1).addClass("cur");
	}else{
		commonCla.ajaxCommonFun(url,submit_type,function(ret){
		if(ret.Code=="200"){
				swal({
	              "title":dialog_title,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",

	            },function(){
	            	//下一步
	            	initStep2();//隐藏或显示cpc
	            	//tosubmit
					//显示隐藏
					
					$(".stypes").hide();
					$("#stype2").show();
					$(".creat_process li").eq(1).addClass("cur");
					//保存广告id
					$("#hide_info").attr("advId",ret.Data);

					$("iframe", window.parent.document).scrollTop = '0';
	            });
				
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
	
}
//time
var isoDate=function(date){
	//return new Date(date).toISOString()
	return date+"T08:00:00.000Z"
}
//完善投放计划
var toCreatStep2=function(){
  var Token=getCookie("token");
  //提交方式
  var submit_type="POST"
  //0草稿、1审核中、2审核失败、3审核成功
  var status=$("#hide_info").attr("status");
  //判断是否为编辑
  var dialog_title="创建计划成功"
  if(advId=="" || advId==undefined){
  		advId=$("#hide_info").attr("advId");
		var url=host+"/ad/plan/"+advId+"?Token="+getCookie("token");	
   }else{
   		//草稿状态
   	    if(status!=0 && status!="" && status!=undefined){
			var url=host+"/ad/edit/plan/"+advId+"?Token="+getCookie("token");
			//submit_type="PUT"
			dialog_title="修改计划成功"
   	    }else{
   	    	var url=host+"/ad/plan/"+advId+"?Token="+getCookie("token");
   	    }
		
  }
  
  //1客户端、2PC端
  var ClientType=$(".js_adv_platform .cur").index()+1;
  //
  var Position=$(".js_adv_location").eq(ClientType-1).find("tr.cur").index();
  var DailyLimit=$("#txt_DailyLimit").val();
  var BeginDate=$("#txt_BeginDate").val();
  var EndDate=$("#txt_EndDate").val();
  var TimeInterval=$("#txt_beginTime").val()+","+$("#txt_endTime").val();
  var PaymentType=$(".js_adv_PaymentType .cur").index()+1;;
  var Price=$("#txt_single_price").val();
  var Directional="";
  var obj = document.getElementsByName("orient");
  for(k in obj){
        if(obj[k].checked)
            Directional+=$(obj[k]).attr("orientId")+","
   }
   Directional=Directional.substr(0,Directional.length-1);
  var params={
  	"ClientType":ClientType,
  	"Position":Position,
  	"DailyLimit":parseFloat(DailyLimit),
  	"BeginDate":isoDate(BeginDate),
  	"EndDate":isoDate(EndDate),
	"TimeInterval":TimeInterval,
  	"PaymentType":PaymentType,
  	"Price":parseFloat(Price),
  	"Directional":Directional

  }
  	var d_status=$("#hide_info").attr("status")==undefined?0:$("#hide_info").attr("status");
	if(d_status!=0){
		copyParams(params);
		initStep3();
		$(".stypes").hide();
		$("#stype3").show();
		$(".creat_process li").eq(2).addClass("cur");
	}else{
		commonCla.ajaxCommonFun(url,submit_type,function(ret){
		if(ret.Code=="200"){
			swal({
              "title":dialog_title,
              "confirmButtonText":"确定",
              "confirmButtonColor": "#ff1d3e",
              "animation":"none",

            },function(){
            	//下一步
            	//tosubmit
				//显示隐藏
				initStep3();
				$(".stypes").hide();
				$("#stype3").show();
				$(".creat_process li").eq(2).addClass("cur");
				//保存广告id
				$("#hide_info").attr("advId",ret.Data);
            });
			
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
  


}
var toCreatStep3_all=function(){
	var url=host+"/ad/audit/"+$("#hide_info").attr("advId")+"?Token="+getCookie("token");
	//提交方式
  	var submit_type="POST"
	commonCla.ajaxCommonFun(url,submit_type,function(ret){
		if(ret.Code=="200"){
				swal({
	              "title":"修改成功",
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",

	            },function(){
	            	window.location.href="spread.html"
	            });
				
			}else{
				swal({
	              "title":ret.Error,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",

	            });
			}
		},allParams)
}
//完善投放计划
var toCreatStep3=function(){
  //var advId=$("#hide_info").attr("advId");
  var Token=getCookie("token");

  //0草稿、1审核中、2审核失败、3审核成功
  var status=$("#hide_info").attr("status");
  //判断是否为编辑
  var dialog_title="创建创意成功"
  var submit_type="POST"
  if(advId=="" || advId==undefined){
  		advId=$("#hide_info").attr("advId");
		var url=host+"/ad/finish/"+advId+"?Token="+getCookie("token");
   }else{
		//判断是否为草稿状态
		if(status!=0 && status!="" && status!=undefined){
			var url=host+"/ad/edit/finish/"+advId+"?Token="+getCookie("token");
			dialog_title="修改创意成功";
			//submit_type="PUT"
		}else{
			var url=host+"/ad/finish/"+advId+"?Token="+getCookie("token");
		}
		
  }
  //1小图、2大图、3组图
  var Form=$(".js_adv_imgType .cur").index()+1;

  //展示类型
  var displayType=0;
  if($(".js_adv_display").css("display")!="none"){
   displayType=$(".js_adv_display .cur").index()+1;
  }
  
  //上传图片路径
  
  var DisplayPic="";
  if(displayType==1 || displayType==0 || displayType==undefined){
  	if(Form==3){
	  	var imglist=$(".uploads").find(".adv_img");
	  	for (var i = 0; i < imglist.length; i++) {
	  		DisplayPic+=$(imglist[i]).attr("src")+"|"
	  	};
	  	DisplayPic=DisplayPic.substring(0,DisplayPic.length-1)
	  }else {
	  	DisplayPic=$(".uploads li").eq(0).find(".adv_img").attr("src")
	  }

  }else{
  		DisplayPic=$("#app_video").find("video").attr("src");
  }
  var Source=$("#txt_adv_source").val();

  var params={
  	"Form":Form,
  	"DisplayPic":DisplayPic,
  	"Source":Source,
  	"DisplayType":displayType
  }
  var d_status=$("#hide_info").attr("status")==undefined?0:$("#hide_info").attr("status");
	if(d_status!=0){
		copyParams(params);
		toCreatStep3_all();
	}else{
		commonCla.ajaxCommonFun(url,submit_type,function(ret){
		if(ret.Code=="200"){
				swal({
	              "title":dialog_title,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",

	            },function(){
	            	window.location.href="spread.html?mt=1"
	            });
				
			}else{
				swal({
	              "title":ret.Error,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",

	            },function(){
	            	if(ret.Code=="421"){
	            		window.location.href="profile.html?mt=4"
	            	}
	            	
	            	
	            });
			}
		},params)
	}
}
var uploadImg=function(thi,formId){
	fileSubmit($('#'+formId)[0],'ad_pic',function(ret){
	    	$(thi).parents(".upload_area").find(".upload_area h2").html("点击上传");
	    	$(thi).parents(".upload_area").find(".del-upload").show();
	    	if(ret.Code=="200"){
		    	/* 预览 */
				
				$(thi).parents(".upload_area").find('.js_look').html("<img class='adv_img' src='"+ret.Data+"'/>")
				$(thi).parents(".upload_area").find('.js_look').show();
				$(thi).parents(".upload_area").find(".js_upload_con").hide();
				swal({
	              "title":"上传成功",
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",
	            });

	    	}else{
	    		swal({
	              "title":ret.Error,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",
	            });

	    	}
	    	var id=$(thi).attr("id")
	    	$('#' + id).replaceWith('<input type="file" id="'+id+'" name="UploadName" multiple="multiple" accept="image/*">')
	    	
	    });
}

var getDay=function(t_interval){
	var day3 = new Date(getCookie("CurrentTime"));
	day3.setTime(day3.getTime()+t_interval*60*60*1000*24);
	var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
	return s3;
}
var swal_dialog=function(title){
	swal({
          "title":title,
          "confirmButtonText":"确定",
          "confirmButtonColor": "#ff1d3e",
          "animation":"none",
        });
}
var validateStep1=function(){
	var txt_adv_name=$("#txt_adv_name").val();
	if(txt_adv_name==""){
		swal_dialog("请输入广告名称");
		return;
	}
	var AdType=$("#js_stype1_type .cur").index()+1;
	/*if(AdType==4){AdType=0};*/
	//原生文章
	if(AdType==1){
		var txt_article_tit=$("#txt_article_tit").val();
		var content=ue.getContent();
		if(txt_article_tit==""){
			swal_dialog("请输入文章名称");
			return;
		}
		if(content==""){
			swal_dialog("请输入文章内容");
			return;
		}

	}else if(AdType==2){
		//视频
		var txt_video_tit=$("#txt_video_tit").val();
		var videoUrl=$(".js_look video").attr("src");
		if(txt_video_tit==""){
			swal_dialog("请输入视频名称");
			return;
		}
		if(videoUrl==""){
			swal_dialog("请上传视频内容");
			return;
		}

	}else if(AdType==3){
		//落地页
		var txt_link_tit=$("#txt_link_tit").val();
		var txt_link=$("#txt_link").val();
		if(txt_link_tit==""){
			swal_dialog("请输入落地页标题名称");
			return;
		}
		if(txt_link==""){
			swal_dialog("请输入链接地址");
			return;
		}
	}else{
		//落地页
		var txt_wu_tit=$("#txt_wu_tit").val();
		if(txt_wu_tit==""){
			swal_dialog("请输入广告名称");
			return;
		}
	}

	return true;
}
var validateStep2=function(){
	var txt_DailyLimit=$("#txt_DailyLimit").val();
	var txt_BeginDate=$("#txt_BeginDate").val();
	var txt_EndDate=$("#txt_EndDate").val();
	var txt_single_price=$("#txt_single_price").val();
	var txt_endTime=$("#txt_endTime").val();
	var txt_beginTime=$("#txt_beginTime").val();
	var b_hours=Number(txt_beginTime.split(":")[0]);
	var b_Minus=Number(txt_beginTime.split(":")[1]);
	var e_hours=Number(txt_endTime.split(":")[0]);
	var e_Minus=Number(txt_endTime.split(":")[1])
	var solitMint=(Number(e_hours*60+e_Minus)-Number(b_hours*60+b_Minus))/60

	var reg = new RegExp(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/　);
	if(txt_BeginDate=="" || txt_EndDate==""){
		swal_dialog("请选择预计投放日期");
		return;
	}
	if(txt_beginTime=="" || txt_endTime==""){
		swal_dialog("请选择预计投放时间段");
		return;
	}
	if(solitMint<1){
		swal_dialog("投放时间段不能小于一小时");
		return;
	}
	if(txt_DailyLimit=="" || txt_DailyLimit==0){
		swal_dialog("请输入日限额");
		return;
	}else if(!reg.test(txt_DailyLimit)){
		swal_dialog("请输入正确日限额");
		return;
	}

	var PaymentType=$(".js_adv_PaymentType .cur").index();
	if(txt_single_price=="" || txt_single_price==0){
		swal_dialog("请输入单价");
		return;
	}else if(!reg.test(txt_single_price)){
		swal_dialog("请输入正确单价");
		return;
	}else if(PaymentType==0 && txt_single_price<1){
		swal_dialog("单价建议1-1000元");
		return;
	}else if(PaymentType==1 && txt_single_price<10){
		swal_dialog("单价建议10-1000元");
		return;
	}
	if(Number(txt_DailyLimit)<Number(txt_single_price)){
		swal_dialog("单价应少于日限额");
		return;

	}

	return true;


}
var vaildateStep3=function(){
  var putInType=$(".putIn_type .cur").index();
  var uploads=$(".uploads").find(".js_look");
  var displayType=$(".js_adv_display .cur").index();
  if(displayType=="" || displayType==undefined || displayType==0 ){
  	if(putInType==2){
	  	for (var i = 0; i < uploads.length; i++) {
		var adv_img=$(uploads[i]).find("img");
	  		if(adv_img.attr("src")==undefined || adv_img.attr("src")=="" ){
			        swal_dialog("请上传展示图片");
	  			return false;
	  		}
	  	};
	  	return true;
	  }else{
	  	var imgUrl=$(".uploads li").eq(0).find(".js_look").find("img").attr("src");
	  	if(imgUrl==undefined || imgUrl==""){
			swal_dialog("请上传展示图片");
	  		return false;
	  	}
	  	return true;
	  }
	}else{
		var adv_video=$("#app_video").find(".js_look video").attr("src");
		if(adv_video==undefined || adv_video==""){
			swal_dialog("请上传展示视频");
	  		return false;
	  	}
	  	return true;
	}
  
}
$(function(){
	
	//编辑获取详情信息
	if(advId!="" && advId!=undefined){
		getDetailInfo(advId)
	}

	$(".btn_next").click(function(){
		if(validateStep1()){
			toCreatStep1();			
		}
		
	})
	$(".btn_creat_adv").click(function(){
		if(validateStep2()){
			toCreatStep2();	
		}
				
	})
	$(".btn_creat_Finish").click(function(){
		if(vaildateStep3()){
			toCreatStep3();	
		}
				
	})
	
	$(".js_adv_PaymentType .tab").click(function(){
			var PaymentType=$(this).index();
			if(PaymentType==0){
				$("#txt_single_price").attr("placeHolder","RMB：建议出价1元/次");
			}else{
				$("#txt_single_price").attr("placeHolder","RMB：建议出价10-1000元/千人次");
			}
	})
	//广告版位选择
	$(".js_adv_location").on("click",".tab",function(){
		/*if($(this).index()==0){
			return;
		}*/
		if($(this).index()!=6){
			$(".orient_con").hide();
		}else{
			$(".orient_con").show();
		}
		var img_target=$(this).parents(".js_adv_location").parent().next().find(".abs_icon");
		$(this).parents(".js_adv_location").find("tr").removeClass("cur");
		$(this).addClass("cur");
	    //

		var t_top=Number($(this).prevAll().length)*40+25
		$(img_target).css("top",Number(t_top)+"px");
		var platformType=$(".js_adv_platform .cur").index();
		if(platformType==0){
			$(img_target).next("img").attr("src","../assets/images/adv_tu0"+($(this).index())+".png")
		}else{
			$(img_target).next("img").attr("src","../assets/images/adv_tu_pc0"+($(this).index())+".png")
		}
		
	})
	
	/* 删除预览 */
	$("body").on("click", ".del-upload", function () {
		$(this).parent().find(".js_look").hide();
		$(this).parent().find(".js_look").find("img").attr("src","");
		$(this).parent().find(".js_upload_con").show();
		$(this).parents(".upload_area").find("h2").html("点击上传");
		$(this).hide()
	})
	//上传视频
	$("#videoFile").change(function () {
	    $(this).parents(".upload_area").find("h2").html("上传中...");
	    var thi=$(this);
	    fileSubmit($('#videoForm')[0], 'ad_video',function(ret){
	    	thi.parents(".upload_area").find("h2").html("点击上传");
	    	thi.parents(".upload_area").find(".del-upload").show();
	
	    	if(ret.Code=="200"){
		    	/* 预览 */
				
			thi.parents(".upload_area").find(".uploadVideo").attr("src",ret.Data)
			thi.parents(".upload_area").find('.js_look').show();
			thi.parents(".upload_area").find(".js_upload_con").hide();
			thi.val("");
			swal({
				"title":"上传成功",
				"confirmButtonText":"确定",
				"confirmButtonColor": "#ff1d3e",
				"animation":"none",
			});

	    	}else{
	    		swal({
	              "title":ret.Error,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",
	            });

	    	}
	    	
	    });
	})
	//上传视频2
	$("#videoFile2").change(function () {
	    $(this).parents(".upload_area").find("h2").html("上传中...");
	    var thi=$(this)
	    fileSubmit($('#videoForm2')[0], 'ad_video',function(ret){
	    	thi.parents(".upload_area").find("h2").html("点击上传");
	    	thi.parents(".upload_area").find(".del-upload").show();

	    	if(ret.Code=="200"){
		/* 预览 */
				
		thi.parents(".upload_area").find(".uploadVideo").attr("src",ret.Data)
		/*alert(thi.parents(".upload_area").find(".uploadVideo").attr("src"))*/
		thi.parents(".upload_area").find('.js_look').show();
		thi.parents(".upload_area").find(".js_upload_con").hide();
		thi.val("");
				
		swal({
			"title":"上传成功",
			"confirmButtonText":"确定",
			"confirmButtonColor": "#ff1d3e",
			"animation":"none",
		});

	    	}else{
	    		swal({
	              "title":ret.Error,
	              "confirmButtonText":"确定",
	              "confirmButtonColor": "#ff1d3e",
	              "animation":"none",
	            });

	    	}
	    	
	    });
	})
	//上传图片
	$(".uploads").on("change","#imgFile3",function () {
	    $(this).parents(".upload_area").find("h2").html("上传中...");
	    uploadImg($(this),"imgsForm3")
	})
	$(".uploads").on("change","#imgFile2",function () {
	    $(this).parents(".upload_area").find("h2").html("上传中...");
	    uploadImg($(this),"imgsForm2")
	})
	$(".uploads").on("change","#imgFile1",function ()  {
	    $(this).parents(".upload_area").find("h2").html("上传中...");
	    uploadImg($(this),"imgsForm1")
	})


	//切换
	$(".js_adv_display").on("click","div.tab",function(){
		var inx=$(this).index();
		$(this).parent().next(".dsp_tit").html("展示图片");
		$("ul.uploads").show();
		$("#app_video").hide();
		if(inx==1){
			$(this).parent().next(".dsp_tit").html("展示视频");
			$("#app_video").find(".uploads .js_upload_con p").html('为保证正常播放，请上传MP4格式视频<br>视频小于100M,时长小于10分钟')
			$("ul.uploads").hide();
			$("#app_video").show();
		}
	})
	$(".js_adv_imgType").on("click","div.tab",function(){
		$(".js_upload_con").show();
		$(".js_upload_con h2").html("点击上传");
		$(".del-upload").hide();
		$(".js_look").hide();
		var inx=$(this).index();
		var img_tip='图片比例：4:3<br>建议尺寸：750x563<br>图片大小：小于1M';
		if(inx!=2){
      if(inx==1){
        img_tip='图片比例：16:9<br>建议尺寸：750x422<br>图片大小：小于1M';
      }
			$(".uploads li").hide();
			$(".uploads li").eq(0).show();
			$(".uploads li").eq(0).css("width","100%");
			$(".upload_area").css("height","300px")
			$(".uploads .js_upload_con p").html(img_tip);
		}else{
			img_tip='图片比例：1:1<br>建议尺寸：250x250<br>图片大小：小于1M';
			$(".uploads li").show();
			$(".uploads li").eq(0).css("width","150px");
			$(".upload_area").css("height","150px");
			$(".uploads .js_upload_con p").html(img_tip);
		}
		$(".putIn_type_preview img").attr("src","../assets/images/putIn0"+(inx+1)+".png")
	})
	//日历

	 $('.form_date').datetimepicker({
	    language:  'zh-CN',
	    weekStart: 1,
	    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		startDate:new Date(getDay(1)),
	  
	});
	 $('.form_date').eq(0).datetimepicker().on('changeDate', function(ev){
		    $('.form_date').eq(1).datetimepicker('setStartDate', ev.date);
		    $("#txt_EndDate").val("");
	});
	$('.form_date').eq(1).datetimepicker().on('changeDate', function(ev){
		    $('.form_date').eq(0).datetimepicker('setEndDate', ev.date);
		    $("#txt_StartDate").val("");
	});
	 $('.form_time').datetimepicker({
	    language:  'zh-CN',
	    weekStart: 1,
	    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0,
		

	});
	//预览
	$(".btn_preview").click(function(){
		var stype=$("#js_stype1_type .cur").index();
		var messdivHtml="";
		if(stype==0){
			//article
			var arti_contents=ue.getContent();
			var arti_title=$("#txt_article_tit").val();
			if(arti_title==""){
				swal_dialog("请输入文章标题");
				return;
			}
			 messdivHtml='<img src="../assets/images/nb_01.jpg" >'+
			 			'<div class="tc fb pre_title">'+arti_title+'</div><div class="cur_time">2017-06-12 10:57:42</div>'+
				    	'<div class="contents">'+ue.getContent()+'</div>'+
				    	'<img src="../assets/images/nb_03.png" >'
			

		}else if(stype==1){
			//视频
			if($(".uploadVideo").attr("src")==""){
				swal_dialog("请上传视频");
				return;
			}
			 messdivHtml='<img src="../assets/images/pre_video_bg.png" >'+
			 			'<video class="uploadVideo" preload="auto" controls=""'+
			 			'src="http://starshow-dsp.test.upcdn.net/ad/video/mp4_1513586406.mp4" width="415" height=""></video>'

		}else if(stype==2){
			//视频
			if($("#txt_link").val()==""){
				swal_dialog("请输入链接地址");
				return;
			}
			 messdivHtml='<img src="../assets/images/pre_top3.png" >'+
			 			'<iframe src="'+$("#txt_link").val()+'" scrolling="auto" width="100%" height="540px"></iframe>'

		}else{
    	swal_dialog("暂无预览");
			return;
		}
		$("#messdiv .messdivCons").html('<div class="preCons">'+messdivHtml+'</div>')
		tcc.BOX_show("messdiv");
	})
	//关闭预览
	$(".js-close").click(function(){
		tcc.BOX_remove("messdiv");
	})
	//全选
	$("#check_all").change(function(){
    var userids=this.checked;
    //获取name=box的复选框 遍历输出复选框
    $("input[name=orient]").each(function(){
        this.checked=userids;
    });
	})
   //给name=box的复选框绑定单击事件
  $("input[name=orient]").click(function(){
      //获取选中复选框长度
      var length=$("input[name=orient]:checked").length;
      //未选中的长度
      var len=$("input[name=orient]").length;
      if(length==len){
          $("#check_all").get(0).checked=true;
      }else{
          $("#check_all").get(0).checked=false;
      }
  });
})