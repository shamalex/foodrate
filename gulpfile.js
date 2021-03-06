'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
// const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const webp = require('gulp-webp');

const paths =  {
  src: './assets/src/',              // paths.src
  build: './public/'           // paths.build
};

function styles() {
  return gulp.src(paths.src + 'scss/style.scss')
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    // .pipe(groupMediaQueries())
    .pipe(postcss([
      autoprefixer({overrideBrowserslist:  ['last 2 versions']}),
    ]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    // .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'));
}

function svgSprite() {
  return gulp.src(paths.src + 'img/svg/*.svg')
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite-svg.svg'))
    .pipe(gulp.dest(paths.build + 'img/'));
}

function scripts() {
  return gulp.src(paths.src + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function scriptsVendors() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      // 'node_modules/moment/min/moment.min.js',
      // 'node_modules/moment/min/locales.min.js',
      // 'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      // 'node_modules/simplebar/dist/simplebar.min.js',
      // 'node_modules/inputmask/dist/inputmask.min.js',
      // 'node_modules/croppie/croppie.min.js',
      'node_modules/select2/dist/js/select2.full.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'node_modules/sticky-js/dist/sticky.min.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
      'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
      // 'node_modules/chart.js/dist/Chart.bundle.min.js',

    ])
    // .pipe(uglify())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function cssVendors() {
  return gulp.src([
      'node_modules/select2/dist/css/select2.min.css',
      'node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
      'node_modules/slick-carousel/slick/slick-theme.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.min.css',
      'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
      // 'node_modules/chart.js/dist/Chart.min.css',
      // 'node_modules/croppie/croppie.css',
      // 'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
    ])
    .pipe(postcss([
      autoprefixer({overrideBrowserslist:  ['last 2 versions']}),
    ]))
    .pipe(cleanCSS())
    .pipe(concat('vendors.min.css'))
    .pipe(gulp.dest(paths.build + 'css/'))
}

function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(
        fileinclude({
            prefix: '<!--@',
            suffix: '-->',
            basepath: paths.src + 'templates/'
        })
    )
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(paths.build))
}

function images() {
  return gulp.src(paths.src + 'img/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(webp()) // если картинок будет много, то и времени будет уходить много
    .pipe(gulp.dest(paths.build + 'img/'));
}
function fonts() {
  return gulp.src(paths.src + 'fonts/**/*.*')
    .pipe(gulp.dest(paths.build + 'fonts/'));
}

function clean() {
  return del('public/build/')
}

function watch() {
  gulp.watch(paths.src + 'scss/*.scss', styles);
  gulp.watch(paths.src + 'js/*.js', scripts);
  gulp.watch(paths.src + '**/*.html', htmls);
  gulp.watch(paths.src + 'img/**/*.{jpg,jpeg,png,gif,svg}', images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.scriptsVendors = scriptsVendors;
exports.cssVendors = cssVendors;
exports.htmls = htmls;
exports.images = images;
exports.svgSprite = svgSprite;
exports.clean = clean;
exports.fonts = fonts;
exports.watch = watch;

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(styles, fonts, svgSprite, cssVendors, scripts, scriptsVendors, htmls, images)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, fonts, svgSprite, cssVendors, scripts, scriptsVendors, htmls, images),
  gulp.parallel(watch, serve)
));
