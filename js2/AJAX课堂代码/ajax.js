function createXHR(){
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}
	else{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	return xhr;
}

function ajax(m,url,p,fn){
	var xhr = createXHR();
	if(m == "GET"){
		xhr.open(m,url+"?"+p,true)
		xhr.send(null);
	}
	else{
		xhr.open(m,url,true)
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(p);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				fn(xhr.responseText);
			}
		}
	}
}



