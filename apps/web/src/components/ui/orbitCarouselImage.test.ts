import { describe, expect, it } from "vitest";

import { getLocalizedCarouselImage } from "./orbitCarouselImage";

describe("carousel image localization", () => {
  it("inserts the locale before the carousel suffix", () => {
    expect(getLocalizedCarouselImage("/home/worlds/sidon/maintenance-and-data-carousel.png", "es")).toBe("/home/worlds/sidon/maintenance-and-data-es-carousel.png");
  });
});
