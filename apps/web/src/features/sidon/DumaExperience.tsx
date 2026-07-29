import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import styles from "./duma.module.css";

type Item = Readonly<{ copy: string; title: string }>;

export async function DumaExperience({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "duma" });
  const expressions = t.raw("expressions") as Item[];
  const embedded = t.raw("embedded") as string[];
  const stages = t.raw("stages") as string[];

  return <main className={styles.page}>
    <section className={`${styles.scene} ${styles.intro}`}>
      <Link className={styles.back} href={`/${locale}/sidon/`}><ArrowLeft aria-hidden="true" size={16} />{t("back")}</Link>
      <div className={styles.hero}><div><p className={styles.eyebrow}>{t("eyebrow")}</p><h1>{t("headline")}</h1><p className={styles.lead}>{t("lead")}</p><p className={styles.principle}>{t("principle")}</p></div><Image alt="" className={styles.head} height={214} priority src="/pet/dumaHead.svg" unoptimized width={242} /></div>
    </section>
    <section className={styles.scene}><header><h2>{t("connectedTitle")}</h2><p>{t("connectedLead")}</p></header><div className={styles.signal}><span>Smart Audits</span><span>Argos</span><strong>Duma AI</strong><span>Sense</span><span>Mantiz</span></div><p className={styles.note}>{t("architecture")}</p></section>
    <section className={styles.scene}><header><h2>{t("experienceTitle")}</h2><p>{t("experienceLead")}</p></header><div className={styles.expressions}>{expressions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
    <section className={styles.scene}><header><h2>{t("embeddedTitle")}</h2><p>{t("embeddedLead")}</p></header><ul className={styles.embedded}>{embedded.map((item) => <li key={item} style={{ border: "1px solid color-mix(in srgb, var(--sidon) 35%, var(--line))", padding: "1rem" }}>{item}</li>)}</ul></section>
    <section className={styles.scene}><header><h2>{t("autonomyTitle")}</h2><p>{t("autonomyLead")}</p></header><ol className={styles.stages}>{stages.map((stage, index) => <li key={stage}><span>{index + 1}</span>{stage}</li>)}</ol><p className={styles.note}>{t("control")}</p></section>
    <section className={`${styles.scene} ${styles.close}`}><h2>{t("ctaTitle")}</h2><p>{t("ctaLead")}</p><Link aria-label={t("ctaTitle")} href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2Fduma&world=sidon&interest=duma`} style={{ backgroundColor: "var(--sidon-deep)" }}>{t("cta")}<ArrowRight aria-hidden="true" size={17} /></Link></section>
  </main>;
}
