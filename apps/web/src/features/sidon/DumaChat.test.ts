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

  it("renders the module carousel and example chat history inside the chat", () => {
    const page = renderToStaticMarkup(createElement(DumaChat, { categoryNavigatorLabel: "Categories", content: { attach: "Attach", attachedFile: "File", greeting: "Greeting", history: ["Operational priorities"], historyLabel: "Recent chats", label: "Conversation with Duma AI", placeholder: "Ask", reply: "Reply", send: "Send", suggestions: [], title: "Duma" }, moduleGroups: [{ id: "maintenance", name: "Maintenance", modules: [{ icon: "/mantiz.png", id: "mantiz", name: "Mantiz" }] }, { id: "audits", name: "Audits", modules: [{ icon: "/argos.png", id: "argos", name: "Argos" }] }] }));

    expect(page).toContain("Duma AI");
    expect(page).toContain("Operational priorities");
    expect(page).toContain(">Mantiz</span>");
    expect(page).toContain('aria-current="page"');
  });
});
