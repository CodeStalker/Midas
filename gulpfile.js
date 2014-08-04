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
	gulpif = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	rimraf = require('gulp-rimraf'),
	changed = require('gulp-changed'),
	notify = require("gulp-notify"),
	
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
  	.pipe(plumber(onError))
  	.pipe(changed('./project/build/assets/images'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./project/build/assets/images'))
    .pipe(notify("IMAGES Done!"));
});

// Clean Images
gulp.task('clean-images', function() {
  return gulp.src('./project/build/assets/images/**/*', { read: false }) // much faster
    .pipe(rimraf());
});


// Clean Fonts
gulp.task('clean-fonts', function() {
  return gulp.src('./project/build/assets/fonts/**/*', { read: false }) // much faster
    .pipe(rimraf());
});

// Clean HTML
gulp.task('clean-html', function() {
  return gulp.src('./project/build/**/*.html', { read: false }) // much faster
    .pipe(rimraf());
});


// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['project/src/assets/fonts/**/*'])
    .pipe(gulp.dest('project/build/assets/fonts'))
    .pipe(notify("FONTS Done!"));
});


// Parse Sass files
gulp.task('sass', function() {
	gulp.src('./project/src/assets/midas/**/*.scss')
	.pipe(plumber(onError))
	.pipe(sass())
	.pipe(gulp.dest('./project/src/assets/css'))
	.pipe(minifyCSS({keepBreaks:true}))
	.pipe(gulp.dest('./project/build/assets/css'))
	.pipe(notify("SASS Done!"));
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
	.pipe(notify("SCRIPTS Done!"));
});

// Watch For Changes & Reload
var htmlopts = {
	comments: false
};
gulp.task('html', function() {
	return gulp.src('./project/src/**/*.html')
	.pipe(changed('./project/build'))
	.pipe(minifyHTML(htmlopts))
	.pipe(gulp.dest('./project/build'))
	.pipe(notify("HTML Done!"));
});

// Run static server and watch files
gulp.task('serve', function() {
	browserSync.init(["./project/build/**/*.html", "./project/src/assets/midas/**/*.scss", "./project/build/assets/fonts/*.*", "./project/build/assets/js/*.js"], {
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
	runSequence('images', 'fonts', ['sass', 'html', 'serve']);
});

// Clean out some sh*t
gulp.task('clean', function() {
	runSequence('clean-images', 'clean-fonts', 'clean-html');
});

// Build delpoyable version of files
gulp.task('deploy', function() {
	runSequence('clean','images', 'fonts', ['sass', 'html']);
});

// Default Task
gulp.task('default', function() {
	gulp.start('build');
});