"use strict";
const ejs = require("./index.js")(["./src/**/*.ejs", "!./src/**/_*.ejs"],"./dist");
exports.ejs = ejs;
