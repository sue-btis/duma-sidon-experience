import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SidonModuleExperience, type SidonModuleNarrative } from "./SidonModuleExperience";

const narrative: SidonModuleNarrative = {
  continuity: { duma: { lead: "Duma lead", title: "Duma title" }, lead: "Continuity lead", title: "Continuity title" },
  headline: "Narrative headline",
  lead: "Narrative lead",
  logic: { lead: "Logic lead", stages: ["Asset", "Need"], title: "Logic title" },
  outcomes: [{ label: "Visibility", lead: "Outcome lead", title: "Outcome title" }],
};

describe("Sidón module narratives", () => {
  it("renders the approved narrative instead of the generic module section", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" narrative={narrative} solves="Generic solve" />);

    expect(page).toContain("Narrative headline");
    expect(page).toContain("Logic title");
    expect(page).toContain("Outcome title");
    expect(page).not.toContain("Generic solve");
  });

  it("omits Duma when the approved narrative does not include it", () => {
    const withoutDuma: SidonModuleNarrative = { ...narrative, continuity: { lead: "Continuity lead", title: "Continuity title" } };
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" narrative={withoutDuma} solves="Generic solve" />);

    expect(page).not.toContain("Duma title");
  });
});
