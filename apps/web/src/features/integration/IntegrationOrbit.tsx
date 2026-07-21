import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";

import { solutions, type SolutionSlug } from "./solutions";
import styles from "./integration.module.css";

type Props = Readonly<{ activeNode?: SolutionSlug; children: ReactNode; labels?: Partial<Record<SolutionSlug, string>> }>;

export function IntegrationOrbit({ activeNode, children, labels }: Props) {
  const positions = [[50, 8], [78, 23], [88, 56], [67, 84], [32, 84], [12, 56], [22, 23]];

  return (
    <div className={styles.orbitShell}>
      {labels ? <div aria-hidden="true" className={styles.orbitStage}>
        <svg className={styles.orbit} viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="26" /><ellipse cx="50" cy="50" rx="30" ry="17" /></svg>
        <div className={styles.orbitCore}>Integración</div>
        {solutions.map((solution, index) => <div className={styles.orbitNode} data-node={solution.slug} key={solution.slug} style={{ "--node-left": `${positions[index][0]}%`, "--node-top": `${positions[index][1]}%` } as CSSProperties}><Image alt="" height={42} src={solution.icon} unoptimized width={42} />{labels[solution.slug] && <span>{labels[solution.slug]}</span>}</div>)}
      </div> : <svg aria-hidden="true" className={styles.solutionOrbit} viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="26" />{solutions.map((solution, index) => <circle className={solution.slug === activeNode ? styles.activeOrbitNode : undefined} cx={10 + index * 13.3} cy={50 + (index % 2 ? -18 : 18)} key={solution.slug} r="2.7" />)}</svg>}
      {children}
    </div>
  );
}
