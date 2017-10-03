const gulp = require('gulp');
const del = require('del');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');
const htmlMin = require('gulp-htmlmin');
const babelify = require('babelify');
const browserify = require('browserify');
const runSequence = require('run-sequence').use(gulp);
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const cssmin = require('gulp-cssmin');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gzip = require('gulp-gzip');
const uglify = require('gulp-uglify');
const pump = require('pump');

/* CLEAN TASKS */
gulp.task('clean:css', cb => {
  return del(['build/css'], cb);
});
gulp.task('clean:js', cb => {
  return del(['build/client', 'build/server'], cb);
});
gulp.task('clean:html', cb => {
  return del(['build/html'], cb);
});
gulp.task('clean', cb => {
  return del(['build'], cb);
});

/* BUILD TASKS */
// images
gulp.task('build:images', () => {
  return gulp.src('src/images/**')
    .pipe(gulp.dest('build/images'));
});

// fonts
gulp.task('build:fonts', () => {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});

// html
gulp.task('build:html', () => {
  return gulp.src(['src/html/**'])
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: false,
    }))
    .pipe(gulp.dest('build/html'));
});

// css
gulp.task('build:css', () => {
  return gulp.src('src/styles/index.styl')
    .pipe(stylus({
      compress: true,
    }))
    .pipe(autoprefixer())
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('build/css'));
});

// js
gulp.task('build:client:js', () => {
  return browserify(['./src/js/client.js'], {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/client'));
});
gulp.task('build:server:js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/server/'));
});


/* MINIFICATION */
// css
gulp.task('min:css', cb => {
  pump([
    gulp.src('build/css/bundle.css'),
    cssmin(),
    gulp.dest('build/css/')
  ], cb);
});
// client js
gulp.task('min:client:js', cb => {
  pump([
    gulp.src('build/client/bundle.js'),
    uglify(),
    gulp.dest('build/client/')
  ], cb);
});
// main
gulp.task('min', cb => {
  if (process.env.NODE_ENV === 'production') {
    runSequence('min:css', 'min:client:js', cb);
  } else {
    // skip minification
    cb();
  }
});

/* REVISIONS */
// css
gulp.task('rev:css:manifest', () => {
  return gulp.src(['build/css/bundle.css'], {base: 'build'})
    .pipe(rev())
    .pipe(gulp.dest('build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/css'));
});
gulp.task('rev:css:replace', () => {
  const manifest = gulp.src('build/css/rev-manifest.json');

  return gulp.src('build/html/index.html')
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest('build/html'));
});

// js
gulp.task('rev:js:manifest', () => {
  return gulp.src(['build/client/bundle.js'], {base: 'build'})
    .pipe(rev())
    .pipe(gulp.dest('build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/client'));
});
gulp.task('rev:js:replace', () => {
  const manifest = gulp.src('build/client/rev-manifest.json');

  return gulp.src('build/html/index.html')
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest('build/html'));
});

// main
gulp.task('rev', cb => {
  runSequence('rev:css:manifest', 'rev:css:replace', 'rev:js:manifest', 'rev:js:replace', cb);
});


/* GZIP */
// css
gulp.task('gzip:css', () => {
  return gulp.src('build/css/bundle-*.css')
    .pipe(gzip())
    .pipe(gulp.dest('build/css'));
});
// js
gulp.task('gzip:js', () => {
  return gulp.src('build/js/bundle-*.js')
    .pipe(gzip())
    .pipe(gulp.dest('build/js'));
});
// main
gulp.task('gzip', cb => {
  runSequence('gzip:css', 'gzip:js', cb);
});

/* WATCH */
gulp.task('watch', () => {
  // css
  gulp.watch('src/styles/**', () => {
    runSequence('clean:css', 'clean:html', 'build:html', 'build:css', 'rev:css:manifest', 'rev:css:replace', 'gzip:css');
  });
  gulp.watch('src/js/components/**/*.styl', () => {
    runSequence('clean:css', 'clean:html', 'build:html', 'build:css', 'rev:css:manifest', 'rev:css:replace', 'gzip:css');
  });

  // js
  gulp.watch('src/js/**/*.js', () => {
    runSequence('clean:js', 'clean:html', 'build:html', 'build:client:js', 'build:server:js', 'rev:js:manifest', 'rev:js:replace', 'gzip:js');
  });

  // images
  gulp.watch('src/images/**', () => {
    runSequence('build:images');
  });
});


/* MAIN TASKS */
gulp.task('build', cb => {
  runSequence('build:images', 'build:fonts', 'build:html', 'build:css', 'build:client:js', 'build:server:js', 'min', 'rev', 'gzip', cb);
});

gulp.task('dev-watch', cb => {
  runSequence('clean', 'build', 'watch', cb);
});

gulp.task('production', cb => {
  runSequence('clean', 'build', cb);
});

gulp.task('default', cb => {
  if (process.env.NODE_ENV === 'production') {
    // production sequence
    runSequence('clean', 'build', cb);
  } else {
    // development sequence
    runSequence('clean', 'build', cb);
  }
});
