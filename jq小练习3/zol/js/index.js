$(function(){
	
	//动态加载头部信息 
	$.ajax({

		type:'GET',  //提交方式
		url:'html/common/header.html',  //注意相对路径和绝对路径的区别
		// url:'header.html',
		async: false, //同步   true 异步
		success:function(msg){     //数据获取成功后，返回一个回调函数   
			console.log(msg)
			$('#header').html(msg);
			// alert(1)
		}
	})


	//动态加载底部信息 

	$.ajax({

		type:'GET',  //提交方式
		url:'html/common/footer.html',  //注意相对路径和绝对路径的区别
		// url:'header.html',
		async: false, //同步   true 异步
		success:function(msg){     //数据获取成功后，返回一个回调函数   
			console.log(msg)
			$('#footer').html(msg);
			// alert(1)
		}
	})
})