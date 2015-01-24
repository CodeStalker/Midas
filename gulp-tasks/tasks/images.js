var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    config = require('../config').images;

// Get plumber to beep on error
var onError = function(err) {
    gutil.beep();
    console.log(err);
};

// Optimise Images
gulp.task('images', function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dest))
        .pipe(notify({
                message: "Images Done!",
                onLast: true
            }

        ));
});