;! function( Slider ) {
    Slider.prototype.initAnimation = function() {
        var subSwiper,
            initSubSwiper = function() {
                if ( ! subSwiper ) {
                    var $subPower = $( ".js-sub-power-scroll" );
                    subSwiper  = $subPower.swiper( {
                        mode: "horizontal",
                        slidesPerView:1,
                        loop: false
                    } );
                } else {
                    subSwiper.reInit();
                }
            },
            startSlideAnimation = function( swiper ) {
                var $activeSlide = $( swiper.activeSlide() );
                $activeSlide.children().removeClass( "hide" );
                // init sub swiper
                if ( $activeSlide.data( "containSubSwiper" ) || ( $activeSlide.find( ".js-sub-power-scroll" ).length > 0 ) ) {
                    $activeSlide.data( "containSubSwiper", true );
                    initSubSwiper();
                }
            },
            hideAllSlideAnimation = function( swiper ) {
                for ( var i = 0, l = swiper.slides.length; i < l; ++ i ) {
                    $( swiper.slides[i] ).children().addClass( "hide" );
                }
            };

        this.swiper.addCallback( "FirstInit", function( swiper ) {
            setTimeout( function() {
                startSlideAnimation( swiper );
            }, 300);
        } );

        this.swiper.addCallback( "SlideReset", function( swiper, direction ) {
            startSlideAnimation( swiper );
        } );

        this.swiper.addCallback( "SlideChangeEnd", function( swiper, direction ) {
            hideAllSlideAnimation( swiper );
            startSlideAnimation( swiper );
        } );

        hideAllSlideAnimation( this.swiper );
    };
}(MobileSlider);

$( function() {
    var $powerScroll = $( ".js-power-scroll" );

    // new tab at pc
    if ( ! /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) {
        $powerScroll.find( "a" ).attr( "target", "_blank" );
    }

    // like btn
    $powerScroll.delegate( ".js-slide-rating .js-fav-btn", "click", function( e ) {
        var $btn    = $( ".js-slide-rating .js-fav-btn" ),
            $number = $( ".js-slide-rating .js-number" ),
            $heart  = $btn.find( ".js-heart" ),
            weiUid  = $btn.data( "wei-uid" ),
            applyId = $btn.data( "apply-id" );


        // fixed the bug: after click like btn, share link will contain the hash
        // fix method: set all hash to __fixed__
        $( ".swiper-slide" ).attr( "data-hash", "__fixed__" );
        window.location.hash = "__fixed__";

        if ( $btn.attr( "disabled" ) || ! weiUid || ! applyId ) {
            return false;
        }

        $btn.attr( "disabled", true );
        $number.html( parseInt( $number.html() || 0 ) + 1 ).addClass( "a-largen-out" );
        setTimeout( function(){ $number.removeClass( "a-largen-out" ); }, 780 );
        $heart.addClass( "c-red" );
        $.getJSON( SITE_URL + "RecruitFestival/likeWeiUser", { wei_uid: weiUid, apply_id: applyId }, function( res ) {
            if ( res && res.status ) {
            } else {
                $number.html( parseInt( $number.html() || 0 ) - 1 ).removeClass( "a-largen-out" );
                $heart.removeClass( "c-red" );
                $btn.attr( "disabled", false );
                alert( res.info || "%>.<%操作失败，请稍后重试~" );
            }
        } );
    } );

    // share btn
    if ( navigator.userAgent.match(/micromessenger/gi) || ! /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) {
        $powerScroll.delegate( ".js-share-btn", "click", function() {
            var $btn   = $( this ),
                $power = $( ".js-power-scroll-container" ),
                $fade  = $( "<div/>" ),
                $content   = $( "<div/>" ),
                $shareTips = $( "<div/>" ),
                imgUri = "share-timeline.png";
            // 蒙层
            $fade.attr( "style", "box-sizing: border-box;overflow: visible;position: absolute;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;background-color: #000;opacity: .7;filter: alpha(opacity=70);z-index: 1140;" );
            $content.attr( "style", "box-sizing: border-box;overflow: visible;position: absolute;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;z-index: 1150;" );
            // 分享提示
            $shareTips.attr( "style", "position:absolute;top:-18px;right:5px;" );
            $shareTips.append( "<img/>" ).find( "img" ).attr( "src", "images/" + imgUri + "?v201412110010" ).attr( "width", 420 );
            // 关闭蒙层
            $content.bind( "click", function() {
                $fade.remove();
                $content.remove();
                $fade      = null;
                $content   = null;
                $shareTips = null;
            } );
            // 组装
            $content.append( $shareTips );
            $power.append( $fade ).append( $content );
        } );
    }

    $powerScroll = null;
} );

