"use strict";
const ejs = require("./src")(
  ["./testEjs/**/*.ejs", "!./testEjs/**/_*.ejs"],
  "./dist"
);
exports.ejs = ejs;
