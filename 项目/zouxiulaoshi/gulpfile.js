/**
 * Created by hasee on 2016/7/5.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require("gulp-webserver");


/*js*/
var uglify =  require("gulp-uglify");
var rename =  require("gulp-rename");

var autoprefixer = require("gulp-autoprefixer");
var imagemin = require('gulp-imagemin');


/*开启有一个服务器*/
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true, /*修改文件自动刷新*/
            directoryListing: {  /*要不要显示目录，开发环境下可以显示*/
                enable:true,
                path: './'  /*有哪个目录下开始访问*/
            },
            port: 81, /*端口号*/
            host: 'localhost'
        }))
});

gulp.task("styles",function(){
    gulp.src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("app/css/"))
});
gulp.task("copyHtml",function(){
    gulp.src("src/*.html")
        .pipe(gulp.dest("app/"))
});


gulp.task("copyJs",function(){
    gulp.src("src/js/lib/*.js")

        .pipe(gulp.dest("app/js/lib/"))
});

gulp.task("script",function(){
    gulp.src("src/js/*.js")
       /* .pipe(jshint())*/
        .pipe(gulp.dest("app/js/"))
});
/*创建一个图片压缩的任务*/
gulp.task("images",function(){
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("app/images/"))
});

gulp.task("watch",function(){
    gulp.watch("src/sass/*.scss",["styles"]);
    gulp.watch("src/*.html",["copyHtml"]);
    gulp.watch("src/js/*.js",["script"])
});
gulp.task("default",["styles","watch","copyHtml","images","copyJs","script",
"webserver"]);