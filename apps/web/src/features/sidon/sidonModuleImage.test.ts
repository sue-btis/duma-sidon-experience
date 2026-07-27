import { describe, expect, it } from "vitest";

import { getSidonModuleImage } from "./sidonModuleImage";

describe("Sidón module image paths", () => {
  it("uses the approved module and context naming convention", () => {
    expect(getSidonModuleImage("mantiz", "retail")).toBe("/home/worlds/sidon/modulos-imagenes/mantiz-retail.png");
    expect(getSidonModuleImage("mantiz", "industrial")).toBe("/home/worlds/sidon/modulos-imagenes/mantiz-industrial.png");
  });
});
