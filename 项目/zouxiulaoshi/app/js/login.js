require.config({
    paths:{
        "zepto":'lib/zepto.min',
        "fnBase":"lib/fnBase"
    },
    shim:{
        'zepto':{
            exports:"Zepto"
        }
    }
});
//zepto == 'lib/zepto.min';
//zepto => (Zepto==$)  通过exports暴露出来的对象

require(["zepto","fnBase"],function($,fnBase){
    fnBase.myalert();
    var oUsername = $("#login-page .username");
    var oPassword = $("#login-page .password");
    var oLoginBtn = $("#login-page .red-btn");
    var oRemember = $("#login-page .remember");

    $("#chh").on("tap",function(){
        console.log(1)
    })

    oPassword.on("keyup",function(){
        /*    var val = $(this).val();
         val = val.replace(/[\u4e00-\u9fa5]/g,'');*/
        //$(this).val(val)
        $(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));
        //Zepto(this) === $(this)
        //console.log( this.value)

    });

    oLoginBtn.on("tap",function(){
        var name = oUsername.val();
        var passwrod = oPassword.val();

        if(name.length<6){
            /*用户名错误*/
            alert("用户名格式不正确");
            return;
        }

        if(passwrod.length<6){
            /*密码错误*/
            alert("请输入正确的密码")
            return;
        }

        alert("验证通过");

        /*ajax请求*/
        //status=login&userID=sunhaiqing&password=123456
        $.get("http://datainfo.duapp.com/shopdata/userinfo.php",
            {"status":"login","userID":name,"password":passwrod},function(data){
                console.log(data)
                if(data==2){
                    alert("用户名密码不相符")
                }else if(data==0){
                    alert("用户名不存在")
                }else {
                    /*判断是否要记住密码*/
                    if(oRemember.hasClass("selected")){
                        /*需要记住密码，下次自动登录*/
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
//m1 == (Zepto==$)  //通过一个形参接受exports暴露出来的对象

