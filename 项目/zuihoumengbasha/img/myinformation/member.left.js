$(function () {
    var showarg = $("#showarg").attr("data-showarg");
    if (showarg != null && showarg != "undefined") {
        $(".L_2_umenu ul li a").each(function () {
            if (showarg == $(this).attr("showarg")) {
                $(this).css({ "color": "#e90157", "border-left": "2px solid #e90157" });
                $(this).parent().parent().prev().removeClass().addClass("showoff");
            }
        });
    }

    $(".L_2_umenu h2").each(function () {
        var cookie_name = this.id + "_cookie";
        var cookie_name_show = this.id + "_cookieshow";
        if ($.cookie(cookie_name)) {
            $(this).removeClass().addClass("showon");        //1
            $(this).next("ul").css("display", "block");     //2
        }
        else {
            $(this).removeClass().addClass("showoff");      //3   假如要做那个神奇的交互，删了1 2 3即可- -！
        }

        $(this).next("ul").find("a").each(function () {
            var opencolor = $(this).attr("style");
            if (opencolor != undefined || $.trim(opencolor) != "") {
                $(this).parents("ul").css("display", "block");
                $(this).parents("ul").prev().removeClass().addClass("showon");
            } 
        })
    });

    $(".L_2_umenu h2").click(function () {
        $(".L_2_umenu h2").each(function () {
            if ($(this).next().is(":visible")) {
                $(this).removeClass().addClass("showon");
            }
            else {
                $(this).removeClass().addClass("showoff");
            }
        });
        if ($(this).next().is(":visible")) {
            $(this).removeClass().addClass("showoff");
            $(this).next().slideUp("slow");
            $(this).removeClass().addClass("showoff");
            $.cookie(this.id + "_cookie", null, {
                path: "/",
                expires: 1
            });
        } else {
            $(this).removeClass().addClass("showon");
            $(this).next().slideDown("slow");
            $.cookie(this.id + "_cookie", this.id, {
                path: "/",
                expires: 1
            });
            $.cookie(this.id + "_cookieshow", this.id, {
                path: "/",
                expires: 1
            });
        };
    });

});