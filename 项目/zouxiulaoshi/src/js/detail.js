/**
 * Created by hasee on 2016/7/14.
 */
require.config({
    paths:{
        "zeptoQuery":"lib/zepto.min",
        "iscroll":"lib/iscroll",
        "swiper":"lib/swiper.jquery",
        "fnBase":"lib/fnBase"
    },
    shim:{
        "iscroll":{
            exports:"IScroll"
        },
        "zeptoQuery":{
            exports:"Zepto"
        },
        "swiper":{
            exports:"Swiper"
        }
    }
});
require(["zeptoQuery"],function($){
    require(["swiper","fnBase"],function(Swiper,fnBase){
        fnBase.myalert()
        var goodsID = fnBase.request("goodsID");
        window.$ =window.Zepto = $;

        $.get("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"goodsID":goodsID},function(data){
            var aImg = JSON.parse(data[0].imgsUrl);

            var str = "";
            for(var i=0; i<aImg.length;i++){
                str+='<div class="swiper-slide"><img src="'+aImg[i]+'" /></div>'
            }
            str1='<li data-id="'+data[0].goodsID+'">'+
                '<div class="pro-text">'+
                '<p class="name">'+data[0].goodsName+'</p>'+
                '<p class="price"> <em>$'+data[0].price+'</em> <s>$'+data[0].price+'</s> </p>'+
                '</div>'+
                '</li>';


            $("#detail-page .main").html(str1);

            $("#detail-page .swiper-wrapper").html(str);

            var mySwiper = new Swiper('.swiper-container', {
                pagination: '.self-pagination',
                slidesPerView: '3',
                loop:true
            });
        });

        $("#detail-page .add-cart").on("tap",function(){
            $.get("http://datainfo.duapp.com/shopdata/updatecar.php"
                ,{userID:fnBase.getUserId(),goodsID:goodsID,number:1},
                function(data){
                    if(data==1){
                        alert("添加成功")
                    }

                })
        })


    });
});


