// Include gulp
var gulp = require('gulp'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	minifyHTML = require('gulp-minify-html'),
	sass = require('gulp-sass'),
	size = require('gulp-size'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	notify = require("gulp-notify"),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	
	streamqueue = require("streamqueue"),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync');

// Optimise Images
gulp.task('images', function() {
	return gulp.src('./project/src/assets/images/**/*')
	.pipe(cache(imagemin({
		progressive: true,
		interlaced: true
	})))
	.pipe(gulp.dest('./project/build/assets/images/'))
	.pipe(size({
		title: 'images'
	}));
});

// Parse Sass files
gulp.task('sass', function() {
	gulp.src('./project/src/assets/midas/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./project/src/assets/css'))
	.pipe(notify("SASS parssed"));
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
	.pipe(notify("script files done..."));
});

// Watch For Changes & Reload
var htmlopts = {
	comments: true
};
gulp.task('html', function() {
	return gulp.src('./project/src/**/*.html')
	.pipe(useref.assets())
	.pipe(gulpif('*.css', minifyCSS()))
	.pipe(useref.restore())
	.pipe(useref())
	.pipe(minifyHTML(htmlopts))
	.pipe(gulp.dest('./project/build/'))
	.pipe(notify("HTML & Assets Minified"));
});

// Run static server and watch files
gulp.task('serve', function() {
	browserSync.init(["./project/build/assets/css/*.css", "./project/build/assets/js/*.js"], {
		server: {
			baseDir: ['./project/build/']
		},
		notify: false
	});
	gulp.watch(['./project/src/**/*.html'], ['html']);
	gulp.watch(['./project/src/assets/css/*.css'], ['html']);
	gulp.watch(['./project/src/assets/js/**/*.js'], ['scripts']);
	gulp.watch(['./project/src/assets/midas/**/*.scss'], ['sass']);
	gulp.watch(['./project/src/assets/images/**/*.*'], ['images']);
});

// Build Production Files
gulp.task('build', function() {
	runSequence('sass', ['html'], ['images'], ['serve']);
});

// Default Task
gulp.task('default', function() {
	gulp.start('build');
});