import Image from "next/image";

import { LetterWorldsCanvas } from "./LetterWorldsCanvas";
import styles from "./world-hero.module.css";

type Props = Readonly<{
  description?: string;
  logo: string;
  logoAlt: string;
  logoHeight: number;
  logoWidth: number;
  meta?: string;
  priority?: boolean;
  screenReaderTitle?: string;
  title?: string;
  titleId?: string;
  variant?: "all" | "digital" | "physical";
}>;

export function WorldHero({ description, logo, logoAlt, logoHeight, logoWidth, meta, priority = false, screenReaderTitle, title, titleId, variant = "all" }: Props) {
  return (
    <div className={styles.hero}>
      <LetterWorldsCanvas radiusRem={20} variant={variant} />
      {screenReaderTitle ? <h1 className={styles.srOnly}>{screenReaderTitle}</h1> : null}
      <div className={styles.identity}>
        <Image alt={logoAlt} className={styles.logo} height={logoHeight} priority={priority} src={logo} unoptimized width={logoWidth} />
        {title ? <h1 className={styles.title} id={titleId}>{title}</h1> : null}
      </div>
      {description || meta ? <div className={styles.description}>
        {description ? <p>{description}</p> : null}
        {meta ? <p className={styles.meta}>{meta}</p> : null}
      </div> : null}
    </div>
  );
}
