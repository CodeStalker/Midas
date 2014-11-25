var gulp = require('gulp'),
    del = require('del');
    // config     = require('../config').clean;


// Clean Images
gulp.task('clean-images', function (cb) {
  del([
    './project/build/assets/images/**/*.*'
  ], cb);
})

// Clean Fonts
gulp.task('clean-fonts', function (cb) {
  del([
    './project/build/assets/fonts/**/*.*'
  ], cb);
})

// Clean Scripts
gulp.task('clean-scripts', function (cb) {
  del([
    './project/build/assets/js/**/*.*'
  ], cb);
})

// Clean HTML
gulp.task('clean-html', function (cb) {
  del([
    './project/build/**/*.html'
  ], cb);
})

// Clean CSS
gulp.task('clean-css', function (cb) {
  del([
    './project/build/**/*.css'
  ], cb);
})

// Nuke
gulp.task('nuke', function (cb) {
  del([
    './project/build'
  ], cb);
})