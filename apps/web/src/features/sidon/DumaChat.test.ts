import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { DumaChat, getDumaReply, getDumaSelectorDistance } from "./DumaChat";

describe("getDumaReply", () => {
  it("returns the configured local demo response", () => {
    expect(getDumaReply("Respuesta de demostración.")).toBe("Respuesta de demostración.");
  });

  it("caps the visual distance from the selected module", () => {
    expect(getDumaSelectorDistance(4, 0)).toBe(3);
  });

  it("opens the first category accordion by default", () => {
    const page = renderToStaticMarkup(createElement(DumaChat, { categoryNavigatorLabel: "Categories", content: { attach: "Attach", attachedFile: "File", greeting: "Greeting", label: "Suggestions", placeholder: "Ask", reply: "Reply", send: "Send", suggestions: [], title: "Duma" }, moduleGroups: [{ id: "maintenance", name: "Maintenance", modules: [{ icon: "/mantiz.png", id: "mantiz", name: "Mantiz" }] }, { id: "audits", name: "Audits", modules: [{ icon: "/argos.png", id: "argos", name: "Argos" }] }] }));

    expect(page).toContain('aria-expanded="true"');
    expect(page).toContain('aria-expanded="false"');
    expect(page).toContain(">Mantiz</span>");
  });
});
