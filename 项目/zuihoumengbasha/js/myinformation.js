$(function() {
	//引用head相同部分
	$.ajax({
			type: 'GET',
			url: 'common/header.html',
			async: false,
			success: function(msg) { //msg随便自定义
				$('#head').append(msg);

			}
		})
		//引用foot相同部分
	$.ajax({
		type: 'GET',
		url: 'common/footer.html',
		async: false,
		success: function(msg) { //msg随便自定义
			$('#foot').append(msg);

		}
	})

})