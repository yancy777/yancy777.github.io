/**
 * Created by hasee on 2016/6/5.
 */
var  cmbDemo ={
    init:function(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',

            onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper){
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            }
        })

        var oMusic = $("#music");
        var oMusicBtn = $("#music_btn");
        oMusicBtn.on("tap",function(){
            console.log(oMusic[0].paused)

            if(oMusic[0].paused){
                $(this).removeClass("stop")
                oMusic[0].play()
            }else{
                $(this).addClass("stop")
                oMusic[0].pause()
            }
        });
        /*等loading完成以后再播放*/
        oMusic[0].play()
    }

};
