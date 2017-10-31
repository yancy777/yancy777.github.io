/**
 * Created by hasee on 2016/6/5.
 */

    var aSrc = [];
    $("[data-load]").each(function(){
        aSrc.push(this.src)
        //console.log(this.src)
    });
    var num = 0; /*现在加载到第几张图片*/

    if(aSrc.length==0){/*不需要预加载*/
        $(".loading").hide()
        cmbDemo.init()  //整个页面初始化
    }
    for(var i=0;i<aSrc.length;i++){
        var oImage = document.createElement("img");
        oImage.src = aSrc[i];
        oImage.onload=function(){

            num++;
            console.log(num);
            canShow ()
        };
        oImage.onerror=function(){
            num++;
            console.log(num);
            canShow ()
        }
    }

    function canShow (){
        if(num==aSrc.length){
            /*我加载的图片数量等于 所有图片的数量*/
            /*预加载完成*/
          $(".loading").fadeOut()
           cmbDemo.init()  //整个页面初始化
        }
    }


