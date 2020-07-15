"use strict";
const ejs = require("./bin").get(
  ["./testEjs/**/*.ejs", "!./testEjs/**/_*.ejs"],
  "./dist"
);
exports.ejs = ejs;
