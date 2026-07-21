import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  close: string;
  integration: Readonly<{ action: string; description: string; label: string }>;
  lead: string;
  locale: "es" | "en";
  sidon: Readonly<{ action: string; description: string; label: string }>;
  title: string;
}>;

export function WorldCircuit({ close, integration, lead, locale, sidon, title }: Props) {
  return (
    <>
      <h2>{title}</h2>
      <p className={styles.worldsLead}>{lead}</p>
      <div className={styles.worldCircuit}>
        <svg aria-hidden="true" className={styles.circuitLines} preserveAspectRatio="none" viewBox="0 0 1000 600">
          <defs>
            <mask id="circuitLineGaps" maskUnits="userSpaceOnUse">
              <rect fill="white" height="600" width="1000" />
              <circle cx="167" cy="140" fill="black" r="86" />
              <circle cx="500" cy="330" fill="black" r="102" />
              <circle cx="833" cy="140" fill="black" r="86" />
            </mask>
          </defs>
          <g mask="url(#circuitLineGaps)">
            <path className={styles.integrationLine} d="M398 330 C310 330 290 180 253 140" />
            <path className={styles.sidonLine} d="M602 330 C690 330 710 180 747 140" />
          </g>
          <circle className={styles.flowDot} r="7">
            <animateMotion dur="3s" path="M398 330 C310 330 290 180 253 140" repeatCount="indefinite" />
          </circle>
          <circle className={styles.flowDot} r="7">
            <animateMotion dur="3s" path="M602 330 C690 330 710 180 747 140" repeatCount="indefinite" />
          </circle>
        </svg>

        <Link className={`${styles.worldNode} ${styles.integrationNode}`} href={`/${locale}/integracion/`}>
          <div className={styles.worldMark}><Image alt="" height={104} src="/home/worlds/integracion.png" unoptimized width={104} /></div>
          <span className={styles.worldLabel}>{integration.label}</span>
          <span className={styles.worldDescription}>{integration.description}</span>
          <span className={styles.worldAction}>{integration.action}</span>
        </Link>

        <div className={styles.ecosatNode}>
          <Image alt="Ecosat" height={174} src="/home/worlds/ecosat.png" unoptimized width={174} />
        </div>

        <Link className={`${styles.worldNode} ${styles.sidonNode}`} href={`/${locale}/sidon/`}>
          <div className={styles.worldMark}><Image alt="" height={104} src="/home/worlds/sidon.png" unoptimized width={104} /></div>
          <span className={styles.worldLabel}>{sidon.label}</span>
          <span className={styles.worldDescription}>{sidon.description}</span>
          <span className={styles.worldAction}>{sidon.action}</span>
        </Link>
        <p className={styles.circuitClose}><ShieldCheck aria-hidden="true" />{close}</p>
      </div>
    </>
  );
}
