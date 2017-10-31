(function($){
	//默认项
	var defaults={
		heads:['1','2','3'],
		bodys:['1111','2222','3333'],
		event:'click'
	}
	//创建一个对象
	var settings={}
	//创建一个父对象
	var $parent=null;
	//创建函数
	function fnTab(option){
		//如果有option，就先执行配置项（option）,如果没有，就走defaults
		//调用工具函数
		settings=$.extend(settings,defaults,option);
		$parent=this;
		create();
		bind();


	}
	//创建布局
	function create(){
		//创建input标签
		for(var i=0;i<settings.heads.length;i++){
			var $input = $('<input type="button" value="'+ settings.heads[i] +'">');
			if(i==0){
				$input.attr('class','active');
			}
			$parent.append( $input );
		}

		//创建div布局
		for(var i=0;i<settings.bodys.length;i++){
			var $div = $('<div>'+ settings.bodys[i] +'</div>');
			if(i==0){
				$div.show();
			}
			$parent.append($div);
		}
	}
	//绑定事件
	function bind(){
		$parent.find('input').on(settings.event,function(){
			$('input').attr('class','');
			$(this).attr('class','active');

			$parent.find('div').hide();
			$parent.find('div').eq($(this).index()).show()

		})
	}

	//插件封装成功 找到接口调用  调用实例插件
	$.fn.extend({
		tab:fnTab


	})
	
})(jQuery)