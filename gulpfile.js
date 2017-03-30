const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const watch = require('gulp-watch');

gulp.task('default', () => {
  return gulp.src('src/amscroll.js')
    .pipe(babel({
      presets: ['es2015'],
      minified: true,
      comments: false
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('demo', function () {
  gulp.src('./demo/app.js', { read: false })
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./demo/'))
});

gulp.task('watch', function () {
  return watch('src/amscroll.js', () => {
    gulp.start('default', ['demo']);
  })
});

