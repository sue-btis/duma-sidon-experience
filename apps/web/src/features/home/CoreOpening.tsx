"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  attributes: readonly string[];
  statement: string;
  title: string;
}>;

const REVEAL_SPEED = 0.018;

export function CoreOpening({ attributes, statement, title }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const render = (next: number) => setProgress((current) => current === next ? current : next);
    const tick = () => {
      const difference = targetRef.current - shownRef.current;
      if (Math.abs(difference) <= 0.0005) {
        shownRef.current = targetRef.current;
        render(shownRef.current);
        frame = 0;
        return;
      }
      shownRef.current += Math.sign(difference) * Math.min(Math.abs(difference), REVEAL_SPEED);
      render(shownRef.current);
      frame = window.requestAnimationFrame(tick);
    };
    const update = () => {
      const range = section.offsetHeight - window.innerHeight;
      const next = range > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range)) : 0;
      targetRef.current = next;
      if (reduced) {
        shownRef.current = next;
        render(next);
      } else if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const revealed = Math.min(attributes.length, Math.ceil(progress * attributes.length));
  const complete = progress >= 0.9;

  return (
    <section className={styles.openingScene} data-complete={complete} data-home-scene id="portada" ref={sectionRef}>
      <div className={styles.openingSticky}>
        <div aria-hidden="true" className={styles.orbits}>
          <div className={`${styles.orbit} ${styles.orbitOuter}`}><i className={`${styles.orbitNode} ${styles.outerNode}`} /></div>
          <div className={`${styles.orbit} ${styles.orbitInner}`}><i className={`${styles.orbitNode} ${styles.innerNode}`} /></div>
        </div>
        <div className={styles.coverContent}>
          <h1 className={styles.visuallyHidden}>{title}</h1>
          <Image alt="Ecosat" className={styles.ecosatLogo} height={218} priority src="/brand/ecosat-horizontal.png" unoptimized width={403} />
          <p className={styles.lead}>{statement}</p>
          <ol className={styles.pillars}>
            {attributes.map((attribute, index) => (
              <li className={styles.pillar} data-revealed={index < revealed} key={attribute}>{attribute}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
