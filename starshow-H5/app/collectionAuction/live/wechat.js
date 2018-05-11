var selToID = ""; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var avChatRoomId = "";
var weChatFun = function(uid, sig, avChatRoomId) {
		selToID = avChatRoomId; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
		avChatRoomId = avChatRoomId;
		loginInfo.identifier = uid;
		loginInfo.userSig = sig;
		if (accountMode == 1) { //托管模式
			//判断是否已经拿到临时身份凭证
			if (webim.Tool.getQueryString('tmpsig')) {
				if (loginInfo.identifier == null) {
					webim.Log.info('start fetchUserSig');
					//获取正式身份凭证，成功后会回调tlsGetUserSig(res)函数
					TLSHelper.fetchUserSig();
				}
			} else { //未登录,无登录态模式
				//sdk登录
				sdkLogin(avChatRoomId);
			}
		} else { //独立模式
			sdkLogin(avChatRoomId);
		}

	var msgflow = document.getElementsByClassName("msg_area")[0];
        var bindScrollHistoryEvent = {
            init: function() {
	    	//ceshi
			getLastGroupHistoryMsgs(function(msgs) {
				//alert(msgs.length)
				getHistoryMsgCallback(msgs);
				

			})
                msgflow.onscroll = function() {
                    if (msgflow.scrollTop == 0) {
                        msgflow.scrollTop = 10;
                        if (selType == webim.SESSION_TYPE.C2C) {
                            getPrePageC2CHistoryMsgs();
                        } else {
							if(isEnd){
							 getPrePageGroupHistoryMsgs();
							}
                           
                        }

                    }
                }
            },
            reset: function() {
                msgflow.onscroll = null;
            }
        };
        setTimeout(function(){bindScrollHistoryEvent.init();},2000)

}
//帐号模式，0-表示独立模式，1-表示托管模式
var accountMode = 0;
//官方 demo appid,需要开发者自己修改（托管模式）
var sdkAppID = 1400035854;
var accountType = 14243;
//var avChatRoomId = '@TGS#aUSGA23EJ';  
//默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
if (webim.Tool.getQueryString("groupid")) {
	avChatRoomId = webim.Tool.getQueryString("groupid"); //用户自定义房间群id
}
var selType = webim.SESSION_TYPE.GROUP;
var selToID = "";
var avChatRoomId = "";
var selSess = null; //当前聊天会话
//默认群组头像(选填)
var selSessHeadUrl = 'img/2017.jpg';


//是否访问正式环境
var isAccessFormalEnv = true;
if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
	isAccessFormalEnv = false; //访问测试环境
}
//是否在浏览器控制台打印sdk日志
var isLogOn = true;
//其他对象，选填
var options = {
	'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
	'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
};
var curPlayAudio = null; //当前正在播放的audio对象
var openEmotionFlag = false; //是否打开过表情
//监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
//注意每个数字代表的含义，比如，
//1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
var onGroupSystemNotifys = {
	//"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
	//"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
	//"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
	//"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
	/* "5": onDestoryGroupNotify, //群被解散(全员接收)*/
	//"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
	//"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
	//"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
	//"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
	//"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
	/*"11": onRevokeGroupNotify, //群已被回收(全员接收)
	"255": onCustomGroupNotify//用户自定义通知(默认全员接收)*/
};

//当前用户身份
var loginInfo = {
	'sdkAppID': sdkAppID, //用户所属应用id,必填
	'appIDAt3rd': sdkAppID, //用户所属应用id，必填
	'accountType': accountType, //用户所属应用帐号类型，必填
	'identifier': "", //当前用户ID,必须是否字符串类型，选填
	'identifierNick': "null", //当前用户昵称，选填
	'userSig': "", //当前用户身份凭证，必须是字符串类型，选填
	'headurl': 'img/2016.gif' //当前用户默认头像，选填
};
//监听事件
var listeners = {
	"onConnNotify": onConnNotify, //选填
	"jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
	"onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
	"onMsgNotify": onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
	"onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
	/*"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填*/
};

