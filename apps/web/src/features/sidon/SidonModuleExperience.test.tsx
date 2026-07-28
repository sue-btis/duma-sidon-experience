import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SidonModuleExperience, type SidonModuleNarrative } from "./SidonModuleExperience";

const narrative: SidonModuleNarrative = {
  flow: { intro: "Flow intro", stages: [{ description: "Step detail", name: "Request", sceneCopy: "Scene detail", sceneTitle: "Scene title", status: "Open" }], title: "Flow title" },
  headline: "Narrative headline",
  lead: "Narrative lead",
};

describe("Sidón module narratives", () => {
  it("renders the approved narrative instead of the generic module section", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactEyebrow="Conversemos" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" narrative={narrative} solves="Generic solve" />);

    expect(page).toContain("Narrative headline");
    expect(page).toContain("Mantiz");
    expect(page).toContain("mantiz.png");
    expect(page).toContain("Flow title");
    expect(page).toContain("Scene title");
    expect(page).toContain("moduleVisual");
    expect(page).toContain("Conversemos");
    expect(page).toContain("mantiz-industrial.png");
    expect(page).toContain("prueba.png");
    expect(page).not.toContain("/_next/image?");
    expect(page).not.toContain("Generic solve");
  });

  it("renders the generic module section when no narrative is approved", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactEyebrow="Conversemos" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" solves="Generic solve" />);

    expect(page).toContain("Generic solve");
  });
});
