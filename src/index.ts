"use strict";

const { src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const ejs = require("gulp-ejs");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const path = require("path");
const globby = require("globby");

/**
 * @deprecated Use generateTask
 * @param srcGlob
 * @param distDir
 */
export function get(srcGlob: string | string[], distDir: string): Function {
  return generateTask(srcGlob, distDir);
}
/**
 * ejs変換タスクを取得する。
 * @param srcGlob - 変換対象を表すglob ex) ['./src/ejs/ ** /*.ejs', './src/ejs/ ** /!_*.ejs']
 * @param distDir 出力先ディレクトリ ex) "./dist/"
 * @return gulpタスク
 */
export function generateTask(
  srcGlob: string | string[],
  distDir: string
): Function {
  distDir = path.resolve(process.cwd(), distDir);

  return () => {
    existsTarget(srcGlob);

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
}

const existsTarget = (entryPoints: string | string[]) => {
  const targets = globby.sync(entryPoints);
  if (targets == null || targets.length === 0) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `gulptask-ejs : Error no target files.
    The file specified by ${entryPoints} does not exist. The EJS task exits without outputting anything.
    ${entryPoints}で指定されたファイルが存在しません。EJSタスクは何も出力せずに終了します。`
    );
  }
};
