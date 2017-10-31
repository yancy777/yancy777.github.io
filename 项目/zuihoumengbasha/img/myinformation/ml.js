
(function(){
	"use strict"; 
	var counter = 0,alpnum = /[^a-z0-9_]/ig; 
	window.SwfStore = function(config){
		config = config || {};
		var defaults = {
			swf_url: '',
			namespace: 'swfstore',
			debug: false,
			timeout: 1,
			onready: null,
			onerror: null
		},key;
		for(key in defaults){
			if(defaults.hasOwnProperty(key)){
				if(!config.hasOwnProperty(key)){
					config[key] = defaults[key];
				}
			}
		}
		config.namespace = config.namespace.replace(alpnum, '_');
		
		if(window.SwfStore[config.namespace]){
			throw "There is already an instance of SwfStore using the '" + config.namespace + "' namespace. Use that instance or specify an alternate namespace in the config.";
		}
		
		this.config = config;
		function id(){
			return "SwfStore_" + config.namespace + "_" +  (counter++);
		}
		
		function div(visible){
			var d = document.createElement('div');
			document.body.appendChild(d);
			d.id = id();
			if(!visible){
				d.style.position = "absolute";
				d.style.top = "-2000px";
				d.style.left = "-2000px";
			}
			return d;
		}
		this.log = function(){}; 
		SwfStore[config.namespace] = this;
	
		var swfContainer = div(config.debug),swfName = id(),flashvars = "logfn=SwfStore." + config.namespace + ".log&amp;" + 
			"onload=SwfStore." + config.namespace + ".onload&amp;" +  
			"onerror=SwfStore." + config.namespace + ".onerror&amp;" + 
			"LSOName=" + config.namespace;
			
		swfContainer.innerHTML = '<object height="1" width="1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + 
			swfName + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
			'	<param value="' + config.swf_url + '" name="movie">' + 
			'	<param value="' + flashvars + '" name="FlashVars">' +
			'	<param value="always" name="allowScriptAccess">' +
			'	<embed height="1" align="middle" width="1" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
			'flashvars="' + flashvars + '" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" ' +
			'name="' + swfName + '" bgcolor="#ffffff" src="' + config.swf_url + '">' +
			'</object>';
		
		this.swf = document[swfName] || window[swfName];
		
		this._timeout = setTimeout(function(){
			if(config.onerror){
				config.onerror();
			}
		}, config.timeout * 1000*30);
	};
	function checkData(data){
		if(typeof data === "function"){
			throw 'SwfStore Error: Functions cannot be used as keys or values.';
		}
	}

	SwfStore.prototype = {
		version: "1.5",
		ready: false,
		set: function(key, value){
			this._checkReady();
			checkData(key);
			checkData(value);
			this.swf.set(key, value);
		},
		get: function(key){
			this._checkReady();
			checkData(key);
			return this.swf.get(key);
		},
		getAll: function(){
			this._checkReady();
			var data = this.swf.getAll();if(data.__flashBugFix){
				delete data.__flashBugFix;
			}
			return data;
		},
		clear: function(key){
			this._checkReady();
			checkData(key);
			this.swf.clear(key);
		},
		_checkReady: function(){
			if(!this.ready){
				throw 'SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance.';
			}
		},
		"onload": function(){
			var that = this;
			setTimeout(function(){
			  clearTimeout(that._timeout);
			  that.ready = true;
			  that.set('__flashBugFix','1');
			  if(that.config.onready){
			    that.config.onready();
			  }
			}, 0);
		},
		onerror: function(){
			clearTimeout(this._timeout);
			if(this.config.onerror){
				this.config.onerror();
			}
		}
		
	};
	
	
	window.zz_analyze={
			analyze:document.createElement('iframe'),
			zz_fail:function(){
				zz_analyze.analyze.src="";
			}
	};
	
	zz_analyze.analyze.src="http://an.moonbasa.com/cm.jsp";
	zz_analyze.analyze.scrolling='no';
	zz_analyze.analyze.width='1';
	zz_analyze.analyze.height='1';
	zz_analyze.analyze.marginheight='0';
	zz_analyze.analyze.marginwidth='0';
	zz_analyze.analyze.frameborder='0';
	zz_analyze.analyze.style.display='none';
	var zz_node=document.getElementsByTagName('script')[0];
	zz_node.parentNode.insertBefore(zz_analyze.analyze,zz_node);
	setTimeout('zz_analyze.zz_fail()',10000);
}());

