/**
 * ele : 需要添加事件的元素
 * eventtype : 事件的类型（字符串，不加on）
 * fun : 要绑定的函数
 * isCapture : 是否捕获，true代表捕获，false代表冒泡
 * 举例：
 */
function addEvent(ele, eventtype, fun, isCapture) {
	if(ele.attachEvent) {
		ele.attachEvent("on"+eventtype, fun);
	} else {
		ele.addEventListener(eventtype, fun, isCapture);
	}
}