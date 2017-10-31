/*
 require.config({
 paths:{
 "zepto":'lib/zepto.min'
 },
 shim:{
 'zepto':{
 exports:"Zepto"
 }
 }
 });
 //zepto == 'lib/zepto.min';
 //zepto => (Zepto==$)  通过exports暴露出来的对象

 require(["zepto"],function($){

 var oUsername = $("#login-page .username");
 var oPassword = $("#login-page .password");
 var oLoginBtn = $("#login-page .red-btn");
 var oRemember = $("#login-page .remember");

 $("#chh").on("tap",function(){
 console.log(1)
 })

 oPassword.on("keyup",function(){
 /!*    var val = $(this).val();
 val = val.replace(/[\u4e00-\u9fa5]/g,'');*!/
 //$(this).val(val)
 $(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));
 //Zepto(this) === $(this)
 //console.log( this.value)

 });

 oLoginBtn.on("tap",function(){
 var name = oUsername.val();
 var passwrod = oPassword.val();

 if(name.length<6){
 /!*用户名错误*!/
 alert("用户名格式不正确");
 return;
 }

 if(passwrod.length<6){
 /!*密码错误*!/
 alert("请输入正确的密码")
 return;
 }

 alert("验证通过");

 /!*ajax请求*!/
 //status=login&userID=sunhaiqing&password=123456
 $.get("http://datainfo.duapp.com/shopdata/userinfo.php",
 {"status":"login","userID":name,"password":passwrod},function(data){
 console.log(data)
 if(data==2){
 alert("用户名密码不相符")
 }else if(data==0){
 alert("用户名不存在")
 }else {
 /!*判断是否要记住密码*!/
 if(oRemember.hasClass("selected")){
 /!*需要记住密码，下次自动登录*!/
 window.localStorage.setItem("userID",name)
 }else {
 window.localStorage.setItem("userID","");
 window.sessionStorage.setItem("userID",name)
 }
 alert("登录成功");
 window.location.href = "mine.html"
 }
 })


 });
 $("#login-page .select-wrap").on("tap",function(){

 $(this).toggleClass("selected");

 if($(this).hasClass("show-password")){

 if($(this).hasClass("selected")){
 //oPassword.prop("type","text")
 oPassword.attr("type","text")
 }else {
 // oPassword.prop("type","password")
 oPassword.attr("type","password")
 }
 }
 })
 });
 //m1 == (Zepto==$)  //通过一个形参接受exports暴露出来的对象*/

require.config({
    paths:{
        "zeptoQuery":"lib/zepto.min",
        "iscroll":"lib/iscroll",
        "fnBase":"lib/fnBase"
    },

    shim:{
        "iscroll":{
            exports:"IScroll"
        },
        "zeptoQuery":{
            exports:"Zepto"
        }
    }
});
//Zepto == $ zepto
//JQuery == $

require(["zeptoQuery","iscroll","fnBase"],function($,Scr,fnBase){
    fnBase.myalert();
    var oSortList = $("#list-page .sort-list");
    var oProList = $("#list-page .product-list");
    var oScrollWrap =  $("#scroll-wrap");
    var load = 0;/*加载或刷新的状态*/
    var classID;
    var pageNum = 0;
    var myScroll = new Scr("#scroll-wrap",{
        scrollbars:true,/*显示滚动条*/
        shrinkScrollbars: 'scale',/*弹性滚动条*/
        fadeScrollbars: true,/*自动隐藏*/
        click:true
    });

    oScrollWrap.on("touchmove",function(){
        console.log(myScroll.y)
        console.log(myScroll.maxScrollY)
        if(myScroll.maxScrollY-myScroll.y>60){

            load = 1;
        }else if(myScroll.y>60){

            load = 2;
        }
    });
    oScrollWrap.on("touchend",function(){
        if(load==1){
            console.log("加载");
            getGoodsData(false);
        }else if(load==2){
            console.log("刷新");
            getGoodsData(true);
        };
        load=0;
    });


    $.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){

        var oData = data;
        console.log(typeof data === "string");
        if(typeof data === "string"){
            oData = JSON.parse(data)
        }

        var str = "";
        for(var i=0; i<oData.length;i++){
            console.log(oData[i].icon);
            str+='<li class="iconfont" data-id="'+oData[i].classID+'">'+oData[i].icon+'</li>'
        }
        oSortList.html(str)

    });
    getGoodsData(true);
    function getGoodsData(reload){

        /*如果要刷新页面的话*/
        if(reload){
            pageNum =0;
        }
        $.get("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"pageCode":pageNum++,"linenumber":5,"classID":classID},function(data){
            console.log(data);

            var str = '';
            for(var i=0;i<data.length;i++){

                var priceStr ='<em>￥'+data[i].price+'</em>';

                if(data[i].discount!=0){
                    var price = (data[i].price*data[i].discount/10).toFixed(2);
                    priceStr = '<em>￥'+price+'</em><s>￥'+data[i].price+'</s>';
                }
                str+='<li data-id="'+data[i].goodsID+'" >' +
                    '<div class="pic"><img src="'+data[i].goodsListImg+'" /></div>' +
                    '<div class="pro-text">' +
                    '<p class="name">'+data[i].goodsName+'</p> ' +
                    '<p class="price">'+priceStr+'</p>' +
                    '</div>' +
                    '</li>';
            }

            /*如果要刷新页面的话*/
            if(reload){
                oProList.html(str);
            }else {
                /*如果要加载更多，需要让原来的 内容+本次加载的内容*/
                oProList.html( oProList.html()+str)
            }

            myScroll.refresh();

        });

    }


    oSortList.on("tap","li",function(){

        $(this).addClass("active").siblings().removeClass('active');
        classID = $(this).attr("data-id");
        getGoodsData(true)
    });
    oProList.on("tap","li",function(){
        console.log( $(this).attr("data-id"));

        window.location.href = "detail.html?goodsID="+$(this).attr("data-id");


    });

});