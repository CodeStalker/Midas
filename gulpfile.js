// Include gulp
var gulp = require('gulp');

// Include plugins
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var streamqueue  = require('streamqueue');

// Static Browser Sync server http://www.browsersync.io/
gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        baseDir: "./project/build/"
      }
    });
});

// Concatenate & Minify JS
gulp.task('scripts', function() {


    return streamqueue({ objectMode: true },
        gulp.src('project/src/assets/js/src/vendor/*.js'),
        gulp.src('project/src/assets/js/src/plugins/*.js'),
        gulp.src('project/src/assets/js/src/script.js')
    )

	.pipe(concat('site.js'))
	.pipe(rename({
		suffix: '.min'
	}))
	
	.pipe(uglify())
	.pipe(gulp.dest('project/build/assets/js'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


// Parse Sass files
gulp.task('sass', function () {
    gulp.src('project/src/assets/midas/site.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('project/build/assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = 'project/src/assets/images/**/*',
      imgDst = 'project/build/assets/images';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// minify new or changed HTML pages
gulp.task('htmlpage', function() {
	
var opts = {comments:true};
var htmlSrc = 'project/src/*.html',
  htmlDst = 'project/build/';
 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(htmlDst));
});

// Default task to be run with `gulp`
gulp.task('default', ['scripts','sass','imagemin','htmlpage','browser-sync'], function () {
	
	// Watch .scss files
	gulp.watch('project/src/assets/midas/**/*.scss', ['sass']);
	
	// Watch .js files
	gulp.watch('project/src/assets/js/src/*.js', ['scripts']);	

	//minify html on change
	gulp.watch('project/src/*.html', ['htmlpage']);
	
	//minify html on change
	gulp.watch('project/src/assets/images/**/*', ['imagemin']);		

	// Watch if anything changes in the build folder and reload browserSync if so
	gulp.watch('project/build/**/*').on('change', function(file) {
		browserSync.reload();
	});
});

