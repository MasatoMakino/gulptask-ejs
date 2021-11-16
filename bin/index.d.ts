/**
 * ejs変換タスクを取得する。
 * @param srcDir - 入力ディレクトリ ex) "./src/"
 * @param distDir 出力先ディレクトリ ex) "./dist/"
 * @param componentPatterns - コンポーネントファイルのglob、出力対象にはならないが、watchの対象にはなる。
 * @return gulpタスク
 */
export declare function generateTasks(srcDir: string, distDir: string, componentPatterns?: string | string[]): {
    buildEJS: Function;
    watchEJS: Function;
};
//# sourceMappingURL=index.d.ts.map