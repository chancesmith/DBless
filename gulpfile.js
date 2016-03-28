"use strict";

var gulp = require('gulp'),
    //del = require('del'),
    sass = require('gulp-sass'),
    path = require('path'),
    plumber = require('gulp-plumber'), //prevent breaks in watchs when errors occur
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);