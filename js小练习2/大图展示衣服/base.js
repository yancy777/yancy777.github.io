window.onload = function(){
	var aLi = document.getElementsByTagName('li');
	var imgBig = document.getElementById('imgBig');
	for(var i = 0;i<aLi.length;i++){
		aLi[i].onmousemove = function(e){
			e = e || event
			imgBig.style.display = 'block'	
			var img = this.getElementsByTagName('img')[0];
			var aStr = img.src.split('/');
			var str = aStr[aStr.length-1];
			var d = str.split('.');
			var srcStr = d[0] + '_big.' + d[1];
			imgBig.innerHTML = "<img src='" + srcStr + "'>";
			imgBig.style.top = e.clientY + 10 + 'px';
			imgBig.style.left = e.clientX + 10 + 'px';
			if(window.innerWidth - e.clientX <= imgBig.offsetWidth){
				imgBig.style.left = e.clientX - imgBig.offsetWidth - 6 + 'px'; 
			};
			
			
		}
		aLi[i].onmouseout = function(){
			imgBig.innerHTML = '';
		}
	}
}