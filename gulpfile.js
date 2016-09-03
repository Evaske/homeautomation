/*global require*/

//  Requirements
//  ------------
var gulp = require('gulp');
var sass = require('gulp-sass');

//  SASS Tasks
//  ----------
gulp.task('sass', function () {

  'use strict';

  gulp.src('./stylesheets/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

//  Defaults Tasks
//  -----------
gulp.task('default', ['build'], function () {

  'use strict';

  gulp.watch('**/*.scss', ['sass']);
});

gulp.task('build', ['sass']);
