export const sidonCategories = [
  { decorativeColor: "#B5BEBE", icon: "/home/worlds/sidon/MANTENIMIENTO.png", slug: "mantenimiento-seguridad", modules: [{ key: "mantiz", icon: "/home/worlds/sidon/mantenimiento-modulos/Mantiz_Isotipo_Color.png" }, { key: "talos", icon: "/home/worlds/sidon/mantenimiento-modulos/Talos_Isotipo_Color.png" }] },
  { decorativeColor: "#795FA6", icon: "/home/worlds/sidon/AUDITORIAS.png", slug: "auditorias", modules: [{ key: "smartAudits", icon: "/home/worlds/sidon/auditorias-modulos/SmartAudits_Logotipo_Color.png" }, { key: "argos", icon: "/home/worlds/sidon/auditorias-modulos/Argos_Isoptipo_Color.png" }, { key: "nodIa", icon: "/home/worlds/sidon/auditorias-modulos/Nodia_Isotipo_Color.png" }, { key: "rondines", icon: "/home/worlds/sidon/auditorias-modulos/Rondines_Isotipo_Color.png" }] },
  { decorativeColor: "#A66E8D", icon: "/home/worlds/sidon/PERSONAS.png", slug: "personas", modules: [{ key: "wellness", icon: "/home/worlds/sidon/personas-modulos/Wellnes_Isotipo_Color-39.png" }, { key: "byblos", icon: "/home/worlds/sidon/personas-modulos/Byblos_Isotipo_Color.png" }] },
  { decorativeColor: "#94696D", icon: "/home/worlds/sidon/ACCESO.png", slug: "acceso", modules: [{ key: "axessOne", icon: "/home/worlds/sidon/acceso-modulos/AxessONE_Isotipo_Color.png" }] },
  { decorativeColor: "#205664", icon: "/home/worlds/sidon/MONITOREO.png", slug: "monitoreo", modules: [{ key: "sense", icon: "/home/worlds/sidon/monitoreo-modulos/Sense_Isotipo_Color.png" }, { key: "polar", icon: "/home/worlds/sidon/monitoreo-modulos/Polar_Isotipo_Color.png" }, { key: "industrial", icon: "/home/worlds/sidon/monitoreo-modulos/Industrial_Isotipo_Color.png" }] },
] as const;

export type SidonCategorySlug = (typeof sidonCategories)[number]["slug"];
