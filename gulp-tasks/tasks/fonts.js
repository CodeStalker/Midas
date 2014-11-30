var gulp = require('gulp'),
    notify = require("gulp-notify");
    config = require('../config').fonts;

// Copy Web Fonts To Dist
gulp.task('fonts', function() {
    return gulp.src([config.src])
        .pipe(gulp.dest(config.dest))
        .pipe(notify("FONTS Done!"));
});