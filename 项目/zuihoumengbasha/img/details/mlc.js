var from = document.location.href;
var to = "";
var aLinkPath = "";
var aLinkInnerText = "";
var allele = new Array();
var cn = "";
var other = "";
var type = "";
var adsiteid = "";

var url = location.hash.toLowerCase();
if (url.indexOf("cn") == -1) {
    url = location.search;
}
if (url.length > 1) {
    url = url.substring(1);
    var Url__ = url.split("&");
    for (var i = 0; i < Url__.length; i++) {
        var Url___ = Url__[i].split("=");
        if (Url___.length > 1) {
            if (Url___[0].toLowerCase() == "cn") {
                cn = Url___[1];
            }
            else if (Url___[0].toLowerCase() == "type") {
                type = Url___[1];
            }
            else if (Url___[0].toLowerCase() == "adsiteid") {
                adsiteid = Url___[1];
            }
            else if (Url___[0].toLowerCase() == "other") {
                other = Url___[1];
            }
        }
    }
}
function parseHtml() {
    if (typeof (jQuery) == undefined) {
        BindClickNoJQuery(document.body.childNodes, "");
    }
    else {
        BindClickWithJQuery($("body").eq(0).children(), "");
    }
};

function BindClickWithJQuery(a, p) {
    var f = 0;
    var posstr = '';
    var posarr = new Array();
    a.each(function () {
        if ($(this)[0].nodeName != "!" && $(this)[0].nodeName.toLowerCase() != "script") {
            f++;
            if (p != "") {
                posstr = p + "/" + f;
                posarr = posstr.split("/");
            }
            else {
                posstr = f;
                posarr[0] = "";
            }
            var b = $(this).children();
            if ($(this)[0].nodeName.toLowerCase() == "a" || $(this)[0].nodeName.toLowerCase() == "div" || $(this)[0].nodeName.toLowerCase() == "img" || $(this)[0].nodeName.toLowerCase() == "span" || $(this)[0].nodeName.toLowerCase() == "area") {
                $(this).attr("pos", posstr);
                var obj = new Object();
                if ($(this)[0].nodeName.toLowerCase() == "a" || $(this)[0].nodeName.toLowerCase() == "area" && $(this).attr("href") != null) {
                    obj.to = $(this).attr("href");
                }
                else {
                    if ($(this).attr("onclick") != null) {
                        obj.to = $(this).attr("onclick");
                    }
                    else {
                        obj.to = "";
                    }
                }
                obj.alinkpath = posstr;
                if (navigator.appName.indexOf("Explorer") > -1) {
                    obj.alinkinnertext = ($(this)[0].innerText || "");
                }
                else {
                    obj.alinkinnertext = ($(this)[0].textContent || "");
                }
                if (obj.alinkinnertext.length == 0) {
                    obj.alinkinnertext = ($(this).attr("alt") || "");
                }
                if ($(this).attr("onclick") != null || $(this)[0].nodeName.toLowerCase() == "a" || $(this)[0].nodeName.toLowerCase() == "area") {
                    AttachEvent($(this)[0], "mousedown", gettrack, obj);
                }
                else {
                    if (hasBindClick($(this))) {
                        for (key in $.data($(this)[0], "events")["click"]) {
                            if ($.data($(this)[0], "events")["click"][key].handler) {
                                obj.to = $.data($(this)[0], "events")["click"][key].handler.toString().replace(/\n/g, "");
                            }
                            else if ($.data($(this)[0], "events")["click"][key]) {
                                obj.to = $.data($(this)[0], "events")["click"][key].toString().replace(/\n/g, "");
                            }
                            else { obj.to = ""; }
                            obj.to = obj.to.replace(/\r/g, "");
                            obj.to = obj.to.replace(/\t/g, "");
                            if (obj.to.length > 100) {
                                obj.to = obj.to.substring(0, 100);
                            }
                            if (obj.to.length > 0) { break; }

                        }
                        AttachEvent($(this)[0], "mousedown", gettrack, obj);
                    }
                }
                allele.push($(this)[0]);
            }
            BindClickWithJQuery(b, posstr);
        }
    });
}

