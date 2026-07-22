"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

import { CompanyEvolutionMap } from "./CompanyEvolutionMap";
import styles from "./company-evolution.module.css";

const phases = [
  { image: "/home/company-evolution/phase-1.jpg", height: 940, width: 1672 },
  { image: "/home/company-evolution/phase-2.png", height: 941, width: 1672 },
  { image: "/home/company-evolution/phase-3.png", height: 941, width: 1672 },
  { image: "/home/company-evolution/phase-4.png", height: 941, width: 1672 },
] as const;

const cameras = [
  { x: 720, y: 1580, zoom: 0.63 },
  { x: 2050, y: 780, zoom: 0.68 },
  { x: 3350, y: 1450, zoom: 0.55 },
  { x: 3960, y: 610, zoom: 0.62 },
] as const;

export type CompanyEvolutionStep = Readonly<{ label?: string; headline: string; body: string; location?: string; kind: "map" | "phase" | "transition" }>;

type Props = Readonly<{ ariaLabel: string; steps: readonly CompanyEvolutionStep[] }>;

export function CompanyEvolution({ ariaLabel, steps }: Props) {
  const journeyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const update = () => {
      const range = journey.offsetHeight - window.innerHeight;
      const nextProgress = range > 0 ? Math.min(1, Math.max(0, -journey.getBoundingClientRect().top / range)) : 0;
      setProgress((current) => current === nextProgress ? current : nextProgress);
      setActive((current) => {
        const nextActive = Math.min(steps.length - 1, Math.round(nextProgress * (steps.length - 1)));
        return current === nextActive ? current : nextActive;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [steps.length]);

  const goTo = (index: number) => {
    const journey = journeyRef.current;
    if (!journey) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const range = journey.offsetHeight - window.innerHeight;
    window.scrollTo({ top: window.scrollY + journey.getBoundingClientRect().top + (range * index) / (steps.length - 1), behavior: reduceMotion ? "auto" : "smooth" });
  };

  const phaseProgress = Math.min(3, Math.max(0, progress * (steps.length - 1) - 2));
  const fromIndex = Math.min(cameras.length - 2, Math.floor(phaseProgress));
  const toIndex = Math.min(cameras.length - 1, fromIndex + 1);
  const cameraProgress = phaseProgress - fromIndex;
  const fromCamera = cameras[fromIndex];
  const toCamera = cameras[toIndex];
  const camera = {
    x: fromCamera.x + (toCamera.x - fromCamera.x) * cameraProgress,
    y: fromCamera.y + (toCamera.y - fromCamera.y) * cameraProgress,
    zoom: fromCamera.zoom + (toCamera.zoom - fromCamera.zoom) * cameraProgress,
  };
  const current = steps[active];
  const isMap = active <= 1 || active >= steps.length - 2;

  return (
    <section aria-label={ariaLabel} className={styles.journey} ref={journeyRef}>
      <div className={styles.viewport}>
        <div className={`${styles.mapStage} ${isMap ? styles.mapVisible : ""}`}>
          <CompanyEvolutionMap progress={progress} showLocations={active === steps.length - 1} />
        </div>
        <div className={styles.world} style={{ "--x": `${camera.x * camera.zoom}px`, "--y": `${camera.y * camera.zoom}px`, "--zoom": camera.zoom } as CSSProperties}>
          <svg aria-hidden="true" className={styles.route} viewBox="0 0 4200 2200">
            <path d="M 700 1700 C 1160 1700, 1420 770, 2050 900 S 2920 1730, 3380 1400 S 3840 650, 3990 750" />
            <path className={styles.routeProgress} d="M 700 1700 C 1160 1700, 1420 770, 2050 900 S 2920 1730, 3380 1400 S 3840 650, 3990 750" pathLength="1" style={{ "--progress": phaseProgress / (phases.length - 1) } as CSSProperties} />
          </svg>
          {phases.map((item, index) => (
            <button aria-current={active === index + 2 ? "step" : undefined} aria-label={steps[index + 2].headline} className={`${styles.station} ${styles[`station${index + 1}`]} ${active === index + 2 ? styles.active : ""}`} key={item.image} onClick={() => goTo(index + 2)} type="button">
              <Image alt="" height={item.height} sizes="(max-width: 850px) 100vw, 1100px" src={item.image} unoptimized width={item.width} />
              <span className={styles.dot} />
            </button>
          ))}
        </div>

        <div className={styles.hud}>
          <article className={styles.story} aria-live="polite">
            {current.label && <p className={styles.storyLabel}>{current.label}</p>}
            <h2>{current.headline}</h2>
            {current.location && <p className={styles.location}>{current.location}</p>}
            <p className={styles.storyBody}>{current.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
