jQuery(function() {
var b = new Date,
e ="2016/09/06 11:18:00"
	$(".countdown").jCountdown({
		timeText: e,
		timeZone:"8",
		style: "flip",
		color: "black",
		width: "300",
		textGroupSpace: 15,
		textSpace: 0,
                reflection: 0,
		dayTextNumber: 2,
		displayDay: !0,
		displayHour: !0,
		displayMinute: !0,
		displaySecond: 0,
		displayLabel: !0,
		onFinish: function() {
		 alert("timeout")
		}
	});
});