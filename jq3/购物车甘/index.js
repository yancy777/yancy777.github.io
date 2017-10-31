window.onload = function(){
	createList();
	var ul = document.getElementsByTagName('ul')[0];
	var cartList = document.getElementById('cart_list');
	var str = "";
	for(var i=0;i<ul.getElementsByTagName('a').length;i++){
		ul.getElementsByTagName('a')[i].onclick = function(){
			var imgS = this.parentNode.children[0].children[0].src;
			var img = imgS.split('/')[imgS.split('/').length-1];
			var pMoney = this.parentNode.children[1].innerHTML;
			var pName = this.parentNode.children[2].innerHTML;
			var str = cookieSearch('cartshop')
			if(str == ""){
				str = img + "#" + pMoney + "#" + pName; 
			}else{
				str += "|" + img + "#" + pMoney + "#" + pName	
			}
			addCookie('cartshop',str,7);
			createList();	
		}
	}
}

function createList(){
		var cartList = document.getElementById('cart_list');
		var html= ""
		var ck = cookieSearch('cartshop');
		var ckList;
		if(ck == ""){
			ckList = [];
		}else{
			ckList = ck.split("|");	
		}
		for(var i = 0;i<ckList.length;i++){
			var img = ckList[i].split("#")[0];
			var pMoney = ckList[i].split("#")[1];
			var pName = ckList[i].split("#")[2];
			html += "<div class=\"box1\">"
				 + "<span><img src=\"img/" + img + "\" value=\"\" /></span>"
				 + "<p>" + pName + "</p>"
				 + "<i>" + pMoney + "</i>"
				 + "<a href=\"javascript:del('" + pName + "');\">删除</a>"
				 + "</div>"
		}
		cartList.innerHTML = html;
	}
	

function del(name){
	var ck = cookieSearch("cartshop");
	var ckList = ck.split("|");
	var arr = [];
	for(var i = 0; i<ckList.length;i++){
		var cName = ckList[i].split("#")[2];
		if(cName != name){
			arr.push(ckList[i]);
		}
	}
	console.log(arr);
	var str = arr.join("|");
	console.log(str);
	addCookie("cartshop",str,7);
	createList();
}
