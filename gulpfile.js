const autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const mkdirp = require('mkdirp');

gulp.task('js', () => {
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/scripts'))
});

gulp.task('img', () => {
    gulp.src(['app/images/**/*'])
        .pipe(gulp.dest('public/images'));
});

gulp.task('scss', () => {
    gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
              errLogToConsole: true,
              includePaths: [
                  'app/scss/'
              ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('html', () => {
    gulp.src('app/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

gulp.task('clean', () => {
    del.sync('public');
});

gulp.task('scaffold', function() {
    mkdirp.sync('public');
    mkdirp.sync('public/images');
    mkdirp.sync('public/scripts');
    mkdirp.sync('public/styles');
});

gulp.task('default', ['clean', 'scaffold', 'browserSync', 'scss', 'js', 'html'], function() {
    gulp.watch('app/js/**.js', ['js']);
    gulp.watch('app/scss/**.scss', ['scss']);
    gulp.watch('app/images/**', ['img']);
    gulp.watch('app/*.html', ['html']);
});

gulp.task('deploy', ['clean', 'scaffold', 'js', 'css', 'img', 'html']);
