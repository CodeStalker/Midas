var gulp = require('gulp'),
    browserSync = require('browser-sync');

// Run static server and watch files
gulp.task('serve', function() {
    browserSync.init(["./project/build/assets/css/*.css", "./project/build/**/*.html", "./project/build/assets/fonts/*.*", "./project/build/assets/js/*.js"], {
        server: {
            baseDir: ['./project/build/']
        },
        notify: false
    });

    gulp.watch('project/src/**/*.html', ['html']);
    gulp.watch('project/src/assets/midas/**/*.scss', ['sass']);
    gulp.watch('project/src/assets/js/**/*.js', ['scripts']);
    gulp.watch(['project/src/assets/images', 'project/src/assets/images/**/*'], ['images']);
    gulp.watch('project/src/assets/fonts/**/*', ['fonts']);

});