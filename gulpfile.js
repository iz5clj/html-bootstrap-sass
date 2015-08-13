var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    notify = require("gulp-notify") 
    bower = require('gulp-bower'),
    rename = require('gulp-rename');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bc' 
}

var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;    

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

sassSources = ['components/sass/style.scss'];

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
  .pipe(notify({
    message: 'Bootstrap files have been copied.',
    onLast: true
  }))

});

gulp.task('copyBootstrapVariables', ['bower'], function() {
  return gulp.src(['bc/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss'])
  .pipe(rename('_customVariables.scss'))
  .pipe(gulp.dest('components/sass/'))
  .pipe(notify({
    message: 'Bootstrap variables files have been copied.',
    onLast: true
  }))

});

gulp.task('copyIcons', ['bower'], function() { 
    return gulp.src('bc/fontawesome/fonts/**.*') 
    .pipe(gulp.dest('builds/development/fonts'))
    .pipe(notify({
    message: 'Icons have been copied.',
    onLast: true
  }))
});

gulp.task('copyIconsSass', ['bower'], function() { 
    return gulp.src('bc/fontawesome/scss/**.*') 
    .pipe(gulp.dest('components/sass/fontawesome/'))
    .pipe(notify({
    message: 'Sass files for icons have been copied.',
    onLast: true
  }))
});

gulp.task('compass', function() {
  return gulp.src(sassSources)
  .pipe(compass({ 
    sass: 'components/sass', 
    image: outputDir + 'images',
    css: outputDir + 'css',
    comments: true,
    precision: 8, // Imprtant for bootstrap sass. Default value is 5.
    style: sassStyle
  })
  .on('error', gutil.log))
  .pipe(gulp.dest(outputDir + 'css'))
  .pipe(notify({
    message: 'Sass files have been recompiled.'
  }))
  .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
  .pipe(gulpif(env === 'production', minifyHTML()))
  .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(notify({
    message: 'Some changes have been detected in your HTML files.'
  }))
  .pipe(connect.reload())
});

gulp.task('watch', function(){
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true // default port 35729
  })
});

gulp.task('init', ['copyBootstrap', 'copyBootstrapVariables', 'copyIcons', 'copyIconsSass']);

gulp.task('default', ['compass', 'connect', 'watch']);
