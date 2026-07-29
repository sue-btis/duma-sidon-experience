"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

import { CompanyEvolutionMap } from "./CompanyEvolutionMap";
import styles from "./company-evolution.module.css";

const phases = [
  {
    fills: ["Minimalist telecom tower in 3D.webp", "Minimalist telecom station in isometric view.webp", "Telecom towers with wireless link.webp", "Minimalist telecom equipment installation model.webp"],
    image: "/home/company-evolution/phase-1.webp", height: 940, width: 1672,
  },
  {
    fills: ["Minimalist security camera installation diorama.webp", "Minimalist sensor tower in isometric view.webp", "White HVAC unit in 3D render.webp", "Monochrome industrial substation diorama.webp"],
    image: "/home/company-evolution/phase-3.webp", height: 941, width: 1672,
  },
  {
    fills: ["Futuristic monitoring station illustration.webp", "Minimalist white drone on pedestal.webp", "Monochrome rover on minimalist platform.webp", "Minimalist white delivery truck mod.webp"],
    image: "/home/company-evolution/phase-4.webp", height: 941, width: 1672,
  },
] as const;

const cameras = [
  { x: 900, y: 1900, zoom: 0.63 },
  { x: 2500, y: 650, zoom: 0.68 },
  { x: 4400, y: 1900, zoom: 0.55 },
] as const;

export type CompanyEvolutionStep = Readonly<{ label?: string; headline: string; body: string; technology?: string; technologyLabel?: string; location?: string; kind: "map" | "phase" | "transition" }>;

type Props = Readonly<{ ariaLabel: string; navigationLabel: string; skipLabel: string; steps: readonly CompanyEvolutionStep[] }>;

export function CompanyEvolution({ ariaLabel, navigationLabel, skipLabel, steps }: Props) {
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

  const phaseProgress = Math.min(phases.length - 1, Math.max(0, progress * (steps.length - 1) - 2));
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
    <section aria-label={ariaLabel} className={`${styles.journey} motion-reduce:!h-auto`} ref={journeyRef}>
      <div className={`${styles.viewport} motion-reduce:!hidden`}>
        <div className={`${styles.mapStage} ${isMap ? styles.mapVisible : ""}`}>
          <CompanyEvolutionMap progress={progress} showExpansionLocation={false} showLocations={active === steps.length - 1} />
        </div>
        <div className={styles.world} style={{ "--x": `${camera.x * camera.zoom}px`, "--y": `${camera.y * camera.zoom}px`, "--zoom": camera.zoom } as CSSProperties}>
          <svg aria-hidden="true" className={styles.route} viewBox="0 0 6500 3000">
            <path d="M 900 2020 C 1390 2020, 1770 670, 2500 740 S 3690 2160, 4400 1810" />
            <path className={styles.routeProgress} d="M 900 2020 C 1390 2020, 1770 670, 2500 740 S 3690 2160, 4400 1810" pathLength="1" style={{ "--progress": phaseProgress / (phases.length - 1) } as CSSProperties} />
          </svg>
          {phases.map((item, index) => (
            <button aria-current={active === index + 2 ? "step" : undefined} aria-label={steps[index + 2].headline} className={`${styles.station} ${styles[`station${index + 1}`]} ${active === index + 2 ? styles.active : ""}`} key={item.image} onClick={() => goTo(index + 2)} type="button">
              <span aria-hidden="true" className={styles.fillAssets}>
                {item.fills.map((fill, fillIndex) => <Image alt="" className={`${styles.fillAsset} ${styles[`fill${index + 1}${fillIndex + 1}`]}`} height={1254} key={fill} src={`/home/company-evolution/rellenos/${fill}`} unoptimized width={1254} />)}
              </span>
              <Image alt="" height={item.height} sizes="(max-width: 1050px) 100vw, 1100px" src={item.image} unoptimized width={item.width} />
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
            {current.technology && current.technologyLabel && (
              <p className={styles.technology}><strong>{current.technologyLabel}</strong>{current.technology}</p>
            )}
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
                    className={`${isActive ? styles.journeyStepActive : ""} !min-h-11 !min-w-11`}
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
        <a className={styles.skipJourney} href="#industrias">{skipLabel}</a>
      </div>
      <ol className="hidden motion-reduce:!grid motion-reduce:gap-6 motion-reduce:mx-auto motion-reduce:max-w-[65ch] motion-reduce:px-4 motion-reduce:py-12 sm:motion-reduce:px-8">
        {steps.map((step) => (
          <li className="grid gap-3 border-t border-border pt-6" key={step.headline}>
            {step.label ? <p className="m-0 font-bold text-ecosat-deep">{step.label}</p> : null}
            <h2 className="m-0 text-3xl leading-none text-ecosat-deep sm:text-5xl">{step.headline}</h2>
            {step.location ? <p className="m-0 font-bold text-ecosat-deep">{step.location}</p> : null}
            <p className="m-0 text-ink-soft">{step.body}</p>
            {step.technology && step.technologyLabel ? <p className="m-0 text-ink-soft"><strong className="block text-ecosat-deep">{step.technologyLabel}</strong>{step.technology}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
