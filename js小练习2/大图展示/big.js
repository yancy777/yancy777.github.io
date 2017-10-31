window.onload = function(){
	var oLI = document.getElementsByTagName("li");
	for(var i = 0; i<oLI.length; i++){
		oLI[i].onmousemove = function(e){
			e = e || event;
			var img = this.children[0];
			var fileList = img.src.split("/");
			var fileName = fileList[fileList.length-1].split(".")[0]+"_big."+fileList[fileList.length-1].split(".")[1];
			var bigImg = document.getElementById("big");
			bigImg.style.display = "block";
			bigImg.innerHTML = "<img src='img/"+fileName+"' />";
			bigImg.style.left = e.clientX + 10 + "px";
			bigImg.style.top = e.clientY + 10 + "px";
			if(e.clientX+10 >= getClientWidth() - bigImg.offsetWidth - 4){
				bigImg.style.left = (e.clientX - 10 - bigImg.offsetWidth) + "px";
			}
		}
		oLI[i].onmouseout = function(){
			var bigImg = document.getElementById("big");
			bigImg.style.display = "none";
		}
	}
}
