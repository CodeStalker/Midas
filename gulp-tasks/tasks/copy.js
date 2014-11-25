var gulp = require('gulp'),
    notify = require("gulp-notify");
    // config     = require('../config').copy;

// Copy Web Fonts To Dist
gulp.task('copy-fonts', function() {
    return gulp.src(['./project/src/assets/fonts/**/*.{ttf,woff,eot,svg}'])
        .pipe(gulp.dest('./project/build/assets/fonts'))
        .pipe(notify("FONTS Done!"));
});