import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./sidon.module.css";
import { SidonModuleFlow, type SidonModuleFlow as SidonModuleFlowData } from "./SidonModuleFlow";

const moduleHeroImages: Record<string, string> = {
  argos: "/home/worlds/sidon/modulos-imagenes/argos-industrial.png",
  axessone: "/home/worlds/sidon/modulos-imagenes/axessone-industrial.png",
  byblos: "/home/worlds/sidon/modulos-imagenes/byblos-industrial.png",
  industrial: "/home/worlds/sidon/modulos-imagenes/industrial-industrial.png",
  mantiz: "/home/worlds/sidon/modulos-imagenes/mantiz-industrial.png",
  "nod-ia": "/home/worlds/sidon/modulos-imagenes/nod-ia-industrial.png",
  polar: "/home/worlds/sidon/modulos-imagenes/polar-industrial.png",
  rondines: "/home/worlds/sidon/modulos-imagenes/rondines-industrial.png",
  sense: "/home/worlds/sidon/modulos-imagenes/sense-industrial.png",
  "smart-audits": "/home/worlds/sidon/modulos-imagenes/smart-audits-industrial.png",
  talos: "/home/worlds/sidon/modulos-imagenes/talos-industrial.png",
  wellness: "/home/worlds/sidon/modulos-imagenes/wellness-industrial.png",
};

// ponytail: shared flow image until stage-specific assets are approved.
const temporaryFlowImage = "/home/worlds/sidon/modulos-imagenes/prueba.png";

type Props = Readonly<{
  categoryName: string;
  categorySlug: string;
  contactAction: string;
  contactEyebrow: string;
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
  flow?: SidonModuleFlowData;
  headline: string;
  lead: string;
  tags?: ReadonlyArray<string>;
}>;

export function SidonModuleExperience({ categoryName, categorySlug, contactAction, contactEyebrow, contactLead, contactTitle, description, locale, moduleIcon, moduleName, moduleSlug, narrative, solves }: Props) {
  const heroImage = moduleHeroImages[moduleSlug] ?? temporaryFlowImage;

  return <main className={`${styles.modulePage} ${moduleSlug === "mantiz" ? styles.moduleMantiz : ""}`}>
    <section aria-labelledby="module-title" className={styles.moduleHero}>
      <div className={styles.moduleCopy}>
        <div className={styles.moduleIdentity}>
          <Image alt="Sidón" className={styles.moduleSidonBrand} height={104} src="/home/worlds/sidon.png" unoptimized width={104} />
          <p>{categoryName}</p>
        </div>
        <div className={styles.moduleProduct}>
          <Image alt="" className={styles.moduleLogo} height={72} src={moduleIcon} unoptimized width={72} />
          <p className={styles.moduleName}>{moduleName}</p>
        </div>
        <h1 id="module-title">{narrative?.headline ?? moduleName}</h1>
        <span>{narrative?.lead ?? description}</span>
        {narrative?.tags ? <ul className={styles.moduleTags}>{narrative.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
      </div>
      <div className={styles.moduleVisual}>
        <Image alt="" fill priority sizes="(max-width: 48rem) 100vw, 50vw" src={heroImage} unoptimized />
      </div>
    </section>
    {narrative?.flow ? <SidonModuleFlow flow={narrative.flow} heroImage={heroImage} moduleSlug={moduleSlug} /> : <section className={styles.moduleSection}>
      <p>{categoryName}</p>
      <h2>{moduleName}</h2>
      <div><h3>{locale === "es" ? "Qué resuelve" : "What it solves"}</h3><span>{solves}</span></div>
    </section>}
    <section aria-labelledby="module-conversation" className={styles.moduleConversation}>
      <div><p className={styles.moduleContactEyebrow}>{contactEyebrow}</p><h2 id="module-conversation">{contactTitle}</h2></div>
      <div><span>{contactLead}</span><Link href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2F${categorySlug}%2F${moduleSlug}&world=sidon&category=${categorySlug}&module=${moduleSlug}&interest=${moduleSlug}`}>{contactAction}<ArrowRight aria-hidden="true" size={17} /></Link></div>
    </section>
  </main>;
}
