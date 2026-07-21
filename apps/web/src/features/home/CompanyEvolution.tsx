"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./company-evolution.module.css";

const phases = [
  { image: "/home/company-evolution/phase-1.jpg", title: "Lorem ipsum dolor sit amet.", label: "Lorem ipsum", tags: ["Lorem", "Ipsum", "Dolor"] },
  { image: "/home/company-evolution/phase-2.png", title: "Consectetur adipiscing elit.", label: "Consectetur", tags: ["Amet", "Elit", "Vitae"] },
  { image: "/home/company-evolution/phase-3.png", title: "Sed do eiusmod tempor.", label: "Eiusmod", tags: ["Tempor", "Incididunt", "Labore"] },
  { image: "/home/company-evolution/phase-4.png", title: "Ut enim ad minim veniam.", label: "Veniam", tags: ["Minim", "Veniam", "Aliquam"] },
] as const;

export function CompanyEvolution() {
  const journeyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const update = () => {
      const range = journey.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -journey.getBoundingClientRect().top / range)) : 0;
      setActive(Math.min(phases.length - 1, Math.round(progress * (phases.length - 1))));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTo = (index: number) => {
    const journey = journeyRef.current;
    if (!journey) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const range = journey.offsetHeight - window.innerHeight;
    window.scrollTo({ top: window.scrollY + journey.getBoundingClientRect().top + (range * index) / (phases.length - 1), behavior: reduceMotion ? "auto" : "smooth" });
  };

  const phase = phases[active];

  return (
    <section aria-label="Company evolution" className={styles.journey} ref={journeyRef}>
      <div className={styles.viewport}>
        <div className={styles.world} style={{ "--active": active } as CSSProperties}>
          <svg aria-hidden="true" className={styles.route} viewBox="0 0 4200 2200">
            <path d="M 700 1700 C 1160 1700, 1420 770, 2050 900 S 2920 1730, 3380 1400 S 3840 650, 3990 750" />
            <path className={styles.routeProgress} d="M 700 1700 C 1160 1700, 1420 770, 2050 900 S 2920 1730, 3380 1400 S 3840 650, 3990 750" pathLength="1" style={{ "--progress": active / (phases.length - 1) } as CSSProperties} />
          </svg>
          {phases.map((item, index) => (
            <button aria-current={index === active ? "step" : undefined} aria-label={`Go to phase ${index + 1}`} className={`${styles.station} ${styles[`station${index + 1}`]} ${index === active ? styles.active : ""}`} key={item.image} onClick={() => goTo(index)} type="button">
              <img alt="" src={item.image} />
              <span className={styles.dot} />
              <span className={styles.stationLabel}>{String(index + 1).padStart(2, "0")} · {item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.hud}>
          <div className={styles.topbar}><span className={styles.brandMark} aria-hidden="true" /><span>Ecosat</span><span className={styles.status}>Company evolution · scroll to explore</span></div>
          <article className={styles.story} aria-live="polite">
            <div className={styles.storyIndex}><span>Chapter {String(active + 1).padStart(2, "0")}</span><span>{phase.label}</span></div>
            <h2>{phase.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className={styles.tags}>{phase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
          <nav aria-label="Company evolution phases" className={styles.stepNav}>{phases.map((item, index) => <button aria-current={index === active ? "step" : undefined} className={index === active ? styles.active : ""} key={item.image} onClick={() => goTo(index)} type="button">{String(index + 1).padStart(2, "0")}</button>)}</nav>
          <div aria-hidden="true" className={styles.progress}><span>Journey</span><div><i style={{ width: `${(active / (phases.length - 1)) * 100}%` }} /><b style={{ left: `${(active / (phases.length - 1)) * 100}%` }} /></div><span>Scroll to progress</span></div>
        </div>
      </div>
    </section>
  );
}
