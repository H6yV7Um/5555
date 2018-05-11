/*! starshow 2016-03-03 */
var t_urlpath="http://testapi.xingxiu.tv/";
var o_urlpath="http://api.xingxiu.tv/";
// var vUrl='index.php?app=mobile&mod=Message&act=focusDetail&returntype=jsonp&callback=?';
// var cUrl=t_urlpath+'index.php?app=mobile&mod=Message&act=focusCommentList&returntype=jsonp&callback=?';
var did = location.search.replace(/\?id=(\d+).*/,'$1');
var zan_url=o_urlpath+'index.php?app=mobile&mod=Message&act=doFocusDigg&aid='+did+'&returntype=jsonp&callback=?'
function getHotList(vUrl) {
    $.getJSON(vUrl,function(data) {
    	//console.log('data+==='+JSON.stringify(data));
        if (data.result=="succ") {
			$("title").text(data.info.title),
            $(".st_con_t_img img").attr("src", data.info.thumb),
            $(".st_con_t_h2 h2").text(data.info.title),
            $(".hot_like").text(data.info.digg_count),
            $(".hot_look").text(data.info.view),
            $(".st_con_t_h6").text(data.info.create_at);
            $('.st_like_l').attr('isdigg',data.info.is_digg);
            var listP="";
            var hotList="";
            for(var i=0;i<data.info.content.length;i++){
            	if (data.info.content[i].tag=='P'){
            		listP+=''
            			+'<p>'+ data.info.content[i].value +'</p>'
            	}else if(data.info.content[i].tag=='IMG'){
            		var w=document.body.clientWidth || document.documentElement.clientWidth;
            		f = data.info.content[i].width;
            		if(f>=w){
            			listP+=''
            				+'<p class="st_hot_list_p"><img src="' + data.info.content[i].value + '"></p>'
            		}else{
            			listP+=''
            				+'<p class="st_hot_list_p" style="width:'+data.info.content[i].width+'px; margin:0 auto;"><img src="' + data.info.content[i].value +'" style="width:'+data.info.content[i].width+'px;"></p>'
            		}

            	}
            }
            $(".st_hot_list").append(listP);
						
            for(var i=0;i<data.list.length;i++){
            		hotList+=''
            			+'<li>'
            			+'<a href="' + data.list[i].url + '">'
            			+'<ul class="st_hot_today_warp">'
            			+'<li class="st_hot_today_phone">'
                        if(data.list[i].thumb==""){
                            hotList+='<img src="../public/images/default.png" alt="">'
                        }else{
                            hotList+='<img src="' + data.list[i].thumb + '" alt="">'
                        }
            			hotList+='</li>'
            			+'<li class="st_hot_today_con">'
            			+'<p>'+data.list[i].title+'</p>'
            			+'<p><span class="st_hot_look">'+ data.list[i].view +'</span> <span class="st_hot_con_like">' + data.list[i].digg_count + '</span></p>'
            			+'</li>'
            			+'<div class="clear"></div>'
            			+'</ul>'
            			+'</a>'
            			+'</li>'
            	
            }

            $(".hd_list").append(hotList);
        }
    })
}

function getComment(url){
	   $.getJSON(url,function(data) {
    	console.log('data+==='+JSON.stringify(data));
        if (data.result =="succ") { 
            var cList="";
            if(data.info.length>0){
            	for(var i=0;i<data.info.length;i++){
	        		cList+=''
	        			+'<li class="st_hot_c_warp_li">'
	                    +'<ul class="st_hot_c_inner">'
	                    +'<li class="st_hot_c_warp_l"><img src="'+data.info[i].user.avatar+'" alt=""></li>'
	                    +' <li class="st_hot_c_warp_r">'   
	                    +'<p class="inner_p1">'+data.info[i].user.uname+'</p>'
	                    +'<p class="inner_p2">'+data.info[i].pubdate+'</p>'  
	                    +'<p class="inner_p3">'+data.info[i].content+'</p>' 
	                    if(data.info[i].reply!=''){
	                    	cList+='<div class="inner_div">'
	                        +'<p class="inner_div_er">小编回复:</p>'    
	                        +'<p>'+data.info[i].reply+'</p>' 
	                        +'</div>'
	                    } 
	                    cList+='</li>'
	                    +'<div class="clear"></div>'
	                    +'</ul>'
	                	+'</li>'
	            }
	            $(".st_hot_c_warp").prepend(cList);
            }else{
            	$('.st_hot_c').hide();
                $('.hd_list').css('padding-bottom','73px');
            }
        }
    })
}
var isdigg=$('.st_like_l').attr('isdigg');
if(isdigg=='1'){
		$('.st_like_l').parent().addClass('active');
	}
// $('.st_like_l').on('click',function(){
	
// 	var hs=$('.st_like_l').parent().hasClass('active');
// 	if(hs){
        
// 	}else{
//         $.getJSON(zan_url,function(data) {
//             if (data.result = "succ") {
//                 $('.st_like_l').parent().addClass('active');
//                 var hot_like=parseInt($('.hot_like').text())+1;
//                $('.hot_like').text(hot_like);
//             }
//             else{
//                 alert(data.msg);
//             }
//         })
//     }
	
// })
//点赞通用组件
function getLike(obj,add){
    var hs=$('.'+obj).parent().hasClass('active');
    if(hs){
        
    }else{
        $.getJSON(zan_url,function(data) {
            if (data.result=="succ") {
                $('.'+obj).parent().addClass('active');
                var hot_like=parseInt($('.'+add).text())+1;
               $('.'+add).text(hot_like);
            }
            else{
                alert(data.msg);
            }
        })
    }
}
