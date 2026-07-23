import Image from "next/image";

import { LetterWorldsCanvas } from "@/components/ui/LetterWorldsCanvas";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  attributes: readonly string[];
  scrollPrompt: string;
  statement: string;
  title: string;
}>;

export function CoreOpening({ attributes, scrollPrompt, statement, title }: Props) {
  return (
    <section className={styles.openingScene} data-home-scene id="portada">
      <div className={styles.openingSticky}>
        <LetterWorldsCanvas />
        <svg aria-hidden="true" className={styles.openingConnections} preserveAspectRatio="none" viewBox="0 0 1600 900">
          <defs>
            <filter height="300%" id="opening-soft-glow" width="300%" x="-100%" y="-100%">
              <feGaussianBlur result="blur" stdDeviation="3" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className={`${styles.connectionPath} ${styles.physicalConnection}`} d="M 95 715 C 350 690, 470 560, 690 490" id="opening-physical-path" />
          <path className={`${styles.connectionPath} ${styles.digitalConnection}`} d="M 1505 715 C 1250 690, 1130 560, 910 490" id="opening-digital-path" />
          <circle className={`${styles.connectionDot} ${styles.physicalDot}`} filter="url(#opening-soft-glow)" r="3.5"><animateMotion dur="5.8s" repeatCount="indefinite"><mpath href="#opening-physical-path" /></animateMotion></circle>
          <circle className={`${styles.connectionDot} ${styles.physicalDot} ${styles.secondaryConnectionDot}`} r="2.2"><animateMotion begin="-3s" dur="7.4s" repeatCount="indefinite"><mpath href="#opening-physical-path" /></animateMotion></circle>
          <circle className={`${styles.connectionDot} ${styles.digitalDot}`} filter="url(#opening-soft-glow)" r="3.5"><animateMotion dur="6.3s" repeatCount="indefinite"><mpath href="#opening-digital-path" /></animateMotion></circle>
          <circle className={`${styles.connectionDot} ${styles.digitalDot} ${styles.secondaryConnectionDot}`} r="2.2"><animateMotion begin="-4s" dur="8.1s" repeatCount="indefinite"><mpath href="#opening-digital-path" /></animateMotion></circle>
        </svg>
        <div aria-hidden="true" className={styles.openingHalo} />
        <div className={styles.coverContent}>
          <h1 className={styles.visuallyHidden}>{title}</h1>
          <Image alt="Ecosat" className={styles.ecosatLogo} height={1261} priority src="/brand/ecosat-horizontal.png" unoptimized width={1504} />
          <p className={styles.lead}>{statement}</p>
        </div>
        <ol className={styles.pillars}>
          {attributes.map((attribute) => (
            <li className={styles.pillar} key={attribute}>{attribute}</li>
          ))}
        </ol>
        <p className={styles.scrollHint}>{scrollPrompt}<span aria-hidden="true">↓</span></p>
      </div>
    </section>
  );
}
