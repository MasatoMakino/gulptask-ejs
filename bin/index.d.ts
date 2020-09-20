/**
 * @deprecated Use generateTask
 * @param srcGlob
 * @param distDir
 */
export declare function get(
  srcGlob: string | string[],
  distDir: string
): Function;
/**
 * ejs変換タスクを取得する。
 * @param srcGlob - 変換対象を表すglob ex) ['./src/ejs/ ** /*.ejs', './src/ejs/ ** /!_*.ejs']
 * @param distDir 出力先ディレクトリ ex) "./dist/"
 * @return gulpタスク
 */
export declare function generateTask(
  srcGlob: string | string[],
  distDir: string
): Function;
//# sourceMappingURL=index.d.ts.map
