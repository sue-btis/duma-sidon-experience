import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  close: string;
  lead: string;
  title: string;
}>;

export function WorldCircuit({ close, lead, title }: Props) {
  return (
    <>
      <h2>{title}</h2>
      <p className={styles.worldsLead}>{lead}</p>
      <div className={styles.worldCircuit}>
        <svg aria-hidden="true" className={styles.circuitLines} preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <path d="M395 440 C310 440 290 180 167 180 M605 440 C690 440 710 180 833 180 M500 590 L500 790" />
          <path d="M167 250 V720 Q167 860 307 860 H360 M833 250 V720 Q833 860 693 860 H640" />
        </svg>
        <i aria-hidden="true" className={`${styles.routeDot} ${styles.routeDotOne}`} />
        <i aria-hidden="true" className={`${styles.routeDot} ${styles.routeDotTwo}`} />
        <i aria-hidden="true" className={`${styles.routeDot} ${styles.routeDotThree}`} />

        <div className={`${styles.worldNode} ${styles.integrationNode}`}>
          <div className={styles.worldButton}><Image alt="Integracion" height={104} src="/home/worlds/integracion.png" unoptimized width={104} /></div>
        </div>

        <div className={styles.ecosatNode}>
          <Image alt="Ecosat" height={174} src="/home/worlds/ecosat.png" unoptimized width={174} />
        </div>

        <div className={`${styles.worldNode} ${styles.sidonNode}`}>
          <div className={styles.worldButton}><Image alt="Sidon" height={104} src="/home/worlds/sidon.png" unoptimized width={104} /></div>
        </div>

        <p className={styles.circuitClose}><ShieldCheck aria-hidden="true" />{close}</p>
      </div>
    </>
  );
}
