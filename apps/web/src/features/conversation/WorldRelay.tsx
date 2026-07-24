"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./conversation.module.css";

type World = "integration" | "sidon";

export function WorldRelay({ world }: Readonly<{ world: World }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsActive(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className={styles.relay} data-active={isActive} data-world={world} ref={ref}>
      <span className={styles.orbitOne} />
      <span className={styles.orbitTwo} />
      <span className={styles.nodeOne} />
      <span className={styles.nodeTwo} />
      <span className={styles.gateway}>↗</span>
    </div>
  );
}
