"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { getSidonModuleImage, type SidonModuleContext } from "./sidonModuleImage";
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
  solves: string;
}>;

export function SidonModuleExperience({ categoryName, categorySlug, contactAction, contactLead, contactTitle, description, locale, moduleIcon, moduleName, moduleSlug, solves }: Props) {
  const [context, setContext] = useState<SidonModuleContext>("retail");
  const [imageAvailable, setImageAvailable] = useState(true);
  const imageSrc = getSidonModuleImage(moduleSlug, context);

  function selectContext(nextContext: SidonModuleContext) {
    setContext(nextContext);
    setImageAvailable(true);
  }

  return <main className={styles.modulePage}>
    <section aria-labelledby="module-title" className={styles.moduleHero}>
      <div className={styles.moduleCopy}>
        <div className={styles.moduleIdentity}>
          <Image alt="Sidón" className={styles.moduleSidonBrand} height={104} src="/home/worlds/sidon.png" unoptimized width={104} />
          <p>{categoryName}</p>
        </div>
        <div className={styles.moduleTitle}>
          <Image alt={moduleName} className={styles.moduleLogo} height={108} src={moduleIcon} unoptimized width={108} />
          <h1 id="module-title">{moduleName}</h1>
        </div>
        <span>{description}</span>
        <div aria-label={`${moduleName} context`} className={styles.moduleContext}>
          {(["retail", "industrial"] as const).map((item) => <button aria-pressed={context === item} key={item} onClick={() => selectContext(item)} type="button">{item}</button>)}
        </div>
      </div>
      <div aria-live="polite" className={styles.moduleImage}>
        {imageAvailable ? <Image alt={`${moduleName} ${context}`} fill onError={() => setImageAvailable(false)} sizes="(max-width: 48rem) 100vw, 50vw" src={imageSrc} unoptimized /> : null}
      </div>
    </section>
    <section className={styles.moduleSection}>
      <p>{categoryName}</p>
      <h2>{moduleName}</h2>
      <div><h3>{locale === "es" ? "Qué resuelve" : "What it solves"}</h3><span>{solves}</span></div>
    </section>
    <section aria-labelledby="module-conversation" className={styles.moduleConversation}>
      <div><p>{categoryName}</p><h2 id="module-conversation">{contactTitle}</h2></div>
      <div><span>{contactLead}</span><Link href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2F${categorySlug}%2F${moduleSlug}&world=sidon&category=${categorySlug}&module=${moduleSlug}&interest=${moduleSlug}`}>{contactAction}<ArrowRight aria-hidden="true" size={17} /></Link></div>
    </section>
  </main>;
}
