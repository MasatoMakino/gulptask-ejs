"use strict";

import ejs from "ejs";
import path from "path";
import { glob } from "glob";
import chokidar from "chokidar";
import { mkdir, writeFile } from "fs/promises";

/**
 * ejs変換タスクを取得する。
 * @param srcDir - 入力ディレクトリ ex) "./src/"
 * @param distDir 出力先ディレクトリ ex) "./dist/"
 * @param componentPatterns - コンポーネントファイルのglob、出力対象にはならないが、watchの対象にはなる。
 * @return gulpタスク
 */
export function generateTasks(
  srcDir: string,
  distDir: string,
  componentPatterns?: string | string[]
): {
  buildEJS: Function;
  watchEJS: Function;
} {
  distDir = path.resolve(process.cwd(), distDir);

  const buildEJS = async () => {
    const srcFiles = await existsTarget(srcDir, componentPatterns);
    for (const srcFile of srcFiles) {
      await build(srcFile, srcDir, distDir);
    }
  };

  const watchEJS = () => {
    chokidar
      .watch(path.resolve(srcDir, "**/*.ejs"))
      .on("all", (type: string, filePath: string) => {
        console.log(
          `gulptask-ejs : [${type}] ${path.relative(srcDir, filePath)}`
        );
        buildEJS();
      });
  };

  return {
    buildEJS,
    watchEJS,
  };
}

/**
 * 1つのejsファイルをrenderingして、ファイルに保存する
 * @param srcFile ファイルパス srcDirからの相対パス
 * @param srcDir 入力ディレクトリ
 * @param distDir 出力ディレクトリ
 */
const build = async (srcFile: string, srcDir: string, distDir: string) => {
  const result = await ejs.renderFile(path.resolve(srcDir, srcFile));
  const distPath = path.parse(path.resolve(distDir, srcFile));
  await mkdir(distPath.dir, { recursive: true });
  await writeFile(path.resolve(distPath.dir, distPath.name + ".html"), result);
};

const existsTarget = async (
  dir: string,
  ignorePattern: string | string[]
): Promise<string[]> => {
  const targets = await glob.sync("**/*.ejs", {
    cwd: dir,
    ignore: ignorePattern,
  });

  if (targets == null || targets.length === 0) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `gulptask-ejs : Error no target files.
    The file specified by ${dir} does not exist. The EJS task exits without outputting anything.
    ${dir}で指定されたファイルが存在しません。EJSタスクは何も出力せずに終了します。`
    );
  }

  return targets;
};