function BindClickNoJQuery(a, p) {
    var f = 0;
    var posstr = '';
    var posarr = new Array();
    for (var e = 0; e < a.length; e++) {
        if (a[e].tagName && a[e].tagName != '!' && a[e].tagName != 'SCRIPT') {
            f++;
            if (p != '') {
                posstr = p + '/' + f;
                posarr = posstr.split('/');
            }
            else {
                posstr = f;
                posarr[0] = '';
            }
            var b = a[e].childNodes;
            if (a[e].tagName.toLowerCase() == 'a' || a[e].tagName.toLowerCase() == 'img' || a[e].tagName.toLowerCase() == 'span' || a[e].tagName.toLowerCase() == 'div' || a[e].tagName.toLowerCase() == 'area') {
                a[e].pos = posstr;
                var obj = new Object();
                if (a[e].tagName.toLowerCase() == 'a' || a[e].tagName.toLowerCase() == 'area' && a[e].getAttributeNode('href') != null) {
                    if (a[e].getAttributeNode('href').nodeValue.length == 0) {
                        if (a[e].getAttributeNode('onclick')) {
                            obj.to = a[e].getAttributeNode('onclick').nodeValue;
                        }
                        else {
                            obj.to = "";
                        }
                    }
                    else {
                        obj.to = a[e].getAttribute('href', 0);
                    }
                }
                else {
                    if (a[e].getAttributeNode('onclick')) {
                        obj.to = a[e].getAttributeNode('onclick').nodeValue;
                    }
                    else {
                        obj.to = "";
                    }
                }
                obj.alinkpath = posstr;
                if (navigator.appName.indexOf("Explorer") > -1) {
                    obj.alinkinnertext = (a[e].innerText || "");
                }
                else {
                    obj.alinkinnertext = (a[e].textContent || "");
                }
                if (obj.alinkinnertext.length == 0) {
                    obj.alinkinnertext = (a[e].getAttribute("alt") || "");
                }
                if (a[e].getAttribute("onclick") != null || a[e].tagName.toLowerCase() == "a" || a[e].tagName.toLowerCase() == "area") {
                    AttachEvent(a[e], "mousedown", gettrack, obj);
                }
                else if (a[e].id) {
                    if (hasBindClick(a[e].id)) {
                        obj.to = "";
                        AttachEvent(a[e], "mousedown", gettrack, obj);
                    }
                }

                allele.push(a[e]);
            }
            BindClickNoJQuery(b, posstr);
        }
    }
}

