function ajax(method, url, data, success) {

	//method  get||post 请求的类型
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();//标准
	} catch (e) {

		xhr = new ActiveXObject('Microsoft.XMLHTTP');//ie
	}


	//url 服务器的地址
	if (method == 'get' && data) {
		url += '?' + data;
	}

	//服务器的地址 + 数据  get方式
	//data 提交的数据
	xhr.open(method,url,true);


	if (method == 'get') {
		xhr.send();
	} else {

		//xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {

				//success 回调方法
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		/*0 － （未初始化）还没有调用send()方法
		1 － （载入）已调用send()方法，正在发送请求
		2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
		3 － （交互）正在解析响应内容
		4 － （完成）响应内容解析完成，可以在客户端调用了*/

		//200
	}
}