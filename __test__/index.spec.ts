import { describe, vi, it, expect } from "vitest";
import { generateTasks } from "../src/index.js";
import fs from "fs";

describe("index", () => {
  it("should generate tasks", () => {
    const tasks = generateTasks("./testEjs", "./dist");
    expect(tasks).toBeTruthy();
  });

  it("should generate html", async () => {
    const tasks = generateTasks("./testEjs", "./dist", "**/_*.ejs");
    await tasks.buildEJS();

    expect(fs.existsSync("./dist/index.html")).toBeTruthy();
    expect(fs.existsSync("./dist/sub/sub.html")).toBeTruthy();
    expect(fs.existsSync("./dist/_component.html")).toBeFalsy();
  });
});
