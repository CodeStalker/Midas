var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../config');

gulp.task('vm', function() {
     browserSync(config.browserSyncVM);
    
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.scripts.watch, ['scripts']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.fonts.src, ['fonts']);
	
});