"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

import { CompanyEvolutionMap } from "./CompanyEvolutionMap";
import styles from "./company-evolution.module.css";

const phases = [
  {
    fills: ["Minimalist telecom tower in 3D.png", "Minimalist telecom station in isometric view.png", "Telecom towers with wireless link.png"],
    image: "/home/company-evolution/phase-1.jpg", height: 940, width: 1672,
  },
  {
    fills: ["Minimalist telecom tower in 3D illustration.png", "Monochrome network server rack setup.png", "Minimal white utility structure rendered 3D.png"],
    image: "/home/company-evolution/phase-2.png", height: 941, width: 1672,
  },
  {
    fills: ["Minimalist security camera installation diorama.png", "Minimalist sensor tower in isometric view.png", "White HVAC unit in 3D render.png", "Monochrome industrial substation diorama.png"],
    image: "/home/company-evolution/phase-3.png", height: 941, width: 1672,
  },
  {
    fills: ["Futuristic monitoring station illustration.png", "Minimalist white drone on pedestal.png", "Monochrome rover on minimalist platform.png", "Minimalist white delivery truck mod.png"],
    image: "/home/company-evolution/phase-4.png", height: 941, width: 1672,
  },
] as const;

const cameras = [
  { x: 900, y: 1900, zoom: 0.63 },
  { x: 2500, y: 650, zoom: 0.68 },
  { x: 4400, y: 1900, zoom: 0.55 },
  { x: 6050, y: 600, zoom: 0.58 },
] as const;

export type CompanyEvolutionStep = Readonly<{ label?: string; headline: string; body: string; location?: string; kind: "map" | "phase" | "transition" }>;

type Props = Readonly<{ ariaLabel: string; navigationLabel: string; steps: readonly CompanyEvolutionStep[] }>;

export function CompanyEvolution({ ariaLabel, navigationLabel, steps }: Props) {
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
          <svg aria-hidden="true" className={styles.route} viewBox="0 0 6500 3000">
            <path d="M 900 2020 C 1390 2020, 1770 670, 2500 740 S 3690 2160, 4400 1810 S 5500 600, 6050 700" />
            <path className={styles.routeProgress} d="M 900 2020 C 1390 2020, 1770 670, 2500 740 S 3690 2160, 4400 1810 S 5500 600, 6050 700" pathLength="1" style={{ "--progress": phaseProgress / (phases.length - 1) } as CSSProperties} />
          </svg>
          {phases.map((item, index) => (
            <button aria-current={active === index + 2 ? "step" : undefined} aria-label={steps[index + 2].headline} className={`${styles.station} ${styles[`station${index + 1}`]} ${active === index + 2 ? styles.active : ""}`} key={item.image} onClick={() => goTo(index + 2)} type="button">
              <span aria-hidden="true" className={styles.fillAssets}>
                {item.fills.map((fill, fillIndex) => <Image alt="" className={`${styles.fillAsset} ${styles[`fill${index + 1}${fillIndex + 1}`]}`} height={1254} key={fill} src={`/home/company-evolution/rellenos/${fill}`} unoptimized width={1254} />)}
              </span>
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
        <nav aria-label={navigationLabel} className={styles.journeyNavigation}>
          <ol>
            {steps.map((step, index) => {
              const label = step.label ?? step.headline;
              const isActive = active === index;

              return (
                <li key={step.headline}>
                  <button
                    aria-current={isActive ? "step" : undefined}
                    aria-label={label}
                    className={isActive ? styles.journeyStepActive : undefined}
                    onClick={() => goTo(index)}
                    type="button"
                  >
                    <span aria-hidden="true">{index + 1}</span>
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
