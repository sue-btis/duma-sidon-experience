export function getLocalizedCarouselImage(image: string, locale: "es" | "en") {
  return image.replace("-carousel.png", `-${locale}-carousel.png`);
}
