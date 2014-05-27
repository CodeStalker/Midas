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
var notify = require("gulp-notify");
var streamqueue = require("streamqueue");
var glob = require('glob');
var uncss = require('gulp-uncss');
var watch = require('gulp-watch');

// Static Browser Sync server http://www.browsersync.io/
gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        baseDir: "./project/build/"
      }
    });
});

// Concat js files
gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./project/src/assets/js/vendor/*.js'),
        gulp.src('./project/src/assets/js/plugins/*.js'),
        gulp.src('./project/src/assets/js/script.js')
    )
	.pipe(concat('site.js'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(notify("JS files joined..."))
	.pipe(uglify())
	.pipe(gulp.dest('./project/build/assets/js'))
	.pipe(notify("JS files done..."))
	.pipe(browserSync.reload({
		stream: true
	}));
});



// Parse Sass files
gulp.task('sass', function () {
    gulp.src('./project/src/assets/midas/**/*.scss')
        .pipe(sass())
        .pipe(notify("SASS processed"))
        .pipe(gulp.dest('./project/src/assets/css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./project/build/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}));        
});


// Clean CSS
gulp.task('cleancss', function () {
	gulp.src('./project/src/assets/css/site.css')
        .pipe(uncss({
            html: glob.sync('./project/src/*.html')
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./project/build/assets/css'))       
		.pipe(browserSync.reload({
			stream: true
		}));            
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './project/src/assets/images/**/*',
      imgDst = './project/build/assets/images';
 
	  gulp.src(imgSrc)
  

    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst))
    .pipe(notify("Images done"))
                    .pipe(browserSync.reload({
					stream: true
					}));

});



// minify new or changed HTML pages
var opts = {comments:true};

gulp.task('htmlpage', function () {
    gulp.src('./project/src/**/*.html')
        .pipe(watch(function(files) {
            return files.pipe(minifyHTML(opts))
                .pipe(gulp.dest('./project/build/'))
            }))    
                .pipe(browserSync.reload({
					stream: true
					}));
        
});

// Default task to be run with `gulp`
gulp.task('default', ['sass','scripts','imagemin','htmlpage'], function () {
	
	
	// Watch .js files
	gulp.watch('./project/src/assets/js/**/*.js', ['scripts']);	

	//minify images on change
	gulp.watch('./project/src/assets/images/**/*.*', ['imagemin']);
	
	// Watch .scss files
	gulp.watch('./project/src/assets/midas/**/*.scss', ['sass']);
	
	
	gulp.start('browser-sync');

});

// Deploy
gulp.task('deploy', ['sass','scripts','imagemin','htmlpage'], function () {
	
	gulp.start('cleancss');
	
});