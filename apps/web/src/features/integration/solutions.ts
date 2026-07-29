export const solutions = [
  { carouselImage: "/home/worlds/integracion/cctv-carousel.png", icon: "/home/worlds/integracion/cctv-carousel.png", iconScale: 1.33, key: "cctv", slug: "cctv", sceneVariant: "coverage" },
  { carouselImage: "/home/worlds/integracion/HVAC-carousel.png", icon: "/home/worlds/integracion/HVAC-carousel.png", iconScale: 1.03, key: "climate", slug: "climatizacion-refrigeracion", sceneVariant: "regulation" },
  { carouselImage: "/home/worlds/integracion/incendios-carousel.png", icon: "/home/worlds/integracion/incendios-carousel.png", iconScale: 1.14, key: "fire", slug: "incendios", sceneVariant: "readiness" },
  { carouselImage: "/home/worlds/integracion/ACCESOS-carousel.png", icon: "/home/worlds/integracion/ACCESOS-carousel.png", iconScale: 1.21, key: "access", slug: "accesos", sceneVariant: "checkpoints" },
  { carouselImage: "/home/worlds/integracion/BMS-carousel.png", icon: "/home/worlds/integracion/BMS-carousel.png", iconScale: 1, key: "bms", slug: "bms", sceneVariant: "backbone" },
  { carouselImage: "/home/worlds/integracion/VOZYDATOS-carousel.png", icon: "/home/worlds/integracion/VOZYDATOS-carousel.png", iconScale: .92, key: "voiceData", slug: "voz-y-datos", sceneVariant: "distribution" },
  { carouselImage: "/home/worlds/integracion/AUDIO-Y-VIDEO-carousel.png", icon: "/home/worlds/integracion/AUDIO-Y-VIDEO-carousel.png", iconScale: .92, key: "audioVideo", slug: "audio-y-video", sceneVariant: "connection" },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];

export function isSolutionSlug(value: string): value is SolutionSlug {
  return solutions.some((solution) => solution.slug === value);
}
