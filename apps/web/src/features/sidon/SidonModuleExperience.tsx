import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./sidon.module.css";

// ponytail: shared mock hero image until approved module assets replace it.
const temporaryHeroImage = "/home/worlds/sidon/modulos-imagenes/prueba.png";

type Props = Readonly<{
  categoryName: string;
  categorySlug: string;
  contactAction: string;
  contactLead: string;
  contactTitle: string;
  description: string;
  locale: "es" | "en";
  moduleIcon: string;
  moduleName: string;
  moduleSlug: string;
  narrative?: SidonModuleNarrative;
  solves: string;
}>;

export type SidonModuleNarrative = Readonly<{
  headline: string;
  lead: string;
  moment: Readonly<{ lead: string; title: string }>;
  role: Readonly<{ lead: string; title: string }>;
}>;

function NarrativeSections({ narrative }: Readonly<{ narrative: SidonModuleNarrative }>) {
  return <>
    <section aria-labelledby="module-logic" className={styles.moduleNarrative}>
      <div><p>Sidón</p><h2 id="module-logic">{narrative.moment.title}</h2></div>
      <div><span>{narrative.moment.lead}</span></div>
    </section>
    <section aria-labelledby="module-continuity" className={styles.moduleContinuity}>
      <div><p>Sidón</p><h2 id="module-continuity">{narrative.role.title}</h2></div>
      <div><span>{narrative.role.lead}</span></div>
    </section>
  </>;
}

export function SidonModuleExperience({ categoryName, categorySlug, contactAction, contactLead, contactTitle, description, locale, moduleIcon, moduleName, moduleSlug, narrative, solves }: Props) {
  return <main className={styles.modulePage}>
    <section aria-labelledby="module-title" className={styles.moduleHero}>
      <div className={styles.moduleImage}>
        <Image alt="" fill priority sizes="(max-width: 48rem) 100vw, 50vw" src={temporaryHeroImage} unoptimized />
      </div>
      <div className={styles.moduleCopy}>
        <div className={styles.moduleIdentity}>
          <Image alt="Sidón" className={styles.moduleSidonBrand} height={104} src="/home/worlds/sidon.png" unoptimized width={104} />
          <p>{categoryName}</p>
        </div>
        <div className={styles.moduleTitle}>
          <Image alt={moduleName} className={styles.moduleLogo} height={108} src={moduleIcon} unoptimized width={108} />
          <h1 id="module-title">{narrative?.headline ?? moduleName}</h1>
        </div>
        <span>{narrative?.lead ?? description}</span>
      </div>
    </section>
    {narrative ? <NarrativeSections narrative={narrative} /> : <section className={styles.moduleSection}>
      <p>{categoryName}</p>
      <h2>{moduleName}</h2>
      <div><h3>{locale === "es" ? "Qué resuelve" : "What it solves"}</h3><span>{solves}</span></div>
    </section>}
    <section aria-labelledby="module-conversation" className={styles.moduleConversation}>
      <div><p>{categoryName}</p><h2 id="module-conversation">{contactTitle}</h2></div>
      <div><span>{contactLead}</span><Link href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2F${categorySlug}%2F${moduleSlug}&world=sidon&category=${categorySlug}&module=${moduleSlug}&interest=${moduleSlug}`}>{contactAction}<ArrowRight aria-hidden="true" size={17} /></Link></div>
    </section>
  </main>;
}