if (/debug/gi.test(location.hash)) {
	document.write('<script src="http://sdklog.isd.com/js/vconsole.min.js"></scr' + 'ipt>');
}
//监听连接状态回调变化事件
var onConnNotify = function(resp) {
	switch (resp.ErrorCode) {
		case webim.CONNECTION_STATUS.ON:
			//webim.Log.warn('连接状态正常...');
			break;
		case webim.CONNECTION_STATUS.OFF:
			webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
			break;
		default:
			webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
			break;
	}
};
/* function colseLogin(){
     $('#login_dialog').hide();
 }*/

//IE9(含)以下浏览器用到的jsonp回调函数
function jsonpCallback(rspData) {
	//设置接口返回的数据
	webim.setJsonpLastRspData(rspData);
}

//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(msgList) {
	for (var i = msgList.length - 1; i >= 0; i--) { //遍历消息，按照时间从后往前
		var msg = msgList[i];
		//console.warn(msg);
		webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
		//显示收到的消息
		showMsg(msg);
	}
}

//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
	var newMsg;
	for (var j in newMsgList) { //遍历新消息
		newMsg = newMsgList[j];
		handlderMsg(newMsg); //处理新消息
	}
}

//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）

function handlderMsg(msg) {
	var fromAccount, fromAccountNick, sessType, subType, contentHtml;

	fromAccount = msg.getFromAccount();
	if (!fromAccount) {
		fromAccount = '';
	}
	fromAccountNick = msg.getFromAccountNick();
	if (!fromAccountNick) {
		fromAccountNick = fromAccount;
	}

	//解析消息
	//获取会话类型
	//webim.SESSION_TYPE.GROUP-群聊，
	//webim.SESSION_TYPE.C2C-私聊，
	sessType = msg.getSession().type();
	//获取消息子类型
	//会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
	//会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
	subType = msg.getSubType();

	switch (sessType) {
		case webim.SESSION_TYPE.C2C: //私聊消息
			switch (subType) {
				case webim.C2C_MSG_SUB_TYPE.COMMON: //c2c普通消息
					//业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
					//或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
					contentHtml = convertMsgtoHtml(msg);
					webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
					//c2c消息一定要调用已读上报接口
					var opts = {
						'To_Account': fromAccount, //好友帐号
						'LastedMsgTime': msg.getTime() //消息时间戳
					};
					webim.c2CMsgReaded(opts);
					alert('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
					break;
			}
			break;
		case webim.SESSION_TYPE.GROUP: //普通群消息，对于直播聊天室场景，不需要作处理
			//显示收到的消息
			showMsg(msg);
			break;
	}
}

//sdk登录
function sdkLogin(avChatRoomId) {
	//web sdk 登录
	webim.login(loginInfo, listeners, options,
		function(identifierNick) {
			//identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
			webim.Log.info('webim登录成功');
			//applyJoinBigGroup(avChatRoomId); //加入大群
			applyJoinGroup(avChatRoomId);
		
		},
		function(err) {
			//alert(err.ErrorInfo);
		}
	); //
}

//申请加群
function applyJoinGroup(avChatRoomId) {

	var options = {
		'GroupId': avChatRoomId,
		'ApplyMsg': '',
		'UserDefinedField': loginInfo.identifier
	};
	webim.applyJoinGroup(
		options,
		function(resp) {

			webim.Log.info('进群成功');
			selToID = avChatRoomId;
		},
		function(err) {
			//alert(err.ErrorInfo);
		}
	);
};


//获取历史消息(c2c或者group)成功回调函数

/*function getHistoryMsgCallback(msgList, prepage) {
	var msg;
	prepage = prepage || false;

	//如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
	if (prepage) {
		msgList.reverse();
	}

	for (var j in msgList) { //遍历新消息
		msg = msgList[j];
		if (msg.getSession().id() == selToID) { //为当前聊天对象的消息
			selSess = msg.getSession();
			//在聊天窗体中新增一条消息
			addMsg(msg, prepage);
		}
	}
	//消息已读上报，并将当前会话的消息设置成自动已读
	webim.setAutoRead(selSess, true, true);
}*/

//self 获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
/*var getLastGroupHistoryMsgs = function(cbOk) {
	var reqMsgCount = 15;
	var recentSessMap = {}; //保存最近会话列表
	var getPrePageC2CHistroyMsgInfoMap = {}; //保留下一次拉取好友历史消息的信息
	var getPrePageGroupHistroyMsgInfoMap = {}; //保留下一次拉取群历史消息的信
	if (selType == webim.SESSION_TYPE.C2C) {
		alert('当前的聊天类型为好友聊天，不能进行拉取群历史消息操作');
		return;
	}
	getGroupInfo(selToID, function(resp) {
		//拉取最新的群历史消息
		var options = {
			'GroupId': selToID,
			'ReqMsgSeq': resp.GroupInfo[0].NextMsgSeq - 1,
			'ReqMsgNumber': reqMsgCount
		};
		if (options.ReqMsgSeq == null || options.ReqMsgSeq == undefined || options.ReqMsgSeq <= 0) {
			webim.Log.warn("该群还没有历史消息:options=" + JSON.stringify(options));
			return;
		}
		selSess = null;
		webim.MsgStore.delSessByTypeId(selType, selToID);
		recentSessMap[webim.SESSION_TYPE.GROUP + "_" + selToID] = {};

		recentSessMap[webim.SESSION_TYPE.GROUP + "_" + selToID].MsgGroupReadedSeq = resp.GroupInfo && resp.GroupInfo[0] && resp.GroupInfo[0].MsgSeq;
		webim.syncGroupMsgs(
			options,
			function(msgList) {
				if (msgList.length == 0) {
					webim.Log.warn("该群没有历史消息了:options=" + JSON.stringify(options));
					return;
				}
				var msgSeq = msgList[0].seq - 1;
				getPrePageGroupHistroyMsgInfoMap[selToID] = {
					"ReqMsgSeq": msgSeq
				};
				//清空聊天界面
				document.getElementsByClassName("msgList")[0].innerHTML = "";
				if (cbOk)
					cbOk(msgList);
			},
			function(err) {
				alert(err.ErrorInfo);
			}
		);
	});
};*/
//进入大群avchatroom
function applyJoinBigGroup(groupId) {
	var options = {
		'GroupId': groupId //群id
	};
	webim.applyJoinBigGroup(
		options,
		function(resp) {
			//JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
			if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
				webim.Log.info('进群成功');
				selToID = groupId;
			} else {
				alert('进群失败');
			}
		},
		function(err) {
			//alert(err.ErrorInfo);
		}
	);
}

