"use strict";
const ejs = require("./bin").generateTask(
  ["./testEjs/**/*.ejs", "!./testEjs/**/_*.ejs"],
  "./dist"
);
exports.ejs = ejs;
