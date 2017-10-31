// $(document).ready(function(){
// 	$('body').click(function(){
// 		$('#mask').show();
// 		$('#layer').slideDown();
// 	});
// 	$('#layer a').click(function(e){
// 		e.stopPropagation();
// 		$('#mask').hide();
// 		$('#layer').slideUp();
// 	});
// });
$(function(){
	$('#cover-Btn').click(function(){
		$('#mask').show();
		$('#layer').slideDown();
	})
	$('#layer a').click(function(e){
		e.stopPropagation();
		$('#mask').hide();
		$('#layer').slideUp();
	})
})