import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { OrbitCarousel } from "@/components/ui/OrbitCarousel";
import { WorldHero } from "@/components/ui/WorldHero";

import { OrbitLink } from "./OrbitLink";
import { solutions } from "./solutions";
import styles from "./integration.module.css";

type Props = Readonly<{ locale: "es" | "en" }>;

export async function IntegrationExperience({ locale }: Props) {
  const t = await getTranslations("integration");

  return (
    <main className={`${styles.page} ${styles.integrationLanding}`}>
      <section aria-labelledby="integration-title" className={`${styles.scene} ${styles.intro}`}>
        <WorldHero description={t("lead")} logo="/home/worlds/integracion.png" logoAlt="" logoHeight={104} logoWidth={104} meta={t("introMeta")} title={t("headline")} titleId="integration-title" variant="physical" />
      </section>
      <section aria-label={t("solutions")} className={`${styles.scene} ${styles.carouselScene}`}>
        <OrbitCarousel
          accentColor="var(--integration)"
          ariaLabel={t("solutions")}
          brandIcon="/home/worlds/integracion.png"
          deepColor="var(--integration-deep)"
          id="integration-orbit"
          instructions={t("orbitInstructions")}
          nextLabel={t("orbitNext")}
          previousLabel={t("orbitPrevious")}
          items={solutions.map((item) => ({
            action: t("solutionAction"),
            description: t(`summary.${item.slug}`),
            href: `/${locale}/integracion/${item.slug}/`,
            icon: item.icon,
            iconScale: item.iconScale,
            id: item.slug,
            title: t(item.key),
          }))}
        />
      </section>
      <section aria-labelledby="integration-conversation" className={`${styles.scene} ${styles.projectBand}`}>
        <div className={styles.projectTitle}><p className={styles.worldLabel}>{t("scopeLabel")}</p><h2 id="integration-conversation">{t("projectTitle")}</h2></div>
        <div className={styles.projectContent}>
          <p>{t("projectCopy")}</p>
          <OrbitLink className={`${styles.primaryLink} ${styles.projectConversationLink}`} href={`/${locale}/integracion/conversemos/?source_path=%2Fintegracion&world=integracion&interest=proyecto-integracion`}>
            {t("conversation")}<ArrowRight aria-hidden="true" size={18} />
          </OrbitLink>
        </div>
      </section>
    </main>
  );
}
