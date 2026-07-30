import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { DumaHeroOrbit } from "./DumaHeroOrbit";
import { DumaInteractive, type DumaPrototype } from "./DumaInteractive";
import { DumaChat, type DumaChatCopy } from "./DumaChat";
import styles from "./duma.module.css";

export async function DumaExperience({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "duma" });
  return <main className={styles.page}>
    <section className={styles.hero}>
      <Link className={styles.back} href={`/${locale}/sidon/`}><ArrowLeft aria-hidden="true" size={16} />{t("back")}</Link>
      <div className={styles.heroCopy}><div><p>{t("eyebrow")}</p><h1>{t("headline")}</h1><span>{t("lead")}</span><strong>{t("principle")}</strong></div><DumaHeroOrbit /></div>
    </section>
    <DumaChat content={t.raw("chat") as DumaChatCopy} />
    <DumaInteractive content={t.raw("prototype") as DumaPrototype} locale={locale} />
    <section className={styles.close}><h2>{t("ctaTitle")}</h2><p>{t("ctaLead")}</p><Link href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2Fduma&world=sidon&interest=duma`}>{t("cta")}<ArrowRight aria-hidden="true" size={17} /></Link></section>
  </main>;
}
