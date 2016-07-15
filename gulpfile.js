var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var htmlMin = require('gulp-htmlmin');
var babelify = require('babelify');
var browserify = require('browserify');
var runSequence = require('run-sequence').use(gulp);
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gzip = require('gulp-gzip');
var uglify = require('gulp-uglify');
var pump = require('pump');

/* TRAVIS TASKS */
gulp.task('travis:remove:gitignore', function (cb) {
  return del(['.gitignore'], cb);
});

/* CLEAN TASKS */
gulp.task('clean:css', function (cb) {
  return del(['build/css'], cb);
});
gulp.task('clean:js', function (cb) {
  return del(['build/client', 'build/server'], cb);
});
gulp.task('clean:html', function (cb) {
  return del(['build/html'], cb);
});
gulp.task('clean', function (cb) {
  return del(['build'], cb);
});

/* BUILD TASKS */
// images
gulp.task('build:images', function () {
  return gulp.src('src/images/**')
    .pipe(gulp.dest('build/images'));
});

// fonts
gulp.task('build:fonts', function () {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});

// html
gulp.task('build:html', function () {
  return gulp.src(['src/html/**'])
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: false,
    }))
    .pipe(gulp.dest('build/html'));
});

// css
gulp.task('build:css', function () {
  return gulp.src('src/styles/index.styl')
    .pipe(stylus({
      compress: true,
    }))
    .pipe(autoprefixer())
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('build/css'));
});

// js
gulp.task('build:client:js', function () {
  return browserify(['./src/js/client.js'], {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/client'));
});
gulp.task('build:server:js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/server/'));
});


/* MINIFICATION */
// css
gulp.task('min:css', function(cb) {
  pump([
    gulp.src('build/css/bundle.css'),
    cssmin(),
    gulp.dest('build/css/')
  ], cb);
});
// client js
gulp.task('min:client:js', function(cb) {
  pump([
    gulp.src('build/client/bundle.js'),
    uglify(),
    gulp.dest('build/client/')
  ], cb);
});
// main
gulp.task('min', function (callback) {
  if (process.env.NODE_ENV === 'production') {
    runSequence('min:css', 'min:client:js', callback);
  } else {
    // skip minification
    callback();
  }
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
gulp.task('rev:css:replace', function () {
  var manifest = gulp.src('build/css/rev-manifest.json');

  return gulp.src('build/html/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('build/html'));
});

// js
gulp.task('rev:js:manifest', function () {
  return gulp.src(['build/client/bundle.js'], {base: 'build'})
    .pipe(rev())
    .pipe(gulp.dest('build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/client'));
});
gulp.task('rev:js:replace', function () {
  var manifest = gulp.src('build/client/rev-manifest.json');

  return gulp.src('build/html/index.html')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest('build/html'));
});

// main
gulp.task('rev', function (callback) {
  runSequence('rev:css:manifest', 'rev:css:replace', 'rev:js:manifest', 'rev:js:replace', callback);
});


/* GZIP */
// css
gulp.task('gzip:css', function () {
  return gulp.src('build/css/bundle-*.css')
    .pipe(gzip())
    .pipe(gulp.dest('build/css'));
});
// js
gulp.task('gzip:js', function () {
  return gulp.src('build/js/bundle-*.js')
    .pipe(gzip())
    .pipe(gulp.dest('build/js'));
});
// main
gulp.task('gzip', function (callback) {
  runSequence('gzip:css', 'gzip:js', callback);
});

/* WATCH */
gulp.task('watch', function () {
  // css
  gulp.watch('src/styles/**', function () {
    runSequence('clean:css', 'clean:html', 'build:html', 'build:css', 'rev:css:manifest', 'rev:css:replace', 'gzip:css');
  });
  gulp.watch('src/js/components/**/*.styl', function () {
    runSequence('clean:css', 'clean:html', 'build:html', 'build:css', 'rev:css:manifest', 'rev:css:replace', 'gzip:css');
  });

  // js
  gulp.watch('src/js/**/*.js', function () {
    runSequence('clean:js', 'clean:html', 'build:html', 'build:client:js', 'build:server:js', 'rev:js:manifest', 'rev:js:replace', 'gzip:js');
  });

  // images
  gulp.watch('src/images/**', function () {
    runSequence('build:images');
  });
});


/* MAIN TASKS */
gulp.task('build', function (callback) {
  runSequence('build:images', 'build:fonts', 'build:html', 'build:css', 'build:client:js', 'build:server:js', 'min', 'rev', 'gzip', callback);
});

gulp.task('dev-watch', function (callback) {
  runSequence('clean', 'build', 'watch', callback);
});

gulp.task('production', function (callback) {
  runSequence('clean', 'build', 'travis:remove:gitignore', callback);
});

gulp.task('default', function (callback) {
  if (process.env.NODE_ENV === 'production') {
    // production sequence
    runSequence('clean', 'build', 'travis:remove:gitignore', callback);
  } else {
    // development sequence
    runSequence('clean', 'build', callback);
  }
});
