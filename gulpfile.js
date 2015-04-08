'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    insert = require('gulp-insert'),
    packagejson = require('./package.json'),
    header = '/*! MVC-Injection (' + packagejson.version + '). (C) 2015 Xavier Boubert. MIT @license: en.wikipedia.org/wiki/MIT_License */\r\n',
    files = [
      'features/dependency-injection/dependency-injection.js',
      'features/mvc/mvc.js'
    ];

gulp.task('default', ['build', 'watch']);

gulp.task('build', function() {
  gulp
    .src(files)
    .pipe(concat('mvc-injection.js', {newLine: '\r\n'}))
    .pipe(insert.prepend(header))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify('mvc-injection.min.js', {
      outSourceMap: true
    }))
    .pipe(insert.transform(function(contents) {
      if (contents.substr(0, 1) != '{') {
        contents = header + contents;
      }

      return contents;
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./features/**/*.js', ['build']);
});
