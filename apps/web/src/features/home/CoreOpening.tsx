import { WorldHero } from "@/components/ui/WorldHero";

import styles from "./home-experience.module.css";

type Props = Readonly<{
  attributes: readonly string[];
  scrollPrompt: string;
  title: string;
}>;

export function CoreOpening({ attributes, scrollPrompt, title }: Props) {
  return (
    <section className={styles.openingScene} data-home-scene id="portada">
      <div className={styles.openingSticky}>
        <WorldHero logo="/home/worlds/ecosat-horizontal.png" logoAlt="Ecosat" logoHeight={1261} logoWidth={1504} mobileRadiusRem={11} priority title={title} titlePosition="lower" />
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
