const { src, dest, watch, series, parallel } = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const htmlmin = require('gulp-htmlmin')
const postcss = require('gulp-postcss')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()

const files = {
    imageAssets: 'assets/logo_center.svg',
    cssPaths: 'assets/*.css',
    jsPaths: 'script.js',
    htmlPaths: 'index.html'
}

function copyImageAssets() {
    return src(files.imageAssets)
        .pipe(dest('dist/assets'))
        .pipe(browserSync.stream())
}

function compileCSS() {
    return src(files.cssPaths)
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer(), cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets'))
        .pipe(browserSync.stream())
}

function compileJS() {
    return src(files.jsPaths)
        .pipe(terser({
            ecma: 6
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const cbstring = new Date().getTime()
function compileHTML() {
    return src(files.htmlPaths)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(replace(/cb=\d+/g, `cb=${cbstring}`))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

function watchFiles() {
    watch(
        [files.cssPaths, files.jsPaths, files.htmlPaths],
        parallel(compileCSS, compileJS, compileHTML)
    )
}

function initServer() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })
}

exports.default = series(
    copyImageAssets,
    parallel(compileCSS, compileJS, compileHTML)
)
exports.develop = series(
    copyImageAssets,
    parallel(compileCSS, compileJS, compileHTML),
    parallel(watchFiles, initServer)
)