import { describe, expect, vi, it } from "vitest";
import { generateTasks } from "../src/index.js";
import * as path from "path";
import * as fs from "fs";

describe("watchEJS", () => {
  it("should trigger watchEJS on file addition", async () => {
    const srcDir = "./dummy";
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    const tasks = generateTasks(srcDir, "./dist");
    const mockConsoleLog = vi.spyOn(console, "log");

    tasks.watchEJS();
    const filePath = path.resolve(srcDir, "dummy.ejs");
    fs.writeFileSync(filePath, "dummy ejs file");
    await new Promise((resolve) => setTimeout(resolve, 300)); // ファイル変更が反映されるのを待つ

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining("gulptask-ejs : [add] dummy.ejs"),
    );

    vi.resetAllMocks();
  });
});
