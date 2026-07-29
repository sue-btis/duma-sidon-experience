import { describe, expect, it } from "vitest";

import { advanceFinalJourney, getFinalJourneyProgress, initializeJourney, type FinalJourneyState } from "./homeParticleJourneyState";

describe("home particle journey", () => {
  it("keeps the final logo resolved after its first completed animation", () => {
    const initial: FinalJourneyState = { completed: false, startedAt: null };
    const started = advanceFinalJourney(initial, true, 100);
    const completed = advanceFinalJourney(started, false, 200);

    expect(completed.completed).toBe(true);
    expect(getFinalJourneyProgress(completed, 5_000)).toBe(1);
    expect(advanceFinalJourney(completed, true, 5_000)).toBe(completed);
  });

  it("does not reactivate the opening animation after resize", () => {
    const initialLoad = initializeJourney(null, 100);
    const resize = initializeJourney(initialLoad.startedAt, 5_000);

    expect(initialLoad).toEqual({ shouldActivate: true, startedAt: 100 });
    expect(resize).toEqual({ shouldActivate: false, startedAt: 100 });
  });
});
