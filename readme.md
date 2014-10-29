# Midas Framework

**A nimble little SASS powered kickstarter for modern RWD web builds.**

Current frameworks don't <a href="http://jamessteel.co.uk/blog/roll-your-own-framework-overview">teach people anything</a> much about web development, so over the last few months I have published an <a href="http://jamessteel.co.uk/blog/roll-your-own-framework-series">eight part guide</a> to assembling your own SASS framework that works the way you do.

This kickstarter is the result of that series.

It's time we started to think again.

## Quick Start

Before you start you will need to download Midas from github

`git clone https://github.com/CodeStalker/Midas.git`

*You can rename the Midas folder if you wish to match the name of your project.*

`CD` into the folder and run the following to install Gulp and the dependencies for Midas.

`npm install --save-dev`

All you need to is run the default Gulp task with:

`gulp`

This will run Gulp, compile the project, launch a static server and watch images, web fonts, JS, SASS, and HTML files for changes.

Additionally, It will also reload your browser automatically after processing any changed files. Neat, huh? This is the main task to use during development.

## General Use

#### Sass

Much of Midas is controlled with variables in the `_config.scss` file. It is here that you can configure the typography and colours. All you need to do now is create your styles in `site.scss` and optionally you can tweak the typography by editing `partials/_type.scss`.

To aid with debugging browser issues, Midas includes Pesticide. You turn it on very easy by setting `$pesticide-debug: false;` in `_config.scss`.

There is also a `style-guide.html` page that can be used to quickly test `_config.scss` changes and also serves as a general reference to using Midas. 

The grid system in Midas is the <a href="http://www.profoundgrid.com/">Profound Grid</a> made by <a href="http://www.weareprofound.com">We Are Profound</a>. Refer to their <a href="http://www.profoundgrid.com/">website</a> and the examples in `_style-guide.scss` for useage.

#### Javascript

Javascript gets compiled the following order:

`src/assets/js/vendor/*.js`

`src/assets/js/plugins/*.js`

`src/assets/js/script.js`

This produces a single `site.min.js` that is concatenated in the correct order and keeps your project tidy if you stick to the three simple rules below:

1. Major scripts like jQuery or Zepto go in `src/assets/js/vendor/`
2. Plugins & libraries that depend on this library and are not meant to be edited like jQuery UI or your own plugins go in `src/assets/js/plugins/`
3. Any snippets of jQuery to fire off those plugins or do something else with your project should be written into `src/assets/js/script.js`

Additionally the javascript's (and CSS) are loaded in parallel via <a href="http://headjs.com/">head.js</a>. This gives you a smorgasbord of options for responsive design as we all browser/device capability testing. Refer to its <a href="http://headjs.com/site/api/v1.00.html">docs</a> for further help.


#### Images

There is no need to optimise images, Midas will handle this for you. With the Gulp task running, it will be watching the `src/assets/images/` folder for changes. This will automatically be optimised and moved to the corresponding path in the build folder. Your welcome.

### Additional Gulp Tasks

To aid development, there are a couple of other tasks you can run with Gulp.

#### Clean

It's possible after a while to end up with some old files in your build folder, particularly images that are no longer in use or have been renamed. If you want to flush out the Build folder of all images, JS, SASS, and HTML files (folders are left behind) you may run:

`gulp clean`

Alternatively you can run individual clean tasks:

`gulp clean-images`

`gulp clean-fonts`

`gulp clean-scripts`

`gulp clean-html`

`gulp clean-css`

#### Deploy

Finally there is a Deploy task. This processes the whole project by running all the `gulp clean` tasks to flush out all files, and minifies the CSS to a greater degree than just `gulp` does. Namely, it doesn't use source maps and removes line breaks and comments. It **does not** run the static server or do any file watching. This is the task to run if you are about to FTP your whole project to a live server.

`gulp deploy`

#### Footnote

Midas was built around a few other projects. It includes:

1. <a href="http://pesticide.io/">Pesticide</a>
2. <a href="http://necolas.github.io/normalize.css/">Normalize</a>
3. <a href="http://headjs.com/">head.js</a>
4. The Typography was inspired by an early version of <a href="http://cardinalcss.com/">Cardinal</a> and the ideas of a great number of people to numourous to list.

If you want to learn more about the thought process behind Midas and how it came to be, you can find a full overview <a href="http://jamessteel.co.uk/blog/roll-your-own-framework-overview">here.</a>


<small> Midas is Copyright © 2014 James Steel <jamesrobertsteel@googlemail.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.</small>