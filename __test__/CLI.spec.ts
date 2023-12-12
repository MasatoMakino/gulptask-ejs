// CLI.test.ts
import { describe, expect, it } from "vitest";
import { mockGenerateTasks } from "./CLIMock.ts";

describe("CLI", () => {
  it("should call generateTasks and buildEJS when --watch is not provided", async () => {
    const mockInstance = mockGenerateTasks();

    process.argv = ["node", "CLI.ts"];
    await import("../src/CLI.ts");

    expect(mockInstance.generateTasks).toHaveBeenCalled();
    expect(mockInstance.mockWatchEJS).not.toHaveBeenCalled();
    expect(mockInstance.mockBuildEJS).toHaveBeenCalled();
  });
});
