var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    notify = require("gulp-notify") 
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bc' 
}

gulp.task('bower', function() { 
  return bower()
  .pipe(gulp.dest(config.bowerDir)) 
  .pipe(notify({ 
    message: 'Bower has been executed.',
    onLast: true
  }));
});

gulp.task('copyBootstrap', ['bower'], function() {
  return gulp.src(['bc/bootstrap-sass/assets/stylesheets/**/*'])
  .pipe(gulp.dest('components/sass/'))
  .pipe(notify({ 'message': 'Files have been copied.', 'onLast': true}))
});

