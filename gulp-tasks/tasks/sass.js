var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    config = require('../config').sass;

// Get plumber to beep on error
var onError = function(err) {
    gutil.beep();
    console.log(err);
};

// Parse Sass files
gulp.task('sass', function() {
	gulp.src(config.src)
        .pipe(sass({
            errLogToConsole: true,
            sourceComments: 'map',
            sourceMap: 'sass'
        }))
	.pipe(plumber(onError))
	.pipe(gulp.dest(config.dest))
	.pipe(notify("SASS Done!"));
});

// Minify Sass files
gulp.task('minify-sass', function() {
    gulp.src(config.src)
        .pipe(sass())
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.temp))
        .pipe(minifyCSS({
            keepBreaks: false
        }))
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dest))
        .pipe(notify("SASS Minify Done!"));
});