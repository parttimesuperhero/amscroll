const gulp = require('gulp');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const rename = require("gulp-rename");

gulp.task('default', () => {
  return gulp.src('src/amscroll.js')
    .pipe(babel({
      presets: ['es2015'],
      minified: true,
      comments: false
    }))
    .pipe(gulp.dest('dist'));
});


// gulp.task('demo', () => {
//   return gulp.src('demo/app.js')
//     .pipe(browserify({
//         transform: ['babelify'],
//         insertGlobals : true
//       }))
//     .pipe(rename("app.min.js"))
//     .pipe(gulp.dest('demo'));
// });


gulp.task('demo', function () {
  gulp.src('./demo/app.js', { read: false })
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./demo/'))
});


  // gulp.src('src/coffee/app.coffee', { read: false })
  //   .pipe(browserify({
  //     transform: ['coffeeify'],
  //     extensions: ['.coffee']
  //   }))
  //   .pipe(rename('app.js'))
  //   .pipe(gulp.dest('./build/js'))