//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
	var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
	var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

	fromAccount = msg.getFromAccount();
	if (!fromAccount) {
		fromAccount = '';
	}
	fromAccountNick = msg.getFromAccountNick();
	if (!fromAccountNick) {
		fromAccountNick = '未知用户';
	}
	ul = document.getElementById("video_sms_list");
	var maxDisplayMsgCount = 4;
	//var opacityStep=(1.0/4).toFixed(2);
	var opacityStep = 0.2;
	var opacity;
	var childrenLiList = $("#video_sms_list").children();
	if (childrenLiList.length >= 3) {
		//$("#video_sms_list").children(":first").remove();
		$(".msg_area").animate({
			scrollTop: Number($(".msg_area").scrollTop() + 50) + "px" //和上面的height一致 
		}, 200);
		for (var i = 0; i < maxDisplayMsgCount; i++) {
			opacity = opacityStep * (i + 1) + 0.2;
			$('#video_sms_list').children().eq(i).css("opacity", opacity);
		}
	}

	li = document.createElement("li");
	paneDiv = document.createElement("div");
	paneDiv.setAttribute('class', 'video-sms-pane');
	textDiv = document.createElement("div");
	textDiv.setAttribute('class', 'video-sms-text');
	nickNameSpan = document.createElement("span");

	var colorList = ['red', 'green', 'blue', 'org'];
	var index = Math.round(fromAccount.length % colorList.length);
	var color = colorList[0];
	nickNameSpan.setAttribute('class', 'user-name-' + color);
	nickNameSpan.innerHTML = webim.Tool.formatText2Html("" + fromAccountNick + "：");
	contentSpan = document.createElement("span");

	//解析消息
	//获取会话类型，目前只支持群聊
	//webim.SESSION_TYPE.GROUP-群聊，
	//webim.SESSION_TYPE.C2C-私聊，
	sessType = msg.getSession().type();
	//获取消息子类型
	//会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
	//会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
	subType = msg.getSubType();

	isSelfSend = msg.getIsSend(); //消息是否为自己发的
	var msgHtml = convertMsgtoHtml(msg, subType);
	if (msgHtml != "") {
		contentSpan.innerHTML = msgHtml;
		//textDiv.appendChild(nickNameSpan);
		textDiv.appendChild(contentSpan);

		paneDiv.appendChild(textDiv);
		li.appendChild(paneDiv);
		ul.appendChild(li);
	}


}

