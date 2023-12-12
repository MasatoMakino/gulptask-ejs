import { vi } from "vitest";
import * as index from "../src/index.js";

export const mockGenerateTasks = () => {
  const mockWatchEJS = vi.fn();
  const mockBuildEJS = vi.fn();

  vi.spyOn(index, "generateTasks").mockReturnValue({
    watchEJS: mockWatchEJS,
    buildEJS: mockBuildEJS,
  });

  return {
    generateTasks: index.generateTasks,
    mockWatchEJS,
    mockBuildEJS,
  };
};
