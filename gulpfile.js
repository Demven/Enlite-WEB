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
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var gzip = require('gulp-gzip');

/* BUILD TASKS */
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
    return gulp.src('src/styles/enlite.styl')
        .pipe(stylus({
            compress: true,
        }))
        .pipe(autoprefixer())
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest('build/css'));
});
gulp.task('build:jsx', function() {
    return browserify(['./src/index.jsx'], {debug: true})
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


/* REVISIONS */
// css
gulp.task('rev:css:manifest', function () {
    return gulp.src(['build/css/bundle.css'], {base: 'build'})
        .pipe(rev())
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/css'));
});
gulp.task("rev:css:replace", function(){
    var manifest = gulp.src('build/css/rev-manifest.json');

    return gulp.src('build/html/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('build/html'));
});

// js
gulp.task('rev:js:manifest', function () {
    return gulp.src(['build/js/bundle.js'], {base: 'build'})
        .pipe(rev())
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/js'));
});
gulp.task("rev:js:replace", function(){
    var manifest = gulp.src('build/js/rev-manifest.json');

    return gulp.src('build/html/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('build/html'));
});

// main
gulp.task('rev', function (callback) {
    runSequence('rev:css:manifest', 'rev:css:replace', 'rev:js:manifest', 'rev:js:replace', callback);
});


/* GZIP */
// css
gulp.task('gzip:css', function() {
    return gulp.src('build/css/bundle-*.css')
        .pipe(gzip())
        .pipe(gulp.dest('build/css'));
});
// js
gulp.task('gzip:js', function() {
    return gulp.src('build/js/bundle-*.js')
        .pipe(gzip())
        .pipe(gulp.dest('build/js'));
});
// main
gulp.task('gzip', function (callback) {
    runSequence('gzip:css', 'gzip:js', callback);
});


/* MAIN TASKS */
gulp.task('build', function (callback) {
    runSequence('build:clean', 'build:html', 'build:css', 'build:jsx', 'build:server-js', 'rev', 'gzip', callback);
});

gulp.task('default', function (callback) {
    runSequence('build', callback);
});