//把消息转换成Html

function convertMsgtoHtml(msg, num_type) {
	var html = "",
		elems, elem, type, content;
	elems = msg.getElems(); //获取消息包含的元素数组
	for (var i in elems) {
		elem = elems[i];
		type = elem.getType(); //获取元素类型
		content = elem.getContent(); //获取元素对象
		switch (type) {
			case webim.MSG_ELEMENT_TYPE.TEXT:
				html += convertTextMsgToHtml(content, num_type);
				break;
			default:
				webim.Log.error('未知消息元素类型: elemType=' + type);
				break;
		}
	}
	return webim.Tool.formatHtml2Text(html);
}
function convertMsgType(msg){
var html = "",
		elems, elem, type, content;
	elems = msg.getElems(); //获取消息包含的元素数组
	for (var i in elems) {
		elem = elems[i];
		type = elem.getType(); //获取元素类型
		content = elem.getContent(); //获取元素对象
		switch (type) {
			case webim.MSG_ELEMENT_TYPE.TEXT:
				return content;
			default:
				return "";
		}
	}
}
function convertMsgtoHtml2(msg, num_type) {
	var html = "",
		elems, elem, type, content;
	elems = msg.getElems(); //获取消息包含的元素数组
	for (var i in elems) {
		elem = elems[i];
		type = elem.getType(); //获取元素类型
		content = elem.getContent(); //获取元素对象
		switch (type) {
			case webim.MSG_ELEMENT_TYPE.TEXT:
				html += convertTextMsgToHtml2(content, num_type);
				break;
			default:
				webim.Log.error('未知消息元素类型: elemType=' + type);
				break;
		}
	}
	return webim.Tool.formatHtml2Text(html);
}
//解析文本消息元素
var timer5=5;
var timer_interVal="";
var counter_5s=function(){
	if(timer5>0){
		$("#counter5s").html(Number($("#counter5s").html())-1);
	}else{
		$("#counter5s").hide();
		clearInterval(timer_interVal)
	}
	timer5--
}
function convertTextMsgToHtml(content, num_type) {
	var text = content.text == undefined ? "" : content.text;
	try {
		text = JSON.parse(text.replace(/&quot;/g, '"'))
	} catch (e) {
		text = text;
	}
	console.log(JSON.stringify(text))
	var html = "";	
	if (text.type != undefined) {
		//console.log(text.type + "---------------------------------------------")
		if (text.type == 0) {
			if ($(".lead_man").css("display") == "none") {
				$(".lead_man").show();
			}
			$(".lead_man .man_header img").attr("src", text.user_icon);
			$(".lead_man .man_name").html(text.user_name);
			$(".lead_man .man_price").html($(".js_initPrice").html().substr(0,1)+text.msg);
			$(".sale_num").html(Number($(".sale_num").html()) + 1);

			html += "<div><span class='col_red'>" + text.user_name + 
			"：</span><span class='col_red'>"+
			$(".js_initPrice").html().substr(0,1) + text.msg + "</span></div>";
		
			clearInterval(timer_interVal);
			timer5=5;
			$("#counter5s").html("5");
			$("#counter5s").hide();
		}else if(text.type == 1){
			if(text.bidder_name!=""){
				html += "<div class='bgRed'>主持人：当前出价最高的是"+text.bidder_name+"，若无出价，将进入拍卖倒计时</div>";
			}else{
				html += "<div class='bgRed'>主持人：当前暂无出价，进入倒计时</div>";
			}
			$("#counter5s").show();
			timer_interVal=setInterval(function(){
			  	counter_5s();
			},1000)

		}else if (text.type == 2) {
			clearInterval(timer_interVal);
			timer5=5;
			$("#counter5s").html("5");
			$("#counter5s").hide();
          
		}else if (text.type == 3) {
			if(text.is_last_one==0){
				html += "<div class='bgRed'>主持人：恭喜“"+text.bidder_name+"”获得本藏品，5s后进入下一个藏品</div>";
			}else{
				html += "<div class='bgRed'>主持人：恭喜“"+text.bidder_name+"”获得本藏品，全部藏品已拍卖完毕</div>";
			}
          
		} else if (text.type == 4) {
		
			if(text.is_last_one==0){
	          	html += "<div class='bgRed'>主持人：很遗憾，该藏品已流拍，进入下一个藏品拍卖</div>";
	          }else {
	          	html += "<div class='bgRed'>主持人：很遗憾，该藏品已流拍，全部藏品已经拍卖完</div>";
	          }
		} else if (text.type == 6) {
			if(text.is_sale==0){
				html += "<div><pre><span class='col_red'>主持人：欢迎大家来到《"+text.live_title+"》鉴宝即将开始</pre></div>";
			}else{
				html += "<div><pre><span class='col_red'>主持人：欢迎大家来到《"+text.live_title+"》拍卖会即将开始</pre></div>";
			}

		} else if (text.type == 7) {
			if(text.is_sale==0){
				html += "<div><pre><span class='col_red'>主持人：感谢大家支持，本场直播结束</pre></div>";
			}else{
				html += "<div><pre><span class='col_red'>主持人：感谢大家支持，本场拍卖结束</pre></div>";
			}
			setTimeout(function() {
				$(".player_ended").show();
			}, 5000)

		} else if (text.type == 8) {
			html += "<div class='bgRed'>主持人：欢迎“" +text.user_name + "”进入直播现场</div>";
		} else if (text.type == 9) {
			html += "<div class='bgRed'>主持人：<pre>" + text.msg + "</pre></div>";
			changeAuctionGoods();

		} else if (text.type == 10) {
			$(".prod_others .watch_num").html(commonCla.cWan(text.msg)+"人在线");
		} else if (text.type == 11) {
			html += "<div class='bgRed'>主持人:<pre>主播回来了</pre></div>";
		} else {
			var reply_user_name="";
			if(text.reply_user_name!="" && text.reply_user_name!=undefined){
				reply_user_name="@"+text.reply_user_name+"  ";
			}
			if (text.is_presenter == "1") {
				html += "<div class='bgRed'><span class=''>主持人：</span>"+reply_user_name + text.msg + "</div>";
			} else {
				html += "<div><span class='col_red'>" + text.user_name + "：</span>"+reply_user_name + text.msg + "</div>";

			}
		}

	} else {
		html += "<div><span class='col_red'>" + text.user_name + "：</span>" + text + "</div>";

	}
	return html;
}

