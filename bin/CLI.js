#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const index_1 = require("./index");
const program = new commander_1.Command();
program
    .option("-W --watch", "watch mode. default : false")
    .option("--srcDir <path>", "Source directory for ejs files ex. './src/ejs'")
    .option("--distDir <path>", "Output directory. ex. './dist'")
    .option("--componentPatterns <string | string[]>", "[optional] Glob pattern for ejs components.")
    .parse(process.argv);
const args = program.opts();
(async () => {
    const task = (0, index_1.generateTasks)(args.srcDir, args.distDir, args.componentPatterns);
    if (args.watch) {
        task.watchEJS();
    }
    else {
        await task.buildEJS();
    }
})();
