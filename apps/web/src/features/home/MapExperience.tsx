"use client";

import { forwardRef, memo, useEffect, useRef, useState } from "react";

import { legacyDotMapGzip } from "./legacy-dot-map";
import styles from "./home-experience.module.css";

type Props = Readonly<{
  labels: readonly [string, string, string, string, string, string];
  reach: readonly [string, string, string, string];
  hq: string;
  close: string;
}>;

const MAP_BUCKETS = 64;
const MAP_SPEED_CAP = 0.013;

function labelAt(progress: number) {
  if (progress < 0.1) return 0;
  if (progress < 0.42) return 1;
  if (progress < 0.62) return 2;
  if (progress < 0.76) return 3;
  if (progress < 0.88) return 4;
  return 5;
}

function reachAt(progress: number) {
  if (progress < 0.1) return 0;
  if (progress < 0.42) return 1;
  if (progress < 0.76) return 2;
  return 3;
}

async function unpackLegacyMap() {
  const compressed = Uint8Array.from(atob(legacyDotMapGzip), (character) => character.charCodeAt(0));
  const decompressed = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(decompressed).text();
}

const LegacyDotMap = memo(forwardRef<SVGSVGElement, Readonly<{ markup: string }>>(function LegacyDotMap({ markup }, ref) {
  return (
    <svg
      aria-hidden="true"
      className={styles.mapGraphic}
      dangerouslySetInnerHTML={{ __html: markup }}
      ref={ref}
      viewBox="0 95 620 384"
    />
  );
}));

export function MapExperience({ labels, reach, hq, close }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const [mapMarkup, setMapMarkup] = useState("");
  const [stage, setStage] = useState(0);
  const [reachStage, setReachStage] = useState(0);

  useEffect(() => {
    void unpackLegacyMap().then(setMapMarkup);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    if (!section || !map || !mapMarkup) return;

    map.querySelector(".hq text")!.textContent = hq;
    const buckets = [...map.querySelectorAll<SVGGElement>(".bk")];
    const headquarters = map.querySelector<SVGGElement>(".hq");
    const ring = map.querySelector<SVGCircleElement>(".ring");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const render = (progress: number) => {
      map.classList.toggle(styles.mapSeed, progress >= 0.03);
      map.classList.toggle(styles.mapMexicoFull, progress >= 0.4);
      headquarters?.classList.toggle(styles.mapHqVisible, progress >= 0.06);
      ring?.classList.toggle(styles.mapRingVisible, progress >= 0.88);

      const visibleBucket = Math.floor(progress * MAP_BUCKETS);
      for (const bucket of buckets) {
        bucket.classList.toggle(styles.mapBucketVisible, visibleBucket >= Number(bucket.dataset.b));
      }

      setStage((current) => current === labelAt(progress) ? current : labelAt(progress));
      setReachStage((current) => current === reachAt(progress) ? current : reachAt(progress));
    };

    const tick = () => {
      const difference = targetRef.current - shownRef.current;
      if (Math.abs(difference) > 0.0005) {
        shownRef.current += Math.abs(difference) > MAP_SPEED_CAP
          ? Math.sign(difference) * MAP_SPEED_CAP
          : difference;
        render(shownRef.current);
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        animationFrame = 0;
      }
    };

    const update = () => {
      const range = section.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range)) : 0;
      targetRef.current = progress;
      if (reduced) {
        shownRef.current = progress;
        render(progress);
      } else if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [hq, mapMarkup]);

  return (
    <section className={styles.mapScene} data-home-scene id="mapa" ref={sectionRef}>
      <div className={styles.mapSticky}>
        <div className={styles.mapContent}>
          <div aria-live="polite" className={styles.mapNarrative}>
            <p>{labels[stage]}</p>
          </div>
          <p className={styles.mapReach}>{reach[reachStage]}</p>
          <LegacyDotMap markup={mapMarkup} ref={mapRef} />
          <p className={styles.mapClose}>{close}</p>
        </div>
      </div>
    </section>
  );
}