function convertTextMsgToHtml2(content, num_type) {
	var text = content.text == undefined ? "" : content.text;
	try {
		text = JSON.parse(text.replace(/&quot;/g, '"'))
	} catch (e) {
		text = text;
	}
	console.log(JSON.stringify(text))
	var html = "";
	if (text.type != undefined) {
		console.log(text.type + "---------------------------------------------")
		if (text.type == 0) {
			html += "<div><span class='col_red'>" + text.user_name + 
			"：</span><span class='col_red'>"+
			$(".js_initPrice").html().substr(0,1) + text.msg + "</span></div>";
		}else if(text.type == 1){
			if(text.bidder_name!="" && text.bidder_name!=undefined){
				html += "<div class='bgRed'>主持人：当前出价最高的是"+text.bidder_name+"，若无出价，将进入拍卖倒计时</div>";
			}else{
				html += "<div class='bgRed'>主持人：当前暂无出价，进入倒计时</div>";
			}

		}else if (text.type == 2) {
          
		}else if (text.type == 3) {
			if(text.is_last_one==0){
				html += "<div class='bgRed'>主持人：恭喜“"+text.bidder_name+"”获得本藏品，进入下一个藏品拍卖</div>";
			}else{
				html += "<div class='bgRed'>主持人：恭喜“"+text.bidder_name+"”获得本藏品，全部藏品已拍卖完毕</div>";
			}
          
		} else if (text.type == 4) {
			if(text.unsold_type=="1"){
				html+="<div class='bgRed'>很遗憾，该藏品未达到保留价，已流拍。</div>";
			}else{
				if(text.is_last_one==0){
		          	html += "<div class='bgRed'>主持人：很遗憾，该藏品已流拍，即将进入下一个藏品</div>";
		          }else {
		          	html += "<div class='bgRed'>主持人：很遗憾，该藏品已流拍，全部藏品已经拍卖完</div>";
		          }
			}
			
		} else if (text.type == 6) {
			if(text.is_sale==0){
				html += "<div><pre><span class='col_red'>主持人：欢迎大家来到《"+text.live_title+"》鉴宝即将开始</pre></div>";
			}else{
				html += "<div><pre><span class='col_red'>主持人：欢迎大家来到《"+text.live_title+"》拍卖会即将开始</pre></div>";
			}

		} else if (text.type == 7) {
			if(text.is_sale==0){
				html += "<div><pre><span class='col_red'>主持人：感谢大家支持，本场直播结束</pre></div>";
			}else{
				html += "<div><pre><span class='col_red'>主持人：感谢大家支持，本场拍卖结束</pre></div>";
			}

		} else if (text.type == 8) {
			/*html += "<div class='bgRed'>主持人：欢迎“" +text.user_name + "”进入直播现场</div>";*/
		} else if (text.type == 9) {
			html += "<div class='bgRed'>主持人：<pre>" + text.msg + "</pre></div>";
		} else if (text.type == 10) {
		
		}else if (text.type == 11) {
			html += "<div class='bgRed'>主持人:主播回来了</div>";
		}  else {
			var reply_user_name="";
			if(text.reply_user_name!="" && text.reply_user_name!=undefined){
				reply_user_name="@"+text.reply_user_name+"  ";
			}
			if (text.is_presenter == "1") {
				html += "<div class='bgRed'><span class=''>主持人：</span>" +reply_user_name+ text.msg + "</div>";
			} else {
				html += "<div><span class='col_red'>" + text.user_name + "：</span>" + reply_user_name+text.msg + "</div>";

			}
		}

	} else {
		html += "<div><span class='col_red'>" + text.user_name + "：</span>" + text + "</div>";

	}
	return html;
}
//解析图片消息元素

