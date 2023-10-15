#!/usr/bin/env node

import { Command } from "commander";
import { generateTasks } from "./index.js";

const program = new Command();
program
  .option("-W --watch", "watch mode. default : false")
  .option("--srcDir <path>", "Source directory for ejs files ex. './src/ejs'")
  .option("--distDir <path>", "Output directory. ex. './dist'")
  .option(
    "--componentPatterns <string | string[]>",
    "[optional] Glob pattern for ejs components.",
  )
  .parse(process.argv);

const args = program.opts();

(async () => {
  const task = generateTasks(args.srcDir, args.distDir, args.componentPatterns);

  if (args.watch) {
    task.watchEJS();
  } else {
    await task.buildEJS();
  }
})();
