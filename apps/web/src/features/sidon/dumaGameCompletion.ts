export const dumaGameIds = ["sense", "smart-audits"] as const;

export type DumaGameId = (typeof dumaGameIds)[number];

export function getDumaGameCompletionKey(game: DumaGameId) {
  return `duma-game:${game}:played`;
}

export function isDumaGameCompletionMessage(value: unknown, game: DumaGameId): boolean {
  if (!value || typeof value !== "object") return false;
  const message = value as { game?: unknown; type?: unknown };
  return message.type === "duma-game-completed" && message.game === game;
}
