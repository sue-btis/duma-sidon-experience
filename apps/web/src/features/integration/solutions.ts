export const solutions = [
  { icon: "/home/worlds/integracion/CCTV-carousel.png", iconScale: 1.33, key: "cctv", slug: "cctv", sceneVariant: "coverage" },
  { icon: "/home/worlds/integracion/HVAC-carousel.png", iconScale: 1.03, key: "climate", slug: "climatizacion-refrigeracion", sceneVariant: "regulation" },
  { icon: "/home/worlds/integracion/INCENDIOS-carousel.png", iconScale: 1.14, key: "fire", slug: "incendios", sceneVariant: "readiness" },
  { icon: "/home/worlds/integracion/ACCESOS-carousel.png", iconScale: 1.21, key: "access", slug: "accesos", sceneVariant: "checkpoints" },
  { icon: "/home/worlds/integracion/BMS-carousel.png", iconScale: 1, key: "bms", slug: "bms", sceneVariant: "backbone" },
  { icon: "/home/worlds/integracion/VOZ Y DATOS-carousel.png", iconScale: .92, key: "voiceData", slug: "voz-y-datos", sceneVariant: "distribution" },
  { icon: "/home/worlds/integracion/AUDIO Y VIDEO-carousel.png", iconScale: .92, key: "audioVideo", slug: "audio-y-video", sceneVariant: "connection" },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];

export function isSolutionSlug(value: string): value is SolutionSlug {
  return solutions.some((solution) => solution.slug === value);
}
