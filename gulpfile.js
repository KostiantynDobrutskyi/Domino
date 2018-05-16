var gulp = require("gulp"),
    sync = require("browser-sync").create(),
    del = require("del"),
    plugins = require("gulp-load-plugins")({
        scope: ["devDependencies"]
    });

gulp.task("html", function () {
    return gulp.src("src/views/*.html")
        .pipe(plugins.htmlExtend())
        .pipe(gulp.dest("dist"))
        .pipe(sync.stream())
});

gulp.task("js", function () {
    return gulp.src("src/scripts/**/*.js")
        .pipe(plugins.concat("app.min.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(sync.stream())
});

gulp.task("scripts:vendor", function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js"
    ])
        .pipe(plugins.concat("scripts-vendor.min.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("dist/js"))
});

gulp.task("styles:app", function () {
    return gulp.src("src/styles/app.less")
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream())
});



gulp.task("clean", function (cb) {
    del.sync("dist");
    cb();
});

gulp.task("build", ["clean"], function () {
    gulp.start(["html", "styles:app",  "js"]);
});

gulp.task("watch", ["build"], function () {
    sync.init({
        server: "dist"
    });
    gulp.watch("src/styles/**/*.less", ["styles:app"]);

    gulp.watch("src/scripts/*.js", ["js"]);

    gulp.watch("src/views/**/*.html", ["html"]);
    // gulp.watch("dist/*.html").on("change", sync.reload());

});

gulp.task("default", ["watch"]);
