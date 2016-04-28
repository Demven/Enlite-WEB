var gulp = require('gulp');
var del = require("del");
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var htmlMin = require('gulp-htmlmin');
var babelify = require('babelify');
var browserify = require('browserify');
var runSequence = require('run-sequence').use(gulp);
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');


gulp.task('build:clean', function (cb) {
    return del(['build'], cb);
}); 

gulp.task('build:html', function () {
    return gulp.src(['src/html/**'])
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("build/html"));
});

gulp.task('build:css', function () {
    return gulp.src('src/styles/**/*.styl')
        .pipe(stylus({
            compress: true,
        }))
        .pipe(autoprefixer())
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('build:jsx', function() {
    browserify(['./src/index.jsx'], {debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('build:server-js', function () {
    return gulp.src("server/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest('build/server'));
});

gulp.task('build', function (callback) {
    runSequence('build:clean', 'build:html', 'build:css', 'build:jsx', 'build:server-js', callback);
});

gulp.task('default', function (callback) {
    runSequence('build', callback);
});