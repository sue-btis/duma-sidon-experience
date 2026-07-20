"use client";

import { useEffect } from "react";

export function HomeSceneController() {
  useEffect(() => {
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-home-scene]")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-active");
        }
      },
      { threshold: 0.2 },
    );

    scenes.forEach((scene) => observer.observe(scene));

    let isNavigating = false;
    const canPageScenes = () =>
      window.matchMedia("(min-width: 1001px) and (prefers-reduced-motion: no-preference)").matches;
    const onWheel = (event: WheelEvent) => {
      if (!canPageScenes() || !event.deltaY) return;

      event.preventDefault();
      if (isNavigating) return;

      const current = scenes.reduce((closest, scene) =>
        Math.abs(scene.getBoundingClientRect().top) < Math.abs(closest.getBoundingClientRect().top)
          ? scene
          : closest,
      );
      const next = scenes[scenes.indexOf(current) + Math.sign(event.deltaY)];

      if (!next) return;

      isNavigating = true;
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => { isNavigating = false; }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
