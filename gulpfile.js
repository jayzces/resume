const { src, dest, watch, series, parallel } = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const htmlmin = require('gulp-htmlmin')
const postcss = require('gulp-postcss')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')

const files = {
    imageAssets: 'assets/logo_center.svg',
    cssPaths: 'assets/*.css',
    jsPaths: 'script.js',
    htmlPaths: 'index.html'
}

function copyImageAssets() {
    return src(files.imageAssets)
        .pipe(dest('dist/assets'))
}

function compileCSS() {
    return src(files.cssPaths)
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer(), cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets'))
}

function compileJS() {
    return src(files.jsPaths)
        .pipe(terser({
            ecma: 6
        }))
        .pipe(dest('dist'))
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
}

function watchFiles() {
    watch(
        [files.cssPaths, files.jsPaths],
        parallel(compileCSS, compileJS, compileHTML)
    )
}

exports.default = series(
    copyImageAssets,
    parallel(compileCSS, compileJS, compileHTML)
)
exports.develop = series(
    copyImageAssets,
    parallel(compileCSS, compileJS, compileHTML),
    watchFiles
)