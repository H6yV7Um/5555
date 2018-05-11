function getLiveShare(vUrl){//http://lookme.dev/liveShare/1
	$.getJSON(vUrl,function(data){
		if(data.code='200'){
			console.log(data);
			console.log(data.data.topLive.status);
			// $('.lm_live_bgimg img').attr('src',data.data.topLive.cover_pic);
			$('.lm_live_talk_span').text(data.data.topLive.publish_name);
			if(data.data.hotLives.length>0){
				var lm_list_li=""
				for(var i=0;i<data.data.hotLives.length;i++){
					lm_list_li+=''
								+'<li class="lm_list_li"><a href="'+data.data.hotLives[i].shareUrl+'"><img src="'+data.data.hotLives[i].cover_pic+'!shareLiveList" width="100%"></a></li>'
				}
				$('.lm_list_contain').prepend(lm_list_li);
			}
                
		}else{
			alert(data.data.error);
		}

	})
}
/*获取回播分享函数*/
function getReplayShare(vUrl){//http://lookme.dev/liveShare/1/replayShare
	$.getJSON(vUrl,function(data){
		if(data.code='200'){
			console.log(data);
			var video=document.getElementById('video');
	        var w=document.documentElement.clientWidth||document.body.clientWidth;
	        var h=document.documentElement.clientHeight||document.body.clientHeight;
	        video.width=w;
	        video.height=h;
	        video.videoWidth=w;
	        video.videoHeight=h;
	        if(video.attachEvent){
	          video.attachEvent('ended',function(){
	            //alert("结束了");
	            location.href=data.data.topLive.replayOverUrl;
	          })
	        }else{
	          video.addEventListener('ended',function(){
	            //alert("结束了");
	            location.href=data.data.topLive.replayOverUrl;
	          })
	        }
	        if(data.data.topLive.user.head_pic!=""){
	        	var img=data.data.topLive.user.head_pic+'!shareLiveList'
				$('.lm_v_img img').attr('src',img);
	        } 
			
			$('.lm_v_ti_who').text(data.data.topLive.user.name);
			$('.lm_v_ti_wherw').text(data.data.topLive.tags[0].name);
			$('.lm_v_look span').text(data.data.topLive.play_num);
			$('#video').attr('src',data.data.topLive.replay_url);
		}else{
			alert(data.error);
		}

	})
}
/*获取回播分享结束函数*/
function getReplayEnd(vUrl){//http://lookme.dev/liveShare/1/replayOver
	$.getJSON(vUrl,function(data){
		if(data.result='succ'){
			console.log(data.data.topLive.user.head_pic);
			if(data.data.topLive.user.head_pic!=""){
				console.log("111");
				var img=data.data.topLive.user.head_pic+'!shareLiveList';
				$('.lm_title img').attr('src',img);
			}
			var coverPic=data.data.topLive.cover_pic+'!shareLiveOver'
			$('.lookme_bgimg img').attr('src',coverPic);
			$('.lm_who').text(data.data.topLive.user.name);
			$('.lm_where').text(data.data.topLive.tags[0].name);
			$('.lm_like_l').text(data.data.topLive.play_num);
			$('.lm_like_r').text(data.data.topLive.thumb_ups);
			$('.lm_time span').text(data.data.topLive.live_length);
			$('.lm_agin a').attr('href',data.data.topLive.shareUrl);
			if(data.data.hotLives.length>0){
				var lm_list_li=""
				for(var i=0;i<data.data.hotLives.length;i++){
					lm_list_li+=''
								+'<li class="lm_list_li"><a href="'+data.data.hotLives[i].shareUrl+'"><img src="'+data.data.hotLives[i].cover_pic+'!shareLiveList" width="100%"></a></li>'
				}
				$('.lm_list_contain').prepend(lm_list_li);
			}
                
		}else{
			alert(data.message);
		}

	})
}

