import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SidonModuleExperience, type SidonModuleNarrative } from "./SidonModuleExperience";
import { getPhaseImage } from "./SidonModuleFlow";

const narrative: SidonModuleNarrative = {
  flow: { intro: "Flow intro", stages: [{ description: "Step detail", name: "Request", sceneCopy: "Scene detail", sceneTitle: "Scene title", status: "Open" }], title: "Flow title" },
  headline: "Narrative headline",
  lead: "Narrative lead",
};

describe("Sidón module narratives", () => {
  it("uses WebP phase images for every Mantiz stage", () => {
    expect(getPhaseImage("mantiz", 1)).toContain("mantiz-fase-02.webp");
    expect(getPhaseImage("mantiz", 3)).toContain("mantiz-fase-04.webp");
  });

  it("uses AxessOne's existing unpadded phase filenames", () => {
    expect(getPhaseImage("axessone", 1)).toContain("axessone-fase-2.webp");
  });

  it("renders the approved narrative instead of the generic module section", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactEyebrow="Conversemos" contactLead="Lead" contactTitle="Title" description="Generic description" dumaGame={{ invitationAction: "Play", invitationBody: "Find anomalies", invitationTitle: "Shall we play?" }} locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" narrative={narrative} solves="Generic solve" />);

    expect(page).toContain("Narrative headline");
    expect(page).toContain("Mantiz");
    expect(page).toContain("mantiz.png");
    expect(page).toContain("Flow title");
    expect(page).toContain("Scene title");
    expect(page).toContain("moduleVisual");
    expect(page).toContain("moduleFlowImage");
    expect(page).toContain("Conversemos");
    expect(page).toContain("mantiz-industrial.webp");
    expect(page).toContain("mantiz-fase-01.webp");
    expect(page).not.toContain("/_next/image?");
    expect(page).not.toContain("Generic solve");
  });

  it("renders the generic module section when no narrative is approved", () => {
    const page = renderToStaticMarkup(<SidonModuleExperience categoryName="Maintenance" categorySlug="maintenance" contactAction="Talk" contactEyebrow="Conversemos" contactLead="Lead" contactTitle="Title" description="Generic description" dumaGame={{ invitationAction: "Play", invitationBody: "Find anomalies", invitationTitle: "Shall we play?" }} locale="en" moduleIcon="/mantiz.png" moduleName="Mantiz" moduleSlug="mantiz" solves="Generic solve" />);

    expect(page).toContain("Generic solve");
  });

  it("offers the game with Duma in the Sense header and phase image only", () => {
    const props = { categoryName: "Monitoring", categorySlug: "monitoreo", contactAction: "Talk", contactEyebrow: "Let's talk", contactLead: "Lead", contactTitle: "Title", description: "Description", dumaGame: { invitationAction: "Play", invitationBody: "Find anomalies", invitationTitle: "Shall we play?" }, locale: "en" as const, moduleIcon: "/sense.png", moduleName: "Sense", solves: "Solve" };
    const sensePage = renderToStaticMarkup(<SidonModuleExperience {...props} moduleSlug="sense" narrative={narrative} />);

    expect(sensePage.match(/\/en\/sidon\/monitoreo\/sense\/juego/g)).toHaveLength(2);
    expect(renderToStaticMarkup(<SidonModuleExperience {...props} moduleSlug="polar" />)).not.toContain("/en/sidon/monitoreo/sense/juego");
  });
});
