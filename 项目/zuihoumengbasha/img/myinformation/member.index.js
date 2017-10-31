;
// 感兴趣商品
$(function () { 
    $("#changeCare").click(function () {
        var pageIndexEle = $("#changeCarePageIndex");
        var pageIndex = parseInt(pageIndexEle.val());
        var cusCode = $("#hidCusCode").val();
        $.ajax({
            url: 'http://etl.moonbasa.com/recommend.aspx',
            dataType: 'jsonp',
            data: { method: 'personalized', model: 1, cid: cusCode, pagesize: 4, pageno: pageIndex, productinfo: 'full', defaultcategory: '' },
            success: function (str) {
                var data = eval('(' + str + ')');
                if (data != null && data.length > 0) {
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        if (i == data.length - 1)
                            html += "<dl>";
                        else
                            html += "<dl class=\"mr\">"
                        html += "<dt><a href=\"http://item.moonbasa.com/" + (data[i].isKit == 'true' ? "k-" : "p-") + data[i].styleCode + ".html?cn=8370&type=1&adsiteid=10000007\">"
                        html += "    <img src=\"" + data[i].picUrl + "\" width=\"162px\" height=\"218px\" title=\"" + data[i].styleName + "\" />"
                        html += "</a></dt>"
                        html += "<dd>"
                        html += "  <span class=\"price-icon\" style=\"color: #D80178; font-weight: bold;\">￥</span>"
                        html += "  <span class=\"interval\" style=\"color: #D80178; font-weight: bold;\">" + data[i].salePrice.toFixed(2) + "</span>"
                        html += "  <span class=\"price-icon\" style=\"color: #CACACA\">￥</span><del style=\"color: #CACACA\">" + data[i].marketPrice.toFixed(2) + "</del></dd>"
                        html += "</dl>"
                    }
                    $(".goods-content").html(html);
                }
                else {
                    //$(".care-Goods").hide();
                    pageIndexEle.val("1");
                    $("#changeCare").trigger("click");
                }
            }
        });
        pageIndexEle.val(++pageIndex);
    }).trigger("click"); 
});