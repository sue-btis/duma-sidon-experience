const localizedImages = new Set([
  "/home/worlds/integracion/ACCESOS-carousel.png",
  "/home/worlds/integracion/AUDIO-Y-VIDEO-carousel.png",
  "/home/worlds/integracion/VOZYDATOS-carousel.png",
]);

export function getLocalizedCarouselImage(image: string, locale: "es" | "en") {
  if (!image.includes("/integracion/") || localizedImages.has(image)) {
    return image.replace("-carousel.png", `-${locale}-carousel.png`);
  }

  return image;
}
