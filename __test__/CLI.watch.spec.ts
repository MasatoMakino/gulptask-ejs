import { describe, expect, it } from "vitest";
import { mockGenerateTasks } from "./CLIMock.ts";

describe("CLI", () => {
  it.concurrent(
    "should call generateTasks and watchEJS when --watch is provided",
    async () => {
      const mockInstance = mockGenerateTasks();

      process.argv = ["node", "CLI.ts", "--watch"];
      await import("../src/CLI.ts");

      expect(mockInstance.generateTasks).toHaveBeenCalled();
      expect(mockInstance.mockWatchEJS).toHaveBeenCalled();
      expect(mockInstance.mockBuildEJS).not.toHaveBeenCalled();
    },
  );
});
