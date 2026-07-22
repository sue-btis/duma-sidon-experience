import Image from "next/image";

import { TwoOrbitFigure } from "@/components/ui/TwoOrbitFigure";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  attributes: readonly string[];
  statement: string;
  title: string;
}>;

export function CoreOpening({ attributes, statement, title }: Props) {
  return (
    <section className={styles.openingScene} data-home-scene id="portada">
      <div className={styles.openingSticky}>
        <TwoOrbitFigure className={styles.orbits} nodeColors={["var(--sidon)", "var(--integration)"]} orbitColors={["var(--ecosat-deep)", "var(--ecosat)"]} />
        <div className={styles.coverContent}>
          <h1 className={styles.visuallyHidden}>{title}</h1>
          <Image alt="Ecosat" className={styles.ecosatLogo} height={218} priority src="/brand/ecosat-horizontal.png" unoptimized width={403} />
          <p className={styles.lead}>{statement}</p>
          <ol className={styles.pillars}>
            {attributes.map((attribute) => (
              <li className={styles.pillar} key={attribute}>{attribute}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
