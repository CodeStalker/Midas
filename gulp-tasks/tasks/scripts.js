var gulp = require('gulp'),

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),

    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),

    streamqueue = require("streamqueue"),
    config = require('../config').scripts;

// Get plumber to beep on error
var onError = function(err) {
    gutil.beep();
    console.log(err);
};

// Concat js files
gulp.task('scripts', ['copy-head'], function() {
    return streamqueue({
                objectMode: true
            },
            gulp.src(config.src + "/vendor/*.js"),
            gulp.src(config.src + "/plugins/*.js"),
            gulp.src(config.src + "/script.js")
        )
        .pipe(concat('site.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest))


    .pipe(notify("SCRIPTS Done!"));
});

// Copy head.js
gulp.task('copy-head', function() {
    return gulp.src(config.src + '/head.js')
        .pipe(gulp.dest(config.dest))
        .pipe(notify("Head copy done Done!"));
});