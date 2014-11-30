var gulp = require('gulp'),
    del = require('del'),
    config = require('../config').clean;


// Clean Images
gulp.task('clean-images', function (cb) {
  del([
    config.erase + '/images/**/*.*'
  ], cb);
})

// Clean Fonts
gulp.task('clean-fonts', function (cb) {
  del([
     config.erase + '/fonts/**/*.*'
  ], cb);
})

// Clean Scripts
gulp.task('clean-scripts', function (cb) {
  del([
     config.erase + '/js/**/*.*'
  ], cb);
})

// Clean HTML
gulp.task('clean-html', function (cb) {
  del([
     config.nuke + '**/*.html'
  ], cb);
})

// Clean CSS
gulp.task('clean-css', function (cb) {
  del([
     config.erase + '/css/**/*.css'
  ], cb);
})

// Clean CSS
gulp.task('clean-styleguide', function (cb) {
  del([
     config.nuke + '/**/style-guide.*'
  ], cb);
})

// Nuke - BE CAREFUL!!!!
gulp.task('nuke', function (cb) {
  del([
    config.nuke
  ], cb);
})