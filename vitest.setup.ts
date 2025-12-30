import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, expect, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";

failOnConsole({
  shouldFailOnError: true
});

expect.addSnapshotSerializer({
  serialize(value) {
    const rect = value as DOMRect;
    return `${rect.x}, ${rect.y} (${rect.width} x ${rect.height})`;
  },
  test(value) {
    return (
      value !== null &&
      typeof value === "object" &&
      "x" in value &&
      "y" in value &&
      "width" in value &&
      "height" in value
    );
  }
});

expect.extend({
  toLogError: (callback: () => unknown, expectedError: string) => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    callback();

    expect(console.error).toHaveBeenCalledWith(expectedError);

    spy.mockReset();

    return {
      pass: true,
      message: () => ""
    };
  }
});

beforeAll(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {
    throw Error("Unexpectec console warning");
  });
});

beforeEach(() => {});

afterEach(() => {
  cleanup();
});
