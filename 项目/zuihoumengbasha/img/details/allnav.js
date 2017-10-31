


$(document).ready(function () {
    var nav = $('#nav'), menu = $('.cata-group'), subcategory = $('.subcategory'), smallmenu = $('.cata-group-btn'), smallmenulink = $('.cata-hot-link');
    nav.hover(function () {
        menu.show();
    }, function () {
        menu.hide();
    })
    menu.delegate('dl', 'mouseenter', function () {
        subcategory.children().addClass('hidden');
        var i = $('dl').index(this);
        var s = subcategory.children().eq(i);
        s.removeClass('hidden');
        $(this).addClass('over-group');
        subcategory.removeClass('hidden');
        var e = $(this), z = 20, u = 0;
        var c = e.offset(),
           y = e.height(),
           v = nav.offset(),
           t = subcategory.height(),
           w = $(window).height(),
           q = $(window).scrollTop(),
           r = w - t - (c.top - q),
           x = Math.abs(c.top - q - v.top),
           b = w - (c.top - q),
           p = c.top - v.top;

        /*if (r <= 0) {
            r = Math.abs(r);
            if (b > y) {
                u = b - y;
                if (u > z) {
                    p = p - r - z + 7;
                } else {
                    p = p - r;
                };
            } else {
                p = p - r + z + b + 20;
            };
        };*/

        if (p < 0) { p = 0; };
        subcategory.css("top", p + "px");
        subcategory.live("mouseenter", function () {
            menu.children().removeClass("over-group");
            menu.children().eq(i).addClass("over-group");
            subcategory.removeClass("hidden");
        });
    });
    subcategory.delegate(subcategory, 'mouseleave', function () {
        $(this).addClass("hidden");
        subcategory.addClass("hidden");
        menu.children().removeClass("over-group");
    });
    menu.delegate('dl', 'mouseleave', function () {
        $(this).removeClass('over-group');
        subcategory.addClass('hidden');
    });
    //    if (!($.browser.msie && $.browser.version == 6.0)) {
    //        window.onscroll = window.onload = function () {
    //            var st = $(window).scrollTop();
    //            var stvalue = parseInt(st / 300) - 2;
    //            category(stvalue, st);
    //            if (parseInt(st) >= 300) {
    //                nav.css({ "position": "fixed", "top": "0px" });
    //            } else if (parseInt(st) < 300 || stvalue == -1) {
    //                nav.css({ "position": "relative", "top": "-540px" });
    //                smallmenulink.children("p").css({ height: "26px", lineHeight: "26px" });
    //            };
    //        };
    //    };
    if ($.browser.msie && parseInt($.browser.version) < 9) {
        window.onresize = window.onload = function () {
            var bodywidth = $(window).width();
            if (bodywidth < 1200) {
                $("body").addClass("w1200");
            } else {
                $("body").removeClass("w1200");
            };
            if (bodywidth < 1300) {
                $("#ShowFlash").hide();
            } else {
                $("#ShowFlash").show();
            };
        };
    };
    function category(stvalue, st) {
        if (stvalue > nav.data("scrolltop")) {
            if (stvalue <= smallmenu.length) {
                for (var i = 0; i <= stvalue; i++) {
                    var objh = smallmenulink.eq(i).children("p").css("height");
                    if (objh != "0px") {
                        if ($.browser.msie && parseInt($.browser.version) < 9) {
                            smallmenulink.eq(i).children("p").animate({ height: "0px", lineHeight: "0px" }, 600);
                        } else {
                            smallmenulink.eq(i).children("p").css({ height: "0px", lineHeight: "0px" });
                        };
                    };
                };

            } else if (stvalue > smallmenu.length) {
                smallmenulink.children("p").css({ height: "0px", lineHeight: "0px" });
            };
        } else if (stvalue < nav.data("scrolltop")) {
            if (0 <= stvalue && stvalue <= smallmenu.length) {
                for (var i = smallmenu.length; i >= stvalue; i--) {
                    var objh = smallmenulink.eq(i).children("p").css("height");
                    if (objh != "26px") {
                        if ($.browser.msie && parseInt($.browser.version) < 9) {
                            smallmenulink.eq(i).children("p").animate({ height: "26px", lineHeight: "26px" }, 600);
                        } else {
                            smallmenulink.eq(i).children("p").css({ height: "26px", lineHeight: "26px" });
                        };
                    };
                };
            };
        }
        nav.data("scrolltop", stvalue);

    };
    if (!$.browser.mozilla && !$.browser.opera) {
        $(".floorPro-img").hover(function () {
            $(this).animate({ marginLeft: "-10px" }, 400);
        },
        function () {
            $(this).animate({ marginLeft: "110px" }, 400);
        });
    };
});