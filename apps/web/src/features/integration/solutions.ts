export const solutions = [
  { icon: "/home/worlds/integracion/CCTV.png", iconScale: 1.33, key: "cctv", slug: "cctv", emphasis: "outcomes", detail: "capabilities" },
  { icon: "/home/worlds/integracion/HVAC.png", iconScale: 1.03, key: "climate", slug: "climatizacion-refrigeracion", emphasis: "pillars", detail: "scope" },
  { icon: "/home/worlds/integracion/INCENDIOS.png", iconScale: 1.14, key: "fire", slug: "incendios", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/ACCESOS.png", iconScale: 1.21, key: "access", slug: "accesos", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/BMS.png", iconScale: 1, key: "bms", slug: "bms", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/VOZ Y DATOS.png", iconScale: .92, key: "voiceData", slug: "voz-y-datos", emphasis: "pillars", detail: "capabilities" },
  { icon: "/home/worlds/integracion/AUDIO Y VIDEO.png", iconScale: .92, key: "audioVideo", slug: "audio-y-video", emphasis: "pillars", detail: "capabilities" },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];

export function isSolutionSlug(value: string): value is SolutionSlug {
  return solutions.some((solution) => solution.slug === value);
}
