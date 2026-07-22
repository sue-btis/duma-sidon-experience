import { type CSSProperties } from "react";

import styles from "./two-orbit-figure.module.css";

type Props = Readonly<{
  className?: string;
  nodeColors: readonly [string, string];
  orbitColors: readonly [string, string];
}>;

export function TwoOrbitFigure({ className, nodeColors, orbitColors }: Props) {
  return <div aria-hidden="true" className={[styles.figure, className].filter(Boolean).join(" ")} style={{ "--two-orbit-outer": orbitColors[0], "--two-orbit-inner": orbitColors[1], "--two-node-outer": nodeColors[0], "--two-node-inner": nodeColors[1] } as CSSProperties}>
    <div className={`${styles.orbit} ${styles.outer}`}><i /></div>
    <div className={`${styles.orbit} ${styles.inner}`}><i /></div>
  </div>;
}
