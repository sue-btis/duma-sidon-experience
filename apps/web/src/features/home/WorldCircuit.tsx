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
        <svg aria-hidden="true" className={styles.circuitLines} preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <defs>
            <mask id="circuitLineGaps" maskUnits="userSpaceOnUse">
              <rect fill="white" height="1000" width="1000" />
              <circle cx="167" cy="180" fill="black" r="110" />
              <circle cx="500" cy="440" fill="black" r="130" />
              <circle cx="833" cy="180" fill="black" r="110" />
              <circle cx="200" cy="823" fill="black" r="24" />
              <circle cx="800" cy="823" fill="black" r="24" />
            </mask>
          </defs>
          <g mask="url(#circuitLineGaps)">
            <path className={styles.integrationLine} d="M395 440 C310 440 290 180 167 180" />
            <path className={styles.sidonLine} d="M605 440 C690 440 710 180 833 180" />
            <path className={styles.connectorLine} d="M500 590 L500 790" />
          </g>
          <circle className={styles.flowDot} r="7">
            <animateMotion dur="8s" path="M395 440 C310 440 290 180 167 180" repeatCount="indefinite" />
          </circle>
          <circle className={styles.flowDot} r="7">
            <animateMotion dur="8s" path="M605 440 C690 440 710 180 833 180" repeatCount="indefinite" />
          </circle>
          <circle className={styles.flowDot} r="7">
            <animateMotion begin="-1s" dur="8s" path="M500 860 L500 590" repeatCount="indefinite" />
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
