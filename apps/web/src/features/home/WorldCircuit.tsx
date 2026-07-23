import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { LetterWorldsCanvas } from "@/components/ui/LetterWorldsCanvas";

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
        <svg aria-hidden="true" className={styles.circuitLines} preserveAspectRatio="none" viewBox="0 0 1000 260">
          <path className={`${styles.convergenceLine} ${styles.integrationLine}`} d="M175 130 C300 130 365 130 430 130" pathLength="1" />
          <path className={`${styles.convergenceLine} ${styles.sidonLine}`} d="M825 130 C700 130 635 130 570 130" pathLength="1" />
        </svg>

        <Link className={`${styles.worldNode} ${styles.integrationNode}`} href={`/${locale}/integracion/`}>
          <div className={styles.worldMark}>
            <LetterWorldsCanvas variant="physical" />
            <Image alt="" className={styles.worldLogo} height={632} src="/home/worlds/integracion.png" unoptimized width={708} />
          </div>
          <span className={styles.worldLabel}>{integration.label}</span>
          <span className={styles.worldDescription}>{integration.description}</span>
          <span className={styles.worldAction}>{integration.action}</span>
        </Link>

        <div className={styles.ecosatNode} data-home-animation>
          <div aria-hidden="true" className={styles.ecosatParticles} />
          <Image alt="Ecosat" className={styles.ecosatResolvedLogo} height={1261} src="/brand/ecosat-horizontal.png" unoptimized width={1504} />
        </div>

        <Link className={`${styles.worldNode} ${styles.sidonNode}`} href={`/${locale}/sidon/`}>
          <div className={styles.worldMark}>
            <LetterWorldsCanvas variant="digital" />
            <Image alt="" className={styles.worldLogo} height={148} src="/home/worlds/sidon.png" unoptimized width={147} />
          </div>
          <span className={styles.worldLabel}>{sidon.label}</span>
          <span className={styles.worldDescription}>{sidon.description}</span>
          <span className={styles.worldAction}>{sidon.action}</span>
        </Link>
        <p className={styles.circuitClose}><ShieldCheck aria-hidden="true" />{close}</p>
      </div>
    </>
  );
}
