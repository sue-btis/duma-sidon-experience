import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { OrbitLink } from "./OrbitLink";
import { solutions, type SolutionSlug } from "./solutions";
import styles from "./integration.module.css";
import { getLocalizedCarouselImage } from "@/components/ui/orbitCarouselImage";

type SolutionContent = Readonly<{
  definition: string;
  emphasis: string[];
  applications: string[];
  details: string[];
  note: string;
}>;

type Props = Readonly<{ locale: "es" | "en"; solution: SolutionSlug }>;

export async function IntegrationSolutionExperience({ locale, solution: slug }: Props) {
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) return null;

  const t = await getTranslations("integration");
  const content = t.raw(`solution.${slug}`) as SolutionContent;
  const siblings = solutions.filter((item) => item.slug !== slug);
  const icon = getLocalizedCarouselImage(solution.icon, locale);

  return (
    <main className={styles.solutionPage}>
      <section aria-labelledby="solution-title" className={`${styles.solutionSection} ${styles.solutionArrival}`}>
        <div className={styles.solutionIntroCopy}>
          <p className={styles.worldLabel}>{t("label")}</p>
          <p className={styles.solutionName}><Image alt="" className={styles.solutionIcon} height={48} src={icon} style={{ transform: `scale(${solution.iconScale})` }} unoptimized width={48} />{t(solution.key)}</p>
          <h1 id="solution-title">{t(`headlines.${slug}`)}</h1>
          <p className={styles.solutionDefinition}>{content.definition}</p>
          <div className={styles.inlineOutcomes}>
            <p className={styles.worldLabel}>{t("outcomes")}</p>
            <ul>{content.emphasis.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <div aria-hidden="true" className={styles.solutionReserve} />
      </section>

      <section className={`${styles.solutionSection} ${styles.operationSection}`}>
        <div aria-labelledby="applications-title" className={styles.applicationPanel}>
          <p className={styles.worldLabel}>{t("applications")}</p>
          <h2 id="applications-title">{content.definition}</h2>
          <ul className={styles.applicationList}>{content.applications.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div aria-labelledby="capabilities-title" className={styles.capabilityPanel}>
          <p className={styles.worldLabel}>{t("capabilities")}</p>
          <h2 id="capabilities-title">{t(solution.key)}</h2>
          <ol className={styles.capabilityList}>{content.details.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        </div>
      </section>

      <section aria-labelledby="solution-conversation" className={`${styles.solutionSection} ${styles.closingSection}`}>
        <div><p className={styles.worldLabel}>{t("scope")}</p><h2>{t("projectCriteria")}</h2><p className={styles.scopeCopy}>{content.note}</p></div>
        <div><p className={styles.worldLabel}>{t("label")}</p><h2 id="solution-conversation">{t("projectTitle")}</h2><p>{t("projectCopy")}</p><OrbitLink className={styles.primaryLink} href={`/${locale}/integracion/conversemos/`}>{t("conversation")}<ArrowRight aria-hidden="true" size={18} /></OrbitLink></div>
      </section>

      <nav aria-label={t("siblings")} className={styles.siblingNavigation}>
        <p className={styles.worldLabel}>{t("siblings")}</p>
        <div>{siblings.map((item) => <OrbitLink className={styles.siblingLink} href={`/${locale}/integracion/${item.slug}/`} key={item.slug}>{t(item.key)}<ArrowRight aria-hidden="true" size={16} /></OrbitLink>)}</div>
      </nav>
    </main>
  );
}
