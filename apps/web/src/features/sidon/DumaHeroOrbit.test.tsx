import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { DumaHeroOrbit } from "./DumaHeroOrbit";

describe("Duma hero orbit", () => {
  it("renders every Sidón module around Duma AI", () => {
    const page = renderToStaticMarkup(<DumaHeroOrbit />);

    expect(page.match(/<li/g)).toHaveLength(12);
    expect(page).toContain("dumaAiLetter.png");
    expect(page).toContain("Talos_Isotipo_Color.png");
    expect(page).toContain("Industrial_Isotipo_Color.png");
  });
});
