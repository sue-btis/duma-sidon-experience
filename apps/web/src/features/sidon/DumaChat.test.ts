import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { DumaChat, getDumaConversation, getDumaReply, getDumaSelectorDistance, getTypedText, type DumaChatCopy, type DumaChatModuleGroup } from "./DumaChat";

const content: DumaChatCopy = {
  attach: "Attach", attachedFile: "File", categoryDumaReply: "{intro} Modules: {modules}.", categoryQuestion: "What is {name}?", categorySuggestionAnswers: ["{solves}", "{modules}", "Duma helps {name}."], categorySuggestions: ["What does it solve?", "Which modules?", "How does Duma help?"], greeting: "Greeting", historyLabel: "Recent chats", label: "Conversation with Duma AI", moduleExampleAnswer: "Available information in {name}.", moduleExampleQuestion: "What can I consult in {name}?", moduleQuestion: "What is {name}?", moduleSuggestionAnswers: ["{description}", "{name} in {category}.", "Review {name}."], moduleSuggestions: ["What does {name} solve?", "How does it relate to {category}?", "What should I review?"], placeholder: "Ask", reply: "Reply", send: "Send", thinking: "Duma is thinking", title: "Duma",
};

const moduleGroups: DumaChatModuleGroup[] = [{ id: "maintenance", intro: "Maintains assets.", name: "Maintenance", solves: "Keeps assets available.", modules: [{ description: "Organizes maintenance work.", icon: "/mantiz.png", id: "mantiz", name: "Mantiz" }] }, { id: "audits", intro: "Verifies standards.", name: "Audits", solves: "Keeps evidence clear.", modules: [{ description: "Analyzes evidence.", icon: "/argos.png", id: "argos", name: "Argos" }] }];

describe("DumaChat", () => {
  it("returns the configured local demo response", () => {
    expect(getDumaReply("Demo reply.")).toBe("Demo reply.");
  });

  it("caps the visual distance from the selected module", () => {
    expect(getDumaSelectorDistance(4, 0)).toBe(3);
  });

  it("reveals a Duma reply one character at a time", () => {
    expect(getTypedText("Duma", 2)).toBe("Du");
    expect(getTypedText("Duma", 20)).toBe("Duma");
  });

  it("seeds category conversations with modules and three contextual suggestions", () => {
    const conversation = getDumaConversation({ categoryIndex: 0, kind: "category" }, content, moduleGroups);

    expect(conversation.messages).toEqual([{ author: "user", text: "What is Maintenance?" }, { author: "duma", text: "Maintains assets. Modules: Mantiz." }]);
    expect(conversation.suggestions).toHaveLength(3);
    expect(conversation.suggestions[0].answer).toBe("Keeps assets available.");
  });

  it("adds a category example only when the category configures one", () => {
    const visualContent = { ...content, categoryExamples: { maintenance: { answer: "Availability needs review.", question: "Show category availability.", visual: { description: "Illustrative data only.", label: "Availability", metric: "92%", type: "line" as const } } } };

    expect(getDumaConversation({ categoryIndex: 0, kind: "category" }, visualContent, moduleGroups).messages).toHaveLength(4);
    expect(getDumaConversation({ categoryIndex: 1, kind: "category" }, visualContent, moduleGroups).messages).toHaveLength(2);
  });

  it("seeds a selected module with an example exchange and contextual suggestions", () => {
    const conversation = getDumaConversation({ categoryIndex: 0, kind: "module", moduleId: "mantiz" }, content, moduleGroups);

    expect(conversation.id).toBe("module-mantiz");
    expect(conversation.messages).toHaveLength(4);
    expect(conversation.messages[1].text).toBe("Organizes maintenance work.");
    expect(conversation.suggestions[0].question).toBe("What does Mantiz solve?");
  });

  it("adds an illustrative visual only when the selected module configures one", () => {
    const visualContent = { ...content, moduleExamples: { mantiz: { answer: "Availability is stable.", question: "Show Mantiz availability.", visual: { description: "Illustrative data only.", label: "Availability", metric: "92%", type: "line" as const } } } };

    expect(getDumaConversation({ categoryIndex: 0, kind: "module", moduleId: "mantiz" }, visualContent, moduleGroups).messages[3]).toMatchObject({ visual: { metric: "92%" } });
    expect(getDumaConversation({ categoryIndex: 1, kind: "module", moduleId: "argos" }, visualContent, moduleGroups).messages[3]).not.toHaveProperty("visual");
  });

  it("renders the first category conversation and internal history", () => {
    const page = renderToStaticMarkup(createElement(DumaChat, { categoryNavigatorLabel: "Categories", content, moduleGroups }));

    expect(page).toContain("Recent chats");
    expect(page).toContain("Maintenance");
    expect(page).toContain(">Mantiz</span>");
    expect(page).toContain('aria-current="page"');
  });
});
