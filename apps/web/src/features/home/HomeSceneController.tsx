"use client";

import { useEffect } from "react";

export function HomeSceneController() {
  useEffect(() => {
    const scenes = document.querySelectorAll<HTMLElement>("[data-home-scene]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-active");
        }
      },
      { threshold: 0.2 },
    );

    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  return null;
}
