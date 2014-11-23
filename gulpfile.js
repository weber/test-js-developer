/**
 * Created by webs on 24.08.14.
 */
var gulp        = require('gulp')
    ,stylus     = require('gulp-stylus')
    ,nib        = require('nib')
    ,minifyCSS  = require('gulp-minify-css')
    ,concatCss  = require('gulp-concat-css')
    ,browserify = require('gulp-browserify')
    ,html       = require('html-browserify')
    ,concat     = require('gulp-concat')
    ,uglify     = require('gulp-uglify')
    ,sourcemaps = require('gulp-sourcemaps')
    ,jshint     = require('gulp-jshint')
    ,del        = require('del')
    ,livereload = require('gulp-livereload')

/*MANAGER */
gulp.task('stylus', function (cb) {
    var stream =  gulp.src('assets/stylus/*.styl')
        .pipe(stylus({use: [nib()]}))
        .pipe(gulp.dest('assets/css'))
        .pipe(concatCss("styles.min.css"))
        .pipe(gulp.dest('assets/css'))
        .pipe(minifyCSS({keepBreaks:false,keepSpecialComments:0,cache: true}))
        .pipe(gulp.dest('assets/css'))

    return stream;
});

gulp.task('browserfy',function (cb){
    gulp.src(['app/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            transform: html
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('assets/'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/'))
});
gulp.task('lint', function() {
    return gulp.src('app/*.js')
        .pipe(jshint({
            eqeqeq: true
            ,laxcomma: true
            ,newcap: true
            ,latedef: true
            ,immed: true
            ,noarg: true
            //,unused: true
            ,funcscope : false
            ,strict: true
            ,undef: true
            ,node: true
            ,browser: true
            ,predef    : [
                "Backbone"
                ,"$"
                ,"_"
                ,"jQuery"
            ]
        }))
        .pipe(jshint.reporter('default'));
});


//COMMAND
gulp.task('default', [
    'stylus'
    ,'browserfy'
    ,'lint'
]);

gulp.task('wa',function(){
    livereload.listen();
    gulp.watch('assets/stylus/*.styl',['stylus']);
    gulp.watch('app/*.js',['browserfy','lint']);
    gulp.watch('assets/css/styles.min.css').on('change', livereload.changed);
   // gulp.watch('assets/bundle.js').on('change', livereload.changed);
    gulp.watch('./*').on('change', livereload.changed);
    gulp.watch('app/**').on('change', livereload.changed);
});

