import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./sidon.module.css";

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
  continuity: Readonly<{ duma?: Readonly<{ lead: string; title: string }>; lead: string; title: string }>;
  headline: string;
  lead: string;
  logic: Readonly<{ lead: string; stages: readonly string[]; title: string }>;
  outcomes: readonly Readonly<{ label: string; lead: string; title: string }>[];
}>;

function NarrativeSections({ narrative }: Readonly<{ narrative: SidonModuleNarrative }>) {
  return <>
    <section aria-labelledby="module-logic" className={styles.moduleNarrative}>
      <div><p>Sidón</p><h2 id="module-logic">{narrative.logic.title}</h2></div>
      <div><span>{narrative.logic.lead}</span><ol>{narrative.logic.stages.map((stage) => <li key={stage}>{stage}</li>)}</ol></div>
    </section>
    <section className={styles.moduleOutcomes}>
      {narrative.outcomes.map((outcome) => <article key={outcome.title}><p>{outcome.label}</p><h2>{outcome.title}</h2><span>{outcome.lead}</span></article>)}
    </section>
    <section aria-labelledby="module-continuity" className={styles.moduleContinuity}>
      <div><p>Sidón</p><h2 id="module-continuity">{narrative.continuity.title}</h2></div>
      <div><span>{narrative.continuity.lead}</span>{narrative.continuity.duma ? <article><p>Duma</p><h3>{narrative.continuity.duma.title}</h3><span>{narrative.continuity.duma.lead}</span></article> : null}</div>
    </section>
  </>;
}

export function SidonModuleExperience({ categoryName, categorySlug, contactAction, contactLead, contactTitle, description, locale, moduleIcon, moduleName, moduleSlug, narrative, solves }: Props) {
  return <main className={styles.modulePage}>
    <section aria-labelledby="module-title" className={styles.moduleHero}>
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
