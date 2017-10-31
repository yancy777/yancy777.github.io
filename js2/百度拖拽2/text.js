var usename=document.getElementById("usename");
usename.onfocus=function(){
	if(usename.value=="手机/邮箱/用户名"){
		usename.value="";
	}
}
usename.onblur=function(){
	if(usename.value==""){
		usename.value="手机/邮箱/用户名";
	}
}

var password=document.getElementById("password");
password.onfocus=function(){
	if(password.value=="密码"){
		password.value="";
	}
}
password.onblur=function(){
	if(password.value==""){
		password.value="密码";
	}
}
var subBtn=document.getElementById("subBtn")
	subBtn.onkeyup=function(e){
		e=e||event;
		//ctr+enter快捷点发送
		if(e.keyCode==13){
			页面刷新一下
			//f5=116	
			subBtn.keyCode=116
		}
	}
