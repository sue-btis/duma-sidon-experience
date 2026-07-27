import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SidonModuleExperience, type SidonModuleNarrative } from "./SidonModuleExperience";

const narrative: SidonModuleNarrative = {
  headline: "Narrative headline",
  lead: "Narrative lead",
  moment: { lead: "Moment lead", title: "Moment title" },
  role: { lead: "Role lead", title: "Role title" },
};

describe("Sidón module narratives", () => {
  it("renders the approved narrative instead of the generic module section", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" narrative={narrative} solves="Generic solve" />);

    expect(page).toContain("Narrative headline");
    expect(page).toContain("Mantiz");
    expect(page).toContain("mantiz.png");
    expect(page).toContain("Moment title");
    expect(page).toContain("Role title");
    expect(page).toContain("prueba.png");
    expect(page).not.toContain("/_next/image?");
    expect(page).not.toContain("Generic solve");
  });

  it("renders the generic module section when no narrative is approved", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactLead="Lead" contactTitle="Title" description="Generic description" locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" solves="Generic solve" />);

    expect(page).toContain("Generic solve");
  });
});