function hasBindClick(dom) {
    if ($.data(dom[0], "events") == undefined) {
        return false;
    }
    else {
        if ($.data(dom[0], "events")["click"] == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
}
function AttachEvent(target, eventName, handler, argsObject) {
    var eventHander = handler;
    if (argsObject) {
        eventHander = function (e) {
            handler.call(argsObject, e);
        };
    }
    if (window.attachEvent) {
        target.attachEvent("on" + eventName, eventHander);
    }
    else {
        target.addEventListener(eventName, eventHander, false);
    }
}
function gettrack(event) {
    event = event || window.event;
    var pos = getClientPos(event);
    var screenwidth = window.document.body.offsetWidth;
    var obj = document.getElementById('clickstattrack');
    if (obj) {
        obj.parentNode.removeChild(obj);
    }
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.id = 'clickstattrack';
    if (document.getElementById("defaultb_mlc")) {
        js.src = 'http://an.moonbasa.com/c.do?to=' + encodeURIComponent(this.to) + '&from=' + encodeURIComponent("http://www.moonbasa.com/defaultb") + '&alinkpath=' + this.alinkpath + '&alinkinnertext=' + encodeURIComponent(this.alinkinnertext) + '&left=' + pos.x + '&top=' + pos.y + '&adsiteid=' + adsiteid + '&cn=' + cn + '&type=' + type + '&other=' + encodeURIComponent(other) + '&siteid=' + siteid + '&_=' + Math.random();
    } else {
        js.src = 'http://an.moonbasa.com/c.do?to=' + encodeURIComponent(this.to) + '&from=' + encodeURIComponent(document.location.href) + '&alinkpath=' + this.alinkpath + '&alinkinnertext=' + encodeURIComponent(this.alinkinnertext) + '&left=' + (pos.x - screenwidth / 2) + '&top=' + pos.y + '&adsiteid=' + adsiteid + '&cn=' + cn + '&type=' + type + '&other=' + encodeURIComponent(other) + '&siteid=' + siteid + '&_=' + Math.random();
    }
    document.getElementsByTagName('head')[0].appendChild(js);
};

AttachEvent(window, "load", parseHtml, "");

var hashurl = document.location.hash;
var code = "";
if (hashurl.indexOf("#") != -1) {
    try {
        var str = hashurl.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == "anmapcode") {
                var _script = document.createElement("script");
                _script.type = "text/javascript";
                _script.src = "http://an.moonbasa.com/showmap.js";
                document.getElementsByTagName("head")[0].appendChild(_script);
            }
            if (strs[i].split("=")[0] == "hotclickmapcode") {
                document.write('<iframe id="hotclick_iframeA" name="hotclick_iframeA" src="" width="0" height="0" style="display:none;" ><' + '/iframe>');

                window.onload = function () {
                    SetFrameHeight();
                }
            }
        }
    } catch (ex) { }
};

function SetFrameHeight() {
    hashH = document.body.scrollHeight;
    urlC = "http://bireport.moonbasa.com/hotclick.html";
    document.getElementById("hotclick_iframeA").src = urlC + "#" + hashH;
}
document.onmousedown = docMouseDown;
function docMouseDown(event) {
    event = event || window.event;
    var pos = getClientPos(event);
    var screenwidth = window.document.body.offsetWidth;
    var trackobj = document.getElementById('clickstattrack');
    if (trackobj) {
        trackobj.parentNode.removeChild(trackobj);
        return false;
    }
    var obj = document.getElementById('mousedownstattrack');
    if (obj) {
        obj.parentNode.removeChild(obj);
    }
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.id = 'mousedownstattrack';
    if (document.getElementById("defaultb_mlc")) {
        js.src = 'http://an.moonbasa.com/c.do?to=&from=' + encodeURIComponent("http://www.moonbasa.com/defaultb") + '&alinkpath=&alinkinnertext=&left=' + pos.x + '&top=' + pos.y + '&adsiteid=' + adsiteid + '&cn=' + cn + '&type=' + type + '&other=' + encodeURIComponent(other) + '&siteid=' + siteid + '&_=' + Math.random();
    } else {
        js.src = 'http://an.moonbasa.com/c.do?to=&from=' + encodeURIComponent(document.location.href) + '&alinkpath=&alinkinnertext=&left=' + (pos.x - screenwidth / 2) + '&top=' + pos.y + '&adsiteid=' + adsiteid + '&cn=' + cn + '&type=' + type + '&other=' + encodeURIComponent(other) + '&siteid=' + siteid + '&_=' + Math.random();
    }
    document.getElementsByTagName('head')[0].appendChild(js);
};

function getClientPos(ev) {
    var point = { x: 0, y: 0 };
    if (typeof window.pageYOffset != 'undefined') {
        point.x = window.pageXOffset;
        point.y = window.pageYOffset;
    }
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        point.x = document.documentElement.scrollLeft;
        point.y = document.documentElement.scrollTop;
    }
    else if (typeof document.body != 'undefined') {
        point.x = document.body.scrollLeft;
        point.y = document.body.scrollTop;
    }
    point.x += ev.clientX;
    point.y += ev.clientY;
    return point;
}