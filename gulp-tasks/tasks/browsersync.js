var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../config');

// Run static server and watch files
gulp.task('serve', function() {

    browserSync(config.browserSync);
   
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.scripts.watch, ['scripts']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.fonts.src, ['fonts']);

});