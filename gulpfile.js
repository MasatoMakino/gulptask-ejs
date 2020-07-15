"use strict";
const ejs = require("./index.js")(["./testEjs/**/*.ejs", "!./testEjs/**/_*.ejs"],"./dist");
exports.ejs = ejs;
