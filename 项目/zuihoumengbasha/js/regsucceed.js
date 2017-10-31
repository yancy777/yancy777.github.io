$(document).ready(function() {
	//引用foot相同部分
	$.ajax({
		type: 'GET',
		url: 'common/logregfooter.html',
		async: false,
		success: function(msg) { //msg随便自定义
			$('#foot').append(msg);

		}
	})

	//倒计时	
	var SysSecond = 5; //倒计时起始时间
	var InterValObj; //  定义倒计时
	InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
	function SetRemainTime() {
		if (SysSecond > 0) {
			SysSecond = SysSecond - 1;
			var second = Math.floor(SysSecond % 60); // 计算秒
			$('.tm').html()
			$('.second').html(second);
		} else { //剩余时间小于或等于0的时候，就停止间隔函数
//			window.clearInterval(InterValObj);
			setTimeout(window.location.href='myinformation.html',1); 
		}
	}


	
})