$(".guider-mask").on("click", function() {
    page.open()
})
var page = {
    "open" : function() {
        $(".index-top").addClass("bounceOutUp animated");
        $(".index-bottom").addClass("bounceOutDown animated");
        page.temp = window.setTimeout(function() {
            $(".guider-mask").remove()
            $(".page-company .slide-wrapper").show()
        },1000)
    }
}

var his = {
    "init" : function() {
        his.btns = $(".history-thumb li");
        his.img = $(".history-show .photo img");
        his.descs = $(".history-desc .history-info");

        his.btns.on("click", function() {
            his.target = $(this).html();
            his.this = $(this);
            his.show()
        })
    },
    "show" : function() {
        his.btns.removeClass("current")
        his.img.fadeOut(function() {
            his.img.fadeIn()
            his.img.attr("src","images/history"+his.target+".jpg")
            his.this.addClass("current")
        })
        $(".history-desc").fadeOut(function() {
            his.descs.hide()
            $(".history-desc [data-target="+his.target+"]").show()
            $(".history-desc").fadeIn()
        })
    }
}
his.init()

var oSlider = {
    "s" : {
        "1" : { "src" : "images/workPic01.jpg", "title" : "激烈的研讨中"},
        "2" : { "src" : "images/workPic02.jpg", "title" : "认真工作中"},
        "3" : { "src" : "images/workPic03.jpg", "title" : "工作遇见了乐趣"},
        "4" : { "src" : "images/workPic04.jpg", "title" : "办公室的一枝花"},
        "5" : { "src" : "images/workPic05.jpg", "title" : "我的办公桌一角"},
    },
    "init" : function() {
        oSlider.box = $(".work-photo .photo");
        oSlider.photo = $(".work-photo .photo img");
        oSlider.title = $(".work-title");
        oSlider.btns = $(".work-btns li");

        oSlider.btns.on("click", function() {
            oSlider.target = $(this).html();
            oSlider.chage()
            $(this).addClass("current");
        })
    },
    "chage" : function() {
        oSlider.btns.removeClass("current");
        oSlider.box.fadeOut(function() {
            oSlider.photo.attr("src",oSlider.s[oSlider.target].src);
            oSlider.box.fadeIn()
        });
        oSlider.title.fadeOut(function() {
            oSlider.title.html(oSlider.s[oSlider.target].title);
            oSlider.title.fadeIn()
        })
        oSlider.btns.removeClass("current");
    }
}
oSlider.init()

var live = {
    "s" : {
        "1" : { "src" : "images/livePic01.jpg", "title" : "激烈的研讨中"},
        "2" : { "src" : "images/livePic02.jpg", "title" : "融资庆功会"},
        "3" : { "src" : "images/livePic03.jpg", "title" : "2015年会领到的羊年吉祥物"},
        "4" : { "src" : "images/livePic04.jpg", "title" : "元宵节上美女亲手为你煮元宵"},
    },
    "init" : function() {
        live.box = $(".live-photo");
        live.photo = $(".live-photo img");
        live.title = $(".live-title");
        live.btns = $(".live-btns li");

        live.btns.on("click", function() {
            live.target = $(this).find("span").html();
            live.chage()
            $(this).addClass("current");
        })
    },
    "chage" : function() {
        live.btns.removeClass("current");
        live.box.fadeOut(function() {
            live.photo.attr("src",live.s[live.target].src);
            live.box.fadeIn()
            live.title.html(live.s[live.target].title);
        });

        live.btns.removeClass("current");
    }
}
live.init()