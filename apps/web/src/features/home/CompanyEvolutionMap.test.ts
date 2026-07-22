import { describe, expect, it } from "vitest";

import { removeSmallIslands } from "./CompanyEvolutionMap";

const countries = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [[[0, 0], [3, 0], [3, 3], [0, 0]]],
          [[[5, 5], [5.1, 5], [5.1, 5.1], [5, 5]]],
        ],
      },
    },
  ],
} as const;

describe("removeSmallIslands", () => {
  it("keeps the mainland and removes tiny polygon components", () => {
    const result = removeSmallIslands(countries);

    expect(result.features[0].geometry.coordinates).toHaveLength(1);
  });
});
