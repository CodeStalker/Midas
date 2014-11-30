var gulp = require('gulp'),
	runSequence = require('run-sequence');

// Build Production Files
gulp.task('build', function() {
    runSequence('images', 'fonts', 'scripts', 'sass', 'html', 'serve');
});

// Build deployable files
gulp.task('deploy', ['nuke'], function() {
    runSequence('images', 'minify-sass', 'scripts', 'fonts', 'html', 'clean-styleguide');
});

// Default Task
gulp.task('default', function() {
    gulp.start('build');
});