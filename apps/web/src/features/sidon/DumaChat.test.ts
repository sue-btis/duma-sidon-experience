import { describe, expect, it } from "vitest";

import { getDumaReply } from "./DumaChat";

describe("getDumaReply", () => {
  it("returns the configured local demo response", () => {
    expect(getDumaReply("Respuesta de demostración.")).toBe("Respuesta de demostración.");
  });
});
