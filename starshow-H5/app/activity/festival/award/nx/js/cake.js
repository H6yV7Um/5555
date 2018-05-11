var analyzParams=function(param_name) {
	var url = window.location.search.split("?")[1];
	if (url == "" || url == undefined) return url;
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
var initCakePage = function() {
  var awardName=decodeURI(analyzParams("mobile_award_12"));
  var awardNum=analyzParams("mobile_12");
  $("#award_name").html(awardName);
  $("#coupons_num").html(awardNum);
}
$(function(){
  initCakePage();
})