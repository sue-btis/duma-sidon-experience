import { type ReactNode } from "react";

import { solutions, type SolutionSlug } from "./solutions";
import styles from "./integration.module.css";

export function IntegrationOrbit({ activeNode, children }: Readonly<{ activeNode?: SolutionSlug; children: ReactNode }>) {
  return (
    <div className={styles.orbitShell}>
      <svg aria-hidden="true" className={styles.orbit} viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="45" ry="26" />
        {solutions.map((solution, index) => <circle className={solution.slug === activeNode ? styles.activeOrbitNode : undefined} cx={10 + index * 13.3} cy={50 + (index % 2 ? -18 : 18)} data-node={solution.slug} key={solution.slug} r="2.7" />)}
      </svg>
      {children}
    </div>
  );
}
