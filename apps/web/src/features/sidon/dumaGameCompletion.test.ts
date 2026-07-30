import { describe, expect, it } from "vitest";

import { getDumaGameCompletionKey, isDumaGameCompletionMessage } from "./dumaGameCompletion";

describe("Duma game completion", () => {
  it("uses a stable per-game storage key", () => {
    expect(getDumaGameCompletionKey("sense")).toBe("duma-game:sense:played");
  });

  it("accepts only the expected game's completion message", () => {
    expect(isDumaGameCompletionMessage({ game: "sense", type: "duma-game-completed" }, "sense")).toBe(true);
    expect(isDumaGameCompletionMessage({ game: "smart-audits", type: "duma-game-completed" }, "sense")).toBe(false);
  });
});
