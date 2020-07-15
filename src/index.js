"use strict";

const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const ejs = require("gulp-ejs");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const path = require("path");

/**
 * ejs変換タスクを取得する。
 * @param {string | string[]} srcGlob - 変換対象を表すglob ex) ['./src/ejs/ ** /*.ejs', './src/ejs/ ** /!_*.ejs']
 * @param {string} distDir - ex) 出力先ディレクトリ "./dist/"
 * @return {function(): *} gulpタスク
 */
module.exports = (srcGlob, distDir) => {
  distDir = path.resolve(process.cwd(), distDir);

  return () => {
    //srcにlastRunは使用しない。includeしたejsが更新された時にwatch対象から漏れるため。
    return src(srcGlob)
      .pipe(plumber())
      .pipe(ejs())
      .pipe(rename({ extname: ".html" }))
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
      .pipe(dest(distDir));
  };
};
