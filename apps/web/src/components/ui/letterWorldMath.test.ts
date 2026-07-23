import { describe, expect, it } from "vitest";

import { getFrontAlpha } from "./letterWorldMath";

describe("letter world visibility", () => {
  it("hides the rear hemisphere and fades the rim", () => {
    expect(getFrontAlpha(-0.1)).toBe(0);
    expect(getFrontAlpha(0)).toBe(0);
    expect(getFrontAlpha(0.09)).toBe(0.5);
    expect(getFrontAlpha(0.5)).toBe(1);
  });
});
