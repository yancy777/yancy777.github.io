


//==================图片详细页函数=====================
//鼠标经过预览图片函数
function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
}

//图片放大镜效果
$(function(){
	$(".jqzoom").jqueryzoom({xzoom:380,yzoom:410});
});

//图片预览小图移动效果,页面加载时触发
$(function(){
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 5; //设置每次显示图片的个数量
	var moveNum = 2; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
	var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
	  
	//下一张
	$(".spec-scroll .next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}	
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
});
//==================图片详细页函数=====================



//倒计时
  $(function(){
  			
           $('#djs').daojishi(6);
   })
  



//点击尺码和数量，文本域 值变化
	$(function(){
		$('#size1 ol li').hover(function(){
			$(this).find('#box').css('display','block');
			
		},function(){
			$(this).find('#box').css('display','none');
		})
		
		$('#size1 ol li').click(function(){
			$(this).css('background','#000').siblings().css('background','#fff');
			$(this).find('a').css('color','#fff');
			$(this).siblings().find('a').css('color','#000');
		})
		
		$('.jian').click(function(){
				var num=$('.numb').find('input').val();
				num--;
				if(num==-1){
					num=0;
				}
				$('.numb').find('input').val(num);
				$(this).css('background','#ccc');
				$('.jia').css('background','#fff');
				$('.No').css('display','none');
				
		})
		$('.jia').click(function(){
				var num=$('.numb').find('input').val();
				num++;
				if(num==2){
					num=1;
					$('.No').css('display','block');
				}
				$('.numb').find('input').val(num);
				$(this).css('background','#ccc');
				$('.jian').css('background','#fff');
		})
		
		
		
		
// --------加入购物车---------
	var size;
	$('#size1 ol li').click(function(){
//		console.log()
		size=$(this).find('a').html();
	})

	$("#shopp").click(function(event){
		
		var img =$('.jqzoom').find('img').attr("src");

		var h=$('#proinfo').find('h1').html();
		var cname=$('#chinaname').html();
//		var csize=$('#size1 ol li a').html(); 
		var csize=size;
		var price=$('#newprice').html();
		var numb=$('.numb input').val();
		var total=price*numb;

		var ck=$.cookie("shop");
		if(!ck){
			ck=img+"#"+h+"#"+cname+"#"+csize+"#"+price+"#"+numb;	
		}
		else{
			ck+="|"+img+"#"+h+"#"+cname+"#"+csize+"#"+price+"#"+numb;	
		}
		$.cookie("shop",ck,{expires:7,path:"/"})

	})
})
	
	
	
	
	
	
	//////////////////////////////////////////
	
	


