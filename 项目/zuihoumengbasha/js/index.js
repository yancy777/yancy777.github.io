$(function(){
	//引用head相同部分
	$.ajax({
		type:'GET',
		url:'common/header.html',
		async:false,
		success:function(msg){//msg随便自定义
			$('#head').append(msg);
		
		}
	})
	//引用foot相同部分
	$.ajax({
		type:'GET',
		url:'common/footer.html',
		async:false,
		success:function(msg){//msg随便自定义
			$('#foot').append(msg);
		
		}
	})	
	//============菜单侧拉列表=================
	$.ajax({
		type:'GET',
		url:'listbox.html',
		async:false,
		success:function(msg){//msg随便自定义
			$('#listbox').append(msg);
		
		}
	})	  
	
	$('.leftban  li').mouseover(function(e){
			$('#listbox').show();
			
	})
	$('#listbox ').mouseover(function(e){
			$('#listbox').show();
			
	})
	$('#listbox ').mouseout(function(e){
			$('#listbox').hide();	
	})

	//=====左小广告显示====
	$('#layer a').click(function(e){
		e.stopPropagation();
		$('#cover').hide();
		$('#layer').slideUp();
	})
	
	//===左楼梯显示====
	window.onscroll = function(){
		var sTop = document.documentElement.scrollTop + document.body.scrollTop;		
		if(sTop>getClientHeight()){		
			document.getElementById("sideleft").style.display = "block";
		}
		else{
			document.getElementById("sideleft").style.display = "none";
		}
				
	$('#sideclose').click(function(e){
			e.stopPropagation();
			$('#sideleft').hide();			
		})

	//===下拉右显示================
		
//	window.onscroll = function(){
		var sTop = document.documentElement.scrollTop + document.body.scrollTop;
		
		if(sTop>getClientHeight()){
		
			document.getElementById("sideright").style.display = "block";
		}
		else{
			document.getElementById("sideright").style.display = "none";
		}
	}	
	
	//=========楼梯效果==========================
	//添加开关  默认是关 /否
		var isClick=false;
		//除了最后一个，给每一个li添加单击事件  让当前的文字和背景颜色发生变化
		$('#sideright  ul li:not(.last)').click(function(){
			isClick=true;
			// alert(1)
			//$(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active')
			var ind=$(this).index()
			var _top=$('.louti').eq(ind).offset().top;
			$('body,html').stop().animate({scrollTop:_top},300,function(){
				isClick=false;
			});

		})
		$('#sideright ul li.last').click(function(){
			$('body,html').animate({scrollTop:0},1000);
		})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		//===轮播=================
		var win=$(".floor");
		var links=$(".title a");
		// var float=$(".float");
		var divs=$(".img-box div");
		var num1=0;
		var num2=0;
		links.hover(function(){
		    //滑块操作
		    // float.stop(true);
		    links.css("background","#fff");
		    links.eq($(this).index()).css('background','#DF025F')
		    var that=$(this);
		    var lefts= $(this).position().left;
		    // float.animate({left:lefts},function(){
		    //     that.css("color","#fff");
		    // });
		    //内容操作
		    var index=$(this).index(".title a");
		    num2=index;
		    if(num1==num2){
		        return;
		    }else if(num1<num2){
		        divs.eq(num2).css("left",1005).animate({left:0});
		        divs.eq(num1).animate({left:-1005});
		    }else if(num1>num2){
		        divs.eq(num2).css("left",-1005).animate({left:0});
		        divs.eq(num1).animate({left:1005});
		    }
		    num1=num2;
		    num2="";
		},function(){

		})
		/*左右按钮*/
		win.hover(function(){
		    $(".leftBtn,.rightBtn").css("display","block");
		},function(){
		    $(".leftBtn,.rightBtn").css("display","none");
		});
		$(".leftBtn").click(function(){
		    divs.finish();
		    // float.stop(true);
		    var temp=num1;
		    num1--;
		    if(num1==-1){
		        num1=4;
		    }
		    divs.eq(num1).css("left",1005).animate({left:0});
		    divs.eq(temp).animate({left:-1005});
		    links.css("background","#fff");
		    links.eq(num1).css('background','#DF025F')
		     

		})
		$(".rightBtn").click(function(){
		    divs.finish();
		    // float.stop(true);
		    var temp=num1;
		    num1++;
		    if(num1==5){
		        num1=0;
		    }
		    divs.eq(num1).css("left",-1005).animate({left:0});
		    divs.eq(temp).animate({left:1005});
		    links.css("background","#fff");
		    links.eq(num1).css('background','#DF025F')
		    
		})
		
//var timer;
//	function interval(){
//		timer = setInterval(function(){
//			rightMove();
//		},3000)
//	}
//	interval();
//
//	
//	$('.title a').hover(function(){
//		clearInterval(timer);
//		var Index = $(this).index();
//		num1=Index;
//		$('.img-box').stop().animate({left:-Index*1005});
//		interval();
//		$(this).addClass('active').siblings().removeClass('active');	
//	})
//
//
//
//	function rightMove(){
//		num1++;
//		if(num1==5){
//			num1=1;
//			$(' .img-box').css('left',0)
//		}
//		if(num1>3){
//			$('.floor .title a').eq(0).addClass('active').siblings().removeClass('active');	
//		}
//		else{
//			$('.floor .title a').eq(num1).addClass('active').siblings().removeClass('active');
//		}
//		$('.img-box').stop().animate({left:-num1*1005})
//	}
//
//




		
})
