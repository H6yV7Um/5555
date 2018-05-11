var t_url_path='http://testshare.xingxiu.tv/';
var v_url_path='http://m.xingxiu.tv';
function getLiveShare(vUrl){//http://lookme.dev/liveShare/1
	$.getJSON(vUrl,function(data){
		if(data.code='200'){
			console.log(data.topLive.id);
			$('.lm_live_bgimg img').attr('src',data.topLive.cover_pic);
			$('.lm_live_talk_span').text(data.topLive.publish_name);
			if(data.hotLives.length>0){
				var lm_list_li=""
				for(var i=0;i<data.hotLives.length;i++){
					lm_list_li+=''
								+'<li class="lm_list_li"><a href="'+data.hotLives[i].shareUrl+'"><img src="'+data.hotLives[i].cover_pic+'" width="100%"></a></li>'
				}
				$('.lm_list_contain').append(lm_list_li);
			}
                
		}else{
			alert(data.error);
		}

	})
}
/*获取回播分享函数*/
function getReplayShare(vUrl){//http://lookme.dev/liveShare/1/replayShare
	$.getJSON(vUrl,function(data){
		if(data.code='200'){
			$('.lm_v_img img').attr('src',data.topLive.user.head_pic);
			$('.lm_v_ti_who').text(data.topLive.user.name);
			$('.lm_v_ti_wherw').text(data.topLive.user.created_at);
			$('.lm_v_look span').text(data.topLive.play_num);
		}else{
			alert(data.error);
		}

	})
}
/*获取回播分享结束函数*/
function getReplayEnd(vUrl){//http://lookme.dev/liveShare/1/replayOver
	$.getJSON(vUrl,function(data){
		if(data.result='succ'){
			$('.lm_title img').attr('src',data.topLive.user.head_pic);
			$('.lookme_bgimg img').attr('src',data.topLive.cover_pic);
			$('.lm_who').text(data.topLive.user.name);
			$('.lm_where').text(data.info.play_num);
			$('.lm_like_l').text(data.topLive.play_num);
			$('.lm_like_r').text(data.topLive.thumb_ups);
			$('.lm_time span').text(data.info.img);
			$('.lm_agin a').attr('href',data.info.img);
			if(data.hotLives.length>0){
				var lm_list_li=""
				for(var i=0;i<data.hotLives.length;i++){
					lm_list_li+=''
								+'<li class="lm_list_li"><a href="'+data.hotLives[i].shareUrl+'"><img src="'+data.hotLives[i].cover_pic+'" width="100%"></a></li>'
				}
				$('.lm_list_contain').append(lm_list_li);
			}
                
		}else{
			alert(data.message);
		}

	})
}

