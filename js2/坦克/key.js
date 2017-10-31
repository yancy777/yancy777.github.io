window.onload=function(){
	//行内样式封装
	var getStyle=function(element,attrName){
			var attrValue="";
			if(element.currentStyle){
				attrValue=element.currentStyle[attrName];
			}
			else{
				attrValue=window.getComputedStyle(element,null)[attrName];
			}
			return attrValue;
	}
	///////////////
	var img1=document.getElementById("img1")
	document.onkeydown=function(e){
		e=e||event;
		switch(e.keyCode){
			case 38:
				img1.src="img/top.png";
				var aValue=getStyle(img1,"top");
				img1.style.top=(parseInt(aValue)-5)+"px";
				break;
			case 40:
				img1.src="img/down.png";
				var aValue=getStyle(img1,"top");
				img1.style.top=(parseInt(aValue)+5)+"px";
				break;
			case 37:
				img1.src="img/left.png";
				var aValue=getStyle(img1,"left");
				img1.style.left=(parseInt(aValue)-5)+"px";
				break;
			case 39:
				img1.src="img/right.png";
				var aValue=getStyle(img1,"left");
				img1.style.left=(parseInt(aValue)+5)+"px";
				break;
		}

		
	}
	
}
