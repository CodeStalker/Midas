// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/src/*.js')
      .pipe(concat('site.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/dist/'));
});

// Process Sass
gulp.task('sass', function () {
    gulp.src('midas/site.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));
});

// Default Task
gulp.task('default', ['scripts','sass']);