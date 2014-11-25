// ======================================================================
// Midas Gulp Config
// ======================================================================
//
// A small SASS powered kickstarter for RWD
// Brought to you by @CodeStalker - midas.jamessteel.co.uk

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp-tasks/tasks', { recurse: true });