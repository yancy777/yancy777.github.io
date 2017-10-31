
function addDay(days){
		var news = new Date();
		var time = news.getTime();
		time = time + days * 24 * 60 * 60 *1000;
		return new Date(time);
	}

function cookieSearch(key){
	var cookieStr = document.cookie;
	var aCookieStr = cookieStr.split('; ')
	var result = '';
	for(var i = 0;i<aCookieStr.length;i++){
		if(aCookieStr[i].split("=")[0] == key){
			result = aCookieStr[i].split("=")[1]
		}
		return result;
	}
}

function addCookie(key,value,days1){
	var day;
	day = addDay(days1)
	var result = key + "=" + value + ";";
	if(days1){
		result += "expires=" + day; 
	}
	document.cookie = result;
}

function removeCookie(key){
	var result = key + "=;expires=" + new Date(0);
	document.cookie = result;
}



