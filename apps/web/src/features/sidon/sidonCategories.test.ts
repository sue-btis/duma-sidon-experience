import { describe, expect, it } from "vitest";

import { sidonCategories } from "./sidonCategoryData";

describe("Sidón category order", () => {
  it("keeps the five approved categories in their fixed order", () => {
    expect(sidonCategories.map((category) => category.slug)).toEqual([
      "mantenimiento-seguridad",
      "auditorias",
      "personas",
      "acceso",
      "monitoreo",
    ]);
  });
});
