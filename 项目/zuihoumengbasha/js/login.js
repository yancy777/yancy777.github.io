$(function() {
	//引用foot相同部分
	$.ajax({
		type: 'GET',
		url: 'common/logregfooter.html',
		async: false,
		success: function(msg) { //msg随便自定义
			$('#foot').append(msg);

		}
	})

	//========表单验证==================	
	$("form").validate({
		rules: {
			user: {
				required: true,
				rangelength: [3, 10]
			},
			email: {
				email: true
			},

		},
		messages: {
			user: {
				required: '必填',
				minlength: '至少输入三个字符'
			}
		}
	});

	//========验证码==================

	$.idcode.setCode(); //加载生成验证码方法
	$("#butn").click(function() {
		var IsBy = $.idcode.validateCode() //调用返回值，返回值结果为true或者false
		if (IsBy) {
			alert("注册成功")
		} else {
			alert("验证码错误,请重新输入")
		}
	})

})