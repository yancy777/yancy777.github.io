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
	// 表单验证插件

	//	var form=document.forms[0];
	//	var username=form.elements[0];
	// 邮箱用得插件
	//var code=form.elements[3];
	var phone = document.getElementById("phone");
	var pwd = document.getElementById("pwd");
	var qpwd = document.getElementById("qwd");

	//手机号
	phone.onfocus = function() {
		if (phone.value == "手机号") {
			phone.value = "";
		} else {

			Act_error.style.display = "none";
		}

	}
	phone.onblur = function() {
			 p1=/^1(38|37|88|89|57|83|82|59|36|86)[0-9]{8}$/;
			//var p2 = /^\w{6,13}@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/;
			if (phone.value == "") {

				Act_error.style.display = "block";
			} else if (p1.test(username.value)) {
				Act_error.style.display = "none";
			} else {
				Act_error.style.display = "block";
				Act_error.innerHTML = "请输入正确的手机号";
			}

		}
		///密码
	pwd.onfocus = function() {
		if (pwd.value == "请输入6-20个字符") {
			pwd.value = "";
		} else if (pwd.value == "") {
			jianyi.style.display = "block";
			jianyi.innerHTML = "请输入密码";
		} else {
			jianyi.style.display = "none";
		}
	}
	pwd.onblur = function() {
		if (pwd.value == "") {

			Act_error.style.display = "none";
		}
	}

	qpwd.onblur = function() {
		qpwds.style.display = "none";
		if ((qpwd.value).match(pwd.value) == null) {
			qpwds.style.display = "block";
			qpwds.innerHTML = "密码和确认密码不一致，请重新输入";
		}
		if (qpwd.value == "") {
			qpwds.style.display = "block";
			qpwds.innerHTML = "请重复输入您的密码";
		}

	}

	$("form").validate({
		rules: {
			user: {
				required: true,
				rangelength: [3, 10]
			},
			email: {
				email: true
			},
			//			number: {
			//				number: true
			//			}
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
			//alert("注册成功!")
			window.location.href = 'regsucceed.html'
		} else {
			alert("验证码错误,请重新输入")
		}
	})

})