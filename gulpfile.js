var gulp = require('gulp');
var browserify = require('browserify');
var rename = require("gulp-rename");
var babelify = require('babelify');
var source   = require('vinyl-source-stream');
var watch = require('gulp-watch');

var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var gzip = require('gulp-gzip');
var streamify = require('gulp-streamify');

var externals = [
    'classnames',
    'lodash',
    'http-status',
    'react',
    'react-router',
    'react-tabs',
    'react-highcharts',
    'react-youtube',
    'classnames',
    'reflux',
    'superagent',
    'validator'];


gulp.task('vendors', function(){
    var bundler = browserify();
    externals.forEach(function(x){bundler.require(x);});
    bundler
        .transform(babelify.configure({sourceMap: false}))
        .bundle()
        .pipe(source('vendors.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist/js'));

});


gulp.task('bundle', function(){
    browserify("./src/js/app.js", { debug: true })
        .transform(babelify.configure({sourceMap: false}))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('html', function(){
    gulp
        .src('./src/www/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('images', function(){
    gulp
        .src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('css', function(){
    gulp
        .src('./src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('fonts', function(){
    gulp
        .src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('watch', function(){
    console.log('Start watching...');

    watch('./src/js/**/*.js', function(){
        gulp.start('bundle');
    })

    watch('./src/css/*.css', function(){
        gulp.start('css');
    });


});

gulp.task('default', ['vendors', 'bundle', 'html', 'images', 'css', 'fonts', 'watch']);
