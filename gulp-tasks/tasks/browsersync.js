var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    config      = require('../config');

// Run static server and watch files
gulp.task('serve', function() {

    browserSync(config.browserSync);
   
	watch(config.html.src, function() {gulp.start('html');});
	watch(config.sass.src, function() {gulp.start('sass');});
	watch(config.scripts.watch, function() {gulp.start('scripts');});
	watch(config.fonts.src, function() {gulp.start('fonts');});	
	watch(config.images.src, function() {gulp.start('images');});

});

