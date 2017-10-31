/**
 * Created by hasee on 2016/7/11.
 */
/*
define(function(){

    var a =2;
    var b =3;
    var obj  = {c:a,d:b};

    return a
});
*/


var obj  = {
    a:1,
    refresh:function(){
        console.log(this.a)
    }
};
obj.refresh();
var fn = obj.refresh.bind(obj);
console.log(fn);
//fn ();