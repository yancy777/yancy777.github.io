/**
 * Created by hasee on 2016/7/4.
 */
var  mySwiper = new Swiper(".swiper-container",{
    autoplay:3000,
    loop: true,

    // 如果需要分页器
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction:false
    /*用户操作以后，继续自动播放*/
});

var myScroll = new IScroll("#wrapper",{
    scrollbars:true,/*显示滚动条*/
    shrinkScrollbars: 'scale',/*弹性滚动条*/
    fadeScrollbars: true,/*自动隐藏*/
    click:true,/*可以触发点击事件*/
    probeType:1
});

var $updateIcon = $(".updata-icon img");
var $updateText = $(".updata-icon span");
var load = 0;
/*load = 1 刷新*/
/*load = 2 加载*/
myScroll.on('scroll',function(){

    if(this.y>60){
        console.log("应该刷新页面");
        load = 1;
        $updateIcon.addClass('rotate')
        $updateText.html("松开刷新")
    }else if(this.maxScrollY-this.y>60){
        /*往上拉了60*/
        console.log("应该加载更多");
        load = 2
    }
    /*console.log(this.y);
     console.log(this.maxScrollY);*/
});

/*通过自定义的方法监听 IScroll滚动的高度*/
/*$("#wrapper").on("touchmove",function(){
    console.log(myScroll.y)
})
$("#wrapper").on("touchend",function(){
    console.log(myScroll.y)
})*/

myScroll.on("scrollEnd",function(){
    if(load === 1){
        console.log("刷新页面");
        $updateIcon.removeClass('rotate');
        $updateText.html("下拉刷新")
        listPage.addData(true)
    }else if(load === 2) {
        console.log("加载更多");
        listPage.addData()
    };
    /*加载或刷新完成后，让load恢复初始值*/
    load =0;
});



var listPage = (function(){

    var $list = $(".show-list");
    var pageNum = 0;
    var dataUrl ="here.json";

    return {
        init:function(){
            this.addData(true);
            this.bindEvent()
        },
        addData:function(update){
            if(update){/*刷新页面的时候，请求的是第一页的数据*/
                pageNum = 0;
            }

            pageNum++;
            $.get(dataUrl,{"pageNum":pageNum},function(data){
                var oData = [];
                if(typeof data === "object"){
                    oData = data;
                }else {
                    oData = JSON.parse(data);
                };

                var str = "";
                for(var i=0;i<oData.length;i++){
                    str+=' <li><div class="pic"><img src="'+oData[i].pic+'"></div><p>'+oData[i].name+'</p></li>';
                }

                if(update){ /*刷新页面的时候 ,让列表的数据就等于本次请求的数据*/
                    $list.html(str)
                }else {/*加载更多，用以前的数据+本次的数据*/
                    $list.html($list.html()+str)
                }
                myScroll.refresh()
            })
        },
        bindEvent:function(){

            var that = this;
            /*点击切换*/
            $("nav li").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                dataUrl =$(this).attr("data-url");
                that.addData(true);
                /*让页面滚动到最顶部*/
                myScroll.scrollTo(0,0,500)

            })
        }

    }
})();


/*listPage = {
    init:function(){
        this.getData()
    },
    getData:function(){
    }

}*/

listPage.init();


