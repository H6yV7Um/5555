/*var host = "http://123.57.0.118:5000/";*/
var host="http://api.startvshow.com/"
var editor = new ___E('textarea1');
// 获取编辑器区域
var $txt = editor.$txt;
var initEditor = function() {
	// 全局配置
	//___E.config.menus = ['bold', 'color', 'quote'];
	// 自定义配置
	editor.config.uploadImgUrl = '/upload';
	editor.config.menus = ['head', 'bold', 'quote', 'list', 'img', 'color', "check"];
	editor.config.happy = [
		'img/1.gif',
		'img/2.gif',
		'img/3.gif'
	];
	editor.config.menuQuoteStyle = {
		'display': 'block',
		'border-left': '4px solid #f00',
		'padding': '4px 0 4px 10px',
		'background-color': '#f1f1f1',
		'margin': '4px 0'
	};
	// 初始化
	editor.init();
	console.log(editor.$txt);

}

//从url获取参数
var analyzParams = function(param_name) {
		var url = window.location.search.split("?")[1];
		if (url == "" || url==undefined) return url;
		url = url.split(param_name + "=")[1];
		if (url == "" || url == undefined) {
			url = "";
			return url;
		}
		if (url.indexOf("&") > 0) {
			url = url.split("&")[0];
		}
		return url;
	}
	//ajax 通用方法
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
	//获取到封面之后的操作，供客户端调用
function getedPoster(url) {
	var img = "<img src='" + url + "' />";
	//$(".btn_upload_poster").hide();
	$(".posterArea").html(img);
}
//校验
function vaildate() {
	var title = $(".txt_title");
	if ($(".posterArea img").attr("src") == undefined || $(".posterArea img").attr("src") == "assets/images/bg_cover.png"|| $(".posterArea img").attr("src") == "") {
		//posterUrl =  "assets/images/cover.png" ;
		BOX_show("tipCon");
		$("#tipCon .messdivCons").html("还没添加封面图片");
		//调用客户端显示头部方法
		window.editorRequest.setTitlePartVisible();
		return false;
	}
	if ($(title).val().trim() == "") {
		BOX_show("tipCon");
		$("#tipCon .messdivCons").html("还没输入标题");
		//调用客户端显示头部方法
		window.editorRequest.setTitlePartVisible();
		return false;
	}
	if ($txt.text().trim() == "" || $txt.text().trim() == "输入正文") {
		BOX_show("tipCon");
		$("#tipCon .messdivCons").html("请输入正文");
		//调用客户端显示头部方法
		window.editorRequest.setTitlePartVisible();
		return false;
	}
	return true;
}
//预览
function preView() {
	if (vaildate()) {
		var title = $(".txt_title").val();
		var posterUrl = $(".posterArea img").attr("src");
		var preViewHtml = "<div class='poster' style='width:100%;margin:0'><img src='" + posterUrl + "' width='100%'></div>" +
			"<div class='cons' style='width: 95%; margin: 0 auto; font-size: 0.9rem;overflow:hidden; word-break: break-all'>" +
			"<h1 style='text-align: center; word-break: break-all;'>" + title + "</h1><br/>" +
			$txt.html() + "</div>";
		$("#js-pervView").html(preViewHtml);
		$("#js-editor").hide();
		$(".prevViewCon").show();
		//关闭预览
		$(".icon_back").click(function() {
			$(".prevViewCon").hide();
			$("#js-editor").show();
			$("#js-pervView").html("");
			//调用客户端显示头部方法
			window.editorRequest.setTitlePartVisible();
			return false;
		})
	}

}
//新增提交
function contentSubmit(type, style, status) {
	//alert("type:"+type+"style:"+style+"status:"+status)
	if (vaildate()) {
		// 查看对象
		console.log($txt);
		// 获取 html
		var title = $(".txt_title").val();
		var posterUrl = $(".posterArea img").attr("src");
		var html = $txt.html();
		//提交请求
		var jwt_token = analyzParams("jwt_token");
		var url = host + "news?jwt_token="+jwt_token;
		var params = {
				"title": title,
				"description": $txt.text().substr(0, 20),
				"content": html,
				"cover": posterUrl,
				"type": type,
				"style": style,
				"status": status
			}
			//调用通用请求方法
		ajaxCommonFun(url, "post", function(data) {
			if (data.code == "200") {
				BOX_show("tipCon");
				if(status=="1"){
				  $("#tipCon .messdivCons").html("发布成功");	
				}else{
				  $("#tipCon .messdivCons").html("保存成功");
				}
				//调用客户端
				window.editorRequest.uploadArticleStatus("1");
				return false;
			} else {
				BOX_show("tipCon");
				$("#tipCon .messdivCons").html(data.error);
				//调用客户端
				window.editorRequest.uploadArticleStatus("2");
				return false;
			}
		}, params)
	}


}
//判断是修改
function isUpdate() {
	var type = analyzParams("type");
	var id = analyzParams("id");
	if (type == "update") {
		initUpdate(id);
	}
}

function initUpdate(id) {
	//调用通用请求方法
	var url = host + "news/" + id;
	ajaxCommonFun(url, "get", function(data) {
		if (data.data != "" && data.data != null) {
			var page_data = data.data;
			$(".posterArea").html("<img src='" + page_data.cover + "' />");
			$(".txt_title").val(page_data.title);
			$txt.html("<div>" + page_data.content + "</div>");
		}
	})

}
//修改提交
function editSubmit(type, style, status) {
  if (vaildate()) {
	var title = $(".txt_title").val();
	var posterUrl = $(".posterArea img").attr("src");
	var html = $txt.html();
	var params = {
		"title": title,
		"description": $txt.text().substr(0, 20),
		"content": html,
		"cover": posterUrl,
		"type": type,
		"style": style,
		"status": status
	}
	var id = analyzParams("id");
	var jwt_token = analyzParams("jwt_token");
	var url = host + "news/" + id + "/edit?jwt_token=" + jwt_token;
	//调用通用请求方法
	ajaxCommonFun(url, "post", function(data) {
		if (data.code == "200") {
			BOX_show("tipCon");
			if(status=="1"){
			  $("#tipCon .messdivCons").html("发布成功");	
			}else{
			  $("#tipCon .messdivCons").html("保存成功");
			}
			
			//调用客户端
			window.editorRequest.uploadArticleStatus("1");
			return false;
		} else {
			BOX_show("tipCon");
			$("#tipCon .messdivCons").html(data.error);
			//调用客户端
			window.editorRequest.uploadArticleStatus("2");
			return false;
		}
	}, params)
 }
}
//清空
function clearEditor() {
	$(".posterArea").html("<img src='assets/images/bg_cover.png' >");
	$(".txt_title").val("");
	$txt.html("");

}
$(function() {
	//初始化编辑器
	initEditor();
	//上传封面
	$(".posterArea").click(function() {
			/*调用客户端*/
			window.editorRequest.getCoverPic(200);
			return false;

	})
	//判断是否为修改，是则填充数据
	isUpdate();
	$(".container").keydown(function(){
       if($txt.text().trim()=="输入正文"){
       	 $txt.html("");
       }
	})
	

	//提交预览虚拟
	$("#js-publish").click(function() {
		preView();
		//clearEditor()
		//editSubmit(1,1,1);
		//contentSubmit(1, 1, 1)
	})
});