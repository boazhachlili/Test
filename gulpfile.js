var _ = require('underscore'),
    gulp = require('gulp'),
    requireDir = require('require-dir');

// register tasks:
_.forEach(requireDir('./gulp/tasks'), function (task, taskName) {
    gulp.task(taskName, task);
});
