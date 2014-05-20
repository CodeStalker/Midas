// Include gulp
var gulp = require('gulp');

// Include plugins
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var streamqueue  = require('streamqueue');

// Static Browser Sync server http://www.browsersync.io/
gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        baseDir: "./"
      }
    });
});


// Concatenate & Minify JS
gulp.task('scripts', function() {


    return streamqueue({ objectMode: true },
        gulp.src('assets/js/src/vendor/*.js'),
        gulp.src('assets/js/src/plugins/*.js'),
        gulp.src('assets/js/src/script.js')
    )

	.pipe(concat('site.js'))
	.pipe(rename({
		suffix: '.min'
	}))
	
	.pipe(uglify())
	.pipe(gulp.dest('assets/js/dist/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


// Parse Sass files
gulp.task('sass', function () {
    gulp.src('midas/site.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['scripts','sass','browser-sync'], function () {
	// Watch .scss files
	gulp.watch('midas/**/*.scss', ['sass']);
	// Watch .js files
	gulp.watch('assets/js/src/*.js', ['scripts']);	
	// Watch .html files
	gulp.watch('*.html').on('change', function(file) {
		browserSync.reload();
	});
});

