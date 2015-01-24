var gulp = require('gulp'),
    changed = require('gulp-changed'),
    minifyHTML = require('gulp-minify-html'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    config = require('../config').html;

// Get plumber to beep on error
var onError = function(err) {
    gutil.beep();
    console.log(err);
};


var htmlopts = {
    comments: false
};


// Minify HTML
gulp.task('html', function() {
    return gulp.src(config.src)
        .pipe(changed(config.src))
        // .pipe(minifyHTML(htmlopts))
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dest))
        .pipe(notify({
                message: "HTML Done!",
                onLast: true
            }

        ));
});