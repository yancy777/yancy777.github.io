function getClientHeight(){
	var result = 0;
	if(window.innerHeight){
		result = window.innerHeight;
	}
	else{
		//检查一下当前浏览器的模式
		//标准模式：CSS1Compat    怪癖模式："BackCompat"
		if(document.compatMode == "CSS1Compat"){
			//标准模式
			result = document.documentElement.clientHeight;
		}
		else{
			result = document.body.clientHeight;
		}
	}
	return result;
}

function getMyClassName(){
	var tagList;    //定义一个变量存储通过getElementsByTagName()方法返回的元素集合
	var cssname;	//定义一个变量存储CSS属性名
	if(arguments.length==1){  //如果调用时传递一个参数时执行以下代码块
		tagList = document.getElementsByTagName("*");
		cssname=arguments[0];  //当传递一个参数时，让cssname存储arguments的第1个参数（下标从0开始）
	}
	if(arguments.length==2){  //如果调用时传递二个参数时执行以下代码块
		tagList = arguments[0].getElementsByTagName("*");
		cssname = arguments[1];  //当传递两个参数时，让cssname存储arguments的第二个参数
	}
	var arr = []; //将合法的元素节点对象存入该数组

	//遍历所有通过getElementsByTagName()方法获取到的元素对象
	for(var i = 0 ;i<tagList.length;i++){
		//如果元素节点的className属性值与传递过来的属性值相等则将元素对象装入arr数组中
		if(tagList[i].className==cssname){
			arr.push(tagList[i]);
		}
	}
	return arr; //将数组返回
}