function convertImageMsgToHtml(content) {
	var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
	var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
	var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
	if (!bigImage) {
		bigImage = smallImage;
	}
	if (!oriImage) {
		oriImage = smallImage;
	}
	return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
}

//解析自定义消息元素

function convertCustomMsgToHtml(content) {
	var data = content.getData();
	var desc = content.getDesc();
	var ext = content.getExt();
	return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}
//解析群提示消息元素

function convertGroupTipMsgToHtml(content) {
	var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
	var text = "";
	var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
	var opType, opUserId, userIdList;
	var memberCount;
	opType = content.getOpType(); //群提示消息类型（操作类型）
	opUserId = content.getOpUserId(); //操作人id
	switch (opType) {
		case webim.GROUP_TIP_TYPE.JOIN: //加入群
			userIdList = content.getUserIdList();
			//text += opUserId + "邀请了";
			for (var m in userIdList) {
				text += userIdList[m] + ",";
				if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
					text += "等" + userIdList.length + "人";
					break;
				}
			}
			text = text.substring(0, text.length - 1);
			text += "进入房间";
			//房间成员数加1
			memberCount = $('#user-icon-fans').html();
			$('#user-icon-fans').html(parseInt(memberCount) + 1);
			break;
		case webim.GROUP_TIP_TYPE.QUIT: //退出群
			text += opUserId + "离开房间";
			//房间成员数减1
			memberCount = parseInt($('#user-icon-fans').html());
			if (memberCount > 0) {
				$('#user-icon-fans').html(memberCount - 1);
			}
			break;
		case webim.GROUP_TIP_TYPE.KICK: //踢出群
			text += opUserId + "将";
			userIdList = content.getUserIdList();
			for (var m in userIdList) {
				text += userIdList[m] + ",";
				if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
					text += "等" + userIdList.length + "人";
					break;
				}
			}
			text += "踢出该群";
			break;
		case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
			text += opUserId + "将";
			userIdList = content.getUserIdList();
			for (var m in userIdList) {
				text += userIdList[m] + ",";
				if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
					text += "等" + userIdList.length + "人";
					break;
				}
			}
			text += "设为管理员";
			break;
		case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
			text += opUserId + "取消";
			userIdList = content.getUserIdList();
			for (var m in userIdList) {
				text += userIdList[m] + ",";
				if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
					text += "等" + userIdList.length + "人";
					break;
				}
			}
			text += "的管理员资格";
			break;

		case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
			text += opUserId + "修改了群资料：";
			var groupInfoList = content.getGroupInfoList();
			var type, value;
			for (var m in groupInfoList) {
				type = groupInfoList[m].getType();
				value = groupInfoList[m].getValue();
				switch (type) {
					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
						text += "群头像为" + value + "; ";
						break;
					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
						text += "群名称为" + value + "; ";
						break;
					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
						text += "群主为" + value + "; ";
						break;
					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
						text += "群公告为" + value + "; ";
						break;
					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
						text += "群简介为" + value + "; ";
						break;
					default:
						text += "未知信息为:type=" + type + ",value=" + value + "; ";
						break;
				}
			}
			break;

		case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
			text += opUserId + "修改了群成员资料:";
			var memberInfoList = content.getMemberInfoList();
			var userId, shutupTime;
			for (var m in memberInfoList) {
				userId = memberInfoList[m].getUserId();
				shutupTime = memberInfoList[m].getShutupTime();
				text += userId + ": ";
				if (shutupTime != null && shutupTime !== undefined) {
					if (shutupTime == 0) {
						text += "取消禁言; ";
					} else {
						text += "禁言" + shutupTime + "秒; ";
					}
				} else {
					text += " shutupTime为空";
				}
				if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
					text += "等" + memberInfoList.length + "人";
					break;
				}
			}
			break;
		default:
			text += "未知群提示消息类型：type=" + opType;
			break;
	}
	return text;
}

