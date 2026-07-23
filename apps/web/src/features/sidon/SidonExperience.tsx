import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { LetterWorldsCanvas } from "@/components/ui/LetterWorldsCanvas";

import { SidonCategories } from "./SidonCategories";
import { type SidonCategorySlug } from "./sidonCategoryData";
import styles from "./sidon.module.css";

type CategoryContent = Readonly<{ modules: Record<string, Readonly<{ name: string }>>; name: string }>;

export async function SidonExperience({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "sidon" });
  const categories = t.raw("categories") as Record<SidonCategorySlug, CategoryContent>;

  return <main className={`${styles.page} ${styles.sidonLanding}`}>
    <section aria-labelledby="sidon-title" className={`${styles.scene} ${styles.intro}`}><LetterWorldsCanvas variant="digital" /><div><Image alt="Sidón" height={104} priority src="/home/worlds/sidon.png" unoptimized width={104} /><h1 id="sidon-title">{t("headline")}</h1><span>{t("lead")}</span><p className={styles.introMeta}>{t("introMeta")}</p></div></section>
    <section aria-label={t("categoriesTitle")} className={`${styles.scene} ${styles.categoriesScene}`}><SidonCategories categories={categories} exploreLabel={t("explore", { category: "{category}" })} instructions={t("categoryInstructions")} locale={locale} modulesLabel={t("modules")} nextLabel={t("nextCategory")} previousLabel={t("previousCategory")} /><div className={styles.connected}><h3>{t("connectedTitle")}</h3><p>{t("connectedLead")}</p></div></section>
    <section aria-labelledby="duma-title" className={`${styles.scene} ${styles.duma}`}><div aria-hidden="true" className={styles.dumaOrbit}><i /><i /></div><div><p>{t("dumaEyebrow")}</p><Image alt="Duma AI" height={280} src="/home/worlds/dumaAi.png" unoptimized width={280} /><h2 id="duma-title">{t("dumaTitle")}</h2><span>{t("dumaLead")}</span><strong>{t("dumaStatement")}</strong><a aria-label={t("dumaActionLabel")} href={`/${locale}/sidon/duma/`}>{t("dumaAction")}<ArrowRight aria-hidden="true" size={17} /></a></div></section>
    <section aria-labelledby="sidon-conversation" className={`${styles.scene} ${styles.conversation}`}><div className={styles.conversationTitle}><p>{t("eyebrow")}</p><h2 id="sidon-conversation">{t("conversationTitle")}</h2></div><div className={styles.conversationContent}><span>{t("conversationLead")}</span><a href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon&world=sidon&interest=sidon`}>{t("conversationAction")}<ArrowRight aria-hidden="true" size={17} /></a></div></section>
  </main>;
}
