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
	//放大功能
	$(".bigPic").jqueryzoom({
		xzoom: 382, //放大区域宽度
		yzoom: 520, //放大区域高度
		preload: 1, //是否显示预加载
		offset: 10, //放大区域偏离小图的距离
		position: "right", //放大区域显示的位置（left,right）
		lens: true //是否显示小图上的透明区域
	})
})

$(function(){
	

// --------加入购物车---------
//	var size;
//	var color;
//	$('.clo dd p').click(function(){
////		console.log()
//		color=$(this).html();
//	})
//	$('.size1 dd p').click(function(){
//		size=$(this).html();
//	})

	$(".btn2").click(function(event){
		
		var img =$('.jqzoom').find('img').attr("src");
		var cname=$('.m_mdiddle h3').html();
		var price=$('#baojia1 b').html();
//		console.log(price)
		var num=$('.shu dd p').html();
		var ck=$.cookie("shop");
		if(!ck){
			ck=img+"#"+cname+"#"+price+"#"+num;	
		}
		else{
			ck+="|"+img+"#"+cname+"#"+price+"#"+num;	
		}
		$.cookie("shop",ck,{expires:7,path:"/"});

	})
})