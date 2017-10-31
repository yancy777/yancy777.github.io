var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var imagemin = require("gulp-imagemin");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");

gulp.task("webserver",function(){
	gulp.src("./")
	.pipe(webserver({
		livereload:true,
		directoryListing:{
			enable:true,
			path:"./"
		},
		port:80,
		host:"localhost"
	}))
})

gulp.task("copyHtml",function(){
	gulp.src("src/index.html")
	.pipe(gulp.dest("app/"))
})

gulp.task("styleCss",function(){
	gulp.src("src/css/*.css")
	.pipe(gulp.dest("app/css/"))
})

gulp.task("images",function(){
	gulp.src("src/img/*")
	//.pipe(imagemin())
	.pipe(gulp.dest("app/img/"))
})

gulp.task("styleSass",function(){
	gulp.src("src/sass/index.scss")/*拿到一个文件*/
	.pipe(sass())/*编译*/
	.pipe(gulp.dest("app/css/"))
	.pipe(minifyCss())/*压缩*/
	.pipe(gulp.dest("app/css/"))/*输出到项目目录*/
})


gulp.task("copyJs",function(){
	gulp.src("src/js/index.js") /*拿到一个文件*/
	.pipe(uglify())/*压缩*/
	.pipe(gulp.dest("app/js/"))/*输出到项目目录*/	
})

gulp.task("copyJavascript",function(){
	gulp.src("src/js/*.js")
	.pipe(gulp.dest("app/js/"))
})

//创建一个看守的方法
gulp.task("watch",function(){
	//看守index.html,改变时，编译
	gulp.watch("src/index.html",["copyHtml"]);
	//看守我的test.scss，当他改变的时候，那就编译sass文件
	gulp.watch("src/sass/index.scss",["styleSass"]);
	gulp.watch("src/js/index.js",["copyJs"]);
})

gulp.task("default",["watch","webserver","copyJavascript","styleSass","styleCss","copyHtml","copyJs","images"]);