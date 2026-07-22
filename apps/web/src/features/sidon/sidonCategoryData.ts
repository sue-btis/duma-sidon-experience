export const sidonCategories = [
  { icon: "/home/worlds/sidon/MANTENIMIENTO.png", slug: "mantenimiento-seguridad", modules: ["mantiz", "talos"] },
  { icon: "/home/worlds/sidon/AUDITORIAS.png", slug: "auditorias", modules: ["smartAudits", "argos", "nodIa", "rondines"] },
  { icon: "/home/worlds/sidon/PERSONAS.png", slug: "personas", modules: ["wellness", "byblos"] },
  { icon: "/home/worlds/sidon/ACCESO.png", slug: "acceso", modules: ["axessOne"] },
  { icon: "/home/worlds/sidon/MONITOREO.png", slug: "monitoreo", modules: ["sense", "polar", "industrial"] },
] as const;

export type SidonCategorySlug = (typeof sidonCategories)[number]["slug"];
