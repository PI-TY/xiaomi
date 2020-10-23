// 1 导入gulp这个第三方模块
const gulp = require('gulp');
// 2-1 导入gulp-cssmin这个第三方模块  压缩css
const cssmin = require('gulp-cssmin');
// 2-2 导入gulp-autoprefixer这个第三方模块  加前缀
const autoprefixer = require('gulp-autoprefixer');
// 2-3 书写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./src/css/*css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
};
// 4-1 导入gulp-babel这个第三方模块  把es6转换成es5
const babel = require('gulp-babel');
// 4-2 导入gulp-uglify这个第三方模块
const uglify = require('gulp-uglify');
// 6-1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin');
// 7-1 导入del这个第三方模块
const del = require('del');
// 3-1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'));
};
const swiperHandler = ()=>{
    return gulp.src('./src/swiper/**')
    .pipe(gulp.dest('./dist/swiper'));
};
const jqueryHandler = ()=>{
    return gulp.src('./src/jquery/**')
    .pipe(gulp.dest('./dist/jquery'));
};
const fontHandler = ()=>{
    return gulp.src('./src/font/**')
    .pipe(gulp.dest('./dist/font'));
};
const interfaceHandler = ()=>{
    return gulp.src('./src/interface/**')
    .pipe(gulp.dest('./dist/interface'));
};
const bootstrapHandler = ()=>{
    return gulp.src('./src/bootstrap/**')
    .pipe(gulp.dest('./dist/bootstrap'));
};
const jsonHandler = ()=>{
    return gulp.src('./src/json/**')
    .pipe(gulp.dest('./dist/json'));
};
// 4-3 书写一个压缩js文件的方法
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    // 压缩js代码
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
};
// 5-1 书写一个移动lib文件夹的方法  里面放的jquery，swiper等插件
// 6-2 书写一个压缩html文件的方法
const htmlHandler = ()=>{
    return gulp.src('./src/html/*.html')
    // 压缩html需要配置压缩的参数
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/html'))
};
// 7-2 书写一个任务,自动删除dist目录
const delHandler = ()=>{
    return del(['./dist'])
};
// 8 书写一个自动监控文件的任务
const watchHandler = ()=>{
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/js',jsHandler);
    gulp.watch('./src/swiper/**',swiperHandler);
    gulp.watch('./src/json/**',jsonHandler);
    gulp.watch('./src/jquery/**',jqueryHandler);
    gulp.watch('./src/font/**',fontHandler);
    gulp.watch('./src/interface/**',interfaceHandler);
    gulp.watch('./src/bootstrap/**',bootstrapHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
}
// 9 书写一个配置服务器的任务
// 在开发过程中直接把我写的东西在服务器上打开
// 因为我要一边写一边修改一边测试
// 因为gulp是基于node运行的
// 这里就使用node给我们开启一个服务,不是apache,也不是nginx
// 自动刷新,当dist目录里面的代码改变以后,就会自动刷新浏览器
// const serverHandler = ()=>{
//     return gulp.src('./dist')
//     .pipe(webserver({
//         port:8080,
//         open:'./html/index.html',
//         liverload:true,
//         proxies:[
//             {
//                 source:'/weather', //源,你的代理标识符
//                 // 你直接请求下面这个地址压根也拿不到东西,因为跨域了
//                 target:'https://way.jd.com/jisuapi/weather' //目标,你要代理的地址
//             }
//         ]
//     }))

// }
// 导出一个默认任务
// 当我将来执行默认任务default的时候,就会自动帮我删除dist目录,同时压缩css,js,html,同时移动images和lib文件夹
// 小细节:当你在命令行执行gulp default的时候,可以不写default
// 你在命令行执行gulp这个指令,就是在执行gulp default
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        jsHandler,
        swiperHandler,
        jsonHandler,
        jqueryHandler,
        fontHandler,
        interfaceHandler,
        bootstrapHandler,
        htmlHandler
    ),
    watchHandler
)