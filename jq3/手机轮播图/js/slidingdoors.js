$( window ).load( function(){
	//单张图片的宽度
	var imgWidth = $( '#box img:eq(0)' ).width();

	//设置掩藏门体露出的宽度
	var exposeWidth = 160;

	//设置容器总宽度
	$('#box').width( imgWidth + ( $('#box img').length - 1) * exposeWidth );

	//设置每道门的初始位置
	$('#box img:not(:first-child)').each( function( i ){
		var left = imgWidth + exposeWidth * i;
		$( this ).css( 'left', left );
		$( this ).data( 'pos', left );
	});

	//计算每道门打开时应移动的距离
	var distance = imgWidth - exposeWidth;

	//为每道门绑定事件
	$('#box img').each(function(i){
		$( this ).mouseover( function(){
			//开门
			for( var j = 1; j <= i; j++ ){
				var $img = $('#box img').eq( j );
				$img.animate( {'left': $img.data('pos') - distance}, 200 );
			}
			//关门
			for( var j = i + 1; j < $('#box img').length; j++){
				var $img = $('#box img').eq( j );
				$img.animate( {'left': $img.data('pos')}, 200 );
			}
		});
	});
});