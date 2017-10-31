//目录：

/*getElementsByName(name)  返回带有指定name指定名称的对象的集合（前提有class表签）
 **************************************************************
    getElementsByName(name)是不兼容的。
    如果是IE：
    如果该对象的标准属性包含有name,那么可以正确的使用。否则不可以使用。
    如果是FF:
    该方法可以适用于任何情况。
    结论:
    主要是适用于表单*/
// function byclass (classname) {
//     if(document.getElementsByClassName){
// 	    return document.getElementsByClassName(classname)
// 	  }
// 	else{
// 	    var tag= document.getElementsByTagName("*");
//         var lengths=tag.length;
// 		var divs=[];
// 		for (var i=0; i<lengths; i++) {
// 		    if(tag[i].className==classname){
// 			   divs.push(tag[i])
// 			}
// 		}
// 		return divs;
// 	}	  
// }

//nodeType
//1=元素节点，
//2=属性节点
//3=文本节点
//8=注释节点
//===获取当前元素所有子节点===============================
function getChildNodes(element) {
	var e = element.childNodes;
	var arr = [];
	for (var i = 0; i < e.length; i++) {
		if (e[i].nodeType == 1) {
			arr.push(e[i]);
		}
	}
	return arr;
}
//方二： //获得所有子节点的兼容方法       剔除空白节点 
//  function getchilds (obj) {
//    var childs=obj.childNodes;
//    var arr=[];
//    for (var i=0; i<childs.length; i++) {
//      if(childs[i].nodeType==3 && /^\s+$/.test(childs[i].nodeValue)){
// 	      continue;
// 	 }else{
// 	 arr.push(childs[i])
// 	 }
//    }
//        return arr;
//  }
//     var outdiv=document.getElementById("outdiv")
//  alert(getchilds(outdiv).length)

//===获取当前元素第一个子节点===============================
function getFirstChild(element) {
	var e = element.childNodes;
	var f = null;
	for (var i = 0; i < e.length; i++) {
		if (e[i].nodeType == 1) {
			f = e[i];
			break;
		}
	}
	return f;
}
//===获取当前元素最后一个子节点=========================
function getLastChild(element) {
	var e = element.childNodes;
	var f = null;
	for (var i = e.length - 1; i > 0; i--) {
		if (e[i].nodeType == 1) { //剔除空白节点 
			f = e[i];
			break;
		}
	}
	return f;
}

//===获取当前节点的前一个节点=========================
function getPreviousSibling(element) {
	var e = element.previousSibling;
	while (e != null && e.nodeType != 1) {
		e = e.previousSibling;
	}
	return e;
}
//===获取当前节点的下一个节点========================
function getNextSibling(element) {
	var e = element.nextSibling;
	while (e != null && e.nodeType != 1) {
		e = e.nextSibling;
	}
	return e;
}
//===获取文本内容========================	
// innerText  用来设置或获取对象起始和激素标签内的内容 (IE)
// textContent 用来设置或获取对象起始和激素标签内的内容 (FF)
function getContent(objs, val) {
	if (document.all) {
		if (val) {
			objs.innerText = val;
		} else {
			return objs.innerText;
		}
	} else {
		if (val) {
			objs.textContent = val;
		} else {
			return objs.textContent;
		}
	}
}
//===getElementsByClassName() 在IE8以下不支持的 兼容性问题
function getMyClassName() {
	var tagList; //定义一个变量存储通过getElementsByTagName()方法返回的元素集合
	var cssname; //定义一个变量存储CSS属性名
	if (arguments.length == 1) { //如果调用时传递一个参数时执行以下代码块
		tagList = document.getElementsByTagName("*");
		cssname = arguments[0]; //当传递一个参数时，让cssname存储arguments的第1个参数（下标从0开始）
	}
	if (arguments.length == 2) { //如果调用时传递二个参数时执行以下代码块
		tagList = arguments[0].getElementsByTagName("*");
		cssname = arguments[1]; //当传递两个参数时，让cssname存储arguments的第二个参数
	}
	var arr = []; //将合法的元素节点对象存入该数组

	//遍历所有通过getElementsByTagName()方法获取到的元素对象
	for (var i = 0; i < tagList.length; i++) {
		//如果元素节点的className属性值与传递过来的属性值相等则将元素对象装入arr数组中
		if (tagList[i].className == cssname) {
			arr.push(tagList[i]);
		}
	}
	return arr; //将数组返回
}
//===封装获取非行内样式函数========================
function getStyle(element, attr) {
	var attrValue;
	if (element.currentStyle) { //IE
		attrValue = element.currentStyle[attr];
	} else { //非IE下
		attrValue = window.getComputedStyle(element, null)[attr];
	}
	return attrValue;
}
//===获得可视区高度========================
function getClientHeight() {
	var result = 0;
	if (window.innerHeight) {
		result = window.innerHeight; //IE9下不可用
	} else {
		if (document.compatMode == "CSS1Compat") {
			result = document.documentElement.clientHeight; //标准模式：w3c标准
		} else {
			result = document.body.clientHeight; //怪癖模式：使用浏览器自己的解析方式
		}
	}
	return result;
}
//===获得可视区宽度========================	
function getClientWidth() {
	var result = 0;
	if (window.innerWidth) {
		result = window.innerWidth;
	} else {
		//检查一下当前浏览器的模式
		//标准模式：CSS1Compat    怪癖模式："BackCompat"
		if (document.compatMode == "CSS1Compat") {
			//标准模式
			result = document.documentElement.clientWidth;
		} else {
			result = document.body.clientWidth;
		}
	}
	return result;
}
//== 鼠标相对事件源位置========================
//   div1.onclick=function(e){
// var ev=e||window.event;
// var ox=ev.offsetX ||ev.layerX;
// var oy=ev.offsetY ||ev.layerY;
//   	div1.innerHTML="ox:"+ox+"--oy:"+oy;
//   }

