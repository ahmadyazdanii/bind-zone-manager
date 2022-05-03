let { src, dest, parallel } = require("gulp");
let uglify = require("gulp-uglify");
let del = require("del");

function cleanupDist() {
    return del("dist/**");
}

function uglifyJs() {
    return src("dist/**/*.js").pipe(uglify()).pipe(dest("dist"));
}

function cleanupSM() {
    return del("dist/**/*.js.map");
}

module.exports.cleanupDist = cleanupDist;
module.exports.afterBuild = parallel(uglifyJs, cleanupSM);
