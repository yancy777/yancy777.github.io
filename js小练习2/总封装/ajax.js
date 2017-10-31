//==Ajax创建===============================
	function createXMH(){
		var xhr;
		if(window.XMLHttpRequest){
			xhr= new XMLHttpRequest(); 
		}
		else{
			xhr= new ActiveXObject("Msxml2.XMLHTTP"); 
		}
		return xhr;
	}	
//==Ajax获得POSE GET 2种方式 get/pose判=======================
function ajax(m,url,p,fn){//不考虑同步 异步 true  p=ID 、标题、内容、
	var xhr="createXHR";
	var pStr=""
	var pSend=null;
	if(m.toUpperCase()=="GET"){//转大写
		pStr="?"+p;
	}
	xhr.open(m,url+str,true);
	if(m.toUpperCase()=="POST"){
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		pSend=p;
	}
	xhr.send(pSend);
	xhr.onreadstatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				fn(xhr.responseText);
			}
		}

	}
}

// //Ajax获得POSE GET 2种方式 url判================
// function ajax(m,url,fn){/////第一为方式pose/get;第二个参数为url路径;三参数是异步false 通信还是同步true通信.
// 	var sendStr=null;
// 	if(m.toUpperCase()==null){//转大写
// 		url=url.split('?')[0];
// 		url=url.split(?)[1];
// 	}
// 	var xhr=createXHR();
// 	xhr.open(m,url,fn);
// 	if(m.toUpperCase()=="POST"){
// 		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
// 	}
// 	xhr.send();
// 	xhr.onreadstatechange=function(){
// 		if(xhr.readyState==4){
// 			if(xhr.status==200){
// 				fn(xhr.responseText);
// 			}
// 		}
// 	}
// }
// ajax("GET","../API/article/get.aspx",function(text){//回调函数，给他传。。他返回我们参数

// })
