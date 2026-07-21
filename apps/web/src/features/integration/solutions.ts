export const solutions = [
  { icon: "/home/worlds/integracion/CCTV.png", key: "cctv", slug: "cctv", emphasis: "outcomes", detail: "capabilities" },
  { icon: "/home/worlds/integracion/HVAC.png", key: "climate", slug: "climatizacion-refrigeracion", emphasis: "pillars", detail: "scope" },
  { icon: "/home/worlds/integracion/INCENDIOS.png", key: "fire", slug: "incendios", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/ACCESOS.png", key: "access", slug: "accesos", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/BMS.png", key: "bms", slug: "bms", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/VOZ Y DATOS.png", key: "voiceData", slug: "voz-y-datos", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/AUDIO Y VIDEO.png", key: "audioVideo", slug: "audio-y-video", emphasis: "pillars", detail: "capabilities" },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];

export function isSolutionSlug(value: string): value is SolutionSlug {
  return solutions.some((solution) => solution.slug === value);
}
