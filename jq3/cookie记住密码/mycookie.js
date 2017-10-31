
	//创建cookie：
	function setCookie(key,value,expires){
	    //expires: 有效期
		var cValue = key+ "=" + value;
		if(expires){//如果有expires,否则为无undefined
			cValue = "cValue" + ";expires=" + expires;
			//cValue += ";expires="+expires
		}
		document.cookie=cValue;
	}
	//删除cookie:
	function delCooke(key){
		document.cookie=key+"="+ ";expires="+new Date(0);
	}
	//读取cookie:
	function getCookie(key){
		var cValue=document.cookie.split("; ");
		var result="";
		for(var i=0;i<cValue.length;i++){
			var cItem=cValue[i].split("=");
			if(cItem[0]==key){
				result=cItem[1];
				break;
			}
		}
		return result;
	}

	