import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { DumaHeroOrbit } from "./DumaHeroOrbit";
import { DumaCapabilities, type DumaCapabilitiesCopy } from "./DumaCapabilities";
import { DumaChat, type DumaChatCopy, type DumaChatModuleGroup } from "./DumaChat";
import { sidonCategories } from "./sidonCategoryData";
import styles from "./duma.module.css";

export async function DumaExperience({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "duma" });
  const sidon = await getTranslations({ locale, namespace: "sidon" });
  const moduleGroups: DumaChatModuleGroup[] = sidonCategories.map((category) => {
    const categoryCopy = sidon.raw(`categories.${category.slug}`) as { intro: string; modules: Record<string, { description: string; name: string }>; name: string; solves: string };
    return {
    id: category.slug,
    intro: categoryCopy.intro,
    name: categoryCopy.name,
    solves: categoryCopy.solves,
    modules: category.modules.map((module) => ({
      description: categoryCopy.modules[module.key].description,
      icon: module.icon,
      id: module.slug,
      name: categoryCopy.modules[module.key].name,
    })),
  };
  });
  return <main className={styles.page}>
    <section className={styles.hero}>
      <Link className={styles.back} href={`/${locale}/sidon/`}><ArrowLeft aria-hidden="true" size={16} />{t("back")}</Link>
      <div className={styles.heroCopy}><div><p>{t("eyebrow")}</p><h1>{t("headline")}</h1><span>{t("lead")}</span><strong>{t("principle")}</strong></div><DumaHeroOrbit /></div>
    </section>
    <DumaChat categoryNavigatorLabel={sidon("categoriesTitle")} content={t.raw("chat") as DumaChatCopy} moduleGroups={moduleGroups} />
    <DumaCapabilities content={t.raw("capabilitiesShowcase") as DumaCapabilitiesCopy} />
    <section className={styles.close}><h2>{t("ctaTitle")}</h2><p>{t("ctaLead")}</p><Link href={`/${locale}/sidon/conversemos/?source_path=%2Fsidon%2Fduma&world=sidon&interest=duma`}>{t("cta")}<ArrowRight aria-hidden="true" size={17} /></Link></section>
  </main>;
}
