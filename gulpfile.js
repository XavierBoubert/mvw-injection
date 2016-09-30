'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    insert = require('gulp-insert'),
    packagejson = require('./package.json'),
    header = '/*! MVW-Injection (' + packagejson.version + '). (C) 2016 Xavier Boubert. MIT @license: en.wikipedia.org/wiki/MIT_License */\r\n',
    distPath = './dist',
    diFile = 'features/dependency-injection/dependency-injection.js',
    patternFiles = {
      mvc: 'features/mvc/mvc.js',
      mvvm: 'features/mvvm/mvvm.js'
    };

function _addHeader(contents) {
  if (contents.substr(0, 1) != '{') {
    contents = header + contents;
  }

  return contents;
}

gulp.task('default', ['build', 'watch']);

gulp.task('build', function() {

  gulp
    .src(diFile)
    .pipe(insert.prepend(header))
    .pipe(gulp.dest(distPath))
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', function(err) {
      console.log('MVW-Injection:error', {
        error: err
      });

      this.emit('end');
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(insert.transform(_addHeader))
    .pipe(gulp.dest(distPath));

  Object.keys(patternFiles).forEach(function(name) {
    var file = patternFiles[name];

    gulp
      .src([diFile, file])
      .pipe(concat(name + '-injection.js', {
        newLine: '\r\n'
      }))
      .pipe(insert.prepend(header))
      .pipe(gulp.dest(distPath))
      .pipe(sourcemaps.init())
      .pipe(uglify().on('error', function(err) {
        console.log('MVW-Injection:error', {
          error: err
        });

        this.emit('end');
      }))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(insert.transform(_addHeader))
      .pipe(gulp.dest(distPath));
  });
});

gulp.task('watch', function() {
  gulp.watch('./features/**/*.js', ['build']);
});
