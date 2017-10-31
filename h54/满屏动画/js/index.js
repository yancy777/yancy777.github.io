/**
 * Created by Administrator on 2016/2/21.
 */
$(function(){


    //自定义配置
    var configure = {
        sideNav : true,//侧边导航
        direction : 'vertical'
    };


    var winH = 0;
    var aSect = $('.section');//所以的分屏页面的
    var oPage = $('.pagewarp');//外壳
    oPage.now = 0;//��当前页面的索引
    oPage.end = true; //切换动画是否结束����



    //初始化侧边导航
    if(configure.sideNav){
        var str = '';
        aSect.each(function(index, element) {
            str+='<li><p>'+$(this).attr('date-title')+'</p></li>';

        });
        $('<ul class=sidenav>'+str+'</ul>').appendTo($('.winwarp'));
        var aSidenav = $('.sidenav li');
        aSidenav.eq(0).addClass('active');

        $('.sidenav p').each(function(index, element) {
            $(this).css({'background-color':aSect.eq(index).css('background-color')});
        });;
    }

    aSect.eq(0).addClass('active');//首屏展示
    getWinH();//��获取窗口高度
    F()//绑定事件


    $(window).on('resize', function() {
        getWinH()
    });
    aSidenav.on('click',function(){//��������¼�
        if(oPage.end){
            pageMove(oPage.now,$(this).index())
        }
    });


    //获取窗口高度
    function getWinH() {//��
        winH = $(window).height()
        document.title = winH;
        aSect.css('height',winH);
        $('.winwarp').css({'height':winH});
        oPage.css('height',aSect.length*winH);
        $('.sidenav').css('top',winH/2-$('.sidenav').height()/2);
    }
    //分屏切换动画
    function pageMove(iNow,iTar) {
        //iTar为目标页面索引，iNow为当前页面索引
        oPage.end = false;
        aSect.eq(iNow).removeClass('active');
        oPage.stop().animate({top:-iTar*winH},500,function(){
            //anmShow(iTar)

            aSect.eq(iTar).addClass('active');
            oPage.now = iTar;
            oPage.end = true;
        });
        //anmHide(iNow)
        aSidenav.eq(iNow).removeClass('active');
        aSidenav.eq(iTar).addClass('active');
    }

//鼠标滚轮逻辑判断方法
    function mScroll(ev){
        var iScr;

        ev=window.event||ev;
        iScr=Math.max(-1,Math.min(1,ev.wheelDelta||-ev.detail));

        //将120和3取小为1，将-120和-3取大为-1；
        console.log(ev.wheelDelta);//上：�120 下：�-120
        console.log(ev.detail);//�上：�-3 下：�3
        console.log(iScr);//�上：1 下：�-1

        if(oPage.end){
            //��如果切换动画已完成，通过判断iScr执行相应的操作
            if(iScr >0){
                //��
                if(oPage.now-1<0) return;//��第一页不上翻
                pageMove(oPage.now,oPage.now-1)
            } else {
                //��
                if(oPage.now+1>aSect.length-1) return;//最后一页不下翻
                pageMove(oPage.now,oPage.now+1)
            }
        }
    }


    function F(){

        //         事件监听         ����    滚轮事件            ��������事件的属性
        //�谷歌  � addEventListener     mousewheel         window.event.wheelDelta   �上：�120   �下：�-120
        //���火狐   addEventListener     DOMMouseScroll     ev.detail                 ��上：-3    ��下：3
        //ie     attachEvent         onmousewheel        window.event.wheelDelta   �上：�120   �下：�-120

        document.addEventListener?(document.addEventListener("mousewheel",mScroll,false),
            document.addEventListener("DOMMouseScroll",mScroll,false)):document.attachEvent("onmousewheel",mScroll)
    }





})

