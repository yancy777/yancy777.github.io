/**
 * Created by Administrator on 2016/2/21.
 */
$(function(){
    //自定义配置
    fullPage.changeConfigure={
        sideNav: true
    };
    fullPage.init();
});


var fullPage = {
    //������
    changeConfigure:{},
    configure:{
        sideNav:false,//默认没有侧边导航
        direction : 'vertical'//竖屏
    },
    //��初始化
    init:function(){

        $.extend(this.configure,this.changeConfigure);//继承自定义配置；
        this.aSect =$('.section'); //所以的分屏页面的
        this.oPage = $('.pagewarp');//外壳
        this.winH = 0;//窗口的高度
        this.now = 0;//��当前页面的索引
        this.end = true; //切换动画是否结束����

        //初始化侧边导航
        if(this.configure.sideNav){
            var str = '';
            var _this = this;
            this.aSect.each(function(index, element) {
                str+='<li><p>'+$(this).attr('date-title')+'</p></li>';

            });
            $('<ul class="sidenav">'+str+'</ul>').appendTo($('.winwarp'));

            this.aSideNav = $('.sidenav li');
            this.aSideNav.eq(0).addClass('active');

            $('.sidenav p').each(function(index, element) {
                $(this).css({'background-color':_this.aSect.eq(index).css('background-color')});
            });;
        }
        this.getWinH();//��获取窗口高度
        this.bindEvent();//绑定事件
        this.aSect.eq(0).addClass('active');//首屏展示
    },
    //绑定事件方法
    bindEvent:function(){
        var _this = this;

        //         事件监听         ����    滚轮事件            ��������事件的属性
        //�谷歌  � addEventListener     mousewheel         window.event.wheelDelta   �上：�120   �下：�-120
        //���火狐   addEventListener     DOMMouseScroll     ev.detail                 ��上：-3    ��下：3
        //ie     attachEvent         onmousewheel        window.event.wheelDelta   �上：�120   �下：�-120


        document.addEventListener?(document.addEventListener("mousewheel",this.mScroll,false),
            document.addEventListener("DOMMouseScroll",this.mScroll,false))
            :document.attachEvent("onmousewheel",this.mScroll);

        //���当窗口缩放时，重新获取窗口高度
        $(window).on('resize', function() {
            _this.getWinH()
        });
        //侧边导航点击事件
        this.configure.sideNav&&this.aSideNav.on('click',function(){
            if(_this.end&&_this.now!=$(this).index()){
                _this.pageMove(_this.now,$(this).index());

            }

        });
    },
    //鼠标滚轮逻辑判断方法
    mScroll:function(ev){
        ev = window.event || ev;//�事件兼容
        var iScr = Math.max(-1, Math.min(1, ev.wheelDelta || -ev.detail));
        //将120和3取小为1，将-120和-3取大为-1；
        console.log(ev.wheelDelta);//上：�120 下：�-120
        console.log(ev.detail);//�上：�-3 下：�3
        console.log(iScr);//�上：1 下：�-1

        if(fullPage.end){
            //��如果切换动画已完成，通过判断iScr执行相应的操作
            if (iScr > 0) {
                //��

                if (fullPage.now - 1 < 0) return;//��第一页不上翻
                fullPage.pageMove(fullPage.now, fullPage.now - 1)
            } else {
                //��
                if (fullPage.now + 1 > fullPage.aSect.length - 1) return;//最后一页不下翻
                fullPage.pageMove(fullPage.now, fullPage.now + 1)
            }
        }
    },

    //分屏切换动画
    pageMove:function(iNow,iTar) {
//iTar为目标页面索引，iNow为当前页面索引
        this.end = false;
        var _this = this;
        this.aSect.eq(iNow).removeClass('active');

        this.oPage.stop().animate({top:-iTar*this.winH},500,function(){
            //anmShow(iTar)

            _this.aSect.eq(iTar).addClass('active');
            _this.now = iTar;
            _this.end = true;
        });
        if(this.configure.sideNav){
            this.aSideNav.eq(iNow).removeClass('active');
            //页面内的动画主要是通过css3过渡实现
            this.aSideNav.eq(iTar).addClass('active');
        }
    },
    //获取窗口高度
    getWinH:function() {
        this.winH = $(window).height()
        document.title = this.winH;
        this.aSect.css('height',this.winH);
        this.oPage.parent().css({'height':this.winH});
        this.oPage.css('height',this.aSect.length*this.winH);
        $('.sidenav').css('top',this.winH/2-$('.sidenav').height()/2);
    }
};

