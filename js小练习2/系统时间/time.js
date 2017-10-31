//===获取当前瞬间时间，无定时器==============================
function toFormat(dateObj,splitstr){
	if(splitstr==undefined){
		splitstr="";
	}
	var year=dateObj.getFullYear();
	var	month=dateObj.getMonth()+1;
	if(month<10){
		month="0"+month;
	}
	var	date=dateObj.getDate();
	if(date<10){
		date="0"+date;
	}
	var hour=dateObj.getHours();
	if(hour<10){
		hour="0"+hour;
	}
	var minute=dateObj.getMinutes();
	if(minute<10){
		minute="0"+minute;
	}
	var second=dateObj.getSeconds();
	if(second<10){
		second="0"+second;
	}
	return year+splitstr+month+splitstr+date+" "+hour+":"+minute+":"+second;
}
//===判闰年？===============================
	function toRunnian(dateObj){
		var year=dateObj.getFullYear();
		if(year%4==0||year%400==0){
			return "闰年"
		}
		else {
			return "不是闰年"
		}
	}
	/*var d=new Date();
	var time=toFormat(d);
	document.write(time);	*/

