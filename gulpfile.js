const {src, dest, watch, parallel, series} = require('gulp'),
    sync = require("browser-sync").create(),
    del = require("del"),
    plugins = require("gulp-load-plugins")({
        scope: ["devDependencies"]
    });


function html() {
    return src("src/views/*.html")
        .pipe(plugins.htmlExtend())
        .pipe(dest("dist"))
        .pipe(sync.stream())
}

function stylesApp() {
    return src("src/styles/app.less")
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(plugins.cssnano())
        .pipe(dest("dist/css"))
        .pipe(sync.stream())
}

function js() {
    return src("src/scripts/**/*.js")
        .pipe(plugins.concat("app.min.js"))
        .pipe(plugins.uglify())
        .pipe(dest("dist/js"))
        .pipe(sync.stream())
}

function clean(cb) {
    del.sync("dist");
    cb();
}

function watcher() {
    sync.init({
        server: "dist"
    });
    watch("src/styles/**/*.less", parallel(stylesApp));
    watch("src/views/**/*.html", parallel(html));

}

exports.default = series(clean, parallel(
    html,
    stylesApp,
    js
), watcher);