var gulp = require('gulp'),
	runSequence = require('run-sequence');

// Build Production Files
gulp.task('build', function() {
    runSequence('images', 'copy-fonts', 'scripts', 'sass', 'html', 'serve');
});

// Build delpoyable version of files
gulp.task('deploy', ['nuke'], function() {
    runSequence('images', 'minify-sass', 'scripts', 'copy-fonts', 'html');
});

// Default Task
gulp.task('default', function() {
    gulp.start('build');
});