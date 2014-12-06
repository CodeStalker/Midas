// ======================================================================
// Midas Gulp Config Options
// ======================================================================

var dest = "./project/build";
var src = './project/src';
var prefix = '/assets/';
var erase = './project/build';

module.exports = {


    sass: {
        src: src + prefix + "midas/**/*.scss",
        dest: dest + prefix + "/css/",
        temp: src + prefix + "/css/"
    },
    images: {
        src: src + prefix + "images/**",
        dest: dest + prefix + "images"
    },
    html: {
        src: src + "/*.html",
        dest: dest
    },
    // Don't use a trailing slash on paths to scripts here!
    scripts: {
        src: src + prefix + "js",
        dest: dest + prefix + "js",
        watch: src + prefix + "js/**/*.js"
    },

    fonts: {
        src: src + prefix + "fonts/*.{ttf,woff,eot,svg}",
        dest: dest + prefix + "fonts/"
    },
    clean: {
        nuke: dest,
        erase: dest + prefix
    },
    browserSync: {
        server: {
            baseDir: [dest]
        },

        notify: false,

        files: [dest + "/**/*.css", dest + "/**/*.html", dest + "/**/*.{ttf,woff,eot,svg}", dest + "/**/*.js"]

    },

};