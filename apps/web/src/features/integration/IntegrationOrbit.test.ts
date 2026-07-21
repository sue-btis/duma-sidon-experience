import { describe, expect, it } from "vitest";

import { getNearestFrontIndex, getOrbitCardLayout } from "./orbitMath";

describe("integration orbit geometry", () => {
  it("distributes seven visible cards on one horizontal 3D ring", () => {
    const dimensions = { radiusX: 420, radiusZ: 280 };
    const cards = Array.from({ length: 7 }, (_, index) => getOrbitCardLayout(index, 7, 0, dimensions));

    expect(getNearestFrontIndex(0, 7)).toBe(0);
    expect(cards.every((card) => card.y === 0)).toBe(true);
    expect(cards[1].angle - cards[0].angle).toBeCloseTo((Math.PI * 2) / 7);
    expect(Math.min(...cards.map((card) => card.opacity))).toBeGreaterThanOrEqual(0.36);
    expect(cards[0].scale).toBeGreaterThan(cards[3].scale);
    expect(cards[0].zIndex).toBeGreaterThan(cards[3].zIndex);
  });
});