//tls登录

function tlsLogin() {
	//跳转到TLS登录页面
	TLSHelper.goLogin({
		sdkappid: loginInfo.sdkAppID,
		acctype: loginInfo.accountType,
		url: window.location.href
	});
}
//第三方应用需要实现这个函数，并在这里拿到UserSig

function tlsGetUserSig(res) {
	//成功拿到凭证
	if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
		//从当前URL中获取参数为identifier的值
		loginInfo.identifier = webim.Tool.getQueryString("identifier");
		//拿到正式身份凭证
		loginInfo.userSig = res.UserSig;
		//从当前URL中获取参数为sdkappid的值
		loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
		//从cookie获取accountType
		var accountType = webim.Tool.getCookie('accountType');
		if (accountType) {
			loginInfo.accountType = accountType;
			sdkLogin(); //sdk登录
		} else {
			location.href = location.href.replace(/\?.*$/gi, "");
		}
	} else {
		//签名过期，需要重新登录
		if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
			tlsLogin();
		} else {
			// alert("[" + res.ErrorCode + "]" + res.ErrorInfo);
		}
	}
}

//单击图片事件

function imageClick(imgObj) {
	var imgUrls = imgObj.src;
	var imgUrlArr = imgUrls.split("#"); //字符分割
	var smallImgUrl = imgUrlArr[0]; //小图
	var bigImgUrl = imgUrlArr[1]; //大图
	var oriImgUrl = imgUrlArr[2]; //原图
	webim.Log.info("小图url:" + smallImgUrl);
	webim.Log.info("大图url:" + bigImgUrl);
	webim.Log.info("原图url:" + oriImgUrl);
}



//单击评论图片

function smsPicClick() {
	if (!loginInfo.identifier) { //未登录
		if (accountMode == 1) { //托管模式
			//将account_type保存到cookie中,有效期是1天
			webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
			//调用tls登录服务
			tlsLogin();
		} else { //独立模式
			alert('请填写帐号和票据');
			$('#login_dialog').show();
		}
		return;
	} else {

	}
}


//展示点赞动画

function showLoveMsgAnimation() {
	//点赞数加1
	/*var loveCount = $('#user-icon-like').html();
	$('#user-icon-like').html(parseInt(loveCount) + 1);*/
	var toolDiv = document.getElementById("video-discuss-tool");
	var loveSpan = document.createElement("span");
	var colorList = ['red', 'green', 'blue'];
	var max = colorList.length - 1;
	var min = 0;
	var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
	var color = colorList[index];
	loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
	toolDiv.appendChild(loveSpan);
}