Array.prototype.S = String.fromCharCode(2);
Array.prototype.in_array = function (e) {
    var r = new RegExp(this.S + e + this.S);
    return (r.test(this.S + this.join(this.S) + this.S));
};

var wl = window.location,dr = document.referrer,de = new Date(),t = document.title,cn = "",other = "",type = "",an_adsiteid = "",uid = "", http_uid,flash_uid,ma_hostname = "http://an.moonbasa.com/",c = screen.width + "*" + screen.height,support_flash = false, matrace_cookie,url = location.hash.toLowerCase();
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
            	an_adsiteid = Url___[1];
            }
            else if (Url___[0].toLowerCase() == "other") {
                other = Url___[1];
            }
        }
    }
}
var matrace_rt="";
if(typeof(_TraceRequestTime) != "undefined")
{
	matrace_rt = _TraceRequestTime;
}
var matrace_et="";
if(typeof(_TraceEndTime) != "undefined")
{
	matrace_et = _TraceEndTime;
}


function MAnewGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

function flashChecker() {
    var hasFlash = 0; 
    var flashVersion = 0; 
    if (window.attachEvent && navigator.userAgent.indexOf('Opera') === -1) {
        try {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = 1;
                VSwf = swf.GetVariable("$version");
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        }
        catch (e) { }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return { f: hasFlash, v: flashVersion };
}

var fls = flashChecker();
var mySwfStore;
if(fls.f){
	AttachEvent(window,"load",
			function(){
			try
			{
				mySwfStore = new SwfStore({
			    namespace: 'matrace',
			    swf_url: 'http://an.moonbasa.com/an.swf?_=' + Math.random(),
			    timeout: 1,
			    debug: false,
			    onready: function () {
			        support_flash = true;
			        flash_uid = mySwfStore.get("matrace_uid");
			        if (flash_uid) {
			            var ma_key = new Array();
			            var ma_value = new Array();
			            ma_key.push("MaUid");
			            ma_value.push(flash_uid);
			            var key_value;
			            key_value = MAupdatePVH();
			            if (key_value) {
			                ma_key.push(key_value[0]);
			                ma_value.push(key_value[1]);
			            }
			            key_value = MAupdatePBH();
			            if (key_value) {
			                ma_key.push(key_value[0]);
			                ma_value.push(key_value[1]);
			            }
			            key_value = MAupdateACH();
			            if (key_value) {
			                ma_key.push(key_value[0]);
			                ma_value.push(key_value[1]);
			            }
			            key_value = MAupdateRCH();
			            if (key_value) {
			                ma_key.push(key_value[0]);
			                ma_value.push(key_value[1]);
			            }
			            key_value = MAupdateCID();
			            if (key_value) {
			                ma_key.push(key_value[0]);
			                ma_value.pust(key_value[1]);
			            }
			            var jsonp = new MAJsonpUtil();
			            jsonp.url = ma_hostname+"setcookie.do?key=" + ma_key.join("|") + "&value=" + ma_value.join(",") + "&_=" + Math.random();
			            jsonp.process();
			        }
			        else {
			        	var jsonp = new MAJsonpUtil();
			            jsonp.url = ma_hostname+"getcookie.do?_="+Math.random();
			            jsonp.process();
			        }
			        if(typeof(MAgetPVH)=="function"){
			        	MAgetPVH(MAgetCookieValue("matrace_pvh"));
			        }
			    },
			    onerror: function () {
			        support_flash = false;
			        var jsonp = new MAJsonpUtil();
			        jsonp.url = ma_hostname+"getcookie.do?_="+Math.random();
			        jsonp.process();
			    }
			});
		}
		catch(e)
		{
			return false;
		}
	
	},"");

}else{
		 support_flash = false;
	     var jsonp = new MAJsonpUtil();
	     jsonp.url = ma_hostname+"getcookie.do?_="+Math.random();
	     jsonp.process();
}

function MAgetcookie(data) {
    matrace_cookie = data;
    var ma_key = new Array();
    var ma_value = new Array();
    http_uid = data["MaUid"];
    if (http_uid) {
        if (support_flash) {
            mySwfStore.set("matrace_uid", http_uid);
        }
    }
    else {
        uid = MAnewGuid();
        if (support_flash) {
            mySwfStore.set("matrace_uid", uid);
        }
        ma_key.push("MaUid");
        ma_value.push(uid);
    }
    var key_value;
    key_value = MAupdatePVH();
    if (key_value) {
        ma_key.push(key_value[0]);
        ma_value.push(key_value[1]);
    }
    key_value = MAupdatePBH();
    if (key_value) {
        ma_key.push(key_value[0]);
        ma_value.push(key_value[1]);
    }
    key_value = MAupdateACH();
    if (key_value) {
        ma_key.push(key_value[0]);
        ma_value.push(key_value[1]);
    }
    key_value = MAupdateRCH();
    if (key_value) {
        ma_key.push(key_value[0]);
        ma_value.push(key_value[1]);
    }
    key_value = MAupdateCID();
    if (key_value) {
        ma_key.push(key_value[0]);
        ma_value.push(key_value[1]);
    }
    
    if(ma_key.length>0&&ma_value.length>0)
    {
	    var jsonp = new MAJsonpUtil();
	    jsonp.url = ma_hostname+"setcookie.do?key=" + ma_key.join("|") + "&value=" + ma_value.join(",") + "&_=" + Math.random();
	    jsonp.process();
    }
}

function MAsetCookieValue(key, value) {
    if (support_flash) {
        mySwfStore.set(key, value);
        if(key=="matrace_pvh" || key=="matrace_pbh" || key=="matrace_rch" || key=="matrace_ach")
        {
        	return new Array(key,value);
        }
        else
        {
        	return null;
        }
    }
    else {
        return new Array(key,value);
    }
}

function MAgetCookieValue(key) {
    if (support_flash) {
        var value = mySwfStore.get(key);
        return value;
    }else {
        if (matrace_cookie) {
            for (var element in matrace_cookie) {
                if (element == key) {
                    return matrace_cookie[key];
                }
            }
            return null;
        }
        else {
            return null;
        }
    }
}


function MAgetStrQueue(newlist, list) {
    for (var i = 0; i < newlist.length; i++) {
        if (list.in_array(newlist[i])) {
            list.push(newlist[i]);
            for (var j = 0; j < list.length-1; j++) {
                if (list[j] == newlist[i]) {
                    list.splice(j,1);
                }
            }
        }
        else {
        	if(list.push(newlist[i])>30)
            {
            	list.shift();
            }
        }
    }
    return list.join("|");
}

function MAupdatePVH() {
    var reg = new RegExp("[pk]-(\\w+)\.html"),strurl = document.location.href,result = reg.exec(strurl),PVH;
    if (result) {
        PVH = result[1];
        var oldPVH = MAgetCookieValue("matrace_pvh");
        if (oldPVH) {
            var PVHList = oldPVH.split("|");
            return MAsetCookieValue("matrace_pvh", MAgetStrQueue(new Array([siteid + "_" + PVH]), PVHList));
        }
        else {
            return MAsetCookieValue("matrace_pvh", siteid + "_" + PVH);
        }
    }
}

function MAupdatePBH() {
    if (document.location.href.indexOf("http://shopping.moonbasa.com/order/ordershopcart.aspx") == 0) {
        var result,reg = new RegExp("<span class=[\"]{0,1}J_del operation[\"]{0,1} .*?data-warecode=[\"]{0,1}([\\w\\d]+)-[\\w\\d]+[\"]{0,1}","ig"),strcontent = document.body.innerHTML;
        result = reg.exec(strcontent);
        var PBH,PBHList = new Array();
        while (result) {
            PBH = siteid + "_" + result[1];
            PBHList.unshift(PBH);
            result = reg.exec(strcontent);
        }
        var oldPBH = MAgetCookieValue("matrace_pbh");
        if (oldPBH) {
            var oldPBHList = oldPBH.split("|");
            return MAsetCookieValue("matrace_pbh", MAgetStrQueue(PBHList, oldPBHList));
        }
        else {
        	while(PBHList.length>10)
        	{
                PBHList.pop();
        	}
            return MAsetCookieValue("matrace_pbh",  PBHList.join("|"));
        }
    }
}

function MAupdateACH() {
    if (type == "0" && cn != "0") {
        var ACH = cn,oldACH = MAgetCookieValue("matrace_ach");
        if (oldACH) {
            var ACHList = oldACH.split("|");
            return MAsetCookieValue("matrace_ach", MAgetStrQueue(new Array([ACH]), ACHList));
        }
        else {
            return MAsetCookieValue("matrace_ach", ACH);
        }
    }
}

function MAupdateRCH() {
	if (type != "0" && cn != "0"&&type!=""&cn!="") {
        var RCH = other.split(":");
        if(RCH[0] == "acid"){
        	RCH = RCH[1];
        }
        else{
        	RCH = ""
        }
        
        if(RCH != "") {
	        var oldRCH = MAgetCookieValue("matrace_rch");
	        if (oldRCH) {
	            var RCHList = oldRCH.split("|");
	            return MAsetCookieValue("matrace_rch", MAgetStrQueue(new Array([RCH]), RCHList));
	        }
	        else {
	            return MAsetCookieValue("matrace_rch", RCH);
	        }
        }
    }

}

function MAupdateCID() {
	var strUrl=document.location.href;
    if (strUrl.toLowerCase().indexOf("http://member.moonbasa.com/member/")==0) {
        var ciddom = document.getElementById("hdCID");
        if(ciddom)
        {
            return MAsetCookieValue("matrace_cid", ciddom.getAttribute("value"));
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
    if (window.attachEvent)
    {
        target.attachEvent("on" + eventName, eventHander);
    }
    else
    {
        target.addEventListener(eventName, eventHander, false);
    }
};

src = 'http://an.moonbasa.com/v.do?siteid=' + siteid + '&adsiteid=' + an_adsiteid + '&cn=' + cn + '&type=' + type + '&r=' + encodeURIComponent(dr) + '&other=' + encodeURIComponent(other) + '&t=' + encodeURIComponent(t) + '&c=' + c + '&ck=' + CookieEnable() + '&brw=' + encodeURIComponent(SysEnable()) + '&rt=' + encodeURIComponent(matrace_rt) + '&et='+ encodeURIComponent(matrace_et) +'&roid1=' + Math.random();
//src = encodeURI﻿(src);
function MAJsonpUtil() {
    this.url = '';
    this.process = function () {
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.src = this.url;
        document.getElementsByTagName('head')[0].appendChild(js);
    };
}

function GetRequestSource() {
    try{
        //如果是蜘蛛
        if (/(spider|bot|python-urllib|whatsup)/.test(navigator.userAgent.toLowerCase())) {
            return "spider";
        }
        else {
            //来源未知,暂时只处理蒙蒂埃莫的
            if (document.referrer == "" &&
                /(www.monteamor|www.rutisher|www.suorang|www.ing2ing|www.baoyeah|f.moonbasa.com)/.test(document.location.href.toLowerCase())) return "unknowSource";

            return "browser";
        }
    }catch(e){
        return "browser";
    }
}

//用做流量过滤
//if (GetRequestSource() == "browser")
//{
	var jsonp1 = new MAJsonpUtil();
	jsonp1.url = src;
	jsonp1.process();
//}

function CookieEnable() {
	var result = "false";
	if (navigator.cookiesEnabled)
		return "true";

	document.cookie = "testcookie=yes;";

	var cookieSet = document.cookie;

	if (cookieSet.indexOf("testcookie=yes") > -1)
		result = true;

	document.cookie = "";

	return result;
}


function SysEnable() {
     return	navigator.appName+" "+navigator.appVersion;
}

var viz_visitor_level=0;
function getMACookie(c_name) {
    if (document.cookie.length>0)
    {
    	var c_start=document.cookie.indexOf(c_name + "=");
    	if (c_start!=-1)
    	{ 
    		c_start=c_start + c_name.length+1 ;
    		c_end=document.cookie.indexOf(";",c_start);
    		if (c_end==-1) c_end=document.cookie.length;
    		return unescape(document.cookie.substring(c_start,c_end));
    	} 
    }
    return "";
}
if(getMACookie("matrace_pbh")){
	viz_visitor_level=1;
}


