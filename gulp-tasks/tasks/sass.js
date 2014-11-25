var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber');
    // config     = require('../config').images;

// Get plumber to beep on error
var onError = function(err) {
    gutil.beep();
    console.log(err);
};

// Parse Sass files
gulp.task('sass', function() {
	gulp.src('./project/src/assets/midas/**/*.scss')
        .pipe(sass({
            errLogToConsole: true,
            sourceComments: 'map',
            sourceMap: 'sass'
        }))
	.pipe(plumber(onError))
	.pipe(gulp.dest('./project/build/assets/css'))
	.pipe(notify("SASS Done!"));
});

// Minify Sass files
gulp.task('minify-sass', function() {
    gulp.src('./project/src/assets/midas/**/*.scss')
        .pipe(sass())
        .pipe(plumber(onError))
        .pipe(gulp.dest('./project/src/assets/css'))
        .pipe(minifyCSS({
            keepBreaks: false
        }))
        .pipe(plumber(onError))
        .pipe(gulp.dest('./project/build/assets/css'))
        .pipe(notify("SASS Minify Done!"));
});