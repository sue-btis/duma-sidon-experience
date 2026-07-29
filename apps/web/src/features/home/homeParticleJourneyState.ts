export type FinalJourneyState = Readonly<{
  completed: boolean;
  startedAt: number | null;
}>;

const FINAL_DURATION_MS = 1_100;

const easeOut = (value: number) => 1 - (1 - value) ** 3;

export function initializeJourney(startedAt: number | null, now: number) {
  return {
    shouldActivate: startedAt === null,
    startedAt: startedAt ?? now,
  };
}

export function advanceFinalJourney(state: FinalJourneyState, isInView: boolean, now: number): FinalJourneyState {
  if (state.completed) return state;
  if (state.startedAt === null) return isInView ? { completed: false, startedAt: now } : state;
  return !isInView || now - state.startedAt >= FINAL_DURATION_MS ? { ...state, completed: true } : state;
}

export function getFinalJourneyProgress(state: FinalJourneyState, now: number) {
  if (state.completed) return 1;
  if (state.startedAt === null) return 0;
  return easeOut(Math.min(1, Math.max(0, (now - state.startedAt) / FINAL_DURATION_MS)));
}
