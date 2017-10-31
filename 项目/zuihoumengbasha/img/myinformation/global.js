var Global = {
    NeedRefreshCartInfo: true,
    CheckLogin: function () {
        $.ajax({
            dataType: 'jsonp',
            url: MemberDomain + '/async/getcustinfo',
            success: function (str) {
                var data = eval('(' + str + ')');
                if (data.CusName && data.CusName != "") {
                    var strHtml = '';
                    strHtml += '<a href="' + MemberDomain + '/home/logout" rel="nofollow"><font color="#999999">退出登录</font></a><span style="padding:0px 5px;">|</span>';
                    if (data.MsgCount > 0) {
                        strHtml += '<a href="' + MemberDomain + '/sitemsg/list" rel="nofollow" id="globalsitemsg">（' + data.MsgCount + '）</a>';
                    }
                    strHtml += '<div class="mymbs"><p><img src="http://i0.mbscss.com/img/moonbasa/2013/03/21/icon_img3.jpg" alt="" />';
                    strHtml += '<a href="' + MemberDomain + '/home/index" rel="nofollow" target="_blank">我的梦芭莎</a></p>';
                    strHtml += '<ul style="display: none;"><li><a target="_blank" rel="nofollow" href="' + MemberDomain + '/order/default#cn=22395&type=1&adsiteid=10000007" >订单查询</a></li>';
                    strHtml += '<li><a target="_blank" rel="nofollow" href="' + MemberDomain + '/rtns/index#cn=22049&type=1&adsiteid=10000007" >办理退换货</a></li>';

                    strHtml += '<li><a target="_blank" rel="nofollow" href="' + MemberDomain + '/acct/acct#cn=22396&type=1&adsiteid=10000007" >余额查询</a></li></ul></div>';
                    if (data.CusGradeId == 39) {
                        strHtml += '<img style=" display:inline; margin:0 5px;float: right;" src="http://images.moonbasa.com/Images/20120620/ico-vip-s.gif" alt="支付宝金账户" title="支付宝金账户" />';
                    }
                    strHtml += '<a href="' + MemberDomain + '/home/index" rel="nofollow" target="_blank">' + data.CusName + '</a><span>您好,</span>';

                    $("#logininfo").html(strHtml);

                    $(".mymbs").hover(function () {
                        $(".mymbs p img").attr("src", "http://i1.mbscss.com/img/moonbasa/2013/03/20/icon_img2.jpg");
                        $(".mymbs").addClass("mymbscss");
                        $(".mymbs ul").css("display", "block");

                        $(".mymbscss p a").hover(function () {
                            $(".mymbscss p img").attr("src", "http://i2.mbscss.com/img/moonbasa/2013/03/20/icon_img3.jpg");
                        }, function () {
                            if ($(".mymbs ul").css("display") == "block") { $(".mymbs p img").attr("src", "http://i0.mbscss.com/img/moonbasa/2013/03/20/icon_img2.jpg"); }
                            else { $(".mymbs p img").attr("src", "http://i0.mbscss.com/img/moonbasa/2013/03/21/icon_img3.jpg"); }
                        })
                    }, function () {
                        $(".mymbs").removeClass("mymbscss");
                        $(".mymbs ul").css("display", "none");
                        $(".mymbs p img").attr("src", "http://i1.mbscss.com/img/moonbasa/2013/03/21/icon_img3.jpg");
                    })

                    var issm = false, issp = false;

                    if (data.TopMsg && !/[\s\S]+\/sitemsg\/[\s\S]+/.test(window.location.href.toLowerCase()))
                        issm = true;

                    if (data.Prm)
                        issp = true;

                    if (issm || issp) {
                        html = '<div class="s_message">';
                        html += '<h2>';
                        html += '<span>新消息<font color="#f02568">' + (issm ? '（您有' + data.MsgCount + '条未读信息）' : '') + '</font></span>';
                        html += '<a class="s_close" onclick="SiteMsg.SetReadMsg();" href="javascript:void(0);"><img border="0" src="http://i2.mbscss.com/img/korirl/2012/07/10/m_message_botton.jpg" /></a>';
                        html += '</h2>';
                        html += '<div class="s_message_con">';
                        html += '<div class="border_div">border_div</div>';
                        html += '<div class="s_message_c">';
                        if (issm) {
                            html += '<div class="s_summary">';
                            html += '<a href="' + MemberDomain + '/sitemsg/detial?id=' + data.TopMsg.ID + '&cn=17932&type=0&adsiteid=10000007" target="_blank">' + data.TopMsg.Msg + '</a>';
                            html += '</div>';
                            html += '<div class="s_more">';
                            html += '<a target="_blank" href="' + MemberDomain + '/sitemsg/detial?id=' + data.TopMsg.ID + '&cn=17932&type=0&adsiteid=10000007">查看详情>></a>';
                            html += '</div>';
                        }
                        if (issp) {
                            html += '<div class="s_summary">';
                            html += '恭喜您，您将有机会获取梦芭莎购物礼券';
                            html += '</div>';
                            html += '<div class="s_more">';
                            html += '<a target="_blank" href="' + MemberDomain + '/member/addpromote">点击获取>></a>';
                            html += '</div>';
                        }
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="s_message_down">s_message_down</div>';
                        html += '</div>';

                        $("#divSiteMsg").html(html);
                        $("#divSiteMsg").show('slow');

                        setTimeout(SiteMsg.CloseShowMsg, 15000);
                    }
                }
            }
        });
    },
    GetCartCount: function () {

        $.ajax({ url: ShoppingCartDomain + "/shoppinghandler.aspx?action=getshoppingcartcount",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (str) {
                if (str == "") {
                    str = 0;
                }
                $("#CartCount").html(str);
            }
        });
    },






    /*获取购物车信息*/
    GetCartInfo: function (type) {
        if (!Global.NeedRefreshCartInfo) {
            if (!type) {
                $("#div_cart_list").show();
            }
            
            return;
        }


        var shoppingtest = '';
        var shop = '';
        $.ajax({ url: "http://www.moonbasa.com/Ad/GetAd?adid=4815&islazy=0",
            async: false,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (str) {
                if (str == "") {
                    str = 0;
                }
                shoppingtest = str;
                shop = shoppingtest.replace("('", "");
                shop = shoppingtest.replace("')", "");

                $.ajax({ url: ShoppingCartDomain + "/shoppinghandler/GetCartInfo",
                    async: false,
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function (json) {
                        if (json == null) {
                            $("#div_cart_none").show();

                            if (!type) {
                                $("#CartCount").html("0");
                            }

                            return;
                        }

                        if (json.CartCount == 0) {
                            $("#CartCount").html("0");

                            if (!type) {
                                $("#div_cart_none").show();
                            }
                        } else {
                            var html = "";
                            html += "<ul>";
                            for (var i = 0; i < json.CartItems.length; i++) {
                                html += "<li id='li_" + json.CartItems[i].WareCode + "_" + json.CartItems[i].KitOrder + "'>";
                                /*商品信息*/
                                html += "<a class='pro_img' target='_blank' href='" + json.CartItems[i].WebAddr + "/" + (json.CartItems[i].IsKit == "1" ? "k-" : "p-") + json.CartItems[i].StyleCode + ".html'><img width='40' height='55' src='" + json.CartItems[i].StylePicPath + "/" + json.CartItems[i].PicUrl + "' alt='" + json.CartItems[i].StyleName + "'/></a>";
                                /*商品名称*/
                                html += "<a class='pro_name' target='_blank' href='" + json.CartItems[i].WebAddr + "/" + (json.CartItems[i].IsKit == "1" ? "k-" : "p-") + json.CartItems[i].StyleCode + ".html'>" + json.CartItems[i].StyleName + "</a>";
                                /*价格信息*/
                                html += "<span class='pro_price'>￥" + json.CartItems[i].Price + "</span>";
                                /*购买数量*/
                                html += "<div class='num_box'>";
                                html += "<b class='minusDisable' onclick='Global.UpdateCartQty(\"" + json.CartItems[i].WareCode + "\",\"" + (json.CartItems[i].Qty - 1) + "\",\"" + json.CartItems[i].KitOrder + "\")'></b>";
                                html += "<label class='minicart_num' type='text' id='txt_" + json.CartItems[i].WareCode + "_" + json.CartItems[i].KitOrder + "'>" + "×" + json.CartItems[i].Qty + "</label>";
                                html += "<b class='plus' onclick='Global.UpdateCartQty(\"" + json.CartItems[i].WareCode + "\",\"" + (json.CartItems[i].Qty + 1) + "\",\"" + json.CartItems[i].KitOrder + "\")'></b>";
                                html += "<a onclick='Global.RemoveCartItem(\"" + json.CartItems[i].WareCode + "\",\"" + json.CartItems[i].KitOrder + "\")'>删除</a>";
                                html += "</div>";
                                html += "</li>";
                            }
                            html += "</ul>";

                            html += "<div class='checkout_box'>" + shop + "<br/><p><span class='fl'>共<strong>" + (json.CartCount - (json.GiftPromtoes || new Array()).length) + "</strong>件商品</span>合计：<strong>¥" + json.TotalAmount + "</strong></p><a href='http://shopping.moonbasa.com/order/orderpayment' class='checkout_btn'>去结算</a></div>";

                            $("#div_cart_list").html(html);

                            if (!type) {
                                $("#div_cart_list").show();
                            }

                            $("#CartCount").html(json.CartCount - (json.GiftPromtoes || new Array()).length);
                            Global.NeedRefreshCartInfo = false;
                        }
                    }
                });
            }
        });



    },
    /*更新购物车商品数量*/
    UpdateCartQty: function (warecode, qty, kitorder) {
        qty = qty || 0;
        if (qty == 0 || qty > 20) {
            alert("数量不正确！");
        }
        $.ajax({
            url: ShoppingCartDomain + "/shoppinghandler/UpdateCartQty",
            async: false,
            data: { wareCode: warecode, qty: qty, kitOrder: kitorder },
            dataType: "jsonp",
            jsonp: "callback",
            success: function (json) {
                Global.NeedRefreshCartInfo = true;
                Global.GetCartInfo();
            }
        });
        //$("#div_cart_list").hide();
    },
    /*移除购物车商品*/
    RemoveCartItem: function (warecode, kitorder) {
        if (confirm("你确定要删除此商品么？")) {
            $.ajax({
                url: ShoppingCartDomain + "/shoppinghandler/RemoveCartItem",
                async: false,
                data: { wareCode: warecode, kitOrder: kitorder },
                dataType: "jsonp",
                jsonp: "callback",
                success: function (json) {
                    Global.NeedRefreshCartInfo = true;
                    Global.GetCartInfo();
                }
            });
        }
        //$("#div_cart_list").hide();
    }
}

var SiteMsg = {
    CloseShowMsg: function () {
        $("#divSiteMsg").hide('slow');
        setTimeout(SiteMsg.ShowMsg, 300000);
    },
    ShowMsg: function () {
        $("#divSiteMsg").show('slow');
        setTimeout(SiteMsg.CloseMsg, 15000);
    },
    CloseMsg: function () {
        $("#divSiteMsg").hide('slow');
    },
    SetReadMsg: function () {
        $.ajax({
            dataType: 'jsonp',
            url: MemberDomain + '/async/setreadsitemessage'
        });
        SiteMsg.CloseMsg();
    }
}

$(function () {
    Global.CheckLogin();
    //Global.GetCartInfo();
    $(".Car").hover(
        function (event, type) {
            Global.GetCartInfo(type);
        }, 
        function() {
            $("#div_cart_list").hide(); $("#div_cart_none").hide();
        }
    );
});