$(function() {
	$('#list1').click(function(e) {
		$('#liShop').show();
		$('#shop').hide();
	})
	$('#list2').click(function(e) {
		$('#shop').show();
		$('#liShop').hide();

	})
	//========获取==============================
	var $List = $("#liShop");
	var musicData = [];
	var oMusic = document.getElementById("music")
		/*获取数据*/
	$.get("new_file.json?" + new Date().getTime(), function(data) {
		//data 是一个数组
		console.log(data)
		musicData = data;
		var str = ""
		for (var i = 0; i < data.length; i++) {
			str += '<li data-id="' + data[i].id + '">' + data[i].musicName + '</li>'
		}
		$List.html(str)
	});
	/*获取数据结束*/
	/*事件部分*/
	var $prev = $("#prev");
	var $next = $("#next");
	var iNow = -1;
	$List.on("click", "li", function() {
		var id = $(this).attr("data-id");
		for (var i = 0; i < musicData.length; i++) {
			if (id == musicData[i].id) {
				/*播放musicData[i]这首歌*/
				iNow = i;
				/*播放iNow这个首歌*/
				chageMusic()
				$('#liShop').hide();
				$('#shop').hide();
			}
		}
	});
	$prev.on('click', function() {
		iNow--;
		chageMusic()
	});
	$next.on('click', function() {
		iNow++;

		chageMusic()
	});
	/*改变播放的歌曲*/
	function chageMusic() {
		/*最后一个歌的下一首，让去第一首歌
		 * 第一首歌的上一首，让去最后一首歌
		 * */
		if (iNow >= musicData.length) {
			iNow = 0;
		} else if (iNow < 0) {
			iNow = musicData.length - 1;
		}
		oMusic.src = musicData[iNow].src;
		oMusic.load();
		oMusic.play();
		$("#play-btn").addClass("pause")
	}
})