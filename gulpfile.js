"use strict";
const ejs = require("./bin").generateTasks("./testEjs", "./dist", [
  "**/_*.ejs",
]);
exports.ejs = ejs.buildEJS;
exports.watchEJS = ejs.watchEJS;
