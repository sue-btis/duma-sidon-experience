import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { WorldHero } from "@/components/ui/WorldHero";
import { ContactCloseMotion } from "@/features/conversation/ContactCloseMotion";

import { SidonCategories } from "./SidonCategories";
import { DumaOrbitLink } from "./DumaOrbitLink";
import { type SidonCategoryContent } from "./SidonCategoryPanel";
import { type SidonCategorySlug } from "./sidonCategoryData";
import styles from "./sidon.module.css";

export async function SidonExperience({ initialCategory, locale }: Readonly<{ initialCategory?: SidonCategorySlug; locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "sidon" });
  const categories = t.raw("categories") as Record<SidonCategorySlug, SidonCategoryContent>;

  return <main className={`${styles.page} ${styles.sidonLanding}`}>
    <section aria-labelledby="sidon-title" className={`${styles.scene} ${styles.intro}`}><WorldHero description={t("lead")} logo="/home/worlds/sidon.png" logoAlt="Sidón" logoHeight={104} logoWidth={104} meta={t("introMeta")} priority title={t("headline")} titleId="sidon-title" variant="digital"><DumaOrbitLink href={`/${locale}/sidon/duma/`} label={t("dumaLinkLabel")} /></WorldHero></section>
    <section aria-label={t("categoriesTitle")} className={`${styles.scene} ${styles.categoriesScene}`}><SidonCategories categories={categories} closeLabel={t("closeCategory")} descriptionLabel={t("description")} initialCategory={initialCategory} instructions={t("categoryInstructions")} locale={locale} modulesLabel={t("modules")} solvesLabel={t("whatItSolves")} /><div className={styles.connected}><h3>{t("connectedTitle")}</h3><p>{t("connectedLead")}</p></div></section>
    <section aria-labelledby="sidon-conversation" className={`${styles.scene} ${styles.conversation}`}><ContactCloseMotion className={styles.contactMotion}><div className={styles.conversationCopy}><div className={styles.conversationTitle}><p>{t("eyebrow")}</p><h2 id="sidon-conversation">{t("conversationTitle")}</h2></div><div className={styles.conversationContent}><span>{t("conversationLead")}</span><a href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon&world=sidon&interest=sidon`}>{t("conversationAction")}<ArrowRight aria-hidden="true" size={17} /></a></div></div></ContactCloseMotion></section>
  </main>;
}
