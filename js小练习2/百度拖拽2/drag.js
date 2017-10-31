window.onload = function(){
	var loginbtn = document.getElementById("loginbtn");
	loginbtn.onclick = function(){
		var cover = document.getElementById("cover");
		cover.style.display = "block";
		cover.style.height = getClientHeight() + "px";

		var login = document.getElementById("login");
		login.style.display = "block";
		// login.style.left = (getClientWidth() - login.offsetWidth) / 2 +"px";
		// login.style.top = (getClientHeight() - login.offsetHeight) / 2 +"px";
		var lx=getCookie(lx);
		var ly=getCookie(ly);
		if(lx==""&&ly==""){
			login.style.left = (getClientWidth() - login.offsetWidth) / 2 +"px";
			login.style.top = (getClientHeight() - login.offsetHeight) / 2 +"px";
		}
		else{
			login.style.left=lx;
			login.style.top=ly;
		}

		var close = document.getElementById("close");
		close.onclick = function(){
			cover.style.display = "none";
			login.style.display = "none";
		}

		//1、按下标题栏时鼠标指针样式发生改变并且可以进行拖动
		//2、当鼠标按键弹起时候鼠标指针样式还原并不可以拖动
		var loginHead = document.getElementById("login-head");
		loginHead.onmousedown = function(e){
			e = e || event;
			if(e.button == 0){
				this.style.cursor = "move";
				//
				if(e.preventDefault){
					e.preventDefault()
				}
				else{
					e.returnValue=flase;
				}
				//
				var dX = e.clientX - login.offsetLeft;
				var dY = e.clientY - login.offsetTop;
				var x="";
				var y="";
				document.onmousemove = function(e){
					e = e || event;
					//
					x= e.clientX - dX ;
					y= e.clientY - dY;
					if(x<=0){
						x=0;
					}
					if(y<=0){
						y=0;
					}
					if(x>=getClientWidth()-login.offsetWidth){
						x=getClientWidth()-login.offsetWidth
					}
					if(y>=getClientHeight()-login.offsetHeight){
						y=getClientHeight()-login.offsetHeight
					}
					login.style.left = x+ "px";
					login.style.top = y + "px";
				}
				document.onmouseup = function(){
					var date=new Date()
					date.setDate(date.getDate()+1)
					setCookie("lx",x,date);
					setCookie("ly",y,date);
					loginHead.style.cursor = "auto";
					document.onmousemove = null;
				}
			}
		}
	}
}