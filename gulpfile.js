'use strict';

// Include gulp
var gulp = require('gulp'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	minifyHTML = require('gulp-minify-html'),
	sass = require('gulp-sass'),
	size = require('gulp-size'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	clean = require('gulp-clean'),
	changed = require('gulp-changed'),
	
	streamqueue = require("streamqueue"),
	runSequence = require('run-sequence'),
	del = require('del'),
	browserSync = require('browser-sync');

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

// Optimise Images
gulp.task('images', function() {
  	gulp.src('./project/src/assets/images/**/*')
  	.pipe(changed('./project/build/assets/images'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./project/build/assets/images'));
});

// Clean Images
gulp.task('clean-images', function(cb) {
	del(['project/build/assets/images/**/*'], cb);
});



// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['project/src/assets/fonts/**/*'])
    .pipe(gulp.dest('project/build/assets/fonts'))
});

// Clean Fonts
gulp.task('clean-fonts', function(cb) {
	del(['project/build/assets/fonts/**/*'], cb);
});


// Parse Sass files
gulp.task('sass', function() {
	gulp.src('./project/src/assets/midas/**/*.scss')
	.pipe(plumber(onError))
	.pipe(sass())
	.pipe(gulp.dest('./project/src/assets/css'))
});

// Concat js files
gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./project/src/assets/js/vendor/*.js'),
        gulp.src('./project/src/assets/js/plugins/*.js'),
        gulp.src('./project/src/assets/js/*.js')
    )
	.pipe(concat('site.js'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('./project/build/assets/js'))
});

// Watch For Changes & Reload
var htmlopts = {
	comments: false
};
gulp.task('html', function() {
	return gulp.src('./project/src/**/*.html')
	.pipe(useref.assets())
	.pipe(gulpif('*.css', minifyCSS()))
	.pipe(useref.restore())
	.pipe(useref())
	.pipe(minifyHTML(htmlopts))
	.pipe(gulp.dest('./project/build'))
});

// Run static server and watch files
gulp.task('serve', function() {
	browserSync.init(["./project/build/**/*.html", "./project/build/assets/fonts/*.*", "./project/build/assets/js/*.js"], {
		server: {
			baseDir: ['./project/build/']
		},
		notify: false
	});
	
	gulp.watch(['project/src/assets/midas/**/*.scss', 'project/src/**/*.html'], ['sass','html']);
	gulp.watch('project/src/assets/js/**/*.js', ['scripts']);
	gulp.watch(['project/src/assets/images', 'project/src/assets/images/**/*'], ['images']);
	gulp.watch('project/src/assets/fonts/**/*', ['clean-fonts','fonts']);
	
});

// Build Production Files
gulp.task('build', function() {
	runSequence('sass', ['clean-images'], ['clean-fonts'], ['images'], ['fonts'], ['html'], ['serve']);
});

gulp.task('deploy', function() {
	runSequence('sass', ['clean-images'], ['clean-fonts'], ['images'], ['fonts'], ['html']);
});

// Default Task
gulp.task('default', function() {
	gulp.start('build');
});