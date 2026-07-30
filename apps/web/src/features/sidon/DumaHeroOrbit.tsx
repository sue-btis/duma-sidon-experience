"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { sidonCategories } from "./sidonCategoryData";
import { mountRadialCardHover } from "./DumaHeroRadialHover";
import styles from "./duma.module.css";

type SidonModule = (typeof sidonCategories)[number]["modules"][number];

const modules: readonly SidonModule[] = sidonCategories.flatMap<SidonModule>((category) => category.modules);

export function DumaHeroOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const orbit = orbitRef.current;
    const core = coreRef.current;
    const canAnimate = window.matchMedia("(min-width: 48.0625rem) and (prefers-reduced-motion: no-preference)").matches;
    if (!orbit || !core || !canAnimate) return;

    const travel = orbit.clientWidth * 1.2;
    const duration = 760;
    const stagger = 80;
    let radialAnimation: ReturnType<typeof mountRadialCardHover> | undefined;
    const finalTransform = (angle: number) => `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--orbit-radius) * -1)) rotate(${-angle}deg)`;
    const animations = moduleRefs.current.flatMap((module, index) => {
      if (!module) return [];

      const angle = (360 / modules.length) * index;
      const entryY = (index - (modules.length - 1) / 2) * 14;
      return [module.animate([
        { opacity: 0, transform: `${finalTransform(angle - 42)} translate(${travel}px, ${entryY}px) scale(.62)` },
        { offset: 0.68, opacity: 1, transform: `${finalTransform(angle - 12)} translate(${travel * .16}px, ${entryY * .18}px) scale(.88)` },
        { opacity: 1, transform: finalTransform(angle) },
      ], { delay: index * stagger, duration, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" })];
    });
    const coreAnimation = core.animate([
      { opacity: 0, transform: "scale(.72)" },
      { opacity: 1, transform: "scale(1)" },
    ], { delay: duration + (modules.length - 1) * stagger, duration: 420, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" });

    orbit.dataset.animate = "true";
    Promise.all([...animations, coreAnimation].map((animation) => animation.finished)).then(() => {
      animations.forEach((animation) => animation.cancel());
      coreAnimation.cancel();
      const orbitRect = orbit.getBoundingClientRect();
      const firstModule = moduleRefs.current.find((module): module is HTMLLIElement => module !== null);
      const firstModuleRect = firstModule?.getBoundingClientRect();
      const moduleX = firstModuleRect ? firstModuleRect.left + firstModuleRect.width / 2 - (orbitRect.left + orbitRect.width / 2) : 0;
      const moduleY = firstModuleRect ? firstModuleRect.top + firstModuleRect.height / 2 - (orbitRect.top + orbitRect.height / 2) : 0;
      const orbitRadius = Math.hypot(moduleX, moduleY);
      const radiusRatio = orbitRadius / Math.min(orbitRect.width, orbitRect.height);
      const startAngle = Math.atan2(moduleY, moduleX);
      orbit.dataset.settled = "true";
      orbit.dataset.radialHover = "true";
      radialAnimation = mountRadialCardHover({ cardSelector: `.${styles.heroOrbitModule}`, container: orbit, radius: ({ height, width }) => Math.min(width, height) * radiusRatio, startAngle });
      delete orbit.dataset.animate;
    }).catch(() => undefined);

    return () => {
      animations.forEach((animation) => animation.cancel());
      coreAnimation.cancel();
      radialAnimation?.destroy();
      delete orbit.dataset.radialHover;
      delete orbit.dataset.animate;
    };
  }, []);

  return (
    <div className={styles.heroOrbit} ref={orbitRef}>
      <div aria-hidden="true" className={styles.heroOrbitRing} />
      <ul className={styles.heroOrbitModules}>
        {modules.map((module, index) => (
          <li className={styles.heroOrbitModule} key={module.slug} ref={(element) => { moduleRefs.current[index] = element; }} style={{ "--orbit-angle": `${(360 / modules.length) * index}deg` } as CSSProperties}>
            <Image alt={module.slug} height={72} src={module.icon} unoptimized width={72} />
          </li>
        ))}
      </ul>
      <div className={styles.heroOrbitCore} ref={coreRef}>
        <Image alt="Duma AI" className={`${styles.heroOrbitLogo} ${styles.heroOrbitDumaLogo}`} height={166} src="/home/worlds/dumaAiLetter.png" unoptimized width={300} />
        <Image alt="Sidón" className={`${styles.heroOrbitLogo} ${styles.heroOrbitSidonLogo}`} height={104} src="/home/worlds/sidon.png" unoptimized width={104} />
      </div>
    </div>
  );
}