//==卷起的高度========================onscroll 事件
// sTop=document.documentElement.scrollTop +document.body.scrollTop	//谷歌
//==事件对象的兼容================================
/*	id.onclick=function(e){
		e=e ||window.event
	}*/
//== 获取页面滚动距离的兼容================================
//距高    clientX+document.boby.scrollTop||document.documentElement.ScrollTop
//距左    clientY+document.boby.scrollLeft||document.documentElement.ScrollLeft
//==DOM二级事件兼容  事件对象的增 、删 ================
function addHandler(element, type, fn) {
	if (element.addEventListener) {
		element.addEventListener(type, fn, false); //非IE预定DOM2级事件
	} else {
		element.attachEvent("on" + type, fn); //IE预定DOM2级事件
	}
}

function removeHandler(element, type, fn) {
	if (element.addEventListener) {
		element.removeEventListener(type, fn, false); //非IE卸载DOM2级事件
	} else {
		element.detachEvent("on" + type, fn); //IE卸载DOM2级事件
	}
}
//==事件流中 阻止浏览器冒泡========================
function myCancelBubble(ev) {
	if (ev.stopPropagation) {
		ev.stopPropagation(); //非IE阻止事件冒泡
	} else {
		ev.cancelBubble = true; //IE阻止事件冒泡
	}
}

//==事件对象中 阻止浏览器的默认行为========================
function myPreventDefaut(ev) {
	if (ev.preventDefault) {
		ev.preventDefault(); //非IE阻止默认行为
	} else {
		ev.returnValue = false; //IE阻止默认行为
	}
}
//==创建cookie==============================
function setCookie(key, value, expires) {
	//expires: 有效期
	var cValue = key + "=" + value;
	if (expires) { //如果有expires,否则为无undefined
		cValue = "cValue" + ";expires=" + expires;
		//cValue += ";expires="+expires
	}
	document.cookie = cValue;
}
//==删除cookie================================
function delCooke(key) {
	document.cookie = key + "=" + ";expires=" + new Date(0);
}
//==获、读取cookie============================	
function getCookie(key) {
	var cValue = document.cookie.split("; ");
	var result = "";
	for (var i = 0; i < cValue.length; i++) {
		var cItem = cValue[i].split("=");
		if (cItem[0] == key) {
			result = cItem[1];
			break;
		}
	}
	return result;
}
//==cookie失效时间============================		
function addDay(days) {
	var news = new Date();
	var time = news.getTime();
	time = time + days * 24 * 60 * 60 * 1000;
	return new Date(time);
}
//==cookie查询找？============================	
function cookieSearch(key) {
	var cookieStr = document.cookie;
	var aCookieStr = cookieStr.split('; ')
	var result = '';
	for (var i = 0; i < aCookieStr.length; i++) {
		if (aCookieStr[i].split("=")[0] == key) {
			result = aCookieStr[i].split("=")[1]
		}
		return result;
	}
}
//===获取当前瞬间时间，无定时器=======================
function toFormat(dateObj, splitstr) {
	if (splitstr == undefined) {
		splitstr = "";
	}
	var year = dateObj.getFullYear();
	var month = dateObj.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var date = dateObj.getDate();
	if (date < 10) {
		date = "0" + date;
	}
	var hour = dateObj.getHours();
	if (hour < 10) {
		hour = "0" + hour;
	}
	var minute = dateObj.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	var second = dateObj.getSeconds();
	if (second < 10) {
		second = "0" + second;
	}
	return year + splitstr + month + splitstr + date + " " + hour + ":" + minute + ":" + second;
}
//===判闰年===============================
// var d=new Date();
// var time=toFormat(d);
// document.write(time);		

function toRunnian(dateObj) {
	var year = dateObj.getFullYear();
	if (year % 4 == 0 || year % 400 == 0) {
		return "闰年";
	} else {
		return "不是闰年";
	}
}