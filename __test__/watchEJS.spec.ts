import { describe, expect, vi, it } from "vitest";
import { generateTasks } from "../src/index.js";
import * as path from "path";
import * as fs from "fs";

describe("watchEJS", () => {
  const srcDir = "./dummy";
  const distDir = "./dist";
  const fileName = "dummy.ejs";

  it("should trigger watchEJS on file addition", async () => {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    const tasks = generateTasks(srcDir, distDir);
    const mockConsoleLog = vi.spyOn(console, "log");
    const mockBuildEJS = vi.spyOn(tasks, "buildEJS");

    tasks.watchEJS();
    const filePath = path.resolve(srcDir, fileName);
    fs.writeFileSync(filePath, "dummy ejs file");
    await new Promise((resolve) => setTimeout(resolve, 300)); // ファイル変更が反映されるのを待つ

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining(`gulptask-ejs : [add] ${fileName}`),
    );
    expect(mockBuildEJS).toHaveBeenCalled();
    vi.resetAllMocks();
  });
});
