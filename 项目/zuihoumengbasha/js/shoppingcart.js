$(function() {
	//引用foot相同部分
	$.ajax({
		type: 'GET',
		url: 'common/footer.html',
		async: false,
		success: function(msg) { //msg随便自定义
			$('#foot').append(msg);

		}
	})
	// $('td:has(button)').css('text-align','right');
	var $delTd = $('td').has('button').css('text-align', 'right');
	// remove删除页面上的元素
	// empty清空所有子元素
	$delTd.find('button').click(function() {
		var $self = $(this)
		$("#dialog-confirm").dialog({
			resizable: false,
			height: 180,
			modal: true,
			buttons: {
				"确认删除": function() {
					$self.closest('tr').empty();
					$(this).dialog("close");
				},
				"取消": function() {
					$(this).dialog("close");
				}
			}
		});
	});
});
$(function(){
	var ck=$.cookie("shop");
	getpro();
})

function getpro(){
	var ck=$.cookie("shop");
	var ck1=ck==undefined||ck==""?[]:ck.split("|");
	var html='';
	for(var i=0;i<ck1.length;i++){
		var img=ck1[i].split("#")[0];
		var cname=ck1[i].split("#")[1];
		var price=ck1[i].split("#")[2];
		var num=ck1[i].split("#")[3];
		var total=num*price;
		html+="<div id=\"img\"><img src=\""+img+"\"/>"
			+"<span>"+cname+"</span>"
			+"</div>"
			+"<div id=\"price\">"+price+"</div>"
			+"<div id=\"num\">"+num+"</div>"
			+"<div id=\"allnum\">"+total+"</div>"
			+"<div><a href=\"javascript:delshopCart('"+cname+"');\">删除</a></div>	";
	}
	$('#aaa').html(html);
}
function delshopCart(pname){
	var ck=$.cookie("shop");
	var spl=ck.split('|');
	var arr=[];
	for(var i=0;i<spl.length;i++){
		var name=spl[i].split('#')[1];
		if(name!=pname){
			arr.push(cp[i]);
		}
	}
	$.cookie("shop",arr.join('|'),{expires:7,path:"/"})
	getpro();
//	location.reload();
}
