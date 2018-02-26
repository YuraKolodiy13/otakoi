var gulp = require('gulp');
var less = require('gulp-less');
// var path = require('path');
var watch = require('gulp-watch');

gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', ['less']);
});