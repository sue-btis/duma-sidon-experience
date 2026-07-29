import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./sidon.module.css";
import { DumaModulePrompt } from "./DumaModulePrompt";
import { SidonModuleFlow, type SidonModuleFlow as SidonModuleFlowData } from "./SidonModuleFlow";

const moduleHeroImages: Record<string, string> = {
  argos: "/home/worlds/sidon/modulos-imagenes/argos-industrial.webp",
  axessone: "/home/worlds/sidon/modulos-imagenes/axessone-industrial.webp",
  byblos: "/home/worlds/sidon/modulos-imagenes/byblos-industrial.webp",
  industrial: "/home/worlds/sidon/modulos-imagenes/industrial-industrial.webp",
  mantiz: "/home/worlds/sidon/modulos-imagenes/mantiz-industrial.webp",
  "nod-ia": "/home/worlds/sidon/modulos-imagenes/nod-ia-industrial.webp",
  polar: "/home/worlds/sidon/modulos-imagenes/polar-industrial.webp",
  rondines: "/home/worlds/sidon/modulos-imagenes/rondines-industrial.webp",
  sense: "/home/worlds/sidon/modulos-imagenes/sense-industrial.webp",
  "smart-audits": "/home/worlds/sidon/modulos-imagenes/smart-audits-industrial.webp",
  talos: "/home/worlds/sidon/modulos-imagenes/talos-industrial.webp",
  wellness: "/home/worlds/sidon/modulos-imagenes/wellness-industrial.webp",
};

// ponytail: shared flow image until stage-specific assets are approved.
const temporaryFlowImage = "/home/worlds/sidon/modulos-imagenes/prueba.webp";

type Props = Readonly<{
  categoryName: string;
  categorySlug: string;
  contactAction: string;
  contactEyebrow: string;
  contactLead: string;
  contactTitle: string;
  description: string;
  dumaGame: Readonly<{ invitationAction: string; invitationBody: string; invitationTitle: string }>;
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

export function SidonModuleExperience({ categoryName, categorySlug, contactAction, contactEyebrow, contactLead, contactTitle, description, dumaGame, locale, moduleIcon, moduleName, moduleSlug, narrative, solves }: Props) {
  const heroImage = moduleHeroImages[moduleSlug] ?? temporaryFlowImage;
  const contactHref = `/${locale}/sidon/conversemos/?source_path=%2Fsidon%2F${categorySlug}%2F${moduleSlug}&world=sidon&category=${categorySlug}&module=${moduleSlug}&interest=${moduleSlug}`;

  return <main className={`${styles.modulePage} ${moduleSlug === "mantiz" ? styles.moduleMantiz : ""}`}>
    <section aria-labelledby="module-title" className={styles.moduleHero}>
      <div className={styles.moduleCopy}>
        <Image alt="Sidón" className={styles.moduleSidonBrand} height={104} src="/home/worlds/sidon.png" unoptimized width={104} />
        <div className={styles.moduleProduct}>
          <Image alt="" className={styles.moduleLogo} height={72} src={moduleIcon} unoptimized width={72} />
          <p className={styles.moduleName}>{moduleName}</p>
        </div>
        <h1 id="module-title">{narrative?.headline ?? moduleName}</h1>
        <span>{narrative?.lead ?? description}</span>
        <Link className={styles.moduleHeroContact} href={contactHref}>{contactAction}<ArrowRight aria-hidden="true" size={17} /></Link>
        {narrative?.tags ? <ul className={styles.moduleTags}>{narrative.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
      </div>
      <div className={styles.moduleVisual}>
        <DumaModulePrompt copy={dumaGame} locale={locale} moduleSlug={moduleSlug} />
        <Image alt="" fill priority sizes="(max-width: 48rem) 100vw, 50vw" src={heroImage} unoptimized />
      </div>
    </section>
    {narrative?.flow ? <SidonModuleFlow dumaGame={dumaGame} flow={narrative.flow} locale={locale} moduleSlug={moduleSlug} /> : <section className={styles.moduleSection}>
      <p>{categoryName}</p>
      <h2>{moduleName}</h2>
      <div><h3>{locale === "es" ? "Qué resuelve" : "What it solves"}</h3><span>{solves}</span></div>
    </section>}
    <section aria-labelledby="module-conversation" className={styles.moduleConversation}>
      <div><p className={styles.moduleContactEyebrow}>{contactEyebrow}</p><h2 id="module-conversation">{contactTitle}</h2></div>
      <div><span>{contactLead}</span><Link href={contactHref} style={{ backgroundColor: "var(--sidon-deep)" }}>{contactAction}<ArrowRight aria-hidden="true" size={17} /></Link></div>
    </section>
  </main>;
}
